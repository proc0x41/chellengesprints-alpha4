import { describe, expect, it } from 'vitest';
import { decodeMission, decodeMissions, decodeRanking, decodeSession } from './decoders';

const mission = { id: '1', title: 'Título de teste', description: 'Descrição de teste', category: 'ambiental', status: 'disponivel', points: 20, requiresEvidence: true };

describe('Validação do contrato Java', () => {
  it('rejeita pontuação inválida e estados desconhecidos antes de renderizar', () => {
    expect(decodeMission(mission)).toEqual(mission);
    expect(() => decodeMission({ ...mission, points: -10 })).toThrow('formato inesperado');
    expect(() => decodeMission({ ...mission, points: '20' })).toThrow('formato inesperado');
    expect(() => decodeMission({ ...mission, status: 'não-mapeado' })).toThrow('formato inesperado');
    expect(() => decodeMissions({ content: [mission] })).toThrow('formato inesperado');
  });

  it('aceita listas vazias sem inventar resultados', () => {
    expect(decodeMissions([])).toEqual([]);
    expect(decodeRanking({ scope: 'global', season: '2026/6', entries: [] }).entries).toEqual([]);
  });

  it('não reutiliza sessão com credenciais ou perfil malformados', () => {
    expect(() => decodeSession({ participant: { id: '1', name: 'Teste', uf: 'SP', community: '' }, token: '' })).toThrow();
    expect(() => decodeSession({ participant: { id: '1', name: 'Teste', uf: 'estado inválido', community: '' }, token: 'teste' })).toThrow();
  });
});
