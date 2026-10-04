import fs from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

// Use the local Chrome on Windows when present; otherwise Playwright's bundled Chromium.
const windowsChrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromePath = fs.existsSync(windowsChrome) ? windowsChrome : undefined;

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3400',
    trace: 'on-first-retry',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          executablePath: chromePath,
        },
      },
    },
  ],
  webServer: {
    command: 'npm run start -- -p 3400',
    url: 'http://127.0.0.1:3400',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
