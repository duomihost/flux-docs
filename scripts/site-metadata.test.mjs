import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const root = new URL('../', import.meta.url);
function metadata(source) {
  const dir = new URL('.docusaurus/docusaurus-plugin-content-docs/default/', root);
  for (const file of readdirSync(dir).filter(file => file.endsWith('.json'))) {
    const value = JSON.parse(readFileSync(new URL(file, dir), 'utf8'));
    if (value.source === `@site/${source}`) return value;
  }
  throw new Error(`缺少构建元数据 ${source}`);
}

function gitTime(source) {
  const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', source], {
    cwd: root, encoding: 'utf8',
  }).trim();
  return new Date(date).getTime();
}

test('文档显示真实 Git 修改时间及页面反馈，生成页继承手写源的时间', () => {
  const source = 'docs/subscription/import-subscription.md';
  assert.equal(metadata(source).lastUpdatedAt, gitTime(source));
  const html = readFileSync(new URL('build/docs/subscription/import-subscription/index.html', root), 'utf8');
  assert.ok(html.includes('最后更新于'));
  assert.ok(html.includes(new Date(gitTime(source)).toISOString()));
  assert.ok(html.includes('此页面是否有用'));
  for (const platform of ['windows', 'macos', 'android', 'ios', 'linux']) {
    assert.equal(metadata(`docs/changelog/${platform}.md`).lastUpdatedAt, gitTime('docs/changelog/index.md'));
  }
});

test('Linux 指引已编译并在首页、下载页、导览及定制客户端目录中可达', () => {
  const route = '/docs/installation/linux';
  const html = readFileSync(new URL(`build${route}/index.html`, root), 'utf8');
  for (const text of ['Ubuntu 24.04', 'amd64', 'arm64', 'Paxora-Linux', '卸载']) assert.ok(html.includes(text));
  assert.equal(metadata('docs/installation/linux.md').permalink, route);
  for (const page of ['', 'docs', 'docs/getting-started/download', 'docs/getting-started/overview', 'docs/custom-clients']) {
    const html = readFileSync(new URL(`build/${page ? page + '/' : ''}index.html`, root), 'utf8');
    // HTML minification may omit attribute quotes; require the complete href.
    assert.match(html, /href=["']?\/docs\/installation\/linux["'\s>]/, `${page || '/'} 应包含 Linux 教程链接`);
  }
});
