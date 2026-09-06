'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Selo } from '../ui/Tag';
import { Icon } from '../ui/Icon';
import { Viewer3D } from '../viewer3d/Viewer3D';
import { FullscreenViewerSheet } from '../viewer3d/FullscreenViewerSheet';
import { MobileContextBar } from '../nav/MobileContextBar';
import { BottomActionBar } from '../nav/BottomActionBar';
import { useLargo } from '@/lib/useLargo';
import { GARANTIAS } from '@/lib/constants';
import { GuaranteeStrip } from '../commerce/GuaranteeStrip';
import type { PecaSpec } from '../viewer3d/jewelryViewer';
import { ESTADO_INICIAL, buildSteps, montagem, resumoPeca, rotuloVal, precoFmt, type BuilderState, type TipoPeca } from './builderLogic';

function opcaoEstilo(ativo: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
    textAlign: 'left',
    padding: '15px 18px',
    borderRadius: 14,
    border: '1px solid ' + (ativo ? 'var(--border-2)' : 'var(--border-1)'),
    background: ativo ? 'var(--surface-forte)' : 'var(--surface-card)',
  };
}

function marcaEstilo(ativo: boolean): React.CSSProperties {
  return {
    width: 18,
    height: 18,
    borderRadius: '50%',
    flex: 'none',
    border: '1px solid ' + (ativo ? 'var(--text-1)' : 'var(--border-2)'),
    background: ativo ? 'var(--text-1)' : 'transparent',
    boxShadow: ativo ? 'inset 0 0 0 3px var(--surface-forte)' : 'none',
  };
}

export function BuilderFlow() {
  const largo = useLargo();
  const router = useRouter();
  const [b, setB] = useState<BuilderState>(ESTADO_INICIAL);
  const [etapa, setEtapa] = useState(0);
  const [feitos, setFeitos] = useState(0);
  const [sheet, setSheet] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const defs = useMemo(() => buildSteps(b), [b]);
  const idx = Math.max(0, Math.min(etapa, defs.length - 1, feitos));
  const def = defs[idx];
  const mt = useMemo(() => montagem(b), [b]);
  const resumo = useMemo(() => resumoPeca(b), [b]);
  const rotulos = useMemo(() => rotuloVal(b), [b]);
  const { valor: precoValor, parcela: precoParcela } = precoFmt(mt.preco);

  const spec: PecaSpec = {
    tipo: b.tipo === 'pingente' ? 'pingente' : b.tipo,
    elo: b.elo,
    esp: Number(b.esp),
    medida: Number(b.medida),
    acabamento: b.acabamento,
    pingente: b.tipo === 'pingente' ? b.pingente || 'placa' : b.pingente || undefined,
    sinete: b.tipo === 'anel' && !!String(b.gravacao).trim(),
    gravacao: String(b.gravacao).trim() || undefined,
  };

  function irPasso(n: number) {
    setEtapa(Math.max(0, Math.min(n, feitos)));
    window.scrollTo({ top: 0 });
  }

  function set<K extends keyof BuilderState>(k: K, v: BuilderState[K]) {
    setB((s) => ({ ...s, [k]: v }));
  }

  function setTipo(tipo: TipoPeca) {
    setB((s) => ({
      ...s,
      tipo,
      medida: tipo === 'corrente' ? 60 : tipo === 'pulseira' ? 21 : tipo === 'anel' ? 18 : 0,
      esp: 4,
      pingente: tipo === 'pingente' ? 'placa' : '',
    }));
    setFeitos((f) => (b.tipo === tipo ? f : 0));
  }

  function confirmar() {
    setEtapa(idx + 1);
    setFeitos((f) => Math.max(f, idx + 1));
    window.scrollTo({ top: 0 });
  }

  async function adicionarSacola() {
    setEnviando(true);
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customName: resumo,
        customSpec: 'Montada sob encomenda · ' + b.acabamento,
        customPrice: mt.preco,
        customSpecJson: JSON.stringify(spec),
        quantity: 1,
      }),
    });
    router.push('/sacola');
    router.refresh();
  }

  const rotuloAcao =
    def.k === 'resumo'
      ? 'Adicionar à sacola'
      : def.k === 'gravacao'
        ? String(b.gravacao).trim()
          ? 'Confirmar a gravação'
          : 'Seguir sem gravação'
        : idx < defs.length - 1
          ? 'Confirmar e ir para ' + defs[idx + 1].nome.toLowerCase()
          : 'Confirmar';
  const acaoPasso = def.k === 'resumo' ? adicionarSacola : confirmar;

  return (
    <>
      <MobileContextBar
        titulo="Montar a sua peça"
        subtitulo={`Etapa ${idx + 1} de ${defs.length} · ${def.nome}`}
        voltarHref={idx > 0 ? undefined : '/'}
        onVoltar={idx > 0 ? () => irPasso(idx - 1) : undefined}
      />
      <main className="erk-sec erk-entra" data-screen-label="Montar a sua peça">
        <div className="erk-wrap">
          <div style={{ maxWidth: '60ch' }}>
            <Selo>Sob encomenda</Selo>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px,4.3vw,53px)', lineHeight: 1.08, marginTop: 16 }}>Monte a sua peça</h1>
            <p style={{ color: 'var(--text-2)', fontSize: 16, marginTop: 14 }}>
              Uma escolha por etapa. O modelo 3D acompanha cada mudança e o preço sai do peso da prata — do mesmo jeito que a gente calcula na bancada. Pode voltar e trocar quando quiser.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(22px,3vw,44px)', alignItems: 'flex-start', marginTop: 'clamp(28px,3.4vw,44px)' }}>
            <div style={{ flex: '1 1 430px', minWidth: 0, ...(largo ? { position: 'sticky', top: 96 } : {}) }}>
              <div className="chrome-desktop" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-1)', background: 'var(--gradiente-hero)', height: 'clamp(320px,46vh,520px)' }}>
                <Viewer3D spec={spec} legenda={resumo} />
                <span style={{ position: 'absolute', left: 14, bottom: 14, fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', background: 'rgba(13,15,18,.72)', padding: '6px 12px', borderRadius: 980 }}>
                  {resumo}
                </span>
              </div>
              {/* No montador não entra foto de catálogo: a peça sob encomenda é
                  sempre o modelo 3D, montado com as escolhas do cliente. */}
              <div className="chrome-mobile" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-1)', background: 'var(--gradiente-hero)', aspectRatio: '4/3' }}>
                <Viewer3D spec={spec} legenda={resumo} />
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: 12,
                    maxWidth: 'calc(100% - 24px)',
                    fontSize: 11.5,
                    color: 'var(--text-1)',
                    background: 'rgba(13,15,18,.78)',
                    padding: '7px 12px',
                    borderRadius: 980,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {resumo}
                </span>
                <button
                  type="button"
                  onClick={() => setSheet(true)}
                  style={{ position: 'absolute', left: '50%', bottom: 14, transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: 9, height: 42, padding: '0 20px', borderRadius: 980, background: 'rgba(13,15,18,.82)', border: '1px solid rgba(242,244,247,.28)', color: '#F2F4F7', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', backdropFilter: 'blur(8px)' }}
                >
                  <Icon name="oficina" size={17} />
                  Ver em 3D
                </button>
              </div>
            </div>

            <div style={{ flex: '1 1 380px', minWidth: 0, display: 'grid', gap: 22 }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {defs.map((d, i) => (
                    <button
                      key={d.k}
                      type="button"
                      onClick={() => (i <= feitos ? irPasso(i) : undefined)}
                      aria-label={`Etapa ${i + 1}: ${d.nome}`}
                      style={{
                        flex: '1 1 0',
                        height: 3,
                        borderRadius: 980,
                        padding: 0,
                        transition: 'background 180ms cubic-bezier(.28,0,.12,1)',
                        cursor: i <= feitos ? 'pointer' : 'default',
                        background: i < idx ? 'var(--text-2)' : i === idx ? 'var(--text-1)' : 'var(--border-1)',
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{def.nome}</span>
                  {idx > 0 ? (
                    <button type="button" onClick={() => irPasso(idx - 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--text-3)' }}>
                      <Icon name="voltar" size={14} />
                      Voltar
                    </button>
                  ) : null}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                  Etapa {idx + 1} de {defs.length}
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(21px,2.5vw,30px)', lineHeight: 1.16, marginTop: 9 }}>{def.titulo}</h2>
                <p style={{ fontSize: 14.5, color: 'var(--text-2)', marginTop: 10, maxWidth: '46ch' }}>{def.apoio}</p>
              </div>

              {def.opcoes ? (
                <div style={{ display: 'grid', gap: 9 }}>
                  {def.opcoes.map(([id, nome, detalhe]) => {
                    const ativo = String(id) === String(def.valor);
                    const onClick = () => {
                      if (def.k === 'tipo') setTipo(id as TipoPeca);
                      else if (def.k === 'elo') set('elo', String(id));
                      else if (def.k === 'modelo') set('pingente', String(id));
                      else if (def.k === 'esp') set('esp', Number(id));
                      else if (def.k === 'medida') set('medida', Number(id));
                      else if (def.k === 'acabamento') set('acabamento', id as BuilderState['acabamento']);
                      else if (def.k === 'pingente') set('pingente', String(id));
                    };
                    return (
                      <button key={String(id)} type="button" onClick={onClick} style={opcaoEstilo(ativo)}>
                        <span style={{ display: 'grid', gap: 3, textAlign: 'left', minWidth: 0 }}>
                          <b style={{ fontSize: 15, fontWeight: 600 }}>{nome}</b>
                          <em style={{ fontStyle: 'normal', fontSize: 12.5, color: 'var(--text-2)' }}>{detalhe}</em>
                        </span>
                        <span style={marcaEstilo(ativo)} />
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {def.k === 'gravacao' ? (
                <div>
                  <input
                    value={b.gravacao}
                    onChange={(e) => set('gravacao', e.target.value.slice(0, 14))}
                    maxLength={14}
                    placeholder="Nome, inicial ou data"
                    style={{ width: '100%', height: 50, borderRadius: 980, background: 'var(--surface-suave)', border: '1px solid var(--border-1)', padding: '0 20px', fontSize: 16, outline: 'none', color: 'var(--text-1)' }}
                  />
                  <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginTop: 11 }}>
                    {b.tipo === 'anel'
                      ? 'Com gravação a gente monta o anel com a placa do sinete.'
                      : b.pingente === 'placa'
                        ? 'O nome sai gravado na placa, feito na bancada.'
                        : 'Gravação a laser no fecho ou na argola. Até 14 caracteres.'}
                  </p>
                </div>
              ) : null}

              {def.k === 'resumo' ? (
                <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 14, padding: 'clamp(18px,2.2vw,26px)' }}>
                  <dl style={{ display: 'grid', gap: 0, margin: 0 }}>
                    {defs
                      .filter((d) => d.opcoes || d.k === 'gravacao')
                      .map((d) => (
                        <div key={d.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 18, padding: '11px 0', borderBottom: '1px solid var(--border-1)' }}>
                          <dt style={{ fontSize: 13, color: 'var(--text-3)' }}>{d.nome}</dt>
                          <dd style={{ fontSize: 14, margin: 0, textAlign: 'right' }}>{rotulos[d.k]}</dd>
                        </div>
                      ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, padding: '11px 0', borderBottom: '1px solid var(--border-1)' }}>
                      <dt style={{ fontSize: 13, color: 'var(--text-3)' }}>Peso estimado</dt>
                      <dd style={{ fontSize: 14, margin: 0, textAlign: 'right' }}>{mt.peso} g</dd>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, padding: '11px 0' }}>
                      <dt style={{ fontSize: 13, color: 'var(--text-3)' }}>Material</dt>
                      <dd style={{ fontSize: 14, margin: 0, textAlign: 'right' }}>Prata 925 com punção</dd>
                    </div>
                  </dl>
                  <div className="cart-total" style={{ border: 0, marginTop: 18, paddingTop: 0 }}>
                    <span style={{ fontSize: 13.5, color: 'var(--text-2)' }}>Total</span>
                    <div className="cart-total-val">
                      <p className="erk-preco erk-preco--g">
                        <b>{precoValor}</b>
                      </p>
                      <p className="erk-parc">{precoParcela}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginTop: 16 }}>
                    Pronto em 5 dias úteis na bancada. A medida é conferida com você no WhatsApp antes de a peça entrar na produção.
                  </p>
                </div>
              ) : null}

              <div className="chrome-desktop" style={{ display: 'flex', gap: 12, alignItems: 'center', borderTop: '1px solid var(--border-1)', paddingTop: 20 }}>
                <button type="button" className="erk-btn erk-btn--p" onClick={acaoPasso} disabled={enviando} style={{ flex: '1 1 auto', justifyContent: 'center', gap: 10 }}>
                  {rotuloAcao}
                  <Icon name="seta" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="erk-sec erk-sec--suave">
        <div className="erk-wrap">
          <div className="erk-cab">
            <div>
              <h2>Como a peça é feita</h2>
              <p>Três etapas, todas em Salto</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: 'var(--gap-grade)' }}>
            {[
              { n: '01', t: 'Você monta', d: 'Elo, espessura, medida, acabamento e gravação. O 3D mostra a peça na escala real.' },
              { n: '02', t: 'A gente confirma', d: 'Uma mensagem para fechar a medida e o peso. Nada vai para a bancada sem o seu ok.' },
              { n: '03', t: 'Sai da bancada', d: 'Punção gravado, polimento final e embalagem própria. Motoboy na região ou envio para todo o Brasil.' },
            ].map((c) => (
              <div key={c.n} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-1)', borderRadius: 14, padding: 'clamp(20px,2.4vw,30px)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-3)' }}>{c.n}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, marginTop: 12 }}>{c.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 8 }}>{c.d}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(24px,3vw,40px)' }}>
            <GuaranteeStrip itens={GARANTIAS} />
          </div>
        </div>
      </section>

      <BottomActionBar
        valor={def.k === 'resumo' ? precoValor : `Etapa ${idx + 1} de ${defs.length}`}
        sub={def.k === 'resumo' ? resumo : idx < defs.length - 1 ? 'Depois: ' + defs[idx + 1].nome.toLowerCase() : ''}
        botao={def.k === 'resumo' ? 'Adicionar' : 'Confirmar'}
        onClick={acaoPasso}
        disabled={enviando}
      />

      <FullscreenViewerSheet
        aberto={sheet}
        onFechar={() => setSheet(false)}
        titulo={resumo}
        subtitulo="Sua peça sob encomenda"
        valor={precoValor}
        parcela={precoParcela}
        botao="Adicionar"
        onBotao={() => {
          setSheet(false);
          adicionarSacola();
        }}
        spec={spec}
      />
    </>
  );
}
