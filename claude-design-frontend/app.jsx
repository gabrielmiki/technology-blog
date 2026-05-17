// App shell — routing, tweaks, theme, language.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "cobalt",
  "density": "medium",
  "flourishes": "on",
  "bodyfont": "serif",
  "lang": "en",
  "theme": "dark"
}/*EDITMODE-END*/;

function parseHash() {
  const raw = (location.hash || "#/").replace(/^#\/?/, "");
  if (raw.startsWith("post/")) return { page: "post", slug: raw.slice(5) };
  if (raw === "archive") return { page: "archive" };
  if (raw === "about")   return { page: "about" };
  return { page: "home" };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState(parseHash);

  React.useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    // body data-* attrs drive CSS variants
    const b = document.body;
    b.dataset.theme = t.theme;
    b.dataset.accent = t.accent;
    b.dataset.density = t.density;
    b.dataset.flourishes = t.flourishes;
    b.dataset.bodyfont = t.bodyfont;
    b.style.paddingBottom = t.flourishes === "on" ? "28px" : "0";
  }, [t.theme, t.accent, t.density, t.flourishes, t.bodyfont]);

  React.useEffect(() => {
    // reset scroll on route change
    window.scrollTo({ top: 0 });
  }, [route.page, route.slug]);

  const nav = (page) => { location.hash = `#/${page}`; };
  const openPost = (slug) => { location.hash = `#/post/${slug}`; };
  const onLang = (v) => setTweak("lang", v);
  const onTheme = (v) => setTweak("theme", v);

  return (
    <React.Fragment>
      <TopBar page={route.page} lang={t.lang} theme={t.theme}
              onNav={nav} onLang={onLang} onTheme={onTheme} />

      {route.page === "home"    && <Home    lang={t.lang} onNav={nav} onOpenPost={openPost} />}
      {route.page === "archive" && <Archive lang={t.lang} onOpenPost={openPost} />}
      {route.page === "post"    && <Post    lang={t.lang} onNav={nav} onOpenPost={openPost} />}
      {route.page === "about"   && <About   lang={t.lang} onNav={nav} />}

      <PageFooter lang={t.lang} onNav={nav} />

      {t.flourishes === "on" && (
        <div style={{
          position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
        }}>
          <StatusBar page={route.page} lang={t.lang} theme={t.theme} />
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Language" />
        <TweakRadio label="Instance" value={t.lang}
                    options={[{value: "en", label: "EN"}, {value: "pt", label: "PT-BR"}]}
                    onChange={(v) => setTweak("lang", v)} />

        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={t.theme}
                    options={[{value: "dark", label: "Dark"}, {value: "light", label: "Light"}]}
                    onChange={(v) => setTweak("theme", v)} />
        <TweakRadio label="Accent" value={t.accent}
                    options={[
                      {value: "cobalt", label: "Cobalt"},
                      {value: "amber",  label: "Amber"},
                      {value: "both",   label: "Both"},
                    ]}
                    onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
                    options={[
                      {value: "sparse", label: "Sparse"},
                      {value: "medium", label: "Medium"},
                      {value: "dense",  label: "Dense"},
                    ]}
                    onChange={(v) => setTweak("density", v)} />
        <TweakToggle label="Terminal flourishes" value={t.flourishes === "on"}
                     onChange={(v) => setTweak("flourishes", v ? "on" : "off")} />

        <TweakSection label="Typography" />
        <TweakRadio label="Body font" value={t.bodyfont}
                    options={[
                      {value: "serif",  label: "Serif"},
                      {value: "system", label: "System"},
                      {value: "mono",   label: "Mono"},
                    ]}
                    onChange={(v) => setTweak("bodyfont", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
