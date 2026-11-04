export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  timeoutMs?: number;
}

// T é definido apenas depois da validação do JSON pelo adapter do backend.
export async function requestJson(
  url: string,
  { body, timeoutMs = 15000, signal, ...options }: RequestOptions = {},
): Promise<unknown> {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), timeoutMs);
  const combinedSignal = signal ? AbortSignal.any([signal, timeout.signal]) : timeout.signal;
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (body !== undefined) headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: combinedSignal,
    });
    if (!response.ok) {
      let businessMessage: string | undefined;
      if ([400, 409, 422, 429].includes(response.status)) {
        try {
          const data: unknown = await response.json();
          if (
            data &&
            typeof data === 'object' &&
            'message' in data &&
            typeof data.message === 'string' &&
            data.message.length <= 500
          )
            businessMessage = data.message;
        } catch {
          /* Respostas não JSON usam a mensagem segura abaixo. */
        }
      }
      const message =
        response.status === 404
          ? 'O conteúdo solicitado não foi encontrado.'
          : response.status === 401 || response.status === 403
            ? 'Você não tem acesso a esta operação. Verifique sua sessão.'
            : 'O serviço não conseguiu concluir a operação. Tente novamente.';
      throw new ApiError(businessMessage || message, response.status);
    }
    if (response.status === 204) return null;
    try {
      const content = await response.text();
      return content.trim() ? (JSON.parse(content) as unknown) : null;
    } catch {
      throw new ApiError('O serviço retornou uma resposta inválida. Tente novamente.');
    }
  } catch (error) {
    if (signal?.aborted) throw error;
    if (timeout.signal.aborted) {
      throw new ApiError('O serviço demorou para responder. Tente novamente.');
    }
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      'Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.',
    );
  } finally {
    clearTimeout(timer);
  }
}
