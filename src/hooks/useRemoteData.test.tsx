import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useRemoteData } from './useRemoteData';

describe('useRemoteData', () => {
  it('permite recuperar uma falha sem recarregar a página', async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error('Indisponível')).mockResolvedValueOnce(['recuperado']);
    const { result } = renderHook(() => useRemoteData<string[]>(load));
    await waitFor(() => expect(result.current.state.status).toBe('error'));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.state).toEqual({ status: 'success', data: ['recuperado'] }));
  });

  it('ignora a resposta antiga quando uma nova consulta começa', async () => {
    let resolveOld!: (value: string) => void;
    const oldLoad = vi.fn((_signal: AbortSignal) => new Promise<string>((resolve) => { resolveOld = resolve; }));
    const newLoad = vi.fn().mockResolvedValue('novo');
    const { result, rerender } = renderHook(({ load }) => useRemoteData(load), { initialProps: { load: oldLoad } });
    rerender({ load: newLoad });
    await waitFor(() => expect(result.current.state).toEqual({ status: 'success', data: 'novo' }));
    await act(async () => resolveOld('antigo'));
    expect(result.current.state).toEqual({ status: 'success', data: 'novo' });
    expect(oldLoad.mock.calls[0]?.[0].aborted).toBe(true);
  });

  it('cancela consultas ao desmontar o componente', () => {
    const load = vi.fn((_signal: AbortSignal) => new Promise<string>(() => {}));
    const { unmount } = renderHook(() => useRemoteData(load));
    unmount();
    expect(load.mock.calls[0]?.[0].aborted).toBe(true);
  });
});
