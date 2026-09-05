# ERK Pratas

Loja online da ERK Pratas — joalheria de prata 925 com oficina própria em Salto, SP. Catálogo, montador de peças personalizadas com visualização 3D, sacola, checkout e conta de cliente.

Implementação fullstack em Next.js a partir do design exportado do Claude Design (ver `project/` e `chats/` para a fonte original do design e o histórico de decisões).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Prisma** + SQLite (`web/prisma/schema.prisma`)
- **NextAuth** (credenciais + senha com hash) para contas de cliente
- **three.js** para o visualizador 3D das peças (geometria procedural — elo por elo, na medida real)

## Rodando localmente

```bash
cd web
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Acesse `http://localhost:3000`.

Uma conta de exemplo já vem no seed: `ana.ribeiro@email.com` / `erkpratas123`.

## O que está implementado

- Home, catálogo com filtro por categoria/ordenação, página de produto com carrossel de fotos e 3D, busca e favoritos.
- Montador de peças ("Montar a sua peça") em fluxo por etapas, com preço calculado a partir do peso estimado da prata e visualização 3D ao vivo.
- Sacola, checkout e confirmação de pedido, com carrinho e pedidos persistidos no banco (pagamento simulado — sem gateway real).
- Conta de cliente: cadastro/login, pedidos, dados salvos (endereço, medidas, pagamento preferido).
- Navegação responsiva: cabeçalho e trilho de categorias no desktop; pílula fixa, menu em tela cheia, barra de contexto e barra de ação fixa no celular — replicando o comportamento definido nas iterações do design original.

## O que ficou de fora (decisão tomada com o usuário)

- Fotos de produto e telefone de contato ainda são os placeholders do mockup original (Pexels / número de exemplo) — trocar por material real da loja quando disponível.
- Pagamento é simulado: o checkout confirma o pedido no banco, mas não processa cobrança de verdade (sem integração com Pix/cartão).
- Nenhum deploy foi feito — o projeto está pronto para rodar localmente ou publicar em qualquer host que suporte Next.js.

## Estrutura

```
web/                 # a aplicação Next.js
  src/app/           # rotas (App Router) e API routes
  src/components/    # componentes de UI, comércio, navegação, 3D
  src/lib/           # acesso a dados, auth, carrinho, formatação
  prisma/            # schema, seed e dados de catálogo
project/             # design original exportado do Claude Design (referência)
chats/               # histórico das conversas de design (referência)
```
