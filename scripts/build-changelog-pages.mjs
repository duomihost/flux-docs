// 站点构建前，从 docs/changelog/index.md（唯一手写源）生成四个平台页面：
//   docs/changelog/windows.md / macos.md / android.md / ios.md
// 每页只保留该平台小节 + 「全平台」小节；某版本两者都没有就整版略过。
// 生成物不入库（.gitignore），`npm run start` / `npm run build` 前自动执行。
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PLATFORM_LABELS, parseEntries, splitFrontMatter, stripTopHeading} from './lib/entries.mjs';

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

for (const platform of PAGE_PLATFORMS) {
  const label = PLATFORM_LABELS[platform];
  const blocks = [];
  for (const entry of entries) {
    const shared = entry.sections.all;
    const own = entry.sections[platform];
    if (!shared && !own) continue;
    const version = entry.versions?.[platform];
    const dateLine = `**${entry.published.replaceAll('-', '.')}**${version ? ` · V${version}` : ''}`;
    const parts = [`## ${entry.title}`, '', dateLine, ''];
    if (own) parts.push(own, '');
    if (shared) parts.push(shared, '');
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
console.log(`changelog pages: ${PAGE_PLATFORMS.join(', ')} (${entries.length} 个版本)`);
