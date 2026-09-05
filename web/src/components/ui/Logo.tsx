import Link from 'next/link';

export function Logo({
  href = '/',
  linha = 'PRATA 925 · SALTO SP',
  compacto,
  className = '',
}: {
  href?: string | null;
  linha?: string | null;
  compacto?: boolean;
  className?: string;
}) {
  const cls = ['erk-logo', compacto ? 'erk-logo--sm' : '', className].filter(Boolean).join(' ');
  const conteudo = (
    <>
      ERK Pratas
      {linha ? <small>{linha}</small> : null}
    </>
  );
  if (href) {
    return (
      <Link className={cls} href={href}>
        {conteudo}
      </Link>
    );
  }
  return <span className={cls}>{conteudo}</span>;
}
