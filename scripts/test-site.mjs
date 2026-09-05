import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.argv[2] || 'index.html');
const baseline = process.argv.includes('--baseline');
const html = readFileSync(file, 'utf8');
const assertions = baseline
  ? [['previous design', html.includes('Academic Homepage') && html.includes('theme-toggle')]]
  : [
      ['language', html.includes('lang="zh-CN"')],
      ['responsive viewport', html.includes('name="viewport"')],
      ['same section model', ['about','news','research','publications','talks','awards','services','experiences'].every(id => html.includes(`id="${id}"`))],
      ['fixed side navigation', html.includes('class="side-nav"')],
      ['table-based about layout', html.includes('class="layout-table"')],
      ['profile links', ['Email','GitHub','CV','Scholar','LinkedIn'].every(name => html.includes(name))],
      ['source attribution', html.includes('jackfromeast.github.io') && html.includes('jonbarron.info')],
      ['stylesheet', existsSync(resolve('styles.css'))],
      ['javascript', existsSync(resolve('script.js'))],
      ['GitHub Pages workflow', existsSync(resolve('.github/workflows/pages.yml'))]
    ];

const failed = assertions.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(`FAIL ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}
console.log(`PASS ${baseline ? 'baseline' : 'modified'}: ${assertions.length}/${assertions.length} checks`);
