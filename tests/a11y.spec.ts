import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (axe-core WCAG 2.1 AA)', () => {
  const routes = ['/', '/work', '/about', '/cv'];

  for (const route of routes) {
    test(`route ${route} has zero a11y violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForTimeout(500);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }

  test('contact form section has zero a11y violations', async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('#contact')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
