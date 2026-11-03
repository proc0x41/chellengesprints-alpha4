import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { buttonClass, EmptyState, ErrorState, LoadingState, PageHeader } from '../components/ui';
import { useRemoteData } from '../hooks/useRemoteData';
import { useSession } from '../context/SessionContext';
import { soulUpService } from '../services/soulUp';
import type { MissionCategory } from '../types/domain';

export const categoryLabels: Record<MissionCategory, string> = {
  ambiental: 'Ambiental',
  social: 'Social',
  governanca: 'Governança',
};

export const statusLabels = {
  disponivel: 'Disponível',
  'em-analise': 'Em análise',
  concluida: 'Concluída',
};

export function MissionsPage() {
  const { session } = useSession();
  const [category, setCategory] = useState<MissionCategory | 'todas'>('todas');
  const load = useCallback((signal: AbortSignal) => soulUpService.listMissions(signal), [session]);
  const { state, retry } = useRemoteData(load);
  const missions = useMemo(() => state.status === 'success'
    ? state.data.filter((mission) => category === 'todas' || mission.category === category)
    : [], [state, category]);

  return (
    <div>
      <PageHeader title="Missões de hoje" description="Escolha uma ação sustentável, consulte as orientações e registre sua participação.">
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="categoria">Categoria
          <select id="categoria" value={category} onChange={(event) => setCategory(event.target.value as MissionCategory | 'todas')} className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-3">
            <option value="todas">Todas as categorias</option>
            {Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </PageHeader>
      {state.status === 'loading' && <LoadingState label="Carregando missões…" />}
      {state.status === 'error' && <ErrorState error={state.error} retry={retry} />}
      {state.status === 'success' && (missions.length === 0
        ? <EmptyState title="Nenhuma missão por aqui">Não há missões disponíveis nesta categoria. Consulte as outras categorias ou volte mais tarde.</EmptyState>
        : <ul className="space-y-4" aria-label="Missões disponíveis">
          {missions.map((mission) => <li key={mission.id} className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 max-w-2xl"><p className="text-sm font-semibold text-brand">{categoryLabels[mission.category]} · {statusLabels[mission.status]}</p><h2 className="mt-2 break-words text-xl font-bold">{mission.title}</h2><p className="mt-2 line-clamp-2 leading-7 text-slate-600">{mission.description}</p></div>
            <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end"><p className="font-bold tabular-nums">{mission.points.toLocaleString('pt-BR')} pontos</p><Link to={`/missoes/${encodeURIComponent(mission.id)}`} className={buttonClass} aria-label={`Ver missão: ${mission.title}`}>Ver missão</Link></div>
          </li>)}
        </ul>)}
      <aside className="mt-8 max-w-3xl text-sm leading-6 text-slate-600">Os pontos dependem da validação da participação pelo serviço. Consulte os requisitos e a disponibilidade de cada missão antes de enviar sua evidência.</aside>
    </div>
  );
}
