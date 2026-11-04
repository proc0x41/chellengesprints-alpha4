import type { Mission, Participant, Ranking, Session } from '../types/domain';
import { ApiError } from './http';

function invalid(): never {
  throw new ApiError('O serviço retornou dados em um formato inesperado. Tente novamente.');
}

export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return invalid();
  return value as Record<string, unknown>;
}

export function text(value: unknown): string {
  return typeof value === 'string' && value.trim() ? value : invalid();
}

function nonNegativeInteger(value: unknown): number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : invalid();
}

export function decodeMission(value: unknown): Mission {
  const data = record(value);
  if (
    !['ambiental', 'social', 'governanca'].includes(String(data.category)) ||
    !['disponivel', 'em-analise', 'concluida'].includes(String(data.status)) ||
    typeof data.requiresEvidence !== 'boolean'
  )
    return invalid();
  return {
    id: text(data.id),
    title: text(data.title),
    description: text(data.description),
    category: data.category as Mission['category'],
    status: data.status as Mission['status'],
    points: nonNegativeInteger(data.points),
    requiresEvidence: data.requiresEvidence,
  };
}

export function decodeMissions(value: unknown): Mission[] {
  if (!Array.isArray(value)) return invalid();
  return value.map(decodeMission);
}

export function decodeRanking(value: unknown): Ranking {
  const data = record(value);
  if (
    !['global', 'estadual', 'comunidade', 'amigos'].includes(String(data.scope)) ||
    !Array.isArray(data.entries)
  )
    return invalid();
  return {
    scope: data.scope as Ranking['scope'],
    season: text(data.season),
    entries: data.entries.map((item) => {
      const entry = record(item);
      const position = nonNegativeInteger(entry.position);
      if (position < 1) return invalid();
      return {
        id: text(entry.id),
        name: text(entry.name),
        position,
        points: nonNegativeInteger(entry.points),
      };
    }),
  };
}

export function decodeParticipant(value: unknown): Participant {
  const data = record(value);
  if (typeof data.community !== 'string' || !/^[A-Z]{2}$/.test(String(data.uf))) return invalid();
  return { id: text(data.id), name: text(data.name), uf: text(data.uf), community: data.community };
}

export function decodeSession(value: unknown): Session {
  const data = record(value);
  return { participant: decodeParticipant(data.participant), token: text(data.token) };
}
