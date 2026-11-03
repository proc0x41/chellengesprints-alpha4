import { useCallback, useEffect, useState } from 'react';
import type { RemoteState } from '../types/domain';

// Passe uma função estável (useCallback) para evitar requisições por renderização.
export function useRemoteData<T>(load: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<RemoteState<T>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    load(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setState({ status: 'success', data });
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setState({
            status: 'error',
            error: error instanceof Error ? error : new Error('Não foi possível carregar os dados.'),
          });
        }
      },
    );
    return () => controller.abort();
  }, [load, attempt]);

  return { state, retry };
}
