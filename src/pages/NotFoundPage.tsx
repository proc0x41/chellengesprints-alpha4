import { Link } from 'react-router-dom';
import { buttonClass, secondaryButtonClass } from '../components/ui';

export function NotFoundPage({ message = 'Este endereço não corresponde a uma página da Soul Up.' }: { message?: string }) {
  return (
    <section className="mx-auto max-w-2xl py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Não encontramos esta página</h1>
      <p className="mt-4 leading-7 text-slate-600">{message}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link to="/" className={buttonClass}>Voltar ao início</Link>
        <Link to="/missoes" className={secondaryButtonClass}>Ver missões</Link>
      </div>
    </section>
  );
}
