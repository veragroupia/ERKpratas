import { prisma } from '@/lib/db';
import { toCard } from '@/lib/products';
import { getFavoriteProductIds } from '@/lib/favorites';
import { SectionHeader } from '@/components/nav/SectionHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductGridInteractive } from '@/components/commerce/ProductGridInteractive';
import { MobileContextBar } from '@/components/nav/MobileContextBar';
import { CatalogFilters } from './CatalogFilters';

export async function CatalogView({ filtro, ordem }: { filtro: string; ordem: string }) {
  const [categorias, favoritos] = await Promise.all([
    prisma.category.findMany({ include: { _count: { select: { products: true } } } }),
    getFavoriteProductIds(),
  ]);

  let produtos = await (filtro === 'todas'
    ? prisma.product.findMany({ include: { category: true } })
    : filtro === 'ofertas'
      ? prisma.product.findMany({ where: { oldPrice: { not: null } }, include: { category: true } })
      : prisma.product.findMany({ where: { categoryId: filtro }, include: { category: true } }));

  if (ordem === 'menor') produtos = [...produtos].sort((a, b) => a.price - b.price);
  if (ordem === 'maior') produtos = [...produtos].sort((a, b) => b.price - a.price);

  const catAtual = categorias.find((c) => c.id === filtro);
  const titulo = filtro === 'todas' ? 'Catálogo completo' : filtro === 'ofertas' ? 'Ofertas' : catAtual?.name || 'Catálogo';
  const apoio = produtos.length + ' peças · prata 925 legítima · pronta entrega';

  const totalTodas = await prisma.product.count();
  const totalOfertas = await prisma.product.count({ where: { oldPrice: { not: null } } });

  return (
    <>
      <MobileContextBar titulo={titulo} subtitulo={apoio} voltarHref="/" />
      <main className="erk-sec erk-entra" data-screen-label="Catálogo">
        <div className="erk-wrap">
          <div className="chrome-desktop">
            <SectionHeader titulo={titulo} apoio={apoio} />
          </div>
          <CatalogFilters
            categorias={categorias.map((c) => ({ id: c.id, nome: c.name, n: String(c._count.products) }))}
            filtroAtual={filtro}
            ordemAtual={ordem}
            totalTodas={totalTodas}
            totalOfertas={totalOfertas}
          />
          {produtos.length > 0 ? (
            <ProductGridInteractive cols={3} produtos={produtos.map((p) => toCard(p, favoritos))} />
          ) : (
            <EmptyState>Nada por aqui ainda. Toque em &quot;Todas&quot; para ver o catálogo inteiro.</EmptyState>
          )}
        </div>
      </main>
    </>
  );
}
