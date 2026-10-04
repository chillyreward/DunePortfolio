import fs from 'node:fs';
import path from 'node:path';

import { PDFParse } from 'pdf-parse';

async function main() {
  console.log('=== Verifying Lenny Kidavi CV PDF ===\n');

  const pdfPath = path.resolve('public/documents/lenny-kidavi-cv.pdf');
  if (!fs.existsSync(pdfPath)) {
    console.error(`ERROR: CV PDF does not exist at ${pdfPath}. Run npm run cv:pdf first.`);
    process.exit(1);
  }

  const dataBuffer = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: dataBuffer });
  const textResult = await parser.getText();
  const pageCount = textResult.total;
  const fullText = textResult.text;

  console.log(`Page count: ${pageCount}`);
  console.log(`Text character length: ${fullText.length}\n`);

  let passed = true;

  function assert(condition: boolean, msg: string) {
    if (!condition) {
      console.error(`FAIL: ${msg}`);
      passed = false;
    } else {
      console.log(`PASS: ${msg}`);
    }
  }

  // 1. Page count constraint (at most 2 pages)
  assert(pageCount <= 2, `PDF is at most 2 pages (actual: ${pageCount})`);

  // 2. Required confirmed text assertions
  assert(fullText.includes('Lenny Kidavi'), 'Contains "Lenny Kidavi"');
  assert(fullText.includes('Red, White & Build'), 'Contains "Red, White & Build"');
  assert(fullText.includes('February 2026') || fullText.includes('19 February 2026'), 'Contains "February 2026"');
  assert(fullText.includes('lennykidavik@gmail.com'), 'Contains "lennykidavik@gmail.com"');

  // 3. Prohibited stale / inaccurate claims from old CV
  assert(!fullText.includes('2024'), 'Does NOT contain "2024" (retired incorrect hackathon year)');
  assert(!fullText.includes('AI Engineer'), 'Does NOT contain "AI Engineer" (overclaiming)');
  assert(!fullText.includes('Self-taught'), 'Does NOT contain "Self-taught" (retired terminology)');
  assert(!fullText.includes('Talent Discovery'), 'Does NOT contain "Talent Discovery" (incorrect Saka description)');
  assert(!fullText.includes('Allenet'), 'Does NOT contain unlaunched "Allenet"');
  assert(!fullText.includes('NeuroGrowth'), 'Does NOT contain unconfirmed "NeuroGrowth"');
  assert(!fullText.includes('714 301'), 'Does NOT print the phone number (WhatsApp link only, brief §7)');
  assert(!fullText.includes('48+'), 'Does NOT contain unconfirmed "48+ estates"');
  assert(!/seamless/i.test(fullText), 'Does NOT contain the banned word "seamless"');

  console.log();
  if (!passed) {
    console.error('One or more CV PDF assertions failed!');
    process.exit(1);
  }

  console.log('All CV PDF verification assertions PASSED successfully!');
}

main().catch((err) => {
  console.error('CV PDF check failed:', err);
  process.exit(1);
});
