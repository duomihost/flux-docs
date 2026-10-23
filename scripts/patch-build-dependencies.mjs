// Temporary mitigation for GHSA-vfj7-8cjw-p6xm. Keep upstream's identity and
// audit findings intact; fail closed if its source/version no longer matches.
import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const hash = (value) => createHash('sha256').update(value).digest('hex');
const LEGACY_PARSE_SHA256 = '58ca6dc41ca8b1253c0714ef0c335689fdead7919db948dd1f8f14a5df80011b';
const LEGACY_GUARD = [
  '      if (stack.length >= 128) {',
  "        throw new SyntaxError('braces nesting exceeds the build safety limit (128)');",
  '      }',
  '',
].join('\n');
const treeGuard = source => source
  .replace("const utils = require('./utils');", "const utils = require('./utils');\nconst {assertTree} = require('./depth-guard');")
  .replace('(ast, options = {}) => {', '(ast, options = {}) => {\n  assertTree(ast);');

// Fixed source and output digests make these exact transforms fail closed.
const PATCHES = [
  {
    file: 'lib/compile.js',
    original: 'dc98f22eee3d511785d92a00758d5f0d48efed5f5813bdecc2de430c529b5c9f',
    patched: 'dc51609991a4a5900894b2316ef022501ef84e96bc9a66b4be9ff3cb30f7cf13',
    apply: treeGuard,
  },
  {
    file: 'lib/stringify.js',
    original: '379f22d77bfa1478341ccd49c5e4267464aabcbba03558bab332aac23fc6f23a',
    patched: 'e13a4b16595fbd9ac517bdb3ca7d9e2d611ae2efa604d61309f1c357ac7c1860',
    apply: treeGuard,
  },
  {
    file: 'lib/parse.js',
    original: 'e572166565f15fa6ad9865ae49d678218e32aabfd1b3720f6d0d43d39800d310',
    patched: 'da7e0140502bf8d29a1efe6fbe0e4f410767fb5464959429b8be88b1ae2b7b70',
    apply: source => source
      .replace("const stringify = require('./stringify');", "const stringify = require('./stringify');\nconst {assertDepth} = require('./depth-guard');")
      .replace('if (value === CHAR_LEFT_PARENTHESES) {', 'if (value === CHAR_LEFT_PARENTHESES) {\n      assertDepth(stack.length + 1);')
      .replace('if (value === CHAR_LEFT_CURLY_BRACE) {', 'if (value === CHAR_LEFT_CURLY_BRACE) {\n      assertDepth(stack.length + 1);'),
  },
  {
    file: 'lib/expand.js',
    original: '41ccc196ebfa7b7781a634e721eb744e4e7bcb54cba427a7e3d6806a1b9e58f7',
    patched: 'd3c564904479a0e3e3b5bb75616bcc563869b8885a8768ff6798ed50f0d70c53',
    apply: source => treeGuard(source)
      .replace('const walk = (node, parent = {}) => {', 'const walk = (node, parentQueue) => {')
      .replace(`    let p = parent;
    let q = parent.queue;

    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
      p = p.parent;
      q = p.queue;
    }`, '    const q = parentQueue;')
      .replace(`    let queue = node.queue;
    let block = node;

    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
      block = block.parent;
      queue = block.queue;
    }`, `    const queue = node.type === 'brace' || node.type === 'root' || parentQueue === undefined
      ? node.queue : parentQueue;`)
      .replace('walk(child, node);', 'walk(child, queue);'),
  },
  {
    file: 'lib/depth-guard.js',
    patched: 'fed13d0e5a013cea39ed2e3707be29133e7293e753b2783a9cbe4b92ed978b9e',
    apply: () => readFileSync(new URL('./patches/braces-3.0.3/depth-guard.cjs', import.meta.url), 'utf8'),
  },
];

export function patchBuildDependencies(root = ROOT) {
  const lock = JSON.parse(readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
  const locations = Object.keys(lock.packages).filter(location =>
    location === 'node_modules/braces' || location.endsWith('/node_modules/braces'));
  if (!locations.length) throw new Error('braces 依赖路径已变化，请复核并移除过时的安全补丁。');
  const writes = [];
  for (const location of locations) {
    const dir = path.join(root, location);
    const {version} = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'));
    if (version !== '3.0.3') throw new Error(`braces ${version} 需要重新核查安全补丁，不能直接沿用。`);
    for (const patch of PATCHES) {
      const file = path.join(dir, patch.file);
      let source = existsSync(file) ? readFileSync(file, 'utf8') : undefined;
      const digest = source === undefined ? undefined : hash(source);
      if (digest === patch.patched) continue;
      if (patch.file === 'lib/parse.js' && digest === LEGACY_PARSE_SHA256) {
        source = source.replaceAll(LEGACY_GUARD, '');
      }
      if (source === undefined ? patch.original !== undefined : hash(source) !== patch.original) {
        throw new Error(`${location}/${patch.file}: braces 文件摘要不匹配，拒绝修改。`);
      }
      const patched = patch.apply(source);
      if (hash(patched) !== patch.patched) throw new Error(`${patch.file}: braces 安全补丁结果摘要不匹配。`);
      writes.push({file, patched, digest: patch.patched});
    }
  }
  // Validate every file in every installation before modifying any of them.
  for (const {file, patched} of writes) writeFileSync(file, patched);
  for (const {file, digest} of writes) {
    if (hash(readFileSync(file)) !== digest) throw new Error(`${file}: braces 写入后摘要不匹配。`);
  }
  console.log(`braces 3.0.3 安全补丁已核验（${locations.length} 个安装位置）：AST 深度 128，访问预算 65536，循环检测及展开队列防护。`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  patchBuildDependencies();
}
