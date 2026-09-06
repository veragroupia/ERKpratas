import { AuthForm } from '@/components/account/AuthForm';

export default function EntrarPage() {
  return (
    <main className="erk-sec erk-entra">
      {/* medida estreita: o cartão de acesso fica centrado na tela e o título
          alinhado com a borda dele, em vez de solto num wrap largo */}
      <div className="erk-wrap" style={{ maxWidth: 440 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Sua conta</h1>
        <AuthForm modo="entrar" />
      </div>
    </main>
  );
}
