// The caller supplies the configured site. Empty configuration and SSR are inert.
export function loadCrisp(websiteId, browserWindow = globalThis.window, doc = globalThis.document) {
  const id = typeof websiteId === 'string' ? websiteId.trim() : '';
  if (!id || !browserWindow || !doc) return;

  browserWindow.$crisp ??= [];
  browserWindow.CRISP_WEBSITE_ID = id;

  for (const [scriptId, src] of [
    ['crispai-welcome-script', 'https://crisp.cloudarch.org/intro.js'],
    ['crisp-chatbox-script', 'https://client.crisp.chat/l.js'],
  ]) {
    if (doc.getElementById(scriptId)) continue;
    const script = doc.createElement('script');
    script.id = scriptId;
    script.src = src;
    script.async = true;
    doc.head.appendChild(script);
  }
}
