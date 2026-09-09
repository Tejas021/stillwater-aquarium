import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const project = process.cwd();
const run = (args, cwd = project, capture = false) => execFileSync('git', args, {
  cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit',
});
const remote = run(['remote', 'get-url', 'origin'], project, true).trim();
const directory = mkdtempSync(join(tmpdir(), 'pages-deploy-'));
try {
  run(['init', '-b', 'gh-pages'], directory);
  run(['remote', 'add', 'origin', remote], directory);
  const existing = run(['ls-remote', '--heads', 'origin', 'gh-pages'], directory, true).trim();
  if (existing) {
    run(['fetch', '--depth=1', 'origin', 'gh-pages'], directory);
    run(['reset', '--hard', 'FETCH_HEAD'], directory);
  }
  for (const file of readdirSync(directory)) {
    if (file !== '.git') rmSync(join(directory, file), { recursive: true, force: true });
  }
  cpSync(resolve(project, 'dist'), directory, { recursive: true });
  writeFileSync(join(directory, '.nojekyll'), '');
  run(['add', '--all'], directory);
  const changes = run(['status', '--porcelain'], directory, true).trim();
  if (changes) {
    run(['commit', '-m', 'Deploy production website'], directory);
    run(['push', 'origin', 'HEAD:refs/heads/gh-pages'], directory);
    console.log('Production build pushed. GitHub Pages will publish it shortly.');
  } else {
    console.log('The published build is already up to date.');
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}
