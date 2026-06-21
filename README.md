# Flux Docs

Flux official documentation site built with [Docusaurus](https://docusaurus.io/).

## Local Development

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

The static output is generated in the `build` directory.

## Cloudflare Pages

Recommended build settings:

```text
Framework preset: Docusaurus
Production branch: main
Build command: npm run build
Build output directory: build
Root directory: /
Environment variable: NODE_VERSION=22
```

### Optional PostHog feedback analytics

The "Was this page useful?" control works without analytics. To collect
aggregated feedback in PostHog, set these Cloudflare Pages environment
variables:

```text
POSTHOG_PROJECT_API_KEY=<your public PostHog project token>
POSTHOG_HOST=https://us.i.posthog.com
```

Use `https://eu.i.posthog.com` for EU Cloud, or your own domain for a
self-hosted PostHog instance. Feedback is sent as the `docs_feedback` event
with `path` and `vote` properties, and person profile processing is disabled.

## Documentation Structure

```text
docs/
  getting-started/
  installation/
  subscription/
  nodes/
  troubleshooting/
  api/
  faq/
  changelog/
  legal/
```
