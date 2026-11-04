import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, requestJson } from './http';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('requestJson', () => {
  it('envia JSON e preserva cabeçalhos fornecidos pelo chamador', async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ id: '1' }, { status: 201 }));
    vi.stubGlobal('fetch', fetch);
    await expect(
      requestJson('https://api.example.test/missoes', {
        method: 'POST',
        body: { title: 'Teste' },
        headers: { Authorization: 'Bearer teste' },
      }),
    ).resolves.toEqual({ id: '1' });
    const options = fetch.mock.calls[0]?.[1] as RequestInit;
    expect(options.body).toBe('{"title":"Teste"}');
    expect(new Headers(options.headers).get('Authorization')).toBe('Bearer teste');
    expect(new Headers(options.headers).get('Content-Type')).toBe('application/json');
  });

  it('aceita exclusão sem corpo de resposta', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 204 })));
    await expect(requestJson('/api/missoes/1', { method: 'DELETE' })).resolves.toBeNull();
  });

  it.each([401, 403, 404, 500])(
    'preserva status HTTP %s e não expõe detalhes internos',
    async (status) => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('segredo do servidor', { status })),
      );
      try {
        await requestJson('/api/missoes');
        expect.fail('A requisição deveria ter falhado.');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(status);
        expect((error as Error).message).not.toContain('segredo');
      }
    },
  );

  it('distingue JSON inválido de indisponibilidade de rede', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('não é json')));
    await expect(requestJson('/api')).rejects.toThrow('resposta inválida');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(requestJson('/api')).rejects.toThrow('Verifique sua conexão');
  });

  it('interrompe a requisição quando o prazo se encerra', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url, { signal }: RequestInit) =>
          new Promise((_resolve, reject) => {
            signal?.addEventListener('abort', () =>
              reject(new DOMException('Abortado', 'AbortError')),
            );
          }),
      ),
    );
    const result = expect(requestJson('/api', { timeoutMs: 50 })).rejects.toThrow('demorou');
    await vi.advanceTimersByTimeAsync(50);
    await result;
  });

  it('preserva o cancelamento do chamador', async () => {
    const controller = new AbortController();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url, { signal }: RequestInit) =>
          new Promise((_resolve, reject) => {
            signal?.addEventListener('abort', () =>
              reject(new DOMException('Abortado', 'AbortError')),
            );
          }),
      ),
    );
    const result = expect(requestJson('/api', { signal: controller.signal })).rejects.toMatchObject(
      { name: 'AbortError' },
    );
    controller.abort();
    await result;
  });
});
