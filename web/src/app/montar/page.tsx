import { prisma } from '@/lib/db';
import { BuilderFlow } from '@/components/builder/BuilderFlow';
import { ESTADO_INICIAL, type BuilderState } from '@/components/builder/builderLogic';

/** `?base=<id>` parte de uma peça do catálogo — é o caminho de quem clicou em
    "Encomendar" numa peça esgotada e não quer remontar tudo do zero. */
export default async function MontarPage({ searchParams }: { searchParams: { base?: string } }) {
  let inicial: BuilderState | undefined;

  if (searchParams.base) {
    const p = await prisma.product.findUnique({ where: { id: searchParams.base } });
    if (p && ['corrente', 'pulseira', 'anel', 'pingente'].includes(p.buildTipo)) {
      inicial = {
        ...ESTADO_INICIAL,
        tipo: p.buildTipo as BuilderState['tipo'],
        elo: p.buildElo || ESTADO_INICIAL.elo,
        esp: p.buildEsp || ESTADO_INICIAL.esp,
        medida: p.buildMedida || ESTADO_INICIAL.medida,
        pingente: p.buildPingente || '',
      };
    }
  }

  return <BuilderFlow inicial={inicial} />;
}
