import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { fmt, fotoUrl, parcela } from '@/lib/format';
import { getFavoriteProductIds } from '@/lib/favorites';
import { toCard, medidasFor, productSpec } from '@/lib/products';
import { ProductDetail, type ProdutoDetalhe } from '@/components/product/ProductDetail';

export default async function PecaPage({ params }: { params: { id: string } }) {
  const produto = await prisma.product.findUnique({ where: { id: params.id }, include: { category: true } });
  if (!produto) notFound();

  const relacionados = await prisma.product.findMany({
    where: { categoryId: produto.categoryId, id: { not: produto.id } },
    include: { category: true },
    take: 4,
  });

  const favoritos = await getFavoriteProductIds();

  const fotos = [produto, ...relacionados].slice(0, 3).map((p) => fotoUrl(p.photoId, 800));
  const medidas = medidasFor(produto.categoryId);
  const medidaProd = produto.buildMedida ? `${produto.buildMedida} cm` : undefined;
  const medidaInicial = medidas.includes(medidaProd || '') ? (medidaProd as string) : medidas[Math.min(2, medidas.length - 1)];

  const detalhe: ProdutoDetalhe = {
    id: produto.id,
    nome: produto.name,
    cat: produto.category.name,
    catHref: `/catalogo/${produto.categoryId}`,
    spec: produto.spec,
    valor: fmt(produto.price),
    antigo: produto.oldPrice ? fmt(produto.oldPrice) : undefined,
    parcela: parcela(produto.price),
    precoNum: produto.price,
    favoritoInicial: favoritos.includes(produto.id),
    fotos,
    medidas,
    medidaInicial,
    rotuloMedida: produto.categoryId === 'aneis' ? 'Aro' : 'Medida',
    buildSpec: { ...productSpec(produto), acabamento: 'polido' },
    fecho: produto.categoryId === 'correntes' || produto.categoryId === 'pulseiras' ? 'Gaveta reforçada com trava dupla' : 'Não se aplica',
    pesoAproximado:
      (produto.buildTipo === 'corrente' || produto.buildTipo === 'pulseira'
        ? Math.round((produto.buildMedida || 0) * produto.buildEsp * produto.buildEsp * 0.031)
        : 6) + ' g',
  };

  return <ProductDetail produto={detalhe} relacionados={relacionados.map((p) => toCard(p, favoritos))} />;
}
