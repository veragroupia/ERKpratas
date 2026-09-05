import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { cartOwnerWhere, getCartItems } from '@/lib/cart';
import { getCartSummary, freteFor } from '@/lib/cartSummary';
import { getCurrentUserId } from '@/lib/session';

const schema = z.object({
  customerName: z.string().trim().min(2, 'Informe o nome completo'),
  customerPhone: z.string().trim().min(8, 'Informe um WhatsApp válido'),
  customerCpf: z.string().trim().optional(),
  zip: z.string().trim().min(8, 'Informe o CEP'),
  addressNumber: z.string().trim().optional(),
  delivery: z.enum(['motoboy', 'correios', 'retirada']),
  payment: z.enum(['pix', 'credito', 'whats']),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Dados inválidos' }, { status: 400 });

  const rows = await getCartItems();
  if (rows.length === 0) return NextResponse.json({ error: 'Sua sacola está vazia' }, { status: 400 });

  const summary = await getCartSummary();
  const shipping = freteFor(parsed.data.delivery);
  const total = summary.subtotal + shipping;
  const userId = await getCurrentUserId();

  const order = await prisma.order.create({
    data: {
      userId: userId ?? undefined,
      status: 'preparo',
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      customerCpf: parsed.data.customerCpf,
      zip: parsed.data.zip,
      addressNumber: parsed.data.addressNumber,
      delivery: parsed.data.delivery,
      payment: parsed.data.payment,
      subtotal: summary.subtotal,
      discount: summary.economia,
      shipping,
      total,
      items: {
        create: rows.map((r) => ({
          productId: r.productId ?? undefined,
          name: r.product ? r.product.name : r.customName || 'Peça montada',
          spec: r.product ? r.product.spec : r.customSpec || '',
          quantity: r.quantity,
          unitPrice: r.product ? r.product.price : r.customPrice || 0,
          oldUnitPrice: r.product?.oldPrice ?? null,
        })),
      },
    },
  });

  const ownerWhere = await cartOwnerWhere();
  await prisma.cartItem.deleteMany({ where: ownerWhere });

  return NextResponse.json({ id: order.id });
}
