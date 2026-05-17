// Post page — long-form article with TOC, code, diagram, tradeoffs, pullquote, takeaways.

function useReadingProgress(ref) {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setPct(p * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return pct;
}

function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - 120 <= 0) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join("|")]);
  return active;
}

function Diagram({ lang }) {
  const t = I18N[lang];
  return (
    <div className="diagram">
      <span className="cap">[ {t.diagram_caption} ]</span>
      <pre>
{`        ┌────────────────────┐        ┌────────────────────┐        ┌────────────────────┐
        │  `}<span className="nd">PROMPT INGEST</span>{`     │        │  `}<span className="nd">KV-CACHE CTRL</span>{`     │        │  `}<span className="nd">GENERATION</span>{`        │
        │  tokenise + pad    │ ─────▶ │  occupancy watcher │ ─────▶ │  sampler + cache │
        │  validate          │        │  pressure: `}<span className="ac">0.72</span>{`    │        │  write-back loop │
        └─────────┬──────────┘        └─────────┬──────────┘        └─────────┬────────┘
                  │                              │                             │
                  ▼                              ▼                             ▼
            inbound queue                eviction policy             token stream out
            `}<span className="ac">p50 = 12ms</span>{`                  ├─ recency               `}<span className="ac">p50 = 28ms</span>{`
            `}<span className="am">p99 = 41ms</span>{`                  ├─ attention-score       `}<span className="am">p99 = 184ms</span>{`
                                         └─ `}<span className="am">summariser ◀── shipped</span>{`

                                         hybrid switch @ pressure ≥ `}<span className="ac">0.55</span>{`
`}
      </pre>
    </div>
  );
}

function CodeBlock({ lang }) {
  const lines = [
    {n: "01", h: (<><span className="cmt"># controller/eviction.py — hybrid policy</span></>)},
    {n: "02", h: (<><span className="kw">from</span> dataclasses <span className="kw">import</span> dataclass</>)},
    {n: "03", h: (<><span className="kw">from</span> typing <span className="kw">import</span> Literal</>)},
    {n: "04", h: ""},
    {n: "05", h: (<>THRESHOLD = <span className="num">0.55</span>  <span className="cmt"># cache occupancy switch-over</span></>)},
    {n: "06", h: ""},
    {n: "07", h: (<><span className="kw">@dataclass</span></>)},
    {n: "08", h: (<><span className="kw">class</span> <span className="fn">EvictionDecision</span>:</>)},
    {n: "09", h: <>    policy: <span className="str">Literal[<span className="str">"recency"</span>, <span className="str">"summarise"</span>]</span></>},
    {n: "10", h: <>    keep_last: int</>},
    {n: "11", h: ""},
    {n: "12", h: <><span className="kw">def</span> <span className="fn">decide</span>(cache_pressure: <span className="kw">float</span>) -&gt; EvictionDecision:</>},
    {n: "13", h: <>    <span className="cmt"># at low pressure, recency is indistinguishable from no eviction.</span></>},
    {n: "14", h: <>    <span className="kw">if</span> cache_pressure &lt; THRESHOLD:</>},
    {n: "15", h: <>        <span className="kw">return</span> EvictionDecision(policy=<span className="str">"recency"</span>, keep_last=<span className="num">512</span>)</>},
    {n: "16", h: <>    <span className="cmt"># at high pressure, only the summariser holds dialogue coherence.</span></>},
    {n: "17", h: <>    <span className="kw">return</span> EvictionDecision(policy=<span className="str">"summarise"</span>, keep_last=<span className="num">128</span>)</>},
  ];
  return (
    <div className="code-block">
      <div className="cb-head">
        <span><span className="lang">python</span> · controller/eviction.py · 17 LOC</span>
        <span className="copy">⌘ copy</span>
      </div>
      <div className="cb-body">
        <div className="gutter">{lines.map((l) => <div key={l.n}>{l.n}</div>)}</div>
        <pre>{lines.map((l, i) => <div key={i}>{l.h}{"\u00A0"}</div>)}</pre>
      </div>
    </div>
  );
}

function TradeoffTable({ lang }) {
  const headers = lang === "en"
    ? ["policy", "quality @ high pressure", "controller overhead", "p99 latency", "production fit"]
    : ["política", "qualidade em alta pressão", "overhead do controlador", "latência p99", "adequação a produção"];
  const rows = lang === "en" ? [
    ["recency",            "low",       "minimal",  "+0 ms",   "★★☆☆☆"],
    ["attention-score",    "medium",    "high",     "+15 ms",  "★★★☆☆"],
    ["summariser",         "high",      "medium",   "+90 ms",  "★★★★☆"],
    ["hybrid (shipped)",   "highest floor", "medium",  "+12-90 ms", "★★★★★"],
  ] : [
    ["recência",           "baixa",     "mínimo",   "+0 ms",   "★★☆☆☆"],
    ["score de atenção",   "média",     "alto",     "+15 ms",  "★★★☆☆"],
    ["sumarizador",        "alta",      "médio",    "+90 ms",  "★★★★☆"],
    ["híbrido (entregue)", "maior piso", "médio",   "+12-90 ms", "★★★★★"],
  ];
  return (
    <table className="tradeoff">
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => <td key={j}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pullquote({ lang }) {
  const text = lang === "en"
    ? "When you cannot pick a winner, pick the policy with the highest floor. The team has shipped two iterations since, and the floor has held."
    : "Quando não dá para escolher um vencedor, escolha a política com o maior piso. O time entregou duas iterações desde então, e o piso se manteve.";
  return (
    <blockquote className="pullquote">
      "{text}"
      <span className="attr">— {lang === "en" ? "from the conclusion" : "da conclusão"}</span>
    </blockquote>
  );
}

function Takeaways({ lang }) {
  const items = lang === "en" ? [
    "Context windows aren't the real constraint — the KV-cache that backs them is. Cost scales with layers × heads × tokens, not with the headline window size.",
    "No single eviction policy wins across task families. Benchmark across instruction-following, long-document QA, multi-turn dialogue, and code completion before deciding.",
    "When no policy wins, optimise for the highest floor. Hybrid controllers that switch on cache occupancy beat any fixed policy in our workloads.",
    "Watch p99, not p50. The summariser's write-time cost is invisible at the median and obvious at the tail — that's exactly where SLOs are written.",
  ] : [
    "Janelas de contexto não são a restrição real — o KV-cache que as sustenta é. O custo escala com camadas × cabeças × tokens, não com o tamanho manchete da janela.",
    "Nenhuma política única de descarte vence em todas as famílias de tarefa. Faça benchmark com seguimento de instrução, QA de doc longo, diálogo multi-turno e completação de código antes de decidir.",
    "Quando nenhuma política vence, otimize pelo maior piso. Controladores híbridos que chaveiam por ocupação do cache batem qualquer política fixa nos nossos workloads.",
    "Olhe p99, não p50. O custo de escrita do sumarizador é invisível na mediana e óbvio na cauda — exatamente onde o SLO é escrito.",
  ];
  return (
    <div className="takeaways">
      <div className="label">{I18N[lang].key_takeaways}</div>
      <ol>
        {items.map((it, i) => <li key={i}><span></span><span>{it}</span></li>)}
      </ol>
    </div>
  );
}

function References({ lang }) {
  const refs = [
    "Kwon et al., 2023. \"Efficient Memory Management for LLM Serving with PagedAttention.\" SOSP '23.",
    "Zhang et al., 2024. \"H₂O: Heavy-Hitter Oracle for Efficient Generative Inference of Large Language Models.\" NeurIPS '24.",
    "Xiao et al., 2024. \"Efficient Streaming Language Models with Attention Sinks.\" ICLR '24.",
    "Beltagy et al., 2020. \"Longformer: The Long-Document Transformer.\" arXiv:2004.05150.",
  ];
  return (
    <div className="refs">
      <h5>{I18N[lang].references}</h5>
      <ol>
        {refs.map((r, i) => <li key={i}>{r}</li>)}
      </ol>
    </div>
  );
}

function Post({ lang, onNav, onOpenPost }) {
  const t = I18N[lang];
  const ref = React.useRef(null);
  const pct = useReadingProgress(ref);
  const post = POSTS.find((p) => p.slug === SAMPLE_POST.slug);
  const c = SAMPLE_POST[lang];
  const ids = c.sections.map((_, i) => `s-${i}`);
  const active = useActiveSection(ids);

  return (
    <main ref={ref}>
      <div className="progress-bar" style={{ width: `${pct}%` }}></div>

      <section className="shell">
        <div className="post-header">
          <div className="crumbs">
            <a href="#/" onClick={(e) => { e.preventDefault(); onNav("home"); }}>~</a>
            <span className="sep">/</span>
            <a href="#/archive" onClick={(e) => { e.preventDefault(); onNav("archive"); }}>{t.crumb_archive}</a>
            <span className="sep">/</span>
            <span className={`a-tag t-${post.topic}`} style={{ color: post.topic === "ai" ? "var(--accent)" : post.topic === "arch" ? "#f0883e" : "#3fb950" }}>
              {post[lang].tagLabel.toLowerCase()}
            </span>
            <span className="sep">/</span>
            <span>#{post.num}</span>
          </div>
          <h1>{c.title}</h1>
          <p className="lede">{c.lede}</p>
          <div className="byline">
            <span>{t.by} <span className="name">{t.author}</span></span>
            <span className="sep">·</span>
            <span>{post.date}</span>
            <span className="sep">·</span>
            <span>{post.read} · {post.words.toLocaleString()} {lang === "en" ? "words" : "palavras"}</span>
          </div>
        </div>

        <div className="post-layout">
          <aside className="sidebar-l">
            <div className="toc">
              <h5>{t.table_of_contents}</h5>
              <ol>
                {c.sections.map((s, i) => (
                  <li key={i} className={active === `s-${i}` ? "active" : ""}>
                    <a href={`#s-${i}`}
                       onClick={(e) => {
                         e.preventDefault();
                         document.getElementById(`s-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                       }}>
                      <span>{s.h}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="post-body prose">
            {c.sections.map((s, i) => (
              <React.Fragment key={i}>
                <h2 id={`s-${i}`}>
                  <span className="num">§ 0{i + 1}</span>
                  <span>{s.h}</span>
                </h2>
                <div className="h-rule"></div>
                {s.body.map((p, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
                {i === 1 && <CodeBlock />}
                {i === 2 && <Diagram lang={lang} />}
                {i === 2 && <TradeoffTable lang={lang} />}
                {i === 3 && <Pullquote lang={lang} />}
              </React.Fragment>
            ))}

            <Takeaways lang={lang} />
            <References lang={lang} />

            {/* next/prev nav */}
            <div style={{
              marginTop: 64, paddingTop: 24,
              borderTop: "1px solid var(--rule)",
              display: "flex", justifyContent: "space-between", gap: 16,
              fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-mute)"
            }}>
              <a href="#/archive" onClick={(e) => { e.preventDefault(); onNav("archive"); }}
                 style={{ color: "var(--fg-dim)" }}>
                ← {t.crumb_archive}
              </a>
              <a href="#/post/postgres-vs-pgvector" onClick={(e) => { e.preventDefault(); onOpenPost("postgres-vs-pgvector"); }}
                 style={{ color: "var(--accent)" }}>
                {lang === "en" ? "next entry" : "próxima entrada"} → #023
              </a>
            </div>
          </article>

          <aside className="sidebar-r">
            <div className="post-meta-side">
              <h5>{t.section_keys}</h5>
              <div className="kv">
                <span className="k">id</span><span>#{post.num}</span>
                <span className="k">topic</span><span>{post[lang].tagLabel.toLowerCase()}</span>
                <span className="k">posted</span><span>{post.date}</span>
                <span className="k">read</span><span>{post.read}</span>
                <span className="k">words</span><span>{post.words.toLocaleString()}</span>
                <span className="k">refs</span><span>04</span>
                <span className="k">lang</span><span>{lang.toUpperCase()}</span>
              </div>

              <h5>{t.share_this}</h5>
              <div className="share">
                <a href="#">→ {lang === "en" ? "copy link" : "copiar link"}</a>
                <a href="#">→ {lang === "en" ? "share on x" : "compartilhar no x"}</a>
                <a href="#">→ {lang === "en" ? "share on hn" : "compartilhar no hn"}</a>
                <a href="#">→ {lang === "en" ? "email author" : "enviar email"}</a>
              </div>

              <h5>{lang === "en" ? "version" : "versão"}</h5>
              <div className="kv">
                <span className="k">en</span><a href="#">en.inference.dev</a>
                <span className="k">pt</span><a href="#">pt.inference.dev</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Post });
