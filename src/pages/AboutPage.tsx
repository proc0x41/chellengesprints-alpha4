const proposal = [
  {
    title: 'Missões para o dia a dia',
    description:
      'Pequenas ações sustentáveis, acompanhadas de evidências quando necessário, ajudam a transformar intenção em hábito.',
  },
  {
    title: 'Pontos e conquistas',
    description:
      'A proposta reconhece ações validadas com pontos e conquistas, tornando o progresso mais fácil de acompanhar.',
  },
  {
    title: 'Rankings por temporada',
    description:
      'Comparações globais, estaduais, entre comunidades e amigos incentivam uma competição saudável pela sustentabilidade.',
  },
  {
    title: 'Comunidades em ação',
    description:
      'Eventos de disputa territorial aproximam pessoas de uma mesma comunidade em torno de objetivos coletivos.',
  },
  {
    title: 'Recompensas com propósito',
    description:
      'Benefícios de parceiros valorizam o engajamento. A proposta prevê verificação de saldo e períodos de suspensão do resgate.',
  },
];

export function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-3">
        <p className="font-semibold text-[#087f68]">Conheça o projeto</p>
        <h1 className="text-3xl font-bold tracking-tight text-[#111c3d] sm:text-4xl">
          Uma ação de cada vez. Um impacto em comunidade.
        </h1>
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          A Alpha4 propõe um sistema de gamificação para a Soul Up, conectando hábitos sustentáveis,
          reconhecimento e participação coletiva.
        </p>
      </header>

      <section
        aria-labelledby="problem-title"
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 id="problem-title" className="text-2xl font-bold text-[#111c3d]">
          Da consciência à prática
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          Reconhecer a importância da sustentabilidade nem sempre é suficiente para manter uma
          rotina. A falta de incentivos e a sensação de que uma ação individual faz pouca diferença
          podem afastar as pessoas. Nossa proposta aproxima ações cotidianas de objetivos visíveis e
          compartilhados.
        </p>
      </section>

      <section aria-labelledby="proposal-title">
        <h2 id="proposal-title" className="text-2xl font-bold text-[#111c3d]">
          Como a proposta se conecta
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {proposal.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-[#111c3d]">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-orange-950">
        <h2 className="font-bold">Sobre esta entrega</h2>
        <p className="mt-2 leading-7">
          Projeto acadêmico da turma 1TDSPW da FIAP, baseado na proposta da Alpha4 para a Soul Up.
          Os recursos descritos nesta página representam a proposta da Sprint 3. A disponibilidade
          de operações reais depende da integração com a API Java do grupo.
        </p>
      </aside>
    </div>
  );
}
