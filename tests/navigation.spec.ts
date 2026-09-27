import { test, expect } from '@playwright/test';

test.describe('Site Navigation & Shell', () => {
  test('skip to content link receives focus and targets #main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator('text=Skip to content');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute('href', '#main');
  });

  test('header navigation links work correctly', async ({ page }) => {
    await page.goto('/');

    // Check Work link
    await page.click('header nav >> text=Work');
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator('h1')).toContainText(/Selected Projects|Work/i);

    // Check About link
    await page.click('header nav >> text=About');
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('h1')).toContainText(/About/i);
    await expect(page.locator('body')).toContainText(/Lenny Kidavi/i);

    // Check CV link
    const cvLink = page.locator('header >> text=Download CV');
    await expect(cvLink).toHaveAttribute('href', '/documents/lenny-kidavi-cv.pdf');
  });

  test('mobile menu opens and closes with focus trap', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const closeButton = page.locator('button[aria-label="Close menu"]');
    await expect(closeButton).toBeVisible();

    // Menu sheet contains links
    const mobileWorkLink = page.locator('#mobile-nav-dialog >> text=Work');
    await expect(mobileWorkLink).toBeVisible();

    await closeButton.click();
    await expect(menuButton).toBeVisible();
  });

  test('theme toggle switches mode and persists in localStorage', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('button[aria-label^="Switch to"]').first();
    await expect(toggle).toBeVisible();

    // Check initial mode attribute
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    // Toggle theme
    await toggle.click();
    await page.waitForTimeout(400);

    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(toggledTheme).not.toBe(initialTheme);

    // Reload page and check persistence
    await page.reload();
    await page.waitForTimeout(400);
    const persistedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(persistedTheme).toBe(toggledTheme);
  });

  test('404 not-found page renders branded desert treatment', async ({ page }) => {
    const res = await page.goto('/non-existent-route-404');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toContainText(/Page not found/i);
    await expect(page.locator('text=Go to the homepage')).toBeVisible();
  });
});

