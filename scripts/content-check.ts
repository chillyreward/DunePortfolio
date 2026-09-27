import fs from 'node:fs';
import path from 'node:path';
import { images } from '../src/content/images.generated';
import { profile } from '../src/content/profile';
import { projects } from '../src/content/projects';
import { hackathons } from '../src/content/hackathons';
import { skillGroups } from '../src/content/skills';
import { epigraphs } from '../src/content/epigraphs';

const isStrict = process.argv.includes('--strict');

interface TodoItem {
  file: string;
  line: number;
  text: string;
}

function scanTodos(dir: string): TodoItem[] {
  const todos: TodoItem[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      todos.push(...scanTodos(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((lineText, idx) => {
        const match = lineText.match(/\/\/\s*TODO\(lenny\):?\s*(.*)$/i);
        if (match) {
          todos.push({
            file: path.relative(process.cwd(), fullPath).split(path.sep).join('/'),
            line: idx + 1,
            text: match[1]?.trim() || lineText.trim(),
          });
        }
      });
    }
  }

  return todos;
}

function main() {
  console.log('=== Lenny Portfolio Content Check ===\n');

  // 1. Scan TODOs
  const contentDir = path.resolve('src/content');
  const todos = scanTodos(contentDir);

  console.log(`Found ${todos.length} open TODO(lenny) items:`);
  todos.forEach((t) => {
    console.log(`  - [${t.file}:${t.line}] ${t.text}`);
  });
  console.log();

  // 2. Validate content arrays
  console.log('Content Summary:');
  console.log(`  - Profile loaded: ${profile.name} (${profile.title}) [bioStatus: ${profile.bioStatus}]`);
  console.log(`  - Projects loaded: ${projects.length} total (${projects.filter((p) => p.publish).length} published)`);
  console.log(`  - Hackathons loaded: ${hackathons.length}`);
  console.log(`  - Skill groups loaded: ${skillGroups.length}`);
  console.log(`  - Epigraphs registered: ${epigraphs.length} (${epigraphs.filter((e) => e.quote.trim().length > 0).length} filled by Lenny)`);
  console.log();

  // 3. Verify all image references exist on disk
  const publicDir = path.resolve('public');
  let missingImages = 0;

  for (const [key, meta] of Object.entries(images)) {
    const diskPath = path.join(publicDir, key.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) {
      console.error(`ERROR: Image manifest key does not exist on disk: ${key} -> ${diskPath}`);
      missingImages++;
    }
  }

  if (missingImages === 0) {
    console.log(`All ${Object.keys(images).length} image manifest assets verified on disk.`);
  } else {
    console.error(`ERROR: ${missingImages} images missing from disk.`);
  }
  console.log();

  if (isStrict && todos.length > 0) {
    console.error(`--strict flag passed: FAILED with ${todos.length} open TODO(lenny) items.`);
    process.exit(1);
  }

  if (missingImages > 0) {
    process.exit(1);
  }

  console.log('=== Content check passed ===');
}

main();
