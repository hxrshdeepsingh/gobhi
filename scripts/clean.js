import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function removePath(targetPath) {
  if (fs.existsSync(targetPath)) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.log(`[clean] Removed: ${path.relative(rootDir, targetPath)}`);
    } catch (err) {
      console.error(`[clean] Failed to remove ${path.relative(rootDir, targetPath)}:`, err.message);
    }
  }
}

function cleanDir(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.name === '.git') {
      continue;
    }

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.burfi') {
        removePath(fullPath);
        continue;
      }

      if (fs.existsSync(fullPath)) {
        cleanDir(fullPath);
      }
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.tgz') || entry.name === 'package-lock.json' || entry.name === 'pnpm-lock.yaml') {
        removePath(fullPath);
      }
    }
  }
}

console.log('Starting cleanup...');
cleanDir(rootDir);
console.log('Cleanup complete.');
