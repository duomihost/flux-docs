// 公告 / 更新日志文章的共用解析器。
//
// 写作约定：
//   - 每个二级标题「## 」是一条公告 / 一个版本；
//   - 更新日志的每个版本里可以用三级标题按平台分小节：
//     「### 全平台」「### Windows」「### macOS」「### Android」「### iOS」「### Linux」，
//     某平台这版没改动就不写那个小节；三级标题之前的内容归入「全平台」；
//   - 条目正文里的第一张图片会作为封面图写入清单，供客户端做卡片式展示；
//   - 正文里形如 2026.08.28 / 2026-08-28 的日期都会被识别：最小值为发布日期，
//     最大值为最后更新日期。同一条公告追加进展时，最后更新日期自动前进，
//     客户端据此重新提醒；
//   - 条目标识由 分片名 + 标题 固定生成，改正文不会变，改标题会变成新条目。
import {createHash} from 'node:crypto';
import {marked} from 'marked';

const IMAGE_RE = /!\[[^\]]*\]\(([^)\s]+)[^)]*\)/;
const DATE_RE = /\b(20\d{2})[.\-/](\d{2})[.\-/](\d{2})\b/g;

/// 平台小节标题 → 平台标识。客户端按同一套标识取本平台内容。
export const PLATFORM_ALIASES = {
  全平台: 'all',
  通用: 'all',
  all: 'all',
  windows: 'windows',
  macos: 'macos',
  mac: 'macos',
  android: 'android',
  安卓: 'android',
  ios: 'ios',
  'ios / ipados': 'ios',
  ipados: 'ios',
  linux: 'linux',
};

export const PLATFORM_LABELS = {
  all: '全平台',
  windows: 'Windows',
  macos: 'macOS',
  android: 'Android',
  ios: 'iOS',
  linux: 'Linux',
};

export function splitFrontMatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  return match ? text.slice(match[0].length) : text;
}

export function stripTopHeading(body) {
  // 去掉一级标题（页面标题），HTML 片段里由客户端自行显示页面名。
  return body.replace(/^\s*#\s+[^\n]*\n/, '');
}

function collectDates(text) {
  const dates = [];
  for (const m of text.matchAll(DATE_RE)) dates.push(`${m[1]}-${m[2]}-${m[3]}`);
  return dates.sort();
}

export function entryId(part, title) {
  return createHash('sha1').update(`${part}\n${title}`).digest('hex').slice(0, 12);
}

function firstImage(text) {
  const m = IMAGE_RE.exec(text);
  return m ? m[1] : null;
}

// 与 Docusaurus 默认标题锚点一致：小写、空白转连字符、去掉标点。
export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '');
}

const VERSIONS_RE = /^\s*(?:\*\*)?版本[：:]\s*(?:\*\*)?\s*(.+)$/;

/// 解析「版本：Windows 2026.0904.0809 · macOS 2026.0904.0809」→ {windows: …, macos: …}。
export function parseVersionsLine(lines) {
  for (const line of lines) {
    const m = VERSIONS_RE.exec(line);
    if (!m) continue;
    const result = {};
    for (const piece of m[1].split(/[·,，;；|]/)) {
      const pm = /^\s*([A-Za-z\u4e00-\u9fff\/ ]+?)\s+v?(\d{4}\.\d{4}\.\d{4})\s*$/i.exec(piece);
      if (!pm) continue;
      const key = PLATFORM_ALIASES[pm[1].trim().toLowerCase()];
      if (key && key !== 'all') result[key] = pm[2];
    }
    return result;
  }
  return {};
}

export function renderHtml(markdown) {
  return marked.parse(markdown.trim(), {gfm: true});
}

/// 把一条条目的正文按三级标题拆成平台小节；返回 {all: md, windows: md, ...}，
/// 只包含实际写了内容的平台。识别不了的三级标题原样归入前一个小节。
export function splitPlatformSections(lines) {
  const sections = new Map();
  let current = 'all';
  const push = (line) => {
    if (!sections.has(current)) sections.set(current, []);
    sections.get(current).push(line);
  };
  for (const line of lines) {
    if (VERSIONS_RE.test(line)) continue;
    const heading = /^###\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      const key = PLATFORM_ALIASES[heading[1].trim().toLowerCase()];
      if (key) {
        current = key;
        continue;
      }
    }
    push(line);
  }
  const result = {};
  for (const [key, value] of sections) {
    const text = value.join('\n').trim();
    if (text) result[key] = text;
  }
  return result;
}

/// 解析一篇文章的全部条目。
export function parseEntries(part, body, {fallbackDate, pageUrl, platforms = false}) {
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
    const result = {
      id: entryId(part, entry.title),
      title: entry.title,
      published: dates[0] ?? fallbackDate,
      updated: dates[dates.length - 1] ?? fallbackDate,
      ...(image ? {image} : {}),
      url: `${pageUrl}#${slugify(entry.title)}`,
      html: renderHtml(text),
    };
    if (platforms) {
      result.versions = parseVersionsLine(entry.lines);
      const sections = splitPlatformSections(entry.lines);
      result.sections = sections;
      result.platforms = Object.fromEntries(
        Object.entries(sections).map(([key, md]) => [key, renderHtml(md)]),
      );
    }
    return result;
  });
}
