import Link from 'next/link';
import { prisma } from '@/lib/db';
import { fmt, fotoUrl } from '@/lib/format';
import { favoriteOwnerWhereRead } from '@/lib/favorites';
import { EmptyState } from '@/components/ui/EmptyState';
import { MobileContextBar } from '@/components/nav/MobileContextBar';

export default async function FavoritosPage() {
  const where = await favoriteOwnerWhereRead();
  const favoritos = await prisma.favorite.findMany({ where, include: { product: true }, orderBy: { createdAt: 'desc' } });

  return (
    <>
      <MobileContextBar titulo="Favoritos" subtitulo={`${favoritos.length} guardadas`} voltarHref="/" />
      <main className="erk-sec erk-entra" data-screen-label="Favoritos">
        <div className="erk-wrap">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Favoritos</h1>
          <div style={{ marginTop: 24, display: 'grid', gap: 10, maxWidth: 720 }}>
            {favoritos.map((f) => (
              <Link className="erk-linha" href={`/peca/${f.product.id}`} key={f.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fotoUrl(f.product.photoId, 200)} alt="" loading="lazy" />
                <span>
                  <b>{f.product.name}</b>
                  <span>{f.product.spec}</span>
                </span>
                <i>{fmt(f.product.price)}</i>
              </Link>
            ))}
          </div>
          {favoritos.length === 0 ? <EmptyState>Toque no coração de uma peça para guardar aqui.</EmptyState> : null}
        </div>
      </main>
    </>
  );
}
