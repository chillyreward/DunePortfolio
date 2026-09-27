import fs from 'node:fs';
import path from 'node:path';

const targetFile = path.resolve('node_modules/next/dist/compiled/@vercel/og/index.node.js');

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf-8');
  if (content.includes('join(import.meta.url')) {
    content = content.replace(
      /fileURLToPath\(join\(import\.meta\.url,\s*"\.\.\/([^"]+)"\)\)/g,
      'fileURLToPath(new URL("./$1", import.meta.url))'
    );
    fs.writeFileSync(targetFile, content, 'utf-8');
    console.log('[patch-vercel-og] Successfully patched @vercel/og for cross-platform URL resolution.');
  }
}
