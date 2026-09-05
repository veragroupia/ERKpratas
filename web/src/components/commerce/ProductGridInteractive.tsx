'use client';

import { useRouter } from 'next/navigation';
import { ProductCard, ProductGrid, type ProductCardData } from './ProductCard';

export function ProductGridInteractive({ produtos, cols = 4 }: { produtos: ProductCardData[]; cols?: number }) {
  const router = useRouter();

  async function favoritar(id: string) {
    await fetch('/api/favorites/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id }),
    });
    router.refresh();
  }

  async function adicionar(id: string) {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    });
    router.refresh();
  }

  return (
    <ProductGrid cols={cols}>
      {produtos.map((p) => (
        <ProductCard key={p.id} data={p} onFavorito={() => favoritar(p.id)} onAdicionar={() => adicionar(p.id)} />
      ))}
    </ProductGrid>
  );
}
