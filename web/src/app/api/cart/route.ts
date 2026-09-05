import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { cartOwnerWhere, getCartToken, getCartItems } from '@/lib/cart';
import { getCurrentUserId } from '@/lib/session';

const addSchema = z.union([
  z.object({ productId: z.string(), quantity: z.number().int().min(1).max(20).default(1) }),
  z.object({
    customName: z.string(),
    customSpec: z.string(),
    customPrice: z.number(),
    customSpecJson: z.string().optional(),
    quantity: z.number().int().min(1).max(20).default(1),
  }),
]);

export async function GET() {
  const items = await getCartItems();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });

  const userId = await getCurrentUserId();
  const token = getCartToken();
  const data = parsed.data;

  if ('productId' in data) {
    const product = await prisma.product.findUnique({ where: { id: data.productId } });
    if (!product) return NextResponse.json({ error: 'Peça não encontrada' }, { status: 404 });
    const where = userId ? { userId, productId: data.productId } : { cartToken: token, productId: data.productId, userId: null };
    const existing = await prisma.cartItem.findFirst({ where });
    if (existing) {
      await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + data.quantity } });
    } else {
      await prisma.cartItem.create({
        data: { cartToken: token, userId: userId ?? undefined, productId: data.productId, quantity: data.quantity },
      });
    }
  } else {
    await prisma.cartItem.create({
      data: {
        cartToken: token,
        userId: userId ?? undefined,
        customName: data.customName,
        customSpec: data.customSpec,
        customPrice: data.customPrice,
        customSpecJson: data.customSpecJson,
        quantity: data.quantity,
      },
    });
  }

  const items = await getCartItems();
  return NextResponse.json({ items });
}
