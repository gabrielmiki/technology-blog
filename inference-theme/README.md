# inference-theme

Custom Ghost theme for the **Inference** bilingual blog. A single zip
serves both the EN and PT-BR Ghost instances; a per-instance custom
setting (`site_language`) controls which language the switcher links
away from.

Requires **Ghost 5.0 or later**.

---

## Deploy procedure

### 1. Upload the theme

In Ghost Admin → **Settings → Design → Change theme → Upload theme**,
select `inference-theme-0.1.0.zip`.

Click **Activate**.

### 2. Set the instance language

Ghost Admin → **Settings → Design → Site-wide → Theme settings →
site_language**

| Instance | Value to set |
|---|---|
| `en.yourblog.com` | `en` |
| `pt.yourblog.com` | `pt` |

This controls which direction the language switcher links point. Set
it wrong and the switcher will link back to the same instance.

### 3. Create the Archive page

The filterable archive (`/archive/`) is a custom page template, not
a built-in Ghost view.

1. Ghost Admin → **Pages → New page**
2. Title: `Archive`
3. URL slug: `archive` (Ghost sets this automatically from the title)
4. Leave the body empty — the template fetches all posts itself
5. Publish

The template `page-archive.hbs` activates automatically for any page
with slug `archive`.

### 4. Create the About page

1. Ghost Admin → **Pages → New page**
2. Title: `About`
3. URL slug: `about`
4. Write the author bio and publication manifesto in the page body
5. Publish

### 5. Set up topic tags

The theme uses Ghost tags as topic categories. Create these three
tags in Ghost Admin → **Tags** so the archive filter and colour
coding work correctly:

| Tag name | Slug | Colour in theme |
|---|---|---|
| AI / ML | `ai-ml` | Amber (accent) |
| Architecture | `architecture` | Orange `#f0883e` |
| Infrastructure | `infrastructure` | Green `#3fb950` |

Assign at least one of these as the **primary tag** on every post.

### 6. Smoke test

- [ ] Publish a post on the EN instance; assign a primary topic tag
- [ ] Publish the PT-BR equivalent on the PT instance with the same
      source material
- [ ] On the EN post, open **Post settings → Code injection → Post
      header** and paste the PT-BR post's URL slug (e.g. `quando-descartar-o-kv-cache`)
- [ ] Do the same on the PT post, pasting the EN slug
- [ ] Visit the EN post — the **Português** link should resolve to
      `https://pt.yourblog.com/{pt-slug}/`
- [ ] Visit the PT post — the **English** link should resolve to
      `https://en.yourblog.com/{en-slug}/`
- [ ] With `codeinjection_head` empty, both links should fall back to
      the other instance's homepage

---

## Language switcher — implementation notes

The switcher lives in `partials/language-switcher.hbs` and is
included in `default.hbs` on every page.

**Sibling slug field:** Ghost has no native "sibling post" concept.
The M5 publisher writes the sibling post's URL slug into each post's
**Post header** code injection field (`codeinjection_head`). The
partial reads `{{post.codeinjection_head}}` to build the cross-link.

> **Warning — field collision:** `codeinjection_head` is also the
> field Ghost uses for per-post `<head>` code injection (tracking
> scripts, custom meta tags, etc.). If a post has both a tracking
> snippet *and* a sibling slug in this field, the switcher URL will
> be malformed. Coordinate with the M5 publisher to ensure only the
> sibling slug is stored in this field, and use `codeinjection_foot`
> for any tracking scripts instead.

**Fallback:** when `codeinjection_head` is empty the switcher links
to the other instance's root URL — a correct and safe default.

---

## Known warnings (gscan)

| Warning | File | Decision |
|---|---|---|
| `limit="all"` in `{{#get}}` not supported | `page-archive.hbs` | **Retained.** Ghost honours `limit="all"` at runtime; the warning is a performance advisory. Change to `limit="500"` if you want a clean gscan report and are confident you will never exceed 500 posts. |

---

## Theme file map

```
inference-theme/
├── assets/
│   ├── css/main.css          Design tokens, layout, all components
│   ├── js/main.js            Dark/light toggle, clock, progress bar, TOC, archive filter
│   └── images/               Place any static images here
├── partials/
│   └── language-switcher.hbs EN ↔ PT-BR switcher, reads @custom.site_language
├── default.hbs               Base layout: header, nav, footer, statusbar
├── index.hbs                 Homepage: hero, featured post, recent grid
├── post.hbs                  Single post: TOC sidebar, prose, meta sidebar
├── tag.hbs                   Per-topic archive (one tag at a time)
├── page-archive.hbs          Filterable all-posts archive (slug: archive)
├── page.hbs                  Generic static page (about, colophon, etc.)
└── package.json              Ghost theme manifest, site_language custom setting
```

---

## Colour tokens

| Token | Value | Role |
|---|---|---|
| `--accent` | `#d4a017` (Amber) | Links, CTAs, active states, headings |
| `--emphasis` | `#4f8cff` (Cobalt) | Inline code, blockquote border |
| `--cobalt` | `#4f8cff` | Logo bracket `[ ]` — always cobalt per brand spec |
| `--bg` | `#0d1117` | Page background (dark default) |
| `--fg` | `#e6edf3` | Body text |

Dark mode is the default. A toggle in the header stores the reader's
preference in `localStorage` under the key `inference-theme`.
