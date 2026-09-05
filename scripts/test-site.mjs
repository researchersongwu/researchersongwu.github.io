import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const file = resolve(process.argv[2] || 'index.html');
const baseline = process.argv.includes('--baseline');
const html = readFileSync(file, 'utf8');
const assertions = baseline
  ? [['starter title', html.includes('Academic Homepage Starter')], ['starter heading', html.includes('<h1>Your Name</h1>')]]
  : [
      ['language', html.includes('lang="zh-CN"')],
      ['responsive viewport', html.includes('name="viewport"')],
      ['sections', ['about','news','research','publications','experience'].every(id => html.includes(`id="${id}"`))],
      ['theme control', html.includes('id="theme-toggle"')],
      ['mobile navigation', html.includes('id="menu-toggle"')],
      ['publication filters', html.includes('data-year="all"')],
      ['stylesheet', existsSync(resolve(dirname(file), 'styles.css')) || existsSync(resolve('styles.css'))],
      ['javascript', existsSync(resolve(dirname(file), 'script.js')) || existsSync(resolve('script.js'))],
      ['GitHub Pages workflow', existsSync(resolve('.github/workflows/pages.yml'))]
    ];

const failed = assertions.filter(([, ok]) => !ok);
if (failed.length) {
  console.error(`FAIL ${failed.map(([name]) => name).join(', ')}`);
  process.exit(1);
}
console.log(`PASS ${baseline ? 'baseline' : 'modified'}: ${assertions.length}/${assertions.length} checks`);
