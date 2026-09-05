import { redirect } from 'next/navigation';
import { getCurrentUserId } from '@/lib/session';
import { prisma } from '@/lib/db';
import { fmt } from '@/lib/format';
import { MobileContextBar } from '@/components/nav/MobileContextBar';
import { OrdersView, type PedidoResumo } from '@/components/account/OrdersView';

const ENTREGA_NOME: Record<string, string> = { motoboy: 'Motoboy', correios: 'Correios', retirada: 'Retirada na loja' };

export default async function PedidosPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect('/conta/entrar');

  const pedidos = await prisma.order.findMany({ where: { userId }, include: { items: true }, orderBy: { createdAt: 'desc' } });

  const resumo: PedidoResumo[] = pedidos.map((o) => ({
    id: o.id,
    n: 'Pedido ' + (10000 + o.id),
    data: o.createdAt.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }),
    estado: o.status === 'entregue' ? 'Entregue' : 'Na bancada',
    grupo: o.status === 'entregue' ? 'entregue' : 'preparo',
    itens: o.items.map((i) => `${i.name}${i.spec ? ' · ' + i.spec : ''}`).join(' · '),
    valor: fmt(o.total),
    entrega: ENTREGA_NOME[o.delivery] || o.delivery,
  }));

  return (
    <>
      <MobileContextBar titulo="Meus pedidos" subtitulo={`${pedidos.length} pedidos`} voltarHref="/conta" />
      <main className="erk-sec erk-entra" data-screen-label="Pedidos">
        <div className="erk-wrap" style={{ maxWidth: 720 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Meus pedidos</h1>
          <OrdersView pedidos={resumo} />
        </div>
      </main>
    </>
  );
}
