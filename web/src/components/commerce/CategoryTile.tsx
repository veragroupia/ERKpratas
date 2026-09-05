import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../ui/Icon';

export function CategoryTile({
  nome,
  contagem,
  foto,
  href = '#',
  className = '',
}: {
  nome: string;
  contagem?: string;
  foto: string;
  href?: string;
  className?: string;
}) {
  return (
    <Link className={['erk-tile', className].filter(Boolean).join(' ')} href={href}>
      <span className="erk-tile__fig">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={foto} alt={nome} loading="lazy" />
      </span>
      <span className="erk-tile__t">{nome}</span>
      {contagem ? <span className="erk-tile__n">{contagem}</span> : null}
      <span className="erk-tile__i">
        <Icon name="seta" />
      </span>
    </Link>
  );
}

export function CategoryTiles({
  children,
  cols = 6,
  colsMd = 3,
  style,
  className = '',
}: {
  children: ReactNode;
  cols?: number;
  colsMd?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={['erk-tiles', className].filter(Boolean).join(' ')} style={{ ['--cols' as any]: cols, ['--cols-md' as any]: colsMd, ...style }}>
      {children}
    </div>
  );
}
