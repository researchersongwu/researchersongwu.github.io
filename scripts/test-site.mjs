import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const baselineFile = process.argv[2];
const baseline = process.argv.includes('--baseline');

if (baseline) {
  const html = readFileSync(resolve(baselineFile), 'utf8');
  const ok = html.includes('class="side-nav"') && html.includes('id="publications"');
  if (!ok) process.exit(1);
  console.log('PASS baseline: 1/1 checks');
  process.exit(0);
}

const layout = readFileSync('_layouts/default.html', 'utf8');
const config = readFileSync('_config.yml', 'utf8');
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');
const englishSources = [
  layout,
  config,
  readFileSync('_data/news.yml', 'utf8'),
  readFileSync('_data/awards.yml', 'utf8'),
  readFileSync('_data/experiences.yml', 'utf8')
].join('\n');
const assertions = [
  ['Jekyll entry', existsSync('index.md')],
  ['default layout', layout.startsWith('---\n---')],
  ['publication loop', layout.includes('for post in site.posts')],
  ['research category', layout.includes("post.categories contains 'research'")],
  ['talk collection loop', layout.includes('for talk in sorted_talks')],
  ['site configuration', config.includes('name: Your Name')],
  ['talks collection', config.includes('talks:') && config.includes('output: true')],
  ['sample research Markdown', existsSync('_posts/2026-08-01-open-world.md')],
  ['sample talk Markdown', existsSync('_talks/2026-08-01-example-talk.md')],
  ['Sass entry', existsSync('style.scss')],
  ['Jekyll workflow', workflow.includes('actions/jekyll-build-pages@v1')],
  ['GitHub Pages deployment', workflow.includes('actions/deploy-pages@v4')],
  ['English public content', !/[\u3400-\u9fff]/u.test(englishSources) && layout.includes('<html lang="en">')]
];

const failed = assertions.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(`FAIL ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}
console.log(`PASS modified: ${assertions.length}/${assertions.length} checks`);
