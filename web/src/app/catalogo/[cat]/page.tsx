import { CatalogView } from '@/components/catalog/CatalogView';

export default function CatalogoCategoriaPage({ params, searchParams }: { params: { cat: string }; searchParams: { ordem?: string } }) {
  return <CatalogView filtro={params.cat} ordem={searchParams.ordem || 'relevancia'} />;
}
