'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';

export type DadosIniciais = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip: string;
  preference: string;
  anelAro: string;
  correnteCm: string;
  pulseiraCm: string;
  paymentPref: string;
};

const campo: React.CSSProperties = {
  height: 46,
  borderRadius: 10,
  background: 'var(--surface-suave)',
  border: '1px solid var(--border-1)',
  padding: '0 14px',
  fontSize: 16,
  outline: 'none',
  color: 'var(--text-1)',
  width: '100%',
};

function Bloco({ titulo, linhas }: { titulo: string; linhas: [string, string][] }) {
  return (
    <>
      <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '26px 0 12px' }}>{titulo}</p>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 16, padding: '4px 17px' }}>
        {linhas.map(([rotulo, valor], i) => (
          <div key={rotulo} style={{ display: 'flex', alignItems: 'center', gap: 14, minHeight: 54, padding: '9px 0', borderBottom: i < linhas.length - 1 ? '1px solid var(--border-1)' : 'none' }}>
            <em style={{ flex: 'none', fontStyle: 'normal', fontSize: 12.5, color: 'var(--text-3)', minWidth: 104 }}>{rotulo}</em>
            <b style={{ flex: 1, minWidth: 0, fontSize: 14.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{valor || '—'}</b>
          </div>
        ))}
      </div>
    </>
  );
}

export function DadosView({ dados }: { dados: DadosIniciais }) {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(dados);
  const [salvando, setSalvando] = useState(false);

  function campoOn<K extends keyof DadosIniciais>(k: K) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function salvar() {
    setSalvando(true);
    await fetch('/api/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.nome,
        phone: form.telefone,
        cpf: form.cpf,
        street: form.street,
        number: form.number,
        district: form.district,
        city: form.city,
        state: form.state,
        zip: form.zip,
        preference: form.preference,
        anelAro: form.anelAro ? Number(form.anelAro) : undefined,
        correnteCm: form.correnteCm ? Number(form.correnteCm) : undefined,
        pulseiraCm: form.pulseiraCm ? Number(form.pulseiraCm) : undefined,
        paymentPref: form.paymentPref,
      }),
    });
    setSalvando(false);
    setEditando(false);
    router.refresh();
  }

  if (editando) {
    return (
      <div style={{ marginTop: 22, display: 'grid', gap: 14, maxWidth: 480 }}>
        {([
          ['nome', 'Nome completo'],
          ['telefone', 'Telefone'],
          ['cpf', 'CPF'],
          ['street', 'Endereço'],
          ['number', 'Número'],
          ['district', 'Bairro'],
          ['city', 'Cidade'],
          ['state', 'Estado'],
          ['zip', 'CEP'],
          ['anelAro', 'Medida do anel (aro)'],
          ['correnteCm', 'Medida da corrente (cm)'],
          ['pulseiraCm', 'Medida da pulseira (cm)'],
        ] as [keyof DadosIniciais, string][]).map(([k, rotulo]) => (
          <label key={k} style={{ display: 'grid', gap: 7 }}>
            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{rotulo}</span>
            <input style={campo} value={form[k]} onChange={campoOn(k)} />
          </label>
        ))}
        <div style={{ display: 'flex', gap: 10 }}>
          <Button onClick={salvar} disabled={salvando}>
            {salvando ? 'Salvando…' : 'Salvar'}
          </Button>
          <Button variant="secondary" onClick={() => setEditando(false)} disabled={salvando}>
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Bloco
        titulo="QUEM COMPRA"
        linhas={[
          ['Nome', dados.nome],
          ['E-mail', dados.email],
          ['Telefone', dados.telefone],
          ['CPF', dados.cpf],
        ]}
      />
      <Bloco
        titulo="ENTREGA"
        linhas={[
          ['Endereço', [dados.street, dados.number].filter(Boolean).join(', ')],
          ['Bairro', dados.district],
          ['Cidade', [dados.city, dados.state].filter(Boolean).join(' · ')],
          ['CEP', dados.zip],
        ]}
      />
      <Bloco
        titulo="MEDIDAS SALVAS"
        linhas={[
          ['Anel', dados.anelAro ? 'Aro ' + dados.anelAro : ''],
          ['Corrente', dados.correnteCm ? dados.correnteCm + ' cm' : ''],
          ['Pulseira', dados.pulseiraCm ? dados.pulseiraCm + ' cm' : ''],
        ]}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
        <Button onClick={() => setEditando(true)}>Editar dados</Button>
        <Button variant="secondary" href="https://wa.me/5511911124875">
          Falar com a oficina
        </Button>
      </div>
    </>
  );
}
