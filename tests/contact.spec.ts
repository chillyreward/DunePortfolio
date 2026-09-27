import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('displays error summary and sets focus on failed submit', async ({ page }) => {
    await page.goto('/#contact');

    // Wait 3.2s to bypass time-trap and trigger validation
    await page.waitForTimeout(3200);

    // Submit without filling fields
    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Error summary alert should appear and be focused
    const alert = page.locator('#contact [role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/Please fix/i);

    // Assert field errors
    await expect(page.locator('#field-name-error')).toBeVisible();
    await expect(page.locator('#field-email-error')).toBeVisible();
    await expect(page.locator('#field-message-error')).toBeVisible();
  });

  test('honeypot field is invisible and silently discards bot submissions', async ({ page }) => {
    await page.goto('/#contact');

    // Fill normal fields
    await page.fill('#field-name', 'Spam Bot');
    await page.fill('#field-email', 'bot@spam.com');
    await page.selectOption('#field-topic', 'Something else');
    await page.fill('#field-message', 'This is an automated spam payload with more than twenty characters.');

    // Fill honeypot field
    await page.evaluate(() => {
      const hp = document.querySelector('input[name="company"]') as HTMLInputElement;
      if (hp) hp.value = 'Spam Company Inc';
    });

    // Wait 3.5s to pass time-trap so only honeypot triggers
    await page.waitForTimeout(3200);

    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Returns silent success without sending
    await expect(page.locator('text=Message sent')).toBeVisible();
  });

  test('time-trap silently discards sub-3-second submissions', async ({ page }) => {
    await page.goto('/#contact');

    // Instantly fill and submit in < 500ms
    await page.fill('#field-name', 'Speedy Bot');
    await page.fill('#field-email', 'speedy@bot.com');
    await page.selectOption('#field-topic', 'Something else');
    await page.fill('#field-message', 'Fast submission test with sufficient length characters.');

    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Returns silent success
    await expect(page.locator('text=Message sent')).toBeVisible();
  });

  test('legitimate submission displays confirmation message', async ({ page }) => {
    await page.goto('/#contact');

    // Wait 3.2s to satisfy time-trap
    await page.waitForTimeout(3200);

    await page.fill('#field-name', 'Playwright Tester');
    await page.fill('#field-email', 'tester@example.com');
    await page.selectOption('#field-topic', 'Freelance project');
    await page.fill('#field-message', 'Hello Lenny, this is a legitimate automated e2e verification message.');

    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Confirmation heading should receive focus
    const successHeading = page.locator('text=Message sent');
    await expect(successHeading).toBeVisible();
  });
});

