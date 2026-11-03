import { useState } from 'react';
import type { FormEvent } from 'react';
import { buttonClass, PageHeader, secondaryButtonClass } from '../components/ui';
import { useNotice } from '../context/NoticeContext';
import { useSession } from '../context/SessionContext';
import { states } from '../data/states';
import { participantService } from '../services/soulUp';

const inputClass = 'mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 disabled:opacity-60';

export function AccountPage() {
  const { session, setSession } = useSession();
  const { notify } = useNotice();
  const [name, setName] = useState(session?.participant.name ?? '');
  const [uf, setUf] = useState(session?.participant.uf ?? '');
  const [community, setCommunity] = useState(session?.participant.community ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const input = { name: name.trim(), uf, community: community.trim() };
      if (session) {
        const participant = await participantService.update(input);
        setSession({ ...session, participant });
        notify('Seu perfil foi atualizado.');
      } else {
        setSession(await participantService.create(input));
        notify('Perfil criado. Você já pode registrar sua participação nas missões.');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível salvar o perfil.');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await participantService.remove();
      setSession(null);
      setName('');
      setUf('');
      setCommunity('');
      setConfirmDelete(false);
      notify('Seu perfil foi excluído do serviço.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível excluir o perfil.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title={session ? 'Seu perfil de participação' : 'Comece a participar'} description="Use um apelido para registrar suas missões e acompanhar os rankings da Soul Up." />
      <p className="mb-7 rounded-xl bg-amber-100 p-5 text-sm leading-6 text-amber-950">Este perfil usa uma sessão temporária nesta aba. Ao encerrá-la, você perde o acesso ao perfil; os registros no serviço permanecem até a exclusão. Não use informações sensíveis. Esta versão não oferece recuperação de acesso.</p>
      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-busy={busy}>
        <div><label htmlFor="apelido" className="font-semibold">Apelido</label><input id="apelido" name="nickname" autoComplete="nickname" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} maxLength={80} disabled={busy} className={inputClass} /><p className="mt-2 text-sm leading-6 text-slate-600">O apelido poderá aparecer nos rankings. De 2 a 80 caracteres.</p></div>
        <div><label htmlFor="uf" className="font-semibold">Estado</label><select id="uf" name="state" value={uf} onChange={(event) => setUf(event.target.value)} required disabled={busy} className={inputClass}><option value="">Selecione seu estado</option>{states.map((state) => <option key={state} value={state}>{state}</option>)}</select></div>
        <div><label htmlFor="comunidade" className="font-semibold">Comunidade</label><input id="comunidade" name="community" value={community} onChange={(event) => setCommunity(event.target.value)} maxLength={80} disabled={busy} className={inputClass} /><p className="mt-2 text-sm leading-6 text-slate-600">Opcional. Combine o mesmo nome com seu grupo para acompanhar o ranking da comunidade.</p></div>
        {error && <p role="alert" className="text-sm font-semibold text-red-800">{error}</p>}
        <button type="submit" disabled={busy} className={buttonClass}>{busy ? 'Salvando…' : session ? 'Salvar alterações' : 'Criar perfil'}</button>
      </form>
      {session && <section className="mt-8 space-y-5"><h2 className="text-xl font-bold">Gerenciar perfil</h2><p className="break-all text-sm leading-6 text-slate-600">Código para compartilhar com amigos: <strong className="font-medium text-ink">{session.participant.id}</strong></p><button type="button" disabled={busy} className={secondaryButtonClass} onClick={() => setConfirmDelete((value) => !value)}>Excluir perfil</button>{confirmDelete && <div className="rounded-xl border border-red-200 bg-red-50 p-5"><p className="leading-7 text-red-950">A exclusão remove seu perfil e seus registros de participação. Esta ação não pode ser desfeita.</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={busy} onClick={remove} className="min-h-11 rounded-xl bg-red-800 px-5 py-3 text-sm font-semibold text-white hover:bg-red-950 disabled:opacity-60">{busy ? 'Excluindo…' : 'Confirmar exclusão'}</button><button type="button" disabled={busy} onClick={() => setConfirmDelete(false)} className={secondaryButtonClass}>Cancelar</button></div></div>}</section>}
    </div>
  );
}
