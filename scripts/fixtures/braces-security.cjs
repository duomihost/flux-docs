// Run hostile inputs only in a process with a timeout and heap limit.
const assert = require('node:assert/strict');
const braces = require(process.argv[2]);
const methods = ['compile', 'expand', 'stringify'];
const bounded = error => error instanceof SyntaxError && error.code === 'ERR_BRACES_COMPLEXITY';
let checks = 0;
const reject = (method, input, options = {}) => {
  assert.throws(() => braces[method](input, options), bounded);
  checks++;
};

if (process.argv[3] === 'boundary') {
  for (const [left, right] of [['{', '}'], ['(', ')']]) {
    for (const depth of [64, 127, 128, 256, 2000]) {
      const pattern = left.repeat(depth) + 'x' + right.repeat(depth);
      for (const method of ['parse', ...methods]) {
        if (depth >= 128) reject(method, pattern);
        else {
          assert.doesNotThrow(() => braces[method](pattern));
          checks++;
        }
      }
    }
  }
} else {
  for (const [left, right] of [['{', '}'], ['(', ')']]) {
    const input = left.repeat(4000) + 'a,b' + right.repeat(4000);
    for (const maxDepth of [Infinity, NaN, 1000000]) {
      for (const method of ['parse', ...methods]) reject(method, input, {maxDepth, rangeLimit: false});
    }
  }
  for (const method of methods) {
    let deep = {type: 'text', value: 'x'};
    for (let i = 0; i < 12000; i++) deep = {type: 'root', nodes: [deep]};
    reject(method, deep, {maxDepth: Infinity});
    const cycle = {type: 'root', nodes: []};
    cycle.nodes.push(cycle);
    reject(method, cycle);
    let dag = {type: 'text', value: ''};
    for (let i = 0; i < 30; i++) dag = {type: 'root', nodes: [dag, dag]};
    reject(method, dag);
    reject(method, {type: 'root', nodes: Array(65536).fill({type: 'text', value: ''})});
    reject(method, {type: 'root', nodes: 'invalid children'});
  }
  // Parser-produced ASTs have intentional backlinks, and shared leaves are valid.
  const leaf = {type: 'text', value: 'x'};
  for (const method of methods) {
    const ast = {type: 'root', nodes: [leaf, leaf]};
    assert.deepEqual(braces[method](ast), method === 'expand' ? ['xx'] : 'xx');
    checks++;
  }
  for (const poisoned of ['cycle', 'getter']) {
    const child = {type: 'paren', nodes: [{type: 'text', value: 'x'}]};
    if (poisoned === 'cycle') child.parent = child;
    else Object.defineProperty(child, 'parent', {get() { throw new Error('external parent was read'); }});
    assert.deepEqual(braces.expand({type: 'root', nodes: [child]}), ['x']);
    checks++;
  }
}
process.stdout.write(JSON.stringify({checks}));
