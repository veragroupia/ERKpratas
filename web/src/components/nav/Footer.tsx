'use client';

import { useState } from 'react';
import { Logo } from '../ui/Logo';

export type FooterColumn = { titulo: string; itens: string[] };

export function Footer({
  sobre,
  pagamentos = [],
  colunas = [],
  fim = [],
}: {
  sobre?: string;
  pagamentos?: string[];
  colunas?: FooterColumn[];
  fim?: string[];
}) {
  const [aberta, setAberta] = useState<string | null>(null);
  return (
    <footer className="erk-rod">
      <div className="erk-wrap">
        <div className="erk-rod__g">
          <div className="erk-rod__sobre">
            <Logo />
            {sobre ? <p>{sobre}</p> : null}
            {pagamentos.length ? (
              <div className="erk-rod__pag">
                {pagamentos.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            ) : null}
          </div>
          {colunas.map((c) => (
            <div key={c.titulo} className={['erk-rod__col', aberta === c.titulo ? 'aberto' : ''].filter(Boolean).join(' ')}>
              <h4
                role="button"
                tabIndex={0}
                onClick={() => setAberta(aberta === c.titulo ? null : c.titulo)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setAberta(aberta === c.titulo ? null : c.titulo);
                  }
                }}
              >
                {c.titulo}
              </h4>
              <ul>
                {c.itens.map((i) => (
                  <li key={i}>
                    <a href="#">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="erk-rod__fim">
          {fim.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
