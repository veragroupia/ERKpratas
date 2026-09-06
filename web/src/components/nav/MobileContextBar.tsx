'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '../ui/Icon';

/** Barra de contexto do celular: volta, título, apoio e atalho de início.
    Some no desktop (chrome-mobile) — cada tela informa seu próprio título. */
export function MobileContextBar({
  titulo,
  subtitulo,
  voltarHref,
  onVoltar,
}: {
  titulo: string;
  subtitulo?: string;
  voltarHref?: string;
  onVoltar?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="chrome-mobile" style={{ position: 'sticky', top: 'var(--h-topo-mob)', zIndex: 40, background: 'var(--surface-pagina)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ maxWidth: 'var(--max)', marginInline: 'auto', padding: '8px var(--pad)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          onClick={() => (onVoltar ? onVoltar() : voltarHref ? router.push(voltarHref) : router.back())}
          aria-label="Voltar"
          style={{ flex: 'none', width: 44, height: 44, marginLeft: -10, display: 'grid', placeItems: 'center', color: 'var(--text-1)' }}
        >
          <Icon name="voltar" size={21} />
        </button>
        <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 1 }}>
          <b style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {titulo}
          </b>
          {subtitulo ? (
            <em style={{ fontStyle: 'normal', fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {subtitulo}
            </em>
          ) : null}
        </span>
        <Link href="/" style={{ flex: 'none', width: 44, height: 44, display: 'grid', placeItems: 'center', color: 'var(--text-3)', marginRight: -10 }} aria-label="Início">
          <Icon name="inicio" size={20} />
        </Link>
      </div>
    </div>
  );
}
