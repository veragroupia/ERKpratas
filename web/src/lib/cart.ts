import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { prisma } from './db';
import { getCurrentUserId } from './session';

const COOKIE = 'erk_cart';

/** O middleware garante esse cookie em toda requisição — aqui só lemos.
    O fallback efêmero só existiria se o middleware não tivesse rodado. */
export function getCartToken(): string {
  return cookies().get(COOKIE)?.value ?? randomUUID();
}

/** Carrinho do visitante atual: por usuário logado (todas as origens) ou por token de convidado. */
export async function getCartItems() {
  const userId = await getCurrentUserId();
  const token = getCartToken();
  if (userId) {
    // Migra itens de convidado (mesmo navegador) para a conta, se houver.
    await prisma.cartItem.updateMany({ where: { cartToken: token, userId: null }, data: { userId } });
    return prisma.cartItem.findMany({ where: { userId }, include: { product: { include: { category: true } } }, orderBy: { createdAt: 'asc' } });
  }
  return prisma.cartItem.findMany({ where: { cartToken: token, userId: null }, include: { product: { include: { category: true } } }, orderBy: { createdAt: 'asc' } });
}

export async function cartOwnerWhere() {
  const userId = await getCurrentUserId();
  const token = getCartToken();
  return userId ? { userId } : { cartToken: token, userId: null };
}
