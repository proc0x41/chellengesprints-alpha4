# Versionamento

O repositório usa `main` para versões estáveis, `develop` para integração e
`feature/*` para desenvolvimento. Uma versão só deve ser promovida depois das
verificações de código, integração, publicação e requisitos de entrega.

```bash
git switch develop
git switch -c feature/nome-da-alteracao
# implementar e conferir a alteração
git add caminho/do/arquivo
git commit -m "feat: descrever a alteração em português"
git switch develop
git merge --no-ff feature/nome-da-alteracao
```

Para uma entrega validada, criar `release/*` a partir de `develop`, concluir
os ajustes de documentação, mesclar em `main` e retornar os ajustes para
`develop`. Correções urgentes partem de `hotfix/*` sobre `main`.

As identidades são configuradas exclusivamente com `git config --local`, com
nome completo e e-mail `{rm}@fiap.com.br`, em rodízio entre os cinco integrantes.
As mensagens seguem Conventional Commits em português e cada commit registra
uma alteração concreta. O mínimo é cinco commits relevantes por integrante.

## Conferência do histórico

```bash
git shortlog -sne --all --no-merges
git log --format="%h %an <%ae> %s" --no-merges
git log --graph --oneline --all
```

O rodízio de metadados foi solicitado pelo responsável pela entrega e realizado
durante a assistência de programação. Ele não comprova, por si só, revisão ou
trabalho manual individual. A equipe deve revisar e compreender o código antes
da apresentação e manter o registro do uso de IA.
