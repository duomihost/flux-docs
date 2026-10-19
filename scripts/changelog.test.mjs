import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import changelogVersionBadges from './remark-changelog-versions.mjs';
import {parseEntries, splitFrontMatter, stripTopHeading, validateChangelog} from './lib/entries.mjs';

test('总览为每个平台显示完整版本与对应包类型上标，不修改原始内容', () => {
  const source = '版本：Windows 2026.1019.1052 · macOS 2026.1019.1051 Beta';
  const tree = {children: [{type: 'paragraph', children: [{type: 'text', value: source}]}]};
  changelogVersionBadges()(tree, {path: '/docs/changelog/index.md'});
  const nodes = tree.children[0].children;
  assert.ok(nodes.some(n => n.value === 'Windows V2026.1019.1052'));
  assert.ok(nodes.some(n => n.value === 'macOS V2026.1019.1051'));
  const badges = nodes.filter(n => n.name === 'sup');
  assert.deepEqual(badges.map(n => n.children[0].value), ['正式版', 'Beta']);
  assert.equal(badges[1].attributes[0].value, 'changelog-kind changelog-kind-beta');
});

test('平台页和普通文档不经过总览版本转换', () => {
  for (const path of ['/docs/changelog/linux.md', '/docs/intro.md']) {
    const tree = {children: [{type: 'paragraph', children: [{type: 'text', value: '版本：Linux 2026.1019.1052'}]}]};
    const before = structuredClone(tree);
    changelogVersionBadges()(tree, {path});
    assert.deepEqual(tree, before);
  }
});

test('全部更新日志符合契约，生成页只含本平台已发布版本并正确标注包类型', () => {
  const raw = readFileSync(new URL('../docs/changelog/index.md', import.meta.url), 'utf8');
  const entries = parseEntries('index', stripTopHeading(splitFrontMatter(raw)), {
    fallbackDate: '1970-01-01', pageUrl: '/docs/changelog', platforms: true,
  });
  assert.deepEqual(validateChangelog(entries), []);
  for (const platform of ['windows', 'macos', 'android', 'ios', 'linux']) {
    const page = readFileSync(new URL(`../docs/changelog/${platform}.md`, import.meta.url), 'utf8');
    for (const entry of entries) {
      const version = entry.versions[platform];
      if (Object.keys(entry.versions).length && !version) {
        assert.ok(!page.includes(`## ${entry.title}\n`), `${platform} 不应包含 ${entry.title}`);
      } else if (version) {
        const beta = entry.betas.includes(platform);
        assert.ok(page.includes(`V${version} <sup className="changelog-kind${beta ? ' changelog-kind-beta' : ''}">${beta ? 'Beta' : '正式版'}</sup>`));
      }
    }
  }
});


test('客户端清单仍保留原格式，五个平台页面均可访问', () => {
  const feed = JSON.parse(readFileSync(new URL('../build/changelog/index.json', import.meta.url), 'utf8'));
  assert.equal(feed.version, 2);
  assert.deepEqual(Object.keys(feed.pages).sort(), ['android', 'ios', 'linux', 'macos', 'windows']);
  for (const route of Object.values(feed.pages)) {
    const html = readFileSync(new URL(`../build${route}/index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes('changelog-kind'));
    assert.ok(html.includes('/docs/changelog/linux'));
  }
  for (const entry of feed.parts.flatMap(part => part.entries)) {
    assert.ok(entry.title && entry.platforms);
    assert.ok(!entry.html.includes('changelog-kind'), '网页上标不能写入客户端原有 HTML');
    for (const version of Object.values(entry.versions)) assert.ok(entry.html.includes(version));
  }
});
