import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getCurrentUserId } from '@/lib/session';

const schema = z.object({
  name: z.string().trim().min(2).optional(),
  phone: z.string().trim().optional(),
  cpf: z.string().trim().optional(),
  street: z.string().trim().optional(),
  number: z.string().trim().optional(),
  district: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  zip: z.string().trim().optional(),
  preference: z.string().trim().optional(),
  anelAro: z.number().int().optional(),
  correnteCm: z.number().int().optional(),
  pulseiraCm: z.number().int().optional(),
  paymentPref: z.string().trim().optional(),
});

export async function PATCH(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: 'Entre na sua conta' }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  const d = parsed.data;

  if (d.name || d.phone || d.cpf) {
    await prisma.user.update({ where: { id: userId }, data: { name: d.name, phone: d.phone, cpf: d.cpf } });
  }
  if (d.street || d.city || d.state || d.zip || d.number || d.district || d.preference) {
    await prisma.address.upsert({
      where: { userId },
      update: { street: d.street, number: d.number, district: d.district, city: d.city, state: d.state, zip: d.zip, preference: d.preference },
      create: {
        userId,
        street: d.street || '',
        number: d.number,
        district: d.district,
        city: d.city || '',
        state: d.state || '',
        zip: d.zip || '',
        preference: d.preference || 'motoboy',
      },
    });
  }
  if (d.anelAro || d.correnteCm || d.pulseiraCm || d.paymentPref) {
    await prisma.measurement.upsert({
      where: { userId },
      update: { anelAro: d.anelAro, correnteCm: d.correnteCm, pulseiraCm: d.pulseiraCm, paymentPref: d.paymentPref },
      create: { userId, anelAro: d.anelAro, correnteCm: d.correnteCm, pulseiraCm: d.pulseiraCm, paymentPref: d.paymentPref || 'pix' },
    });
  }
  return NextResponse.json({ ok: true });
}
