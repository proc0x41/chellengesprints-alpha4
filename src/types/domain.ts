// Modelos de apresentação da interface. O adapter Java depende do contrato real.
export type MissionCategory = 'ambiental' | 'social' | 'governanca';
export type MissionStatus = 'disponivel' | 'em-analise' | 'concluida';
export type RankingScope = 'global' | 'estadual' | 'comunidade' | 'amigos';

export interface Identified {
  id: string;
}

export interface MissionContent {
  title: string;
  description: string;
  category: MissionCategory;
  points: number;
  requiresEvidence: boolean;
  status: MissionStatus;
}

export type Mission = Identified & MissionContent;

export interface RankingEntry extends Identified {
  position: number;
  name: string;
  points: number;
}

export interface Ranking {
  scope: RankingScope;
  season: string;
  entries: RankingEntry[];
}

export interface EvidenceInput {
  text: string;
}

export interface EvidenceReceipt {
  message: string;
}

export interface Participant extends Identified {
  name: string;
  uf: string;
  community: string;
}

export type ParticipantInput = Omit<Participant, 'id'>;

export interface Session {
  participant: Participant;
  token: string;
}

export type RemoteState<T> =
  { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: Error };
