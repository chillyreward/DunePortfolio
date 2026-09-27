import { spawn } from 'node:child_process';

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
  console.log('=== Verifying Phase 9: SEO, Security Headers, JSON-LD, Analytics ===\n');

  const serverPort = 3300;
  const baseUrl = `http://127.0.0.1:${serverPort}`;

  console.log(`Starting Next.js production server on port ${serverPort}...`);
  const isWin = process.platform === 'win32';
  const npmCmd = isWin ? 'npm.cmd' : 'npm';

  const serverProcess = spawn(npmCmd, ['run', 'start', '--', '-p', String(serverPort)], {
    stdio: 'inherit',
    shell: true,
  });

  let passed = true;
  function assert(condition: boolean, msg: string) {
    if (!condition) {
      console.error(`FAIL: ${msg}`);
      passed = false;
    } else {
      console.log(`PASS: ${msg}`);
    }
  }

  try {
    console.log(`Waiting for ${baseUrl} to be available...`);
    await waitForServer(baseUrl, 60000);
    console.log('Server is responding! Starting checks...\n');

    // 1. Verify Sitemap
    console.log('--- 1. Sitemap Check ---');
    const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
    assert(sitemapRes.status === 200, `Sitemap HTTP 200 (actual: ${sitemapRes.status})`);
    const sitemapText = await sitemapRes.text();
    assert(sitemapText.includes('<loc>https://lennydev.vercel.app</loc>') || sitemapText.includes('lennydev.vercel.app'), 'Sitemap contains home URL');
    assert(sitemapText.includes('/work'), 'Sitemap contains /work');
    assert(sitemapText.includes('/about'), 'Sitemap contains /about');
    assert(sitemapText.includes('/cv'), 'Sitemap contains /cv');
    assert(sitemapText.includes('/work/smart-chama'), 'Sitemap contains case study /work/smart-chama');
    assert(sitemapText.includes('/work/saka'), 'Sitemap contains case study /work/saka');
    assert(sitemapText.includes('/work/gikuyu-translator'), 'Sitemap contains case study /work/gikuyu-translator');
    console.log();

    // 2. Verify Robots
    console.log('--- 2. Robots.txt Check ---');
    const robotsRes = await fetch(`${baseUrl}/robots.txt`);
    assert(robotsRes.status === 200, `Robots HTTP 200 (actual: ${robotsRes.status})`);
    const robotsText = await robotsRes.text();
    assert(robotsText.includes('Allow: /'), 'Robots contains Allow: /');
    assert(robotsText.includes('Disallow: /dev/'), 'Robots disallows /dev/');
    assert(robotsText.includes('Disallow: /api/'), 'Robots disallows /api/');
    assert(robotsText.includes('sitemap.xml'), 'Robots links to sitemap.xml');
    console.log();

    // 3. Verify Security Headers on Homepage
    console.log('--- 3. Security Headers Check ---');
    const homeRes = await fetch(baseUrl);
    assert(homeRes.status === 200, `Homepage HTTP 200 (actual: ${homeRes.status})`);

    const headers = homeRes.headers;
    const csp = headers.get('content-security-policy');
    assert(Boolean(csp), 'Content-Security-Policy header present');
    assert(Boolean(csp?.includes("frame-ancestors 'none'")), "CSP includes frame-ancestors 'none'");
    assert(Boolean(csp?.includes('script-src')), 'CSP includes script-src');

    assert(headers.get('x-frame-options') === 'DENY', 'X-Frame-Options is DENY');
    assert(headers.get('x-content-type-options') === 'nosniff', 'X-Content-Type-Options is nosniff');
    assert(headers.get('referrer-policy') === 'strict-origin-when-cross-origin', 'Referrer-Policy is strict-origin-when-cross-origin');
    assert(Boolean(headers.get('permissions-policy')?.includes('camera=()')), 'Permissions-Policy includes camera=()');
    assert(Boolean(headers.get('strict-transport-security')?.includes('max-age=')), 'Strict-Transport-Security present with max-age');
    console.log();

    // 4. Verify Person JSON-LD
    console.log('--- 4. Person JSON-LD Structured Data Check ---');
    const homeHtml = await homeRes.text();
    const jsonLdMatch = homeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(Boolean(jsonLdMatch), 'Found application/ld+json script tag in homepage');

    if (jsonLdMatch) {
      const data = JSON.parse(jsonLdMatch[1]);
      assert(data['@type'] === 'Person', '@type is Person');
      assert(data.name === 'Lenny Kidavi', 'name is Lenny Kidavi');
      assert(data.alternateName === 'Lenny Navwani', 'alternateName is Lenny Navwani');
      assert(data.jobTitle === 'Independent Developer & CS Student', 'jobTitle is accurate');
      assert(Array.isArray(data.sameAs) && data.sameAs.length >= 3, 'sameAs has profile links');
      assert(Array.isArray(data.knowsAbout) && data.knowsAbout.includes('TypeScript'), 'knowsAbout includes TypeScript');
      assert(data.alumniOf?.name === 'Catholic University of Eastern Africa (CUEA)', 'alumniOf is CUEA');
    }
    console.log();

    if (!passed) {
      console.error('One or more Phase 9 verification checks failed!');
      process.exit(1);
    }

    console.log('All Phase 9 verification checks PASSED successfully!');
  } finally {
    console.log('Terminating production server...');
    if (serverProcess.pid) {
      if (isWin) {
        spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t']);
      } else {
        serverProcess.kill('SIGTERM');
      }
    }
  }
}

main().catch((err) => {
  console.error('Phase 9 verification failed:', err);
  process.exit(1);
});
