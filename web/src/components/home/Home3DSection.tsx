'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Viewer3D } from '../viewer3d/Viewer3D';
import { FullscreenViewerSheet } from '../viewer3d/FullscreenViewerSheet';
import type { PecaSpec } from '../viewer3d/jewelryViewer';
import { fotoUrl } from '@/lib/format';

const SPEC_HOME: PecaSpec = { tipo: 'corrente', elo: 'cubano', esp: 4.5, medida: 60, acabamento: 'polido' };

export function Home3DSection() {
  const [sheet, setSheet] = useState(false);
  const router = useRouter();

  return (
    <section className="erk-sec">
      <div className="erk-wrap">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3.2vw,52px)', alignItems: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 22, padding: 'clamp(20px,2.8vw,40px)' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Ver em 3D</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(21px,2.5vw,32px)', lineHeight: 1.16, marginTop: 12 }}>
              Gire a peça antes de comprar
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: 15, marginTop: 14, maxWidth: '52ch' }}>
              Cada peça do catálogo tem o modelo 3D montado elo por elo, na medida real. Arraste para girar, use a rolagem para aproximar e veja a espessura de perto — do jeito que você veria no balcão.
            </p>
            <ul style={{ display: 'grid', gap: 11, marginTop: 20 }}>
              {['Elo cubano, grumet, veneziana, cartier e baiana', 'Espessura de 2,5 mm a 8 mm, na escala certa', 'Polido, escovado ou oxidado'].map((t) => (
                <li key={t} style={{ display: 'flex', gap: 11, alignItems: 'center', fontSize: 14, color: 'var(--text-2)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', flex: 'none' }} />
                  {t}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 26 }}>
              <Button variant="primary" href="/montar">
                Montar a minha peça
              </Button>
              <Button variant="secondary" href="/peca/p01">
                Ver a corrente cubana
              </Button>
            </div>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div className="chrome-desktop" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: 'var(--gradiente-hero)', border: '1px solid var(--border-1)', height: 'clamp(300px,38vw,420px)' }}>
              <Viewer3D spec={SPEC_HOME} legenda="Corrente cubana" />
              <span style={{ position: 'absolute', left: 14, bottom: 14, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', background: 'rgba(13,15,18,.72)', padding: '6px 12px', borderRadius: 980, backdropFilter: 'blur(8px)' }}>
                Arraste para girar
              </span>
            </div>
            <div className="chrome-mobile" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-1)', background: 'var(--surface-forte)', aspectRatio: '4/3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fotoUrl(16124761, 800)}
                alt="Corrente cubana de prata 925"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--filtro-foto)' }}
              />
              <button
                type="button"
                onClick={() => setSheet(true)}
                style={{ position: 'absolute', left: '50%', bottom: 14, transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: 9, height: 42, padding: '0 20px', borderRadius: 980, background: 'rgba(13,15,18,.82)', border: '1px solid rgba(242,244,247,.28)', color: '#F2F4F7', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
              >
                <Icon name="oficina" size={17} />
                Ver em 3D
              </button>
            </div>
          </div>
        </div>
      </div>
      <FullscreenViewerSheet
        aberto={sheet}
        onFechar={() => setSheet(false)}
        titulo="Corrente cubana"
        subtitulo="Elo cubano · 4,5 mm · 60 cm"
        valor="R$ 231,00"
        parcela="6x de R$ 38,50 sem juros"
        botao="Ver a peça"
        onBotao={() => router.push('/peca/p01')}
        spec={SPEC_HOME}
      />
    </section>
  );
}
