import { fmt, fotoUrl, parcela } from './format';
import { getCartItems } from './cart';

export type CartLine = {
  id: string;
  nome: string;
  spec: string;
  foto: string;
  quantidade: number;
  precoUnit: number;
  precoAntigoUnit: number | null;
  total: number;
};

export async function getCartSummary() {
  const rows = await getCartItems();
  const linhas: CartLine[] = rows.map((r) => {
    if (r.product) {
      return {
        id: r.id,
        nome: r.product.name,
        spec: r.product.spec,
        foto: fotoUrl(r.product.photoId, 200),
        quantidade: r.quantity,
        precoUnit: r.product.price,
        precoAntigoUnit: r.product.oldPrice,
        total: r.product.price * r.quantity,
      };
    }
    return {
      id: r.id,
      nome: r.customName || 'Peça montada sob encomenda',
      spec: r.customSpec || '',
      foto: fotoUrl(16124761, 200),
      quantidade: r.quantity,
      precoUnit: r.customPrice || 0,
      precoAntigoUnit: null,
      total: (r.customPrice || 0) * r.quantity,
    };
  });
  const subtotal = linhas.reduce((a, l) => a + l.total, 0);
  const economia = linhas.reduce((a, l) => a + ((l.precoAntigoUnit || l.precoUnit) - l.precoUnit) * l.quantidade, 0);
  const nItens = linhas.reduce((a, l) => a + l.quantidade, 0);
  return {
    linhas,
    subtotal,
    economia,
    nItens,
    subtotalFmt: fmt(subtotal),
    economiaFmt: '− ' + fmt(economia),
    parcelaSubtotal: parcela(subtotal),
  };
}

export function freteFor(entrega: string) {
  return entrega === 'correios' ? 24.9 : 0;
}
