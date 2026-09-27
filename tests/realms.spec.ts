import { test, expect } from '@playwright/test';

test.describe('Dune Realm System', () => {
  test('homepage transitions across Dune realms', async ({ page }) => {
    await page.goto('/');

    // Check Arrakis hero
    const heroRealm = page.locator('section:has-text("LENNY KIDAVI"), [data-realm="arrakis"]').first();
    await expect(heroRealm).toHaveAttribute('data-realm', 'arrakis');

    // Check Atreides selected work band
    const workRealm = page.locator('[data-realm="atreides"]').first();
    await expect(workRealm).toBeVisible();

    // Check Fremen hackathons band
    const fremenRealm = page.locator('[data-realm="fremen"]').first();
    await expect(fremenRealm).toBeVisible();
  });

  test('work page and case study render in assigned realms', async ({ page }) => {
    await page.goto('/work');

    const atreidesSection = page.locator('[data-realm="atreides"]').first();
    await expect(atreidesSection).toBeVisible();

    // CV page belongs to Corrino realm
    await page.goto('/cv');
    const corrinoSection = page.locator('[data-realm="corrino"]').first();
    await expect(corrinoSection).toBeVisible();

    // Case study /work/smart-chama should be Atreides
    await page.goto('/work/smart-chama');
    const caseStudyRealm = page.locator('main [data-realm="atreides"]').first();
    await expect(caseStudyRealm).toBeVisible();
  });
});

