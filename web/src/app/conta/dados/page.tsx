import { redirect } from 'next/navigation';
import { getCurrentUserId } from '@/lib/session';
import { prisma } from '@/lib/db';
import { MobileContextBar } from '@/components/nav/MobileContextBar';
import { DadosView, type DadosIniciais } from '@/components/account/DadosView';

export default async function DadosPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect('/conta/entrar');

  const user = await prisma.user.findUnique({ where: { id: userId }, include: { address: true, measurements: true } });
  if (!user) redirect('/conta/entrar');

  const dados: DadosIniciais = {
    nome: user.name,
    email: user.email,
    telefone: user.phone || '',
    cpf: user.cpf || '',
    street: user.address?.street || '',
    number: user.address?.number || '',
    district: user.address?.district || '',
    city: user.address?.city || '',
    state: user.address?.state || '',
    zip: user.address?.zip || '',
    preference: user.address?.preference || 'motoboy',
    anelAro: user.measurements?.anelAro ? String(user.measurements.anelAro) : '',
    correnteCm: user.measurements?.correnteCm ? String(user.measurements.correnteCm) : '',
    pulseiraCm: user.measurements?.pulseiraCm ? String(user.measurements.pulseiraCm) : '',
    paymentPref: user.measurements?.paymentPref || 'pix',
  };

  return (
    <>
      <MobileContextBar titulo="Dados da conta" subtitulo="Endereço, telefone e medidas" voltarHref="/conta" />
      <main className="erk-sec erk-entra" data-screen-label="Dados da conta">
        <div className="erk-wrap" style={{ maxWidth: 720 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.12 }}>Dados da conta</h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-2)', margin: '12px 0 0' }}>
            Guardados para a próxima compra sair em dois toques. Alguma coisa mudou? Toque em editar.
          </p>
          <DadosView dados={dados} />
        </div>
      </main>
    </>
  );
}
