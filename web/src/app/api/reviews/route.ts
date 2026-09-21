import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getCurrentUserId } from '@/lib/session';
import { findPedidoDaCompra } from '@/lib/reviews';

const schema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1200).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'Entre na sua conta para avaliar' }, { status: 401 });

  const { productId, rating, comment } = parsed.data;

  // A verificação de compra é feita aqui, no servidor, e não na tela: é o que
  // garante que todo depoimento no site veio de alguém que levou a peça.
  const orderId = await findPedidoDaCompra(productId, userId);
  if (!orderId) {
    return NextResponse.json({ error: 'Só quem comprou esta peça pode avaliá-la' }, { status: 403 });
  }

  const texto = comment?.trim() || null;
  const review = await prisma.review.upsert({
    where: { productId_userId: { productId, userId } },
    create: { productId, userId, orderId, rating, comment: texto },
    update: { rating, comment: texto },
  });

  return NextResponse.json({ ok: true, id: review.id });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  if (!productId) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });

  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'Entre na sua conta' }, { status: 401 });

  await prisma.review.deleteMany({ where: { productId, userId } });
  return NextResponse.json({ ok: true });
}
