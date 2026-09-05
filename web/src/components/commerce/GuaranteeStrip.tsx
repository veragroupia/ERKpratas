import { Icon } from '../ui/Icon';

export type GuaranteeItem = { icone: string; titulo: string; texto?: string };

export function GuaranteeStrip({ itens = [], cols = 4, className = '' }: { itens: GuaranteeItem[]; cols?: number; className?: string }) {
  return (
    <div className={['erk-garantias', className].filter(Boolean).join(' ')} style={{ ['--cols' as any]: cols }}>
      {itens.map((i) => (
        <div className="erk-gar" key={i.titulo}>
          <span className="erk-gar__i">
            <Icon name={i.icone} />
          </span>
          <div>
            <b>{i.titulo}</b>
            {i.texto ? <p>{i.texto}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
