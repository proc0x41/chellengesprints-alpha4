import { expect, test } from '@playwright/test';

for (const width of [360, 480, 768, 992, 1440]) {
  test(`navegação e páginas sem transbordamento a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const routes = [
      ['/', 'Pequenas ações.'],
      ['/sobre', 'Uma ação de cada vez.'],
      ['/integrantes', 'Somos a Alpha4'],
      ['/faq', 'Perguntas frequentes'],
      ['/contato', 'Fale com a Alpha4'],
      ['/missoes', 'Missões de hoje'],
      ['/ranking', 'Ranking da comunidade'],
      ['/conta', 'Comece a participar'],
    ];
    for (const [route, title] of routes) {
      await page.goto(route!);
      await expect(page.locator('h1')).toContainText(title!);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `Transbordamento em ${route} a ${width}px`).toBe(false);
    }
    await page.goto('/');
    if (width < 1024) await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Missões', exact: true })
      .click();
    await expect(page).toHaveURL(/\/missoes$/);
    await expect(page.locator('main')).toBeFocused();
    if (width < 1024)
      await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
  });
}

test('FAQ abre respostas e endereço inválido oferece retorno', async ({ page }) => {
  await page.goto('/faq');
  const question = page.locator('summary').first();
  await question.click();
  await expect(question.locator('..')).toHaveAttribute('open', '');
  await page.goto('/endereco-inexistente');
  await page.getByRole('link', { name: 'Voltar ao início' }).click();
  await expect(page).toHaveURL('/');
});
