// Home page — author intro, featured post, recent posts grid.

function Hero({ lang }) {
  const t = I18N[lang];
  return (
    <section className="hero">
      <div className="shell hero-inner">
        <div className="meta">
          <span className="dot"></span>
          <span>{t.home_status}</span>
        </div>
        <h1>
          {t.home_title_pre} <em>{t.home_title_em}</em>{lang === "en" ? " " : " "}
          {t.home_title_post}
        </h1>
        <p className="lede">{t.home_lede}</p>

        <div className="author-card">
          <div className="avatar">[{t.handle}]</div>
          <div>
            <div className="name">{t.author}</div>
            <div className="role">{t.role}</div>
          </div>
          <div className="stats">
            <div>
              <b>{POSTS.length.toString().padStart(2, "0")}</b>
              {t.posts_n}
            </div>
            <div>
              <b>2024</b>
              {t.since}
            </div>
            <div>
              <b>03</b>
              {t.topics}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ post, lang, onOpen }) {
  const t = I18N[lang];
  const c = post[lang];
  return (
    <div className="feature">
      <a href={`#/post/${post.slug}`} className="left"
         onClick={(e) => { e.preventDefault(); onOpen(post.slug); }}>
        <div className="topbits">
          <span className={`tag t-${post.topic}`}>{c.tagLabel}</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.read}</span>
          <span>·</span>
          <span>#{post.num}</span>
        </div>
        <h2 className="ttl">{c.title}</h2>
        <p className="dek">{c.dek}</p>
        <div className="foot">
          <span>{t.by} {t.author}</span>
          <span>·</span>
          <span>{post.words.toLocaleString()} {lang === "en" ? "words" : "palavras"}</span>
          <span style={{ marginLeft: "auto", color: "var(--accent)" }}>{t.read_more}</span>
        </div>
      </a>
      <div className="right">
        <h4>{t.feat_meta}</h4>
        <div className="kv">
          <span className="k">slug</span><span className="v">/{post.slug}</span>
          <span className="k">topic</span><span className="v">{c.tagLabel.toLowerCase()}</span>
          <span className="k">posted</span><span className="v">{post.date}</span>
          <span className="k">read</span><span className="v">{post.read}</span>
          <span className="k">words</span><span className="v">{post.words.toLocaleString()}</span>
          <span className="k">status</span><span className="v">published</span>
          <span className="k">refs</span><span className="v">04</span>
          <span className="k">code</span><span className="v">02 blocks</span>
        </div>
        <pre>
{"$ "}<span className="c">cat</span> /post/{post.slug}.mdx | <span className="c">wc</span> -w{"\n"}
{post.words}{"\n"}
{"$ "}<span className="c">grep</span> <span className="a">"i argue"</span> ./*.mdx | <span className="c">wc</span> -l{"\n"}
{"03\n"}
{"$ "}<span className="c">_</span><span className="caret" style={{verticalAlign:"-1px"}}></span>
        </pre>
      </div>
    </div>
  );
}

function PostCard({ post, lang, onOpen }) {
  const c = post[lang];
  return (
    <a className="post-card" href={`#/post/${post.slug}`}
       onClick={(e) => { e.preventDefault(); onOpen(post.slug); }}>
      <div className="topbits">
        <span className={`tag t-${post.topic}`}>{c.tagLabel}</span>
        <span>{post.date}</span>
      </div>
      <h3 className="ttl">{c.title}</h3>
      <p className="dek">{c.dek}</p>
      <div className="foot">
        <span>#{post.num}</span>
        <span>·</span>
        <span>{post.read}</span>
        <span style={{ marginLeft: "auto" }} className="arrow">→</span>
      </div>
    </a>
  );
}

function Home({ lang, onNav, onOpenPost }) {
  const t = I18N[lang];
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => p !== featured).slice(0, 8);
  return (
    <main>
      <Hero lang={lang} />
      <section className="shell">
        <div className="section-heading">
          <div className="title">{t.section_featured}</div>
          <div className="extra">— {featured.date}</div>
        </div>
        <FeatureRow post={featured} lang={lang} onOpen={onOpenPost} />

        <div className="section-heading">
          <div className="title">{t.section_recent}</div>
          <div className="extra">
            <a href="#/archive" onClick={(e) => { e.preventDefault(); onNav("archive"); }}
               style={{ color: "var(--fg-dim)" }}>{t.view_archive}</a>
          </div>
        </div>
        <div className="post-grid">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} lang={lang} onOpen={onOpenPost} />
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Home });
