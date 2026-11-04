---
name: "Alpha4 para a Soul Up"
description: "Gamificação sustentável da Soul Up com identidade do protótipo Alpha4."
colors:
  ink: "#111c3d"
  brand: "#087f68"
  brand-strong: "#066653"
  brand-light: "#e5f6ef"
  paper: "#f4f6fb"
  white: "#fff"
  slate-100: "oklch(96.8% 0.007 247.896)"
  slate-200: "oklch(92.9% 0.013 255.508)"
  slate-300: "oklch(86.9% 0.022 252.894)"
  slate-600: "oklch(44.6% 0.043 257.281)"
  amber-100: "oklch(96.2% 0.059 95.617)"
  amber-950: "oklch(27.9% 0.077 45.635)"
  red-50: "oklch(97.1% 0.013 17.38)"
  red-200: "oklch(88.5% 0.062 18.334)"
  red-800: "oklch(44.4% 0.177 26.899)"
  red-950: "oklch(25.8% 0.092 26.042)"
typography:
  headline:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: "2.25rem"
    letterSpacing: "-0.025em"
  headline-wide:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: "2.5rem"
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: "1.75rem"
  body:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: "1.25rem"
  caption:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: "1rem"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  7: "28px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-primary-disabled:
    backgroundColor: "{colors.slate-200}"
    textColor: "{colors.slate-600}"
  button-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "12px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.white}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  nav-item:
    textColor: "{colors.slate-600}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  nav-item-active:
    backgroundColor: "{colors.brand-light}"
    textColor: "{colors.brand-strong}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  information:
    backgroundColor: "{colors.brand-light}"
    textColor: "{colors.brand-strong}"
    rounded: "{rounded.xl}"
    padding: "20px"
  notice:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "20px"
  empty-state:
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "32px"
---

# Design System: Alpha4 para a Soul Up

## Overview

**Creative North Star: "Gamificação sustentável da Soul Up, interface operacional com identidade do protótipo Alpha4"**

Este documento registra o sistema que o frontend implementa. O norte é uma descrição factual da identidade existente, sem nova metáfora ou marca. A referência visual é a página 13 do PDF da Sprint 3, preservada em [pagina13-X41.png](../tmp/pdfs/pagina13-X41.png); a aplicação também apresenta o recorte original em `public/images/missoes-sprint3.png`.

A interface usa fundo claro, texto azul-marinho, verde para ações e superfícies brancas delimitadas. A densidade permite ler instruções e completar tarefas em telas pequenas. Estados de carregamento, vazio, falha e conclusão acompanham a operação real. A home apresenta a proposta; as jornadas de participação privilegiam instruções e controles explícitos. Essas diferenças de composição não criam paletas ou sistemas separados.

**Key Characteristics:**
- Identidade azul-marinho e verde extraída do frontend e da referência Alpha4.
- Superfícies claras, bordas discretas e cantos moderadamente arredondados.
- Hierarquia textual direta, controles legíveis e navegação responsiva.
- Feedback de operações reais, com distinção entre conteúdo e imagem do protótipo.

Fonte normativa de implementação: `src/styles.css`, componentes React com utilitários Tailwind e a versão instalada de `tailwindcss/theme.css`. Evidência visual: os oito screenshots de home, missões, detalhe, ranking e perfil em `docs/screenshots/`, mais `amigos-mobile-limite.png`. Os nomes descritivos aqui identificam papéis observados; não representam novas decisões de identidade.

## Colors

A paleta combina um verde de ação com azul-marinho e neutros frios. Os cinco tokens personalizados preservam seus valores hexadecimais; os neutros e estados do Tailwind preservam OKLCH. As rampas do sidecar servem à prévia do painel: famílias Tailwind usam sua escala existente; cores personalizadas usam amostras sintetizadas em OKLCH. Essas amostras não ampliam a paleta normativa do frontend.

### Primary
- **Verde Soul Up** (`brand`): botões principais, links de ação, foco e identificação textual de categoria/estado.
- **Verde de leitura sobre apoio** (`brand-strong`): texto sobre `brand-light`, incluindo navegação ativa, informação de participação e números das etapas. Mantém contraste de texto normal sem alterar o fundo dos botões primários.
- **Verde claro de apoio** (`brand-light`): item de navegação ativo e informações sobre participação.

### Neutral
- **Azul-marinho Alpha4** (`ink`): texto principal, marca A4, moldura do protótipo e aviso de resultado.
- **Papel frio** (`paper`): fundo de página, cabeçalho da tabela e hover da navegação.
- **Branco de superfície** (`white`): cabeçalho, rodapé, campos e recipientes de conteúdo.
- **Cinza frio suave** (`slate-100`): esqueletos de carregamento e divisórias internas de tabela.
- **Cinza frio de borda** (`slate-200`): separação de superfícies e botões primários desabilitados.
- **Cinza frio de controle** (`slate-300`): borda de campos, botões secundários e vazio tracejado.
- **Cinza frio de leitura** (`slate-600`): descrições, ajuda e navegação inativa.

Os estados semânticos não são acentos de marca: `amber-100` com `amber-950` comunica limitações da sessão; `red-800` comunica falhas e a ação destrutiva; `red-50`, `red-200` e `red-950` delimitam a confirmação de exclusão.

**The Estado Real Rule.** Cor e mensagem de estado acompanham o resultado da operação; um verde informativo não substitui confirmação do serviço.

## Typography

**Body Font:** Segoe UI com `system-ui, sans-serif`, conforme o token atual. Não há fonte externa ou família monoespaçada específica.

O frontend usa uma família para títulos, texto e controles. A escala vem de tamanho, peso e espaço, sem caixa-alta ornamental. Os tokens acima registram os papéis recorrentes; não determinam uma nova direção de fonte de display.

### Hierarchy
- **Headline:** título de página compacto; passa de `headline` para `headline-wide` a partir de `sm`.
- **Title:** títulos de recipientes e estados. Subseções também usam 24–30px; títulos de etapas usam 18px semibold.
- **Body:** descrições e instruções em 16px, geralmente com entrelinha de 28px. Textos curtos podem conservar a entrelinha base de 24px.
- **Label:** botões e navegação em 14px semibold. Rótulos de formulário também aparecem em 16px semibold.
- **Caption:** atribuição da marca em 12px; ajuda e legendas predominam em 14px com entrelinha de 24px.

A home tem título próprio de 36px, ampliado para 48px em `sm`, peso 700, entrelinha 1,25 e espaçamento de letras -0,025em. É a expressão desta superfície, não o tamanho obrigatório de cada jornada. Números de ranking e pontos usam algarismos tabulares.

## Layout

O shell é centralizado, com largura máxima de 1280px, altura mínima da viewport dinâmica e rodapé após o conteúdo. As margens internas laterais passam de 16px para 24px em `sm` e 32px em `lg`; o conteúdo principal passa de 32px para 48px de respiro vertical em `sm`. Formulários e detalhe têm largura máxima de 768px; textos descritivos recorrentes usam limites de 576px ou 672px.

O ritmo parte de 4px. Gaps de 12–24px agrupam controles; 32–64px separam seções. Em `sm` (640px), linhas de formulário e missões podem ficar horizontais; em `md` (768px), o rodapé vira uma linha; em `lg` (1024px), a navegação fica aberta e a home adota duas colunas. Integrantes passam a duas colunas em `sm` e três em `xl` (1280px).

Controles recorrentes têm altura mínima de 44px. Contato usa 48px e campos com padding lateral de 12px. As áreas textuais podem crescer verticalmente. Tabela de ranking conserva rolagem horizontal dentro do recipiente. Nomes longos podem quebrar; a lista de amigos combina largura mínima zero e quebra de palavra com ações que mudam de linha. O screenshot de limite registra um apelido de 80 caracteres.

**The Largura Útil Rule.** Texto variável e ações precisam caber no recipiente disponível, inclusive na lista de amigos em viewport estreita.

## Elevation & Depth

O conteúdo em repouso é plano: fundo frio, superfície branca e borda de 1px constroem a separação. A moldura azul-marinho destaca a referência do protótipo. O aviso fixo é o único padrão recorrente com sombra: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`.

**The Superfície Plana Rule.** Recipientes de conteúdo usam cor e borda; a sombra registrada pertence ao aviso sobreposto.

## Shapes

Controles e avisos têm cantos de 12px; recipientes maiores, formulários e detalhes usam 16px; itens de navegação usam 8px. A marca A4 é um bloco de 44px com cantos de 12px. Bordas finas são contínuas, exceto o estado vazio tracejado. Não há família de ícones implementada.

## Components

### Buttons

Claros e textuais, com área de toque suficiente. O primário usa `brand`, texto branco, padding de 12px por 20px e altura mínima de 44px. No componente compartilhado, o hover muda para `ink`; desabilitado muda para os cinzas de estado. O secundário mantém fundo transparente, borda `slate-300` e ganha branco no hover. O foco visível usa contorno verde de 2px afastado 4px.

Transições de cor duram 150ms com `cubic-bezier(0.4, 0, 0.2, 1)` e são removidas com preferência por movimento reduzido nos botões compartilhados. Contato e FAQ têm uma variação local de hover verde escuro (`#066653`); ela não redefine o token compartilhado.

### Cards / Containers

Superfície branca com borda `slate-200`, cantos de 16px e padding de 24px, chegando a 32px em formulários/detalhe em `sm`. A lista de missões conserva uma linha por item e dispõe descrição, pontos e ação de forma responsiva. A lista de amigos usa cantos de 12px e padding de 20px.

### Inputs / Fields

Campos brancos, borda `slate-300`, cantos de 12px e padding de 12px por 16px no padrão operacional. Rótulos ficam acima; ajuda fica abaixo em cinza. O foco usa o mesmo contorno verde dos controles. Campos desabilitados de perfil usam opacidade de 60%; o serviço determina se a escrita foi concluída. Falhas ficam junto da ação em texto vermelho com semântica de alerta.

### Navigation

O cabeçalho branco delimita a marca e oito destinos. Itens em 14px semibold têm altura mínima de 44px e cantos de 8px. Ativo usa `brand-light` com texto `brand-strong`; hover inativo usa `paper` com texto `ink`. Abaixo de `lg`, um botão abre a lista vertical. Há link de salto e o conteúdo recebe foco quando a rota muda. Links de rodapé são sublinhados.

### Feedback de operação

Carregamento tem texto e três blocos claros com pulso de 2s, somente quando movimento é permitido. Vazio usa borda tracejada e texto centralizado. Falha usa recipiente branco com explicação e ações de recuperação aplicáveis. Informações de participação usam fundo `brand-light` e texto `brand-strong` sem implicar aprovação. O aviso de sucesso é fixo, azul-marinho, com botão textual para fechar e anúncio de status.

### Ranking e FAQ

Ranking é tabela semântica dentro de recipiente branco com cantos de 16px; cabeçalho frio, divisórias leves e pontos alinhados à direita. FAQ usa a interação nativa `details`/`summary`, com recipiente branco arredondado, pergunta semibold e resposta em cinza.

## Do's and Don'ts

### Do:
- **Do** usar os tokens de identidade de `src/styles.css` e utilitários Tailwind nos novos componentes.
- **Do** manter texto de estado, foco visível e rótulos associados aos campos.
- **Do** preservar o espaço dos controles e a quebra de texto variável em telas estreitas.
- **Do** identificar a imagem original como protótipo de referência, sem apresentá-la como conta real.
- **Do** manter a distinção entre informação de participação e confirmação retornada pelo serviço.

### Don't:
- **Don't** substituir a identidade do PDF por uma nova marca ou paleta.
- **Don't** usar UI kits, templates prontos ou dados fictícios como prova visual de integração.
- **Don't** transformar o hover local de contato/FAQ em uma alteração silenciosa do botão compartilhado.
- **Don't** aplicar a sombra do aviso como padrão de todos os recipientes.
- **Don't** transformar a composição promocional da home em requisito de layout das jornadas operacionais.
