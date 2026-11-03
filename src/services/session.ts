import type { Session } from '../types/domain';
import { decodeSession } from './decoders';

const key = 'alpha4-participante';

export function readSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? decodeSession(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session | null) {
  if (session) sessionStorage.setItem(key, JSON.stringify(session));
  else sessionStorage.removeItem(key);
}
