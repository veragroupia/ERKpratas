'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/Button';

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

export function AuthForm({ modo }: { modo: 'entrar' | 'cadastro' }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      if (modo === 'cadastro') {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErro(data.error || 'Não deu para criar a conta');
          setCarregando(false);
          return;
        }
      }
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) {
        setErro('E-mail ou senha incorretos');
        setCarregando(false);
        return;
      }
      router.push('/conta');
      router.refresh();
    } catch {
      setErro('Algo deu errado. Tente de novo.');
      setCarregando(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginTop: 22,
        background: 'var(--surface-card)',
        border: '1px solid var(--border-1)',
        borderRadius: 16,
        padding: 'clamp(20px,3vw,28px)',
        display: 'grid',
        gap: 14,
        maxWidth: 440,
      }}
    >
      <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', margin: 0 }}>
        {modo === 'entrar' ? 'ACESSO' : 'CRIAR CONTA'}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(19px,2.2vw,25px)', margin: 0 }}>
        {modo === 'entrar' ? 'Entre para acompanhar seus pedidos' : 'Crie a sua conta na ERK Pratas'}
      </h2>
      {modo === 'cadastro' ? (
        <label style={{ display: 'grid', gap: 7 }}>
          <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Nome completo</span>
          <input style={campo} value={name} onChange={(e) => setName(e.target.value)} placeholder="Como está no documento" required />
        </label>
      ) : null}
      <label style={{ display: 'grid', gap: 7 }}>
        <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>E-mail</span>
        <input style={campo} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
      </label>
      {modo === 'cadastro' ? (
        <label style={{ display: 'grid', gap: 7 }}>
          <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>WhatsApp</span>
          <input style={campo} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 9 9999-9999" />
        </label>
      ) : null}
      <label style={{ display: 'grid', gap: 7 }}>
        <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Senha</span>
        <input
          style={campo}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          minLength={6}
          required
        />
      </label>
      {erro ? <p style={{ color: 'var(--acento-2)', fontSize: 13.5, margin: 0 }}>{erro}</p> : null}
      <Button type="submit" full disabled={carregando}>
        {carregando ? 'Um momento…' : modo === 'entrar' ? 'Entrar' : 'Criar conta'}
      </Button>
      <p style={{ fontSize: 13.5, color: 'var(--text-3)', margin: 0, textAlign: 'center' }}>
        {modo === 'entrar' ? (
          <>
            Ainda não tem conta? <Link href="/conta/cadastro" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Criar conta</Link>
          </>
        ) : (
          <>
            Já tem conta? <Link href="/conta/entrar" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Entrar</Link>
          </>
        )}
      </p>
    </form>
  );
}
