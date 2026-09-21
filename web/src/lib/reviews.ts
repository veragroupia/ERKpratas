import { prisma } from './db';
import { getCurrentUserId } from './session';

/* O painel administrativo vive em outro repositório e evoluiu o vocabulário de
   status do pedido (novo, pago, producao, polimento, embalado, enviado,
   entregue, cancelado), enquanto a loja ainda grava "preparo". Em vez de
   listar os estados válidos — lista que se desatualiza toda vez que um dos
   dois lados inventa um status — a regra é pela negativa: vale qualquer
   pedido que não tenha sido cancelado. */
const STATUS_INVALIDOS = ['cancelado'];

export type ResumoAvaliacoes = {
  media: number;
  total: number;
  /** quantas notas de cada valor, para as barras de distribuição */
  distribuicao: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type Depoimento = {
  id: string;
  nota: number;
  comentario: string | null;
  autor: string;
  data: string;
  /** true quando é a avaliação do próprio visitante, que pode editá-la */
  meu: boolean;
};

/** Primeiro nome + inicial do sobrenome: identifica sem expor o nome inteiro. */
function nomeCurto(nomeCompleto: string): string {
  const partes = nomeCompleto.trim().split(/\s+/);
  if (partes.length < 2) return partes[0] || 'Cliente';
  return `${partes[0]} ${partes[partes.length - 1][0].toUpperCase()}.`;
}

export async function getResumoAvaliacoes(productId: string): Promise<ResumoAvaliacoes> {
  const linhas = await prisma.review.groupBy({
    by: ['rating'],
    where: { productId },
    _count: { rating: true },
  });

  const distribuicao = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
  let total = 0;
  let soma = 0;
  for (const l of linhas) {
    const nota = l.rating as 1 | 2 | 3 | 4 | 5;
    if (nota < 1 || nota > 5) continue;
    distribuicao[nota] = l._count.rating;
    total += l._count.rating;
    soma += nota * l._count.rating;
  }

  return { media: total ? soma / total : 0, total, distribuicao };
}

export async function getDepoimentos(productId: string, limite = 50): Promise<Depoimento[]> {
  const userId = await getCurrentUserId();
  const linhas = await prisma.review.findMany({
    where: { productId },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: limite,
  });

  return linhas.map((r) => ({
    id: r.id,
    nota: r.rating,
    comentario: r.comment,
    autor: nomeCurto(r.user.name),
    data: r.createdAt.toISOString(),
    meu: !!userId && r.userId === userId,
  }));
}

export type PermissaoAvaliar =
  | { pode: true; jaAvaliou: boolean; notaAtual?: number; comentarioAtual?: string | null }
  | { pode: false; motivo: 'anonimo' | 'nao-comprou' };

/** Quem pode avaliar: só quem tem a peça num pedido próprio já pago.
    O motivo volta junto para a tela explicar em vez de só esconder o formulário. */
export async function getPermissaoAvaliar(productId: string): Promise<PermissaoAvaliar> {
  const userId = await getCurrentUserId();
  if (!userId) return { pode: false, motivo: 'anonimo' };

  const comprou = await prisma.orderItem.findFirst({
    where: { productId, order: { userId, status: { notIn: STATUS_INVALIDOS } } },
    select: { id: true },
  });
  if (!comprou) return { pode: false, motivo: 'nao-comprou' };

  const minha = await prisma.review.findUnique({
    where: { productId_userId: { productId, userId } },
    select: { rating: true, comment: true },
  });

  return minha
    ? { pode: true, jaAvaliou: true, notaAtual: minha.rating, comentarioAtual: minha.comment }
    : { pode: true, jaAvaliou: false };
}

/** Pedido mais recente que contém a peça — guardado na avaliação como prova. */
export async function findPedidoDaCompra(productId: string, userId: string): Promise<number | null> {
  const item = await prisma.orderItem.findFirst({
    where: { productId, order: { userId, status: { notIn: STATUS_INVALIDOS } } },
    orderBy: { order: { createdAt: 'desc' } },
    select: { orderId: true },
  });
  return item?.orderId ?? null;
}
