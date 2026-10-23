import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {patchBuildDependencies} from './patch-build-dependencies.mjs';

const require = createRequire(import.meta.url);

test('安全补丁对版本或源码漂移立即失败，而不是静默放过', (t) => {
  const temp = mkdtempSync(path.join(tmpdir(), 'flux-docs-patch-'));
  t.after(() => rmSync(temp, {recursive: true, force: true}));
  const dir = path.join(temp, 'node_modules/braces');
  mkdirSync(path.join(dir, 'lib'), {recursive: true});
  writeFileSync(path.join(temp, 'package-lock.json'), JSON.stringify({packages: {
    'node_modules/@types/braces': {}, 'node_modules/braces': {},
  }}));
  writeFileSync(path.join(dir, 'package.json'), JSON.stringify({version: '3.0.4'}));
  assert.throws(() => patchBuildDependencies(temp), /重新核查/);
  writeFileSync(path.join(dir, 'package.json'), JSON.stringify({version: '3.0.3'}));
  writeFileSync(path.join(dir, 'lib/parse.js'), 'unexpected source');
  assert.throws(() => patchBuildDependencies(temp), /摘要不匹配/);
});

test('braces 对正常模式保持兼容，过深花括号与括号在递归遍历前拒绝', () => {
  const braces = require('braces');
  assert.deepEqual(braces.expand('docs/{getting-started,installation}/*.{md,mdx}'), [
    'docs/getting-started/*.md', 'docs/getting-started/*.mdx',
    'docs/installation/*.md', 'docs/installation/*.mdx',
  ]);
  for (const [left, right] of [['{', '}'], ['(', ')']]) {
    const input = left.repeat(4000) + 'a,b' + right.repeat(4000);
    for (const parse of [braces, braces.parse, braces.compile, braces.expand, braces.stringify]) {
      assert.throws(() => parse(input), error => error instanceof SyntaxError && /nesting/.test(error.message));
    }
  }
});

test('序列化补丁保持编译器 API，伪数组不能导致 CPU 无界循环', () => {
  const serialize = require('serialize-javascript');
  const serialized = serialize({regexp: /x/gi, date: new Date('2026-10-23T00:00:00Z'), text: '</script>'});
  assert.ok(!serialized.includes('</script>'));
  assert.ok(serialized.includes('RegExp'));
  const code = `const s=require('serialize-javascript');const a=Object.create(Array.prototype);a.length=4294967295;s(a);`;
  const result = spawnSync(process.execPath, ['-e', code], {cwd: new URL('../', import.meta.url), timeout: 3000});
  assert.equal(result.status, 0, result.stderr?.toString() || result.error?.message);
});

test('Tinypool 覆盖兼容 Docusaurus 的 worker 协议且忽略继承的 filename', async (t) => {
  const {default: Tinypool} = await import('tinypool');
  const temp = mkdtempSync(path.join(tmpdir(), 'flux-docs-worker-'));
  t.after(() => rmSync(temp, {recursive: true, force: true}));
  const worker = path.join(temp, 'worker.mjs');
  writeFileSync(worker, `import {workerData} from 'node:worker_threads';export default value=>({value,params:workerData[1].params,id:process.__tinypool_state__.workerId});`);
  const pool = new Tinypool({filename: worker, minThreads: 1, maxThreads: 2,
    runtime: 'worker_threads', isolateWorkers: false, concurrentTasksPerWorker: 1,
    workerData: {params: 'verified'}, maxMemoryLimitBeforeRecycle: 1000000000});
  t.after(() => pool.destroy());
  const options = Object.create({filename: path.join(temp, 'must-not-be-loaded.mjs')});
  const result = await pool.run('task', options);
  assert.equal(result.value, 'task');
  assert.equal(result.params, 'verified');
  assert.ok(result.id > 0);
});

test('SockJS 的 UUID v4 CommonJS 入口与搜索插件的中文解码保持兼容', () => {
  const sockjsRequire = createRequire(require.resolve('sockjs'));
  const uuid = sockjsRequire('uuid');
  assert.equal(uuid.validate(uuid.v4()), true);
  const searchRequire = createRequire(require.resolve('@easyops-cn/docusaurus-search-local'));
  const cheerio = searchRequire('cheerio');
  const $ = cheerio.loadBuffer(Buffer.from('<meta charset="utf-8"><h1>客户端下载与订阅</h1>'));
  assert.equal($('h1').text(), '客户端下载与订阅');
});
