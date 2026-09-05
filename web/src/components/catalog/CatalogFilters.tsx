'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '../ui/Icon';

export type FiltroOpt = { id: string; nome: string; n: string };

const ORDEM_OPS = [
  { id: 'relevancia', nome: 'Mais relevantes' },
  { id: 'menor', nome: 'Menor preço' },
  { id: 'maior', nome: 'Maior preço' },
];

const pilula: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  height: 48,
  padding: '0 18px',
  borderRadius: 980,
  border: '1px solid var(--border-2)',
  background: 'var(--surface-card)',
  color: 'var(--text-1)',
  fontSize: 14,
};

export function CatalogFilters({
  categorias,
  filtroAtual,
  ordemAtual,
  totalTodas,
  totalOfertas,
}: {
  categorias: FiltroOpt[];
  filtroAtual: string;
  ordemAtual: string;
  totalTodas: number;
  totalOfertas: number;
}) {
  const [menu, setMenu] = useState<'' | 'cat' | 'ord'>('');
  const [largo, setLargo] = useState(true);
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width:900px)');
    setLargo(mq.matches);
    const onMQ = () => setLargo(mq.matches);
    mq.addEventListener('change', onMQ);
    return () => mq.removeEventListener('change', onMQ);
  }, []);

  const opsCat: FiltroOpt[] = [{ id: 'todas', nome: 'Todas as peças', n: String(totalTodas) }, ...categorias, { id: 'ofertas', nome: 'Ofertas', n: String(totalOfertas) }];
  const rotuloFiltro = opsCat.find((o) => o.id === filtroAtual)?.nome || 'Filtrar';
  const rotuloOrdem = ORDEM_OPS.find((o) => o.id === ordemAtual)?.nome || 'Mais relevantes';

  function irCategoria(id: string) {
    setMenu('');
    const qs = ordemAtual !== 'relevancia' ? `?ordem=${ordemAtual}` : '';
    router.push(`/catalogo/${id}${qs}`);
  }
  function irOrdem(id: string) {
    setMenu('');
    const base = filtroAtual === 'todas' ? '/catalogo' : `/catalogo/${filtroAtual}`;
    router.push(`${base}${id !== 'relevancia' ? `?ordem=${id}` : ''}`);
  }

  const estiloMenu: React.CSSProperties = largo
    ? { position: 'absolute', zIndex: 80, top: 56, left: 0, minWidth: 250, background: 'var(--surface-card)', border: '1px solid var(--border-2)', borderRadius: 14, padding: 8, boxShadow: '0 24px 60px rgba(0,0,0,.55)', display: 'grid', gap: 2 }
    : { position: 'fixed', zIndex: 80, left: 0, right: 0, bottom: 0, maxHeight: '76vh', overflow: 'auto', background: 'var(--surface-card)', borderTop: '1px solid var(--border-2)', borderRadius: '20px 20px 0 0', padding: '6px 8px calc(16px + var(--safe))', boxShadow: '0 -20px 60px rgba(0,0,0,.6)', display: 'grid', gap: 2 };

  function itemEstilo(ativo: boolean): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      width: '100%',
      textAlign: 'left',
      padding: largo ? '11px 14px' : '15px 16px',
      borderRadius: 10,
      fontSize: largo ? 14 : 15,
      background: ativo ? 'var(--surface-forte)' : 'transparent',
      color: 'var(--text-1)',
    };
  }

  return (
    <div ref={wrapRef} style={{ display: 'flex', gap: 10, flexWrap: 'nowrap', alignItems: 'center', marginBottom: 26 }}>
      <div style={{ position: 'relative', flex: largo ? undefined : '1 1 0', minWidth: largo ? undefined : 0 }}>
        <button type="button" onClick={() => setMenu(menu === 'cat' ? '' : 'cat')} style={largo ? { ...pilula, width: 'auto' } : pilula}>
          <Icon name="filtro" size={18} />
          <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rotuloFiltro}</span>
        </button>
        {menu === 'cat' ? (
          <>
            <div onClick={() => setMenu('')} style={{ position: 'fixed', inset: 0, zIndex: 70, background: largo ? 'transparent' : 'rgba(0,0,0,.58)' }} />
            <div style={estiloMenu}>
              {!largo ? <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '10px 14px 12px' }}>Filtrar por categoria</p> : null}
              {opsCat.map((o) => (
                <button key={o.id} type="button" onClick={() => irCategoria(o.id)} style={itemEstilo(o.id === filtroAtual)}>
                  <span>{o.nome}</span>
                  <span style={{ color: 'var(--text-3)', fontSize: 13 }}>{o.n}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div style={{ position: 'relative', flex: largo ? undefined : '1 1 0', minWidth: largo ? undefined : 0 }}>
        <button type="button" onClick={() => setMenu(menu === 'ord' ? '' : 'ord')} style={largo ? { ...pilula, width: 'auto' } : pilula}>
          <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rotuloOrdem}</span>
          <Icon name="seta" size={16} style={{ transform: 'rotate(90deg)' }} />
        </button>
        {menu === 'ord' ? (
          <>
            <div onClick={() => setMenu('')} style={{ position: 'fixed', inset: 0, zIndex: 70, background: largo ? 'transparent' : 'rgba(0,0,0,.58)' }} />
            <div style={estiloMenu}>
              {!largo ? <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '10px 14px 12px' }}>Ordenar por</p> : null}
              {ORDEM_OPS.map((o) => (
                <button key={o.id} type="button" onClick={() => irOrdem(o.id)} style={itemEstilo(o.id === ordemAtual)}>
                  <span>{o.nome}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
