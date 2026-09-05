'use client';

import { useState } from 'react';
import { Chip } from '../ui/Chip';
import { EmptyState } from '../ui/EmptyState';

export type PedidoResumo = {
  id: number;
  n: string;
  data: string;
  estado: string;
  grupo: 'preparo' | 'entregue';
  itens: string;
  valor: string;
  entrega: string;
};

const ABAS = [
  { id: 'todos', nome: 'Todos' },
  { id: 'preparo', nome: 'Em preparo' },
  { id: 'entregue', nome: 'Entregues' },
];

export function OrdersView({ pedidos }: { pedidos: PedidoResumo[] }) {
  const [aba, setAba] = useState('todos');
  const vistos = aba === 'todos' ? pedidos : pedidos.filter((p) => p.grupo === aba);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'nowrap', overflowX: 'auto', marginTop: 18, paddingBottom: 2 }}>
        {ABAS.map((a) => (
          <Chip key={a.id} ativo={aba === a.id} onClick={() => setAba(a.id)}>
            {a.nome}
          </Chip>
        ))}
      </div>
      <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
        {vistos.map((o) => (
          <div key={o.id} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 14, padding: '16px 17px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ flex: 1, minWidth: 0, display: 'grid', gap: 3 }}>
                <b style={{ fontSize: 14.5, fontWeight: 600 }}>{o.n}</b>
                <em style={{ fontStyle: 'normal', fontSize: 13, color: 'var(--text-3)' }}>{o.data}</em>
              </span>
              <span
                style={{
                  flex: 'none',
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  padding: '5px 11px',
                  borderRadius: 980,
                  border: '1px solid var(--border-2)',
                  background: 'var(--surface-forte)',
                  whiteSpace: 'nowrap',
                  color: o.grupo === 'entregue' ? 'var(--ok)' : 'var(--text-1)',
                }}
              >
                {o.estado}
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.55, margin: '11px 0 0' }}>{o.itens}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-1)' }}>
              <b style={{ flex: 1, fontSize: 15.5, fontWeight: 700, letterSpacing: '-.01em' }}>{o.valor}</b>
              <em style={{ fontStyle: 'normal', fontSize: 12.5, color: 'var(--text-3)' }}>{o.entrega}</em>
            </div>
          </div>
        ))}
      </div>
      {vistos.length === 0 ? <EmptyState>Nenhum pedido nesse estado por enquanto.</EmptyState> : null}
    </>
  );
}
