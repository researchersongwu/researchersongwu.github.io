import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const baselineFile = process.argv[2];
const baseline = process.argv.includes('--baseline');

if (baseline) {
  const markdown = readFileSync(resolve(baselineFile), 'utf8');
  const checks = [
    markdown.includes('# Song Wu'),
    markdown.includes('images/personal.png')
  ];
  if (!checks.every(Boolean)) process.exit(1);
  console.log('PASS baseline: 2/2 checks');
  process.exit(0);
}

const layout = readFileSync('_layouts/default.html', 'utf8');
const config = readFileSync('_config.yml', 'utf8');
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');
const sectionFiles = readdirSync('_sections').filter((name) => name.endsWith('.md')).sort();
const sectionSourceList = sectionFiles.map((name) => readFileSync(`_sections/${name}`, 'utf8'));
const sectionSources = sectionSourceList.join('\n');
const sectionBodies = sectionSourceList.map((source) => source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, ''));
const publicationRenderer = readFileSync('_includes/publications.html', 'utf8');
const talkRenderer = readFileSync('_includes/talks.html', 'utf8');
const publicationTemplate = readFileSync('_templates/publication.md', 'utf8');
const talkTemplate = readFileSync('_templates/talk.md', 'utf8');
const publishedSources = [layout, readFileSync('index.md', 'utf8'), sectionSources].join('\n');
const pureMarkdownBodies = sectionBodies.every((body) =>
  !/<\/?[a-z][^>]*>/iu.test(body) &&
  !body.includes('{%') && !body.includes('{{') && !body.includes('{:')
);

const assertions = [
  ['Jekyll entry Markdown', existsSync('index.md')],
  ['minimal default layout', layout.includes('{{ section.content }}')],
  ['Markdown section loop', layout.includes('site.sections')],
  ['eight Markdown sections', sectionFiles.length === 8],
  ['pure Markdown section bodies', pureMarkdownBodies],
  ['Markdown email link', sectionSources.includes('[researchersongwu@gmail.com](mailto:researchersongwu@gmail.com)')],
  ['publication renderer', publicationRenderer.includes('for post in include.posts')],
  ['research category', layout.includes("post.categories contains 'research'")],
  ['talk renderer', talkRenderer.includes('for talk in include.talks')],
  ['publication Markdown template', publicationTemplate.includes('categories: research') && publicationTemplate.includes('**Song Wu**')],
  ['talk Markdown template', talkTemplate.includes('display_date:')],
  ['sections collection', config.includes('sections:') && config.includes('output: false')],
  ['publication Markdown folder', existsSync('_posts/.gitkeep')],
  ['talk Markdown folder', existsSync('_talks/.gitkeep')],
  ['empty-section suppression', layout.includes("visible_content != ''")],
  ['uploaded profile image', sectionSources.includes('![Song Wu](images/personal.png)') && existsSync('images/personal.png')],
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
