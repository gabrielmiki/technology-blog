// Archive page — filterable post index with a hero card every 4 standard rows.

function ArchiveHero({ post, lang, onOpen, position }) {
  const t = I18N[lang];
  const c = post[lang];
  return (
    <a className={`archive-hero t-${post.topic}`} href={`#/post/${post.slug}`}
       onClick={(e) => { e.preventDefault(); onOpen(post.slug); }}>
      <div className="ah-stamp">
        <span className="ah-stamp-bar">▍</span>
        <span>{lang === "en" ? "highlight" : "destaque"}</span>
        <span className="ah-stamp-sep">·</span>
        <span>{position}</span>
      </div>

      <div className="ah-grid">
        <div className="ah-left">
          <div className="ah-topbits">
            <span className={`tag t-${post.topic}`}>{c.tagLabel}</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>#{post.num}</span>
            <span>·</span>
            <span>{post.read}</span>
          </div>
          <h2 className="ah-title">{c.title}</h2>
          <p className="ah-dek">{c.dek}</p>
          <div className="ah-foot">
            <span>{t.by} {t.author}</span>
            <span className="ah-sep">·</span>
            <span>{post.words.toLocaleString()} {lang === "en" ? "words" : "palavras"}</span>
            <span className="ah-cta">{t.read_more}</span>
          </div>
        </div>

        <div className="ah-right">
          <div className="ah-spec">
            <div className="ah-spec-row"><span className="k">topic</span><span className="v">{c.tagLabel.toLowerCase()}</span></div>
            <div className="ah-spec-row"><span className="k">posted</span><span className="v">{post.date}</span></div>
            <div className="ah-spec-row"><span className="k">read</span><span className="v">{post.read}</span></div>
            <div className="ah-spec-row"><span className="k">words</span><span className="v">{post.words.toLocaleString()}</span></div>
            <div className="ah-spec-row"><span className="k">slug</span><span className="v">/{post.slug}</span></div>
          </div>
          <pre className="ah-cmd">
{"$ "}<span className="c">open</span> <span className="a">"#{post.num}"</span>{"\n"}
{"→ /post/"}{post.slug}{"\n"}
{"$ "}<span className="c">_</span><span className="caret" style={{verticalAlign:"-1px"}}></span>
          </pre>
        </div>
      </div>
    </a>
  );
}

function ArchiveRow({ post, lang, onOpen }) {
  const c = post[lang];
  return (
    <a className="archive-row" href={`#/post/${post.slug}`}
       onClick={(e) => { e.preventDefault(); onOpen(post.slug); }}>
      <span className="a-num">#{post.num}</span>
      <span className="a-date">{post.date}</span>
      <div className="a-title">
        {c.title}
        <small>{c.dek}</small>
      </div>
      <span className={`a-tag t-${post.topic}`}>{c.tagLabel}</span>
      <span className="a-read">{post.read}</span>
    </a>
  );
}

function Archive({ lang, onOpenPost }) {
  const t = I18N[lang];
  const [filter, setFilter] = React.useState("all");
  const counts = React.useMemo(() => ({
    all:   POSTS.length,
    ai:    POSTS.filter((p) => p.topic === "ai").length,
    arch:  POSTS.filter((p) => p.topic === "arch").length,
    infra: POSTS.filter((p) => p.topic === "infra").length,
  }), []);
  const visible = filter === "all" ? POSTS : POSTS.filter((p) => p.topic === filter);

  // Interleave: every 5th entry (indices 0, 5, 10, …) is rendered as a hero —
  // pattern reads as 1 hero + 4 standards repeating.
  const items = visible.map((p, i) => ({ post: p, hero: i % 5 === 0 }));

  return (
    <main>
      <section className="shell archive-head">
        <div className="meta mono" style={{ fontSize: 12, color: "var(--fg-mute)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 18 }}>
          ── /{t.nav_archive} ── {POSTS.length} {lang === "en" ? "entries" : "entradas"} ──
        </div>
        <h1>{t.archive_title}</h1>
        <p className="lede">{t.archive_lede}</p>
      </section>

      <section className="shell">
        <div className="filters">
          <span className="lbl">$ {t.filter_label}</span>
          {[
            ["all",   TOPICS.all[lang],   ""],
            ["ai",    TOPICS.ai[lang],    "t-ai"],
            ["arch",  TOPICS.arch[lang],  "t-arch"],
            ["infra", TOPICS.infra[lang], "t-infra"],
          ].map(([key, label, cls]) => (
            <button key={key}
                    className={`pill ${cls} ${filter === key ? "on" : ""}`}
                    onClick={() => setFilter(key)}>
              <span>{label}</span>
              <span className="count">[{counts[key].toString().padStart(2, "0")}]</span>
            </button>
          ))}
          <span style={{ marginLeft: "auto", color: "var(--fg-mute)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            {t.sort_label} {t.newest_first}
          </span>
        </div>

        <div className="archive-list">
          {items.map(({ post, hero }, i) => hero ? (
            <ArchiveHero key={post.slug} post={post} lang={lang}
                         onOpen={onOpenPost}
                         position={`${(i + 1).toString().padStart(2, "0")} / ${visible.length.toString().padStart(2, "0")}`} />
          ) : (
            <ArchiveRow key={post.slug} post={post} lang={lang} onOpen={onOpenPost} />
          ))}
        </div>

        {visible.length === 0 && (
          <div style={{ padding: 48, textAlign: "center", color: "var(--fg-mute)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
            {lang === "en" ? "no entries match the current filter." : "nenhuma entrada corresponde ao filtro atual."}
          </div>
        )}
      </section>
    </main>
  );
}

Object.assign(window, { Archive });
