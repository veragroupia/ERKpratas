import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { prisma } from './db';
import { getCurrentUserId } from './session';

const COOKIE = 'erk_guest';

/** O middleware garante esse cookie em toda requisição — aqui só lemos. */
function getGuestToken(): string {
  return cookies().get(COOKIE)?.value ?? randomUUID();
}

export async function favoriteOwnerWhere() {
  const userId = await getCurrentUserId();
  if (userId) return { userId };
  return { guestToken: getGuestToken(), userId: null };
}

export async function getFavoriteProductIds(): Promise<string[]> {
  const where = await favoriteOwnerWhere();
  const favs = await prisma.favorite.findMany({ where, select: { productId: true } });
  return favs.map((f) => f.productId);
}
