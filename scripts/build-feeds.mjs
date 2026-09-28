// 站点构建后，把「公告日志」与「更新日志」文章转成客户端可直接消费的产物：
//   build/<feed>/<part>.html   正文 HTML 片段（无站点导航与样式，客户端用富文本组件渲染）
//   build/<feed>/index.json    分片清单 + 每条条目的标识、标题、发布/最后更新日期、封面图、
//                              网页锚点、正文 HTML；更新日志的条目另带 platforms
//                              （按平台拆好的 HTML：all / windows / macos / android / ios / linux）
//                              和 pages（各平台页面地址），客户端只显示本平台 + 全平台。
//
// 公告按年份分片（docs/announcements/<year>.md）；更新日志全平台一篇
// （docs/changelog/index.md，版本号各平台统一），平台页面由 build-changelog-pages.mjs 生成。
// 写作约定见 scripts/lib/entries.mjs。
import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseEntries, renderHtml, splitFrontMatter, stripTopHeading} from './lib/entries.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');
const FEEDS = [
  {name: 'announcements', source: 'docs/announcements', parts: 'years', page: '/docs/announcements/'},
  {name: 'changelog', source: 'docs/changelog', parts: 'single', page: '/docs/changelog', platforms: true},
];
const CHANGELOG_PAGES = {
  windows: '/docs/changelog/windows',
  macos: '/docs/changelog/macos',
  android: '/docs/changelog/android',
  ios: '/docs/changelog/ios',
};

if (!existsSync(buildDir)) {
  console.error('build/ 不存在，请先执行 docusaurus build');
  process.exit(1);
}

for (const feed of FEEDS) {
  const sourceDir = path.join(root, feed.source);
  const outDir = path.join(buildDir, feed.name);
  mkdirSync(outDir, {recursive: true});
  const parts =
    feed.parts === 'years'
      ? readdirSync(sourceDir)
          .filter((f) => /^\d{4}\.md$/.test(f))
          .map((f) => f.slice(0, 4))
          .sort()
          .reverse()
      : ['index'];
  if (parts.length === 0 || !existsSync(path.join(sourceDir, `${parts[0]}.md`))) {
    console.warn(`${feed.source} 下没有可用文件，跳过`);
    continue;
  }
  const index = {version: 2, generated_at: new Date().toISOString(), parts: []};
  if (feed.platforms) index.pages = CHANGELOG_PAGES;
  for (const part of parts) {
    const raw = readFileSync(path.join(sourceDir, `${part}.md`), 'utf8');
    const body = stripTopHeading(splitFrontMatter(raw));
    writeFileSync(path.join(outDir, `${part}.html`), renderHtml(body));
    const fallbackDate = /^\d{4}$/.test(part) ? `${part}-01-01` : '1970-01-01';
    const pageUrl = feed.parts === 'years' ? `${feed.page}${part}` : feed.page;
    const entries = parseEntries(part, body, {fallbackDate, pageUrl, platforms: feed.platforms})
      // sections（Markdown 原文）只给页面生成用，清单里只留 HTML。
      .map(({sections, ...entry}) => entry);
    index.parts.push({
      ...(feed.parts === 'years' ? {year: Number(part)} : {}),
      page: pageUrl,
      html: `${feed.name}/${part}.html`,
      entries,
    });
  }
  const all = index.parts.flatMap((p) => p.entries);
  index.latest = all.reduce(
    (best, e) => (!best || e.updated > best.updated ? e : best),
    null,
  );
  writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`${feed.name}: ${parts.length} 片, ${all.length} 条, 最新 ${index.latest?.title} (${index.latest?.updated})`);
}
