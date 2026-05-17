// About page — extended author + manifesto.

function About({ lang, onNav }) {
  const t = I18N[lang];
  const sections = [
    { id: "mission",  num: "01", h: t.about_h_mission,   body: t.about_mission },
    { id: "author",   num: "02", h: t.about_h_author,    body: t.about_author },
    { id: "topics",   num: "03", h: t.about_h_topics,    body: null, custom: "topics" },
    { id: "voice",    num: "04", h: t.about_h_voice,     body: t.about_voice },
    { id: "bilingual",num: "05", h: t.about_h_bilingual, body: t.about_bilingual },
    { id: "contact",  num: "06", h: t.about_h_contact,   body: t.about_contact, custom: "contact" },
  ];

  return (
    <main>
      <section className="shell about-hero">
        <div>
          <div className="mono" style={{ fontSize: 12, color: "var(--fg-mute)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 18 }}>
            ── /{t.nav_about} ── v1.0 ── may 2026 ──
          </div>
          <h1>{t.about_title}</h1>
          <p className="lede">{t.about_lede}</p>
        </div>
        <div className="right">
          <div className="row"><span className="key">author</span><span className="val">Beatriz Almeida</span></div>
          <div className="row"><span className="key">role</span><span className="val">{lang === "en" ? "Software Architect / ML Practitioner" : "Arquiteta de Software / ML"}</span></div>
          <div className="row"><span className="key">location</span><span className="val">São Paulo, BR</span></div>
          <div className="row"><span className="key">since</span><span className="val">2024 — Q3</span></div>
          <div className="row"><span className="key">posts</span><span className="val">{POSTS.length} {lang === "en" ? "published" : "publicados"}</span></div>
          <div className="row"><span className="key">cadence</span><span className="val">{lang === "en" ? "weekly, when worth saying" : "semanal, quando vale"}</span></div>
          <div className="row"><span className="key">licence</span><span className="val">CC BY-NC 4.0</span></div>
          <div className="row"><span className="key">sponsors</span><span className="val" style={{ color: "var(--emphasis)" }}>none — by design</span></div>
        </div>
      </section>

      <section className="shell about-body">
        <aside>
          <h5>{lang === "en" ? "in this page" : "nesta página"}</h5>
          <ul className="toc-a">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}
                   onClick={(e) => {
                     e.preventDefault();
                     document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                   }}>
                  <span style={{ color: "var(--fg-mute)" }}>{s.num}.</span> {s.h.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>

          <h5>{lang === "en" ? "elsewhere" : "em outros lugares"}</h5>
          <ul className="toc-a">
            <li><a href="#">→ github</a></li>
            <li><a href="#">→ scholar</a></li>
            <li><a href="#">→ mastodon</a></li>
            <li><a href="#">→ email</a></li>
          </ul>
        </aside>

        <div>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="about-section">
              <h2><span className="num">§ {s.num}</span>{s.h}</h2>
              <div className="h-rule"></div>
              {s.custom === "topics" ? (
                <div>
                  <p className="body" style={{ marginBottom: 0 }}>
                    {lang === "en"
                      ? "Three topic clusters, applied in roughly equal measure."
                      : "Três conjuntos de tópicos, aplicados em medida aproximadamente igual."}
                  </p>
                  <div className="topic-grid">
                    <div>
                      <h4>// {TOPICS.ai[lang]}</h4>
                      <p>{TOPIC_DESC[lang].ai}</p>
                    </div>
                    <div>
                      <h4>// {TOPICS.arch[lang]}</h4>
                      <p>{TOPIC_DESC[lang].arch}</p>
                    </div>
                    <div>
                      <h4>// {TOPICS.infra[lang]}</h4>
                      <p>{TOPIC_DESC[lang].infra}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="body">
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                  {s.custom === "contact" && (
                    <p className="mono" style={{
                      fontFamily: "var(--font-mono)", fontSize: 14,
                      background: "var(--surface)", border: "1px solid var(--rule)",
                      padding: "14px 18px", marginTop: 16, color: "var(--fg)"
                    }}>
                      ba <span style={{ color: "var(--fg-mute)" }}>[at]</span> inference <span style={{ color: "var(--fg-mute)" }}>[dot]</span> dev
                      &nbsp;&nbsp;<span className="caret" style={{ verticalAlign: "-1px" }}></span>
                    </p>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { About });
