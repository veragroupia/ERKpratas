# Prompt para o Claude Design — Painel administrativo ERK Pratas

> Copie tudo abaixo da linha e cole no Claude Design.

---

Projete o **painel administrativo da ERK Pratas**, uma joalheria de prata 925 com oficina própria em Salto (SP). A loja online já existe e está no ar; este painel é a área interna onde o dono administra tudo.

## Quem vai usar

Uma pessoa só: o dono da joalheria. Ele **não é técnico**. Usa o computador da loja durante o dia e o celular no meio da oficina, muitas vezes com a mão ocupada. Tudo precisa ser óbvio sem treinamento, em português claro, sem jargão contábil — escreva "quanto custou a peça", nunca "CMV"; "quanto sobrou", nunca "margem de contribuição".

Ele precisa conseguir responder, em segundos: *o que eu preciso fazer hoje?* e *quanto eu lucrei esse mês?*

## Identidade visual — obrigatória

O painel tem que parecer a mesma marca da loja. Tema **escuro apenas**, sem alternância.

**Cores**
```
Fundo da página    #0D0F12
Superfície/card    #14171B
Superfície forte   #1C2026
Linha/borda        #23272D   (borda mais marcada: #343A42)
Texto principal    #F2F4F7
Texto secundário   #A2A9B3
Texto terciário    #6E757F
Acento (vermelho)  #D8363E   (hover #EA4750)
Positivo/verde     #3FD08A
```

Use o acento vermelho com parcimônia: alertas, ofertas, ações destrutivas. Valores positivos e lucro em verde `#3FD08A`. A ação primária é **clara sobre escuro** — botão de fundo `#F2F4F7` com texto `#0D0F12`.

**Tipografia**
- Títulos: **Cinzel** (serifada), pesos 600/700
- Todo o resto: **Montserrat**, pesos 300/400/500/600/700
- Rótulos de seção em caixa alta, 10,5–11,5px, `letter-spacing: .12em`, na cor `#6E757F`
- Números de dinheiro: Montserrat 600, `letter-spacing: -.01em`

**Forma e profundidade**
- Raio: 14px em cards, 10px em campos e botões pequenos, 980px em pílulas/chips
- Sombra de card: `0 16px 38px rgba(0,0,0,.5)`
- Altura padrão de campo e botão: 46px (38px na versão compacta)
- Espaçamentos na escala: 4, 8, 12, 16, 20, 24, 32, 40px
- Transições: 180–240ms com `cubic-bezier(.28,0,.12,1)`

**Layout**
- Largura máxima do conteúdo 1360px
- Barra lateral fixa à esquerda no desktop; no celular vira menu inferior + gaveta
- Quebra para celular em 900px
- No celular tudo em uma coluna, alvos de toque de no mínimo 44px

## Navegação

Barra lateral com estes itens, nesta ordem:

1. **Visão geral**
2. **Pedidos** — com contador de pendentes
3. **Peças** (catálogo)
4. **Vitrine** (combos, ofertas, destaque do dia)
5. **Montador** (configurador da peça sob encomenda)
6. **Insumos** (materiais de polimento e embalagem)
7. **Financeiro**
8. **Clientes**
9. **Ajustes**

No topo de tudo: logo "ERK Pratas" em Cinzel, busca global (pedido, cliente, peça) e o avatar do usuário.

---

# Telas

## 1. Visão geral

A primeira coisa na tela é **o que precisa de ação hoje**, não um gráfico bonito.

**Faixa do dia** — quatro números grandes lado a lado:
- Pedidos de hoje
- A despachar hoje
- Faturamento de hoje
- Ticket médio

Cada um com a variação versus ontem (seta e percentual, verde/vermelho).

**Cartão de lucro do mês** — destaque visual da tela. Um número grande em verde, e abaixo a conta aberta em linhas:

```
Vendas                    R$ 18.430,00
– Taxas de pagamento      R$    612,00
– Custo das peças         R$  7.180,00
– Insumos e embalagem     R$    340,00
– Frete pago              R$    290,00
– Despesas fixas          R$  1.800,00
─────────────────────────────────────
Lucro do mês              R$  8.208,00   (44,5%)
```

Com uma barra de progresso comparando ao mês anterior.

**Precisa de você** — lista curta e acionável, cada linha clicável:
- 3 pedidos pagos aguardando produção
- 2 peças prontas aguardando envio
- 1 pedido parado há mais de 3 dias *(em vermelho)*
- 2 modelos 3D da IA aguardando sua aprovação
- Massa de polir acabando (restam 40 g)

**Gráfico do mês** — barras diárias empilhadas: custo embaixo, lucro em cima, linha de faturamento. Dias sem venda aparecem vazios, não somem.

**Duas colunas no rodapé:**
- Peças mais vendidas do mês (foto, nome, quantidade, lucro gerado)
- Destaque do dia ativo agora, com botão de trocar direto

## 2. Pedidos — lista

Filtros como pílulas horizontais no topo, com contador em cada: **Hoje · Novos · Pagos · Em produção · Prontos · Enviados · Entregues · Cancelados**.

Busca por número, nome do cliente ou telefone. Filtro por período e por forma de pagamento.

Tabela no desktop, cartões empilhados no celular. Colunas:

| Nº | Cliente | Itens | Valor | Pagamento | Entrega | Status | Parado há |
|---|---|---|---|---|---|---|---|

- Status como etiqueta colorida
- "Parado há" fica vermelho quando passa de 48h no mesmo status — esse é o sinal de que algo travou
- Miniatura da primeira peça junto ao número do pedido
- Seleção múltipla para mudar status em lote e imprimir etiquetas

## 3. Pedido — detalhe

A tela mais completa do painel. Ele precisa resolver o pedido inteiro sem sair daqui.

**Cabeçalho:** número, data e hora, valor total, etiqueta de status, e botões de ação primária conforme o estado (*Marcar como pago*, *Iniciar produção*, *Marcar como pronto*, *Despachar*, *Marcar como entregue*).

**Linha do tempo** horizontal, cada etapa com data, hora e quem marcou:

```
Novo → Pago → Em produção → Polimento → Embalado → Saiu para entrega → Entregue
```

Etapas futuras em cinza, a atual destacada, as passadas com o horário. Se o pedido for de peça pronta do estoque, as etapas de produção e polimento aparecem puladas, não some a linha.

**Itens do pedido** — cada um com foto, nome, especificação, quantidade e valor. Se for peça **sob encomenda**, mostrar a ficha completa do montador em destaque, porque é a ordem de serviço da oficina:

```
Tipo: corrente   Elo: grumet   Espessura: 2,5 mm
Medida: 60 cm    Acabamento: polido
Gravação: "M & L"
```

Com botão de imprimir a ficha para levar à bancada.

**Custo e lucro deste pedido** — bloco próprio, editável:

| | |
|---|---|
| Prata (42 g × R$ 4,80) | R$ 201,60 |
| Mão de obra (1,5 h) | R$ 90,00 |
| Polimento (8 g de massa) | R$ 6,40 |
| Embalagem | R$ 4,50 |
| Fecho e argolas | R$ 12,00 |
| **Custo total** | **R$ 314,50** |
| Venda | R$ 580,00 |
| Taxa de pagamento | – R$ 23,20 |
| **Sobrou** | **R$ 242,30 (41,8%)** |

O valor de "sobrou" em verde, grande. Se ficar negativo, em vermelho com aviso.

**Cliente** — nome, WhatsApp com botão que abre a conversa, CPF, quantos pedidos já fez e quanto já gastou no total.

**Entrega** — modalidade (motoboy, correios, retirada), endereço completo com botão de copiar, previsão, e um campo **"onde está"** de texto livre com sugestões rápidas: *na bancada · em polimento · embalado, no balcão · com o motoboy João · postado, código XX123* . Esse campo é o que o cliente vê quando pergunta pelo pedido.

**Pagamento** — forma, status, valor, taxa cobrada, data da confirmação.

**Anotações internas** — campo de texto com histórico datado. Só a equipe vê.

**Ações secundárias** no rodapé: imprimir etiqueta, imprimir ficha de produção, enviar mensagem no WhatsApp, cancelar pedido, estornar.

## 4. Peças — lista do catálogo

Grade de cartões com foto, nome, preço, **custo**, **margem em %**, estoque e situação (publicada, rascunho, esgotada).

A margem aparece como etiqueta colorida: verde acima de 40%, amarela entre 20 e 40%, vermelha abaixo de 20%. Ele precisa enxergar de relance qual peça está sendo vendida barato demais.

Filtros por categoria e situação. Modo de reordenar a vitrine arrastando os cartões.

Botão grande **+ Nova peça**.

## 5. Peça — cadastro e edição

Quatro abas.

### Aba 1 — Dados
Nome, categoria, descrição, especificação curta (ex.: "elo cubano · 60 cm"), etiquetas (novidade, mais vendida), quantidade em estoque, situação.

### Aba 2 — Mídia
A aba mais trabalhada.

- **Galeria de fotos** — arrastar para subir, arrastar para reordenar, uma marcada como capa.
- **Giro 360°** — área grande de soltar arquivos com o texto *"arraste aqui a pasta com as fotos do giro"*. Ao soltar:
  - detecta a sequência pelo nome do arquivo e ordena sozinho
  - mostra **a peça já girando ali na tela**, antes de salvar, com controle de arrastar
  - barra de progresso por arquivo
  - avisos automáticos, em amarelo, sem bloquear: *"o brilho varia muito entre os quadros — a exposição pode ter ficado no automático"*, *"só 18 quadros, o giro vai ficar travado"*, *"o quadro 14 tem tamanho diferente dos outros"*
- **Modelo 3D** — se houver um `.glb` gerado pela IA a partir dessas fotos, aparece aqui em **comparação lado a lado**: giro real à esquerda, 3D gerado à direita, girando juntos. Dois botões: **Aprovar e publicar** ou **Descartar**. Enquanto não for aprovado, o site não mostra.

### Aba 3 — Custo e preço
Formulário que soma sozinho, linha a linha:

- **Prata** — peso em gramas × valor do grama (vem dos ajustes, editável aqui)
- **Mão de obra** — horas × valor da hora, ou valor fechado
- **Insumos** — linhas adicionáveis, cada uma escolhendo do estoque de insumos e informando a quantidade usada (fecho, argola, banho)
- **Polimento** — escolhe o produto de polimento do estoque e digita **quanto usou** (em gramas ou ml). O custo entra automático e a quantidade **baixa do estoque de insumos**
- **Serviços de terceiros** — fundição, gravação a laser
- **Embalagem**

Ao lado, fixo enquanto ele digita:

```
Custo total        R$ 314,50
Preço de venda     [ R$ 580,00 ]
Sobra              R$ 265,50  (45,8%)
```

Com sugestões rápidas de preço por multiplicador: *2× · 2,5× · 3× do custo*.

### Aba 4 — Ficha 3D
Os parâmetros que alimentam o visualizador e os filtros: tipo, elo, espessura, medida, acabamento. Com prévia 3D ao vivo ao lado.

## 6. Vitrine — combos, ofertas e destaque

### Destaque do dia
Cartão grande no topo mostrando o destaque ativo agora, **exatamente como aparece na home do site**. Botão de trocar abre um seletor de peça ou combo, com período (de/até) e possibilidade de agendar os próximos dias. Um calendário da semana mostra o que está programado para cada dia.

### Combos
Lista de combos e botão de criar. No formulário:
- Nome do combo
- Peças que compõem (busca e adiciona)
- Soma dos preços individuais, calculada
- Preço do combo (o que ele define)
- **Economia** destacada em verde: *"o cliente economiza R$ 84,00 (14%)"*
- **Custo somado e sobra do combo** — para ele não montar combo no prejuízo
- Vigência e estoque limitado
- Prévia do cartão do combo como aparece no site

### Ofertas
Desconto em percentual ou valor, aplicado a peças escolhidas ou a uma categoria inteira, com período e cupom opcional. Lista das ofertas ativas com quanto já venderam.

### Ordem da vitrine
Lista arrastável das seções da home (destaque, lançamentos, mais vendidos, combos, promoções) para ele decidir a ordem.

## 7. Montador — configurador

O montador do site não usa foto: a peça ainda não existe e o 3D é gerado. Aqui ele administra **as opções disponíveis**, não produtos.

- **Opções por etapa** (tipo de peça, elo, espessura, medida, acabamento, pingente): lista arrastável, cada linha com miniatura ilustrativa, nome, descrição curta e chave de ligar/desligar. Desligar tira a opção do site na hora — serve para quando a oficina não consegue fazer aquele elo no momento.
- **Tabela de peso** por elo × espessura × medida, em gramas. É o que define o preço da peça sob encomenda.
- **Preço** — valor do grama da prata, multiplicador de mão de obra, acréscimo por gravação.
- **Prévia 3D ao vivo** ao lado, atualizando conforme ele mexe.

## 8. Insumos

Controle dos materiais que se gastam no dia a dia — é o que fecha a conta do lucro real.

**Lista de insumos:** nome, tipo (massa de polir, flanela, líquido de limpeza, escova, caixinha, saquinho, cartão), unidade (g, ml, unidade), quantidade em estoque, custo por unidade, e uma barra mostrando quanto resta. Linha em vermelho quando está acabando.

**Registrar compra:** fornecedor, quantidade comprada, valor total pago, data. O sistema recalcula o custo unitário por média e soma ao estoque.

**Histórico de consumo:** o que foi gasto, em qual peça ou pedido, quando e quanto. Filtrável por período.

**Resumo do mês:** quanto foi gasto de insumo, qual produto consome mais, e o custo médio de polimento por peça.

## 9. Financeiro

Seletor de mês no topo.

**A conta do mês**, aberta e legível, cada linha clicável para ver o detalhe:

```
Vendas                          R$ 18.430,00
  Pix                           R$  9.200,00
  Cartão                        R$  9.230,00

– Taxas de pagamento            R$    612,00
– Prata                         R$  5.140,00
– Mão de obra                   R$  2.040,00
– Insumos e polimento           R$    340,00
– Frete pago                    R$    290,00
– Despesas fixas                R$  1.800,00
────────────────────────────────────────────
Lucro do mês                    R$  8.208,00
Margem                                 44,5%
```

**Gráfico de 12 meses** — barras de faturamento com linha de lucro por cima.

**Duas listas:**
- Peças que mais deram lucro no mês
- Peças com margem apertada, que talvez precisem de reajuste

**Despesas fixas** — cadastro simples de gastos recorrentes (aluguel, luz, internet, hospedagem do site, contador), com valor e dia do mês.

**Exportar** o mês em CSV, para mandar ao contador.

## 10. Clientes

Lista com busca: nome, WhatsApp, quantos pedidos, total gasto, última compra.

No detalhe: dados de contato, endereço, medidas salvas (tamanho de anel, comprimento de corrente preferido), histórico completo de pedidos e botão de abrir o WhatsApp.

## 11. Ajustes

Abas simples: dados da loja e horários · áreas de entrega e valores de frete · formas de pagamento aceitas · **valor do grama da prata** (com histórico das alterações, porque ele muda com o mercado) · despesas fixas · usuários e permissões.

---

# Regras de comportamento

- **Toda tela de dinheiro** mostra o valor em reais com duas casas e o percentual ao lado. Positivo em verde `#3FD08A`, negativo em `#D8363E`.
- **Toda mudança de estado** registra quem fez e quando, e aparece na linha do tempo.
- **Ações destrutivas** (cancelar pedido, excluir peça, estornar) pedem confirmação num diálogo que diz exatamente o que vai acontecer.
- **Listas vazias** explicam o próximo passo em vez de mostrar "nenhum resultado": *"Nenhuma peça cadastrada ainda. Comece subindo as fotos da primeira."*
- **Salvamento** com aviso claro; formulário longo salva rascunho sozinho.
- **No celular**, a barra inferior leva a Visão geral, Pedidos, Peças e Mais. A tela de pedido funciona inteira no celular, porque é onde ele vai mexer no meio da oficina.

# O que evitar

- Nada de tema claro, nem alternância de tema.
- Nada de cara de biblioteca genérica (Material, Bootstrap, admin template). Tem que parecer a mesma marca da loja: escuro, sóbrio, serifada nos títulos.
- Nada de gráfico de pizza, medidor de velocímetro ou métrica decorativa que ninguém usa.
- Nada de sigla contábil. Linguagem de quem trabalha na bancada.
- Não encher a Visão geral. Se o número não muda uma decisão, ele não entra.

# Entregável

Artboards de **desktop (1440px)** para: Visão geral · Pedidos lista · Pedido detalhe · Peças lista · Peça cadastro (as quatro abas) · Vitrine e destaque do dia · Combo novo · Montador · Insumos · Financeiro · Clientes.

Artboards de **celular (390px)** para: Visão geral · Pedidos lista · Pedido detalhe · Peça cadastro aba Mídia · Insumos.

Mais uma prancha de **componentes**: botões nos três níveis, campos, etiquetas de status, cartão de métrica, linha de tabela, linha do tempo do pedido, área de soltar arquivos, diálogo de confirmação e estado vazio.
