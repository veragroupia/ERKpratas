/* Anel de prata que sai do botão e voa até o ícone da sacola.
   Feito com um elemento solto no <body> e a Web Animations API em vez de CSS:
   o trajeto depende de duas posições que só existem em tempo de execução, e o
   elemento precisa ficar fora de qualquer pai com overflow: hidden — o card
   tem, então um filho animado ali seria cortado no meio do caminho. */

const DESTINO = '[data-alvo-sacola], .alvo-sacola';

export function voarAteSacola(origem: HTMLElement) {
  if (typeof window === 'undefined') return;
  // quem pediu para reduzir animação não recebe nada voando na tela
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const alvo = document.querySelector<HTMLElement>(DESTINO);
  if (!alvo || typeof origem.animate !== 'function') return;

  const de = origem.getBoundingClientRect();
  const para = alvo.getBoundingClientRect();
  const d = 26;

  const anel = document.createElement('span');
  anel.setAttribute('aria-hidden', 'true');
  anel.style.cssText = [
    'position:fixed',
    `left:${de.left + de.width / 2 - d / 2}px`,
    `top:${de.top + de.height / 2 - d / 2}px`,
    `width:${d}px`,
    `height:${d}px`,
    'border-radius:50%',
    'border:2.5px solid var(--tinta)',
    'box-shadow:0 0 0 1px rgba(13,15,18,.6), 0 6px 18px rgba(0,0,0,.45)',
    'pointer-events:none',
    'z-index:200',
  ].join(';');
  document.body.appendChild(anel);

  const dx = para.left + para.width / 2 - (de.left + de.width / 2);
  const dy = para.top + para.height / 2 - (de.top + de.height / 2);

  const voo = anel.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      // sobe um pouco antes de cair na sacola, para o trajeto ler como arco
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 46}px) scale(.8)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(.25)`, opacity: 0 },
    ],
    { duration: 620, easing: 'cubic-bezier(.28,0,.12,1)' },
  );

  voo.onfinish = () => {
    anel.remove();
    // a sacola dá um pulinho ao receber, fechando o gesto
    alvo.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }],
      { duration: 320, easing: 'cubic-bezier(.28,0,.12,1)' },
    );
  };
  voo.oncancel = () => anel.remove();
}
