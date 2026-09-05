import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CART_COOKIE = 'erk_cart';
const GUEST_COOKIE = 'erk_guest';
const YEAR = 60 * 60 * 24 * 365;

/** Garante o token de sacola/favoritos do visitante antes de qualquer render de página
    ou rota — cookies só podem ser gravados em Server Action, Route Handler ou middleware. */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  let mudou = false;
  if (!req.cookies.get(CART_COOKIE)) {
    res.cookies.set(CART_COOKIE, crypto.randomUUID(), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: YEAR });
    mudou = true;
  }
  if (!req.cookies.get(GUEST_COOKIE)) {
    res.cookies.set(GUEST_COOKIE, crypto.randomUUID(), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: YEAR });
    mudou = true;
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
