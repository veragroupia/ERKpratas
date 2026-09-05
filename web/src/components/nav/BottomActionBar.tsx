'use client';

import { Button } from '../ui/Button';

/** Barra fixa acima da área segura do celular: valor + apoio + ação da vez.
    Só aparece abaixo de 900px (chrome-mobile) — no desktop a ação fica no corpo da página. */
export function BottomActionBar({
  valor,
  sub,
  botao,
  onClick,
  disabled,
  variant = 'primary',
}: {
  valor: string;
  sub?: string;
  botao: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'accent';
}) {
  return (
    <div className="chrome-mobile">
      <div style={{ height: 78 }} />
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          background: 'var(--surface-card)',
          borderTop: '1px solid var(--border-2)',
          boxShadow: '0 -14px 40px rgba(0,0,0,.45)',
        }}
      >
        <div style={{ maxWidth: 'var(--max)', marginInline: 'auto', padding: '10px var(--pad) calc(10px + var(--safe))', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 2 }}>
            <b style={{ fontSize: 17, fontWeight: 700, whiteSpace: 'nowrap' }}>{valor}</b>
            {sub ? (
              <em style={{ fontStyle: 'normal', fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {sub}
              </em>
            ) : null}
          </span>
          <Button variant={variant} onClick={onClick} disabled={disabled} style={{ flex: 'none' }}>
            {botao}
          </Button>
        </div>
      </div>
    </div>
  );
}
