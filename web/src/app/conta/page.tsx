import Link from 'next/link';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/db';
import { WHATSAPP } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';
import { LogoutButton } from '@/components/account/LogoutButton';
import { MobileContextBar } from '@/components/nav/MobileContextBar';

const VANTAGENS = [
  { icone: 'seta', titulo: 'Acompanhe a bancada', texto: 'Você vê quando a peça entra em produção, no polimento e sai para entrega.' },
  { icone: 'garantia', titulo: 'Garantia no seu nome', texto: 'A nota e a garantia vitalícia ficam guardadas na conta.' },
  { icone: 'entrega', titulo: 'Medida e endereço salvos', texto: 'Aro, comprimento e endereço de entrega prontos na próxima compra.' },
];

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  return ((partes[0]?.[0] || '') + (partes[1]?.[0] || '')).toUpperCase();
}

export default async function ContaPage() {
  const session = await getSession();
  const userId = (session?.user as any)?.id as string | undefined;

  const [favCount, cartCount, user] = await Promise.all([
    userId ? prisma.favorite.count({ where: { userId } }) : Promise.resolve(0),
    userId ? prisma.cartItem.count({ where: { userId } }) : Promise.resolve(0),
    userId ? prisma.user.findUnique({ where: { id: userId } }) : Promise.resolve(null),
  ]);

  return (
    <>
      <MobileContextBar titulo="Sua conta" subtitulo={user ? 'Pedidos e dados' : 'Entre ou crie sua conta'} voltarHref="/" />
      <main className="erk-sec erk-entra" data-screen-label="Conta">
        <div className="erk-wrap" style={{ maxWidth: 720 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Sua conta</h1>

          {!user ? (
            <>
              <div style={{ marginTop: 22, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 16, padding: 'clamp(20px,3vw,28px)' }}>
                <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', margin: 0 }}>ACESSO</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(19px,2.2vw,25px)', lineHeight: 1.2, margin: '9px 0 8px' }}>
                  Entre para acompanhar seus pedidos
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: 0 }}>
                  Com a conta você vê onde está a sua peça, guarda medida e endereço, e acompanha o que está na bancada.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
                  <Link className="erk-btn erk-btn--p" href="/conta/entrar">
                    Entrar
                  </Link>
                  <Link className="erk-btn erk-btn--s" href="/conta/cadastro">
                    Criar conta
                  </Link>
                </div>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 16, fontSize: 13.5, color: 'var(--text-3)' }}>
                  <Icon name="oficina" size={15} />
                  Prefere sem conta? Chame a oficina no WhatsApp
                </a>
              </div>
              <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                {VANTAGENS.map((v) => (
                  <div key={v.titulo} style={{ display: 'flex', alignItems: 'flex-start', gap: 13, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 14, padding: '15px 17px' }}>
                    <span style={{ flex: 'none', width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 10, background: 'var(--surface-forte)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}>
                      <Icon name={v.icone} size={17} />
                    </span>
                    <span style={{ minWidth: 0, display: 'grid', gap: 3 }}>
                      <b style={{ fontSize: 14.5, fontWeight: 600 }}>{v.titulo}</b>
                      <em style={{ fontStyle: 'normal', fontSize: 13, color: 'var(--text-3)', lineHeight: 1.5 }}>{v.texto}</em>
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 16, padding: 18 }}>
                <span style={{ flex: 'none', width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: 980, background: 'var(--surface-forte)', border: '1px solid var(--border-2)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17 }}>
                  {iniciais(user.name)}
                </span>
                <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 3 }}>
                  <b style={{ fontSize: 16, fontWeight: 600 }}>{user.name}</b>
                  <em style={{ fontStyle: 'normal', fontSize: 13, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.email}
                    {user.phone ? ` · ${user.phone}` : ''}
                  </em>
                </span>
              </div>

              <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '26px 0 12px' }}>CONFIGURAÇÕES</p>
              <div style={{ display: 'grid', gap: 10 }}>
                <Link href="/conta/pedidos" style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 14, padding: '16px 17px' }}>
                  <span style={{ flex: 'none', width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: 10, background: 'var(--surface-forte)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}>
                    <Icon name="sacola" size={18} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 3 }}>
                    <b style={{ fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap' }}>Meus pedidos</b>
                    <em style={{ fontStyle: 'normal', fontSize: 13, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Entregues e em preparo</em>
                  </span>
                  <Icon name="seta" size={17} style={{ flex: 'none', color: 'var(--text-3)' }} />
                </Link>
                <Link href="/conta/dados" style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 14, padding: '16px 17px' }}>
                  <span style={{ flex: 'none', width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: 10, background: 'var(--surface-forte)', border: '1px solid var(--border-1)', color: 'var(--text-2)' }}>
                    <Icon name="perfil" size={18} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 3 }}>
                    <b style={{ fontSize: 14.5, fontWeight: 600 }}>Dados da conta</b>
                    <em style={{ fontStyle: 'normal', fontSize: 13, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Endereço, telefone e medidas</em>
                  </span>
                  <Icon name="seta" size={17} style={{ flex: 'none', color: 'var(--text-3)' }} />
                </Link>
              </div>

              <div style={{ marginTop: 16, background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 16, padding: '6px 16px' }}>
                <Link href="/favoritos" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5, borderBottom: '1px solid var(--border-1)' }}>
                  Favoritos<em style={{ fontStyle: 'normal', marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-3)' }}>{favCount}</em>
                </Link>
                <Link href="/sacola" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5, borderBottom: '1px solid var(--border-1)' }}>
                  Sacola<em style={{ fontStyle: 'normal', marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-3)' }}>{cartCount}</em>
                </Link>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, fontSize: 14.5 }}>
                  Falar com a oficina
                </a>
              </div>

              <LogoutButton />
            </>
          )}
        </div>
      </main>
    </>
  );
}
