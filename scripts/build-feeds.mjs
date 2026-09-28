// 站点构建后，把「公告日志」与「更新日志」的年份文章转成客户端可直接消费的产物：
//   build/<feed>/<year>.html   正文 HTML 片段（无站点导航与样式，客户端用富文本组件渲染）
//   build/<feed>/index.json    年份清单 + 每条条目的标识、标题、发布/最后更新日期
//
// 写作约定（docs/announcements/<year>.md、docs/changelog/<year>.md）：
//   - 每个二级标题「## 」是一条公告 / 一个版本；
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
  {name: 'announcements', source: 'docs/announcements'},
  {name: 'changelog', source: 'docs/changelog'},
];
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

function entryId(year, title) {
  return createHash('sha1').update(`${year}\n${title}`).digest('hex').slice(0, 12);
}

function parseEntries(year, body) {
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
    return {
      id: entryId(year, entry.title),
      title: entry.title,
      published: dates[0] ?? `${year}-01-01`,
      updated: dates[dates.length - 1] ?? `${year}-01-01`,
    };
  });
}

for (const feed of FEEDS) {
  const sourceDir = path.join(root, feed.source);
  const outDir = path.join(buildDir, feed.name);
  mkdirSync(outDir, {recursive: true});
  const years = readdirSync(sourceDir)
    .filter((f) => /^\d{4}\.md$/.test(f))
    .map((f) => f.slice(0, 4))
    .sort()
    .reverse();
  if (years.length === 0) {
    console.warn(`${feed.source} 下没有年份文件，跳过`);
    continue;
  }
  const index = {version: 1, generated_at: new Date().toISOString(), years: []};
  for (const year of years) {
    const raw = readFileSync(path.join(sourceDir, `${year}.md`), 'utf8');
    const body = stripTopHeading(splitFrontMatter(raw));
    const html = marked.parse(body, {gfm: true});
    writeFileSync(path.join(outDir, `${year}.html`), html);
    index.years.push({
      year: Number(year),
      html: `${feed.name}/${year}.html`,
      entries: parseEntries(year, body),
    });
  }
  const all = index.years.flatMap((y) => y.entries);
  index.latest = all.reduce(
    (best, e) => (!best || e.updated > best.updated ? e : best),
    null,
  );
  writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`${feed.name}: ${years.length} 年, ${all.length} 条, 最新 ${index.latest?.title} (${index.latest?.updated})`);
}
