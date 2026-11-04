import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buttonClass, ErrorState, LoadingState, PageHeader } from '../components/ui';
import { useNotice } from '../context/NoticeContext';
import { useSession } from '../context/SessionContext';
import { useRemoteData } from '../hooks/useRemoteData';
import { usePageTitle } from '../hooks/usePageTitle';
import { ApiError } from '../services/http';
import { soulUpService } from '../services/soulUp';
import { categoryLabels, statusLabels } from './MissionsPage';
import { NotFoundPage } from './NotFoundPage';

export function MissionDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  // Não presumimos IDs numéricos: o contrato do backend definirá o identificador.
  if (!id.trim() || id.length > 128)
    return (
      <NotFoundPage message="O identificador da missão é inválido. Escolha uma missão pela lista." />
    );
  return <MissionDetail key={id} id={id} />;
}

function MissionDetail({ id }: { id: string }) {
  const navigate = useNavigate();
  const { notify } = useNotice();
  const { session } = useSession();
  const load = useCallback(
    (signal: AbortSignal) => soulUpService.getMission(id, signal),
    [id, session],
  );
  const { state, retry } = useRemoteData(load);
  usePageTitle(state.status === 'success' ? state.data.title : 'Detalhes da missão');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || state.status !== 'success' || state.data.status !== 'disponivel') return;
    const evidence = text.trim();
    if (evidence.length < 10 || evidence.length > 2000) {
      setError('Descreva sua participação com 10 a 2.000 caracteres.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const receipt = await soulUpService.sendEvidence(id, { text: evidence });
      notify(receipt.message);
      navigate('/missoes', { replace: true });
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'Não foi possível enviar. Tente novamente.',
      );
      setSending(false);
    }
  }

  if (state.status === 'loading') return <LoadingState label="Carregando detalhes da missão…" />;
  if (state.status === 'error') {
    if (state.error instanceof ApiError && state.error.status === 404)
      return (
        <NotFoundPage message="Esta missão não foi encontrada. Ela pode ter sido removida ou estar indisponível." />
      );
    return (
      <>
        <PageHeader title="Detalhes da missão" />
        <ErrorState error={state.error} retry={retry} />
      </>
    );
  }
  const mission = state.data;
  return (
    <div className="max-w-3xl">
      <Link
        to="/missoes"
        className="mb-6 inline-flex min-h-11 items-center font-semibold text-brand underline underline-offset-4"
      >
        Voltar para missões
      </Link>
      <PageHeader
        title={mission.title}
        description={`${categoryLabels[mission.category]} · ${statusLabels[mission.status]} · ${mission.points.toLocaleString('pt-BR')} pontos`}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold">Sua missão</h2>
        <p className="mt-4 whitespace-pre-wrap break-words leading-8 text-slate-600">
          {mission.description}
        </p>
      </section>
      {!session ? (
        <p className="mt-6 rounded-xl bg-brand-light p-5 leading-7 text-brand">
          <Link to="/conta" className="font-semibold underline underline-offset-4">
            Crie seu perfil
          </Link>{' '}
          para registrar a participação nesta missão.
        </p>
      ) : mission.status !== 'disponivel' ? (
        <p role="status" className="mt-6 rounded-xl bg-brand-light p-5 leading-7 text-brand">
          {mission.status === 'concluida'
            ? 'Esta missão já foi concluída. Consulte a lista para encontrar outra ação.'
            : 'Sua participação está em análise. Aguarde a validação antes de enviar novamente.'}
        </p>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-5" aria-busy={sending}>
          <h2 className="text-xl font-bold">Registre sua participação</h2>
          <p className="leading-7 text-slate-600">
            {mission.requiresEvidence
              ? 'Esta missão exige evidência. Descreva a ação que você realizou.'
              : 'Conte como você participou da missão para registrar a atividade.'}{' '}
            Não inclua dados pessoais de outras pessoas.
          </p>
          <div>
            <label htmlFor="evidencia" className="block font-semibold">
              Descrição da participação
            </label>
            <textarea
              id="evidencia"
              value={text}
              onChange={(event) => setText(event.target.value)}
              minLength={10}
              maxLength={2000}
              required
              rows={6}
              disabled={sending}
              aria-invalid={Boolean(error)}
              aria-describedby="evidencia-ajuda evidencia-erro"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-4 leading-7 disabled:opacity-60"
            />
            <p id="evidencia-ajuda" className="mt-2 text-sm text-slate-600">
              De 10 a 2.000 caracteres. O envio não confirma pontos automaticamente.
            </p>
          </div>
          <p
            id="evidencia-erro"
            role={error ? 'alert' : undefined}
            className="text-sm font-semibold text-red-800"
          >
            {error}
          </p>
          <button type="submit" disabled={sending} className={buttonClass}>
            {sending ? 'Enviando participação…' : 'Enviar participação'}
          </button>
        </form>
      )}
    </div>
  );
}
