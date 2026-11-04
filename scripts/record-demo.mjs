import { chromium } from '@playwright/test';
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Gravação da aplicação real. As legendas existem apenas no vídeo, não no produto.
const site = process.env.DEMO_SITE_URL ?? 'http://127.0.0.1:5173';
const api = process.env.DEMO_API_URL ?? 'http://localhost:8080/api';
if (!process.env.DEMO_ADMIN_KEY_FILE)
  throw new Error('Informe DEMO_ADMIN_KEY_FILE do ambiente de demonstração.');
const adminKey = (await readFile(process.env.DEMO_ADMIN_KEY_FILE, 'utf8')).trim();
const output = resolve(process.env.DEMO_OUTPUT_DIR ?? '../entregas/frontend');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  recordVideo: { dir: `${output}/originais`, size: { width: 1280, height: 900 } },
});
const page = await context.newPage();
let token;
const video = page.video();
const wait = (milliseconds) => new Promise((done) => setTimeout(done, milliseconds));

async function caption(message) {
  await page.evaluate((text) => {
    let element = document.getElementById('legenda-video-alpha4');
    if (!element) {
      element = document.createElement('div');
      element.id = 'legenda-video-alpha4';
      element.style.cssText =
        'position:fixed;bottom:0;left:0;right:0;z-index:99999;pointer-events:none;padding:16px 30px;background:#111c3d;color:white;font:600 18px/1.5 Segoe UI,sans-serif;text-align:center';
      document.body.append(element);
    }
    element.textContent = text;
  }, message);
}

async function navigate(path, text) {
  await page.goto(`${site}${path}`);
  await page.waitForLoadState('networkidle');
  await caption(text);
}

try {
  await page.setContent(
    '<main style="font-family:Segoe UI,sans-serif;color:#111c3d;padding:90px;max-width:1000px"><h1 style="font-size:56px">Alpha4 para a Soul Up</h1><p style="font-size:30px;line-height:1.6">Missões sustentáveis e ranking<br>React + Vite + TypeScript + Tailwind CSS<br>API Java com Spring Boot e banco relacional</p><p style="font-size:22px;line-height:1.6">Demonstração local da Sprint 4.<br>Perfil e evidência criados para esta apresentação; operações reais na API.</p></main>',
  );
  await wait(8000);
  await navigate(
    '/',
    'Uma proposta de gamificação para transformar pequenas ações em hábitos sustentáveis.',
  );
  await wait(8000);
  await navigate('/conta', 'O cadastro envia um POST para a API Java e mantém o acesso nesta aba.');
  await page.getByLabel('Apelido', { exact: true }).fill('Demonstração Alpha4');
  await page.getByLabel('Estado', { exact: true }).selectOption('SP');
  await page.getByLabel('Comunidade', { exact: true }).fill('Alpha4');
  await wait(5000);
  await page.getByRole('button', { name: 'Criar perfil', exact: true }).click();
  await page.getByRole('heading', { name: 'Seu perfil de participação' }).waitFor();
  const session = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem('alpha4-participante') ?? 'null'),
  );
  token = session.token;
  await wait(5000);
  await navigate(
    '/missoes',
    'A listagem usa GET. O filtro por categoria ajuda a escolher uma ação.',
  );
  await page.getByLabel('Categoria').selectOption('ambiental');
  await wait(7000);
  await page
    .getByRole('link', { name: /Ver missão:/ })
    .first()
    .click();
  await page.getByLabel('Descrição da participação').waitFor();
  await caption('A rota dinâmica consulta o detalhe da missão pelo identificador recebido na URL.');
  await wait(6000);
  const missionId = new URL(page.url()).pathname.split('/').at(-1);
  await page
    .getByLabel('Descrição da participação')
    .fill(
      'Relato de demonstração: organizei materiais recicláveis para descarte conforme a orientação local.',
    );
  await page
    .getByRole('button', { name: 'Enviar participação', exact: true })
    .scrollIntoViewIfNeeded();
  await caption(
    'O envio registra a evidência com POST. Os pontos aguardam validação; não há crédito automático.',
  );
  await wait(6000);
  await page.getByRole('button', { name: 'Enviar participação', exact: true }).click();
  await page.waitForURL('**/missoes');
  await caption('A API confirmou o recebimento. A missão está em análise.');
  await wait(6000);
  const evidenceResponse = await context.request.get(`${api}/evidencias/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const evidence = (await evidenceResponse.json()).find((item) => item.missionId === missionId);
  if (!evidence) throw new Error('A evidência enviada não foi encontrada no serviço.');
  const approval = await context.request.put(`${api}/admin/evidencias/${evidence.id}`, {
    headers: { 'X-Admin-Key': adminKey },
    data: { status: 'aprovada' },
  });
  if (approval.status() !== 200) throw new Error('A aprovação de demonstração falhou.');
  await navigate(
    `/missoes/${missionId}`,
    'Nesta apresentação, o serviço recebeu uma aprovação administrativa real. A missão agora está concluída.',
  );
  await page.getByText(/Esta missão já foi concluída/).waitFor();
  await wait(7000);
  await navigate(
    '/ranking',
    'O ranking consulta os pontos validados no banco, com filtros global, estadual, comunidade e amigos.',
  );
  await page.getByLabel('Abrangência').selectOption('comunidade');
  await page.getByRole('table').waitFor();
  await wait(8000);
  await navigate(
    '/faq',
    'FAQ, sobre, integrantes e contato completam a navegação obrigatória. O layout usa apenas Tailwind CSS.',
  );
  await page.locator('summary').first().click();
  await wait(6000);
  await navigate(
    '/contato',
    'O contato abre o aplicativo de e-mail do visitante; o site não simula um envio de mensagem.',
  );
  await wait(6000);
  await navigate('/conta', 'O perfil também permite atualização com PUT e exclusão com DELETE.');
  await page.getByLabel('Apelido', { exact: true }).fill('Demonstração Alpha4 atualizada');
  await page.getByRole('button', { name: 'Salvar alterações' }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Salvar alterações' }).click();
  await wait(5000);
  await page.getByRole('button', { name: 'Excluir perfil', exact: true }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Excluir perfil', exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar exclusão' }).click();
  await page.getByRole('heading', { name: 'Comece a participar' }).waitFor();
  token = undefined;
  await caption(
    'O perfil de demonstração foi excluído. Integração local verificada: GET, POST, PUT e DELETE.',
  );
  await wait(7000);
} finally {
  if (token)
    await context.request.delete(`${api}/participantes/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  await context.close();
  if (video) await video.saveAs(`${output}/alpha4-demonstracao-local.webm`);
  await browser.close();
}
console.log(
  `Gravação salva em ${output}/alpha4-demonstracao-local.webm. Revise antes de publicar no YouTube.`,
);
