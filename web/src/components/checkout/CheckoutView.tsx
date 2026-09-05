'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MobileContextBar } from '../nav/MobileContextBar';
import { BottomActionBar } from '../nav/BottomActionBar';
import { fmt, parcela } from '@/lib/format';
import type { CartLine } from '@/lib/cartSummary';

const campo: React.CSSProperties = {
  height: 46,
  borderRadius: 10,
  background: 'var(--surface-suave)',
  border: '1px solid var(--border-1)',
  padding: '0 14px',
  fontSize: 16,
  outline: 'none',
  color: 'var(--text-1)',
};

type Entrega = 'motoboy' | 'correios' | 'retirada';
type Pagamento = 'pix' | 'credito' | 'whats';

const OP_ENTREGA: { id: Entrega; nome: string; detalhe: string }[] = [
  { id: 'motoboy', nome: 'Motoboy hoje', detalhe: 'Salto, Itu, Indaiatuba e Cabreúva · grátis acima de R$ 150' },
  { id: 'correios', nome: 'Envio para todo o Brasil', detalhe: 'Rastreado · 3 a 7 dias úteis · R$ 24,90' },
  { id: 'retirada', nome: 'Retirar na loja', detalhe: 'Salto, SP · pronto em 2 horas · grátis' },
];
const OP_PAGAMENTO: { id: Pagamento; nome: string; detalhe: string }[] = [
  { id: 'pix', nome: 'Pix', detalhe: 'Confirmação na hora · 5% de desconto' },
  { id: 'credito', nome: 'Cartão de crédito', detalhe: 'Até 6x sem juros' },
  { id: 'whats', nome: 'Combinar no WhatsApp', detalhe: 'A gente confirma medida e frete antes de cobrar' },
];

function opcaoEstilo(ativo: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
    textAlign: 'left',
    padding: '16px 18px',
    borderRadius: 14,
    border: '1px solid ' + (ativo ? 'var(--border-2)' : 'var(--border-1)'),
    background: ativo ? 'var(--surface-forte)' : 'var(--surface-card)',
  };
}
function marcaEstilo(ativo: boolean): React.CSSProperties {
  return {
    width: 18,
    height: 18,
    borderRadius: '50%',
    flex: 'none',
    border: '1px solid ' + (ativo ? 'var(--text-1)' : 'var(--border-2)'),
    background: ativo ? 'var(--text-1)' : 'transparent',
    boxShadow: ativo ? 'inset 0 0 0 3px var(--surface-forte)' : 'none',
  };
}

export function CheckoutView({ linhas, subtotal }: { linhas: CartLine[]; subtotal: number }) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [entrega, setEntrega] = useState<Entrega>('motoboy');
  const [pagamento, setPagamento] = useState<Pagamento>('pix');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  const frete = entrega === 'correios' ? 24.9 : 0;
  const total = subtotal + frete;

  async function confirmar() {
    setErro('');
    if (!nome.trim() || !whatsapp.trim() || !cep.trim()) {
      setErro('Preencha nome, WhatsApp e CEP para continuar.');
      return;
    }
    setEnviando(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: nome,
        customerPhone: whatsapp,
        customerCpf: cpf || undefined,
        zip: cep,
        addressNumber: numero || undefined,
        delivery: entrega,
        payment: pagamento,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErro(data.error || 'Não deu para confirmar o pedido.');
      setEnviando(false);
      return;
    }
    router.push(`/pedido-confirmado/${data.id}`);
    router.refresh();
  }

  return (
    <>
      <MobileContextBar titulo="Fechar o pedido" subtitulo="Etapa 2 de 3" voltarHref="/sacola" />
      <main className="erk-sec erk-entra" data-screen-label="Checkout">
        <div className="erk-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-3)', marginBottom: 14 }}>
            <Link href="/sacola" style={{ color: 'var(--text-3)', textDecoration: 'underline' }}>
              1. Sacola
            </Link>
            <span>›</span>
            <b style={{ color: 'var(--text-1)', fontWeight: 600 }}>2. Dados</b>
            <span>›</span>
            <span>3. Confirmação</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.12 }}>Fechar o pedido</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,40px)', alignItems: 'flex-start', marginTop: 26 }}>
            <div style={{ flex: '999 1 min(100%,440px)', minWidth: 0, display: 'grid', gap: 'clamp(24px,3vw,36px)' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 21 }}>Seus dados</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: 14, marginTop: 16 }}>
                  <label style={{ display: 'grid', gap: 7, gridColumn: '1/-1' }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Nome completo</span>
                    <input style={campo} value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como está no documento" />
                  </label>
                  <label style={{ display: 'grid', gap: 7 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>WhatsApp</span>
                    <input style={campo} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(11) 9 9999-9999" />
                  </label>
                  <label style={{ display: 'grid', gap: 7 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>CPF</span>
                    <input style={campo} value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
                  </label>
                  <label style={{ display: 'grid', gap: 7 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>CEP</span>
                    <input style={campo} value={cep} onChange={(e) => setCep(e.target.value)} placeholder="13320-000" />
                  </label>
                  <label style={{ display: 'grid', gap: 7 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Número</span>
                    <input style={campo} value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="000" />
                  </label>
                </div>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 21 }}>Entrega</h2>
                <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                  {OP_ENTREGA.map((o) => (
                    <button key={o.id} type="button" onClick={() => setEntrega(o.id)} style={opcaoEstilo(o.id === entrega)}>
                      <span style={{ display: 'grid', gap: 4, textAlign: 'left' }}>
                        <b style={{ fontSize: 14.5 }}>{o.nome}</b>
                        <em style={{ fontStyle: 'normal', fontSize: 13.5, color: 'var(--text-2)' }}>{o.detalhe}</em>
                      </span>
                      <span style={marcaEstilo(o.id === entrega)} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 21 }}>Pagamento</h2>
                <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                  {OP_PAGAMENTO.map((o) => (
                    <button key={o.id} type="button" onClick={() => setPagamento(o.id)} style={opcaoEstilo(o.id === pagamento)}>
                      <span style={{ display: 'grid', gap: 4, textAlign: 'left' }}>
                        <b style={{ fontSize: 14.5 }}>{o.nome}</b>
                        <em style={{ fontStyle: 'normal', fontSize: 13.5, color: 'var(--text-2)' }}>{o.detalhe}</em>
                      </span>
                      <span style={marcaEstilo(o.id === pagamento)} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <aside className="cart-aside">
              <h4 style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Seu pedido</h4>
              <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
                {linhas.map((i) => (
                  <div className="erk-linha" key={i.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.foto} alt="" loading="lazy" />
                    <span>
                      <b>{i.nome}</b>
                      <span>
                        {i.quantidade} × {i.spec}
                      </span>
                    </span>
                    <i>{fmt(i.total)}</i>
                  </div>
                ))}
              </div>
              <dl style={{ margin: '18px 0 0', display: 'grid', gap: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
                  <dt style={{ color: 'var(--text-2)' }}>Peças</dt>
                  <dd style={{ margin: 0 }}>{fmt(subtotal)}</dd>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
                  <dt style={{ color: 'var(--text-2)' }}>Frete</dt>
                  <dd style={{ margin: 0 }}>{frete ? fmt(frete) : 'grátis'}</dd>
                </div>
              </dl>
              <div className="cart-total">
                <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Total</span>
                <div className="cart-total-val">
                  <p className="erk-preco erk-preco--g">
                    <b>{fmt(total)}</b>
                  </p>
                  <p className="erk-parc">{parcela(total)}</p>
                </div>
              </div>
              {erro ? <p style={{ color: 'var(--acento-2)', fontSize: 13.5, marginTop: 14 }}>{erro}</p> : null}
              <button type="button" className="erk-btn erk-btn--a erk-btn--full chrome-desktop" onClick={confirmar} disabled={enviando} style={{ marginTop: 20 }}>
                {enviando ? 'Confirmando…' : 'Confirmar pedido'}
              </button>
              <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginTop: 14 }}>
                Garantia vitalícia e troca em 7 dias. Dúvida?{' '}
                <a href="https://wa.me/5511911124875" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>
                  fale com a loja
                </a>
                .
              </p>
            </aside>
          </div>
        </div>
      </main>
      <BottomActionBar valor={fmt(total)} sub={`Frete ${frete ? fmt(frete) : 'grátis'}`} botao={enviando ? 'Confirmando…' : 'Confirmar'} onClick={confirmar} disabled={enviando} variant="accent" />
    </>
  );
}
