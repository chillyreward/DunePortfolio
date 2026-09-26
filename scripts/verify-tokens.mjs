import puppeteer from 'puppeteer-core';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runVerification() {
  console.log('--- STARTING DEV TOKENS VERIFICATION ---');

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const hydrationWarnings = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    if (text.toLowerCase().includes('hydration') || text.toLowerCase().includes('did not match')) {
      hydrationWarnings.push(text);
    }
  });

  page.on('pageerror', (err) => {
    console.error('Page error:', err.message);
  });

  // 1. Visit /dev/tokens in light mode
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/dev/tokens', { waitUntil: 'networkidle0' });

  // Check hydration warnings
  console.log(`Hydration warnings count: ${hydrationWarnings.length}`);
  if (hydrationWarnings.length > 0) {
    console.warn('Hydration warnings detected:', hydrationWarnings);
  }

  // 2. Check font family and font stretch
  const fontDetails = await page.evaluate(() => {
    const body = document.body;
    const wordmark = document.querySelector('.t-wordmark');
    const bodyText = document.querySelector('.t-body');

    const bodyStyle = window.getComputedStyle(body);
    const wordmarkStyle = wordmark ? window.getComputedStyle(wordmark) : null;
    const bodyTextStyle = bodyText ? window.getComputedStyle(bodyText) : null;

    return {
      bodyFontFamily: bodyStyle.fontFamily,
      wordmarkFontFamily: wordmarkStyle ? wordmarkStyle.fontFamily : null,
      wordmarkFontStretch: wordmarkStyle ? wordmarkStyle.fontStretch : null,
      wordmarkFontWeight: wordmarkStyle ? wordmarkStyle.fontWeight : null,
      bodyTextFontStretch: bodyTextStyle ? bodyTextStyle.fontStretch : null,
      bodyTextFontWeight: bodyTextStyle ? bodyTextStyle.fontWeight : null,
    };
  });
  console.log('Font & Typography Check:', fontDetails);

  // 3. Take Desktop Light Screenshot
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'arrakis');
    localStorage.setItem('theme', 'light');
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.resolve('public/tokens-desktop-arrakis.png'),
    fullPage: true,
  });
  console.log('Saved tokens-desktop-arrakis.png');

  // 4. Test Theme Toggle to Dark
  const themeToggle = await page.$('button[aria-label*="mode"]');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise((r) => setTimeout(r, 400));
  }

  const themeAfterClick = await page.evaluate(() => {
    return {
      dataTheme: document.documentElement.getAttribute('data-theme'),
      bgColor: window.getComputedStyle(document.body).backgroundColor,
      textColor: window.getComputedStyle(document.body).color,
      storedTheme: localStorage.getItem('theme'),
    };
  });
  console.log('Theme toggle check (switched to dark):', themeAfterClick);

  // 5. Take Desktop Dark Screenshot
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'giedi');
    localStorage.setItem('theme', 'dark');
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.resolve('public/tokens-desktop-giedi.png'),
    fullPage: true,
  });
  console.log('Saved tokens-desktop-giedi.png');

  // 6. Reload and verify persistence
  await page.reload({ waitUntil: 'networkidle0' });
  const themeAfterReload = await page.evaluate(() => {
    return {
      dataTheme: document.documentElement.getAttribute('data-theme'),
      storedTheme: localStorage.getItem('theme'),
    };
  });
  console.log('Theme persistence after reload:', themeAfterReload);

  // 7. Clear localStorage and test OS setting
  await page.evaluate(() => localStorage.clear());
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  const themeFromOsDark = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Theme from OS dark preference:', themeFromOsDark);

  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  const themeFromOsLight = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Theme from OS light preference:', themeFromOsLight);

  // 8. Horizontal scroll checks at 375px, 768px, 1440px
  for (const width of [375, 768, 1440]) {
    await page.setViewport({ width, height: 900 });
    await page.goto('http://localhost:3000/dev/tokens', { waitUntil: 'networkidle0' });
    const scrollInfo = await page.evaluate((w) => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollW = Math.max(doc.scrollWidth, body.scrollWidth);
      return {
        viewportWidth: w,
        scrollWidth: scrollW,
        hasHorizontalScroll: scrollW > w + 1,
      };
    }, width);
    console.log(`Scroll check at ${width}px:`, scrollInfo);
  }

  // 9. Mobile Screenshots at 375px
  await page.setViewport({ width: 375, height: 812 });

  // Mobile Light
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'arrakis');
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.resolve('public/tokens-mobile-arrakis.png'),
    fullPage: true,
  });
  console.log('Saved tokens-mobile-arrakis.png');

  // Mobile Dark
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'giedi');
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.resolve('public/tokens-mobile-giedi.png'),
    fullPage: true,
  });
  console.log('Saved tokens-mobile-giedi.png');

  // 10. Focus ring check & Tab order
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/dev/tokens', { waitUntil: 'networkidle0' });

  // Tab 1: Skip link
  await page.keyboard.press('Tab');
  const active1 = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tag: el.tagName,
      text: el.innerText || el.textContent,
      href: el.getAttribute('href'),
      outline: window.getComputedStyle(el).outline,
    };
  });
  console.log('Tab 1 (Skip link):', active1);

  // Tab 2: Theme toggle
  await page.keyboard.press('Tab');
  const active2 = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tag: el.tagName,
      ariaLabel: el.getAttribute('aria-label'),
      outline: window.getComputedStyle(el).outline,
    };
  });
  console.log('Tab 2 (Header Theme Toggle):', active2);

  await browser.close();
  console.log('--- DEV TOKENS VERIFICATION COMPLETE ---');
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
