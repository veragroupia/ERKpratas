import type { ReactNode } from 'react';
import { Selo } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export type ProvaItem = { icone: string; texto: string };

export function Hero({
  selo,
  titulo,
  destaque,
  sufixo,
  sub,
  foto,
  fotoAlt,
  precoRotulo,
  preco,
  precoAntigo,
  provas = [],
  acao,
  acaoHref = '#',
  acaoSec,
  acaoSecHref = '#',
  className = '',
}: {
  selo?: string;
  titulo: string;
  destaque?: string;
  sufixo?: ReactNode;
  sub?: string;
  foto: string;
  fotoAlt?: string;
  precoRotulo?: string;
  preco?: string;
  precoAntigo?: string;
  provas?: ProvaItem[];
  acao?: string;
  acaoHref?: string;
  acaoSec?: string;
  acaoSecHref?: string;
  className?: string;
}) {
  return (
    <div className={['erk-hero', className].filter(Boolean).join(' ')}>
      <div className="erk-hero__txt">
        {selo ? <Selo>{selo}</Selo> : null}
        <h1>
          {titulo}
          {destaque ? (
            <>
              {' '}
              <em>{destaque}</em>
            </>
          ) : null}
          {sufixo}
        </h1>
        {sub ? <p className="erk-hero__sub">{sub}</p> : null}
        <div className="erk-hero__btns">
          {acao ? (
            <Button href={acaoHref} icone="seta">
              {acao}
            </Button>
          ) : null}
          {acaoSec ? (
            <Button variant="secondary" href={acaoSecHref}>
              {acaoSec}
            </Button>
          ) : null}
        </div>
        {provas.length ? (
          <ul className="erk-hero__chips">
            {provas.map((p) => (
              <li key={p.texto}>
                <Icon name={p.icone} /> {p.texto}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <figure className="erk-hero__fig">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={foto} alt={fotoAlt || ''} />
        {preco ? (
          <figcaption className="erk-hero__preco">
            {precoRotulo ? <span>{precoRotulo}</span> : null}
            <b>{preco}</b>
            {precoAntigo ? (
              <s style={{ color: 'var(--text-antigo)', fontSize: 13, marginLeft: 7, fontWeight: 400 }}>{precoAntigo}</s>
            ) : null}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
