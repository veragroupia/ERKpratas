import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SiteChrome, type ChromeCategory } from '@/components/nav/SiteChrome';
import { Footer } from '@/components/nav/Footer';
import { prisma } from '@/lib/db';
import { getCartItems } from '@/lib/cart';
import { fotoUrl } from '@/lib/format';

export const metadata: Metadata = {
  title: 'ERK Pratas — Joalheria de prata 925 em Salto, SP',
  description: 'Correntes, pulseiras, anéis, pingentes e brincos em prata 925 legítima, com punção gravado e garantia vitalícia. Monte a sua peça e veja em 3D.',
};

async function getChromeData() {
  const [cartRows, categories, totalProdutos, ofertasCount] = await Promise.all([
    getCartItems(),
    prisma.category.findMany({ include: { _count: { select: { products: true } } } }),
    prisma.product.count(),
    prisma.product.count({ where: { oldPrice: { not: null } } }),
  ]);
  const cartCount = cartRows.reduce((a, r) => a + r.quantity, 0);
  const chromeCategories: ChromeCategory[] = categories.map((c) => ({
    id: c.id,
    nome: c.name,
    n: c._count.products + ' itens',
    foto: fotoUrl(c.photoId, 200),
    href: `/catalogo/${c.id}`,
  }));
  return { cartCount, chromeCategories, totalProdutos, ofertasCount };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { cartCount, chromeCategories, totalProdutos, ofertasCount } = await getChromeData();

  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <div style={{ background: 'var(--surface-pagina)', color: 'var(--text-1)', fontFamily: 'var(--font-body)', minHeight: '100vh' }}>
            <SiteChrome cartCount={cartCount} categories={chromeCategories} totalProdutos={totalProdutos} ofertasCount={ofertasCount} />
            {children}
            <Footer
              sobre="Joalheria de prata 925 legítima com oficina própria em Salto, São Paulo. Atendemos Itu, Indaiatuba, Cabreúva e Sorocaba, e enviamos para todo o Brasil."
              pagamentos={['CRÉDITO', 'DÉBITO', 'PIX', 'ATÉ 6X SEM JUROS']}
              colunas={[
                { titulo: 'Loja', itens: ['Correntes', 'Pulseiras', 'Anéis', 'Pingentes', 'Brincos', 'Conjuntos'] },
                { titulo: 'Ajuda', itens: ['Como escolher a medida', 'Prazo e frete', 'Trocas e devolução', 'Garantia vitalícia', 'Guia da prata 925'] },
                { titulo: 'Institucional', itens: ['A oficina', 'Monte a sua peça', 'Ver em 3D', 'WhatsApp', 'Onde estamos'] },
              ]}
              fim={['© 2026 ERK Pratas · Salto, SP']}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
