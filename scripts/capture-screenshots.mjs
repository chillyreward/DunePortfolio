import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const PROJECTS = [
  { slug: 'smart-chama', url: 'https://www.smartchama.tech' },
  { slug: 'saka', url: 'https://sakahapa.vercel.app' },
  { slug: 'oppolia', url: 'https://www.oppoliakenya.co.ke' },
  { slug: 'sucre-bushworks', url: 'https://sucre-bushworks.vercel.app' },
  { slug: 'gikuyu-translator', url: 'https://gikuyu-translate.vercel.app' },
];

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureProject(browser, project, extraWaitMs = 4000) {
  const { slug, url } = project;
  const projectDir = path.resolve(`public/images/projects/${slug}`);
  fs.mkdirSync(projectDir, { recursive: true });

  console.log(`\nCapturing [${slug}] from ${url} (extra wait: ${extraWaitMs}ms)...`);

  // 1. Desktop context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  });
  const desktopPage = await desktopContext.newPage();

  const tmpDesktopPng = path.join(projectDir, 'tmp-desktop.png');
  const tmpDesktopFullPng = path.join(projectDir, 'tmp-desktop-full.png');
  const tmpMobilePng = path.join(projectDir, 'tmp-mobile.png');

  try {
    await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (err) {
    console.warn(`Networkidle timeout for ${url}, continuing anyway...`);
  }
  await desktopPage.waitForTimeout(extraWaitMs);

  // Dismiss common onboarding or tutorial modals if present
  try {
    const skipBtn = await desktopPage.getByText(/skip tutorial/i);
    if (await skipBtn.count() > 0) {
      await skipBtn.first().click();
      await desktopPage.waitForTimeout(1000);
    }
  } catch (e) {
    // ignore
  }

  // Viewport-only screenshot
  await desktopPage.screenshot({ path: tmpDesktopPng, fullPage: false });
  // Full-page screenshot
  await desktopPage.screenshot({ path: tmpDesktopFullPng, fullPage: true });
  await desktopContext.close();

  // 2. Mobile context
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (err) {
    console.warn(`Networkidle timeout for mobile ${url}, continuing anyway...`);
  }
  await mobilePage.waitForTimeout(extraWaitMs);

  // Dismiss common onboarding or tutorial modals if present
  try {
    const skipBtn = await mobilePage.getByText(/skip tutorial/i);
    if (await skipBtn.count() > 0) {
      await skipBtn.first().click();
      await mobilePage.waitForTimeout(1000);
    }
  } catch (e) {
    // ignore
  }

  // Viewport-only screenshot
  await mobilePage.screenshot({ path: tmpMobilePng, fullPage: false });
  await mobileContext.close();

  // 3. Process with sharp
  // Desktop viewport: longest edge <= 2400
  const outDesktopWebp = path.join(projectDir, 'capture-desktop.webp');
  await sharp(tmpDesktopPng)
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outDesktopWebp);

  // Mobile viewport: longest edge <= 2400
  const outMobileWebp = path.join(projectDir, 'capture-mobile.webp');
  await sharp(tmpMobilePng)
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outMobileWebp);

  // Desktop full: width <= 1440, keep height
  const outDesktopFullWebp = path.join(projectDir, 'capture-desktop-full.webp');
  await sharp(tmpDesktopFullPng)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outDesktopFullWebp);

  // Clean up temporary PNGs
  fs.unlinkSync(tmpDesktopPng);
  fs.unlinkSync(tmpDesktopFullPng);
  fs.unlinkSync(tmpMobilePng);

  // 4. Set cover.webp if none exists
  const coverWebp = path.join(projectDir, 'cover.webp');
  if (!fs.existsSync(coverWebp)) {
    fs.copyFileSync(outDesktopWebp, coverWebp);
    console.log(`Created cover.webp for ${slug}`);
  }

  const dMeta = await sharp(outDesktopWebp).metadata();
  const mMeta = await sharp(outMobileWebp).metadata();
  const fMeta = await sharp(outDesktopFullWebp).metadata();

  console.log(`[${slug}] desktop: ${dMeta.width}x${dMeta.height}, mobile: ${mMeta.width}x${mMeta.height}, full: ${fMeta.width}x${fMeta.height}`);
  return { slug, success: true };
}

async function run() {
  console.log('Starting live site captures...');
  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
  });

  const results = [];
  for (const project of PROJECTS) {
    try {
      const res = await captureProject(browser, project, 4000);
      results.push(res);
    } catch (err) {
      console.error(`Failed capturing ${project.slug}:`, err.message);
      console.log(`Retrying ${project.slug} with 10s wait...`);
      try {
        const res = await captureProject(browser, project, 10000);
        results.push(res);
      } catch (retryErr) {
        console.error(`Retry failed for ${project.slug}:`, retryErr.message);
        results.push({ slug: project.slug, success: false, error: retryErr.message });
      }
    }
  }

  await browser.close();
  console.log('\n--- CAPTURE SUMMARY ---');
  console.table(results);
}

run().catch((err) => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
