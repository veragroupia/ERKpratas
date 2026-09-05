'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../ui/Logo';
import { IconButton } from '../ui/IconButton';
import { SearchBar } from '../ui/SearchBar';
import { Icon } from '../ui/Icon';
import { CategoryNav, type NavItem } from './CategoryNav';

export type ChromeCategory = { id: string; nome: string; n: string; foto: string; href: string };

export function SiteChrome({
  cartCount,
  categories,
  totalProdutos,
  ofertasCount,
}: {
  cartCount: number;
  categories: ChromeCategory[];
  totalProdutos: number;
  ofertasCount: number;
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [q, setQ] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const irBusca = (v: string) => router.push('/busca' + (v ? `?q=${encodeURIComponent(v)}` : ''));

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAberto]);

  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  const navItens: NavItem[] = [
    { id: 'home', nome: 'Início', icone: 'inicio', href: '/' },
    { id: 'catalogo', nome: 'Ver o estoque', icone: 'grade', href: '/catalogo' },
    { id: 'montar', nome: 'Montar a sua peça', icone: 'oficina', href: '/montar' },
    { id: 'ofertas', nome: 'Ofertas', icone: 'favorito', href: '/catalogo/ofertas', promo: true },
  ];
  const navAtivo = pathname === '/' ? 'home' : pathname.startsWith('/montar') ? 'montar' : pathname.startsWith('/catalogo/ofertas') ? 'ofertas' : pathname.startsWith('/catalogo') ? 'catalogo' : '';

  const linksMenu = [
    { nome: 'Ver o estoque', href: '/catalogo', apoio: totalProdutos + ' peças', foto: 'https://images.pexels.com/photos/16124761/pexels-photo-16124761.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { nome: 'Ofertas', href: '/catalogo/ofertas', apoio: ofertasCount + ' peças', foto: 'https://images.pexels.com/photos/16304561/pexels-photo-16304561.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { nome: 'Montar a sua peça', href: '/montar', apoio: 'sob encomenda', foto: 'https://images.pexels.com/photos/4354570/pexels-photo-4354570.jpeg?auto=compress&cs=tinysrgb&w=700' },
    { nome: 'Buscar', href: '/busca', apoio: 'nome, elo ou medida', foto: 'https://images.pexels.com/photos/16109182/pexels-photo-16109182.jpeg?auto=compress&cs=tinysrgb&w=700' },
  ];

  return (
    <>
      {/* ---------- desktop ---------- */}
      <div className="chrome-desktop">
        <header className="erk-hdr">
          <div className="erk-hdr__in">
            <Logo />
            <SearchBar valor={q} onChange={setQ} onSubmit={irBusca} />
            <div className="erk-acoes">
              <IconButton icone="conta" rotulo="Conta" href="/conta" />
              <IconButton icone="favorito" rotulo="Favoritos" href="/favoritos" />
              <IconButton icone="sacola" rotulo="Sacola" href="/sacola" contador={cartCount || undefined} />
            </div>
          </div>
        </header>
        <CategoryNav itens={navItens} ativo={navAtivo} />
      </div>

      {/* ---------- celular: pílula fixa ---------- */}
      <div className="chrome-mobile">
        <div style={pathname === '/' ? { position: 'sticky', top: 0, zIndex: 50, padding: '9px var(--pad) 5px' } : { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '9px var(--pad) 5px', background: 'var(--surface-pagina)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 46, padding: '0 6px', borderRadius: 980, background: 'var(--surface-forte)', border: '1px solid var(--border-1)', color: 'var(--text-1)', boxShadow: '0 10px 30px rgba(0,0,0,.45)' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <button type="button" onClick={() => setMenuAberto(true)} aria-label="Abrir o menu" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'inherit' }}>
                <Icon name="hamburguer" size={21} />
              </button>
            </span>
            <Link href="/" style={{ display: 'grid', placeItems: 'center', padding: '0 6px', color: 'inherit' }}>
              <b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14.5, letterSpacing: '.2em', lineHeight: 1, whiteSpace: 'nowrap' }}>ERK PRATAS</b>
            </Link>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Link href="/busca" aria-label="Buscar" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'inherit' }}>
                <Icon name="busca" size={20} />
              </Link>
              <Link href="/sacola" aria-label="Sacola" style={{ position: 'relative', width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'inherit' }}>
                <Icon name="sacola" size={20} />
                {cartCount > 0 ? (
                  <span style={{ position: 'absolute', top: 6, right: 5, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 980, background: 'var(--acao-acento-bg)', color: '#fff', fontSize: 10.5, fontWeight: 600, display: 'grid', placeItems: 'center' }}>
                    {cartCount}
                  </span>
                ) : null}
              </Link>
            </span>
          </div>
        </div>
        {pathname !== '/' ? <div style={{ height: 60 }} /> : null}
      </div>

      {/* ---------- celular: menu tela cheia ---------- */}
      {menuAberto ? (
        <div role="dialog" aria-label="Menu" className="chrome-mobile" style={{ position: 'fixed', inset: 0, zIndex: 130, background: 'var(--surface-pagina)', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 2, padding: '10px var(--pad) 6px', background: 'var(--surface-pagina)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 46, padding: '0 6px', borderRadius: 980, background: 'var(--surface-forte)', border: '1px solid var(--border-1)', color: 'var(--text-1)' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setMenuAberto(false)}
                  aria-label="Fechar o menu"
                  style={{ width: 34, height: 34, marginLeft: 3, display: 'grid', placeItems: 'center', border: '1px solid var(--acao-acento-bg)', borderRadius: 9, color: 'inherit' }}
                >
                  <Icon name="fechar" size={17} />
                </button>
              </span>
              <span style={{ display: 'grid', placeItems: 'center', padding: '0 6px', color: 'inherit' }}>
                <b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14.5, letterSpacing: '.2em', lineHeight: 1, whiteSpace: 'nowrap' }}>ERK PRATAS</b>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Link href="/busca" onClick={() => setMenuAberto(false)} aria-label="Buscar" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'inherit' }}>
                  <Icon name="busca" size={20} />
                </Link>
                <Link href="/sacola" onClick={() => setMenuAberto(false)} aria-label="Sacola" style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: 'inherit' }}>
                  <Icon name="sacola" size={20} />
                </Link>
              </span>
            </div>
          </div>
          <div style={{ padding: '18px var(--pad) calc(28px + var(--safe))' }}>
            <nav style={{ display: 'grid', gap: 10 }}>
              {linksMenu.map((l) => (
                <Link
                  key={l.nome}
                  href={l.href}
                  onClick={() => setMenuAberto(false)}
                  style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', minHeight: 104, borderRadius: 16, overflow: 'hidden', background: 'var(--surface-card)', border: '1px solid var(--border-1)' }}
                >
                  <span style={{ position: 'absolute', inset: 0, backgroundImage: `url("${l.foto}")`, backgroundSize: 'cover', backgroundPosition: '70% 40%', filter: 'brightness(.72) contrast(1.05) saturate(.9)' }} />
                  <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(13,15,18,.96) 0%,rgba(13,15,18,.82) 52%,rgba(13,15,18,.56) 100%)' }} />
                  <span style={{ position: 'relative', flex: 1, minWidth: 0, display: 'grid', gap: 5, padding: '16px 18px' }}>
                    <b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '.1em', textTransform: 'uppercase', lineHeight: 1.2 }}>{l.nome}</b>
                    <em style={{ fontStyle: 'normal', fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{l.apoio}</em>
                  </span>
                  <Icon name="seta" size={17} style={{ position: 'relative', flex: 'none', margin: '0 18px 20px 0', color: 'var(--text-1)' }} />
                </Link>
              ))}
            </nav>
            <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '28px 0 12px' }}>Categorias</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={c.href}
                  onClick={() => setMenuAberto(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 12px 9px 9px', borderRadius: 12, background: 'var(--surface-card)', border: '1px solid var(--border-1)' }}
                >
                  <span style={{ flex: 'none', width: 42, height: 42, borderRadius: 9, backgroundImage: `url("${c.foto}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'var(--filtro-foto)' }} />
                  <span style={{ minWidth: 0, display: 'grid', gap: 2 }}>
                    <b style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.nome}</b>
                    <em style={{ fontStyle: 'normal', fontSize: 11, color: 'var(--text-3)' }}>{c.n}</em>
                  </span>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 16, padding: '6px 16px' }}>
              <Link href="/conta" onClick={() => setMenuAberto(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5, borderBottom: '1px solid var(--border-1)' }}>
                <Icon name="conta" size={18} style={{ color: 'var(--text-3)' }} />
                Sua conta
              </Link>
              <Link href="/favoritos" onClick={() => setMenuAberto(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5, borderBottom: '1px solid var(--border-1)' }}>
                <Icon name="favorito" size={18} style={{ color: 'var(--text-3)' }} />
                Favoritos
              </Link>
              <Link href="/sacola" onClick={() => setMenuAberto(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5, borderBottom: '1px solid var(--border-1)' }}>
                <Icon name="sacola" size={18} style={{ color: 'var(--text-3)' }} />
                Sacola
                <em style={{ fontStyle: 'normal', marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-3)' }}>{cartCount}</em>
              </Link>
              <a href="https://wa.me/5511911124875" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5 }}>
                <Icon name="oficina" size={18} style={{ color: 'var(--text-3)' }} />
                Falar com a oficina
              </a>
            </div>
            <p style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 22 }}>Oficina própria em Salto, SP. Garantia vitalícia contra defeito de fabricação.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
