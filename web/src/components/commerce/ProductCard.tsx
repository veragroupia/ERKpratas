'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { Icon } from '../ui/Icon';
import { Tag } from '../ui/Tag';
import { Price } from '../ui/Price';
import { Button } from '../ui/Button';
import { voarAteSacola } from './voarAteSacola';

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
  /** medidas disponíveis — o botão de sacola abre esta lista */
  medidas?: string[];
  /** frase de urgência no canto da foto: "Últimas 2!", "Oferta imperdível" */
  destaque?: string;
  esgotado?: boolean;
};

export function ProductCard({
  data,
  onFavorito,
  onAdicionar,
}: {
  data: ProductCardData;
  onFavorito?: () => void;
  onAdicionar?: (medida?: string) => void;
}) {
  const {
    nome, categoria, spec, foto, valor, antigo, parcela,
    tags = [], desconto, favorito, href, medidas = [], destaque, esgotado,
  } = data;
  const router = useRouter();
  const [abertoMedidas, setAbertoMedidas] = useState(false);
  const cartaRef = useRef<HTMLElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  // fechar as medidas ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!abertoMedidas) return;
    const fora = (e: Event) => {
      if (!cartaRef.current?.contains(e.target as Node)) setAbertoMedidas(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbertoMedidas(false);
    document.addEventListener('pointerdown', fora);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', fora);
      document.removeEventListener('keydown', esc);
    };
  }, [abertoMedidas]);

  const abrir = (e: MouseEvent) => {
    const alvo = e.target as HTMLElement;
    if (alvo.closest('a,button')) return;
    router.push(href);
  };

  function confirmar(medida?: string) {
    setAbertoMedidas(false);
    if (botaoRef.current) voarAteSacola(botaoRef.current);
    onAdicionar?.(medida);
  }

  /** Sem medida a escolher, o botão adiciona direto; com medidas, abre a lista. */
  function aoClicarSacola(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (esgotado) {
      router.push(href);
      return;
    }
    if (medidas.length > 1) setAbertoMedidas((v) => !v);
    else confirmar(medidas[0]);
  }

  return (
    <article ref={cartaRef} className="erk-card" onClick={abrir} style={{ cursor: 'pointer' }}>
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

        {destaque ? <span className="erk-card__destaque">{destaque}</span> : null}

        <button
          ref={botaoRef}
          type="button"
          className={['erk-card__sacola', abertoMedidas ? 'is-on' : ''].filter(Boolean).join(' ')}
          aria-label={esgotado ? `Ver ${nome}` : `Adicionar ${nome} à sacola`}
          aria-expanded={medidas.length > 1 ? abertoMedidas : undefined}
          onClick={aoClicarSacola}
        >
          <Icon name="sacola" />
        </button>
      </Link>

      {abertoMedidas ? (
        <div className="erk-card__medidas" role="dialog" aria-label={`Medida de ${nome}`} onClick={(e) => e.stopPropagation()}>
          <p>Escolha a medida</p>
          <div>
            {medidas.map((m) => (
              <button key={m} type="button" onClick={() => confirmar(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="erk-card__b">
        {categoria ? <p className="erk-card__cat">{categoria}</p> : null}
        <h3 className="erk-card__nome">{nome}</h3>
        {spec ? <p className="erk-card__spec">{spec}</p> : null}
        <Price valor={valor} antigo={antigo} parcela={parcela} />
        {esgotado ? (
          <Button full variant="secondary" onClick={() => router.push(href)}>
            Encomendar
          </Button>
        ) : (
          <Button full onClick={() => confirmar(medidas.length === 1 ? medidas[0] : undefined)}>
            Comprar
          </Button>
        )}
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
