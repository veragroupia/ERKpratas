'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SearchBar } from '../ui/SearchBar';
import { Chip } from '../ui/Chip';
import { EmptyState } from '../ui/EmptyState';
import { MobileContextBar } from '../nav/MobileContextBar';
import { norm } from '@/lib/format';

export type BuscaItem = { id: string; nome: string; spec: string; categoria: string; foto: string; valor: string; href: string };

const SUGESTOES = ['Correntes', 'Pulseiras', 'Anéis', 'Pingentes', 'Brincos'];

export function SearchView({ itens, initialQuery }: { itens: BuscaItem[]; initialQuery: string }) {
  const [q, setQ] = useState(initialQuery);

  const achados = useMemo(() => {
    const alvo = norm(q).trim();
    if (!alvo) return [];
    return itens.filter((p) => norm(`${p.nome} ${p.spec} ${p.categoria}`).includes(alvo));
  }, [q, itens]);

  return (
    <>
    <MobileContextBar titulo="Buscar peça" subtitulo={achados.length ? achados.length + ' resultados' : 'Nome, elo ou categoria'} voltarHref="/" />
    <main className="erk-sec erk-entra" data-screen-label="Busca">
      <div className="erk-wrap">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Buscar peça</h1>
        <div style={{ marginTop: 20, maxWidth: 640 }}>
          <SearchBar valor={q} onChange={setQ} semBotao />
        </div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 16 }}>
          {SUGESTOES.map((s) => (
            <Chip key={s} ativo={q === s} onClick={() => setQ(s)}>
              {s}
            </Chip>
          ))}
        </div>
        <div style={{ marginTop: 26, display: 'grid', gap: 10, maxWidth: 720 }}>
          {achados.map((p) => (
            <Link className="erk-linha" href={p.href} key={p.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.foto} alt="" loading="lazy" />
              <span>
                <b>{p.nome}</b>
                <span>{p.spec}</span>
              </span>
              <i>{p.valor}</i>
            </Link>
          ))}
        </div>
        {q.trim() && achados.length === 0 ? <EmptyState>Nada encontrado para &quot;{q}&quot;.</EmptyState> : null}
      </div>
    </main>
    </>
  );
}
