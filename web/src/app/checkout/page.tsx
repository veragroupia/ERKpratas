import { redirect } from 'next/navigation';
import { getCartSummary } from '@/lib/cartSummary';
import { CheckoutView } from '@/components/checkout/CheckoutView';

export default async function CheckoutPage() {
  const { linhas, subtotal } = await getCartSummary();
  if (linhas.length === 0) redirect('/sacola');
  return <CheckoutView linhas={linhas} subtotal={subtotal} />;
}
