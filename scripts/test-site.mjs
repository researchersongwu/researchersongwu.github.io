import { readFileSync, existsSync, readdirSync } from 'node:fs';
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
const sectionFiles = readdirSync('_sections').filter((name) => name.endsWith('.md')).sort();
const sectionSources = sectionFiles.map((name) => readFileSync(`_sections/${name}`, 'utf8')).join('\n');
const publicationSection = readFileSync('_sections/04-publications.md', 'utf8');
const talksSection = readFileSync('_sections/05-talks.md', 'utf8');
const publishedSources = [layout, readFileSync('index.md', 'utf8'), sectionSources].join('\n');

const assertions = [
  ['Jekyll entry Markdown', existsSync('index.md')],
  ['minimal default layout', layout.includes('{{ section.content }}')],
  ['Markdown section loop', layout.includes('site.sections')],
  ['eight Markdown sections', sectionFiles.length === 8],
  ['publication loop in Markdown', publicationSection.includes('for post in site.posts')],
  ['research category', publicationSection.includes("post.categories contains 'research'")],
  ['talk collection loop in Markdown', talksSection.includes('for talk in sorted_talks')],
  ['sections collection', config.includes('sections:') && config.includes('output: false')],
  ['sample research Markdown', existsSync('_posts/2026-08-01-open-world.md')],
  ['sample talk Markdown', existsSync('_talks/2026-08-01-example-talk.md')],
  ['Sass entry', existsSync('style.scss')],
  ['Jekyll workflow', workflow.includes('actions/jekyll-build-pages@v1')],
  ['GitHub Pages deployment', workflow.includes('actions/deploy-pages@v4')],
  ['English public content', !/[\u3400-\u9fff]/u.test(publishedSources) && layout.includes('<html lang="en">')]
];

const failed = assertions.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(`FAIL ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}
console.log(`PASS modified: ${assertions.length}/${assertions.length} checks`);
