import { test, expect } from '@playwright/test';

test.describe('Content Accuracy & Invariant Assertions', () => {
  test('homepage contains verified facts and no stale claims', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');

    // Required verified facts
    await expect(body).toContainText('Lenny Kidavi');
    await expect(body).toContainText('Catholic University of Eastern Africa');
    await expect(body).toContainText('Red, White & Build');
    await expect(body).toContainText('2026');

    // Prohibited stale / inaccurate claims
    await expect(body).not.toContainText('AI Engineer');
    await expect(body).not.toContainText('Talent Discovery');
    await expect(body).not.toContainText('Allenet');
  });

  test('about page contains education, hackathon credentials, and skills', async ({ page }) => {
    await page.goto('/about');
    const body = page.locator('body');

    await expect(body).toContainText('Catholic University of Eastern Africa');
    await expect(body).toContainText('BSc Computer Science');
    await expect(body).toContainText('Red, White & Build');
  });

  test('cv page matches confirmed facts and contains no unverified projects', async ({ page }) => {
    await page.goto('/cv');
    const body = page.locator('body');

    await expect(body).toContainText('Lenny Kidavi');
    await expect(body).toContainText('lennykidavik@gmail.com');
    await expect(body).toContainText('SmartChama');
    await expect(body).toContainText('Saka');
    await expect(body).not.toContainText('Allenet');
    // NeuroGrowth: published with Lenny's approval 2026-10-04.
    await expect(body).toContainText('NeuroGrowth');
  });
});

