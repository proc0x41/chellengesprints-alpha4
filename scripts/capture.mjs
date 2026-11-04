import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const site = process.env.CAPTURE_URL ?? 'http://127.0.0.1:5173';
const api = process.env.CAPTURE_API_URL ?? 'http://localhost:8080/api';
const browser = await chromium.launch();
const context = await browser.newContext();
let token;

try {
  const profileResponse = await context.request.post(`${api}/participantes`, {
    data: { name: 'Perfil de demonstração Alpha4', uf: 'SP', community: 'Alpha4' },
  });
  if (profileResponse.status() !== 201)
    throw new Error('Não foi possível preparar o perfil de demonstração.');
  const session = await profileResponse.json();
  token = session.token;
  const missionResponse = await context.request.get(`${api}/missoes`);
  const [mission] = await missionResponse.json();
  if (!mission) throw new Error('Nenhuma missão está disponível para captura.');
  await context.addInitScript(
    (value) => sessionStorage.setItem('alpha4-participante', JSON.stringify(value)),
    session,
  );
  const page = await context.newPage();
  await mkdir('docs/screenshots', { recursive: true });
  await mkdir('.impeccable/review', { recursive: true });

  for (const [name, width, height, path] of [
    ['home-desktop', 1440, 1000, '/'],
    ['home-mobile', 390, 844, '/'],
    ['missoes-desktop', 1440, 1000, '/missoes'],
    ['missoes-tablet', 768, 1000, '/missoes'],
    ['missoes-mobile', 390, 844, '/missoes'],
    ['detalhe-desktop', 1440, 1000, `/missoes/${mission.id}`],
    ['perfil-mobile', 390, 844, '/conta'],
    ['ranking-desktop', 1440, 1000, '/ranking'],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${site}${path}`);
    await page.waitForLoadState('networkidle');
    await page.locator('h1').waitFor();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) throw new Error(`Conteúdo transborda em ${name}.`);
    await page.screenshot({
      path: `docs/screenshots/${name}.png`,
      fullPage: true,
      animations: 'disabled',
    });
  }
  console.log(
    'Oito capturas reais salvas em docs/screenshots, incluindo desktop, tablet e mobile.',
  );
} finally {
  if (token)
    await context.request.delete(`${api}/participantes/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  await browser.close();
}
