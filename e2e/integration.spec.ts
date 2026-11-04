import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const api = process.env.E2E_API_URL;
const adminFile = process.env.E2E_ADMIN_KEY_FILE;

test('integração real: perfil, detalhe, evidência, moderação, ranking e exclusão', async ({
  page,
  request,
}) => {
  test.skip(
    !api || !adminFile,
    'Configure E2E_API_URL e E2E_ADMIN_KEY_FILE para o backend de teste.',
  );
  const adminKey = readFileSync(adminFile!, 'utf8').trim();
  const admin = { 'X-Admin-Key': adminKey };
  const created = await request.post(`${api}/missoes`, {
    headers: admin,
    data: {
      title: 'Missão exclusiva do teste de integração',
      description: 'Ação criada para verificar o fluxo de evidências da aplicação.',
      category: 'ambiental',
      points: 35,
      requiresEvidence: true,
    },
  });
  expect(created.status()).toBe(201);
  const mission = (await created.json()) as { id: string };
  let participantToken: string | undefined;
  let friendToken: string | undefined;

  try {
    await page.goto('/conta');
    await page.getByLabel('Apelido', { exact: true }).fill(`Teste de integração ${Date.now()}`);
    await page.getByLabel('Estado', { exact: true }).selectOption('SP');
    // Comunidade em branco verifica o contrato opcional alinhado na revisão.
    await page.getByRole('button', { name: 'Criar perfil', exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Seu perfil de participação');
    const session = await page.evaluate(
      () =>
        JSON.parse(sessionStorage.getItem('alpha4-participante') ?? 'null') as { token: string },
    );
    participantToken = session.token;
    const headers = { Authorization: `Bearer ${participantToken}` };

    const friendResponse = await request.post(`${api}/participantes`, {
      data: { name: 'A'.repeat(80), uf: 'SP', community: '' },
    });
    expect(friendResponse.status()).toBe(201);
    const friend = (await friendResponse.json()) as { participant: { id: string }; token: string };
    friendToken = friend.token;
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByLabel('Código do perfil do amigo').fill(friend.participant.id);
    await page.getByRole('button', { name: 'Acompanhar perfil' }).click();
    await expect(page.getByText('A'.repeat(80), { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
    await page.screenshot({ path: 'docs/screenshots/amigos-mobile-limite.png', fullPage: true });
    await page.getByRole('button', { name: `Deixar de acompanhar ${'A'.repeat(80)}` }).click();
    await expect(page.getByText('Sua lista está vazia')).toBeVisible();

    await page.goto(`/missoes/${mission.id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Missão exclusiva do teste de integração',
    );
    await expect(page).toHaveTitle(/Missão exclusiva do teste/);
    await page
      .getByLabel('Descrição da participação')
      .fill('Separei os resíduos recicláveis para o descarte adequado.');
    await page.getByRole('button', { name: 'Enviar participação', exact: true }).click();
    await expect(page).toHaveURL(/\/missoes$/);
    await expect(page.getByText(/Participação recebida/)).toBeVisible();
    await page
      .getByRole('link', { name: 'Ver missão: Missão exclusiva do teste de integração' })
      .click();
    await expect(page.getByText(/Sua participação está em análise/)).toBeVisible();

    const ownEvidence = await request.get(`${api}/evidencias/me`, { headers });
    expect(ownEvidence.status()).toBe(200);
    const evidences = (await ownEvidence.json()) as { id: string; missionId: string }[];
    const evidence = evidences.find((item) => item.missionId === mission.id);
    expect(evidence).toBeDefined();
    const approved = await request.put(`${api}/admin/evidencias/${evidence!.id}`, {
      headers: admin,
      data: { status: 'aprovada' },
    });
    expect(approved.status()).toBe(200);
    const duplicate = await request.put(`${api}/admin/evidencias/${evidence!.id}`, {
      headers: admin,
      data: { status: 'aprovada' },
    });
    expect(duplicate.status()).toBe(409);
    await page.reload();
    await expect(page.getByText(/Esta missão já foi concluída/)).toBeVisible();

    await page.goto('/ranking');
    await page.getByLabel('Abrangência').selectOption('amigos');
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('cell', { name: '35', exact: true })).toBeVisible();

    await page.goto('/conta');
    await page.getByLabel('Apelido', { exact: true }).fill('Apelido atualizado no teste');
    await page.getByRole('button', { name: 'Salvar alterações' }).click();
    await expect(page.getByText('Seu perfil foi atualizado.')).toBeVisible();
    await page.getByRole('button', { name: 'Excluir perfil', exact: true }).click();
    await page.getByRole('button', { name: 'Confirmar exclusão' }).click();
    await expect(page.getByRole('heading', { name: 'Comece a participar' })).toBeVisible();
    participantToken = undefined;
  } finally {
    if (friendToken)
      await request.delete(`${api}/participantes/me`, {
        headers: { Authorization: `Bearer ${friendToken}` },
      });
    if (participantToken)
      await request.delete(`${api}/participantes/me`, {
        headers: { Authorization: `Bearer ${participantToken}` },
      });
    // O DELETE do perfil remove suas evidências; a missão de teste pode sair.
    await request.delete(`${api}/missoes/${mission.id}`, { headers: admin });
  }
});
