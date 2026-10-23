const DISTINCT_ID_KEY = 'flux-docs-posthog-distinct-id';

export function readFeedback(storageKey, browserWindow = globalThis.window) {
  try {
    const value = browserWindow.localStorage.getItem(storageKey);
    return value === 'yes' || value === 'no' ? value : null;
  } catch {
    return null;
  }
}

export function saveFeedback(storageKey, vote, browserWindow = globalThis.window) {
  try {
    browserWindow.localStorage.setItem(storageKey, vote);
  } catch {
    // Acknowledging the vote does not depend on persistent storage.
  }
}

function distinctId(browserWindow) {
  try {
    const stored = browserWindow.localStorage.getItem(DISTINCT_ID_KEY);
    if (stored) return stored;
    const random = typeof browserWindow.crypto?.randomUUID === 'function'
      ? browserWindow.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const id = `anonymous-${random}`;
    browserWindow.localStorage.setItem(DISTINCT_ID_KEY, id);
    return id;
  } catch {
    return `anonymous-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

export async function captureFeedback(config, path, vote, browserWindow = globalThis.window, fetcher = globalThis.fetch) {
  if (!config.posthogProjectApiKey) return;
  try {
    const host = (config.posthogHost ?? 'https://us.i.posthog.com').replace(/\/+$/, '');
    await fetcher(`${host}/i/v0/e/`, {
      body: JSON.stringify({
        api_key: config.posthogProjectApiKey,
        distinct_id: distinctId(browserWindow),
        event: 'docs_feedback',
        properties: {
          $current_url: browserWindow.location.href,
          $process_person_profile: false,
          path,
          vote,
        },
      }),
      headers: {'Content-Type': 'application/json'},
      keepalive: true,
      method: 'POST',
    });
  } catch {
    // Analytics failures must never interrupt document reading or local votes.
  }
}
