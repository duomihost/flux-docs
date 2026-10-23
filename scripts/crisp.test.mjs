import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCrisp} from '../src/lib/crisp.mjs';

function fixture() {
  const nodes = [];
  return {
    nodes,
    win: {},
    doc: {
      getElementById: (id) => nodes.find(node => node.id === id),
      createElement: (tag) => ({tag}),
      head: {appendChild: (node) => nodes.push(node)},
    },
  };
}

test('Crisp 的空配置与 SSR 不产生脚本或全局状态', () => {
  const {win, doc, nodes} = fixture();
  for (const id of [undefined, null, '', '  ']) loadCrisp(id, win, doc);
  assert.deepEqual(win, {});
  assert.deepEqual(nodes, []);
  assert.doesNotThrow(() => loadCrisp('configured-site'));
});

test('Crisp 使用显式站点，重复挂载不重复注入且保留已有队列', () => {
  const {win, doc, nodes} = fixture();
  const queue = [['set', 'session:data', 'test']];
  win.$crisp = queue;
  loadCrisp(' configured-site ', win, doc);
  loadCrisp('configured-site', win, doc);
  assert.equal(win.CRISP_WEBSITE_ID, 'configured-site');
  assert.equal(win.$crisp, queue);
  assert.deepEqual(nodes.map(node => node.src), [
    'https://crisp.cloudarch.org/intro.js', 'https://client.crisp.chat/l.js',
  ]);
  assert.ok(nodes.every(node => node.async && node.tag === 'script'));
});
