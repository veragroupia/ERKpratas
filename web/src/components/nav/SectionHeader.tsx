import Link from 'next/link';
import { Icon } from '../ui/Icon';

export function SectionHeader({
  titulo,
  apoio,
  link,
  linkHref = '#',
  className = '',
}: {
  titulo: string;
  apoio?: string;
  link?: string;
  linkHref?: string;
  className?: string;
}) {
  return (
    <div className={['erk-cab', className].filter(Boolean).join(' ')}>
      <div>
        <h2>{titulo}</h2>
        {apoio ? <p>{apoio}</p> : null}
      </div>
      {link ? (
        <Link className="erk-verall" href={linkHref}>
          {link} <Icon name="seta" />
        </Link>
      ) : null}
    </div>
  );
}
