import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useNotice } from '../context/NoticeContext';
import { useRemoteData } from '../hooks/useRemoteData';
import { friendsService } from '../services/soulUp';
import { buttonClass, EmptyState, ErrorState, LoadingState, secondaryButtonClass } from './ui';

export function FriendsPanel() {
  const { notify } = useNotice();
  const [friendId, setFriendId] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const load = useCallback((signal: AbortSignal) => friendsService.list(signal), []);
  const { state, retry } = useRemoteData(load);

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await friendsService.add(friendId.trim());
      setFriendId('');
      retry();
      notify('Perfil adicionado à sua lista de acompanhamento.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível acompanhar este perfil.');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await friendsService.remove(id);
      retry();
      notify('Você deixou de acompanhar este perfil.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível remover este perfil.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-10 space-y-5" aria-labelledby="amigos-titulo">
      <h2 id="amigos-titulo" className="text-xl font-bold">
        Acompanhe seus amigos
      </h2>
      <p className="leading-7 text-slate-600">
        Peça a um amigo o código que aparece no perfil dele. Sua lista de acompanhamento define quem
        aparece no ranking de amigos; o acompanhamento não precisa ser mútuo.
      </p>
      <form onSubmit={add} className="space-y-3">
        <label htmlFor="amigo" className="font-semibold">
          Código do perfil do amigo
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="amigo"
            value={friendId}
            onChange={(event) => setFriendId(event.target.value)}
            required
            maxLength={128}
            disabled={busy}
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3"
          />
          <button type="submit" disabled={busy} className={buttonClass}>
            {busy ? 'Atualizando…' : 'Acompanhar perfil'}
          </button>
        </div>
      </form>
      {error && (
        <p role="alert" className="text-sm font-semibold text-red-800">
          {error}
        </p>
      )}
      {state.status === 'loading' && <LoadingState label="Carregando perfis acompanhados…" />}
      {state.status === 'error' && <ErrorState error={state.error} retry={retry} />}
      {state.status === 'success' &&
        (state.data.length === 0 ? (
          <EmptyState title="Sua lista está vazia">
            Adicione o código de um amigo para acompanhar a participação dele.
          </EmptyState>
        ) : (
          <ul className="space-y-3">
            {state.data.map((friend) => (
              <li
                key={friend.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-5"
              >
                <p className="min-w-0 max-w-full break-words font-semibold">{friend.name}</p>
                <button
                  type="button"
                  className={secondaryButtonClass}
                  disabled={busy}
                  onClick={() => remove(friend.id)}
                  aria-label={`Deixar de acompanhar ${friend.name}`}
                >
                  Deixar de acompanhar
                </button>
              </li>
            ))}
          </ul>
        ))}
      <Link
        to="/ranking"
        className="inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4"
      >
        Ir para o ranking
      </Link>
    </section>
  );
}
