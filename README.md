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

## Color Palette

The active site palette is defined in `src/css/custom.css` as Flux-specific
CSS variables. Visitors can switch palettes from the navbar color button next
to the light/dark toggle. The default palette is **Harbor**, tuned for a clean
technical docs feel:

```text
Background: #f8fbff / #ffffff
Text:       #172033 / #5f6b7a
Link:       #0b6f91 / #085a78
Accent:     #0ea5c6
```

Alternative combinations that work with the same variables:

```text
Aurora
Background: #f7f9f6 / #ffffff
Text:       #1f2937 / #5f6f62
Link:       #16725f / #115e50
Accent:     #65a30d

Graphite
Background: #f7f7f8 / #ffffff
Text:       #18181b / #62616a
Link:       #315f9f / #244c82
Accent:     #7c3aed

Pearl
Background: #fbfaf7 / #ffffff
Text:       #24201a / #6e6254
Link:       #a14d18 / #7c3a13
Accent:     #0f766e
```

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

### Optional Crisp customer support

To enable the Crisp chat widget, set this Cloudflare Pages environment
variable:

```text
CRISP_WEBSITE_ID=<your Crisp website id>
```

When this value is not configured, the Crisp script is not loaded.

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
