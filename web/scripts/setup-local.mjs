// Prepara o ambiente local antes de `npm run dev` / `npm run build`:
// cria o .env se faltar e monta o banco SQLite na primeira execução.
// Roda como `predev`/`prebuild`, então instalar e rodar já basta.

import { execSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(raiz, '.env');
const exemploPath = join(raiz, '.env.example');
const bancoPath = join(raiz, 'prisma', 'dev.db');

if (!existsSync(envPath)) {
  copyFileSync(exemploPath, envPath);
  const segredo = randomBytes(32).toString('base64');
  writeFileSync(envPath, readFileSync(envPath, 'utf8').replace('change-me-in-production', segredo));
  console.log('→ .env criado a partir de .env.example (com NEXTAUTH_SECRET próprio).');
}

if (!existsSync(bancoPath)) {
  console.log('→ Primeira execução: criando o banco e carregando o catálogo…');
  // Via CLI do Prisma nos dois passos: é ela que carrega o .env para o processo.
  execSync('npx prisma db push --skip-generate', { cwd: raiz, stdio: 'inherit' });
  execSync('npx prisma db seed', { cwd: raiz, stdio: 'inherit' });
  console.log('→ Banco pronto.');
}
