import { Button } from '../ui/Button';

export function CTABanner({
  titulo,
  texto,
  acao,
  acaoHref = '#',
  className = '',
}: {
  titulo: string;
  texto?: string;
  acao?: string;
  acaoHref?: string;
  className?: string;
}) {
  return (
    <div className={['erk-cta', className].filter(Boolean).join(' ')}>
      <div>
        <h2>{titulo}</h2>
        {texto ? <p>{texto}</p> : null}
      </div>
      {acao ? <Button href={acaoHref}>{acao}</Button> : null}
    </div>
  );
}
