import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {patchBuildDependencies} from './patch-build-dependencies.mjs';

const require = createRequire(import.meta.url);
const packageDir = path.dirname(require.resolve('braces/package.json'));
const affected = ['compile.js', 'expand.js', 'parse.js', 'stringify.js', 'depth-guard.js'];

function fixture(t, locations = ['node_modules/braces']) {
  const root = mkdtempSync(path.join(tmpdir(), 'flux-docs-braces-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  for (const location of locations) cpSync(packageDir, path.join(root, location), {recursive: true});
  writeFileSync(path.join(root, 'package-lock.json'), JSON.stringify({packages: {
    'node_modules/@types/braces': {}, ...Object.fromEntries(locations.map(location => [location, {}])),
  }}));
  return root;
}

test('braces 每个受影响文件的未知漂移均被拒绝', t => {
  for (const name of affected) {
    const root = fixture(t);
    const file = path.join(root, 'node_modules/braces/lib', name);
    writeFileSync(file, readFileSync(file, 'utf8') + '\n// unknown drift\n');
    assert.throws(() => patchBuildDependencies(root), /摘要不匹配/);
  }
});

test('braces 先核验所有安装位置再写入，重复执行不改变文件', t => {
  const locations = ['node_modules/braces', 'node_modules/helper/node_modules/braces'];
  const root = fixture(t, locations);
  const guard = path.join(root, locations[0], 'lib/depth-guard.js');
  rmSync(guard);
  const nested = path.join(root, locations[1], 'lib/compile.js');
  const original = readFileSync(nested, 'utf8');
  writeFileSync(nested, original + '\n// unknown drift\n');
  assert.throws(() => patchBuildDependencies(root), /摘要不匹配/);
  assert.equal(existsSync(guard), false, '后一个安装位置核验失败时，前一个位置也不能写入');
  writeFileSync(nested, original);
  patchBuildDependencies(root);
  assert.equal(readFileSync(guard, 'utf8'), readFileSync(path.join(packageDir, 'lib/depth-guard.js'), 'utf8'));
  const files = locations.flatMap(location => affected.map(name => path.join(root, location, 'lib', name)));
  const before = files.map(file => readFileSync(file, 'utf8'));
  patchBuildDependencies(root);
  assert.deepEqual(files.map(file => readFileSync(file, 'utf8')), before);
});

function isolated(mode, flags = []) {
  const result = spawnSync(process.execPath, [
    '--max-old-space-size=128', ...flags,
    fileURLToPath(new URL('./fixtures/braces-security.cjs', import.meta.url)),
    require.resolve('braces'), mode,
  ], {timeout: 8000, maxBuffer: 100000});
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr?.toString());
  return JSON.parse(result.stdout.toString()).checks;
}

test('braces 深层/循环 AST、节点预算和外部父引用在有界子进程内处理', () => {
  assert.equal(isolated('security'), 44);
});

test('braces 小栈下正常输入可处理，过深输入受控拒绝', () => {
  assert.equal(isolated('boundary', ['--stack-size=256']), 40);
});

test('braces 保持原版引号、转义、范围及普通模式的输出', () => {
  const braces = require('braces');
  const corpus = JSON.parse(readFileSync(new URL('./fixtures/braces-compat.json', import.meta.url), 'utf8'));
  for (const {pattern, options, expected} of corpus.cases) {
    for (const method of ['compile', 'expand', 'stringify']) {
      assert.deepEqual(braces[method](pattern, options), expected[method], `${method}(${pattern})`);
    }
  }
});
