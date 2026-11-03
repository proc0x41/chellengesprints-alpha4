import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Início' },
  { to: '/missoes', label: 'Missões' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    const pageTitle = document.querySelector('h1')?.textContent ?? 'Soul Up';
    document.title = `${pageTitle} · Alpha4 / Soul Up`;
    if (previousPath.current !== location.pathname) {
      main.current?.focus();
      window.scrollTo(0, 0);
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a className="sr-only z-50 rounded-xl bg-white p-4 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4" href="#conteudo">Pular para o conteúdo</a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-h-11 items-center gap-3 rounded-lg" aria-label="Soul Up, Alpha4, página inicial">
            <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-base font-extrabold text-white" aria-hidden="true">A4</span>
            <span><span className="block text-xl font-bold leading-6">Soul Up</span><span className="block text-xs text-slate-600">por Alpha4</span></span>
          </Link>
          <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold lg:hidden" aria-expanded={menuOpen} aria-controls="menu-principal" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? 'Fechar menu' : 'Abrir menu'}</button>
          <nav id="menu-principal" aria-label="Navegação principal" className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 pt-4 lg:flex lg:w-auto lg:flex-row lg:pt-0`}>
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-brand-light text-brand' : 'text-slate-600 hover:bg-paper hover:text-ink'}`}>{label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="conteudo" ref={main} tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 focus:outline-none sm:px-6 sm:py-12 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 py-7 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center lg:px-8">
          <p><strong className="font-semibold text-ink">Alpha4 para a Soul Up</strong><span className="mt-1 block">FIAP · Turma 1TDSPW · Sprint 4</span></p>
          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-6 gap-y-3">
            <Link to="/sobre" className="py-2 underline underline-offset-4">Sobre o projeto</Link>
            <Link to="/faq" className="py-2 underline underline-offset-4">Perguntas frequentes</Link>
            <Link to="/contato" className="py-2 underline underline-offset-4">Fale com a equipe</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
