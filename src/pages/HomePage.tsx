import { Link } from 'react-router-dom';
import { buttonClass, secondaryButtonClass } from '../components/ui';

export function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Pequenas ações.
            <br />
            Hábitos que ficam.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Uma proposta de gamificação para transformar atitudes sustentáveis em missões,
            conquistas e participação em comunidade.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/missoes" className={buttonClass}>
              Explorar missões
            </Link>
            <Link to="/ranking" className={secondaryButtonClass}>
              Acompanhar ranking
            </Link>
          </div>
          <p className="mt-6 max-w-xl rounded-xl bg-brand-light p-4 text-sm leading-6 text-brand">
            Crie seu perfil para registrar a participação nas missões. Os pontos são creditados após
            a validação da ação.
          </p>
        </div>
        <figure className="m-0 rounded-2xl bg-ink p-6 sm:p-8">
          <img
            src="/images/missoes-sprint3.png"
            alt="Protótipo da Sprint 3 com missões diárias, sequência de participação e acesso ao ranking."
            className="mx-auto h-80 max-w-full object-contain sm:h-96"
            width={919}
            height={1839}
          />
          <figcaption className="mt-5 text-center text-sm leading-6 text-slate-200">
            Missões de Hoje · protótipo original da Alpha4, Sprint 3.
            <br />
            Imagem de referência, sem dados de uma conta real.
          </figcaption>
        </figure>
      </section>
      <section className="grid gap-6 border-t border-slate-200 pt-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Da intenção à ação</h2>
          <p className="mt-4 max-w-lg leading-7 text-slate-600">
            O projeto aproxima sustentabilidade e rotina. Cada etapa dá um propósito claro à
            participação.
          </p>
          <Link
            to="/sobre"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4"
          >
            Entenda a proposta
          </Link>
        </div>
        <ol className="space-y-7">
          <li className="grid grid-cols-[2.75rem_1fr] gap-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light font-bold text-brand">
              1
            </span>
            <div>
              <h3 className="text-lg font-semibold">Escolha uma missão</h3>
              <p className="mt-1 leading-7 text-slate-600">
                Conheça a ação proposta e o que é necessário para participar.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[2.75rem_1fr] gap-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light font-bold text-brand">
              2
            </span>
            <div>
              <h3 className="text-lg font-semibold">Registre sua atitude</h3>
              <p className="mt-1 leading-7 text-slate-600">
                Envie a evidência solicitada para validação pelo serviço responsável.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[2.75rem_1fr] gap-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand-light font-bold text-brand">
              3
            </span>
            <div>
              <h3 className="text-lg font-semibold">Construa constância</h3>
              <p className="mt-1 leading-7 text-slate-600">
                Acompanhe missões, pontos e a participação coletiva no ranking.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}
