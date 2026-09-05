import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { prisma } from './db';
import { getCurrentUserId } from './session';

const COOKIE = 'erk_cart';
const YEAR = 60 * 60 * 24 * 365;

/** Leitura segura em qualquer contexto (Server Component ou Route Handler).
    Sem cookie ainda, não há carrinho de convidado — não inventa um token. */
function readCartToken(): string | null {
  return cookies().get(COOKIE)?.value ?? null;
}

/** Só pode ser chamada de Route Handler/Server Action (onde dá para gravar
    cookie). Cria o token na primeira escrita e o devolve daí em diante. */
function getOrCreateCartToken(): string {
  const existing = cookies().get(COOKIE)?.value;
  if (existing) return existing;
  const token = randomUUID();
  cookies().set(COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: YEAR });
  return token;
}

/** Carrinho do visitante atual: por usuário logado (todas as origens) ou por token de convidado. */
export async function getCartItems() {
  const userId = await getCurrentUserId();
  const token = readCartToken();
  if (userId) {
    // Migra itens de convidado (mesmo navegador) para a conta, se houver.
    if (token) await prisma.cartItem.updateMany({ where: { cartToken: token, userId: null }, data: { userId } });
    return prisma.cartItem.findMany({ where: { userId }, include: { product: { include: { category: true } } }, orderBy: { createdAt: 'asc' } });
  }
  if (!token) return [];
  return prisma.cartItem.findMany({ where: { cartToken: token, userId: null }, include: { product: { include: { category: true } } }, orderBy: { createdAt: 'asc' } });
}

/** Só use em Route Handlers — grava o item, então precisa poder criar o cookie. */
export function getCartTokenForWrite(): string {
  return getOrCreateCartToken();
}

/** Só use em Route Handlers (mesma razão acima). */
export async function cartOwnerWhere() {
  const userId = await getCurrentUserId();
  return userId ? { userId } : { cartToken: getOrCreateCartToken(), userId: null };
}
