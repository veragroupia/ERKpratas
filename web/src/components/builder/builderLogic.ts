import { PRECO_GRAMA } from '@/lib/constants';
import { fmt, parcela, capitalize } from '@/lib/format';

export type TipoPeca = 'corrente' | 'pulseira' | 'anel' | 'pingente';

export type BuilderState = {
  tipo: TipoPeca;
  elo: string;
  esp: number;
  medida: number;
  acabamento: 'polido' | 'escovado' | 'oxidado';
  pingente: string;
  gravacao: string;
};

export const ESTADO_INICIAL: BuilderState = {
  tipo: 'corrente',
  elo: 'cubano',
  esp: 4,
  medida: 60,
  acabamento: 'polido',
  pingente: '',
  gravacao: '',
};

export const NOME_ELO: Record<string, string> = { cubano: 'Cubano', grumet: 'Grumet', veneziana: 'Veneziana', cartier: 'Cartier', baiana: 'Baiana' };
export const NOME_TIPO: Record<string, string> = { corrente: 'Corrente', pulseira: 'Pulseira', anel: 'Anel', pingente: 'Pingente' };

export type StepOpt = [string | number, string, string];

export type StepDef = {
  k: string;
  nome: string;
  titulo: string;
  apoio: string;
  quando?: boolean;
  valor?: string | number;
  opcoes?: StepOpt[];
};

export function buildSteps(b: BuilderState): StepDef[] {
  const defs: StepDef[] = [
    {
      k: 'tipo',
      nome: 'Peça',
      titulo: 'Que peça você quer montar?',
      apoio: 'A partir daqui as opções mudam conforme o tipo de peça.',
      opcoes: [
        ['corrente', 'Corrente', 'de 45 a 70 cm'],
        ['pulseira', 'Pulseira', 'de 18 a 23 cm'],
        ['anel', 'Anel', 'aro 16 a 22'],
        ['pingente', 'Pingente', 'cruz, placa ou medalha'],
      ],
      valor: b.tipo,
    },
    {
      k: 'elo',
      nome: 'Elo',
      titulo: 'Escolha o elo',
      apoio: 'O elo define o peso e o jeito que a peça cai no corpo.',
      quando: b.tipo === 'corrente' || b.tipo === 'pulseira',
      valor: b.elo,
      opcoes: [
        ['cubano', 'Cubano', 'malha fechada, a mais pedida'],
        ['grumet', 'Grumet', 'elo torcido, clássico'],
        ['veneziana', 'Veneziana', 'malha quadrada, discreta'],
        ['cartier', 'Cartier', 'elo alongado'],
        ['baiana', 'Baiana', 'bola entre os elos'],
      ],
    },
    {
      k: 'modelo',
      nome: 'Modelo',
      titulo: 'Escolha o modelo',
      apoio: 'Todos saem com argola reforçada.',
      quando: b.tipo === 'pingente',
      valor: b.pingente || 'placa',
      opcoes: [
        ['cruz', 'Cruz', 'vazada, 3 cm'],
        ['placa', 'Placa', 'aceita gravação'],
        ['medalha', 'Medalha', 'redonda, lisa'],
      ],
    },
    {
      k: 'esp',
      nome: b.tipo === 'anel' ? 'Largura' : 'Espessura',
      titulo: b.tipo === 'anel' ? 'Largura do aro' : b.tipo === 'pingente' ? 'Tamanho do pingente' : 'Qual espessura?',
      apoio: 'É o que mais muda o peso da prata — e o preço.',
      valor: b.esp,
      opcoes: (b.tipo === 'anel' ? [3, 4, 6, 8] : b.tipo === 'pingente' ? [3, 4, 5] : [2.5, 3, 4, 5, 6, 8]).map(
        (e): StepOpt => [e, String(e).replace('.', ',') + ' mm', e <= 3 ? 'discreta' : e <= 4 ? 'o mais vendido' : e <= 6 ? 'presença no corpo' : 'peça pesada']
      ),
    },
    {
      k: 'medida',
      nome: b.tipo === 'anel' ? 'Numeração' : 'Medida',
      titulo: b.tipo === 'anel' ? 'Qual o seu aro?' : 'Qual o comprimento?',
      apoio: b.tipo === 'anel' ? 'Na dúvida, a gente mede na loja e ajusta depois.' : 'A gente confere a medida no WhatsApp antes de produzir.',
      quando: b.tipo === 'corrente' || b.tipo === 'pulseira' || b.tipo === 'anel',
      valor: b.medida,
      opcoes:
        b.tipo === 'corrente'
          ? [[45, '45 cm', 'colada no pescoço'], [50, '50 cm', 'na clavícula'], [60, '60 cm', 'a mais pedida'], [70, '70 cm', 'no peito']]
          : b.tipo === 'pulseira'
            ? [[18, '18 cm', 'punho fino'], [21, '21 cm', 'a mais pedida'], [23, '23 cm', 'punho largo']]
            : [[16, 'Aro 16', ''], [18, 'Aro 18', 'o mais pedido'], [20, 'Aro 20', ''], [22, 'Aro 22', '']],
    },
    {
      k: 'acabamento',
      nome: 'Acabamento',
      titulo: 'Acabamento da prata',
      apoio: 'Todos são feitos na bancada, no fim da produção.',
      valor: b.acabamento,
      opcoes: [
        ['polido', 'Polido', 'espelhado, brilho cheio'],
        ['escovado', 'Escovado', 'fosco, marca menos'],
        ['oxidado', 'Oxidado', 'escurecido nos vãos'],
      ],
    },
    {
      k: 'pingente',
      nome: 'Pingente',
      titulo: 'Quer um pingente?',
      apoio: 'Vai montado na corrente, com argola reforçada.',
      quando: b.tipo === 'corrente',
      valor: b.pingente,
      opcoes: [
        ['', 'Sem pingente', 'só a corrente'],
        ['cruz', 'Cruz', '+ R$ 18'],
        ['placa', 'Placa', 'aceita gravação'],
        ['medalha', 'Medalha', 'redonda, lisa'],
      ],
    },
    { k: 'gravacao', nome: 'Gravação', titulo: 'Gravação', apoio: 'Até 14 caracteres. Deixe em branco se não quiser.' },
    { k: 'resumo', nome: 'Resumo', titulo: 'Confira a sua peça', apoio: 'Se estiver tudo certo, a peça entra na fila da bancada.' },
  ];
  return defs.filter((d) => d.quando !== false);
}

export function montagem(b: BuilderState) {
  const g = PRECO_GRAMA;
  const esp = Number(b.esp);
  let peso: number, base: number;
  if (b.tipo === 'corrente' || b.tipo === 'pulseira') {
    peso = b.medida * esp * esp * 0.031;
    base = b.tipo === 'corrente' ? 38 : 62;
  } else if (b.tipo === 'anel') {
    peso = 2.1 + esp * 0.95;
    base = 45;
  } else {
    peso = 3.2 + esp * 0.5;
    base = 30;
  }
  let extra = 0;
  if (b.acabamento === 'escovado') extra += 14;
  if (b.acabamento === 'oxidado') extra += 22;
  if (String(b.gravacao).trim()) extra += 25;
  if (b.tipo !== 'pingente' && b.pingente) {
    peso += 3.2;
    extra += 18;
  }
  const preco = Math.round(peso * g + base + extra);
  return { peso: peso.toFixed(1).replace('.', ','), preco };
}

export function resumoPeca(b: BuilderState) {
  if (b.tipo === 'corrente' || b.tipo === 'pulseira') {
    return `${NOME_TIPO[b.tipo]} ${(NOME_ELO[b.elo] || '').toLowerCase()} · ${String(b.esp).replace('.', ',')} mm · ${b.medida} cm`;
  }
  if (b.tipo === 'anel') return `Anel aro ${b.medida} · ${String(b.esp).replace('.', ',')} mm`;
  return `Pingente ${b.pingente || 'placa'} · ${String(b.esp).replace('.', ',')} mm`;
}

export function rotuloVal(b: BuilderState): Record<string, string> {
  return {
    tipo: NOME_TIPO[b.tipo],
    elo: NOME_ELO[b.elo],
    modelo: b.pingente ? capitalize(b.pingente) : 'Placa',
    esp: String(b.esp).replace('.', ',') + ' mm',
    medida: b.tipo === 'anel' ? 'Aro ' + b.medida : b.medida + ' cm',
    acabamento: capitalize(b.acabamento),
    pingente: b.pingente ? capitalize(b.pingente) : 'Sem pingente',
    gravacao: String(b.gravacao).trim() || 'Sem gravação',
  };
}

export function precoFmt(preco: number) {
  return { valor: fmt(preco), parcela: parcela(preco) };
}
