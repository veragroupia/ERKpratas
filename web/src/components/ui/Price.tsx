export function Price({
  valor,
  antigo,
  parcela,
  grande,
  className = '',
}: {
  valor: string;
  antigo?: string;
  parcela?: string;
  grande?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={['erk-preco', grande ? 'erk-preco--g' : ''].filter(Boolean).join(' ')}>
        <b>{valor}</b>
        {antigo ? <s>{antigo}</s> : null}
      </p>
      {parcela ? <p className="erk-parc">{parcela}</p> : null}
    </div>
  );
}
