# Demonstração da Sprint 4

Foi produzida uma gravação local de **1 minuto e 35,2 segundos**, com legendas
explicativas e sem narração, em 1280 × 900 px. Ela apresenta tecnologias,
navegação, cadastro, listagem, detalhe, evidência, aprovação real no serviço,
ranking, atualização e exclusão de perfil. O perfil é de demonstração e seus
registros são removidos ao final.

O arquivo foi salvo fora do ZIP de fontes, em
`../entregas/frontend/alpha4-demonstracao-local.webm`. Foram conferidos duração,
resolução e quadros da abertura, envio de evidência e navegação.

Essa gravação demonstra a integração **local**. A entrega final ainda exige
frontend/API em nuvem, vídeo publicado no YouTube e URL no README. Depois da
publicação dos serviços, o roteiro pode ser reexecutado sobre as URLs públicas.

## Regravar

O script usa a aplicação e a API reais e injeta legendas apenas na gravação,
sem alterar o código visual do produto. Requer Chromium do Playwright e um
ambiente de demonstração cujo administrador autorize a aprovação de teste.

```powershell
$env:DEMO_SITE_URL='http://127.0.0.1:5173'
$env:DEMO_API_URL='http://localhost:8080/api'
$env:DEMO_ADMIN_KEY_FILE='C:/caminho/local/chave-de-teste.txt'
node scripts/record-demo.mjs
```

O arquivo da chave não deve ser versionado nem aparecer na gravação. O script
não exibe o token pessoal ou a chave administrativa. Confira o vídeo inteiro
antes de publicá-lo e não substitua o link da Sprint 4 pelo pitch da Sprint 3.
