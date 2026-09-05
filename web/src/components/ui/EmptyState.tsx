import type { ReactNode } from 'react';

export function EmptyState({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={['erk-vazio', className].filter(Boolean).join(' ')}>{children}</p>;
}
