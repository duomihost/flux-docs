// Temporary mitigation for GHSA-vfj7-8cjw-p6xm. Keep upstream's identity and
// audit findings intact; fail closed if its source/version no longer matches.
import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const ORIGINAL_SHA256 = 'e572166565f15fa6ad9865ae49d678218e32aabfd1b3720f6d0d43d39800d310';
const PATCHED_SHA256 = '58ca6dc41ca8b1253c0714ef0c335689fdead7919db948dd1f8f14a5df80011b';
const hash = (value) => createHash('sha256').update(value).digest('hex');

export function patchBuildDependencies(root = ROOT) {
  const lock = JSON.parse(readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
  const locations = Object.keys(lock.packages).filter(location =>
    location === 'node_modules/braces' || location.endsWith('/node_modules/braces'));
  if (!locations.length) throw new Error('braces 依赖路径已变化，请复核并移除过时的安全补丁。');
  for (const location of locations) {
    const dir = path.join(root, location);
    const {version} = JSON.parse(readFileSync(path.join(dir, 'package.json'), 'utf8'));
    if (version !== '3.0.3') throw new Error(`braces ${version} 需要重新核查安全补丁，不能直接沿用。`);
    const file = path.join(dir, 'lib/parse.js');
    const original = readFileSync(file, 'utf8');
    if (hash(original) === PATCHED_SHA256) continue;
    if (hash(original) !== ORIGINAL_SHA256) throw new Error(`${location}: braces 文件摘要不匹配，拒绝修改。`);
    const patched = original.replaceAll('      stack.push(block);', [
      '      if (stack.length >= 128) {',
      "        throw new SyntaxError('braces nesting exceeds the build safety limit (128)');",
      '      }',
      '      stack.push(block);',
    ].join('\n'));
    if (hash(patched) !== PATCHED_SHA256) throw new Error('braces 安全补丁结果摘要不匹配。');
    writeFileSync(file, patched);
  }
  console.log('braces 3.0.3 构建安全补丁已核验：解析嵌套限制为 128 层。');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  patchBuildDependencies();
}
