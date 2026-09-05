'use client';

import type { ReactNode } from 'react';

export function Chip({
  children,
  ativo,
  onClick,
  className = '',
}: {
  children: ReactNode;
  ativo?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!ativo}
      className={['erk-chip', ativo ? 'is-on' : '', className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}
