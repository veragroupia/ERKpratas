'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Estrelas, EstrelasInput } from '../ui/Estrelas';
import type { Depoimento, PermissaoAvaliar, ResumoAvaliacoes } from '@/lib/reviews';

function dataCurta(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function Avaliacoes({
  productId,
  resumo,
  depoimentos,
  permissao,
}: {
  productId: string;
  resumo: ResumoAvaliacoes;
  depoimentos: Depoimento[];
  permissao: PermissaoAvaliar;
}) {
  const router = useRouter();
  const podeAvaliar = permissao.pode;
  const [aberto, setAberto] = useState(false);
  const [nota, setNota] = useState(podeAvaliar && permissao.jaAvaliou ? permissao.notaAtual! : 0);
  const [texto, setTexto] = useState(podeAvaliar && permissao.jaAvaliou ? permissao.comentarioAtual || '' : '');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [verTodos, setVerTodos] = useState(false);

  const visiveis = verTodos ? depoimentos : depoimentos.slice(0, 4);

  async function enviar() {
    if (!nota) {
      setErro('Escolha de 1 a 5 estrelas.');
      return;
    }
    setErro('');
    setEnviando(true);
    const r = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, rating: nota, comment: texto }),
    });
    setEnviando(false);
    if (!r.ok) {
      const j = await r.json().catch(() => null);
      setErro(j?.error || 'Não deu para enviar agora. Tente de novo.');
      return;
    }
    setAberto(false);
    router.refresh();
  }

  async function apagar() {
    setEnviando(true);
    await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`, { method: 'DELETE' });
    setEnviando(false);
    setNota(0);
    setTexto('');
    setAberto(false);
    router.refresh();
  }

  return (
    <section className="erk-sec" id="avaliacoes">
      <div className="erk-wrap">
        <div className="erk-cab">
          <div>
            <h2>O que dizem quem comprou</h2>
            <p>
              {resumo.total
                ? 'Só aparece aqui quem levou a peça — a compra é conferida antes.'
                : 'Ainda não há avaliação desta peça.'}
            </p>
          </div>
        </div>

        {resumo.total > 0 ? (
          <div className="erk-aval-resumo">
            <div className="erk-aval-media">
              <strong>{resumo.media.toFixed(1).replace('.', ',')}</strong>
              <Estrelas nota={resumo.media} tamanho={18} />
              <small>
                {resumo.total} {resumo.total === 1 ? 'avaliação' : 'avaliações'}
              </small>
            </div>

            <ul className="erk-aval-barras">
              {([5, 4, 3, 2, 1] as const).map((n) => {
                const qtd = resumo.distribuicao[n];
                const pct = resumo.total ? (qtd / resumo.total) * 100 : 0;
                return (
                  <li key={n}>
                    <span className="erk-aval-barras__n">{n}</span>
                    <span className="erk-aval-barras__trilho">
                      <span className="erk-aval-barras__preenche" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="erk-aval-barras__q">{qtd}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {/* convite a avaliar — o texto muda conforme quem está olhando */}
        <div className="erk-aval-convite">
          {!podeAvaliar && permissao.motivo === 'anonimo' ? (
            <p>
              Comprou esta peça?{' '}
              <Link href="/conta/entrar" className="erk-link">
                Entre na sua conta
              </Link>{' '}
              para deixar sua avaliação.
            </p>
          ) : null}

          {!podeAvaliar && permissao.motivo === 'nao-comprou' ? (
            <p>Quando você comprar esta peça e o pedido for confirmado, o espaço de avaliação abre aqui.</p>
          ) : null}

          {podeAvaliar && !aberto ? (
            <button type="button" className="erk-btn erk-btn--s" onClick={() => setAberto(true)}>
              {permissao.jaAvaliou ? 'Editar minha avaliação' : 'Avaliar esta peça'}
            </button>
          ) : null}
        </div>

        {podeAvaliar && aberto ? (
          <div className="erk-aval-form">
            <EstrelasInput valor={nota} onChange={setNota} />

            <label className="erk-campo">
              <span>Seu comentário <i>(opcional)</i></span>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value.slice(0, 1200))}
                rows={4}
                placeholder="Como chegou, como ficou no uso, o que você achou do acabamento…"
              />
              <small>{texto.length}/1200</small>
            </label>

            {erro ? <p className="erk-aval-erro">{erro}</p> : null}

            <div className="erk-aval-form__acoes">
              <button type="button" className="erk-btn erk-btn--p" onClick={enviar} disabled={enviando}>
                {enviando ? 'Enviando…' : permissao.jaAvaliou ? 'Salvar' : 'Publicar avaliação'}
              </button>
              <button type="button" className="erk-btn erk-btn--s" onClick={() => setAberto(false)} disabled={enviando}>
                Cancelar
              </button>
              {permissao.jaAvaliou ? (
                <button type="button" className="erk-aval-apagar" onClick={apagar} disabled={enviando}>
                  Apagar
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {depoimentos.length ? (
          <>
            <ul className="erk-aval-lista">
              {visiveis.map((d) => (
                <li key={d.id} className="erk-aval-item">
                  <div className="erk-aval-item__topo">
                    <Estrelas nota={d.nota} tamanho={14} />
                    <b>{d.autor}</b>
                    <span className="erk-aval-verificado">Compra verificada</span>
                    {d.meu ? <span className="erk-aval-meu">sua avaliação</span> : null}
                    <time dateTime={d.data}>{dataCurta(d.data)}</time>
                  </div>
                  {d.comentario ? <p>{d.comentario}</p> : null}
                </li>
              ))}
            </ul>

            {depoimentos.length > 4 && !verTodos ? (
              <button type="button" className="erk-btn erk-btn--s erk-aval-mais" onClick={() => setVerTodos(true)}>
                Ver todas as {depoimentos.length} avaliações
              </button>
            ) : null}
          </>
        ) : (
          <p className="erk-aval-vazio">
            Esta peça ainda não recebeu avaliação. Quem comprar e receber pode ser o primeiro a contar como foi.
          </p>
        )}
      </div>
    </section>
  );
}
