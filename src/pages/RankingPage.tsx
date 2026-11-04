import { useCallback, useState } from 'react';
import { EmptyState, ErrorState, LoadingState, PageHeader } from '../components/ui';
import { useRemoteData } from '../hooks/useRemoteData';
import { useSession } from '../context/SessionContext';
import { soulUpService } from '../services/soulUp';
import type { RankingScope } from '../types/domain';

const scopes: { value: RankingScope; label: string }[] = [
  { value: 'global', label: 'Global' },
  { value: 'estadual', label: 'Estadual' },
  { value: 'comunidade', label: 'Comunidade' },
  { value: 'amigos', label: 'Amigos' },
];

export function RankingPage() {
  const { session } = useSession();
  const [scope, setScope] = useState<RankingScope>('global');
  const load = useCallback(
    (signal: AbortSignal) => soulUpService.getRanking(scope, signal),
    [scope, session],
  );
  const { state, retry } = useRemoteData(load);
  return (
    <div>
      <PageHeader
        title="Ranking da comunidade"
        description="Acompanhe a participação nas ações sustentáveis e a pontuação da temporada."
      >
        <label htmlFor="abrangencia" className="flex flex-col gap-2 text-sm font-semibold">
          Abrangência
          <select
            id="abrangencia"
            value={scope}
            onChange={(event) => setScope(event.target.value as RankingScope)}
            className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            {scopes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </PageHeader>
      {state.status === 'loading' && <LoadingState label="Carregando ranking…" />}
      {state.status === 'error' && <ErrorState error={state.error} retry={retry} />}
      {state.status === 'success' &&
        (state.data.entries.length === 0 ? (
          <EmptyState title="A temporada está começando">
            Ainda não há participantes neste ranking. A pontuação aparecerá após a validação das
            missões.
          </EmptyState>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <h2 className="border-b border-slate-200 px-5 py-5 text-lg font-bold sm:px-7">
              Temporada {state.data.season}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Ranking {scopes.find((item) => item.value === scope)?.label}, temporada{' '}
                  {state.data.season}
                </caption>
                <thead className="bg-paper text-sm text-slate-600">
                  <tr>
                    <th scope="col" className="px-4 py-4 sm:px-7">
                      Posição
                    </th>
                    <th scope="col" className="px-4 py-4 sm:px-7">
                      Participante
                    </th>
                    <th scope="col" className="px-4 py-4 text-right sm:px-7">
                      Pontos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.entries.map((entry) => (
                    <tr key={entry.id} className="border-t border-slate-100">
                      <td className="px-4 py-5 font-semibold tabular-nums sm:px-7">
                        {entry.position}º
                      </td>
                      <th
                        scope="row"
                        className="max-w-64 break-words px-4 py-5 font-medium sm:px-7"
                      >
                        {entry.name}
                      </th>
                      <td className="px-4 py-5 text-right font-bold tabular-nums sm:px-7">
                        {entry.points.toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-600">
        A proposta prevê temporadas bimestrais e rankings global, estadual, de comunidade e de
        amigos. Disponibilidade e pontuação dependem do serviço da Soul Up.
      </p>
    </div>
  );
}
