import { AuthForm } from '@/components/account/AuthForm';

export default function CadastroPage() {
  return (
    <main className="erk-sec erk-entra">
      {/* mesma medida da tela de entrar, para os dois cartões coincidirem */}
      <div className="erk-wrap" style={{ maxWidth: 440 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Sua conta</h1>
        <AuthForm modo="cadastro" />
      </div>
    </main>
  );
}
