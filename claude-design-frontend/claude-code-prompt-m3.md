# Convert Inference Static Frontend → Ghost Handlebars Theme

## Mission

You are converting an existing static frontend (HTML/CSS/JS or React) into a Ghost CMS-compatible Handlebars theme for the **Inference bilingual blog**. This completes Linear milestone **M3 — Custom Bilingual Theme** in the *Inference Bilingual Blog Pipeline* project (tickets TEM-66 → TEM-69).

You are an autonomous coding agent. Read everything in this folder before writing any file. Produce a plan, get my confirmation, then execute the four tickets in order with a pause between each one.

---

## Inputs — read these first, in this order

1. **`inferencebrandguidelines.pdf`** (in the repo, or in project files) — visual identity. Type scale, color tokens, spacing, brand voice. This is the source of truth for what the rendered blog must look like.
2. **`bilingualblogarchitecture.pdf`** — the system you're slotting into. Pay attention to §04 *Blog Platform* (theme structure, language switcher requirement) and §07 *Communication Flow* (so you understand who else writes to the theme — the M5 publisher writes the sibling slug into each post).
3. **Existing frontend codebase at `<FRONTEND_PATH>`** ← **FILL THIS IN BEFORE RUNNING**. This is the visual design you must preserve. Inventory the pages, components, CSS, fonts, and JS. Treat this directory as **read-only** — never modify it.
4. **Ghost theme docs** (web-fetch on demand):
   - https://ghost.org/docs/themes/structure/
   - https://ghost.org/docs/themes/contexts/
   - https://ghost.org/docs/themes/helpers/

If anything in the brand PDF conflicts with the implemented frontend, raise it before proceeding — don't silently pick one.

---

## Deliverable

A folder `inference-theme/` at the repo root with this exact shape:

```
inference-theme/
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── images/
├── partials/
│   └── language-switcher.hbs
├── default.hbs        ← base layout
├── index.hbs          ← post list (homepage)
├── post.hbs           ← single post page
├── package.json
├── README.md          ← deploy procedure
└── .gitignore
```

Plus a single distributable: `inference-theme-0.1.0.zip` at the repo root.

The theme must:
- Pass `gscan` validation with **zero errors**
- Visually match the source design — typography, colors, spacing, component layout
- Replace every static placeholder with the correct Ghost data variable
- Include a language switcher that round-trips between `en.yourblog.com` and `pt.yourblog.com`
- Activate cleanly on both Ghost instances from the same zip

---

## Phase 0 — Plan, then wait

Before touching any file, produce a written plan that covers:

1. **Source inventory** — what pages and components exist in `<FRONTEND_PATH>`, what stack they use (vanilla HTML, React, Tailwind, etc.)
2. **Mapping table** — for each source page/component, which `.hbs` file in the theme it becomes
3. **Styling strategy** — how the CSS gets carried over (copy verbatim, Tailwind compile, etc.)
4. **Risk list** — any design element that won't translate cleanly (JS-rendered charts, runtime React state, dynamic data not in Ghost's model). Flag these explicitly.
5. **Open questions for me** — anything ambiguous

**Stop here and wait for me to confirm the plan.** Do not start writing files.

---

## Phase 1 — TEM-66: Scaffold theme folder structure

Create the directory tree shown in the deliverable section. Create `package.json`:

```json
{
  "name": "inference-theme",
  "description": "Custom theme for the Inference bilingual blog",
  "version": "0.1.0",
  "engines": { "ghost": ">=5.0.0" },
  "license": "MIT",
  "author": { "name": "Gabriel Miki" },
  "config": {
    "posts_per_page": 10,
    "image_sizes": {
      "xs": { "width": 150  },
      "s":  { "width": 600  },
      "m":  { "width": 1000 },
      "l":  { "width": 2000 }
    },
    "custom": {
      "site_language": {
        "type": "select",
        "options": ["en", "pt"],
        "default": "en"
      }
    }
  }
}
```

The `site_language` custom setting is per-instance: the EN Ghost admin sets it to `en`, the PT admin to `pt`. The same zip serves both.

Create `.gitignore` for `node_modules/`, `.DS_Store`, `*.zip`. Initialize git if not already.

**Done when:** `gscan inference-theme/` runs with zero errors against the empty scaffold.

**Pause for review.**

---

## Phase 2 — TEM-67: Implement core templates with Inference branding

Three templates are mandatory. Build them in this order: `default.hbs`, then `post.hbs`, then `index.hbs` (post page is more constrained, gets the layout right; index reuses it).

### `default.hbs` (base layout)

Required helpers in this order:
- `<!DOCTYPE html>`, `<html lang="{{@site.locale}}">`
- `{{ghost_head}}` inside `<head>` — non-negotiable, Ghost injects scripts here
- `<body class="{{body_class}}">` — Ghost adds context classes (`post-template`, `tag-archive`, etc.)
- Site header containing `{{> "language-switcher"}}`
- `{{{body}}}` (triple braces — content is pre-rendered HTML) for the page slot
- Site footer
- `{{ghost_foot}}` immediately before `</body>` — non-negotiable
- All static files referenced via `{{asset "css/main.css"}}` etc., never raw paths

### `post.hbs` (single post page)

```handlebars
{{!< default}}

{{#post}}
<article class="post-full">
    <header>
        <h1>{{title}}</h1>
        <div class="meta">
            <span>{{primary_author.name}}</span>
            <time>{{date format="MMMM D, YYYY"}}</time>
            <span>{{reading_time}}</span>
        </div>
        {{#if feature_image}}
            <img src="{{img_url feature_image size="l"}}" alt="{{title}}">
        {{/if}}
    </header>
    <div class="content">{{content}}</div>
    {{#if tags}}
        <footer class="tags">
            {{#foreach tags}}<a href="{{url}}">#{{name}}</a>{{/foreach}}
        </footer>
    {{/if}}
</article>
{{/post}}
```

### `index.hbs` (post list / homepage)

```handlebars
{{!< default}}

<section class="posts">
    {{#foreach posts}}
    <article class="post-card">
        {{#if feature_image}}
            <img src="{{img_url feature_image size="m"}}" alt="{{title}}">
        {{/if}}
        <h2><a href="{{url}}">{{title}}</a></h2>
        <p class="excerpt">{{excerpt words="30"}}</p>
        <time>{{date format="MMM D, YYYY"}}</time>
        {{#if primary_tag}}<span class="tag">{{primary_tag.name}}</span>{{/if}}
    </article>
    {{/foreach}}
    {{pagination}}
</section>
```

### Styling carry-over

**If the source is plain HTML/CSS:** copy `style.css` (or equivalent) to `assets/css/main.css` verbatim. Adjust any URL references that point to local files so they go through `{{asset}}`. Don't restyle — preserve the original.

**If the source is React + Tailwind:** do **not** ship the React runtime. Extract the JSX as static HTML (replace `className` → `class`, drop event handlers, hardcode component variants actually used on each page). Compile Tailwind to a static stylesheet:

```bash
npx tailwindcss -i ./src/input.css -o ./inference-theme/assets/css/main.css --minify
```

Ghost serves static assets only — no runtime build step.

### Content substitution rules

For every static placeholder in the design ("Sample post title", "Lorem ipsum…", a hardcoded date), find the **exact** Ghost variable in the contexts reference and substitute. Do not invent fields. If the design needs something Ghost doesn't expose, raise it.

Triple braces `{{{content}}}` for the post body — Ghost returns rendered HTML and double braces would escape it.

**Done when:** the file tree matches the deliverable, the rendered HTML on a test page visually matches the source design at desktop and mobile widths, and `gscan` is still clean.

**Pause for review.**

---

## Phase 3 — TEM-68: Implement language switcher

Create `partials/language-switcher.hbs`:

```handlebars
{{#match @custom.site_language "en"}}
    <a class="lang-switch" hreflang="pt-br"
       href="https://pt.yourblog.com/{{#if post.codeinjection_head}}{{post.codeinjection_head}}/{{/if}}">
        Português
    </a>
{{else}}
    <a class="lang-switch" hreflang="en"
       href="https://en.yourblog.com/{{#if post.codeinjection_head}}{{post.codeinjection_head}}/{{/if}}">
        English
    </a>
{{/match}}
```

### Design decisions to honour

- **Sibling slug storage**: the post's `codeinjection_head` field. The M5 publisher writes the sibling slug here at publish time. If empty (no sibling yet), the link falls back to the other instance's homepage — this is the desired behaviour.
- **Text, not flag emojis**: render "Português" / "English" as text. Flag emojis read inconsistently to screen readers and conflate language with nationality.
- **Same zip, different settings**: the EN instance has `@custom.site_language = "en"` (set in Ghost Admin → Design → Site-wide → Theme settings), the PT instance has `"pt"`. The partial reads this to know which side it's on and links to the other.
- **Style** the `.lang-switch` consistent with the brand guidelines — typically a small text link or chip in the header.

Reference the partial from `default.hbs` with `{{> "language-switcher"}}` in the header area.

**Done when:** on a test post with `codeinjection_head` set to the slug of a sibling post on the other instance, clicking the switcher resolves to the correct URL. With the field empty, it resolves to the other instance's homepage.

**Pause for review.**

---

## Phase 4 — TEM-69: Package and deploy

Validate:

```bash
npm install -g gscan
gscan inference-theme/
```

Resolve every error. Warnings: report them — I'll decide which to fix.

Package:

```bash
cd inference-theme
zip -r ../inference-theme-0.1.0.zip . \
    -x "*.git*" "node_modules/*" "*.DS_Store"
```

Write `inference-theme/README.md` with the deploy procedure:

1. Ghost Admin → Settings → Design → Change theme → Upload theme → select the zip
2. Activate
3. Design → Site-wide → Theme settings → set `site_language` to `en` (EN instance) or `pt` (PT instance)
4. Smoke test: publish a post on each side; set `Code injection → Post header` on each to the slug of the sibling post on the other instance; verify the language switcher round-trips

Cross-link the README from the repo root README.

**Done when:** the zip exists at the repo root, gscan is clean, the README documents the procedure.

---

## Validation hooks (after every phase)

- Run `gscan inference-theme/` and report errors and warnings
- Print the current file tree of `inference-theme/`
- List any decisions made that need my review
- Wait for my "continue" before starting the next phase

---

## Hard constraints

- **Do not** modify anything in `<FRONTEND_PATH>`. Source is read-only.
- **Do not** introduce a runtime build step in the theme. Pre-compile preprocessor output to static CSS/JS.
- **Do not** ship the React runtime in the theme. Convert JSX structure to static HTML.
- **Do not** invent post fields. If Ghost has no native field for something you need, use `codeinjection_head` (preferred), tags, or `canonical_url` (warn me — has SEO side effects).
- **Do not** push to git or run any deploy commands without my approval. The zip is the handoff.
- **Do not** use Handlebars features outside Ghost's allowed helpers. The runtime is restricted — check the helpers reference when unsure.
- **Do not** skip the planning phase or chain phases together. Pause between each one.

---

## When to stop and ask

If any of these come up, stop and ask before guessing:

- The source has no clear single-post page or homepage to map to `post.hbs` / `index.hbs`
- The design relies on JS-rendered content (charts, dynamic data) that won't survive the conversion to static HTML
- A brand element in the PDF conflicts with the implemented design
- `codeinjection_head` is already used for something else (a tracking script, custom `<head>` content)
- gscan errors look semantic (the theme structure is "wrong" by Ghost's rules) rather than mechanical (missing file, malformed JSON)

---

## Linear ticket references (for your own tracking, not for writing back)

- TEM-66 — Scaffold theme folder structure → Phase 1
- TEM-67 — Implement core templates with Inference branding → Phase 2
- TEM-68 — Implement language switcher in default.hbs → Phase 3
- TEM-69 — Package and deploy theme to both Ghost instances → Phase 4

When all four phases are done, summarise what shipped and what's deferred to follow-up tickets. I'll mark the Linear issues done from my side.
