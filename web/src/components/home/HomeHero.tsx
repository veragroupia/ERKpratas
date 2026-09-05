import Link from 'next/link';
import { Hero } from '../commerce/Hero';
import { Icon } from '../ui/Icon';
import { fotoUrl } from '@/lib/format';

const PROVAS = [
  { icone: 'puncao', texto: 'Punção 925' },
  { icone: 'garantia', texto: 'Garantia vitalícia' },
  { icone: 'entrega', texto: 'Motoboy na região' },
];

export function HomeHero() {
  const foto = fotoUrl(16109292, 1000);
  return (
    <>
      {/* ---------- celular: foto sangrada, cartão arredondado ---------- */}
      <section className="chrome-mobile" style={{ padding: '0 var(--pad)' }}>
        <div style={{ position: 'relative', marginTop: -56, minHeight: 'calc(100vh - 12px)', borderRadius: 22, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
          <div role="img" aria-label="Homem usando corrente cubana de prata 925" style={{ position: 'absolute', inset: 0, backgroundImage: `url("${foto}")`, backgroundSize: 'cover', backgroundPosition: '50% 24%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(13,15,18,.34) 0%,rgba(13,15,18,0) 22%,rgba(13,15,18,.06) 46%,rgba(13,15,18,.86) 100%)' }} />
          <div style={{ position: 'relative', width: '100%', padding: '0 22px 26px', display: 'grid', gap: 12 }}>
            <span style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(242,244,247,.74)' }}>Coleção masculina · prata 925</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(25px,6.6vw,32px)', lineHeight: 1.14, color: '#F2F4F7' }}>
              Corrente cubana a partir de <span style={{ color: 'var(--text-oferta)' }}>R$ 231</span>
            </h1>
            <p style={{ fontSize: 13.5, lineHeight: 1.5, color: 'rgba(242,244,247,.78)', maxWidth: '30ch' }}>
              Punção gravado, fecho gaveta reforçado e garantia vitalícia.
            </p>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 6 }}>
              <Link
                className="erk-btn"
                href="/catalogo"
                style={{ flex: '1 1 130px', minWidth: 0, background: 'rgba(13,15,18,.62)', border: '1px solid rgba(242,244,247,.34)', color: '#F2F4F7', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', padding: '0 14px', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
              >
                Ver o catálogo
              </Link>
              <Link
                className="erk-btn"
                href="/montar"
                style={{ flex: '1 1 130px', minWidth: 0, background: 'rgba(13,15,18,.62)', border: '1px solid rgba(242,244,247,.34)', color: '#F2F4F7', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', padding: '0 14px', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
              >
                Montar a minha
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(242,244,247,.16)' }}>
              {PROVAS.map((p) => (
                <span key={p.texto} style={{ flex: '1 1 0', minWidth: 0, fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(242,244,247,.6)', textAlign: 'center' }}>
                  {p.texto}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link href="/catalogo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '16px 0 4px', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
          Deslize para ver as peças
          <Icon name="seta" size={15} style={{ transform: 'rotate(90deg)' }} />
        </Link>
      </section>

      {/* ---------- desktop ---------- */}
      <section className="chrome-desktop" style={{ padding: 'clamp(20px,3vw,34px) 0 0' }}>
        <div className="erk-wrap">
          <Hero
            selo="Coleção masculina"
            titulo="Corrente cubana a partir de"
            destaque="R$ 231"
            sub="Prata 925 legítima, com punção gravado e fecho gaveta reforçado. Feita na nossa oficina em Salto e enviada para todo o Brasil."
            foto={foto}
            fotoAlt="Homem usando corrente cubana de prata 925"
            precoRotulo="Corrente cubana 60 cm"
            preco="R$ 231,00"
            precoAntigo="R$ 289,00"
            provas={PROVAS}
            acao="Ver o catálogo"
            acaoHref="/catalogo"
            acaoSec="Montar a minha peça"
            acaoSecHref="/montar"
          />
        </div>
      </section>
    </>
  );
}
