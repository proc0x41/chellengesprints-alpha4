import { Link } from 'react-router-dom';

const questions = [
  {
    question: 'O que é a Soul Up nesta proposta?',
    answer:
      'A Soul Up é apresentada no projeto como uma rede social voltada à sustentabilidade. A Alpha4 propõe adicionar gamificação para incentivar hábitos ecológicos e participação em comunidade.',
  },
  {
    question: 'Como funcionam as missões?',
    answer:
      'A proposta prevê missões diárias com ações sustentáveis e envio de evidências quando solicitado. Os pontos só devem ser creditados após a validação da ação, conforme as regras da API.',
  },
  {
    question: 'Posso concluir a mesma missão várias vezes?',
    answer:
      'O documento do projeto limita cada missão a uma conclusão por ciclo diário e prevê a expiração das missões não concluídas à meia-noite. O servidor deve definir e aplicar o ciclo válido para cada usuário.',
  },
  {
    question: 'Quais rankings fazem parte da proposta?',
    answer:
      'São quatro categorias: global, estadual, comunidade e amigos. A proposta organiza os rankings em temporadas bimestrais para renovar os desafios.',
  },
  {
    question: 'O que é a Guerra de Comunidades?',
    answer:
      'É um evento proposto de disputa territorial em que a pontuação coletiva determina o domínio de uma região. Em caso de empate técnico, o domínio atual é mantido.',
  },
  {
    question: 'Por que uma recompensa pode ficar indisponível?',
    answer:
      'Na proposta, o resgate depende de saldo suficiente e da disponibilidade da recompensa. Durante o período de suspensão chamado Countdown, o benefício não pode ser resgatado.',
  },
  {
    question: 'Por que os dados podem não aparecer?',
    answer:
      'As páginas que consultam dados reais dependem da configuração e da disponibilidade da API Java. Se houver erro, confira a mensagem da página e tente novamente. Uma falha de conexão não significa que uma operação foi concluída.',
  },
  {
    question: 'O formulário de contato envia mensagens pelo site?',
    answer:
      'Não. A página de contato prepara um e-mail para o integrante escolhido e abre seu aplicativo de e-mail. Você precisa revisar e enviar a mensagem nesse aplicativo.',
  },
];

export function FaqPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#111c3d] sm:text-4xl">
          Perguntas frequentes
        </h1>
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          Entenda a proposta da Alpha4 e saiba o que esperar das principais jornadas.
        </p>
      </header>

      <section aria-label="Respostas às perguntas frequentes" className="space-y-3">
        {questions.map((item) => (
          <details key={item.question} className="rounded-2xl border border-slate-200 bg-white">
            <summary className="cursor-pointer rounded-2xl p-5 text-base font-semibold text-[#111c3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68] sm:p-6">
              {item.question}
            </summary>
            <p className="px-5 pb-6 leading-7 text-slate-600 sm:px-6">{item.answer}</p>
          </details>
        ))}
      </section>

      <div className="rounded-2xl bg-[#f4f6fb] p-6">
        <h2 className="text-xl font-bold text-[#111c3d]">Precisa falar com a equipe?</h2>
        <p className="mt-2 leading-7 text-slate-600">
          Escolha um integrante e prepare sua mensagem na página de contato.
        </p>
        <Link className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#087f68] px-5 py-3 font-semibold text-white hover:bg-[#066653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68]" to="/contato">
          Entrar em contato
        </Link>
      </div>
    </div>
  );
}
