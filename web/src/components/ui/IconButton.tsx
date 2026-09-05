'use client';

import Link from 'next/link';
import { Icon } from './Icon';

export function IconButton({
  icone,
  rotulo,
  contador,
  href,
  onClick,
  ariaLabel,
  className = '',
}: {
  icone: string;
  rotulo?: string;
  contador?: number | string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}) {
  const conteudo = (
    <>
      <Icon name={icone} />
      {contador ? <b>{contador}</b> : null}
      {rotulo ? <span>{rotulo}</span> : null}
    </>
  );
  const cls = ['erk-icobtn', className].filter(Boolean).join(' ');
  if (href) {
    return (
      <Link className={cls} href={href} aria-label={ariaLabel || rotulo}>
        {conteudo}
      </Link>
    );
  }
  return (
    <button className={cls} type="button" onClick={onClick} aria-label={ariaLabel || rotulo}>
      {conteudo}
    </button>
  );
}
