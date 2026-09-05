import { prisma } from './db';
import { fmt, fotoUrl, parcela } from './format';
import type { ProductCardData } from '@/components/commerce/ProductCard';
import type { PecaSpec } from '@/components/viewer3d/jewelryViewer';
import type { Category, Product } from '@prisma/client';

export type ProductWithCategory = Product & { category: Category };

export function productSpec(p: Product): PecaSpec {
  return {
    tipo: p.buildTipo as PecaSpec['tipo'],
    elo: p.buildElo ?? undefined,
    esp: p.buildEsp,
    medida: p.buildMedida ?? undefined,
    acabamento: 'polido',
    pingente: p.buildPingente ?? undefined,
    sinete: p.buildSinete,
    gravacao: p.buildGravacao ?? undefined,
  };
}

export function toCard(p: ProductWithCategory, favoritos: string[]): ProductCardData {
  const tags: string[] = JSON.parse(p.tags || '[]');
  const desconto = p.oldPrice ? '-' + Math.round((1 - p.price / p.oldPrice) * 100) + '%' : undefined;
  return {
    id: p.id,
    nome: p.name,
    categoria: p.category.name,
    spec: p.spec,
    foto: fotoUrl(p.photoId, 600),
    valor: fmt(p.price),
    antigo: p.oldPrice ? fmt(p.oldPrice) : undefined,
    parcela: parcela(p.price),
    tags,
    desconto,
    favorito: favoritos.includes(p.id),
    href: `/peca/${p.id}`,
  };
}

export async function getCategories() {
  return prisma.category.findMany({ include: { _count: { select: { products: true } } } });
}

export async function getAllProducts() {
  return prisma.product.findMany({ include: { category: true } });
}

export async function getProductsByFilter(filtro: string) {
  if (filtro === 'todas') return getAllProducts();
  if (filtro === 'ofertas') return prisma.product.findMany({ where: { oldPrice: { not: null } }, include: { category: true } });
  return prisma.product.findMany({ where: { categoryId: filtro }, include: { category: true } });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id }, include: { category: true } });
}

export async function getRelated(product: ProductWithCategory, limit = 4) {
  return prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true },
    take: limit,
  });
}

export function medidasFor(cat: string) {
  if (cat === 'correntes') return ['45 cm', '50 cm', '60 cm', '70 cm'];
  if (cat === 'pulseiras') return ['18 cm', '21 cm', '23 cm'];
  if (cat === 'aneis') return ['16', '18', '20', '22'];
  return ['Único'];
}
