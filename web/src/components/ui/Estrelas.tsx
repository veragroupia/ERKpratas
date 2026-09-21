'use client';

import { useId, useState } from 'react';

/* Estrela sólida, desenhada no mesmo viewBox 24 dos demais ícones da marca.
   Diferente do resto do conjunto, esta é preenchida e não traçada — nota
   precisa de massa para ser lida de relance numa lista. */
const D_ESTRELA =
  'M12 3.2l2.62 5.31 5.86.85-4.24 4.13 1 5.84L12 16.59l-5.24 2.76 1-5.84-4.24-4.13 5.86-.85z';

/** Estrelas de leitura. Aceita média quebrada (4,3) e preenche a fração. */
export function Estrelas({
  nota,
  tamanho = 15,
  className,
}: {
  nota: number;
  tamanho?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const valor = Math.max(0, Math.min(5, nota));

  return (
    <span
      className={['erk-estrelas', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={`${valor.toFixed(1).replace('.', ',')} de 5 estrelas`}
      style={{ ['--estrela-tam' as string]: `${tamanho}px` }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fracao = Math.max(0, Math.min(1, valor - i));
        const gid = `est-${uid}-${i}`;
        return (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {fracao > 0 && fracao < 1 ? (
              <defs>
                <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
                  <stop offset={fracao} stopColor="var(--estrela-on)" />
                  <stop offset={fracao} stopColor="var(--estrela-off)" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              d={D_ESTRELA}
              fill={fracao >= 1 ? 'var(--estrela-on)' : fracao <= 0 ? 'var(--estrela-off)' : `url(#${gid})`}
            />
          </svg>
        );
      })}
    </span>
  );
}

const ROTULOS = ['', 'Não gostei', 'Podia ser melhor', 'Boa', 'Muito boa', 'Excelente'];

/** Seletor de nota do formulário. Grupo de rádio de verdade, para funcionar
    com teclado e leitor de tela — não é um punhado de botões soltos. */
export function EstrelasInput({
  valor,
  onChange,
  nome = 'nota',
}: {
  valor: number;
  onChange: (n: number) => void;
  nome?: string;
}) {
  const [hover, setHover] = useState(0);
  const mostrado = hover || valor;

  return (
    <div className="erk-estrelas-input">
      <div role="radiogroup" aria-label="Sua nota" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={n <= mostrado ? 'is-on' : undefined} onMouseEnter={() => setHover(n)}>
            <input
              type="radio"
              name={nome}
              value={n}
              checked={valor === n}
              onChange={() => onChange(n)}
            />
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={D_ESTRELA} />
            </svg>
            <span className="sr-only">{`${n} ${n === 1 ? 'estrela' : 'estrelas'} — ${ROTULOS[n]}`}</span>
          </label>
        ))}
      </div>
      <em aria-live="polite">{mostrado ? ROTULOS[mostrado] : 'Toque para dar a nota'}</em>
    </div>
  );
}
