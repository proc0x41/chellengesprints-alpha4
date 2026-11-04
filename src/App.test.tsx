import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { ApiError } from './services/http';
import { saveSession } from './services/session';
import { friendsService, soulUpService } from './services/soulUp';
import type { Mission } from './types/domain';

const mission: Mission = {
  id: 'missao-de-teste',
  title: 'Missão usada apenas no teste',
  description: 'Descrição da ação de teste.',
  category: 'ambiental',
  status: 'disponivel',
  points: 20,
  requiresEvidence: true,
};

afterEach(() => {
  vi.restoreAllMocks();
  saveSession(null);
});

function open(path: string, authenticated = false) {
  if (authenticated)
    saveSession({
      token: 'token-apenas-de-teste',
      participant: { id: 'participante-teste', name: 'Perfil de teste', uf: 'SP', community: '' },
    });
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Navegação e fluxos da Soul Up', () => {
  it('redireciona /home para a página inicial e oferece recuperação de URL desconhecida', async () => {
    const view = open('/home');
    expect(
      await screen.findByRole('heading', { level: 1, name: /Pequenas ações/ }),
    ).toBeInTheDocument();
    view.unmount();
    open('/pagina-inexistente');
    expect(
      screen.getByRole('heading', { name: 'Não encontramos esta página' }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Voltar ao início' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: /Pequenas ações/ }),
    ).toBeInTheDocument();
  });

  it('usa o parâmetro da URL e impede envio sem perfil', async () => {
    const get = vi.spyOn(soulUpService, 'getMission').mockResolvedValue(mission);
    open('/missoes/missao-de-teste');
    expect(
      await screen.findByRole('heading', { level: 1, name: mission.title }),
    ).toBeInTheDocument();
    expect(get).toHaveBeenCalledWith('missao-de-teste', expect.any(AbortSignal));
    expect(screen.getByRole('link', { name: 'Crie seu perfil' })).toHaveAttribute('href', '/conta');
    expect(screen.queryByRole('button', { name: 'Enviar participação' })).not.toBeInTheDocument();
  });

  it('trata missão inexistente com caminho de retorno', async () => {
    vi.spyOn(soulUpService, 'getMission').mockRejectedValue(new ApiError('Não encontrada', 404));
    open('/missoes/ausente');
    expect(await screen.findByText(/Esta missão não foi encontrada/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver missões' })).toHaveAttribute('href', '/missoes');
  });

  it('mantém evidência digitada após falha e redireciona apenas após confirmação do serviço', async () => {
    vi.spyOn(soulUpService, 'getMission').mockResolvedValue(mission);
    vi.spyOn(soulUpService, 'listMissions').mockResolvedValue([
      { ...mission, status: 'em-analise' },
    ]);
    const send = vi
      .spyOn(soulUpService, 'sendEvidence')
      .mockRejectedValueOnce(new Error('Falha temporária'))
      .mockResolvedValueOnce({ message: 'Participação recebida para análise.' });
    open('/missoes/missao-de-teste', true);
    const input = await screen.findByLabelText('Descrição da participação');
    fireEvent.change(input, { target: { value: '  Separei resíduos recicláveis em casa.  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar participação' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Falha temporária');
    expect(input).toHaveValue('  Separei resíduos recicláveis em casa.  ');
    fireEvent.click(screen.getByRole('button', { name: 'Enviar participação' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Missões de hoje' }),
    ).toBeInTheDocument();
    expect(await screen.findByText('Participação recebida para análise.')).toBeInTheDocument();
    expect(send).toHaveBeenLastCalledWith(mission.id, {
      text: 'Separei resíduos recicláveis em casa.',
    });
  });

  it('não permite reenviar missão já registrada', async () => {
    vi.spyOn(soulUpService, 'getMission').mockResolvedValue({ ...mission, status: 'em-analise' });
    open('/missoes/missao-de-teste', true);
    expect(await screen.findByText(/Sua participação está em análise/)).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('filtra categorias e distingue lista vazia de falha', async () => {
    vi.spyOn(soulUpService, 'listMissions').mockResolvedValue([mission]);
    open('/missoes');
    expect(await screen.findByText(mission.title)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Categoria'), { target: { value: 'social' } });
    expect(await screen.findByText('Nenhuma missão por aqui')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('consulta o ranking selecionado e mostra a temporada recebida', async () => {
    const get = vi.spyOn(soulUpService, 'getRanking').mockImplementation(async (scope) => ({
      scope,
      season: '2026/6',
      entries: [{ id: 'p', position: 1, name: 'Perfil de teste', points: 50 }],
    }));
    open('/ranking', true);
    expect(await screen.findByText('Temporada 2026/6')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Abrangência'), { target: { value: 'amigos' } });
    await waitFor(() => expect(get).toHaveBeenLastCalledWith('amigos', expect.any(AbortSignal)));
    expect(await screen.findByRole('table')).toHaveAccessibleName(/Ranking Amigos/);
  });

  it('prepara contato sem fingir envio de mensagem', () => {
    open('/contato');
    fireEvent.change(screen.getByLabelText('Integrante'), { target: { value: '572866' } });
    fireEvent.change(screen.getByLabelText('Assunto'), { target: { value: 'Dúvida & sugestão' } });
    const link = screen.getByRole('link', { name: 'Abrir aplicativo de e-mail' });
    expect(link.getAttribute('href')).toContain(
      'mailto:rm572866@fiap.com.br?subject=D%C3%BAvida%20%26%20sugest%C3%A3o',
    );
    expect(screen.getByText(/O site não envia nem armazena/)).toBeInTheDocument();
  });

  it('oferece descarte local de sessão sem solicitar exclusão do perfil', async () => {
    vi.spyOn(friendsService, 'list').mockResolvedValue([]);
    open('/conta', true);
    fireEvent.click(screen.getByRole('button', { name: 'Esquecer acesso nesta aba' }));
    expect(await screen.findByRole('heading', { name: 'Comece a participar' })).toBeInTheDocument();
    expect(
      screen.getByText('Acesso removido desta aba. O perfil no serviço não foi excluído.'),
    ).toBeInTheDocument();
    expect(document.title).toContain('Comece a participar');
  });
});
