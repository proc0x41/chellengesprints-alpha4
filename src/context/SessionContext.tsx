import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { readSession, saveSession } from '../services/session';
import type { Session } from '../types/domain';

interface SessionContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, updateSession] = useState(readSession);
  function setSession(value: Session | null) {
    saveSession(value);
    updateSession(value);
  }
  return (
    <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession deve ser usado dentro de SessionProvider.');
  return context;
}
