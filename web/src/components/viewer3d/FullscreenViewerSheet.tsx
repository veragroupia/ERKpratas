'use client';

import { useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { Viewer3D } from './Viewer3D';
import type { PecaSpec } from './jewelryViewer';

/** Modal em tela cheia do 3D no celular: cabeçalho, visor e rodapé com preço + ação.
    Um dedo gira, dois dedos aproximam — orbitaVertical ligado. */
export function FullscreenViewerSheet({
  aberto,
  onFechar,
  titulo,
  subtitulo,
  valor,
  parcela,
  botao,
  onBotao,
  spec,
}: {
  aberto: boolean;
  onFechar: () => void;
  titulo: string;
  subtitulo?: string;
  valor: string;
  parcela?: string;
  botao: string;
  onBotao: () => void;
  spec: PecaSpec;
}) {
  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div role="dialog" aria-label="Peça em 3D" style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'var(--surface-pagina)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '10px var(--pad)', borderBottom: '1px solid var(--border-1)' }}>
        <button type="button" onClick={onFechar} aria-label="Fechar" style={{ flex: 'none', width: 44, height: 44, marginLeft: -10, display: 'grid', placeItems: 'center', color: 'var(--text-1)' }}>
          <Icon name="fechar" size={21} />
        </button>
        <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 1 }}>
          <b style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{titulo}</b>
          {subtitulo ? <em style={{ fontStyle: 'normal', fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitulo}</em> : null}
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: 'relative', background: 'var(--gradiente-hero)' }}>
        <Viewer3D spec={spec} orbitaVertical legenda={titulo} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontSize: 11.5, color: 'var(--text-3)' }}>Um dedo gira · dois dedos aproximam</span>
      </div>
      <div style={{ flex: 'none', padding: '12px var(--pad) calc(12px + var(--safe))', borderTop: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 2 }}>
          <b style={{ fontSize: 17, fontWeight: 700, whiteSpace: 'nowrap' }}>{valor}</b>
          {parcela ? <em style={{ fontStyle: 'normal', fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{parcela}</em> : null}
        </span>
        <Button onClick={onBotao} style={{ flex: 'none' }}>
          {botao}
        </Button>
      </div>
    </div>
  );
}
