import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Session } from '../types/domain';
import { readSession, saveSession } from './session';
import { participantHeaders } from './soulUp';

const session: Session = {
  participant: { id: 'perfil-teste', name: 'Teste', uf: 'SP', community: '' },
  token: 'token-teste',
};

afterEach(() => {
  vi.restoreAllMocks();
  saveSession(null);
});

describe('Sessão com armazenamento indisponível', () => {
  it('mantém o mesmo perfil no contexto e nas requisições quando a gravação é bloqueada', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Bloqueado', 'SecurityError');
    });
    expect(saveSession(session)).toBe(false);
    expect(readSession()).toEqual(session);
    expect(participantHeaders(true)).toEqual({ Authorization: 'Bearer token-teste' });
  });

  it('descarta o acesso mesmo se o browser bloquear a remoção', () => {
    saveSession(session);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('Bloqueado', 'SecurityError');
    });
    expect(saveSession(null)).toBe(false);
    expect(readSession()).toBeNull();
    expect(participantHeaders()).toEqual({});
  });

  it('ignora sessão persistida malformada', () => {
    sessionStorage.setItem('alpha4-participante', '{json-invalido');
    expect(readSession()).toBeNull();
  });
});
