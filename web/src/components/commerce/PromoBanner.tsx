import type { ReactNode } from 'react';
import { Button } from '../ui/Button';

export function PromoBanner({
  olho,
  titulo,
  texto,
  foto,
  acao,
  acaoHref = '#',
  acento,
  className = '',
}: {
  olho?: string;
  titulo: string;
  texto?: string;
  foto: string;
  acao?: string;
  acaoHref?: string;
  acento?: boolean;
  className?: string;
}) {
  return (
    <div className={['erk-promo', className].filter(Boolean).join(' ')}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={foto} alt={titulo} loading="lazy" />
      <div className="erk-promo__in">
        {olho ? <span>{olho}</span> : null}
        <h3>{titulo}</h3>
        {texto ? <p>{texto}</p> : null}
        {acao ? (
          <Button variant={acento ? 'accent' : 'primary'} href={acaoHref}>
            {acao}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function PromoPair({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={['erk-promos', className].filter(Boolean).join(' ')}>{children}</div>;
}
