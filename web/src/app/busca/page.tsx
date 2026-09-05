import { prisma } from '@/lib/db';
import { fmt, fotoUrl } from '@/lib/format';
import { SearchView, type BuscaItem } from '@/components/search/SearchView';

export default async function BuscaPage({ searchParams }: { searchParams: { q?: string } }) {
  const produtos = await prisma.product.findMany({ include: { category: true } });
  const itens: BuscaItem[] = produtos.map((p) => ({
    id: p.id,
    nome: p.name,
    spec: p.spec,
    categoria: p.category.name,
    foto: fotoUrl(p.photoId, 200),
    valor: fmt(p.price),
    href: `/peca/${p.id}`,
  }));
  return <SearchView itens={itens} initialQuery={searchParams.q || ''} />;
}
