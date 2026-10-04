import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

// Use the local Chrome on Windows when present; otherwise Playwright's bundled Chromium.
const windowsChrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chromePath = fs.existsSync(windowsChrome) ? windowsChrome : undefined;

function computeContentHash(): string {
  const files = [
    'src/content/profile.ts',
    'src/content/projects.ts',
    'src/content/hackathons.ts',
    'src/content/skills.ts',
    'src/content/cv.ts',
  ];

  const concatenated = files
    .map((f) => fs.readFileSync(path.resolve(f), 'utf-8'))
    .join('\n');

  return crypto.createHash('sha256').update(concatenated).digest('hex');
}

async function waitForServer(url: string, timeoutMs = 60000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        return;
      }
    } catch {
      // Retry after delay
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not respond with 200 within ${timeoutMs}ms`);
}

async function main() {
  console.log('=== Building Lenny Kidavi CV PDF ===\n');

  const docsDir = path.resolve('public/documents');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const pdfPath = path.join(docsDir, 'lenny-kidavi-cv.pdf');
  const serverPort = 3100;
  const targetUrl = `http://127.0.0.1:${serverPort}/cv`;

  console.log(`Starting Next.js production server on port ${serverPort}...`);
  const isWin = process.platform === 'win32';
  const npmCmd = isWin ? 'npm.cmd' : 'npm';

  const serverProcess = spawn(npmCmd, ['run', 'start', '--', '-p', String(serverPort)], {
    stdio: 'inherit',
    shell: true,
    // Own process group on POSIX so the shell and next-server stop together.
    detached: !isWin,
  });

  let browser;

  try {
    console.log(`Waiting for ${targetUrl} to be available...`);
    await waitForServer(targetUrl, 60000);
    console.log('Server is responding! Launching Chromium to render PDF...');

    browser = await chromium.launch({
      executablePath: chromePath,
      headless: true,
    });

    const page = await browser.newPage();
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });

    const screenshotsDir = path.resolve('docs/portfolio/reports/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    console.log('Capturing CV screenshots...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: path.join(screenshotsDir, 'phase-7-cv-corrino-1440.png'), fullPage: true });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: path.join(screenshotsDir, 'phase-7-cv-corrino-375.png'), fullPage: true });

    console.log('Emulating print media & waiting for fonts to load...');
    await page.emulateMedia({ media: 'print' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);

    console.log(`Generating PDF at ${pdfPath}...`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log('PDF generated successfully!');

    // Compute and record content hash
    const hash = computeContentHash();
    const metaPath = path.resolve('src/content/cv.meta.json');
    const metaData = {
      contentHash: hash,
      generatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2), 'utf-8');
    console.log(`Updated cv.meta.json with hash: ${hash}`);
  } finally {
    if (browser) {
      await browser.close();
    }
    console.log('Terminating production server...');
    if (serverProcess.pid) {
      if (isWin) {
        spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t']);
      } else {
        process.kill(-serverProcess.pid, 'SIGTERM');
      }
    }
  }

  console.log('\n=== CV PDF Build Complete ===');
}

main().catch((err) => {
  console.error('Failed to build CV PDF:', err);
  process.exit(1);
});
