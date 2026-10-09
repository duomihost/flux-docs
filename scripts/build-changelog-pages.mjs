// 站点构建前，从 docs/changelog/index.md（唯一手写源）生成四个平台页面：
//   docs/changelog/windows.md / macos.md / android.md / ios.md
// 每页只保留该平台小节 + 「全平台」小节；某版本两者都没有就整版略过。
// 生成物不入库（.gitignore），`npm run start` / `npm run build` 前自动执行。
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  PLATFORM_LABELS,
  parseEntries,
  renderHtml,
  splitFrontMatter,
  stripTopHeading,
  validateChangelog,
} from './lib/entries.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(root, 'docs/changelog/index.md');
const PAGE_PLATFORMS = ['windows', 'macos', 'android', 'ios'];

const raw = readFileSync(sourcePath, 'utf8');
const body = stripTopHeading(splitFrontMatter(raw));
const entries = parseEntries('index', body, {
  fallbackDate: '1970-01-01',
  pageUrl: '/docs/changelog',
  platforms: true,
});

const problems = validateChangelog(entries);
if (problems.length) {
  console.error(`docs/changelog/index.md 不符合写作约束(见 scripts/lib/entries.mjs validateChangelog):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

const LIST_ITEM_RE = /^\s*(?:[-*+]|\d+[.)])\s/;

/// 本平台小节在前、全平台小节在后。两段都是列表时用单个换行接成一个紧凑列表:
/// 中间留空行会把两段并成一个松散列表(`<li><p>`),每项都撑出段落间距。
function joinSections(own, shared) {
  if (!own || !shared) return own || shared;
  const lastOwn = own.split('\n').at(-1);
  const firstShared = shared.split('\n')[0];
  const glue = LIST_ITEM_RE.test(lastOwn) && LIST_ITEM_RE.test(firstShared) ? '\n' : '\n\n';
  return `${own}${glue}${shared}`;
}

const pageProblems = [];

for (const platform of PAGE_PLATFORMS) {
  const label = PLATFORM_LABELS[platform];
  const blocks = [];
  for (const entry of entries) {
    // 日期由 dateLine 统一展示，源文件首行日期不再作为通用更新正文输出。
    const shared = entry.sections.all?.replace(/^\*\*\d{4}\.\d{2}\.\d{2}\*\*\s*(?:\n|$)/, '').trim();
    const own = entry.sections[platform];
    if (!shared && !own) continue;
    const version = entry.versions?.[platform];
    const beta = Boolean(version) && entry.betas?.includes(platform);
    const dateLine = `**${entry.published.replaceAll('-', '.')}**${version ? ` · V${version}` : ''}`
      + (beta ? ' <span className="changelog-beta-tag">Beta</span>' : '');
    const parts = [`## ${entry.title}`, '', dateLine, ''];
    // Beta(测试包)正文整体小一号,与正式版区分;标题留在外面,目录照常收录。
    if (beta) parts.push('<div className="changelog-beta">', '');
    const content = joinSections(own, shared);
    if (renderHtml(content).includes('<li><p>')) {
      pageProblems.push(`${label} 页 ## ${entry.title}:拼接后成了松散列表`);
    }
    parts.push(content, '');
    if (beta) parts.push('</div>', '');
    blocks.push(parts.join('\n'));
  }
  const content = [
    '---',
    `title: ${label} 更新日志`,
    `description: Paxora ${label} 客户端版本更新记录。`,
    `sidebar_label: ${label}`,
    'toc_max_heading_level: 2',
    '---',
    '',
    '{/* 本文件由 scripts/build-changelog-pages.mjs 从 index.md 生成，请勿手改 */}',
    '',
    `# ${label} 更新日志`,
    '',
    `各平台版本号统一；本页只列 ${label} 相关与全平台通用的改动，完整记录见[更新日志总览](./index.md)。`,
    '',
    blocks.length ? blocks.join('\n') : '_暂无记录。_',
    '',
  ].join('\n');
  writeFileSync(path.join(root, `docs/changelog/${platform}.md`), content);
}
if (pageProblems.length) {
  console.error('生成的平台页不符合写作约束:');
  for (const problem of pageProblems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(`changelog pages: ${PAGE_PLATFORMS.join(', ')} (${entries.length} 个版本)`);
