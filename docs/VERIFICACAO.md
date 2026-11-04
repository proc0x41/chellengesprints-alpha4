# Verificação local da Sprint 4

As evidências abaixo se referem ao código e à integração **locais**. Não
comprovam publicação pública, preenchimento de perfis ou envio ao portal.

- `npm run build`: TypeScript estrito e bundle Vite concluídos.
- `npm test`: 29 testes aprovados após correções das revisões.
- Playwright: seis verificações de navegação e layout, em 360, 480, 768, 992 e
  1440 px, além de uma jornada real integrada ao Spring Boot.
- A jornada real cria perfil e missão de teste, consulta detalhe, envia evidência,
  confirma análise, aprova pelo serviço administrativo, confere ranking,
  atualiza perfil e exclui seus registros. Aprovação repetida retorna 409.
- A regressão de amigos usa nome válido de 80 caracteres sem espaços, verifica
  largura do documento em 390 px e exercita adicionar/remover acompanhamento.
- Capturas reais disponíveis em `docs/screenshots/`, incluindo tablet 768 px.
- Detector mecânico da skill Impeccable retornou lista vazia; não substitui
  a revisão visual e funcional independente.

## Revisões independentes

Revisão técnica identificou e levou à correção de limites de cadastro,
recuperação de sessão inválida e falha no armazenamento do navegador após
operações confirmadas. A sessão agora possui fallback compartilhado em memória
e opção explícita de descarte local. Foram acrescentados testes de regressão.

Revisão final visual/funcional conferiu oito capturas, compilação, 29 testes e
sete testes em navegador. Encontrou transbordamento em nome longo de amigo;
após correção, a reprodução independente confirmou documento e viewport com
390 px, e o achado foi classificado como resolvido. O aceite foi dado apenas
ao **escopo local**.

A verificação numérica de contraste identificou 4,418:1 no verde sobre fundo
verde claro. Texto nessas superfícies passou a usar `brand-strong`, mantendo
o verde dos botões. O revisor confirmou no DOM a nova combinação em 6,185:1,
e branco sobre botão continua em 4,946:1, ambos adequados para texto normal.

## Pendências para a entrega completa

- Publicar frontend na Vercel e Java em serviço com banco persistente.
- Conferir integração pela URL pública, inclusive acesso direto às rotas.
- Preencher URLs reais de frontend, API e vídeo no README.
- Fornecer fotos e links individuais de GitHub e LinkedIn de todos.
- Publicar vídeo funcional da Sprint 4 com até três minutos no YouTube.
- Gerar/revalidar ZIP final e submetê-lo exclusivamente no Portal do Aluno.
