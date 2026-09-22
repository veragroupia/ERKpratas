import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUserId } from '@/lib/session';
import { prisma } from '@/lib/db';
import { fmt, fotoUrl } from '@/lib/format';
import { MobileContextBar } from '@/components/nav/MobileContextBar';
import { Icon } from '@/components/ui/Icon';

const ENTREGA_NOME: Record<string, string> = {
  motoboy: 'Motoboy',
  correios: 'Correios',
  retirada: 'Retirada na loja',
};
const PAGAMENTO_NOME: Record<string, string> = {
  pix: 'Pix',
  credito: 'Cartão de crédito',
  whats: 'Combinado no WhatsApp',
};

/* A oficina mexe no pedido pelo painel, que usa este vocabulário. A loja ainda
   grava "preparo" ao criar, então ele entra aqui como sinônimo de "novo" —
   sem isso o primeiro passo da linha do tempo apareceria vazio. */
const ETAPAS = [
  { id: 'novo', nome: 'Pedido recebido', apoio: 'Entrou na fila da oficina' },
  { id: 'pago', nome: 'Pagamento confirmado', apoio: 'Liberado para produção' },
  { id: 'producao', nome: 'Em produção', apoio: 'Sendo fundida e montada na bancada' },
  { id: 'polimento', nome: 'Polimento', apoio: 'Acabamento espelhado à mão' },
  { id: 'embalado', nome: 'Embalado', apoio: 'Na caixa, com o cartão da loja' },
  { id: 'enviado', nome: 'Saiu para entrega', apoio: 'A caminho de você' },
  { id: 'entregue', nome: 'Entregue', apoio: 'Chegou ao destino' },
];

function indiceEtapa(status: string): number {
  if (status === 'preparo') return 0;
  const i = ETAPAS.findIndex((e) => e.id === status);
  return i < 0 ? 0 : i;
}

function dataHora(d: Date) {
  return d.toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default async function PedidoPage({ params }: { params: { id: string } }) {
  const userId = await getCurrentUserId();
  if (!userId) redirect('/conta/entrar');

  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const pedido = await prisma.order.findFirst({
    where: { id, userId },
    include: {
      items: { include: { product: { select: { photoId: true } } } },
      statusEvents: { orderBy: { at: 'asc' } },
    },
  });
  if (!pedido) notFound();

  const numero = 10000 + pedido.id;
  const cancelado = pedido.status === 'cancelado';
  const atual = indiceEtapa(pedido.status);
  // peça pronta de estoque não passa pela bancada: as etapas de produção somem
  const etapas = pedido.readyFromStock
    ? ETAPAS.filter((e) => e.id !== 'producao' && e.id !== 'polimento')
    : ETAPAS;
  const quandoDe = (etapaId: string) => pedido.statusEvents.find((e) => e.status === etapaId)?.at;

  return (
    <>
      <MobileContextBar titulo={`Pedido ${numero}`} subtitulo={dataHora(pedido.createdAt)} voltarHref="/conta/pedidos" />
      <main className="erk-sec erk-entra" data-screen-label="Pedido">
        <div className="erk-wrap" style={{ maxWidth: 720 }}>
          <p className="chrome-desktop" style={{ fontSize: 12.5, color: 'var(--text-3)', marginBottom: 14 }}>
            <Link href="/conta/pedidos" className="erk-link">Meus pedidos</Link> · Pedido {numero}
          </p>

          <div className="ped-cab">
            <div>
              <h1>Pedido {numero}</h1>
              <p>Feito em {dataHora(pedido.createdAt)}</p>
            </div>
            <strong>{fmt(pedido.total)}</strong>
          </div>

          {cancelado ? (
            <div className="ped-aviso">
              <b>Pedido cancelado</b>
              <span>Se isso não era o esperado, fale com a gente no WhatsApp que a gente resolve.</span>
            </div>
          ) : (
            <section className="ped-bloco">
              <h2>Acompanhamento</h2>
              <ol className="ped-linha">
                {etapas.map((e) => {
                  const idx = ETAPAS.findIndex((x) => x.id === e.id);
                  const feito = idx <= atual;
                  const agora = idx === atual;
                  const quando = quandoDe(e.id);
                  return (
                    <li key={e.id} className={[feito ? 'is-feito' : '', agora ? 'is-agora' : ''].filter(Boolean).join(' ')}>
                      <span className="ped-linha__ponto" />
                      <div>
                        <b>{e.nome}</b>
                        <em>{e.apoio}</em>
                        {quando ? <time dateTime={quando.toISOString()}>{dataHora(quando)}</time> : null}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {pedido.whereIsIt ? (
                <p className="ped-onde">
                  <Icon name="entrega" size={17} />
                  <span><b>Onde está agora:</b> {pedido.whereIsIt}</span>
                </p>
              ) : null}
            </section>
          )}

          <section className="ped-bloco">
            <h2>{pedido.items.length === 1 ? 'A peça' : 'As peças'}</h2>
            <ul className="ped-itens">
              {pedido.items.map((i) => (
                <li key={i.id}>
                  <span
                    className="ped-itens__fig"
                    style={{ backgroundImage: `url("${fotoUrl(i.product?.photoId ?? 16124761, 200)}")` }}
                    aria-hidden="true"
                  />
                  <div>
                    <b>{i.name}</b>
                    {i.spec ? <em>{i.spec}</em> : null}
                    <span>{i.quantity} × {fmt(i.unitPrice)}</span>
                  </div>
                  <strong>{fmt(i.unitPrice * i.quantity)}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="ped-bloco">
            <h2>Entrega e pagamento</h2>
            <dl className="ped-kv">
              <div>
                <dt>Entrega</dt>
                <dd>{ENTREGA_NOME[pedido.delivery] || pedido.delivery}</dd>
              </div>
              <div>
                <dt>Endereço</dt>
                <dd>CEP {pedido.zip}{pedido.addressNumber ? `, nº ${pedido.addressNumber}` : ''}</dd>
              </div>
              <div>
                <dt>Pagamento</dt>
                <dd>{PAGAMENTO_NOME[pedido.payment] || pedido.payment}</dd>
              </div>
              <div>
                <dt>Situação do pagamento</dt>
                <dd>{pedido.paymentStatus === 'pago' ? 'Confirmado' : pedido.paymentStatus === 'estornado' ? 'Estornado' : 'Aguardando'}</dd>
              </div>
            </dl>

            {/* o subtotal da loja já vem líquido: `discount` é o quanto a pessoa
                economizou ante o preço antigo, não um abatimento a subtrair.
                Some da coluna de soma e vira uma linha de ganho, senão a conta
                aparece errada para quem confere. */}
            <div className="ped-total">
              <span>Peças</span><b>{fmt(pedido.subtotal)}</b>
              <span>Frete</span><b>{pedido.shipping ? fmt(pedido.shipping) : 'grátis'}</b>
              <span className="ped-total__f">Total</span><b className="ped-total__f">{fmt(pedido.total)}</b>
            </div>
            {pedido.discount ? (
              <p className="ped-economia">Você economizou {fmt(pedido.discount)} nesta compra.</p>
            ) : null}
          </section>

          <a
            className="erk-btn erk-btn--s erk-btn--full"
            style={{ marginTop: 18 }}
            href={`https://wa.me/5511911124875?text=${encodeURIComponent(`Olá! Queria falar sobre o pedido ${numero}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar sobre este pedido
          </a>
        </div>
      </main>
    </>
  );
}
