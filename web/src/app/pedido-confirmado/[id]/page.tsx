import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { WHATSAPP } from '@/lib/constants';

export default async function PedidoConfirmadoPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const pedido = !isNaN(id) ? await prisma.order.findUnique({ where: { id } }) : null;
  if (!pedido) notFound();

  return (
    <main className="erk-sec erk-entra" data-screen-label="Pedido confirmado">
      <div className="erk-wrap" style={{ maxWidth: 620, textAlign: 'center', paddingTop: 20, paddingBottom: 40 }}>
        <span style={{ display: 'inline-grid', placeItems: 'center', width: 64, height: 64, borderRadius: '50%', background: 'var(--surface-forte)', border: '1px solid var(--border-2)', color: 'var(--ok)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 30, height: 30 }}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.3l2.4 2.4 4.6-4.9" />
          </svg>
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.12, marginTop: 20 }}>Pedido confirmado</h1>
        <p style={{ color: 'var(--text-2)', marginTop: 12 }}>
          Mandamos o resumo no seu WhatsApp. A peça sai da oficina embalada, com o cartão da loja — e a gente avisa quando o motoboy pegar a encomenda.
        </p>
        <p style={{ color: 'var(--text-3)', fontSize: 13.5, marginTop: 8 }}>Pedido nº {10000 + pedido.id}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 26, flexWrap: 'wrap' }}>
          <Link className="erk-btn erk-btn--p" href="/">
            Voltar para a loja
          </Link>
          <a className="erk-btn erk-btn--s" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            Acompanhar no WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
