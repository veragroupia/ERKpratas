'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '../ui/Icon';
import { Chip } from '../ui/Chip';
import { Viewer3D } from '../viewer3d/Viewer3D';
import { FullscreenViewerSheet } from '../viewer3d/FullscreenViewerSheet';
import { BottomActionBar } from '../nav/BottomActionBar';
import { MobileContextBar } from '../nav/MobileContextBar';
import { useLargo } from '@/lib/useLargo';
import type { PecaSpec } from '../viewer3d/jewelryViewer';
import { ProductGridInteractive } from '../commerce/ProductGridInteractive';
import type { ProductCardData } from '../commerce/ProductCard';

export type ProdutoDetalhe = {
  id: string;
  nome: string;
  cat: string;
  catHref: string;
  spec: string;
  valor: string;
  antigo?: string;
  parcela: string;
  precoNum: number;
  favoritoInicial: boolean;
  fotos: string[];
  medidas: string[];
  medidaInicial: string;
  rotuloMedida: string;
  buildSpec: PecaSpec;
  fecho: string;
  pesoAproximado: string;
};

export function ProductDetail({ produto, relacionados }: { produto: ProdutoDetalhe; relacionados: ProductCardData[] }) {
  const largo = useLargo();
  const router = useRouter();
  const [vista, setVista] = useState<'foto' | '3d'>('foto');
  const [fotoIdx, setFotoIdx] = useState(0);
  const [medida, setMedida] = useState(produto.medidaInicial);
  const [favorito, setFavorito] = useState(produto.favoritoInicial);
  const [sheet, setSheet] = useState(false);
  const [pulso, setPulso] = useState(false);

  const medidaNum = parseInt(medida, 10);
  const spec: PecaSpec = useMemo(() => ({ ...produto.buildSpec, medida: isNaN(medidaNum) ? produto.buildSpec.medida : medidaNum }), [produto.buildSpec, medidaNum]);

  async function adicionar() {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: produto.id, quantity: 1 }),
    });
    router.push('/sacola');
    router.refresh();
  }

  async function favoritar() {
    const novo = !favorito;
    setFavorito(novo);
    if (novo) {
      setPulso(true);
      setTimeout(() => setPulso(false), 450);
    }
    await fetch('/api/favorites/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: produto.id }),
    });
    router.refresh();
  }

  const abrir3d = () => {
    if (largo) setVista('3d');
    else setSheet(true);
  };

  const ficha = [
    { k: 'Material', v: 'Prata 925 legítima, com punção gravado' },
    { k: 'Acabamento', v: 'Polimento espelhado feito na oficina' },
    { k: 'Fecho', v: produto.fecho },
    { k: 'Medida', v: medida },
    { k: 'Peso aproximado', v: produto.pesoAproximado },
    { k: 'Embalagem', v: 'Caixa própria com cartão' },
  ];

  return (
    <>
      <MobileContextBar titulo={produto.nome} subtitulo={`${produto.cat} · ${medida}`} voltarHref={produto.catHref} />
      <main data-screen-label="Peça" className="erk-entra">
        <div className="erk-wrap" style={{ paddingTop: 18 }}>
          <p style={{ fontSize: 12.5, color: 'var(--text-3)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/">Início</Link>
            <span>·</span>
            <Link href={produto.catHref}>{produto.cat}</Link>
            <span>·</span>
            <span style={{ color: 'var(--text-2)' }}>{produto.nome}</span>
          </p>
        </div>
        <section className="erk-sec" style={{ paddingTop: 22 }}>
          <div className="erk-wrap">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px,3.2vw,52px)', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 430px', minWidth: 0 }}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-1)', background: 'var(--surface-forte)', aspectRatio: '1/1' }}>
                  {vista === 'foto' ? (
                    <>
                      <div role="img" aria-label={produto.nome} style={{ width: '100%', height: '100%', backgroundImage: `url("${produto.fotos[fotoIdx]}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'var(--filtro-foto)' }} />
                      <span style={{ position: 'absolute', right: 12, top: 12, fontSize: 11.5, letterSpacing: '.08em', color: 'var(--text-2)', background: 'rgba(13,15,18,.72)', padding: '5px 11px', borderRadius: 980 }}>
                        {fotoIdx + 1} / {produto.fotos.length}
                      </span>
                      {produto.fotos.length > 1 ? (
                        <>
                          <button
                            type="button"
                            aria-label="Foto anterior"
                            onClick={() => setFotoIdx((i) => (i - 1 + produto.fotos.length) % produto.fotos.length)}
                            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, padding: 0, borderRadius: 980, background: 'rgba(13,15,18,.72)', border: '1px solid var(--border-2)', color: 'var(--text-1)' }}
                          >
                            <Icon name="voltar" size={19} />
                          </button>
                          <button
                            type="button"
                            aria-label="Próxima foto"
                            onClick={() => setFotoIdx((i) => (i + 1) % produto.fotos.length)}
                            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, padding: 0, borderRadius: 980, background: 'rgba(13,15,18,.72)', border: '1px solid var(--border-2)', color: 'var(--text-1)' }}
                          >
                            <Icon name="seta" size={19} />
                          </button>
                        </>
                      ) : null}
                      <button type="button" onClick={abrir3d} style={pilula3d}>
                        <Icon name="oficina" size={17} />
                        Ver em 3D
                      </button>
                    </>
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: 'var(--gradiente-hero)' }}>
                      <Viewer3D spec={spec} legenda={produto.nome} />
                      <span style={{ position: 'absolute', left: 14, bottom: 14, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', background: 'rgba(13,15,18,.72)', padding: '6px 12px', borderRadius: 980 }}>
                        Arraste para girar · rolagem aproxima
                      </span>
                    </div>
                  )}
                </div>
                {produto.fotos.length > 1 ? (
                  <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                    {produto.fotos.map((f, i) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => {
                          setFotoIdx(i);
                          setVista('foto');
                        }}
                        style={{ width: 74, height: 74, borderRadius: 10, overflow: 'hidden', padding: 0, background: 'var(--surface-forte)', border: '1px solid ' + (i === fotoIdx && vista !== '3d' ? 'var(--text-1)' : 'var(--border-2)') }}
                      >
                        <span style={{ display: 'block', width: '100%', height: '100%', backgroundImage: `url("${f}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'var(--filtro-foto)' }} />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div style={{ flex: '1 1 430px', minWidth: 0 }}>
                <p style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{produto.cat}</p>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.14, marginTop: 8 }}>{produto.nome}</h1>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 10 }}>{produto.spec} · punção 925 gravado</p>
                <div style={{ marginTop: 20 }}>
                  <p className="erk-preco erk-preco--g">
                    <b>{produto.valor}</b>
                    {produto.antigo ? <s>{produto.antigo}</s> : null}
                  </p>
                  <p className="erk-parc">{produto.parcela}</p>
                </div>
                <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 26 }}>{produto.rotuloMedida}</p>
                <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 10 }}>
                  {produto.medidas.map((m) => (
                    <Chip key={m} ativo={m === medida} onClick={() => setMedida(m)}>
                      {m}
                    </Chip>
                  ))}
                </div>
                <div style={{ display: 'grid', gap: 10, marginTop: 26 }}>
                  <div className="chrome-desktop">
                    <button type="button" className="erk-btn erk-btn--p erk-btn--full" onClick={adicionar}>
                      Adicionar à sacola
                    </button>
                  </div>
                  <a className="erk-btn erk-btn--s erk-btn--full" href="https://wa.me/5511911124875" target="_blank" rel="noopener noreferrer">
                    Tirar dúvida no WhatsApp
                  </a>
                  <button type="button" onClick={favoritar} style={estiloFav(favorito)}>
                    <Icon name="favorito" style={{ width: 18, height: 18, fill: favorito ? 'currentColor' : 'none', animation: pulso ? 'erkCoracao 420ms cubic-bezier(.28,0,.12,1)' : undefined }} />
                    {favorito ? 'Guardado nos favoritos' : 'Guardar nos favoritos'}
                  </button>
                </div>
                <ul style={{ display: 'grid', gap: 12, marginTop: 26, borderTop: '1px solid var(--border-1)', paddingTop: 22 }}>
                  <li style={itemLi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={iconeLi}>
                      <circle cx="6" cy="17" r="3" />
                      <circle cx="18" cy="17" r="3" />
                      <path d="M9 17h6l-2-8h3M6 9h4" />
                    </svg>
                    Motoboy no mesmo dia em Salto, Itu, Indaiatuba e Cabreúva
                  </li>
                  <li style={itemLi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={iconeLi}>
                      <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 8.5-4.1-.9-7-4.2-7-8.5V6z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    Garantia vitalícia contra defeito de fabricação
                  </li>
                  <li style={itemLi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={iconeLi}>
                      <path d="M14 4l6 6-3 3-6-6z" />
                      <path d="M11 7L4 14l3 3 7-7" />
                    </svg>
                    Ajuste de medida e gravação feitos na loja
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="erk-sec erk-sec--suave">
          <div className="erk-wrap">
            <div className="erk-cab">
              <div>
                <h2>A peça</h2>
                <p>Ficha técnica e cuidado</p>
              </div>
            </div>
            <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(250px,100%),1fr))', gap: '0 clamp(20px,3.4vw,52px)', margin: 0 }}>
              {ficha.map((f) => (
                <div key={f.k} style={{ display: 'grid', gap: 7, padding: '18px 0', borderTop: '1px solid var(--border-1)' }}>
                  <dt style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{f.k}</dt>
                  <dd style={{ fontSize: 15, margin: 0 }}>{f.v}</dd>
                </div>
              ))}
            </dl>
            <p style={{ color: 'var(--text-2)', fontSize: 15, marginTop: 'clamp(22px,2.6vw,32px)', maxWidth: '70ch' }}>
              Prata escurece com o tempo — é reação natural do metal, não defeito. Guarde seca, longe de perfume e cloro. Quando perder o brilho, traga na loja: o polimento é rápido e a gente devolve a peça como saiu da bancada.
            </p>
          </div>
        </section>

        {relacionados.length ? (
          <section className="erk-sec">
            <div className="erk-wrap">
              <div className="erk-cab">
                <div>
                  <h2>Quem viu, viu também</h2>
                </div>
                <Link className="erk-verall" href="/catalogo">
                  Ver o catálogo <Icon name="seta" />
                </Link>
              </div>
              <ProductGridInteractive produtos={relacionados} />
            </div>
          </section>
        ) : null}
      </main>

      <BottomActionBar valor={produto.valor} sub={produto.parcela} botao="Adicionar" onClick={adicionar} />

      <FullscreenViewerSheet
        aberto={sheet}
        onFechar={() => setSheet(false)}
        titulo={produto.nome}
        subtitulo={produto.spec}
        valor={produto.valor}
        parcela={produto.parcela}
        botao="Adicionar"
        onBotao={() => {
          setSheet(false);
          adicionar();
        }}
        spec={spec}
      />
    </>
  );
}

const pilula3d: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  bottom: 14,
  transform: 'translateX(-50%)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 9,
  height: 42,
  padding: '0 20px',
  borderRadius: 980,
  background: 'rgba(13,15,18,.82)',
  border: '1px solid rgba(242,244,247,.28)',
  color: '#F2F4F7',
  fontSize: 12,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  backdropFilter: 'blur(8px)',
};

const itemLi: React.CSSProperties = { display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-2)' };
const iconeLi: React.CSSProperties = { width: 18, height: 18, flex: 'none', marginTop: 2 };

function estiloFav(ativo: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    height: 44,
    borderRadius: 980,
    fontSize: 13.5,
    whiteSpace: 'nowrap',
    transition: 'color 180ms cubic-bezier(.28,0,.12,1), background 180ms cubic-bezier(.28,0,.12,1)',
    color: ativo ? 'var(--acao-acento-bg)' : 'var(--text-2)',
    background: ativo ? 'color-mix(in oklab, var(--acao-acento-bg) 12%, transparent)' : 'transparent',
  };
}
