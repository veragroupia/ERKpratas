// Prepara o ambiente LOCAL antes de `npm run dev` / `npm run build`.
// Em produção (Railway/Vercel/etc.) a DATABASE_URL vem do ambiente e este
// script não faz nada — quem cuida do banco lá é o `npm run start:prod`.

import { execSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env.DATABASE_URL) process.exit(0);

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(raiz, '.env');
const exemploPath = join(raiz, '.env.example');

if (!existsSync(envPath)) {
  copyFileSync(exemploPath, envPath);
  const segredo = randomBytes(32).toString('base64');
  writeFileSync(envPath, readFileSync(envPath, 'utf8').replace('change-me-in-production', segredo));
  console.log('→ .env criado a partir de .env.example (com NEXTAUTH_SECRET próprio).');
}

// Sincroniza o banco e carrega o catálogo. Se não houver Postgres acessível,
// avisa em vez de derrubar o comando com um erro do Prisma.
try {
  execSync('npx prisma db push --skip-generate', { cwd: raiz, stdio: 'pipe' });
  execSync('npx prisma db seed', { cwd: raiz, stdio: 'pipe' });
  console.log('→ Banco local sincronizado e catálogo carregado.');
} catch {
  console.log(
    [
      '',
      '⚠  Não consegui falar com o banco de dados local.',
      '   O projeto usa PostgreSQL. Suba um Postgres e ajuste a DATABASE_URL em web/.env.',
      '   Sem isso o site abre, mas as páginas que leem o catálogo vão dar erro.',
      '   (O site publicado no Railway já tem banco próprio e não depende disto.)',
      '',
    ].join('\n')
  );
}
