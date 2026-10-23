import test from 'node:test';
import assert from 'node:assert/strict';
import {cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {parseEntries, validateChangelog} from './lib/entries.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const options = {fallbackDate: '1970-01-01', pageUrl: '/docs/changelog', platforms: true};
const release = (title, date = '2026.10.23') =>
  `## ${title}\n**${date}**\n版本：Windows ${title}.0001\n### Windows\n- 改进连接。\n`;

test('拒绝无效日历日期，包括位于两个有效日期之间的非法日期', () => {
  for (const date of ['2026.10.99', '2026.02.29', '2026.00.23', '2026.13.01']) {
    assert.throws(() => parseEntries('index', release('2026.1023', date), options), /日期/);
  }
  assert.throws(() => parseEntries('index',
    release('2026.1023') + '\n2026.11.31\n2026.12.01', options), /日期/);
  assert.doesNotThrow(() => parseEntries('index', release('2028.0229', '2028.02.29'), options));
});

test('拒绝无效版本标题和重复条目，保留合法历史清单格式', () => {
  for (const title of ['2026.1099', '2026.10.23', '20261023']) {
    assert.ok(validateChangelog(parseEntries('index', release(title), options)).length);
  }
  const entries = parseEntries('index', release('2026.1023') + release('2026.1023'), options);
  assert.ok(validateChangelog(entries).some(problem => problem.includes('重复')));
  const [valid] = parseEntries('index', release('2026.1023'), options);
  assert.deepEqual(validateChangelog([valid]), []);
  assert.equal(valid.id, 'bdff5af6a8ae');
  assert.equal(valid.published, '2026-10-23');
  assert.equal(valid.url, '/docs/changelog#20261023');
});

test('独立清单入口拒绝非法公告和重复更新日志，不能绕过校验', (t) => {
  const temp = mkdtempSync(path.join(tmpdir(), 'flux-docs-feeds-'));
  t.after(() => rmSync(temp, {recursive: true, force: true}));
  mkdirSync(path.join(temp, 'scripts'));
  cpSync(path.join(root, 'scripts/build-feeds.mjs'), path.join(temp, 'scripts/build-feeds.mjs'));
  cpSync(path.join(root, 'scripts/lib'), path.join(temp, 'scripts/lib'), {recursive: true});
  symlinkSync(path.join(root, 'node_modules'), path.join(temp, 'node_modules'), 'dir');
  mkdirSync(path.join(temp, 'build'));
  mkdirSync(path.join(temp, 'docs/announcements'), {recursive: true});
  mkdirSync(path.join(temp, 'docs/changelog'), {recursive: true});
  const announcement = path.join(temp, 'docs/announcements/2026.md');
  const changelog = path.join(temp, 'docs/changelog/index.md');
  for (const [announcementText, changelogText] of [
    ['## 公告\n**2026.02.30**', release('2026.1023')],
    ['## 公告\n**2026.10.23**\n## 公告\n**2026.10.23**', release('2026.1023')],
    ['## 公告\n**2026.10.23**', release('2026.1023') + release('2026.1023')],
  ]) {
    writeFileSync(announcement, announcementText);
    writeFileSync(changelog, changelogText);
    const result = spawnSync(process.execPath, ['scripts/build-feeds.mjs'], {cwd: temp, encoding: 'utf8'});
    assert.notEqual(result.status, 0, '非法源文件必须令独立清单构建失败');
    assert.match(result.stderr, /日期|重复/);
  }
  writeFileSync(announcement, '## 公告\n**2026.10.23**\n服务正常。');
  writeFileSync(changelog, release('2026.1023'));
  const result = spawnSync(process.execPath, ['scripts/build-feeds.mjs'], {cwd: temp, encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  const feed = JSON.parse(readFileSync(path.join(temp, 'build/changelog/index.json'), 'utf8'));
  assert.equal(feed.version, 2);
  assert.equal(feed.parts[0].entries[0].id, 'bdff5af6a8ae');
  assert.equal(feed.parts[0].entries[0].sections, undefined);
});
