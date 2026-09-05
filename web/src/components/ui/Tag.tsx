import type { ReactNode } from 'react';

export function Tag({ children, oferta, className = '' }: { children: ReactNode; oferta?: boolean; className?: string }) {
  return <span className={['erk-tag', oferta ? 'erk-tag--off' : '', className].filter(Boolean).join(' ')}>{children}</span>;
}

export function Selo({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={['erk-selo', className].filter(Boolean).join(' ')}>{children}</span>;
}
