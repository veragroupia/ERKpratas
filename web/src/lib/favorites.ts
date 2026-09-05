import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { prisma } from './db';
import { getCurrentUserId } from './session';

const COOKIE = 'erk_guest';
const YEAR = 60 * 60 * 24 * 365;

/** Sem cookie e sem sessão, esse visitante nunca favoritou nada — usamos um
    filtro que não bate com nenhuma linha real em vez de inventar um token. */
const SEM_FAVORITOS = { id: '__sem-favoritos__' };

function readGuestToken(): string | null {
  return cookies().get(COOKIE)?.value ?? null;
}

/** Só pode ser chamada de Route Handler/Server Action. */
function getOrCreateGuestToken(): string {
  const existing = cookies().get(COOKIE)?.value;
  if (existing) return existing;
  const token = randomUUID();
  cookies().set(COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: YEAR });
  return token;
}

/** Leitura segura em qualquer contexto — Server Component ou Route Handler. */
export async function favoriteOwnerWhereRead() {
  const userId = await getCurrentUserId();
  if (userId) return { userId };
  const token = readGuestToken();
  return token ? { guestToken: token } : SEM_FAVORITOS;
}

/** Só use em Route Handlers — precisa poder criar o cookie de convidado. */
export async function favoriteOwnerWhereWrite() {
  const userId = await getCurrentUserId();
  if (userId) return { userId };
  return { guestToken: getOrCreateGuestToken(), userId: null };
}

export async function getFavoriteProductIds(): Promise<string[]> {
  const where = await favoriteOwnerWhereRead();
  const favs = await prisma.favorite.findMany({ where, select: { productId: true } });
  return favs.map((f) => f.productId);
}
