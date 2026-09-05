import Link from 'next/link';
import { Icon } from '../ui/Icon';

export type NavItem = { id: string; nome: string; icone: string; href: string; promo?: boolean };

export function CategoryNav({ itens = [], ativo }: { itens: NavItem[]; ativo?: string }) {
  return (
    <nav className="erk-catnav">
      <div className="erk-catnav__in">
        {itens.map((i) => (
          <Link
            key={i.id}
            href={i.href}
            className={[i.id === ativo ? 'is-on' : '', i.promo ? 'is-promo' : ''].filter(Boolean).join(' ')}
          >
            <Icon name={i.icone} />
            {i.nome}
          </Link>
        ))}
      </div>
    </nav>
  );
}
