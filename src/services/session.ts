import type { Session } from '../types/domain';
import { decodeSession } from './decoders';

const key = 'alpha4-participante';
let memorySession: Session | null | undefined;

export function readSession(): Session | null {
  if (memorySession !== undefined) return memorySession;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? decodeSession(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session | null) {
  try {
    if (session) sessionStorage.setItem(key, JSON.stringify(session));
    else sessionStorage.removeItem(key);
    memorySession = undefined;
    return true;
  } catch {
    // Mesma fonte para contexto e serviço HTTP quando o browser bloqueia storage.
    memorySession = session;
    return false;
  }
}
