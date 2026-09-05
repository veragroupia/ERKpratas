import { prisma } from '@/lib/db';
import { fotoUrl } from '@/lib/format';
import { toCard } from '@/lib/products';
import { getFavoriteProductIds } from '@/lib/favorites';
import { WHATSAPP, GARANTIAS } from '@/lib/constants';
import { HomeHero } from '@/components/home/HomeHero';
import { Home3DSection } from '@/components/home/Home3DSection';
import { SectionHeader } from '@/components/nav/SectionHeader';
import { CategoryTile, CategoryTiles } from '@/components/commerce/CategoryTile';
import { GuaranteeStrip } from '@/components/commerce/GuaranteeStrip';
import { ProductGridInteractive } from '@/components/commerce/ProductGridInteractive';
import { PromoBanner, PromoPair } from '@/components/commerce/PromoBanner';
import { CTABanner } from '@/components/commerce/CTABanner';

export default async function HomePage() {
  const [categories, produtos, favoritos] = await Promise.all([
    prisma.category.findMany({ include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({ include: { category: true } }),
    getFavoriteProductIds(),
  ]);

  const vendidas = produtos.filter((p) => (JSON.parse(p.tags || '[]') as string[]).includes('Mais vendida')).slice(0, 4);

  return (
    <main data-screen-label="Home">
      <HomeHero />

      <section className="erk-sec">
        <div className="erk-wrap">
          <div className="chrome-desktop">
            <SectionHeader titulo="Comprar por categoria" apoio="16 peças de prata 925, todas com punção e garantia vitalícia" link="Ver tudo" linkHref="/catalogo" />
          </div>
          <CategoryTiles>
            {categories.map((c) => (
              <CategoryTile key={c.id} nome={c.name} contagem={c._count.products + ' itens'} foto={fotoUrl(c.photoId, 400)} href={`/catalogo/${c.id}`} />
            ))}
          </CategoryTiles>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--sec-y)' }}>
        <div className="erk-wrap">
          <GuaranteeStrip itens={GARANTIAS} />
        </div>
      </section>

      <section className="erk-sec erk-sec--suave">
        <div className="erk-wrap">
          <SectionHeader titulo="Mais vendidas" apoio="As peças que mais saem da oficina" link="Ver o catálogo" linkHref="/catalogo" />
          <ProductGridInteractive produtos={vendidas.map((p) => toCard(p, favoritos))} />
        </div>
      </section>

      <Home3DSection />

      <section style={{ paddingBottom: 'var(--sec-y)' }}>
        <div className="erk-wrap">
          <PromoPair>
            <PromoBanner
              olho="Oficina própria"
              titulo="Sua prata volta a brilhar"
              texto="Polimento, solda de elo, troca de fecho e ajuste de aro — mesmo em peça que você não comprou aqui. Orçamento na hora."
              foto={fotoUrl(15955334, 1100)}
              acao="Falar com a oficina"
              acaoHref={WHATSAPP}
            />
            <PromoBanner
              olho="Sob encomenda"
              titulo="Do seu jeito"
              texto="Escolha o elo, a espessura e a gravação."
              foto={fotoUrl(15576969, 800)}
              acao="Montar a minha peça"
              acaoHref="/montar"
              acento
            />
          </PromoPair>
        </div>
      </section>

      <section className="erk-sec erk-sec--suave">
        <div className="erk-wrap">
          <div className="erk-oficina">
            <figure className="erk-oficina__fig">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fotoUrl(4354570, 900)} alt="A oficina fica aqui dentro" loading="lazy" />
            </figure>
            <div>
              <h2>A oficina fica aqui dentro</h2>
              <p>Não mandamos sua peça para lugar nenhum. Polimento, solda e ajuste são feitos na bancada da loja, em Salto — muita coisa sai no mesmo dia.</p>
              <ul>
                {[
                  'Polimento que tira a camada oxidada sem desgastar o metal',
                  'Solda de elo e troca de fecho com garantia',
                  'Ajuste de aro de anel na sua frente',
                  'Gravação de nome, inicial e data',
                ].map((t) => (
                  <li key={t}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8.5 12.3l2.4 2.4 4.6-4.9" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <a className="erk-btn erk-btn--p" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Falar com a oficina
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--sec-y) 0' }}>
        <div className="erk-wrap">
          <CTABanner
            titulo="Ficou com dúvida no tamanho?"
            texto="Manda uma mensagem que a gente te ajuda a escolher a medida certa, calcula o frete e confirma a disponibilidade na hora."
            acao="Chamar no WhatsApp"
            acaoHref={WHATSAPP}
          />
        </div>
      </section>
    </main>
  );
}
