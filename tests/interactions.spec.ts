import { test, expect } from '@playwright/test';

test.describe('PROMPT 13 interactions', () => {
  test('search palette: keyboard open, filter, navigate, escape returns focus', async ({ page }) => {
    await page.goto('/');
    const dialog = page.getByRole('dialog', { name: 'Search the site' });

    // Open from the header button, close with Escape, focus returns to the button.
    const button = page.locator('header').getByRole('button', { name: 'Search' });
    await button.click();
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Search pages, projects and actions' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(button).toBeFocused();

    // Ctrl+K, type, arrow keys move the active option, Enter navigates.
    await page.keyboard.press('Control+k');
    await expect(dialog).toBeVisible();
    await page.keyboard.type('gikuyu');
    const results = page.getByRole('listbox', { name: 'Search the site' });
    const options = results.getByRole('option');
    await expect(options).toHaveCount(1);
    await expect(options.first()).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/work\/gikuyu-translator$/);

    // Initials match and ArrowDown moves the selection.
    await page.keyboard.press('Control+k');
    await page.keyboard.type('a');
    const first = results.getByRole('option').first();
    await expect(first).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(results.getByRole('option').nth(1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Escape');
  });

  test('eclipse theme switch falls back to an instant switch with reduced motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addInitScript(() => localStorage.setItem('theme', 'light'));
    const page = await context.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: /Switch to dark mode/ }).first().click();
    // No transition to wait for: the theme is applied immediately and persisted.
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'giedi');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
    await context.close();
  });

  test('realm compass follows the band under the header', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const compass = page.locator('header [aria-hidden="true"].t-meta');
    await expect(compass).toHaveText('Arrakis');

    for (const [selector, label] of [
      ['[data-realm="atreides"]', 'House Atreides'],
      ['[data-realm="corrino"]', 'House Corrino'],
      ['[data-realm="fremen"]', 'Fremen'],
    ] as const) {
      await page.evaluate((sel) => {
        const el = document.querySelector<HTMLElement>(`main ${sel}`)!;
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40);
      }, selector);
      await expect(compass).toHaveText(label);
    }
  });

  test('NeuroGrowth case study and credit lines render', async ({ page }) => {
    await page.goto('/work/neuro-growth');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/NeuroGrowth/i);
    await expect(page.locator('main')).toContainText('Marketing Engineering');
    await expect(page.locator('main')).toContainText('Led the full website upgrade');
    await expect(page.locator('main [data-realm="corrino"]').first()).toBeVisible();

    await page.goto('/work/smart-chama');
    await expect(page.locator('main')).toContainText("now part of NeuroGrowth's product line");
    await expect(page.getByRole('navigation', { name: 'On this page' })).toBeAttached();
  });
});
