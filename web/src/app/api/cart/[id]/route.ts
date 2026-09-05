import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { cartOwnerWhere } from '@/lib/cart';

const patchSchema = z.object({ quantity: z.number().int().min(0).max(20) });

async function assertOwned(id: string) {
  const where = await cartOwnerWhere();
  const item = await prisma.cartItem.findFirst({ where: { id, ...where } });
  return item;
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const item = await assertOwned(params.id);
  if (!item) return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  if (parsed.data.quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: item.id } });
  } else {
    await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: parsed.data.quantity } });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const item = await assertOwned(params.id);
  if (!item) return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
  await prisma.cartItem.delete({ where: { id: item.id } });
  return NextResponse.json({ ok: true });
}
