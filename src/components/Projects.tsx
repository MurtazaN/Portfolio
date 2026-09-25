type ProjectLink = { label: string; href: string };

type FeaturedProject = {
  id: string;
  title: string;
  tagline: string;
  period: string;
  affiliation?: string;
  badge?: string;
  problem: string;
  writeupAngle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  links: ProjectLink[];
  color: string;
};

type OtherProject = {
  id: string;
  title: string;
  tagline: string;
  period: string;
  affiliation?: string;
  summary: string;
  techStack: string[];
  links: ProjectLink[];
};

const featuredProjects: FeaturedProject[] = [
  {
    id: "soc-claw",
    title: "SOC-Claw / Blue Lantern",
    tagline: "Multi-Agent Incident Response Coordinator",
    period: "Apr 2026 – Present",
    badge: "Hackathon Winner · Red Hat",
    problem:
      "Security Operations Center (SOC) teams process thousands of SIEM alerts every day. About 95% are noise, while the remaining 5% represent critical threats that cost millions per breach on average. SOC-Claw automates alert triage so analysts can focus on the threats that matter.",
    writeupAngle: "Why a second agent checks the first",
    description:
      "A three-agent AI pipeline (Triage → Verifier → Response) that enriches raw alerts, double-checks its own reasoning, and proposes response plans that an analyst approves before anything runs.",
    highlights: [
      "Triage Agent enriches raw alerts with IP reputation databases, MITRE ATT&CK technique mapping, and asset CMDB lookups, producing P1–P4 severity scores with confidence ratings and reasoning chains",
      "Self-correcting Verifier Agent (no tools) runs a 4-point checklist — evidence alignment, reasoning completeness, logical consistency, and bias detection — improving triage accuracy from 78% to 88%",
      "Response Agent generates prioritized incident response plans with per-step reasoning and urgency levels, requiring analyst approval before execution",
      "Privacy-aware routing keeps sensitive SOC data (internal IPs, hostnames, alert payloads) on local inference via vLLM, with optional routing to cloud endpoints",
      "FastAPI backend and Red Hat-themed dashboard for real-time alert analysis, triage visualization, and per-step action approval or rejection",
    ],
    techStack: ["Python", "FastAPI", "vLLM", "Kafka", "MITRE ATT&CK"],
    links: [{ label: "View on GitHub", href: "https://github.com/MurtazaN/SoC-Claw" }],
    color: "from-red-500 to-rose-400",
  },
  {
    id: "savvio",
    title: "SavVio",
    tagline: "AI Financial Advocate",
    period: "Jan 2026 – Present",
    problem:
      "Consumers often make impulsive purchases without understanding the true financial impact. Existing budgeting apps track spending but don't proactively evaluate whether a purchase is wise. SavVio bridges this gap by combining AI reasoning with deterministic financial rules to deliver personalized Buy/Wait/Avoid recommendations.",
    writeupAngle: "Why I didn't just use an LLM for everything",
    description:
      "An AI-driven financial advocacy tool that evaluates purchase decisions using a hybrid architecture combining LLM-based context understanding with a deterministic financial logic engine for affordability analysis.",
    highlights: [
      "RAG pipeline with LangChain and pgvector product embeddings for context-aware product utility analysis through GPT-4.1, Claude 4.5, and Gemini 3",
      "Trained, tuned, and compared classifier and regression models for Buy/Wait/Avoid recommendations, with MLflow experiment tracking and model versioning",
      "Apache Airflow pipelines for data ingestion and model training, with Great Expectations data validation and Evidently AI drift monitoring",
      "NVIDIA NeMo Guardrails as FastAPI middleware for pre- and post-LLM response validation",
      "Containerized FastAPI services on GCP Cloud Run, with CI/CD through GitHub Actions and Cloud Build",
      "Prometheus, Grafana, and GCP Cloud Monitoring for latency, drift, and cost tracking with billing alerts, plus DVC data versioning on GCP Cloud Storage",
    ],
    techStack: [
      "Python", "LangChain", "pgvector", "MLflow", "Apache Airflow", "FastAPI",
      "GCP Cloud Run", "Docker", "GitHub Actions", "Great Expectations",
      "Evidently AI", "NeMo Guardrails", "Prometheus", "Grafana", "DVC", "pandas",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/nirajmehta960/SavVio" }],
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "nuclear-shelter",
    title: "Nuclear Shelter Location by AI-Optimization",
    tagline: "Genetic Algorithm for NP-Hard Optimization",
    period: "Jan 2026 – Apr 2026",
    affiliation: "Northeastern University",
    problem:
      "Placing emergency shelters optimally is an NP-hard problem — brute force is intractable at scale. This project uses evolutionary computation to find near-optimal shelter placements that maximize population coverage while respecting blast zone safety constraints and infrastructure accessibility.",
    writeupAngle: "Using evolutionary computation for real-world facility placement",
    description:
      "A Genetic Algorithm for the Uncapacitated Facility Location Problem (UFLP) that identifies optimal nuclear shelter locations across ~30,000 US zip codes, maximizing population coverage while enforcing a 15-mile blast zone exclusion radius around urban targets.",
    highlights: [
      "Binary chromosome encoding with tournament selection, uniform crossover, and bit-flip mutation, evolving candidate solutions toward high-fitness placements",
      "Multi-objective fitness: population coverage within a serviceable radius, strategic safety (distance from nuclear targets), and infrastructure accessibility (road networks and power grid)",
      "Geospatial data from the US Census Bureau (zip code populations), nuclear target databases, and OpenStreetMap road networks",
      "Spatial joins, distance calculations, and exclusion zone masking with GeoPandas, Shapely, and OSMnx",
      "Benchmarked against a greedy baseline heuristic, with the GA better balancing competing objectives across large candidate sets",
    ],
    techStack: ["Python", "NumPy", "GeoPandas", "Shapely", "OSMnx"],
    links: [{ label: "View on GitHub", href: "https://github.com/MurtazaN/nuclear_shelter_location" }],
    color: "from-emerald-500 to-green-400",
  },
  {
    id: "kambaz",
    title: "Kambaz",
    tagline: "Learning Management System",
    period: "Sep 2025 – Dec 2025",
    affiliation: "Northeastern University",
    problem:
      "Educational institutions need flexible LMS platforms that handle distinct user workflows — admins managing users, professors building courses, and students consuming content. Kambaz demonstrates end-to-end web development with complex authorization logic and a split deployment architecture.",
    writeupAngle: "Designing for three different user types",
    description:
      "A full-stack learning management system similar to Canvas, with a React frontend, a Node.js backend, MongoDB for persistent storage, and a RESTful API.",
    highlights: [
      "Role-based access control with separate Admin, Professor, and Student views",
      "Course management, assignment submission, quizzes, exams, and grading workflows",
      "RESTful API design with a Node.js backend and MongoDB data layer",
      "Split deployment: frontend on Vercel and backend on Render, with CORS policies and production build pipelines",
    ],
    techStack: ["React", "Node.js", "MongoDB", "REST API", "Vercel", "Render"],
    links: [
      { label: "Live demo", href: "https://kambaz-next-js-three.vercel.app" },
      { label: "Frontend repo", href: "https://github.com/MurtazaN/kambaz-next-js" },
      { label: "Backend repo", href: "https://github.com/MurtazaN/kambaz-node-server-app" },
    ],
    color: "from-violet-500 to-purple-400",
  },
];

const otherProjects: OtherProject[] = [
  {
    id: "autofinder",
    title: "AutoFinder",
    tagline: "Vehicle Marketplace",
    period: "Jan 2025 – Apr 2025",
    affiliation: "Northeastern University",
    summary:
      "A full-stack vehicle listing application similar to CarGurus, with search, filter, and comparison features backed by optimized SQL queries.",
    techStack: ["React", "Node.js", "MySQL"],
    links: [],
  },
  {
    id: "libre-food-pantry",
    title: "Libre Food Pantry",
    tagline: "Full-Stack App on AWS",
    period: "Jan 2022 – Jul 2022",
    affiliation: "Worcester State University",
    summary:
      "Deployed a full-stack application on AWS serving USDA FSIS data to Libre Food Pantry, containerized with Docker Compose for consistent deployments across staging and production.",
    techStack: ["Node.js", "MongoDB", "Docker Compose", "AWS"],
    links: [
      { label: "Frontend repo", href: "https://github.com/MurtazaN/FoodPantryFrontEnd" },
      { label: "Backend repo", href: "https://github.com/MurtazaN/LibreFoodPantryBackEnd" },
      { label: "API repo", href: "https://github.com/MurtazaN/LibreFoodPantryAPI" },
    ],
  },
  {
    id: "op-credit",
    title: "OP Credit",
    tagline: "Android App",
    period: "Jan 2021",
    affiliation: "Worcester State University",
    summary:
      "A Java-based Android app that streamlines credit-based work assignments, with separate professor and student login flows and Google Drive file uploads. Led a team of four and presented it at a hackathon.",
    techStack: ["Java", "Android", "Android Studio", "Google Drive"],
    links: [{ label: "View on GitHub", href: "https://github.com/MurtazaN/OPcredit" }],
  },
  {
    id: "car-insurance-report",
    title: "Car Insurance Report",
    tagline: "Distributed Data Analysis",
    period: "Oct 2020 – Dec 2020",
    affiliation: "Worcester State University",
    summary:
      "Distributed processing of insurance datasets with Apache Spark on AWS EMR, using data mining and statistical analysis to assess correlations between attributes, with Python analysis scripts and R visualization dashboards.",
    techStack: ["Apache Spark", "AWS EMR", "Python", "R"],
    links: [{ label: "View on GitHub", href: "https://github.com/MurtazaN/CarInsuranceAnalysis" }],
  },
];

function TechBadge({ name }: { name: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
      {name}
    </span>
  );
}

function formatMeta(period: string, affiliation?: string) {
  return affiliation ? `${period} · ${affiliation}` : period;
}

function ProjectLinks({
  links,
  projectTitle,
  variant,
}: {
  links: ProjectLink[];
  projectTitle: string;
  variant: "button" | "text";
}) {
  if (links.length === 0) return null;

  return (
    <div
      className={
        variant === "button" ? "flex flex-wrap gap-2" : "mt-4 flex flex-wrap gap-x-4 gap-y-1"
      }
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${projectTitle} – ${link.label}`}
          className={
            variant === "button"
              ? "rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-400 transition-colors hover:border-white/30 hover:text-white"
              : "text-xs font-medium text-accent transition-colors hover:text-white"
          }
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all hover:border-white/20">
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

      <div className="p-8 lg:p-10">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            {project.badge && (
              <span className="mb-3 inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                {project.badge}
              </span>
            )}
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className={`bg-gradient-to-r ${project.color} bg-clip-text text-sm font-medium text-transparent`}>
              {project.tagline}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {formatMeta(project.period, project.affiliation)}
            </p>
          </div>
          <ProjectLinks links={project.links} projectTitle={project.title} variant="button" />
        </div>

        {/* Problem */}
        <div className="mb-6">
          <h4 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            The Problem
          </h4>
          <p className="text-sm leading-relaxed text-gray-400">
            {project.problem}
          </p>
        </div>

        {/* Approach / Writeup angle */}
        <div className="mb-6">
          <h4 className="mb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Approach — {project.writeupAngle}
          </h4>
          <p className="mb-4 text-sm leading-relaxed text-gray-400">
            {project.description}
          </p>
        </div>

        {/* Key highlights */}
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Key Highlights
          </h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r ${project.color}`} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div>
          <h4 className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/20">
      <h4 className="text-lg font-bold text-white">{project.title}</h4>
      <p className="text-sm font-medium text-accent">{project.tagline}</p>
      <p className="mt-1 mb-4 text-xs text-gray-400">
        {formatMeta(project.period, project.affiliation)}
      </p>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">{project.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <TechBadge key={t} name={t} />
        ))}
      </div>
      <ProjectLinks links={project.links} projectTitle={project.title} variant="text" />
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
        Featured Projects
      </h2>
      <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
        A curated selection of projects spanning ML/AI, cloud infrastructure, and
        full-stack development.
      </p>

      <div className="flex flex-col gap-10">
        {featuredProjects.map((p) => (
          <FeaturedProjectCard key={p.id} project={p} />
        ))}
      </div>

      <h3 className="mt-20 mb-8 text-center text-2xl font-bold text-white">
        More Projects
      </h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {otherProjects.map((p) => (
          <OtherProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
