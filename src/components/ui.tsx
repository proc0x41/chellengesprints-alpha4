import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IntegrationPendingError } from '../services/soulUp';

export const buttonClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-ink disabled:bg-slate-200 disabled:text-slate-600 motion-reduce:transition-none';
export const secondaryButtonClass = 'inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-white motion-reduce:transition-none';

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>}
      </div>
      {children}
    </header>
  );
}

export function LoadingState({ label = 'Carregando conteúdo…' }: { label?: string }) {
  return (
    <div role="status" className="space-y-4 rounded-2xl bg-white p-6">
      <p className="text-sm text-slate-600">{label}</p>
      {[1, 2, 3].map((item) => <div key={item} className="h-16 rounded-xl bg-slate-100 motion-safe:animate-pulse" aria-hidden="true" />)}
    </div>
  );
}

export function ErrorState({ error, retry }: { error: Error; retry: () => void }) {
  const pending = error instanceof IntegrationPendingError;
  return (
    <section role={pending ? 'status' : 'alert'} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold">{pending ? 'A conexão ainda não está disponível' : 'Não foi possível carregar'}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">{error.message}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {!pending && <button type="button" onClick={retry} className={buttonClass}>Tentar novamente</button>}
        <Link to="/contato" className={secondaryButtonClass}>Falar com a equipe</Link>
      </div>
    </section>
  );
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 p-8 text-center" role="status">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">{children}</p>
    </section>
  );
}
