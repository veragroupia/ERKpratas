/* @ds-bundle: {"format":4,"namespace":"ERKPratasDesignSystem_e111e2","components":[{"name":"CTABanner","sourcePath":"components/commerce/CTABanner.jsx"},{"name":"CategoryTile","sourcePath":"components/commerce/CategoryTile.jsx"},{"name":"CategoryTiles","sourcePath":"components/commerce/CategoryTile.jsx"},{"name":"GuaranteeStrip","sourcePath":"components/commerce/GuaranteeStrip.jsx"},{"name":"Hero","sourcePath":"components/commerce/Hero.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"ProductGrid","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"ProductRow","sourcePath":"components/commerce/ProductRow.jsx"},{"name":"ProductRows","sourcePath":"components/commerce/ProductRow.jsx"},{"name":"PromoBanner","sourcePath":"components/commerce/PromoBanner.jsx"},{"name":"PromoPair","sourcePath":"components/commerce/PromoBanner.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"ERK_ICONS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Price","sourcePath":"components/core/Price.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Selo","sourcePath":"components/core/Tag.jsx"},{"name":"BottomSheet","sourcePath":"components/feedback/BottomSheet.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"SearchBar","sourcePath":"components/forms/SearchBar.jsx"},{"name":"BottomBar","sourcePath":"components/navigation/BottomBar.jsx"},{"name":"CategoryNav","sourcePath":"components/navigation/CategoryNav.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"SectionHeader","sourcePath":"components/navigation/SectionHeader.jsx"}],"sourceHashes":{"components/commerce/CTABanner.jsx":"fb79afc1a2c5","components/commerce/CategoryTile.jsx":"2bbd9b602fef","components/commerce/GuaranteeStrip.jsx":"8d8a790280da","components/commerce/Hero.jsx":"3d6843216e99","components/commerce/ProductCard.jsx":"a655aa47584c","components/commerce/ProductRow.jsx":"3a75344bbbc6","components/commerce/PromoBanner.jsx":"4e7cc193d270","components/core/Button.jsx":"847b1a170540","components/core/Chip.jsx":"60cf96e14e60","components/core/Icon.jsx":"4a0ed61a92f9","components/core/IconButton.jsx":"cd08dbbf3d81","components/core/Logo.jsx":"358616e8da23","components/core/Price.jsx":"a513830c8619","components/core/Tag.jsx":"913dd6c90919","components/feedback/BottomSheet.jsx":"1b2f346ab05d","components/feedback/EmptyState.jsx":"28ce98d3676f","components/forms/SearchBar.jsx":"bc3886d42bd9","components/navigation/BottomBar.jsx":"2bbd6517dff1","components/navigation/CategoryNav.jsx":"807d4dc3de0d","components/navigation/Footer.jsx":"421803371f88","components/navigation/Header.jsx":"004a45162a5f","components/navigation/SectionHeader.jsx":"ae492a7ee597","ui_kits/loja/Catalogo.jsx":"1853ff5c8750","ui_kits/loja/Checkout.jsx":"9b749edf45db","ui_kits/loja/Home.jsx":"01c5a12bfc00","ui_kits/loja/Loja.jsx":"f05616d7276b","ui_kits/loja/Produto.jsx":"5f48e6362fa1","ui_kits/loja/Sacola.jsx":"032feeb46779","ui_kits/loja/dados.js":"78dadf9f69c5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ERKPratasDesignSystem_e111e2 = window.ERKPratasDesignSystem_e111e2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/ProductRow.jsx
try { (() => {
/** Linha horizontal de produto: resultado de busca, favoritos, sacola. */
function ProductRow({
  nome,
  spec,
  foto,
  valor,
  href = '#',
  direita,
  onClick,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: ['erk-linha', className].filter(Boolean).join(' '),
    href: href,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("img", {
    src: foto,
    alt: "",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, nome), spec ? /*#__PURE__*/React.createElement("span", null, spec) : null), direita || (valor ? /*#__PURE__*/React.createElement("i", null, valor) : null));
}

/** Pilha de linhas com 10px de respiro. */
function ProductRows({
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-linhas', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { ProductRow, ProductRows });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/** Filtro em pílula. Ativo = tinta cheia. */
function Chip({
  children,
  ativo,
  onClick,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-pressed": !!ativo,
    className: ['erk-chip', ativo ? 'is-on' : '', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/* Conjunto de ícones do mockup de origem: traço 1.5, viewBox 24, pontas e
   junções arredondadas, sem preenchimento. Os paths são os mesmos do HTML
   enviado — nada foi redesenhado. */
const ERK_ICONS = {
  busca: ['circle:11,11,7', 'M20 20l-4.3-4.3'],
  conta: ['circle:12,8,3.6', 'M4.5 20a7.5 7.5 0 0 1 15 0'],
  favorito: ['M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6C20.5 15 12 20.5 12 20.5Z'],
  sacola: ['M5.5 8h13l-1 12h-11z', 'M9 8V6.5a3 3 0 0 1 6 0V8'],
  inicio: ['M4 10.5L12 4l8 6.5V20H4z', 'M9.5 20v-5.5h5V20'],
  seta: ['M9 6l6 6-6 6'],
  mais: ['M12 5v14M5 12h14'],
  menos: ['M5 12h14'],
  filtro: ['M4 6h16M7 12h10M10 18h4'],
  grade: ['rect:4,4,6.5,6.5,1.4', 'rect:13.5,4,6.5,6.5,1.4', 'rect:4,13.5,6.5,6.5,1.4', 'rect:13.5,13.5,6.5,6.5,1.4'],
  correntes: ['circle:7.5,7.5,3.1', 'circle:12,12,3.1', 'circle:16.5,16.5,3.1'],
  pulseiras: ['ellipse:12,12.5,7.2,5.2', 'rect:10.2,5.6,3.6,2.6,0.8'],
  aneis: ['circle:12,14,5.6', 'M9.3 7.6L12 4.2l2.7 3.4'],
  pingentes: ['M3.5 7.5h17', 'M12 7.5v3.2', 'circle:12,14.6,3.7'],
  brincos: ['M8.8 6.2a3.2 3.2 0 0 1 6.4 0', 'circle:12,14.6,4.6'],
  conjuntos: ['circle:9,9.8,4.4', 'circle:15.3,14.6,4.4'],
  puncao: ['circle:12,9.5,5.5', 'M9 14.5L8 21l4-2 4 2-1-6.5'],
  garantia: ['M12 3l7 3v5.5c0 4.3-2.9 7.6-7 8.5-4.1-.9-7-4.2-7-8.5V6z', 'M9 12l2 2 4-4'],
  entrega: ['circle:6,17,3', 'circle:18,17,3', 'M9 17h6l-2-8h3M6 9h4'],
  oficina: ['M14 4l6 6-3 3-6-6z', 'M11 7L4 14l3 3 7-7'],
  check: ['circle:12,12,9', 'M8.5 12.3l2.4 2.4 4.6-4.9']
};
function shape(d, i) {
  if (typeof d === 'string' && d.startsWith('circle:')) {
    const [cx, cy, r] = d.slice(7).split(',');
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: cx,
      cy: cy,
      r: r
    });
  }
  if (typeof d === 'string' && d.startsWith('ellipse:')) {
    const [cx, cy, rx, ry] = d.slice(8).split(',');
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: cx,
      cy: cy,
      rx: rx,
      ry: ry
    });
  }
  if (typeof d === 'string' && d.startsWith('rect:')) {
    const [x, y, w, h, r] = d.slice(5).split(',');
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: x,
      y: y,
      width: w,
      height: h,
      rx: r
    });
  }
  return /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  });
}
function Icon({
  name,
  size,
  style,
  className,
  title
}) {
  const parts = ERK_ICONS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined,
    className: className,
    style: size ? {
      width: size,
      height: size,
      ...style
    } : style
  }, title ? /*#__PURE__*/React.createElement("title", null, title) : null, parts.map(shape));
}
Object.assign(__ds_scope, { ERK_ICONS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CategoryTile.jsx
try { (() => {
/** Tile redondo de categoria. */
function CategoryTile({
  nome,
  contagem,
  foto,
  href = '#',
  onClick,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: ['erk-tile', className].filter(Boolean).join(' '),
    href: href,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "erk-tile__fig"
  }, /*#__PURE__*/React.createElement("img", {
    src: foto,
    alt: nome,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "erk-tile__t"
  }, nome), contagem ? /*#__PURE__*/React.createElement("span", {
    className: "erk-tile__n"
  }, contagem) : null, /*#__PURE__*/React.createElement("span", {
    className: "erk-tile__i"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "seta"
  })));
}

/** Trilho/grade de tiles: 6 → 3 colunas, e trilho horizontal abaixo de 720px. */
function CategoryTiles({
  children,
  cols = 6,
  colsMd = 3,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-tiles', className].filter(Boolean).join(' '),
    style: {
      '--cols': cols,
      '--cols-md': colsMd,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { CategoryTile, CategoryTiles });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CategoryTile.jsx", error: String((e && e.message) || e) }); }

// components/commerce/GuaranteeStrip.jsx
try { (() => {
/** Faixa de garantias: ícone em círculo, título e uma linha de apoio. */
function GuaranteeStrip({
  itens = [],
  cols = 4,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-garantias', className].filter(Boolean).join(' '),
    style: {
      '--cols': cols
    }
  }, itens.map(i => /*#__PURE__*/React.createElement("div", {
    className: "erk-gar",
    key: i.titulo
  }, /*#__PURE__*/React.createElement("span", {
    className: "erk-gar__i"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: i.icone
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, i.titulo), i.texto ? /*#__PURE__*/React.createElement("p", null, i.texto) : null))));
}
Object.assign(__ds_scope, { GuaranteeStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/GuaranteeStrip.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Botão da marca. Três tons: primário (tinta cheia), secundário (contorno)
 * e acento (vermelho, só para oferta/urgência). Renderiza <a> quando recebe href.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icone,
  iconeAntes,
  full,
  disabled,
  onClick,
  target,
  rel,
  type = 'button',
  className = '',
  style
}) {
  const tom = {
    primary: 'erk-btn--p',
    secondary: 'erk-btn--s',
    accent: 'erk-btn--a'
  }[variant] || 'erk-btn--p';
  const cls = ['erk-btn', tom, size === 'sm' ? 'erk-btn--sm' : '', full ? 'erk-btn--full' : '', className].filter(Boolean).join(' ');
  const conteudo = /*#__PURE__*/React.createElement(React.Fragment, null, iconeAntes ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconeAntes
  }) : null, children, icone ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icone
  }) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", {
      className: cls,
      href: href,
      target: target,
      rel: rel,
      style: style,
      onClick: onClick
    }, conteudo);
  }
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: style
  }, conteudo);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CTABanner.jsx
try { (() => {
/** Faixa escura de conversa direta (WhatsApp). */
function CTABanner({
  titulo,
  texto,
  acao,
  acaoHref = '#',
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-cta', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, titulo), texto ? /*#__PURE__*/React.createElement("p", null, texto) : null), acao ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    href: acaoHref
  }, acao) : null);
}
Object.assign(__ds_scope, { CTABanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CTABanner.jsx", error: String((e && e.message) || e) }); }

// components/commerce/PromoBanner.jsx
try { (() => {
/** Banner com foto ao fundo, véu escuro e texto claro. */
function PromoBanner({
  olho,
  titulo,
  texto,
  foto,
  acao,
  acaoHref = '#',
  acento,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-promo', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("img", {
    src: foto,
    alt: titulo,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-promo__in"
  }, olho ? /*#__PURE__*/React.createElement("span", null, olho) : null, /*#__PURE__*/React.createElement("h3", null, titulo), texto ? /*#__PURE__*/React.createElement("p", null, texto) : null, acao ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: acento ? 'accent' : 'primary',
    href: acaoHref
  }, acao) : null));
}

/** Par de banners 1.35fr / 1fr que empilha no celular. */
function PromoPair({
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-promos', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { PromoBanner, PromoPair });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/PromoBanner.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
/** Ícone empilhado com rótulo, usado nas ações do topo. Mostra contador opcional. */
function IconButton({
  icone,
  rotulo,
  contador,
  href,
  onClick,
  ariaLabel,
  className = ''
}) {
  const conteudo = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icone
  }), contador ? /*#__PURE__*/React.createElement("b", null, contador) : null, rotulo ? /*#__PURE__*/React.createElement("span", null, rotulo) : null);
  const cls = ['erk-icobtn', className].filter(Boolean).join(' ');
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: cls,
    href: href,
    "aria-label": ariaLabel || rotulo
  }, conteudo);
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    type: "button",
    onClick: onClick,
    "aria-label": ariaLabel || rotulo
  }, conteudo);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
/**
 * Logotipo: não existe marca gráfica fornecida, então a assinatura é o
 * nome em Cinzel com a linha de apoio em caixa alta espaçada.
 */
function Logo({
  href = '#',
  linha = 'PRATA 925 · SALTO SP',
  compacto,
  className = ''
}) {
  const cls = ['erk-logo', compacto ? 'erk-logo--sm' : '', className].filter(Boolean).join(' ');
  const conteudo = /*#__PURE__*/React.createElement(React.Fragment, null, "ERK Pratas", linha ? /*#__PURE__*/React.createElement("small", null, linha) : null);
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: cls,
    href: href
  }, conteudo);
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, conteudo);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Price.jsx
try { (() => {
/**
 * Preço da marca. O valor que se paga vem PRIMEIRO, à esquerda, em negrito;
 * o preço antigo vem depois, riscado e em cinza. A parcela aparece abaixo, em verde.
 */
function Price({
  valor,
  antigo,
  parcela,
  grande,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("p", {
    className: ['erk-preco', grande ? 'erk-preco--g' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("b", null, valor), antigo ? /*#__PURE__*/React.createElement("s", null, antigo) : null), parcela ? /*#__PURE__*/React.createElement("p", {
    className: "erk-parc"
  }, parcela) : null);
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Price.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/** Etiqueta sobre a foto do produto: caixa alta, 10.5px, raio 5px. */
function Tag({
  children,
  oferta,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ['erk-tag', oferta ? 'erk-tag--off' : '', className].filter(Boolean).join(' ')
  }, children);
}

/** Selo com bolinha verde, usado no hero. */
function Selo({
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ['erk-selo', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { Tag, Selo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/commerce/Hero.jsx
try { (() => {
/**
 * Bloco de abertura da home: degradê de prata, texto à esquerda, foto à
 * direita com a etiqueta de preço apoiada no canto.
 */
function Hero({
  selo,
  titulo,
  destaque,
  sufixo,
  sub,
  foto,
  fotoAlt,
  precoRotulo,
  preco,
  precoAntigo,
  provas = [],
  acao,
  acaoHref = '#',
  acaoSec,
  acaoSecHref = '#',
  pontos,
  pontoAtivo = 0,
  className = ''
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: ['erk-hero', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-hero__txt"
  }, selo ? /*#__PURE__*/React.createElement(__ds_scope.Selo, null, selo) : null, /*#__PURE__*/React.createElement("h1", null, titulo, destaque ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("em", null, destaque)) : null, sufixo), sub ? /*#__PURE__*/React.createElement("p", {
    className: "erk-hero__sub"
  }, sub) : null, /*#__PURE__*/React.createElement("div", {
    className: "erk-hero__btns"
  }, acao ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    href: acaoHref,
    icone: "seta"
  }, acao) : null, acaoSec ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    href: acaoSecHref
  }, acaoSec) : null), provas.length ? /*#__PURE__*/React.createElement("ul", {
    className: "erk-hero__chips"
  }, provas.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.texto
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: p.icone
  }), " ", p.texto))) : null), /*#__PURE__*/React.createElement("figure", {
    className: "erk-hero__fig"
  }, /*#__PURE__*/React.createElement("img", {
    src: foto,
    alt: fotoAlt || ''
  }), preco ? /*#__PURE__*/React.createElement("figcaption", {
    className: "erk-hero__preco"
  }, precoRotulo ? /*#__PURE__*/React.createElement("span", null, precoRotulo) : null, /*#__PURE__*/React.createElement("b", null, preco), precoAntigo ? /*#__PURE__*/React.createElement("s", {
    style: {
      color: 'var(--text-antigo)',
      fontSize: 13,
      marginLeft: 7,
      fontWeight: 400
    }
  }, precoAntigo) : null) : null)), pontos ? /*#__PURE__*/React.createElement("div", {
    className: "erk-dots"
  }, Array.from({
    length: pontos
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: i === pontoAtivo ? 'is-on' : undefined
  }))) : null);
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Hero.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
/**
 * Card de produto da grade. Foto quadrada no desktop, mais alta no celular;
 * etiquetas no canto superior esquerdo, coração no direito.
 * No celular o botão "Comprar" dá lugar a um botão redondo de mais.
 */
function ProductCard({
  nome,
  categoria,
  spec,
  foto,
  valor,
  antigo,
  parcela,
  tags = [],
  desconto,
  favorito,
  onFavorito,
  href = '#',
  acao = 'Comprar',
  acaoHref,
  onAcao,
  onAdicionar,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: ['erk-card', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("a", {
    className: "erk-card__fig",
    href: href,
    "aria-label": nome
  }, /*#__PURE__*/React.createElement("img", {
    src: foto,
    alt: nome,
    loading: "lazy",
    decoding: "async"
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-card__tags"
  }, desconto ? /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    oferta: true
  }, desconto) : null, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("button", {
    className: ['erk-card__fav', favorito ? 'is-on' : ''].filter(Boolean).join(' '),
    type: "button",
    "aria-label": "Favoritar",
    "aria-pressed": !!favorito,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      if (onFavorito) onFavorito();
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "favorito"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "erk-card__b"
  }, categoria ? /*#__PURE__*/React.createElement("p", {
    className: "erk-card__cat"
  }, categoria) : null, /*#__PURE__*/React.createElement("h3", {
    className: "erk-card__nome"
  }, nome), spec ? /*#__PURE__*/React.createElement("p", {
    className: "erk-card__spec"
  }, spec) : null, /*#__PURE__*/React.createElement(__ds_scope.Price, {
    valor: valor,
    antigo: antigo,
    parcela: parcela
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    full: true,
    href: acaoHref,
    onClick: onAcao
  }, acao), /*#__PURE__*/React.createElement("button", {
    className: "erk-card__mais",
    type: "button",
    "aria-label": 'Adicionar ' + nome,
    onClick: onAdicionar || onAcao
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mais"
  }))));
}

/** Grade responsiva de cards: 4 → 3 → 2 colunas. */
function ProductGrid({
  children,
  cols = 4,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-grade', className].filter(Boolean).join(' '),
    style: {
      '--cols': cols,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ProductCard, ProductGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/BottomSheet.jsx
try { (() => {
/** Painel que sobe pela base; usado para filtro e opções no celular. */
function BottomSheet({
  aberto,
  titulo,
  opcoes = [],
  valor,
  onSelecionar,
  onFechar,
  acao = 'Ver resultados',
  children
}) {
  if (!aberto) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "erk-sheet",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": titulo
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-sheet__fundo",
    onClick: onFechar
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-sheet__cx"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-sheet__alca"
  }), titulo ? /*#__PURE__*/React.createElement("h3", null, titulo) : null, opcoes.length ? /*#__PURE__*/React.createElement("div", {
    className: "erk-sheet__ops"
  }, opcoes.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    type: "button",
    className: o.id === valor ? 'is-on' : undefined,
    onClick: () => onSelecionar && onSelecionar(o.id)
  }, o.nome, o.contagem ? /*#__PURE__*/React.createElement("span", null, o.contagem) : null))) : null, children, /*#__PURE__*/React.createElement("button", {
    className: "erk-btn erk-btn--p erk-btn--full",
    type: "button",
    onClick: onFechar
  }, acao)));
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/** Estado vazio: uma frase que diz o que fazer, centralizada. */
function EmptyState({
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: ['erk-vazio', className].filter(Boolean).join(' ')
  }, children);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchBar.jsx
try { (() => {
/** Campo de busca em pílula com botão embutido. */
function SearchBar({
  placeholder = 'corrente cubana, anel sinete, 60 cm…',
  valor,
  onChange,
  onSubmit,
  botao = 'Buscar',
  semBotao,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['erk-busca', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("span", {
    className: "erk-sr"
  }, "Buscar produto"), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "busca"
  }), /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: placeholder,
    value: valor,
    onChange: onChange ? e => onChange(e.target.value) : undefined,
    onKeyDown: onSubmit ? e => {
      if (e.key === 'Enter') onSubmit(e.currentTarget.value);
    } : undefined
  }), semBotao ? null : /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSubmit ? () => onSubmit(valor) : undefined
  }, botao));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomBar.jsx
try { (() => {
/** Barra fixa do polegar; aparece só abaixo de 860px. */
function BottomBar({
  itens = [],
  ativo = 'inicio',
  onSelecionar,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: ['erk-barra', className].filter(Boolean).join(' '),
    "aria-label": "Navega\xE7\xE3o"
  }, itens.map(i => /*#__PURE__*/React.createElement("a", {
    key: i.id,
    href: i.href || '#',
    className: i.id === ativo ? 'is-on' : undefined,
    onClick: onSelecionar ? e => {
      e.preventDefault();
      onSelecionar(i.id);
    } : undefined
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: i.icone
  }), i.contador ? /*#__PURE__*/React.createElement("b", null, i.contador) : null, /*#__PURE__*/React.createElement("span", null, i.nome))));
}
Object.assign(__ds_scope, { BottomBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CategoryNav.jsx
try { (() => {
/** Trilho de pílulas de categoria abaixo do cabeçalho (só no desktop). */
function CategoryNav({
  itens = [],
  ativo,
  onSelecionar,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: ['erk-catnav', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-catnav__in"
  }, itens.map(i => /*#__PURE__*/React.createElement("a", {
    key: i.id,
    href: i.href || '#',
    className: [i.id === ativo ? 'is-on' : '', i.promo ? 'is-promo' : ''].filter(Boolean).join(' '),
    onClick: onSelecionar ? e => {
      e.preventDefault();
      onSelecionar(i.id);
    } : undefined
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: i.icone
  }), i.nome))));
}
Object.assign(__ds_scope, { CategoryNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CategoryNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/** Rodapé em quatro colunas; vira acordeão abaixo de 720px. */
function Footer({
  sobre,
  pagamentos = [],
  colunas = [],
  fim = [],
  className = ''
}) {
  const [aberta, setAberta] = React.useState(null);
  return /*#__PURE__*/React.createElement("footer", {
    className: ['erk-rod', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-rod__g"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-rod__sobre"
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, null), sobre ? /*#__PURE__*/React.createElement("p", null, sobre) : null, pagamentos.length ? /*#__PURE__*/React.createElement("div", {
    className: "erk-rod__pag"
  }, pagamentos.map(p => /*#__PURE__*/React.createElement("span", {
    key: p
  }, p))) : null), colunas.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.titulo,
    className: ['erk-rod__col', aberta === c.titulo ? 'aberto' : ''].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("h4", {
    role: "button",
    tabIndex: 0,
    onClick: () => setAberta(aberta === c.titulo ? null : c.titulo),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setAberta(aberta === c.titulo ? null : c.titulo);
      }
    }
  }, c.titulo), /*#__PURE__*/React.createElement("ul", null, c.itens.map(i => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    className: "erk-rod__fim"
  }, fim.map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, t)))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
/** Cabeçalho fixo: logo, busca e ações. */
function Header({
  itensSacola = 0,
  busca,
  onBusca,
  onSubmitBusca,
  onAbrirBusca,
  semBusca,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: ['erk-hdr', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-hdr__in"
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, null), semBusca ? /*#__PURE__*/React.createElement("span", null) : /*#__PURE__*/React.createElement(__ds_scope.SearchBar, {
    valor: busca,
    onChange: onBusca,
    onSubmit: onSubmitBusca
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-acoes"
  }, onAbrirBusca ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icone: "busca",
    ariaLabel: "Buscar",
    onClick: onAbrirBusca
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icone: "conta",
    rotulo: "Conta",
    href: "#conta"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icone: "favorito",
    rotulo: "Favoritos",
    href: "#favoritos"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icone: "sacola",
    rotulo: "Sacola",
    href: "#sacola",
    contador: itensSacola || undefined
  }))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
/** Cabeçalho de seção: título em Cinzel, apoio em cinza e link "ver tudo". */
function SectionHeader({
  titulo,
  apoio,
  link,
  linkHref = '#',
  onLink,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ['erk-cab', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, titulo), apoio ? /*#__PURE__*/React.createElement("p", null, apoio) : null), link ? /*#__PURE__*/React.createElement("a", {
    className: "erk-verall",
    href: linkHref,
    onClick: onLink
  }, link, " ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "seta"
  })) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/Catalogo.jsx
try { (() => {
/* Catálogo: filtros à esquerda no desktop, painel que sobe no celular. */
const {
  SectionHeader,
  Chip,
  ProductCard,
  ProductGrid,
  Button,
  Icon,
  EmptyState,
  BottomSheet
} = window.ERKPratasDesignSystem_e111e2;
function Catalogo({
  dados,
  filtro,
  setFiltro,
  ordem,
  setOrdem,
  favoritos,
  onFavoritar,
  onAdicionar,
  onAbrirProduto
}) {
  const {
    produtos,
    categorias
  } = dados;
  const [sheet, setSheet] = React.useState(false);
  const num = v => parseFloat(v.replace('.', '').replace(',', '.'));
  let lista = produtos.filter(p => filtro === 'todas' ? true : filtro === 'ofertas' ? !!p.desc : p.c === filtro);
  if (ordem === 'menor') lista = [...lista].sort((a, b) => num(a.p) - num(b.p));
  if (ordem === 'maior') lista = [...lista].sort((a, b) => num(b.p) - num(a.p));
  const opcoes = [{
    id: 'todas',
    nome: 'Todas',
    contagem: String(produtos.length)
  }, ...categorias.map(c => ({
    id: c.id,
    nome: c.nome,
    contagem: c.n.split(' ')[0]
  })), {
    id: 'ofertas',
    nome: 'Ofertas',
    contagem: String(produtos.filter(p => p.desc).length)
  }];
  return /*#__PURE__*/React.createElement("main", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    titulo: filtro === 'todas' ? 'Catálogo completo' : categorias.find(c => c.id === filtro)?.nome || 'Ofertas',
    apoio: lista.length + ' peças · prata 925 legítima · pronta entrega'
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-cat"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "erk-cat__lado"
  }, /*#__PURE__*/React.createElement("h4", null, "Categoria"), /*#__PURE__*/React.createElement("ul", null, opcoes.map(o => /*#__PURE__*/React.createElement("li", {
    key: o.id
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: o.id === filtro ? 'is-on' : undefined,
    onClick: () => setFiltro(o.id)
  }, o.nome, /*#__PURE__*/React.createElement("span", null, o.contagem))))), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: 26
    }
  }, "Ordenar"), /*#__PURE__*/React.createElement("ul", null, [['relevancia', 'Mais relevantes'], ['menor', 'Menor preço'], ['maior', 'Maior preço']].map(([id, nome]) => /*#__PURE__*/React.createElement("li", {
    key: id
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: id === ordem ? 'is-on' : undefined,
    onClick: () => setOrdem(id)
  }, nome))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "erk-abrir-filtro",
    type: "button",
    onClick: () => setSheet(true)
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "filtro"
  }), " Filtrar"), /*#__PURE__*/React.createElement("em", null, opcoes.find(o => o.id === filtro)?.nome)), lista.length ? /*#__PURE__*/React.createElement(ProductGrid, {
    cols: 3
  }, lista.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    nome: p.n,
    categoria: categorias.find(c => c.id === p.c)?.nome,
    spec: p.s,
    foto: p.f,
    valor: 'R$ ' + p.p,
    antigo: p.a ? 'R$ ' + p.a : undefined,
    parcela: p.parcela,
    tags: p.tags,
    desconto: p.desc,
    favorito: favoritos.includes(p.id),
    onFavorito: () => onFavoritar(p.id),
    href: "#",
    onAcao: e => {
      e.preventDefault();
      onAbrirProduto(p.id);
    },
    acao: "Ver a pe\xE7a",
    onAdicionar: () => onAdicionar(p.id)
  }))) : /*#__PURE__*/React.createElement(EmptyState, null, "Nada por aqui ainda. Toque em \"Todas\" para ver o cat\xE1logo inteiro.")))), /*#__PURE__*/React.createElement(BottomSheet, {
    aberto: sheet,
    titulo: "Categoria",
    opcoes: opcoes,
    valor: filtro,
    onSelecionar: setFiltro,
    onFechar: () => setSheet(false)
  }));
}
Object.assign(window, {
  Catalogo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/Catalogo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/Checkout.jsx
try { (() => {
/* Checkout em três passos, um por vez, com o resumo sempre visível. */
const {
  Button,
  Icon,
  Price,
  ProductRow,
  ProductRows,
  Chip
} = window.ERKPratasDesignSystem_e111e2;
function Checkout({
  dados,
  sacola,
  onIr,
  onLimpar
}) {
  const {
    produtos,
    telefone
  } = dados;
  const [passo, setPasso] = React.useState(1);
  const [entrega, setEntrega] = React.useState('motoboy');
  const [pagamento, setPagamento] = React.useState('pix');
  const num = v => parseFloat(v.replace('.', '').replace(',', '.'));
  const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');
  const itens = Object.entries(sacola).map(([id, q]) => ({
    p: produtos.find(x => x.id === id),
    q
  })).filter(i => i.p);
  const total = itens.reduce((s, i) => s + num(i.p.p) * i.q, 0);
  const frete = entrega === 'motoboy' ? 0 : 24.9;
  const campo = (rot, ph, largura) => /*#__PURE__*/React.createElement("label", {
    className: "erk-campo",
    style: largura ? {
      gridColumn: 'span ' + largura
    } : undefined,
    key: rot
  }, /*#__PURE__*/React.createElement("span", null, rot), /*#__PURE__*/React.createElement("input", {
    placeholder: ph
  }));
  return /*#__PURE__*/React.createElement("main", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "erk-titulo"
  }, "Fechar o pedido"), /*#__PURE__*/React.createElement("ol", {
    className: "erk-passos"
  }, ['Seus dados', 'Entrega', 'Pagamento'].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    className: passo === i + 1 ? 'is-on' : passo > i + 1 ? 'is-ok' : undefined
  }, /*#__PURE__*/React.createElement("b", null, passo > i + 1 ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }) : i + 1), t))), /*#__PURE__*/React.createElement("div", {
    className: "erk-sacola"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-form"
  }, passo === 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "erk-form__g"
  }, campo('Nome completo', 'Como está no documento', 2), campo('WhatsApp', '(11) 9 9999-9999'), campo('E-mail', 'voce@email.com'), campo('CPF', '000.000.000-00')), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setPasso(2),
    icone: "seta"
  }, "Continuar")) : passo === 2 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "erk-opcao-lista"
  }, [['motoboy', 'Motoboy hoje', 'Salto, Itu, Indaiatuba e Cabreúva · grátis acima de R$ 150'], ['correios', 'Envio para todo o Brasil', 'Rastreado · 3 a 7 dias úteis · R$ 24,90'], ['retirada', 'Retirar na loja', 'Salto, SP · pronto em 2 horas · grátis']].map(([id, t, d]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    type: "button",
    className: ['erk-opcao', entrega === id ? 'is-on' : ''].join(' '),
    onClick: () => setEntrega(id)
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t), /*#__PURE__*/React.createElement("em", null, d)), /*#__PURE__*/React.createElement("i", null)))), /*#__PURE__*/React.createElement("div", {
    className: "erk-form__g",
    style: {
      marginTop: 18
    }
  }, campo('CEP', '13320-000'), campo('Número', '000'), campo('Endereço', 'Rua, avenida', 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setPasso(1)
  }, "Voltar"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setPasso(3),
    icone: "seta"
  }, "Ir para o pagamento"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "erk-opcao-lista"
  }, [['pix', 'Pix', 'Confirmação na hora · 5% de desconto'], ['credito', 'Cartão de crédito', 'Até 6x sem juros'], ['whats', 'Combinar no WhatsApp', 'A gente confirma medida e frete antes de cobrar']].map(([id, t, d]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    type: "button",
    className: ['erk-opcao', pagamento === id ? 'is-on' : ''].join(' '),
    onClick: () => setPagamento(id)
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t), /*#__PURE__*/React.createElement("em", null, d)), /*#__PURE__*/React.createElement("i", null)))), pagamento === 'credito' ? /*#__PURE__*/React.createElement("div", {
    className: "erk-form__g",
    style: {
      marginTop: 18
    }
  }, campo('Número do cartão', '0000 0000 0000 0000', 2), campo('Validade', 'MM/AA'), campo('CVV', '000'), /*#__PURE__*/React.createElement("div", {
    className: "erk-campo",
    style: {
      gridColumn: 'span 2'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Parcelas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, [1, 3, 6].map(n => /*#__PURE__*/React.createElement(Chip, {
    key: n,
    ativo: n === 6
  }, n, "x de ", fmt((total + frete) / n)))))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setPasso(2)
  }, "Voltar"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => {
      onLimpar();
      onIr('obrigado');
    }
  }, "Confirmar pedido")))), /*#__PURE__*/React.createElement("aside", {
    className: "erk-resumo"
  }, /*#__PURE__*/React.createElement("h4", null, "Seu pedido"), /*#__PURE__*/React.createElement(ProductRows, null, itens.map(({
    p,
    q
  }) => /*#__PURE__*/React.createElement(ProductRow, {
    key: p.id,
    nome: p.n,
    spec: q + ' × ' + p.s,
    foto: p.f,
    valor: fmt(num(p.p) * q),
    href: "#",
    onClick: e => e.preventDefault()
  }))), /*#__PURE__*/React.createElement("dl", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Pe\xE7as"), /*#__PURE__*/React.createElement("dd", null, fmt(total))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Frete"), /*#__PURE__*/React.createElement("dd", null, frete ? fmt(frete) : 'grátis'))), /*#__PURE__*/React.createElement("div", {
    className: "erk-resumo__total"
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement(Price, {
    valor: fmt(total + frete),
    parcela: 'em até 6x de ' + fmt((total + frete) / 6) + ' sem juros',
    grande: true
  })), /*#__PURE__*/React.createElement("p", {
    className: "erk-resumo__nota"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "garantia",
    size: 15
  }), " Garantia vital\xEDcia e troca em 7 dias."), /*#__PURE__*/React.createElement("p", {
    className: "erk-resumo__nota"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "conta",
    size: 15
  }), " D\xFAvida? ", /*#__PURE__*/React.createElement("a", {
    href: 'https://wa.me/' + telefone
  }, "fale com a loja"), ".")))));
}
function Obrigado({
  dados,
  onIr
}) {
  return /*#__PURE__*/React.createElement("main", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap",
    style: {
      maxWidth: 620,
      textAlign: 'center',
      paddingTop: 40,
      paddingBottom: 60
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "erk-ok"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 30
  })), /*#__PURE__*/React.createElement("h1", {
    className: "erk-titulo",
    style: {
      marginTop: 18
    }
  }, "Pedido confirmado"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-2)',
      marginTop: 12
    }
  }, "Mandamos o resumo no seu WhatsApp. A pe\xE7a sai da oficina embalada, com o cart\xE3o da loja \u2014 e a gente avisa quando o motoboy pegar a encomenda."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      marginTop: 26,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onIr('home')
  }, "Voltar para a loja"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    href: 'https://wa.me/' + dados.telefone
  }, "Acompanhar no WhatsApp"))));
}
Object.assign(window, {
  Checkout,
  Obrigado
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/Checkout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/Home.jsx
try { (() => {
/* Home da loja — a tela do mockup de origem, recomposta com os componentes
   da biblioteca. Ordem das seções: hero, categorias, garantias, mais
   vendidas, banners, catálogo, oficina, conversa. */
const {
  Hero,
  CategoryTile,
  CategoryTiles,
  GuaranteeStrip,
  PromoBanner,
  PromoPair,
  CTABanner,
  SectionHeader,
  ProductCard,
  ProductGrid,
  Chip,
  Button,
  Icon
} = window.ERKPratasDesignSystem_e111e2;
function Home({
  dados,
  favoritos,
  onFavoritar,
  onAbrirProduto,
  onAdicionar,
  onIr,
  filtro,
  setFiltro
}) {
  const {
    produtos,
    categorias,
    garantias,
    fotos,
    telefone
  } = dados;
  const vendidas = produtos.filter(p => p.tags.includes('Mais vendida')).slice(0, 4);
  const filtrados = produtos.filter(p => filtro === 'todas' ? true : filtro === 'ofertas' ? !!p.desc : p.c === filtro);
  const card = p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    nome: p.n,
    categoria: categorias.find(c => c.id === p.c)?.nome,
    spec: p.s,
    foto: p.f,
    valor: 'R$ ' + p.p,
    antigo: p.a ? 'R$ ' + p.a : undefined,
    parcela: p.parcela,
    tags: p.tags,
    desconto: p.desc,
    favorito: favoritos.includes(p.id),
    onFavorito: () => onFavoritar(p.id),
    onAcao: e => {
      e.preventDefault();
      onAdicionar(p.id);
    },
    onAdicionar: () => onAdicionar(p.id),
    href: "#produto",
    acaoHref: undefined
  });
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'clamp(20px,3vw,34px) 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(Hero, {
    selo: "Cole\xE7\xE3o masculina",
    titulo: /*#__PURE__*/React.createElement(React.Fragment, null, "Corrente cubana", /*#__PURE__*/React.createElement("br", null), "a partir de"),
    destaque: "R$ 231",
    sub: "Prata 925 leg\xEDtima, com pun\xE7\xE3o gravado e fecho gaveta refor\xE7ado. Feita na nossa oficina em Salto e enviada para todo o Brasil.",
    foto: fotos.hero,
    fotoAlt: "Homem usando corrente cubana de prata 925",
    precoRotulo: "Corrente cubana 60 cm",
    preco: "R$ 231,00",
    precoAntigo: "R$ 289,00",
    provas: [{
      icone: 'puncao',
      texto: 'Punção 925'
    }, {
      icone: 'garantia',
      texto: 'Garantia vitalícia'
    }, {
      icone: 'entrega',
      texto: 'Motoboy na região'
    }],
    acao: "Ver o cat\xE1logo",
    acaoSec: "Montar a minha pe\xE7a",
    pontos: 3
  }))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    titulo: "Comprar por categoria",
    apoio: "16 pe\xE7as de prata 925, todas com pun\xE7\xE3o e garantia vital\xEDcia",
    link: "Ver tudo",
    onLink: e => {
      e.preventDefault();
      onIr('catalogo');
    }
  }), /*#__PURE__*/React.createElement(CategoryTiles, {
    cols: 6,
    colsMd: 3
  }, categorias.map(c => /*#__PURE__*/React.createElement(CategoryTile, {
    key: c.id,
    nome: c.nome,
    contagem: c.n,
    foto: c.foto,
    onClick: e => {
      e.preventDefault();
      setFiltro(c.id);
      onIr('catalogo');
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBottom: 'var(--sec-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(GuaranteeStrip, {
    itens: garantias
  }))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec erk-sec--suave"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    titulo: "Mais vendidas",
    apoio: "As pe\xE7as que mais saem da oficina",
    link: "Ver o cat\xE1logo",
    onLink: e => {
      e.preventDefault();
      onIr('catalogo');
    }
  }), /*#__PURE__*/React.createElement(ProductGrid, null, vendidas.map(card)))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(PromoPair, null, /*#__PURE__*/React.createElement(PromoBanner, {
    olho: "Oficina pr\xF3pria",
    titulo: "Sua prata volta a brilhar",
    texto: "Polimento, solda de elo, troca de fecho e ajuste de aro \u2014 mesmo em pe\xE7a que voc\xEA n\xE3o comprou aqui. Or\xE7amento na hora.",
    foto: fotos.promoOficina,
    acao: "Ver servi\xE7os",
    acaoHref: "#oficina"
  }), /*#__PURE__*/React.createElement(PromoBanner, {
    olho: "Pronto para presentear",
    titulo: "Vai embalado",
    texto: "Toda pe\xE7a sai em embalagem pr\xF3pria, com cart\xE3o.",
    foto: fotos.promoPresente,
    acao: "Escolher presente",
    acento: true,
    acaoHref: "#catalogo"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec erk-sec--suave",
    id: "catalogo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    titulo: "Cat\xE1logo completo",
    apoio: "16 produtos \xB7 prata 925 leg\xEDtima \xB7 pronta entrega"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      flexWrap: 'wrap',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    ativo: filtro === 'todas',
    onClick: () => setFiltro('todas')
  }, "Todas"), categorias.map(c => /*#__PURE__*/React.createElement(Chip, {
    key: c.id,
    ativo: filtro === c.id,
    onClick: () => setFiltro(c.id)
  }, c.nome)), /*#__PURE__*/React.createElement(Chip, {
    ativo: filtro === 'ofertas',
    onClick: () => setFiltro('ofertas')
  }, "Ofertas")), /*#__PURE__*/React.createElement(ProductGrid, null, filtrados.map(card)))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec",
    id: "oficina"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-oficina"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "erk-oficina__fig"
  }, /*#__PURE__*/React.createElement("img", {
    src: fotos.oficina,
    alt: "A oficina fica aqui dentro",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "A oficina fica aqui dentro"), /*#__PURE__*/React.createElement("p", null, "N\xE3o mandamos sua pe\xE7a para lugar nenhum. Polimento, solda e ajuste s\xE3o feitos na bancada da loja, em Salto \u2014 muita coisa sai no mesmo dia."), /*#__PURE__*/React.createElement("ul", null, ['Polimento que tira a camada oxidada sem desgastar o metal', 'Solda de elo e troca de fecho com garantia', 'Ajuste de aro de anel na sua frente', 'Gravação de nome, inicial e data'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), " ", t))), /*#__PURE__*/React.createElement(Button, {
    href: 'https://wa.me/' + telefone
  }, "Falar com a oficina"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBottom: 'var(--sec-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(CTABanner, {
    titulo: "Ficou com d\xFAvida no tamanho?",
    texto: "Manda uma mensagem que a gente te ajuda a escolher a medida certa, calcula o frete e confirma a disponibilidade na hora.",
    acao: "Chamar no WhatsApp",
    acaoHref: 'https://wa.me/' + telefone
  }))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/Loja.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Casca da loja: cabeçalho, nav, rodapé, barra do polegar e as telas
   cheias do celular. Guarda a rota, a sacola e os favoritos. */
const {
  Header,
  CategoryNav,
  BottomBar,
  Footer,
  SearchBar,
  ProductRow,
  ProductRows,
  EmptyState,
  Icon
} = window.ERKPratasDesignSystem_e111e2;
const CATS_NAV = categorias => [{
  id: 'todas',
  nome: 'Início',
  icone: 'inicio'
}, ...categorias.map(c => ({
  id: c.id,
  nome: c.nome,
  icone: c.icone
})), {
  id: 'ofertas',
  nome: 'Ofertas',
  icone: 'favorito',
  promo: true
}];
function Loja() {
  const dados = window.ERK_DADOS;
  const [rota, setRota] = React.useState('home');
  const [pid, setPid] = React.useState('p01');
  const [filtro, setFiltro] = React.useState('todas');
  const [ordem, setOrdem] = React.useState('relevancia');
  const [sacola, setSacola] = React.useState({
    p01: 1,
    p06: 1,
    p14: 1
  });
  const [favoritos, setFavoritos] = React.useState([]);
  const [tela, setTela] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [tema, setTema] = React.useState('claro');
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema === 'escuro' ? 'dark' : 'light');
  }, [tema]);
  const itensSacola = Object.values(sacola).reduce((a, b) => a + b, 0);
  const ir = r => {
    setRota(r);
    setTela(null);
    window.scrollTo({
      top: 0
    });
  };
  const abrirProduto = id => {
    setPid(id);
    ir('produto');
  };
  const favoritar = id => setFavoritos(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const adicionar = id => {
    setSacola(s => ({
      ...s,
      [id]: (s[id] || 0) + 1
    }));
    ir('sacola');
  };
  const qtd = (id, n) => setSacola(s => {
    const c = {
      ...s
    };
    if (n <= 0) delete c[id];else c[id] = n;
    return c;
  });
  const remover = id => qtd(id, 0);
  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const achados = q.trim() ? dados.produtos.filter(p => norm(p.n + ' ' + p.s + ' ' + p.c).includes(norm(q).trim())) : [];
  const produto = dados.produtos.find(p => p.id === pid) || dados.produtos[0];
  const comuns = {
    dados,
    favoritos,
    onFavoritar: favoritar,
    onAdicionar: adicionar,
    onAbrirProduto: abrirProduto,
    onIr: ir
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    itensSacola: itensSacola,
    busca: q,
    onBusca: setQ,
    onSubmitBusca: () => {
      setTela('busca');
    }
  }), /*#__PURE__*/React.createElement(CategoryNav, {
    itens: CATS_NAV(dados.categorias),
    ativo: rota === 'home' ? 'todas' : filtro,
    onSelecionar: id => {
      setFiltro(id);
      ir(id === 'todas' ? 'home' : 'catalogo');
    }
  }), rota === 'home' ? /*#__PURE__*/React.createElement(Home, _extends({}, comuns, {
    filtro: filtro,
    setFiltro: setFiltro
  })) : null, rota === 'catalogo' ? /*#__PURE__*/React.createElement(Catalogo, _extends({}, comuns, {
    filtro: filtro,
    setFiltro: setFiltro,
    ordem: ordem,
    setOrdem: setOrdem
  })) : null, rota === 'produto' ? /*#__PURE__*/React.createElement(Produto, _extends({}, comuns, {
    produto: produto
  })) : null, rota === 'sacola' ? /*#__PURE__*/React.createElement(Sacola, {
    dados: dados,
    sacola: sacola,
    onQtd: qtd,
    onRemover: remover,
    onIr: ir
  }) : null, rota === 'checkout' ? /*#__PURE__*/React.createElement(Checkout, {
    dados: dados,
    sacola: sacola,
    onIr: ir,
    onLimpar: () => setSacola({})
  }) : null, rota === 'obrigado' ? /*#__PURE__*/React.createElement(Obrigado, {
    dados: dados,
    onIr: ir
  }) : null, /*#__PURE__*/React.createElement(Footer, {
    sobre: "Joalheria de prata 925 leg\xEDtima com oficina pr\xF3pria em Salto, S\xE3o Paulo. Atendemos Itu, Indaiatuba, Cabre\xFAva e Sorocaba, e enviamos para todo o Brasil.",
    pagamentos: ['CRÉDITO', 'DÉBITO', 'PIX', 'ATÉ 6X SEM JUROS'],
    colunas: [{
      titulo: 'Loja',
      itens: ['Correntes', 'Pulseiras', 'Anéis', 'Pingentes', 'Brincos', 'Conjuntos']
    }, {
      titulo: 'Ajuda',
      itens: ['Como escolher a medida', 'Prazo e frete', 'Trocas e devolução', 'Garantia vitalícia', 'Guia da prata 925']
    }, {
      titulo: 'Institucional',
      itens: ['A oficina', 'Monte a sua peça', 'Instagram', 'WhatsApp', 'Onde estamos']
    }],
    fim: ['© 2026 ERK Pratas · Salto, SP', 'Recriação de UI kit · fotos ilustrativas']
  }), /*#__PURE__*/React.createElement(BottomBar, {
    ativo: tela || (rota === 'sacola' ? 'sacola' : 'inicio'),
    onSelecionar: id => {
      if (id === 'inicio') {
        ir('home');
        return;
      }
      if (id === 'sacola') {
        ir('sacola');
        return;
      }
      setTela(tela === id ? null : id);
    },
    itens: [{
      id: 'inicio',
      nome: 'Início',
      icone: 'inicio'
    }, {
      id: 'busca',
      nome: 'Buscar',
      icone: 'busca'
    }, {
      id: 'cats',
      nome: 'Categorias',
      icone: 'grade'
    }, {
      id: 'favs',
      nome: 'Favoritos',
      icone: 'favorito'
    }, {
      id: 'sacola',
      nome: 'Sacola',
      icone: 'sacola',
      contador: itensSacola || undefined
    }]
  }), tela === 'busca' ? /*#__PURE__*/React.createElement("section", {
    className: "erk-tela",
    "aria-label": "Buscar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-tela__topo"
  }, /*#__PURE__*/React.createElement("button", {
    className: "erk-tela__voltar",
    type: "button",
    onClick: () => setTela(null),
    "aria-label": "Voltar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "seta"
  })), /*#__PURE__*/React.createElement(SearchBar, {
    semBotao: true,
    valor: q,
    onChange: setQ
  })), /*#__PURE__*/React.createElement("div", {
    className: "erk-tela__corpo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-sug"
  }, ['Correntes', 'Pulseiras', 'Anéis', 'Pingentes', 'Brincos'].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    type: "button",
    onClick: () => setQ(s)
  }, s))), q.trim() === '' ? null : achados.length ? /*#__PURE__*/React.createElement(ProductRows, null, achados.map(p => /*#__PURE__*/React.createElement(ProductRow, {
    key: p.id,
    nome: p.n,
    spec: p.s,
    foto: p.f,
    valor: 'R$ ' + p.p,
    href: "#",
    onClick: e => {
      e.preventDefault();
      abrirProduto(p.id);
    }
  }))) : /*#__PURE__*/React.createElement(EmptyState, null, "Nada encontrado para \"", q, "\"."))) : null, tela === 'cats' ? /*#__PURE__*/React.createElement("section", {
    className: "erk-tela",
    "aria-label": "Categorias"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-tela__topo"
  }, /*#__PURE__*/React.createElement("button", {
    className: "erk-tela__voltar",
    type: "button",
    onClick: () => setTela(null),
    "aria-label": "Voltar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "seta"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "erk-tela__titulo"
  }, "Categorias")), /*#__PURE__*/React.createElement("div", {
    className: "erk-tela__corpo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-lcat"
  }, dados.categorias.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setFiltro(c.id);
      ir('catalogo');
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.foto,
    alt: "",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, c.nome), /*#__PURE__*/React.createElement("span", null, c.n)), /*#__PURE__*/React.createElement(Icon, {
    name: "seta"
  })))))) : null, tela === 'favs' ? /*#__PURE__*/React.createElement("section", {
    className: "erk-tela",
    "aria-label": "Favoritos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-tela__topo"
  }, /*#__PURE__*/React.createElement("button", {
    className: "erk-tela__voltar",
    type: "button",
    onClick: () => setTela(null),
    "aria-label": "Voltar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "seta"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "erk-tela__titulo"
  }, "Favoritos")), /*#__PURE__*/React.createElement("div", {
    className: "erk-tela__corpo"
  }, favoritos.length ? /*#__PURE__*/React.createElement(ProductRows, null, dados.produtos.filter(p => favoritos.includes(p.id)).map(p => /*#__PURE__*/React.createElement(ProductRow, {
    key: p.id,
    nome: p.n,
    spec: p.s,
    foto: p.f,
    valor: 'R$ ' + p.p,
    href: "#",
    onClick: e => {
      e.preventDefault();
      abrirProduto(p.id);
    }
  }))) : /*#__PURE__*/React.createElement(EmptyState, null, "Toque no cora\xE7\xE3o de uma pe\xE7a para guardar aqui."))) : null, /*#__PURE__*/React.createElement("div", {
    className: "erk-tema",
    role: "group",
    "aria-label": "Tema"
  }, ['claro', 'escuro'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    type: "button",
    className: tema === t ? 'is-on' : undefined,
    onClick: () => setTema(t)
  }, t))));
}
Object.assign(window, {
  Loja
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/Loja.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/Produto.jsx
try { (() => {
/* Página de produto: galeria à esquerda, compra à direita, ficha e
   relacionados abaixo. Mesma linguagem da home — nada novo inventado. */
const {
  Price,
  Button,
  Tag,
  Icon,
  Chip,
  ProductCard,
  ProductGrid,
  SectionHeader,
  GuaranteeStrip
} = window.ERKPratasDesignSystem_e111e2;
function Produto({
  dados,
  produto,
  favoritos,
  onFavoritar,
  onAdicionar,
  onAbrirProduto,
  onIr
}) {
  const {
    categorias,
    garantias,
    telefone,
    produtos
  } = dados;
  const cat = categorias.find(c => c.id === produto.c);
  const [medida, setMedida] = React.useState(produto.s.includes('cm') ? '60 cm' : 'Único');
  const relacionados = produtos.filter(p => p.c === produto.c && p.id !== produto.id).slice(0, 4);
  const medidas = produto.c === 'correntes' ? ['45 cm', '50 cm', '60 cm', '70 cm'] : produto.c === 'pulseiras' ? ['18 cm', '21 cm', '23 cm'] : produto.c === 'aneis' ? ['16', '18', '20', '22'] : ['Único'];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap",
    style: {
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-3)',
      display: 'flex',
      gap: 7,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onIr('home');
    }
  }, "In\xEDcio"), /*#__PURE__*/React.createElement(Icon, {
    name: "seta",
    size: 12
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onIr('catalogo');
    }
  }, cat?.nome), /*#__PURE__*/React.createElement(Icon, {
    name: "seta",
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-2)'
    }
  }, produto.n))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec",
    style: {
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-pdp"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("figure", {
    className: "erk-pdp__fig"
  }, /*#__PURE__*/React.createElement("img", {
    src: produto.f,
    alt: produto.n
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-card__tags"
  }, produto.desc ? /*#__PURE__*/React.createElement(Tag, {
    oferta: true
  }, produto.desc) : null, produto.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "erk-pdp__mini"
  }, [produto.f, ...relacionados.map(r => r.f)].slice(0, 4).map((src, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i === 0 ? 'is-on' : undefined
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: ""
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "erk-pdp__compra"
  }, /*#__PURE__*/React.createElement("p", {
    className: "erk-card__cat"
  }, cat?.nome), /*#__PURE__*/React.createElement("h1", {
    className: "erk-pdp__nome"
  }, produto.n), /*#__PURE__*/React.createElement("p", {
    className: "erk-card__spec"
  }, produto.s, " \xB7 pun\xE7\xE3o 925 gravado"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '18px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Price, {
    grande: true,
    valor: 'R$ ' + produto.p,
    antigo: produto.a ? 'R$ ' + produto.a : undefined,
    parcela: produto.parcela
  })), /*#__PURE__*/React.createElement("p", {
    className: "erk-pdp__rot"
  }, "Medida"), /*#__PURE__*/React.createElement("div", {
    className: "erk-pdp__ops"
  }, medidas.map(m => /*#__PURE__*/React.createElement(Chip, {
    key: m,
    ativo: m === medida,
    onClick: () => setMedida(m)
  }, m))), /*#__PURE__*/React.createElement("div", {
    className: "erk-pdp__acoes"
  }, /*#__PURE__*/React.createElement(Button, {
    full: true,
    onClick: () => onAdicionar(produto.id)
  }, "Adicionar \xE0 sacola"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    full: true,
    href: 'https://wa.me/' + telefone
  }, "Tirar d\xFAvida no WhatsApp"), /*#__PURE__*/React.createElement("button", {
    className: "erk-pdp__fav",
    type: "button",
    onClick: () => onFavoritar(produto.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "favorito",
    size: 17
  }), favoritos.includes(produto.id) ? 'Guardado nos favoritos' : 'Guardar nos favoritos')), /*#__PURE__*/React.createElement("ul", {
    className: "erk-pdp__provas"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "entrega"
  }), " Motoboy no mesmo dia em Salto, Itu, Indaiatuba e Cabre\xFAva"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "garantia"
  }), " Garantia vital\xEDcia contra defeito de fabrica\xE7\xE3o"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "oficina"
  }), " Ajuste de medida e grava\xE7\xE3o feitos na loja")))))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec erk-sec--suave"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    titulo: "A pe\xE7a",
    apoio: "Ficha t\xE9cnica e cuidado"
  }), /*#__PURE__*/React.createElement("div", {
    className: "erk-ficha"
  }, /*#__PURE__*/React.createElement("dl", null, [['Material', 'Prata 925 legítima, com punção gravado'], ['Acabamento', 'Polimento espelhado feito na oficina'], ['Fecho', 'Gaveta reforçada com trava dupla'], ['Medida', medida], ['Peso aproximado', '18 g'], ['Embalagem', 'Caixa própria com cartão']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("dt", null, k), /*#__PURE__*/React.createElement("dd", null, v)))), /*#__PURE__*/React.createElement("p", null, "Prata escurece com o tempo \u2014 \xE9 rea\xE7\xE3o natural do metal, n\xE3o defeito. Guarde seca, longe de perfume e cloro. Quando perder o brilho, traga na loja: o polimento \xE9 r\xE1pido e a gente devolve a pe\xE7a como saiu da bancada.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'clamp(24px,3vw,40px)'
    }
  }, /*#__PURE__*/React.createElement(GuaranteeStrip, {
    itens: garantias
  })))), /*#__PURE__*/React.createElement("section", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    titulo: "Quem viu, viu tamb\xE9m",
    link: "Ver o cat\xE1logo",
    onLink: e => {
      e.preventDefault();
      onIr('catalogo');
    }
  }), /*#__PURE__*/React.createElement(ProductGrid, null, relacionados.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    nome: p.n,
    categoria: cat?.nome,
    spec: p.s,
    foto: p.f,
    valor: 'R$ ' + p.p,
    antigo: p.a ? 'R$ ' + p.a : undefined,
    parcela: p.parcela,
    tags: p.tags,
    desconto: p.desc,
    favorito: favoritos.includes(p.id),
    onFavorito: () => onFavoritar(p.id),
    href: "#",
    onAcao: e => {
      e.preventDefault();
      onAbrirProduto(p.id);
    },
    acao: "Ver a pe\xE7a",
    onAdicionar: () => onAbrirProduto(p.id)
  }))))));
}
Object.assign(window, {
  Produto
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/Produto.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/Sacola.jsx
try { (() => {
/* Sacola: itens à esquerda, resumo grudado à direita. */
const {
  ProductRow,
  ProductRows,
  Button,
  Icon,
  EmptyState,
  Price
} = window.ERKPratasDesignSystem_e111e2;
function Sacola({
  dados,
  sacola,
  onQtd,
  onRemover,
  onIr
}) {
  const {
    produtos
  } = dados;
  const num = v => parseFloat(v.replace('.', '').replace(',', '.'));
  const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');
  const itens = Object.entries(sacola).map(([id, q]) => ({
    p: produtos.find(x => x.id === id),
    q
  })).filter(i => i.p);
  const total = itens.reduce((s, i) => s + num(i.p.p) * i.q, 0);
  const economia = itens.reduce((s, i) => s + (i.p.a ? (num(i.p.a) - num(i.p.p)) * i.q : 0), 0);
  return /*#__PURE__*/React.createElement("main", {
    className: "erk-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erk-wrap"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "erk-titulo"
  }, "Sua sacola"), itens.length === 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EmptyState, null, "Sua sacola est\xE1 vazia. Escolha uma pe\xE7a no cat\xE1logo para come\xE7ar."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icone: "seta",
    onClick: () => onIr('catalogo')
  }, "Ver o cat\xE1logo"))) : /*#__PURE__*/React.createElement("div", {
    className: "erk-sacola"
  }, /*#__PURE__*/React.createElement(ProductRows, null, itens.map(({
    p,
    q
  }) => /*#__PURE__*/React.createElement(ProductRow, {
    key: p.id,
    nome: p.n,
    spec: p.s,
    foto: p.f,
    href: "#",
    onClick: e => e.preventDefault(),
    direita: /*#__PURE__*/React.createElement("span", {
      className: "erk-qtd"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Menos",
      onClick: () => onQtd(p.id, q - 1)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "menos",
      size: 15
    })), /*#__PURE__*/React.createElement("b", null, q), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Mais",
      onClick: () => onQtd(p.id, q + 1)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "mais",
      size: 15
    })), /*#__PURE__*/React.createElement("i", null, fmt(num(p.p) * q)), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "erk-qtd__x",
      onClick: () => onRemover(p.id)
    }, "remover"))
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "erk-resumo"
  }, /*#__PURE__*/React.createElement("h4", null, "Resumo"), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Pe\xE7as (", itens.reduce((s, i) => s + i.q, 0), ")"), /*#__PURE__*/React.createElement("dd", null, fmt(total))), economia > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Desconto aplicado"), /*#__PURE__*/React.createElement("dd", {
    style: {
      color: 'var(--ok)'
    }
  }, "\u2212 ", fmt(economia))) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Frete"), /*#__PURE__*/React.createElement("dd", null, "a calcular"))), /*#__PURE__*/React.createElement("div", {
    className: "erk-resumo__total"
  }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement(Price, {
    valor: fmt(total),
    parcela: 'em até 6x de ' + fmt(total / 6) + ' sem juros',
    grande: true
  })), /*#__PURE__*/React.createElement(Button, {
    full: true,
    onClick: () => onIr('checkout')
  }, "Fechar o pedido"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    full: true,
    onClick: () => onIr('catalogo')
  }, "Continuar escolhendo"), /*#__PURE__*/React.createElement("p", {
    className: "erk-resumo__nota"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "entrega",
    size: 15
  }), " Motoboy no mesmo dia em Salto, Itu, Indaiatuba e Cabre\xFAva.")))));
}
Object.assign(window, {
  Sacola
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/Sacola.jsx", error: String((e && e.message) || e) }); }

// ui_kits/loja/dados.js
try { (() => {
/* Dados do catálogo — extraídos do mockup de origem (16 peças, 6 categorias).
   Fotos são URLs do Pexels usadas no mockup; troque pelas fotos reais da loja. */
window.ERK_DADOS = {
  "telefone": "5511911124875",
  "produtos": [{
    "id": "p01",
    "n": "Corrente cubana",
    "c": "correntes",
    "s": "Elo cubano · 60 cm",
    "p": "231,00",
    "a": "289,00",
    "f": "https://images.pexels.com/photos/16124761/pexels-photo-16124761.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Mais vendida"],
    "desc": "-20%",
    "parcela": "6x de R$ 38,50 sem juros"
  }, {
    "id": "p02",
    "n": "Corrente grumet",
    "c": "correntes",
    "s": "Elo grumet · 60 cm",
    "p": "199,00",
    "a": "249,00",
    "f": "https://images.pexels.com/photos/16109263/pexels-photo-16109263.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": "-20%",
    "parcela": "3x de R$ 66,33 sem juros"
  }, {
    "id": "p03",
    "n": "Corrente veneziana",
    "c": "correntes",
    "s": "Malha veneziana · 45 cm",
    "p": "143,00",
    "a": "179,00",
    "f": "https://images.pexels.com/photos/16109182/pexels-photo-16109182.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": "-20%",
    "parcela": "3x de R$ 47,67 sem juros"
  }, {
    "id": "p04",
    "n": "Corrente cartier",
    "c": "correntes",
    "s": "Elo alongado · 50 cm",
    "p": "199,00",
    "a": null,
    "f": "https://images.pexels.com/photos/10973370/pexels-photo-10973370.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Novo"],
    "desc": null,
    "parcela": "3x de R$ 66,33 sem juros"
  }, {
    "id": "p05",
    "n": "Corrente baiana",
    "c": "correntes",
    "s": "Elo com bola · 70 cm",
    "p": "259,00",
    "a": "319,00",
    "f": "https://images.pexels.com/photos/34178925/pexels-photo-34178925.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": "-19%",
    "parcela": "6x de R$ 43,17 sem juros"
  }, {
    "id": "p06",
    "n": "Pulseira cubana",
    "c": "pulseiras",
    "s": "Elo cubano · 21 cm",
    "p": "151,00",
    "a": "189,00",
    "f": "https://images.pexels.com/photos/16304561/pexels-photo-16304561.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Mais vendida"],
    "desc": "-20%",
    "parcela": "3x de R$ 50,33 sem juros"
  }, {
    "id": "p07",
    "n": "Pulseira veneziana",
    "c": "pulseiras",
    "s": "Malha veneziana · 18 cm",
    "p": "129,00",
    "a": null,
    "f": "https://images.pexels.com/photos/13595530/pexels-photo-13595530.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": null,
    "parcela": "3x de R$ 43,00 sem juros"
  }, {
    "id": "p08",
    "n": "Bracelete liso",
    "c": "pulseiras",
    "s": "Aro liso · sem fecho",
    "p": "175,00",
    "a": "219,00",
    "f": "https://images.pexels.com/photos/13595766/pexels-photo-13595766.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": "-20%",
    "parcela": "3x de R$ 58,33 sem juros"
  }, {
    "id": "p09",
    "n": "Anel liso polido",
    "c": "aneis",
    "s": "Aro 4 mm · polido",
    "p": "89,00",
    "a": null,
    "f": "https://images.pexels.com/photos/35409286/pexels-photo-35409286.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": null,
    "parcela": "3x de R$ 29,67 sem juros"
  }, {
    "id": "p10",
    "n": "Anel sinete",
    "c": "aneis",
    "s": "Com gravação",
    "p": "149,00",
    "a": null,
    "f": "https://images.pexels.com/photos/6766024/pexels-photo-6766024.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Sob encomenda"],
    "desc": null,
    "parcela": "3x de R$ 49,67 sem juros"
  }, {
    "id": "p11",
    "n": "Pingente cruz",
    "c": "pingentes",
    "s": "Argola reforçada",
    "p": "79,00",
    "a": null,
    "f": "https://images.pexels.com/photos/16056798/pexels-photo-16056798.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": null,
    "parcela": "3x de R$ 26,33 sem juros"
  }, {
    "id": "p12",
    "n": "Placa personalizada",
    "c": "pingentes",
    "s": "Nome gravado",
    "p": "129,00",
    "a": null,
    "f": "https://images.pexels.com/photos/147637/pexels-photo-147637.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Sob encomenda"],
    "desc": null,
    "parcela": "3x de R$ 43,00 sem juros"
  }, {
    "id": "p13",
    "n": "Argola média",
    "c": "brincos",
    "s": "Par · 23 mm",
    "p": "99,00",
    "a": null,
    "f": "https://images.pexels.com/photos/15799266/pexels-photo-15799266.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": null,
    "parcela": "3x de R$ 33,00 sem juros"
  }, {
    "id": "p14",
    "n": "Brinco ponto de luz",
    "c": "brincos",
    "s": "Par · com tarraxa",
    "p": "69,00",
    "a": "89,00",
    "f": "https://images.pexels.com/photos/5370657/pexels-photo-5370657.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Presente"],
    "desc": "-22%",
    "parcela": "3x de R$ 23,00 sem juros"
  }, {
    "id": "p15",
    "n": "Conjunto casal",
    "c": "conjuntos",
    "s": "Duas correntes cubanas",
    "p": "343,00",
    "a": "429,00",
    "f": "https://images.pexels.com/photos/8345752/pexels-photo-8345752.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": ["Mais vendida"],
    "desc": "-20%",
    "parcela": "6x de R$ 57,17 sem juros"
  }, {
    "id": "p16",
    "n": "Conjunto corrente e pulseira",
    "c": "conjuntos",
    "s": "Corrente 60 + pulseira 21",
    "p": "279,00",
    "a": "349,00",
    "f": "https://images.pexels.com/photos/7093184/pexels-photo-7093184.jpeg?auto=compress&cs=tinysrgb&w=600",
    "tags": [],
    "desc": "-20%",
    "parcela": "6x de R$ 46,50 sem juros"
  }],
  "categorias": [{
    "id": "correntes",
    "nome": "Correntes",
    "icone": "correntes",
    "n": "5 itens",
    "foto": "https://images.pexels.com/photos/16109263/pexels-photo-16109263.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    "id": "pulseiras",
    "nome": "Pulseiras",
    "icone": "pulseiras",
    "n": "3 itens",
    "foto": "https://images.pexels.com/photos/16304561/pexels-photo-16304561.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    "id": "aneis",
    "nome": "Anéis",
    "icone": "aneis",
    "n": "2 itens",
    "foto": "https://images.pexels.com/photos/11351004/pexels-photo-11351004.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    "id": "pingentes",
    "nome": "Pingentes",
    "icone": "pingentes",
    "n": "2 itens",
    "foto": "https://images.pexels.com/photos/16056798/pexels-photo-16056798.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    "id": "brincos",
    "nome": "Brincos",
    "icone": "brincos",
    "n": "2 itens",
    "foto": "https://images.pexels.com/photos/15799258/pexels-photo-15799258.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    "id": "conjuntos",
    "nome": "Conjuntos",
    "icone": "conjuntos",
    "n": "2 itens",
    "foto": "https://images.pexels.com/photos/7093184/pexels-photo-7093184.jpeg?auto=compress&cs=tinysrgb&w=400"
  }],
  "garantias": [{
    "icone": "puncao",
    "titulo": "Prata 925 com punção",
    "texto": "Toda peça sai gravada. Nada de folheado."
  }, {
    "icone": "garantia",
    "titulo": "Garantia vitalícia",
    "texto": "Defeito de fabricação a gente resolve, sem prazo."
  }, {
    "icone": "entrega",
    "titulo": "Motoboy na região",
    "texto": "Salto, Itu, Indaiatuba e Cabreúva no mesmo dia."
  }, {
    "icone": "oficina",
    "titulo": "Oficina própria",
    "texto": "Polimento, solda e ajuste feitos aqui dentro."
  }],
  "fotos": {
    "hero": "https://images.pexels.com/photos/16109292/pexels-photo-16109292.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "oficina": "https://images.pexels.com/photos/4354570/pexels-photo-4354570.jpeg?auto=compress&cs=tinysrgb&w=900",
    "promoOficina": "https://images.pexels.com/photos/15955334/pexels-photo-15955334.jpeg?auto=compress&cs=tinysrgb&w=1100",
    "promoPresente": "https://images.pexels.com/photos/15576969/pexels-photo-15576969.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/loja/dados.js", error: String((e && e.message) || e) }); }

__ds_ns.CTABanner = __ds_scope.CTABanner;

__ds_ns.CategoryTile = __ds_scope.CategoryTile;

__ds_ns.CategoryTiles = __ds_scope.CategoryTiles;

__ds_ns.GuaranteeStrip = __ds_scope.GuaranteeStrip;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ProductGrid = __ds_scope.ProductGrid;

__ds_ns.ProductRow = __ds_scope.ProductRow;

__ds_ns.ProductRows = __ds_scope.ProductRows;

__ds_ns.PromoBanner = __ds_scope.PromoBanner;

__ds_ns.PromoPair = __ds_scope.PromoPair;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ERK_ICONS = __ds_scope.ERK_ICONS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Selo = __ds_scope.Selo;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.BottomBar = __ds_scope.BottomBar;

__ds_ns.CategoryNav = __ds_scope.CategoryNav;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
