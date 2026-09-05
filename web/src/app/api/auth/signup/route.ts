import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  name: z.string().trim().min(2, 'Informe o seu nome completo'),
  email: z.string().trim().email('E-mail inválido'),
  password: z.string().min(6, 'A senha precisa ter ao menos 6 caracteres'),
  phone: z.string().trim().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Dados inválidos' }, { status: 400 });
  }
  const { name, email, password, phone } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: 'Já existe uma conta com esse e-mail' }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email: email.toLowerCase(), passwordHash, phone },
  });
  return NextResponse.json({ id: user.id, email: user.email });
}
