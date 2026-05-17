// Shared chrome: top nav, status bar, page footer.

const { useState, useEffect, useMemo, useRef } = React;

function Logo({ onClick }) {
  return (
    <a href="#/" className="logo" onClick={(e) => { e.preventDefault(); onClick?.("home"); }}>
      <span className="br">[&nbsp;]</span>
      <span>INFERENCE</span>
    </a>
  );
}

function TopBar({ page, lang, theme, onNav, onLang, onTheme }) {
  const t = I18N[lang];
  return (
    <header className="topbar">
      <div className="shell topbar-inner">
        <Logo onClick={onNav} />
        <nav className="nav" aria-label="primary">
          {[
            ["home", t.nav_home],
            ["archive", t.nav_archive],
            ["about", t.nav_about],
          ].map(([key, label]) => (
            <a key={key} href={`#/${key}`}
               className={page === key ? "active" : ""}
               onClick={(e) => { e.preventDefault(); onNav(key); }}>
              <span className="prompt">~&gt;</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="tools">
          <div className="lang-toggle" role="group" aria-label="language">
            <button className={lang === "en" ? "on" : ""} onClick={() => onLang("en")}>EN</button>
            <button className={lang === "pt" ? "on" : ""} onClick={() => onLang("pt")}>PT-BR</button>
          </div>
          <button className="icon-btn" aria-label="toggle theme"
                  onClick={() => onTheme(theme === "dark" ? "light" : "dark")}
                  title={theme === "dark" ? "switch to light" : "switch to dark"}>
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function StatusBar({ page, lang, theme }) {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getUTCHours()).padStart(2, "0");
  const mm = String(time.getUTCMinutes()).padStart(2, "0");
  const ss = String(time.getUTCSeconds()).padStart(2, "0");
  return (
    <div className="statusbar" role="contentinfo">
      <span className="seg"><span className="ok">●</span><span className="v">200 OK</span></span>
      <span className="seg"><span className="k">env</span><span className="v">production</span></span>
      <span className="seg"><span className="k">page</span><span className="v">/{page}</span></span>
      <span className="seg"><span className="k">lang</span><span className="v">{lang.toUpperCase()}</span></span>
      <span className="seg"><span className="k">theme</span><span className="v">{theme}</span></span>
      <span className="seg right"><span className="k">utc</span><span className="v">{hh}:{mm}:{ss}</span></span>
      <span className="seg"><span className="k">build</span><span className="v">v1.4.2</span></span>
    </div>
  );
}

function PageFooter({ lang, onNav }) {
  const t = I18N[lang];
  return (
    <footer className="shell pagefoot">
      <div className="brand">
        <Logo onClick={onNav} />
        <div className="tagline">"{t.tagline}"</div>
        <div className="copy">© 2026 INFERENCE. Single-author publication. No sponsored content.</div>
      </div>
      <div>
        <h5>{t.nav_archive}</h5>
        <a href="#/archive" onClick={(e) => { e.preventDefault(); onNav("archive"); }}>{TOPICS.all[lang]}</a>
        <a href="#/archive">{TOPICS.ai[lang]}</a>
        <a href="#/archive">{TOPICS.arch[lang]}</a>
        <a href="#/archive">{TOPICS.infra[lang]}</a>
      </div>
      <div>
        <h5>{lang === "en" ? "links" : "links"}</h5>
        <a href="#/about" onClick={(e) => { e.preventDefault(); onNav("about"); }}>{t.nav_about}</a>
        <a href="#">RSS / Atom</a>
        <a href="#">{lang === "en" ? "newsletter" : "newsletter"}</a>
        <a href="#">{lang === "en" ? "contact" : "contato"}</a>
      </div>
      <div>
        <h5>{lang === "en" ? "instance" : "instância"}</h5>
        <a href="#">en.inference.dev</a>
        <a href="#">pt.inference.dev</a>
        <a href="#">{lang === "en" ? "colophon" : "colofão"}</a>
        <a href="#">{lang === "en" ? "guidelines" : "diretrizes"}</a>
      </div>
    </footer>
  );
}

Object.assign(window, { TopBar, StatusBar, PageFooter, Logo });
