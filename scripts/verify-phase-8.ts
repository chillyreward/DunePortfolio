import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function waitForServer(url: string, timeoutMs = 60000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        return;
      }
    } catch {
      // Retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not respond with 200 within ${timeoutMs}ms`);
}

async function main() {
  console.log('=== Verifying Phase 8: Dune Details, OG Images, Shai-Hulud ===\n');

  const screenshotsDir = path.resolve('docs/portfolio/reports/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const serverPort = 3200;
  const baseUrl = `http://127.0.0.1:${serverPort}`;

  console.log(`Starting Next.js production server on port ${serverPort}...`);
  const isWin = process.platform === 'win32';
  const npmCmd = isWin ? 'npm.cmd' : 'npm';

  const serverProcess = spawn(npmCmd, ['run', 'start', '--', '-p', String(serverPort)], {
    stdio: 'inherit',
    shell: true,
  });

  let browser;

  try {
    console.log(`Waiting for ${baseUrl} to be available...`);
    await waitForServer(baseUrl, 60000);
    console.log('Server is responding! Launching Playwright browser...');

    browser = await chromium.launch({
      executablePath: chromePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Verify OG Home Image
    console.log('Fetching /opengraph-image...');
    const ogRes = await page.goto(`${baseUrl}/opengraph-image`);
    if (ogRes && ogRes.status() === 200) {
      console.log('PASS: /opengraph-image returned HTTP 200');
      const buffer = await ogRes.body();
      const ogHomePath = path.join(screenshotsDir, 'phase-8-og-home.png');
      fs.writeFileSync(ogHomePath, buffer);
      console.log(`Saved ${ogHomePath} (${buffer.length} bytes)`);
    } else {
      throw new Error(`Failed to fetch /opengraph-image: status ${ogRes?.status()}`);
    }

    // Verify other OG images
    console.log('Checking /work/opengraph-image...');
    const workOgRes = await fetch(`${baseUrl}/work/opengraph-image`);
    console.log(`/work/opengraph-image status: ${workOgRes.status}`);

    console.log('Checking /about/opengraph-image...');
    const aboutOgRes = await fetch(`${baseUrl}/about/opengraph-image`);
    console.log(`/about/opengraph-image status: ${aboutOgRes.status}`);

    console.log('Checking /work/smart-chama/opengraph-image...');
    const slugOgRes = await fetch(`${baseUrl}/work/smart-chama/opengraph-image`);
    console.log(`/work/smart-chama/opengraph-image status: ${slugOgRes.status}`);

    // 2. Test Shai-Hulud Easter Egg on Homepage
    console.log('Navigating to homepage to test Shai-Hulud trigger...');
    await page.goto(baseUrl, { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    console.log('Typing "sandworm" to trigger the easter egg...');
    await page.keyboard.type('sandworm', { delay: 50 });
    await page.waitForTimeout(800);

    // Check if toast is visible
    const toast = page.locator('text="Shai-Hulud Awakens"');
    const toastCount = await toast.count();
    console.log(`Shai-Hulud toast count: ${toastCount}`);
    if (toastCount > 0) {
      console.log('PASS: Shai-Hulud toast rendered successfully!');
    } else {
      console.error('FAIL: Shai-Hulud toast did not appear');
    }

    // Capture screenshot with active worm and toast
    const easterEggPath = path.join(screenshotsDir, 'phase-8-shai-hulud-1440.png');
    await page.screenshot({ path: easterEggPath, fullPage: false });
    console.log(`Saved screenshot: ${easterEggPath}`);

    // Verify manifest.webmanifest
    console.log('Checking /manifest.webmanifest...');
    const manifestRes = await fetch(`${baseUrl}/manifest.webmanifest`);
    console.log(`/manifest.webmanifest status: ${manifestRes.status}`);
    if (manifestRes.status === 200) {
      const manifestData = await manifestRes.json();
      console.log('Manifest name:', manifestData.name);
      console.log('PASS: manifest.webmanifest verified!');
    }

  } finally {
    if (browser) {
      await browser.close();
    }
    console.log('Terminating production server...');
    if (serverProcess.pid) {
      if (isWin) {
        spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t']);
      } else {
        serverProcess.kill('SIGTERM');
      }
    }
  }

  console.log('\n=== Phase 8 Verification Complete ===');
}

main().catch((err) => {
  console.error('Phase 8 verification failed:', err);
  process.exit(1);
});
