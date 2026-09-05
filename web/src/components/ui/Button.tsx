'use client';

import Link from 'next/link';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Icon } from './Icon';

type Variant = 'primary' | 'secondary' | 'accent';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icone,
  iconeAntes,
  full,
  disabled,
  onClick,
  target,
  rel,
  type = 'button',
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  href?: string;
  icone?: string;
  iconeAntes?: string;
  full?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  className?: string;
  style?: CSSProperties;
}) {
  const tom = { primary: 'erk-btn--p', secondary: 'erk-btn--s', accent: 'erk-btn--a' }[variant];
  const cls = ['erk-btn', tom, size === 'sm' ? 'erk-btn--sm' : '', full ? 'erk-btn--full' : '', className]
    .filter(Boolean)
    .join(' ');
  const conteudo = (
    <>
      {iconeAntes ? <Icon name={iconeAntes} /> : null}
      {children}
      {icone ? <Icon name={icone} /> : null}
    </>
  );
  if (href && !disabled) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a className={cls} href={href} target={target || '_blank'} rel={rel || 'noopener noreferrer'} style={style} onClick={onClick}>
          {conteudo}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} target={target} rel={rel} style={style} onClick={onClick as any}>
        {conteudo}
      </Link>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick} style={style}>
      {conteudo}
    </button>
  );
}
