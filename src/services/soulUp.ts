import type { EvidenceInput, EvidenceReceipt, Mission, Ranking, RankingScope } from '../types/domain';

export class IntegrationPendingError extends Error {
  constructor() {
    super('A conexão com a Soul Up ainda não está disponível. Tente novamente mais tarde.');
    this.name = 'IntegrationPendingError';
  }
}

// O contrato Java não foi fornecido. Implementar este adapter com os endpoints,
// a autenticação e o mapeamento reais antes de publicar a integração.
// Nenhum endpoint, formato de resposta ou dado do servidor foi presumido.
export interface SoulUpService {
  listMissions(signal: AbortSignal): Promise<Mission[]>;
  getMission(id: string, signal: AbortSignal): Promise<Mission>;
  sendEvidence(id: string, input: EvidenceInput): Promise<EvidenceReceipt>;
  getRanking(scope: RankingScope, signal: AbortSignal): Promise<Ranking>;
}

async function pendingIntegration(): Promise<never> {
  throw new IntegrationPendingError();
}

export const soulUpService: SoulUpService = {
  listMissions: pendingIntegration,
  getMission: pendingIntegration,
  sendEvidence: pendingIntegration,
  getRanking: pendingIntegration,
};
