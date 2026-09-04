# Navegação de pratas

_Started 2026-08-31 16:03 UTC_

---

## User

Continuing from "ERK Pratas – Site Responsivo".

## Assistant

Estamos refinando o site mobile da ERK Pratas — joalheria de prata com catálogo responsivo, montador de peças em fluxo por etapas, e visualização 3D em tela cheia.

**O que foi feito:**

- Nav mobile limpa: pílula fixa com hamburguer, logo e ícones, abrindo menu com cartões dos destinos principais (Ver estoque, Ofertas, Montar, Buscar) e grid de categorias.
- Hero em cartão arredondado ocupando 90% da tela, com foto sangrada, botões pílula e prova das etapas na base.
- Catálogo com tiles que ganham luz na borda e crescem sutilmente sem invadir container de cima.
- Página de peça com foto estática e botão "Ver em 3D" dentro dela, abrindo o modelo em tela cheia.
- Montador de peças refatorado em fluxo: uma escolha por página (tipo → elo → espessura → medida → acabamento → pingente → gravação → resumo), trilho de etapas navegável, botão "Confirmar" que bloqueia avanço até definir a opção, e 3D acompanhando em tempo real.
- Barra fixa no celular com o contexto da etapa ("Etapa 3 de 7") e botão de ação.
- Sacola e checkout com layouts ajustados para mobile.

**Decisões:**

- 3D nunca atrapalha scroll — embutido no desktop, botão em tela cheia no mobile.
- Menu em cartões grandes em vez de lista corrida — mais visual, menos texto.
- Montador em fluxo: menos informação de uma vez, mais claro onde está.
- Botões: efeito minimalista — só a aresta de cima acende e se alarga no hover, tudo desce 1px no clique. Sem cor fake, puro acabamento de joia.

**Estado atual:**

Site montado e testado em mobile. Navegação funcional, montador em etapas com bloqueio de avanço, 3D em modal, catálogo com hover contido, botões com gesto de luz na aresta. Faltam ajustes finos de spacing e confirmação de fluxo de checkout no celular.

**Próximos passos:**

- Validar checkout do começo ao fim no mobile.
- Testar favoritos e busca em tela pequena.
- Conferir performance do 3D em dispositivos reais.

**Arquivos:**

ERK Pratas.dc.html, erk-3d.js, support.js, ds-base.js

## User

Coloque uma seta para navegação nessa tela aqui, poder trocar de imagem das pratas

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Setas de navegação adicionadas na foto da peça (esquerda/direita, 44px, circulando entre as 3 fotos). O contador "2 / 3" e as miniaturas acompanham.

## User

# Ajustes
1. Crie a página de conta, não há nenhuma informação, e caso o usuário não esteja logado deverá aparecer Ações de login e cadastro
2. ao clicar em qualquer lugar do card, deverá abrir os detalhes da peça, não apenas ao clicar na imagem
3. Na aba de pesquisa o header acompanha a tela, oque não deve acontecer, ele deverá ficar fixo no topo

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: read_file]_

_[tool: read_file]_

All three uses are identical in shape — two multi replacements plus logic.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Agora a lógica da conta, o link no menu e o título da tela.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Três ajustes:

1. **Página de conta** (`#/conta`, também no menu mobile como "Sua conta"): deslogado mostra cartão de acesso com "Entrar" e "Criar conta", link do WhatsApp e três motivos para ter conta. Ao entrar, vira perfil com dados, dois pedidos com status e atalhos para favoritos/sacola/oficina. O ícone de conta do header desktop já aponta pra lá.
2. **Card inteiro clicável** — o corpo do card abre a peça; coração e botão de adicionar continuam com a ação própria.
3. **Header mobile fixo** no topo em todas as telas fora da home (era sticky com folga de 12px, o que deixava o conteúdo passar entre a pílula e a barra de contexto).

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Selo "Entregue" agora usa `var(--ok)` (verde de confirmação), distinto do "Na bancada".

## User

# Conta
- crie botões como se fosse configuração, um botão inteiro só pra logout, com estilização em vermelho.
- botão de pedidos para abrir todos os pedidos entreges, em preparo, etc
- botão de dados da conta, onde haverá o endereço, número, etc. para caso que o usuário compre novamente já possa facilitar a compra
- favoritos, sacola e oficina estão bons

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: grep]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Conta logada agora tem lista de configurações:

- **Meus pedidos** (`#/pedidos`) — abas Todos / Em preparo / Entregues, cada pedido com selo de estado, itens, valor e forma de entrega. Contador "2 em aberto" na linha.
- **Dados da conta** (`#/dados`) — quem compra, entrega, medidas salvas (aro 18, corrente 60, pulseira 21) e pagamento preferido, com "Editar dados".
- Favoritos, Sacola e oficina mantidos como estavam.
- **Sair da conta** — botão de largura cheia, contorno e texto vermelhos, preenchendo em vermelho no hover.

## User

# Contas
- Tire esse brilho ao topo do botão no estado de hover
- Botão do meus pedidos está maior do que os dados da conta, oque não deve acontecer, mal feito

# Pedidos
- seleção de filtro ruim, essa quebra de linha; pode retira-las
- A parte das informações como o email estão quase saindo do content, ajuste-o

## Assistant

## Assistant

## Assistant

## Assistant

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Ajustado: sair sem o fio de luz no topo, as duas linhas de configuração com a mesma altura (subtítulo em uma linha), filtros de pedidos em trilho horizontal sem quebra, e e-mail/telefone quebrando dentro do cartão.

## User

# Conta
- informações da conta quebram linha, aumentando o card
- retire o "2 em aberto", pois ele quebra o titulo

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

E-mail e telefone agora em uma linha só com corte por reticências, e o "2 em aberto" saiu — "Meus pedidos" ocupa uma linha.

