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
