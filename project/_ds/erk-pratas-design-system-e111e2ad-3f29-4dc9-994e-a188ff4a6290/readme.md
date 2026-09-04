# ERK Pratas — Design System

Joalheria de prata 925 com oficina própria em Salto, São Paulo. Vende presencialmente e pela internet: atende Itu, Indaiatuba, Cabreúva e Sorocaba com motoboy no mesmo dia, e envia para todo o Brasil. O diferencial que a marca repete em toda superfície é concreto: prata legítima com punção gravado (nada de folheado), garantia vitalícia contra defeito de fabricação e conserto feito na bancada da própria loja.

O sistema foi construído para uma loja online completa — vitrine, catálogo, página de produto, sacola, checkout — e é responsivo por princípio: acima de 860px é site; abaixo, vira app (navegação na barra do polegar, busca e categorias em tela cheia, filtro em painel que sobe).

## Fonte deste sistema

- `uploads/mockup-erk-app-escuro.html` — mockup HTML de uma página (home da loja, versão escura, com a camada de app do celular embutida), enviado pelo cliente. **É a única fonte e a verdade do sistema:** cada valor de cor, corpo de letra, raio, sombra, curva de animação e regra responsiva deste projeto foi extraído dali, com meio pixel e tudo. Onde este sistema vai além do mockup (produto, sacola, checkout, catálogo com filtro lateral), a extensão usa só os tokens que já existiam.
- Nenhum Figma, repositório ou codebase foi fornecido.
- Nenhum logotipo, ícone em arquivo ou foto própria foi fornecido. Ver "Ressalvas".

## Índice

| Arquivo | O que é |
| --- | --- |
| `styles.css` | Entrada única de CSS — só `@import`s. Consumidores linkam este arquivo. |
| `tokens/colors.css` | Cor base e apelidos semânticos, tema claro e escuro. |
| `tokens/typography.css` | Famílias, escala de corpo, pesos, entrelinha e tracking. |
| `tokens/spacing.css` | Escala de espaço, medida, margem lateral, alturas e alvos de toque. |
| `tokens/radius.css` · `tokens/shadows.css` · `tokens/motion.css` | Cantos, elevação, curva e durações. |
| `tokens/fonts.css` | Import do Google Fonts (Cinzel + Montserrat). |
| `tokens/base.css` | Reset e utilitários (`.erk-wrap`, `.erk-sr`, `.erk-serif`). |
| `components/erk-ui.css` | Folha dos componentes — as classes que os JSX usam. |
| `components/` | Componentes React (lista abaixo). |
| `guidelines/*.card.html` | Cartões de fundamentos que aparecem na aba Design System. |
| `ui_kits/loja/` | UI kit navegável da loja (ver `ui_kits/loja/README.md`). |
| `templates/home-loja/` | Template de home para projetos consumidores. |
| `thumbnail.html` | Tile do sistema na home. |
| `SKILL.md` | Empacotamento como Agent Skill. |

## Componentes

**core** — `Icon`, `Logo`, `Button`, `IconButton`, `Chip`, `Tag`, `Selo`, `Price`
**forms** — `SearchBar`
**commerce** — `Hero`, `ProductCard`, `ProductGrid`, `CategoryTile`, `CategoryTiles`, `GuaranteeStrip`, `PromoBanner`, `PromoPair`, `ProductRow`, `ProductRows`, `CTABanner`
**navigation** — `Header`, `CategoryNav`, `SectionHeader`, `BottomBar`, `Footer`
**feedback** — `BottomSheet`, `EmptyState`

Cada diretório tem `<Nome>.d.ts` com o contrato de props, `<Nome>.prompt.md` com uso e um cartão HTML com os estados.

### Adições intencionais
O mockup define todas as famílias acima em CSS, mas nomeia poucas. Foram criadas por necessidade e não existem como "componente" no original: `Icon` (embrulho para os 21 glifos que estavam inline no HTML), `EmptyState` (a classe `.vazio` do mockup) e `ProductRows`/`ProductGrid`/`CategoryTiles`/`PromoPair` (os contêineres de grade que no mockup eram classes soltas). Nada além disso foi inventado — não há Toast, Avatar, Tabs ou Modal, porque a loja não os usa.

---

# FUNDAMENTOS DE CONTEÚDO

**Idioma:** português do Brasil, sempre. Preço em `R$ 231,00`, com vírgula.

**Pessoa:** a loja fala como "a gente" e trata o cliente por "você". Nunca "nós" formal, nunca "o cliente".
> "Defeito de fabricação a gente resolve, sem prazo."
> "Manda uma mensagem que a gente te ajuda a escolher a medida certa."

**Tom:** oficina, não boutique. Frases curtas, afirmativas, com o fato na frente e a promessa depois. A marca vende confiança por especificidade — mede, nomeia e datalha em vez de adjetivar.
> "Prata 925 legítima, com punção gravado e fecho gaveta reforçado."
> "Polimento, solda e ajuste são feitos na bancada da loja, em Salto — muita coisa sai no mesmo dia."

**O que a marca nunca escreve:** "exclusivo", "premium", "sofisticação", "luxo acessível", superlativo vazio. Onde outra loja diria "qualidade incomparável", a ERK diz "punção gravado".

**Negativa como prova:** a marca usa o que ela *não* é para se posicionar. "Nada de folheado." "Não mandamos sua peça para lugar nenhum."

**Caixa:** títulos e frases em caixa normal — só a primeira letra. Caixa alta é reservada a rótulos curtos com tracking largo: olho de banner (`OFICINA PRÓPRIA`), rótulo de rodapé (`AJUDA`), selo de pagamento (`PIX`, `ATÉ 6X SEM JUROS`), olho de card (`CORRENTES`) e etiqueta (`MAIS VENDIDA`).

**Ficha de produto:** nome genérico e direto ("Corrente cubana", não "Corrente Cubana Prestige"), seguido de uma linha técnica com `·` entre os dados: `Elo cubano · 60 cm`, `Par · com tarraxa`, `Aro 4 mm · polido`.

**Etiquetas:** vocabulário fechado — `Novo`, `Mais vendida`, `Presente`, `Sob encomenda` e o percentual (`-20%`). Nada de "imperdível" ou "últimas unidades".

**Botões:** verbo no infinitivo, na voz do cliente: "Ver o catálogo", "Montar a minha peça", "Comprar", "Chamar no WhatsApp", "Falar com a oficina", "Escolher presente".

**Estados vazios:** dizem o gesto que resolve, não se desculpam. "Toque no coração de uma peça para guardar aqui."

**Emoji:** nunca. Nem em botão, nem em selo, nem em texto de apoio.

**Números:** contagens explícitas ("16 peças", "5 itens"), parcelamento sempre com "sem juros", e o preço a pagar sempre antes do preço antigo.

---

# FUNDAMENTOS VISUAIS

## Cor
Cinco famílias, três degraus cada. Tinta para texto (`#0F1113` → `#5C626B` → `#8B9199`), fundo para superfície (`#FFFFFF` → `#F4F6F8` → `#ECEFF3`), linha para borda (`#E5E8EC`, `#D3D8DE`), acento vermelho (`#A8121A`, hover `#C41B24`) e verde de confirmação (`#1B7A4B`). Mais o cinza-azulado da "prata" (`#EDF0F4` → `#D5DBE3`), que só aparece no degradê do hero.

O vermelho é escasso e tem função única: desconto, contador da sacola, e o preço no título do hero. O verde é ainda mais restrito: parcelamento e itens confirmados. Fora disso a paleta é acromática — a cor da loja é o metal.

**Tema escuro** (o mockup enviado é a versão escura) usa os mesmos tokens com valores trocados: fundo `#0D0F12`/`#14171B`/`#1C2026`, tinta `#F2F4F7`, acento mais claro (`#D8363E`) para aguentar o fundo escuro, verde mais luminoso (`#3FD08A`). Duas regras específicas do escuro: fotos de fundo branco recebem `brightness(.88) contrast(1.05) saturate(.95)` e um véu vertical, senão viram blocos claros demais na grade; e o estado ativo se destaca **por luz, não por cor** — fundo um degrau acima, borda visível e um fio branco de 1px na aresta de cima.

No máximo duas cores de fundo por tela: a página e um degrau de cinza (`--surface-suave`) que separa as seções alternadas.

## Tipografia
Cinzel (serifada, romana, capitular) para logotipo e todo título; Montserrat para tudo que se lê. Nada de terceira família.

Títulos são fluidos: h1 `clamp(30px, 4.3vw, 53px)` em 700, h2 `clamp(21px, 2.5vw, 32px)` em 600. Corpo padrão 15px/1.6. A escala de corpo tem meio pixel de propósito — 13.5px para apoio e link de rodapé, 14.5px para nome de produto e botão, 10.5px para olho e etiqueta. Não arredonde para uma grade de 4px.

Tracking é a assinatura: quanto menor o rótulo, mais largo o espaçamento (`.24em` na linha do logo, `.14em` no olho de banner, `.1em` no olho de card, `.05em` na etiqueta). Preço tem tracking negativo (`-.01em`) e peso 700.

## Espaço e layout
Uma medida (`--max: 1360px`) e uma margem lateral fluida (`--pad: clamp(16px, 3.4vw, 44px)`) valem para todo o site — cabeçalho, seções e rodapé compartilham a mesma sarjeta. Seções respiram `clamp(38px, 5.4vw, 72px)`. Grades: 4 colunas de produto (→3 em 1080px →2 em 620px), 6 tiles de categoria (→3 →trilho horizontal em 720px), 4 garantias (→2 →1).

Elementos fixos: cabeçalho grudado no topo (74px), barra do polegar grudada na base no celular (62px + área segura), e o resumo de sacola/checkout grudado a 96px do topo no desktop. No celular o corpo recebe `padding-bottom` do tamanho da barra para a página não terminar embaixo dela.

Alvos de toque: 44px mínimo no celular. Campos de texto nunca abaixo de 16px (menos que isso faz o iOS dar zoom sozinho).

## Fundo e imagem
Sem textura, sem padrão, sem ilustração desenhada. O fundo é cor plana; o único degradê estrutural é o do hero (linear 115° na família prata, com um brilho radial por cima). Banners promocionais são foto sangrada com véu escuro — horizontal no desktop (90°, de 90% a 25% de opacidade) e **vertical no celular**, porque o véu horizontal em tela estreita cobre a foto inteira.

O clima da fotografia é frio e metálico: prata sobre pele, fundo neutro, sem grão, sem filtro quente. Foto de produto é quadrada no desktop e mais alta (1:1.12) no celular, onde a foto é o que vende.

## Cantos, borda, elevação
Card, tile, faixa e banner: 14px. Pílula da nav, linha de lista e ícone-botão: 10px. Etiqueta: 5px. Foto do hero: 16px. Painel que sobe: 20px no topo. Bloco do hero: 22px. Botão, chip, busca e selo: pílula total (980px).

Todo card tem borda de 1px — a borda faz o trabalho, a sombra só aparece na interação. Sombras são difusas, de baixa opacidade e na cor da tinta (nunca preto puro no claro): `0 14px 34px rgba(15,17,19,.10)` no card em hover, `0 24px 60px rgba(15,17,19,.16)` na foto do hero. No escuro trocam para preto com opacidade bem maior (até .55).

Transparência e blur são pontuais: só a etiqueta de preço sobre a foto do hero (`rgba(255,255,255,.94)` + `blur(8px)`), o coração sobre a foto do card e o véu do painel do celular. Nenhum vidro decorativo.

## Movimento
Uma curva para tudo: `cubic-bezier(.28, 0, .12, 1)` — sai rápido, chega devagar. Sem bounce, sem mola, sem sequência escalonada. Durações: 180ms para cor e hover leve, 220ms para card, botão e tile, 260ms para o painel que sobe (o único deslize da interface, `translateY(100%)` → 0), 500ms para o zoom lento da foto no hover do card. `prefers-reduced-motion` zera tudo.

**Hover:** card e tile sobem 3px e ganham sombra; a foto amplia 1.05. Botão primário clareia para `#2A2E34` (no escuro vai para branco puro); secundário troca a borda para tinta; chip troca a borda. Link de apoio passa de cinza para tinta. Nada muda de cor de fundo para uma cor nova — a mudança é sempre de valor.
**Press:** botão desce 1px. Nada encolhe.
**Estado ativo:** inversão (chip e pílula viram tinta cheia) ou profundidade (fundo um degrau acima + borda + fio de luz). Nunca uma cor nova.
**Touch:** onde não há hover, o que dependia dele fica sempre visível (o coração do card) e o zoom da foto é desligado.

---

# ICONOGRAFIA

Um único conjunto, e ele é do próprio mockup: 21 glifos desenhados em grade de 24, `stroke-width: 1.5`, `fill: none`, pontas e junções arredondadas, sem preenchimento. Estilo próximo de Lucide/Feather, mas **os paths são os do arquivo enviado** — foram extraídos verbatim para `components/core/Icon.jsx`, não substituídos por CDN e não redesenhados.

Nomes: `busca`, `conta`, `favorito`, `sacola`, `inicio`, `seta`, `mais`, `menos`, `filtro`, `grade`, `correntes`, `pulseiras`, `aneis`, `pingentes`, `brincos`, `conjuntos`, `puncao`, `garantia`, `entrega`, `oficina`, `check`.

Regras de uso: o traço herda `currentColor` (a cor vem do pai). Tamanhos praticados — 15px em link de apoio, 17px em botão, 18–19px em nav e garantia, 21px em ação do cabeçalho, 22px na barra do polegar. A única exceção ao "sem preenchimento" é o coração marcado, que preenche com o vermelho de acento. `seta` é o mesmo chevron rotacionado 180° para virar "voltar".

Não há fonte de ícone, sprite ou PNG. **Nunca use emoji** e nunca use caractere unicode como ícone — as duas exceções herdadas do mockup são o `✓` do painel de filtro e o `+` / `–` do acordeão do rodapé, ambos gerados por CSS `content`.

Não há logotipo em arquivo: onde uma marca gráfica entraria, use o componente `Logo` (nome em Cinzel 700 com a linha `PRATA 925 · SALTO SP` abaixo).

---

# Ressalvas

- **Sem logotipo.** Nenhuma marca gráfica foi fornecida e nenhuma foi desenhada. A assinatura é tipográfica.
- **Fontes por CDN.** Nenhum arquivo de fonte foi enviado; Cinzel e Montserrat vêm do Google Fonts (`tokens/fonts.css`), exatamente como no mockup. Se a loja tiver licença de fontes próprias, mande os arquivos.
- **Fotos são de banco.** As URLs do Pexels vieram do mockup e servem só de referência de enquadramento e clima. Substitua pelas fotos reais das peças.
- **`assets/` está vazio** por consequência: não havia nenhum binário (logo, ícone, imagem) nas fontes fornecidas.
