# technology-blog

Monorepo for the **Inference** bilingual blog on AI, Software Architecture & Infrastructure.

## Contents

| Path | Description |
|---|---|
| [`inference-theme/`](inference-theme/) | Custom Ghost Handlebars theme — deploy this to both Ghost instances |
| [`claude-design-frontend/`](claude-design-frontend/) | Static React prototype — source of record for the visual design |

## Ghost theme

See [`inference-theme/README.md`](inference-theme/README.md) for the full deploy procedure,
language switcher setup, and topic tag configuration.

The distributable is **`inference-theme-0.1.0.zip`** at the repo root.
Upload it to both Ghost instances (EN and PT-BR) and configure the
`site_language` theme setting per instance.
