import { getCartSummary } from '@/lib/cartSummary';
import { CartView } from '@/components/cart/CartView';

export default async function SacolaPage() {
  const { linhas, subtotal, economia } = await getCartSummary();
  return <CartView linhas={linhas} subtotal={subtotal} economia={economia} />;
}
