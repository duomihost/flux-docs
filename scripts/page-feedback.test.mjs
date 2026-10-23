import test from 'node:test';
import assert from 'node:assert/strict';
import {captureFeedback, readFeedback, saveFeedback} from '../src/lib/page-feedback.mjs';

function fixture() {
  const values = new Map();
  return {
    localStorage: {getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value)},
    location: {href: 'https://docs.example.test/docs/a'},
    crypto: {randomUUID: () => 'test-id'},
  };
}

test('反馈按路径恢复，未配置统计时不发请求', async () => {
  const win = fixture();
  const key = 'flux-docs-page-feedback:/docs/a';
  saveFeedback(key, 'yes', win);
  assert.equal(readFeedback(key, win), 'yes');
  assert.equal(readFeedback('flux-docs-page-feedback:/docs/b', win), null);
  win.localStorage.setItem(key, 'corrupt');
  assert.equal(readFeedback(key, win), null);
  let requests = 0;
  await captureFeedback({}, '/docs/a', 'yes', win, () => {requests++;});
  assert.equal(requests, 0);
});

test('反馈存储不可用或统计失败时仍能降级，事件保持原有契约', async () => {
  const win = fixture();
  const config = {posthogProjectApiKey: 'test-public-key', posthogHost: 'https://analytics.example.test/'};
  const requests = [];
  const fetcher = async (url, options) => {
    requests.push({url, options, body: JSON.parse(options.body)});
    throw new Error('模拟网络失败');
  };
  await captureFeedback(config, '/docs/a', 'no', win, fetcher);
  assert.equal(requests[0].url, 'https://analytics.example.test/i/v0/e/');
  assert.equal(requests[0].body.event, 'docs_feedback');
  assert.equal(requests[0].body.distinct_id, 'anonymous-test-id');
  assert.equal(requests[0].body.properties.$process_person_profile, false);
  assert.equal(requests[0].body.properties.path, '/docs/a');
  assert.equal(requests[0].body.properties.vote, 'no');
  Object.defineProperty(win, 'localStorage', {get() {throw new Error('禁止存储');}});
  assert.doesNotThrow(() => saveFeedback('key', 'yes', win));
  assert.equal(readFeedback('key', win), null);
  await captureFeedback(config, '/docs/b', 'yes', win, fetcher);
  assert.equal(requests.length, 2);
  assert.match(requests[1].body.distinct_id, /^anonymous-/);
});
