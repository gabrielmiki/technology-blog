// Mock data for the Inference blog.
// Bilingual EN / PT-BR strings live here; UI uses I18N[lang][key].

const POSTS = [
  {
    slug: "kv-cache-eviction",
    num: "024",
    topic: "ai",
    date: "2026 — 05 — 12",
    read: "11 min",
    words: 1840,
    en: {
      title: "When KV-cache eviction beats a bigger context window",
      dek: "A walk through three eviction policies — recency, attention-score, and the lossy summariser we ended up shipping — measured on a 70B production workload.",
      tagLabel: "AI / ML",
    },
    pt: {
      title: "Quando descartar o KV-cache vence aumentar o contexto",
      dek: "Análise de três políticas de descarte — recência, score de atenção e um sumarizador com perda — medidas em produção sobre um modelo de 70B.",
      tagLabel: "IA / ML",
    },
    featured: true,
  },
  {
    slug: "postgres-vs-pgvector",
    num: "023",
    topic: "arch",
    date: "2026 — 05 — 04",
    read: "14 min",
    words: 2120,
    en: {
      title: "Vector search at 30M rows: the case against a separate index",
      dek: "Why we walked back a managed vector database in favour of pgvector + HNSW, and the three latency cliffs that made us hesitate.",
      tagLabel: "Architecture",
    },
    pt: {
      title: "Busca vetorial em 30M de linhas: contra um índice separado",
      dek: "Por que recuamos de um banco vetorial gerenciado em favor de pgvector + HNSW — e os três precipícios de latência que nos fizeram hesitar.",
      tagLabel: "Arquitetura",
    },
  },
  {
    slug: "spot-instance-budget",
    num: "022",
    topic: "infra",
    date: "2026 — 04 — 28",
    read: "9 min",
    words: 1480,
    en: {
      title: "A budget for spot interruption: turning chaos into a line item",
      dek: "Treating spot reclamations as a recurring cost instead of a failure mode — and the small Kubernetes operator that priced it.",
      tagLabel: "Infrastructure",
    },
    pt: {
      title: "Um orçamento para interrupções de spot: caos como linha de custo",
      dek: "Tratar revogações de spot como custo recorrente em vez de modo de falha — e o pequeno operador Kubernetes que precificou isso.",
      tagLabel: "Infraestrutura",
    },
  },
  {
    slug: "logit-warping",
    num: "021",
    topic: "ai",
    date: "2026 — 04 — 19",
    read: "8 min",
    words: 1240,
    en: {
      title: "Constrained decoding without retraining: logit warping in practice",
      dek: "How a 30-line sampler hook replaced a fine-tune we had budgeted three engineer-weeks for. Includes the cases where it falls over.",
      tagLabel: "AI / ML",
    },
    pt: {
      title: "Decodificação com restrição sem retreino: logit warping na prática",
      dek: "Como um hook de amostragem de 30 linhas substituiu um fine-tune orçado em três engenheiro-semanas. Inclui os casos onde ele falha.",
      tagLabel: "IA / ML",
    },
  },
  {
    slug: "split-brain-grpc",
    num: "020",
    topic: "arch",
    date: "2026 — 04 — 11",
    read: "12 min",
    words: 1980,
    en: {
      title: "The split brain we shipped: a postmortem on a gRPC retry storm",
      dek: "An honest write-up of a four-hour incident — every decision we made under pressure, and which of them I would still defend.",
      tagLabel: "Architecture",
    },
    pt: {
      title: "O split brain que entregamos: postmortem de uma tempestade de retries gRPC",
      dek: "Relato honesto de um incidente de quatro horas — cada decisão tomada sob pressão e quais eu ainda defenderia.",
      tagLabel: "Arquitetura",
    },
  },
  {
    slug: "observability-cost",
    num: "019",
    topic: "infra",
    date: "2026 — 04 — 02",
    read: "10 min",
    words: 1640,
    en: {
      title: "Observability is a budget, not a feature",
      dek: "Tradeoff tables for the five hot decisions in a self-hosted metrics stack: cardinality, retention, sampling, aggregation, and who pays.",
      tagLabel: "Infrastructure",
    },
    pt: {
      title: "Observabilidade é orçamento, não funcionalidade",
      dek: "Tabelas de tradeoff para as cinco decisões críticas em uma stack de métricas self-hosted: cardinalidade, retenção, sampling, agregação, e quem paga.",
      tagLabel: "Infraestrutura",
    },
  },
  {
    slug: "speculative-decoding",
    num: "018",
    topic: "ai",
    date: "2026 — 03 — 24",
    read: "13 min",
    words: 2080,
    en: {
      title: "Speculative decoding for a 7B draft model: when it pays, when it doesn't",
      dek: "A benchmark across four target/draft pairings on commodity GPUs. The headline number depends on whether you trust your acceptance rate.",
      tagLabel: "AI / ML",
    },
    pt: {
      title: "Decodificação especulativa com um modelo draft de 7B",
      dek: "Benchmark com quatro pares target/draft em GPUs commodity. O número manchete depende de você confiar na sua taxa de aceitação.",
      tagLabel: "IA / ML",
    },
  },
  {
    slug: "etcd-disk-budget",
    num: "017",
    topic: "infra",
    date: "2026 — 03 — 17",
    read: "7 min",
    words: 1120,
    en: {
      title: "The etcd disk budget nobody talks about",
      dek: "What 'fsync p99' really means for your control plane, and why the cheapest answer is sometimes the most expensive disk you can buy.",
      tagLabel: "Infrastructure",
    },
    pt: {
      title: "O orçamento de disco do etcd do qual ninguém fala",
      dek: "O que 'fsync p99' realmente significa para o seu control plane, e por que a resposta mais barata às vezes é o disco mais caro.",
      tagLabel: "Infraestrutura",
    },
  },
  {
    slug: "saga-vs-2pc",
    num: "016",
    topic: "arch",
    date: "2026 — 03 — 09",
    read: "11 min",
    words: 1760,
    en: {
      title: "Sagas, 2PC, and the question I wish I'd asked sooner",
      dek: "Distributed transactions are an answer to a question. I spent two years choosing answers before I noticed I wasn't asking the right question.",
      tagLabel: "Architecture",
    },
    pt: {
      title: "Sagas, 2PC, e a pergunta que eu deveria ter feito antes",
      dek: "Transações distribuídas são resposta a uma pergunta. Passei dois anos escolhendo respostas antes de perceber que perguntava errado.",
      tagLabel: "Arquitetura",
    },
  },
  {
    slug: "rag-eval",
    num: "015",
    topic: "ai",
    date: "2026 — 03 — 02",
    read: "9 min",
    words: 1380,
    en: {
      title: "RAG evaluation: stop measuring retrieval, start measuring grounding",
      dek: "Recall@k tells you almost nothing about whether your generator used what you retrieved. A 200-example grounded-claims set told us more.",
      tagLabel: "AI / ML",
    },
    pt: {
      title: "Avaliação de RAG: pare de medir recuperação, comece a medir grounding",
      dek: "Recall@k diz quase nada sobre o gerador ter usado o que foi recuperado. Um conjunto de 200 exemplos de claims fundamentadas nos disse mais.",
      tagLabel: "IA / ML",
    },
  },
  {
    slug: "feature-flags-as-code",
    num: "014",
    topic: "arch",
    date: "2026 — 02 — 22",
    read: "8 min",
    words: 1280,
    en: {
      title: "Feature flags as code: the boring version that works",
      dek: "Why our team gave up the dashboard and put flag definitions back in the repo — and what we lost by doing so.",
      tagLabel: "Architecture",
    },
    pt: {
      title: "Feature flags como código: a versão chata que funciona",
      dek: "Por que nosso time abandonou o dashboard e colocou as definições de flag de volta no repositório — e o que perdemos com isso.",
      tagLabel: "Arquitetura",
    },
  },
  {
    slug: "horizontal-pod-autoscaler",
    num: "013",
    topic: "infra",
    date: "2026 — 02 — 14",
    read: "10 min",
    words: 1580,
    en: {
      title: "HPA is a controller, not a magic wand",
      dek: "Three production incidents I traced back to autoscaler defaults, and the four-parameter tuning loop we use now.",
      tagLabel: "Infrastructure",
    },
    pt: {
      title: "HPA é um controlador, não uma varinha mágica",
      dek: "Três incidentes em produção que rastreei até os defaults do autoscaler, e o ciclo de tuning de quatro parâmetros que usamos agora.",
      tagLabel: "Infraestrutura",
    },
  },
];

const TOPICS = {
  all:   { en: "All", pt: "Todos" },
  ai:    { en: "AI / ML",        pt: "IA / ML" },
  arch:  { en: "Architecture",   pt: "Arquitetura" },
  infra: { en: "Infrastructure", pt: "Infraestrutura" },
};

const I18N = {
  en: {
    tagline: "Rigorous thinking on AI, software and infrastructure.",
    nav_home: "home",
    nav_archive: "archive",
    nav_about: "about",
    section_recent: "recent.posts",
    section_featured: "featured.entry",
    section_currently_reading: "currently.reading",
    view_archive: "view all →",
    by: "by",
    author: "Beatriz Almeida",
    role: "Software Architect / ML Practitioner — São Paulo, BR",
    handle: "ba",
    posts_n: "posts",
    since: "since",
    topics: "topics",
    read_more: "read →",
    archive_title: "Archive",
    archive_lede: "A complete record of thinking — every post since the publication began, indexed by topic and date. Filter to narrow the field; click a row to read.",
    filter_label: "filter:",
    sort_label: "sort:",
    newest_first: "newest first",
    home_title_pre: "Notes from the",
    home_title_em: "engine room",
    home_title_post: "of modern software.",
    home_lede: "A first-person record of decisions in AI systems, software architecture and infrastructure — written by one practitioner, evaluated against evidence, and published when there is something worth saying.",
    home_status: "publishing weekly · est. 2024",
    feat_meta: "post metadata",
    table_of_contents: "in this post",
    section_keys: "section keys",
    share_this: "share",
    references: "references",
    key_takeaways: "key takeaways",
    diagram_caption: "system diagram — three-stage inference pipeline",
    tradeoff_caption: "tradeoff analysis",
    crumb_archive: "archive",
    about_title: "About Inference.",
    about_lede: "Inference is the single-author publication of Beatriz Almeida — a documented record of thinking about AI systems, software architecture and the infrastructure they run on. It is not a news blog, a tutorial site, or an opinion column.",
    about_h_mission: "What this is",
    about_h_author: "Who writes it",
    about_h_topics: "What I cover",
    about_h_voice: "Editorial voice",
    about_h_bilingual: "Bilingual policy",
    about_h_contact: "Contact",
    about_mission: [
      "I started Inference because the writing I needed didn't exist. The technical articles I respected were either too academic — citation-rich but disconnected from production — or too commercial: tutorials engineered for organic traffic, with no admitted point of view.",
      "What I wanted to read was a practitioner thinking out loud, in public, with their evidence on the table. So I started writing it. Every post is a record of a real decision: a problem I encountered, the options I evaluated, the choice I made, and the reasoning behind it. Where I was wrong, I say so. Where I am still uncertain, I flag it.",
      "There are no listicles. There is no 'top ten'. There is one author. There is a point of view.",
    ],
    about_author: [
      "I am a software architect and ML practitioner based in São Paulo. I have spent roughly a decade between research labs and production teams — long enough to have shipped systems I'm proud of, and long enough to have shipped systems I now regret.",
      "I hold a Master's in Computer Science from USP, where my thesis examined inference-time optimisation for transformer architectures. Since then I have worked across financial infrastructure, ML platform engineering and distributed-systems consultancy. I have been on call for production AI systems serving tens of millions of requests per day, and I have signed off on architectures I knew would fail in two years. Both experiences inform what I write.",
    ],
    about_voice: [
      "Posts are written in the first person, because intellectual ownership matters. When I write 'I argue', I am putting my name behind the argument. When I write 'I was wrong', I am putting my name behind the correction.",
      "The register is precise. Claims are backed by evidence — benchmarks, citations, or clearly labelled personal experience. Speculation is permitted but flagged as such. Hype is not permitted.",
    ],
    about_bilingual: [
      "Inference publishes in two languages: English at en.inference.dev, Brazilian Portuguese at pt.inference.dev. Each version is written natively from the same source material — neither is a translation of the other. The voice and structure are consistent across both. The examples and references occasionally differ where local context matters.",
    ],
    about_contact: [
      "I read every email. I do not run paid sponsorships, sponsored posts, or affiliate links. If you want to flag an error, send a correction. If you want to suggest a topic, send a question I haven't answered yet.",
    ],
  },
  pt: {
    tagline: "Pensamento rigoroso sobre IA, software e infraestrutura.",
    nav_home: "início",
    nav_archive: "arquivo",
    nav_about: "sobre",
    section_recent: "posts.recentes",
    section_featured: "entrada.destaque",
    section_currently_reading: "leitura.atual",
    view_archive: "ver todos →",
    by: "por",
    author: "Beatriz Almeida",
    role: "Arquiteta de Software / Praticante de ML — São Paulo, BR",
    handle: "ba",
    posts_n: "posts",
    since: "desde",
    topics: "tópicos",
    read_more: "ler →",
    archive_title: "Arquivo",
    archive_lede: "Registro completo do pensamento — todos os posts desde o início da publicação, indexados por tópico e data. Filtre para reduzir o campo; clique numa linha para ler.",
    filter_label: "filtrar:",
    sort_label: "ordenar:",
    newest_first: "mais recentes",
    home_title_pre: "Anotações da",
    home_title_em: "sala de máquinas",
    home_title_post: "do software moderno.",
    home_lede: "Um registro em primeira pessoa de decisões em sistemas de IA, arquitetura de software e infraestrutura — escrito por uma única praticante, avaliado contra evidências, e publicado quando há algo que vale a pena dizer.",
    home_status: "publicando semanalmente · desde 2024",
    feat_meta: "metadados do post",
    table_of_contents: "neste post",
    section_keys: "chaves de seção",
    share_this: "compartilhar",
    references: "referências",
    key_takeaways: "pontos-chave",
    diagram_caption: "diagrama do sistema — pipeline de inferência de três estágios",
    tradeoff_caption: "análise de tradeoff",
    crumb_archive: "arquivo",
    about_title: "Sobre o Inference.",
    about_lede: "Inference é a publicação de autora única de Beatriz Almeida — um registro documentado de pensamento sobre sistemas de IA, arquitetura de software e a infraestrutura sobre a qual rodam. Não é um blog de notícias, um site de tutoriais ou uma coluna de opinião.",
    about_h_mission: "O que isto é",
    about_h_author: "Quem escreve",
    about_h_topics: "O que cubro",
    about_h_voice: "Voz editorial",
    about_h_bilingual: "Política bilíngue",
    about_h_contact: "Contato",
    about_mission: [
      "Comecei o Inference porque a escrita de que eu precisava não existia. Os artigos técnicos que eu respeitava eram acadêmicos demais — ricos em citações mas desconectados de produção — ou comerciais demais: tutoriais engenheirados para tráfego orgânico, sem ponto de vista assumido.",
      "O que eu queria ler era um praticante pensando em voz alta, em público, com as evidências na mesa. Então comecei a escrever. Cada post é o registro de uma decisão real: um problema encontrado, as opções avaliadas, a escolha feita e o raciocínio por trás dela. Onde estive errada, eu digo. Onde ainda há incerteza, eu sinalizo.",
      "Não há listicles. Não há 'top dez'. Há uma autora. Há um ponto de vista.",
    ],
    about_author: [
      "Sou arquiteta de software e praticante de ML em São Paulo. Passei aproximadamente uma década entre laboratórios de pesquisa e times de produção — tempo suficiente para ter entregue sistemas dos quais me orgulho, e tempo suficiente para ter entregue sistemas dos quais hoje me arrependo.",
      "Tenho mestrado em Ciência da Computação pela USP, onde minha dissertação examinou otimização de inferência para arquiteturas transformer. Desde então trabalhei em infraestrutura financeira, engenharia de plataforma de ML e consultoria em sistemas distribuídos. Já fui on-call para sistemas de IA em produção atendendo dezenas de milhões de requisições por dia, e já assinei embaixo de arquiteturas que sabia que falhariam em dois anos. As duas experiências informam o que escrevo.",
    ],
    about_voice: [
      "Os posts são escritos em primeira pessoa, porque autoria intelectual importa. Quando escrevo 'eu defendo', estou colocando meu nome atrás do argumento. Quando escrevo 'eu estava errada', estou colocando meu nome atrás da correção.",
      "O registro é preciso. Afirmações são sustentadas por evidência — benchmarks, citações ou experiência pessoal claramente identificada. Especulação é permitida, mas sinalizada como tal. Hype não é permitido.",
    ],
    about_bilingual: [
      "Inference publica em dois idiomas: inglês em en.inference.dev, português brasileiro em pt.inference.dev. Cada versão é escrita nativamente a partir do mesmo material-fonte — nenhuma é tradução da outra. A voz e a estrutura são consistentes entre ambas. Os exemplos e referências ocasionalmente diferem onde o contexto local importa.",
    ],
    about_contact: [
      "Leio todos os emails. Não rodo patrocínios pagos, posts patrocinados ou links de afiliados. Se quiser sinalizar um erro, mande uma correção. Se quiser sugerir um tópico, mande uma pergunta que eu ainda não tenha respondido.",
    ],
  },
};

const TOPIC_DESC = {
  en: {
    ai:    "Model architecture, training pipelines, inference optimisation, evaluation.",
    arch:  "System design, design patterns, API design, distributed systems.",
    infra: "GCP / AWS / Azure, containerisation, CI/CD, observability, cost engineering.",
  },
  pt: {
    ai:    "Arquitetura de modelos, pipelines de treino, otimização de inferência, avaliação.",
    arch:  "Design de sistemas, padrões, design de API, sistemas distribuídos.",
    infra: "GCP / AWS / Azure, contêineres, CI/CD, observabilidade, engenharia de custo.",
  },
};

// Long-form post body used on the post page (lorem-style technical placeholder).
const SAMPLE_POST = {
  slug: "kv-cache-eviction",
  en: {
    title: "When KV-cache eviction beats a bigger context window",
    lede: "A walk through three eviction policies — recency, attention-score, and the lossy summariser we ended up shipping — measured on a 70B production workload.",
    sections: [
      {
        h: "The problem",
        body: [
          "A six-month-old service in our inference fleet had quietly grown into the third-most expensive thing the platform team operates. The root cause was unsurprising: context windows. The model's effective working set had doubled twice in a year, and the GPU memory pressure had moved from theoretical to operational. <em>We could either pay for bigger GPUs or stop pretending every token mattered equally.</em>",
          "I want to be honest about the framing here. 'Bigger context' is rarely the constraint engineers think it is. The constraint is almost always the cost of the KV-cache that backs it. A token sits in the cache for every layer of the model and every attention head. At seventy billion parameters and a thirty-two-thousand-token window, that is not a window — that is a tenancy."
        ],
      },
      {
        h: "Three policies, briefly",
        body: [
          "Eviction is a controller problem disguised as a memory problem. We evaluated three policies in offline replay before promoting any to a canary:",
          "<strong>Recency</strong> is the dumb baseline. Drop the oldest tokens first. It is wrong in obvious ways — instructions and system prompts are usually the oldest — but it is wrong in <em>predictable</em> ways, which has value.",
          "<strong>Attention-score eviction</strong> ranks tokens by their accumulated attention mass and evicts the lowest-scoring entries. It is theoretically appealing and operationally fiddly. The score is non-stationary; it shifts as the conversation evolves; the score itself costs memory to maintain.",
          "<strong>Lossy summarisation</strong> replaces evicted spans with a model-generated summary token. It is the most expensive at write time and the cheapest at read time. It is also the policy that survived contact with production."
        ],
      },
      {
        h: "What the benchmark told us",
        body: [
          "I ran each policy against four task families — instruction-following, long-document QA, multi-turn dialogue, and code-completion — at three eviction pressures. The result was not a clean winner. The result was a set of regimes.",
          "At low pressure (< 30% eviction), recency was indistinguishable from no eviction at all. At medium pressure (30–60%), attention-score eviction held quality but doubled the controller overhead. At high pressure (> 60%), only the summariser kept dialogue coherence above our SLO. <code>p50</code> latency moved by less than fifteen milliseconds across all three; <code>p99</code> latency on the summariser moved by ninety, because of the summary-generation step."
        ],
      },
      {
        h: "The decision",
        body: [
          "We shipped a hybrid: recency at low pressure, summarisation at high pressure, with the switch decided by a controller that watches cache occupancy and not request count. The hybrid was not the best policy on any single benchmark; it was the policy that lost the fewest points on the worst benchmark.",
          "<em>I think that is the actual lesson.</em> When you cannot pick a winner, pick the policy with the highest floor. The team has shipped two iterations since this post was drafted, and the floor has held."
        ],
      },
    ],
  },
  pt: {
    title: "Quando descartar o KV-cache vence aumentar o contexto",
    lede: "Análise de três políticas de descarte — recência, score de atenção, e o sumarizador com perda que acabamos entregando — medidas em um workload de produção de 70B.",
    sections: [
      {
        h: "O problema",
        body: [
          "Um serviço de seis meses em nossa frota de inferência havia silenciosamente se tornado a terceira coisa mais cara que o time de plataforma opera. A causa raiz não surpreendeu: janelas de contexto. O working set efetivo do modelo havia dobrado duas vezes em um ano, e a pressão de memória da GPU saiu do teórico para o operacional. <em>Podíamos pagar por GPUs maiores ou parar de fingir que todo token importava igualmente.</em>",
          "Quero ser honesta sobre o enquadramento aqui. 'Mais contexto' raramente é a restrição que os engenheiros pensam ser. A restrição quase sempre é o custo do KV-cache que a sustenta. Um token ocupa o cache em cada camada do modelo e em cada cabeça de atenção. Com setenta bilhões de parâmetros e uma janela de trinta e dois mil tokens, isso não é uma janela — é um inquilinato."
        ],
      },
      {
        h: "Três políticas, em síntese",
        body: [
          "Descarte é um problema de controlador disfarçado de problema de memória. Avaliamos três políticas em replay offline antes de promover qualquer uma para canário:",
          "<strong>Recência</strong> é a linha de base burra. Descartar os tokens mais antigos primeiro. Está errado de formas óbvias — instruções e prompts de sistema costumam ser os mais antigos — mas erra de forma <em>previsível</em>, o que tem valor.",
          "<strong>Descarte por score de atenção</strong> ordena tokens pela massa acumulada de atenção e descarta os de menor pontuação. É teoricamente atraente e operacionalmente trabalhoso. A pontuação não é estacionária; muda conforme a conversa evolui; manter a pontuação custa memória.",
          "<strong>Sumarização com perda</strong> substitui trechos descartados por um token de resumo gerado pelo modelo. É a mais cara em escrita e a mais barata em leitura. Também foi a política que sobreviveu ao contato com produção."
        ],
      },
      {
        h: "O que o benchmark nos disse",
        body: [
          "Rodei cada política contra quatro famílias de tarefa — seguimento de instruções, QA de documentos longos, diálogo multi-turno e completação de código — em três níveis de pressão de descarte. O resultado não foi um vencedor limpo. Foi um conjunto de regimes.",
          "Em pressão baixa (< 30% de descarte), recência foi indistinguível de não descartar. Em pressão média (30–60%), o descarte por score de atenção manteve a qualidade mas dobrou o overhead do controlador. Em pressão alta (> 60%), apenas o sumarizador manteve a coerência do diálogo acima do nosso SLO. A latência <code>p50</code> moveu menos de quinze milissegundos nos três casos; <code>p99</code> do sumarizador moveu noventa, por causa da geração do resumo."
        ],
      },
      {
        h: "A decisão",
        body: [
          "Entregamos um híbrido: recência em pressão baixa, sumarização em pressão alta, com a chave decidida por um controlador que olha a ocupação do cache e não a contagem de requisições. O híbrido não foi a melhor política em nenhum benchmark isolado; foi a política que perdeu menos pontos no pior benchmark.",
          "<em>Acho que essa é a lição real.</em> Quando não dá para escolher um vencedor, escolha a política com o maior piso. O time entregou duas iterações desde que este post foi rascunhado, e o piso se manteve."
        ],
      },
    ],
  },
};

Object.assign(window, { POSTS, TOPICS, TOPIC_DESC, I18N, SAMPLE_POST });
