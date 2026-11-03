import type { EvidenceInput, EvidenceReceipt, Mission, ParticipantInput, Ranking, RankingScope } from '../types/domain';
import { decodeMission, decodeMissions, decodeParticipant, decodeRanking, decodeSession, record, text } from './decoders';
import { ApiError, requestJson } from './http';
import { readSession } from './session';

export class IntegrationPendingError extends Error {
  constructor() {
    super('O endereço do serviço ainda não foi configurado nesta versão. Entre em contato com a equipe para acompanhar a disponibilidade.');
    this.name = 'IntegrationPendingError';
  }
}

// Contrato compartilhado com o projeto Java independente (docs/API.md).
export interface SoulUpService {
  listMissions(signal: AbortSignal): Promise<Mission[]>;
  getMission(id: string, signal: AbortSignal): Promise<Mission>;
  sendEvidence(id: string, input: EvidenceInput): Promise<EvidenceReceipt>;
  getRanking(scope: RankingScope, signal: AbortSignal): Promise<Ranking>;
}

export function apiUrl(path: string) {
  const base = import.meta.env.VITE_API_URL?.trim();
  if (!base) throw new IntegrationPendingError();
  let url: URL;
  try { url = new URL(base); } catch { throw new ApiError('O endereço do serviço está inválido. Entre em contato com a equipe.'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new ApiError('O endereço do serviço está inválido. Entre em contato com a equipe.');
  }
  return `${url.toString().replace(/\/$/, '')}${path}`;
}

export function participantHeaders(required = false): HeadersInit {
  const session = readSession();
  if (required && !session) throw new ApiError('Crie seu perfil de participação para continuar.', 401);
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

export const soulUpService: SoulUpService = {
  async listMissions(signal) {
    return decodeMissions(await requestJson(apiUrl('/missoes'), { signal, headers: participantHeaders() }));
  },
  async getMission(id, signal) {
    return decodeMission(await requestJson(apiUrl(`/missoes/${encodeURIComponent(id)}`), { signal, headers: participantHeaders() }));
  },
  async sendEvidence(id, input) {
    const result = record(await requestJson(apiUrl(`/missoes/${encodeURIComponent(id)}/evidencias`), { method: 'POST', body: input, headers: participantHeaders(true) }));
    return { message: text(result.message) };
  },
  async getRanking(scope, signal) {
    return decodeRanking(await requestJson(apiUrl(`/ranking?scope=${scope}`), { signal, headers: participantHeaders(scope !== 'global') }));
  },
};

export const participantService = {
  async create(input: ParticipantInput) {
    return decodeSession(await requestJson(apiUrl('/participantes'), { method: 'POST', body: input }));
  },
  async update(input: ParticipantInput) {
    return decodeParticipant(await requestJson(apiUrl('/participantes/me'), { method: 'PUT', body: input, headers: participantHeaders(true) }));
  },
  async remove() {
    await requestJson(apiUrl('/participantes/me'), { method: 'DELETE', headers: participantHeaders(true) });
  },
};
