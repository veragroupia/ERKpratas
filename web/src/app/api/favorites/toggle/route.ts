import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { favoriteOwnerWhereWrite } from '@/lib/favorites';

const schema = z.object({ productId: z.string() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  const where = await favoriteOwnerWhereWrite();
  const existing = await prisma.favorite.findFirst({ where: { ...where, productId: parsed.data.productId } });
  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorito: false });
  }
  await prisma.favorite.create({ data: { ...where, productId: parsed.data.productId } });
  return NextResponse.json({ favorito: true });
}
