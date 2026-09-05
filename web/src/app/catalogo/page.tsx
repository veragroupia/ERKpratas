import { CatalogView } from '@/components/catalog/CatalogView';

export default function CatalogoPage({ searchParams }: { searchParams: { ordem?: string } }) {
  return <CatalogView filtro="todas" ordem={searchParams.ordem || 'relevancia'} />;
}
