# ERK Pratas

**No ar:** https://site-production-0686.up.railway.app

Loja online da ERK Pratas — joalheria de prata 925 com oficina própria em Salto, SP. Catálogo, montador de peças personalizadas com visualização 3D, sacola, checkout e conta de cliente.

Implementação fullstack em Next.js a partir do design exportado do Claude Design (ver `project/` e `chats/` para a fonte original do design e o histórico de decisões).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Prisma** + **SQLite** (`web/prisma/schema.prisma`) — o banco é um arquivo (`web/prisma/dev.db`), sem servidor para instalar ou iniciar
- **NextAuth** (credenciais + senha com hash) para contas de cliente
- **three.js** para o visualizador 3D das peças (geometria procedural — elo por elo, na medida real)

## Rodando localmente

Só precisa do Node.js instalado. Dois comandos:

```bash
cd web
npm install
npm run dev
```

Na primeira execução o próprio `npm run dev` cria o `.env`, monta o banco e carrega o catálogo — não há passo manual. Acesse `http://localhost:3000`.

Uma conta de exemplo já vem no seed: `ana.ribeiro@email.com` / `erkpratas123`.

Para limpar o banco e recarregar o catálogo do zero: `npm run db:reset`.

## O que está implementado

- Home, catálogo com filtro por categoria/ordenação, página de produto com carrossel de fotos e 3D, busca e favoritos.
- Montador de peças ("Montar a sua peça") em fluxo por etapas, com preço calculado a partir do peso estimado da prata e visualização 3D ao vivo.
- Sacola, checkout e confirmação de pedido, com carrinho e pedidos persistidos no banco (pagamento simulado — sem gateway real).
- Conta de cliente: cadastro/login, pedidos, dados salvos (endereço, medidas, pagamento preferido).
- Navegação responsiva: cabeçalho e trilho de categorias no desktop; pílula fixa, menu em tela cheia, barra de contexto e barra de ação fixa no celular — replicando o comportamento definido nas iterações do design original.

## O que ficou de fora (decisão tomada com o usuário)

- Fotos de produto e telefone de contato ainda são os placeholders do mockup original (Pexels / número de exemplo) — trocar por material real da loja quando disponível.
- Pagamento é simulado: o checkout confirma o pedido no banco, mas não processa cobrança de verdade (sem integração com Pix/cartão).
- Nenhum deploy foi feito. Para colocar no ar depois, o SQLite precisa dar lugar a um banco hospedado (Postgres, por exemplo): a maioria dos hosts não guarda arquivos entre um deploy e outro, então o `dev.db` seria apagado. É só trocar o `provider` em `prisma/schema.prisma` e a `DATABASE_URL` — o resto do código não muda.

## Deploy

Hospedado na Railway (projeto `erk-pratas`), com dois serviços:

- **site** — a aplicação Next.js. Builda a partir de `web/` neste repositório, branch `main`; todo push para `main` gera um novo deploy automaticamente.
- **Postgres** — o banco, com volume persistente (os dados sobrevivem aos deploys).

O comando de start é `npm run start:prod`: sincroniza o schema e recarrega o catálogo (o seed é idempotente) antes de subir o servidor. As variáveis `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` e `PORT` ficam configuradas no serviço pela Railway.

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
