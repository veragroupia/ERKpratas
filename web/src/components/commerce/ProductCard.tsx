'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Tag';
import { Price } from '../ui/Price';
import { Button } from '../ui/Button';

export type ProductCardData = {
  id: string;
  nome: string;
  categoria?: string;
  spec?: string;
  foto: string;
  valor: string;
  antigo?: string;
  parcela?: string;
  tags?: string[];
  desconto?: string;
  favorito?: boolean;
  href: string;
};

export function ProductCard({
  data,
  onFavorito,
  onAdicionar,
}: {
  data: ProductCardData;
  onFavorito?: () => void;
  onAdicionar?: () => void;
}) {
  const { nome, categoria, spec, foto, valor, antigo, parcela, tags = [], desconto, favorito, href } = data;
  const router = useRouter();
  const abrir = (e: MouseEvent) => {
    const alvo = e.target as HTMLElement;
    if (alvo.closest('a,button')) return;
    router.push(href);
  };
  return (
    <article className="erk-card" onClick={abrir} style={{ cursor: 'pointer' }}>
      <Link className="erk-card__fig" href={href} aria-label={nome}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={foto} alt={nome} loading="lazy" decoding="async" />
        <div className="erk-card__tags">
          {desconto ? <Tag oferta>{desconto}</Tag> : null}
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <button
          className={['erk-card__fav', favorito ? 'is-on' : ''].filter(Boolean).join(' ')}
          type="button"
          aria-label="Favoritar"
          aria-pressed={!!favorito}
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorito?.();
          }}
        >
          <Icon name="favorito" />
        </button>
      </Link>
      <div className="erk-card__b">
        {categoria ? <p className="erk-card__cat">{categoria}</p> : null}
        <h3 className="erk-card__nome">{nome}</h3>
        {spec ? <p className="erk-card__spec">{spec}</p> : null}
        <Price valor={valor} antigo={antigo} parcela={parcela} />
        <Button full onClick={onAdicionar}>
          Comprar
        </Button>
        <button className="erk-card__mais" type="button" aria-label={'Adicionar ' + nome} onClick={onAdicionar}>
          <Icon name="mais" />
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({
  children,
  cols = 4,
  style,
  className = '',
}: {
  children: ReactNode;
  cols?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={['erk-grade', className].filter(Boolean).join(' ')}
      style={{ ['--cols' as any]: cols, ...style }}
    >
      {children}
    </div>
  );
}
