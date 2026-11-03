import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface NoticeContextValue {
  notify: (message: string) => void;
}

const NoticeContext = createContext<NoticeContextValue | null>(null);

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  return (
    <NoticeContext.Provider value={{ notify: setMessage }}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-30 mx-auto max-w-xl" role="status" aria-live="polite" aria-atomic="true">
        {message && (
          <div className="flex items-start justify-between gap-4 rounded-xl bg-ink p-5 text-white shadow-lg">
            <p className="leading-6">{message}</p>
            <button className="min-h-11 shrink-0 rounded-lg px-2 underline underline-offset-4 focus-visible:outline-white" onClick={() => setMessage('')} type="button" aria-label="Fechar aviso">Fechar</button>
          </div>
        )}
      </div>
    </NoticeContext.Provider>
  );
}

export function useNotice() {
  const context = useContext(NoticeContext);
  if (!context) throw new Error('useNotice deve ser usado dentro de NoticeProvider.');
  return context;
}
