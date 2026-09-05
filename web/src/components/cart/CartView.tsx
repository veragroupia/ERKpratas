'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EmptyState } from '../ui/EmptyState';
import { MobileContextBar } from '../nav/MobileContextBar';
import { BottomActionBar } from '../nav/BottomActionBar';
import { fmt, parcela } from '@/lib/format';
import type { CartLine } from '@/lib/cartSummary';

export function CartView({ linhas, subtotal, economia }: { linhas: CartLine[]; subtotal: number; economia: number }) {
  const router = useRouter();
  const nItens = linhas.reduce((a, l) => a + l.quantidade, 0);
  const nPecas = nItens + (nItens === 1 ? ' peça' : ' peças');

  async function atualizar(id: string, quantidade: number) {
    await fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: quantidade }),
    });
    router.refresh();
  }

  return (
    <>
      <MobileContextBar titulo="Sua sacola" subtitulo={`${nPecas} · etapa 1 de 3`} voltarHref="/catalogo" />
      <main className="erk-sec erk-entra" data-screen-label="Sacola">
        <div className="erk-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-3)', marginBottom: 14 }}>
            <b style={{ color: 'var(--text-1)', fontWeight: 600 }}>1. Sacola</b>
            <span>›</span>
            <span>2. Dados</span>
            <span>›</span>
            <span>3. Confirmação</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.12 }}>Sua sacola</h1>

          {linhas.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,40px)', alignItems: 'flex-start', marginTop: 26 }}>
              <div style={{ flex: '999 1 min(100%,440px)', minWidth: 0, display: 'grid', gap: 10 }}>
                {linhas.map((i) => (
                  <div key={i.id} style={{ display: 'grid', gridTemplateColumns: '62px minmax(0,1fr)', gap: 14, alignItems: 'center', padding: 10, border: '1px solid var(--border-1)', borderRadius: 14, background: 'var(--surface-card)' }}>
                    <span
                      role="img"
                      aria-label={i.nome}
                      style={{ display: 'block', width: 62, height: 62, borderRadius: 10, backgroundImage: `url("${i.foto}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'var(--filtro-foto)' }}
                    />
                    <span style={{ minWidth: 0, display: 'grid', gap: 3 }}>
                      <b style={{ fontSize: 14.5, fontWeight: 600 }}>{i.nome}</b>
                      <span style={{ fontSize: 12.5, color: 'var(--text-2)' }}>{i.spec}</span>
                    </span>
                    <span className="cart-controles">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, border: '1px solid var(--border-2)', borderRadius: 980, padding: 2 }}>
                        <button type="button" onClick={() => atualizar(i.id, i.quantidade - 1)} aria-label="Menos" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--text-2)', fontSize: 17 }}>
                          –
                        </button>
                        <b style={{ minWidth: 24, textAlign: 'center', fontSize: 14.5 }}>{i.quantidade}</b>
                        <button type="button" onClick={() => atualizar(i.id, i.quantidade + 1)} aria-label="Mais" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--text-2)', fontSize: 17 }}>
                          +
                        </button>
                      </span>
                      <b style={{ fontSize: 15.5, whiteSpace: 'nowrap', marginLeft: 'auto' }}>{fmt(i.total)}</b>
                      <button type="button" onClick={() => atualizar(i.id, 0)} aria-label="Remover" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'var(--text-3)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
                          <path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12" />
                        </svg>
                      </button>
                    </span>
                  </div>
                ))}
              </div>
              <aside className="cart-aside">
                <h4 style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Resumo</h4>
                <dl style={{ margin: '18px 0 0', display: 'grid', gap: 11 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
                    <dt style={{ color: 'var(--text-2)' }}>Peças ({nItens})</dt>
                    <dd style={{ margin: 0 }}>{fmt(subtotal)}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
                    <dt style={{ color: 'var(--text-2)' }}>Desconto aplicado</dt>
                    <dd style={{ margin: 0, color: 'var(--ok)' }}>− {fmt(economia)}</dd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontSize: 14 }}>
                    <dt style={{ color: 'var(--text-2)' }}>Frete</dt>
                    <dd style={{ margin: 0 }}>a calcular</dd>
                  </div>
                </dl>
                <div className="cart-total">
                  <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Total</span>
                  <div className="cart-total-val">
                    <p className="erk-preco erk-preco--g">
                      <b>{fmt(subtotal)}</b>
                    </p>
                    <p className="erk-parc">{parcela(subtotal)}</p>
                  </div>
                </div>
                <Link className="erk-btn erk-btn--p erk-btn--full" href="/checkout" style={{ marginTop: 20 }}>
                  Fechar o pedido
                </Link>
                <Link className="erk-btn erk-btn--s erk-btn--full" href="/catalogo" style={{ marginTop: 10 }}>
                  Continuar comprando
                </Link>
              </aside>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 26 }}>
                <EmptyState>Sua sacola está vazia. Escolha uma peça no catálogo para começar.</EmptyState>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link className="erk-btn erk-btn--p" href="/catalogo">
                  Ver o catálogo
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      {linhas.length > 0 ? (
        <BottomActionBar valor={fmt(subtotal)} sub={`${nPecas} · frete a calcular`} botao="Fechar" onClick={() => router.push('/checkout')} />
      ) : null}
    </>
  );
}
