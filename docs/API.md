# Integração Java

O projeto Java é separado do frontend. A base configurada em `VITE_API_URL`
deve incluir `/api`. O adapter está em `src/services/soulUp.ts` e as respostas
são validadas em `src/services/decoders.ts` antes de chegar à interface.

## Contrato compartilhado

| Método | Recurso                                       | Uso no frontend                                           |
| ------ | --------------------------------------------- | --------------------------------------------------------- |
| GET    | `/missoes`                                    | Lista de missões; Bearer opcional para estado individual  |
| GET    | `/missoes/{id}`                               | Detalhe com o identificador da rota                       |
| POST   | `/missoes/{id}/evidencias`                    | `{ "text": "descrição da participação" }`; exige Bearer   |
| GET    | `/ranking?scope=global`                       | Ranking global                                            |
| GET    | `/ranking?scope=estadual\|comunidade\|amigos` | Rankings pessoais; exigem Bearer                          |
| POST   | `/participantes`                              | `{ "name": "apelido", "uf": "SP", "community": "grupo" }` |
| PUT    | `/participantes/me`                           | Atualiza o próprio perfil; exige Bearer                   |
| DELETE | `/participantes/me`                           | Exclui o próprio perfil; exige Bearer                     |
| GET    | `/amigos`                                     | Lista de perfis acompanhados                              |
| POST   | `/amigos/{id}`                                | Acompanha um perfil pelo código compartilhado             |
| DELETE | `/amigos/{id}`                                | Remove acompanhamento                                     |

`Mission`: `{ id, title, description, category, points, requiresEvidence, status }`.
Categorias: `ambiental`, `social`, `governanca`. Estados: `disponivel`,
`em-analise`, `concluida`. Pontos são inteiros não negativos.

`Ranking`: `{ scope, season, entries: [{ id, position, name, points }] }`.

Criação de perfil retorna `{ participant: { id, name, uf, community }, token }`.
O token é usado no cabeçalho `Authorization: Bearer ...`, sem chave administrativa
no cliente. O banco armazena o hash do token, conforme implementação Java.

Um envio de evidência confirma apenas o recebimento para análise. A interface
não adiciona pontos por conta própria. O backend aplica validação, moderação,
ciclo diário e pontuação da temporada.

## Falhas

Ausência de configuração, falha de rede, tempo limite, status HTTP e dados fora
do contrato geram estados distintos ou mensagens de recuperação. Navegar para
outra consulta cancela a requisição anterior; uma resposta antiga não deve
substituir a mais recente. Não há fallback com dados fictícios.

## Publicação

Em produção, configure uma URL HTTPS pública e autorize a origem Vercel no
CORS do Java. Testes locais e respostas simuladas em testes de componentes
não comprovam publicação nem integração remota. Os links públicos precisam
ser verificados e registrados no README antes da entrega.
