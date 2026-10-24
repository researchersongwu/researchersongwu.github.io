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
const sectionSources = sectionFiles.map((name) => readFileSync(`_sections/${name}`, 'utf8')).join('\n');
const publicationSection = readFileSync('_sections/04-publications.md', 'utf8');
const posterSection = readFileSync('_sections/05-posters.md', 'utf8');
const talksSection = readFileSync('_sections/05-talks.md', 'utf8');
const awardsSection = readFileSync('_sections/06-awards.md', 'utf8');
const experiencesSection = readFileSync('_sections/08-experiences.md', 'utf8');
const starbugsSection = readFileSync('_sections/09-starbugs.md', 'utf8');
const miscSection = readFileSync('_sections/10-misc.md', 'utf8');
const starbugsBody = starbugsSection.replace(/^---\s*[\s\S]*?---\s*/u, '').trim();
const starbugsRows = starbugsBody.split('\n').filter((line) => /^\|\s*(?:\[)?(?:CVE|CNVD)-\d{4}-\d+/u.test(line));
const readme = readFileSync('README.md', 'utf8');
const ccsPublication = readFileSync('_posts/2026-08-01-when-ad-networks-misbehave.md', 'utf8');
const spPoster = readFileSync('_posts/2026-04-01-understanding-risks-splash-ads-poster.md', 'utf8');
const publishedSources = [layout, readFileSync('index.md', 'utf8'), sectionSources].join('\n');

const assertions = [
  ['Jekyll entry Markdown', existsSync('index.md')],
  ['minimal default layout', layout.includes('{{ section.content }}')],
  ['Markdown section loop', layout.includes('site.sections')],
  ['eleven Markdown sections', sectionFiles.length === 11],
  ['publication loop in Markdown', publicationSection.includes('for post in research_posts')],
  ['research category', publicationSection.includes("post.categories contains 'research'")],
  ['artifact publication link', publicationSection.includes('post.artifact')],
  ['CCS 2026 publication Markdown', existsSync('_posts/2026-08-01-when-ad-networks-misbehave.md')],
  ['CCS 2026 arXiv paper link', ccsPublication.includes('paper: "https://arxiv.org/pdf/2609.09574"')],
  ['publication feature list', ccsPublication.includes('features:\n  - ') && publicationSection.includes('for feature in post.features')],
  ['poster loop in Markdown', posterSection.includes('for post in poster_posts')],
  ['poster category', posterSection.includes("post.categories contains 'poster'")],
  ['S&P 2026 poster Markdown', spPoster.includes('Understanding Risks of Semi-Drive-By Splash Ads') && spPoster.includes('sp2026posters-final91.pdf')],
  ['Awards Markdown section', awardsSection.includes('## Selected Honors & Awards')],
  ['nine award entries', (awardsSection.match(/^\| .+ \| 20\d{2} \|$/gmu) || []).length === 9],
  ['Experience Markdown section', experiencesSection.includes('## Experience') && experiencesSection.includes('Johns Hopkins University') && experiencesSection.includes('University of Central Florida')],
  ['four experience entries', (experiencesSection.match(/^\|\s*.+\|\s*(?:Jun|Feb|Jul) 20\d{2} .+\|$/gmu) || []).length === 4],
  ['StarBugs Markdown section', starbugsSection.includes('section_id: starbugs') && starbugsSection.includes('nav: StarBugs')],
  ['StarBugs Markdown content', starbugsBody.includes('## StarBugs') && starbugsBody.includes('| Advisory | Project / Product | Impact |') && !starbugsBody.includes('CVE-YYYY-NNNN')],
  ['seven StarBugs entries', starbugsRows.length === 7],
  ['complete StarBugs table rows', starbugsRows.every((line) => line.split('|').length === 5)],
  ['StarBugs impact wording', starbugsBody.includes('Command Injection') && starbugsBody.includes('One-Click Command Execution')],
  ['StarBugs summary wording', starbugsBody.includes('over 30 CVEs in repositories with more than 1K stars on GitHub') && starbugsBody.includes('Xiaomi, Photonicat, Microsoft, and others')],
  ['browser-tools-mcp StarBug entry', starbugsBody.includes('[CVE-2026-7064](https://www.cve.org/CVERecord?id=CVE-2026-7064)') && starbugsBody.includes('[browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp) | Command Injection')],
  ['FlowDroid StarBug entry', starbugsBody.includes('[CVE-2021-32754](https://github.com/secure-software-engineering/FlowDroid/security/advisories/GHSA-39r7-275f-rvgw)') && starbugsBody.includes('[FlowDroid](https://github.com/secure-software-engineering/FlowDroid) | XXE')],
  ['Misc Markdown section', miscSection.includes('section_id: misc') && miscSection.includes('nav: Misc') && miscSection.includes('order: 10')],
  ['natural interests wording', miscSection.includes('Outside of research, I enjoy swimming, working out, and hiking. They help me relax and recharge.')],
  ['StarBugs Markdown authoring guide', readme.includes('## Add StarBugs') && readme.includes('| Advisory | Project / Product | Impact |')],
  ['blank talk Markdown stays empty', talksSection.trim() === ''],
  ['sections collection', config.includes('sections:') && config.includes('output: false')],
  ['publication Markdown folder', existsSync('_posts/.gitkeep')],
  ['talk Markdown folder', existsSync('_talks/.gitkeep')],
  ['empty-section suppression', layout.includes("visible_content != ''")],
  ['uploaded profile image', sectionSources.includes('images/personal.png') && existsSync('images/personal.png')],
  ['JHU remote research internship biography', sectionSources.includes('Luckily, I am currently a remote research intern at Johns Hopkins University, advised by Prof. Yinzhi Cao.')],
  ['master degree grammar', sectionSources.includes("I received my master's degree")],
  ['CV removed from About', !sectionSources.includes('assets/cv.pdf')],
  ['CV PDF removed', !existsSync('assets/cv.pdf')],
  ['Sass entry', existsSync('style.scss')],
  ['Jekyll workflow', workflow.includes('actions/jekyll-build-pages@v1')],
  ['GitHub Pages deployment', workflow.includes('actions/deploy-pages@v4')],
  ['footer credits removed', !layout.includes('<footer>') && !layout.includes('Last updated:')],
  ['English public content', !/[\u3400-\u9fff]/u.test(publishedSources) && layout.includes('<html lang="en">')]
];

const failed = assertions.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(`FAIL ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}
console.log(`PASS modified: ${assertions.length}/${assertions.length} checks`);
