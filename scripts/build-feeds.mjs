// 站点构建后，把「公告日志」与「更新日志」的年份文章转成客户端可直接消费的产物：
//   build/<feed>/<part>.html   正文 HTML 片段（无站点导航与样式，客户端用富文本组件渲染）
//   build/<feed>/index.json    分片清单 + 每条条目的标识、标题、发布/最后更新日期、封面图
//
// 公告按年份分片（docs/announcements/<year>.md）；更新日志全平台一篇
// （docs/changelog/index.md，版本号各平台统一，不按年份、不按平台拆分）。
// 写作约定：
//   - 每个二级标题「## 」是一条公告 / 一个版本；
//   - 条目正文里的第一张图片会作为封面图写入清单，供客户端做卡片式展示；
//   - 正文里形如 2026.08.28 / 2026-08-28 的日期都会被识别：最小值为发布日期，
//     最大值为最后更新日期。同一条公告追加进展时，最后更新日期自动前进，
//     客户端据此重新提醒；
//   - 条目标识由 年份 + 标题 固定生成，改正文不会变，改标题会变成新条目。
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');
const FEEDS = [
  {name: 'announcements', source: 'docs/announcements', parts: 'years'},
  {name: 'changelog', source: 'docs/changelog', parts: 'single'},
];
const IMAGE_RE = /!\[[^\]]*\]\(([^)\s]+)[^)]*\)/;
const DATE_RE = /\b(20\d{2})[.\-/](\d{2})[.\-/](\d{2})\b/g;

if (!existsSync(buildDir)) {
  console.error('build/ 不存在，请先执行 docusaurus build');
  process.exit(1);
}

function splitFrontMatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  return match ? text.slice(match[0].length) : text;
}

function stripTopHeading(body) {
  // 去掉一级标题（页面标题），HTML 片段里由客户端自行显示页面名。
  return body.replace(/^\s*#\s+[^\n]*\n/, '');
}

function collectDates(text) {
  const dates = [];
  for (const m of text.matchAll(DATE_RE)) dates.push(`${m[1]}-${m[2]}-${m[3]}`);
  return dates.sort();
}

function entryId(part, title) {
  return createHash('sha1').update(`${part}\n${title}`).digest('hex').slice(0, 12);
}

function firstImage(text) {
  const m = IMAGE_RE.exec(text);
  return m ? m[1] : null;
}

function parseEntries(part, body, fallbackDate) {
  const entries = [];
  const lines = body.split(/\r?\n/);
  let current = null;
  for (const line of lines) {
    const heading = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      if (current) entries.push(current);
      current = {title: heading[1].trim(), lines: []};
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) entries.push(current);
  return entries.map((entry) => {
    const text = entry.lines.join('\n');
    const dates = collectDates(text);
    const image = firstImage(text);
    return {
      id: entryId(part, entry.title),
      title: entry.title,
      published: dates[0] ?? fallbackDate,
      updated: dates[dates.length - 1] ?? fallbackDate,
      ...(image ? {image} : {}),
    };
  });
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
  const index = {version: 1, generated_at: new Date().toISOString(), parts: []};
  for (const part of parts) {
    const raw = readFileSync(path.join(sourceDir, `${part}.md`), 'utf8');
    const body = stripTopHeading(splitFrontMatter(raw));
    const html = marked.parse(body, {gfm: true});
    writeFileSync(path.join(outDir, `${part}.html`), html);
    const fallbackDate = /^\d{4}$/.test(part) ? `${part}-01-01` : '1970-01-01';
    index.parts.push({
      ...(feed.parts === 'years' ? {year: Number(part)} : {}),
      html: `${feed.name}/${part}.html`,
      entries: parseEntries(part, body, fallbackDate),
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
