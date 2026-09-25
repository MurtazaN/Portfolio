# Portfolio Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's outdated content with the facts in Murtaza's current resume and LinkedIn exports, using GitHub only for project links.

**Architecture:** Content lives in typed data arrays at the top of each section component and is rendered with `map`, the pattern `Skills.tsx` already uses. `Projects.tsx` splits into four featured case-study cards plus a compact "More Projects" grid. `Experience.tsx` moves from hand-written JSX to `roles` and `education` arrays. No new files, dependencies, or styles.

**Tech Stack:** Next.js 15.5 (App Router, `output: "export"`), React 19, TypeScript 5.9 (strict), Tailwind CSS 4.2 (CSS-first config in `src/app/globals.css`).

**Spec:** `plans/2026-09-25-content-refresh-design.md`. It explains every content decision and how conflicts between the source documents were resolved. The source PDFs are in `docs/`, which is git-ignored.

## Global Constraints

- No new dependencies and no new files under `src/`.
- Never render the phone number from the resume or LinkedIn export.
- Every claim about roles, dates, results, and tools comes from the three documents in `docs/`. The spec lists the two exceptions.
- Keep the visual design, colors, section order, and navigation.
- Every Tailwind class must appear as one complete literal string in source. Never build class names by concatenation.
- In JS strings, write the characters themselves (`'`, `–`, `—`, `·`, `×`). In JSX text, keep each file's entity style (`&apos;`, `&mdash;`, `&middot;`, `&times;`).
- Comments: only a short note for a non-obvious constraint. Keep the existing section comments in `Projects.tsx`.
- Do not commit. Leave changes in the working tree for review; committing was declined for this work.
- Run every command from the repo root: `/Users/murtaza/temp/stuff/portfolio/portfolio`.
- `npm run build` prints a warning that ESLint isn't installed. That's expected: ESLint is not a dependency, and setting it up is out of scope.

## Review Focus

1. **Invisible tagline text.** Featured taglines use `text-transparent` with a gradient clip. If Tailwind never sees `from-red-500 to-rose-400`, the SOC-Claw tagline disappears. Task 1 greps the compiled CSS for both classes.
2. **Horizontal overflow on phones.** Kambaz's three link buttons, the long certification names, and the long skill pills must wrap at 390px rather than widen the page. Task 5 measures `scrollWidth` at 390px.
3. **Literal entities in data strings.** A JS string containing `&apos;` renders those six characters instead of an apostrophe. Task 5 greps the HTML for escaped entity text.
4. **Links that sound identical to screen readers.** Seven projects carry a "View on GitHub" link, so each accessible name must include the project title. Task 1 checks an `aria-label`.
5. **Dead links.** A renamed repo or a demo that goes down (SavVio's already has) sends visitors to an error page. Task 5 requests every external link and expects HTTP 200.

---

### Task 1: Projects section — featured cards, More Projects grid, links

**Files:**
- Modify (full rewrite): `src/components/Projects.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. `src/app/page.tsx` renders `<Projects />` with no props, and that doesn't change.
- Produces: nothing other tasks use.

- [ ] **Step 1: Run the section check against the current code and confirm it fails**

```bash
npm run build > "${TMPDIR:-/tmp}/portfolio-build.log" 2>&1 || { echo "BUILD FAILED"; tail -20 "${TMPDIR:-/tmp}/portfolio-build.log"; }
for s in "SOC-Claw / Blue Lantern" "Hackathon Winner" "More Projects" "AutoFinder" "Libre Food Pantry" "OP Credit" "Car Insurance Report" "Nuclear Shelter Location by AI-Optimization" "github.com/nirajmehta960/SavVio" "kambaz-next-js-three.vercel.app" 'aria-label="Kambaz – Frontend repo"'; do
  grep -qF -- "$s" out/index.html || echo "MISSING: $s"
done
grep -qF "Cloud Migration" out/index.html && echo "STILL PRESENT: Cloud Migration"
grep -qF ".from-red-500" out/_next/static/css/*.css || echo "MISSING CSS: from-red-500"
grep -qF ".to-rose-400" out/_next/static/css/*.css || echo "MISSING CSS: to-rose-400"
echo "check done"
```

Expected: a `MISSING:` line for every new string, `STILL PRESENT: Cloud Migration`, both `MISSING CSS:` lines, then `check done`.

- [ ] **Step 2: Replace the entire contents of `src/components/Projects.tsx`**

```tsx
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
```

`formatMeta` exists so each meta line is a single text node. Adjacent JSX expressions make React's server renderer insert `<!-- -->` between them, which breaks substring checks on the built HTML.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output and exit code 0.

- [ ] **Step 4: Re-run the Step 1 check**

Expected: only `check done`.

---

### Task 2: Experience section — data-driven timeline with the new role

**Files:**
- Modify (full rewrite): `src/components/Experience.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. `page.tsx` renders `<Experience />` with no props.
- Produces: nothing other tasks use.

- [ ] **Step 1: Run the section check and confirm it fails**

```bash
npm run build > "${TMPDIR:-/tmp}/portfolio-build.log" 2>&1 || { echo "BUILD FAILED"; tail -20 "${TMPDIR:-/tmp}/portfolio-build.log"; }
for s in "Bitcoin Culture Hub" "OptEn (Opportunity Engine)" "Cohere Rerank 3.5" "10% to 94%" "Alembic" "Cloud/DevOps Engineer" "May 2026 – Present · Hillsdale, IL" "EKS (Kubernetes)" "Cloud engineering in production since 2022"; do
  grep -qF -- "$s" out/index.html || echo "MISSING: $s"
done
for s in "zero security breaches" "2.5 years of professional" "Cloud Engineer / Solutions Architect"; do
  grep -qF -- "$s" out/index.html && echo "STILL PRESENT: $s"
done
echo "check done"
```

Expected: `MISSING:` for every string in the first list, `STILL PRESENT:` for all three in the second, then `check done`.

- [ ] **Step 2: Replace the entire contents of `src/components/Experience.tsx`**

`space-y-12` on the timeline replaces the old per-item `mb-12`. It leaves the same 3rem gap between items and none after the last one.

```tsx
type Role = {
  title: string;
  org: string;
  period: string;
  location: string;
  summary?: string;
  bullets: string[];
};

type Education = {
  degree: string;
  school: string;
  period: string;
  location: string;
  detail: string;
};

const roles: Role[] = [
  {
    title: "AI Software Engineer",
    org: "Bitcoin Culture Hub",
    period: "May 2026 – Present",
    location: "Hillsdale, IL",
    summary:
      "As an early team member, I own much of the technical foundation of two products: CLCT, an online marketplace, and OptEn (Opportunity Engine), a professional networking platform — working across frontend, backend, database, infrastructure, and LLM integration.",
    bullets: [
      "Built the AI recommendation systems powering both products — personalized product discovery in CLCT, and connection, job, and event recommendations in OptEn — using embedding models and LLMs via OpenAI and AWS Bedrock.",
      "Designed organization-to-organization matching that aligns one organization's products and services with another's stated needs, deliberately excluding competitors rather than relying on similarity alone.",
      "Built a job application portal end to end (posting, submission, applicant tracking, recruiter review) with two-stage applicant ranking: embedding-based retrieval followed by re-ranking with Cohere Rerank 3.5 on Bedrock.",
      "Instrumented products with OpenTelemetry and AWS Distro for OpenTelemetry (ADOT), exporting distributed traces to X-Ray and metrics and logs to CloudWatch, with alarms on latency, error rate, and AI model cost.",
      "Built real-time messaging over WebSockets with connection lifecycle handling, message persistence, and delivery state.",
      "Hardened an inherited codebase with critical security gaps (broken access control, credential exposure, committed secrets), raised test coverage from 10% to 94%, and introduced mutation testing to validate test effectiveness.",
      "Migrated MySQL to PostgreSQL with AWS DMS, introduced schema version control with Alembic, and built isolated dev and prod environments with a scheduled one-way prod-to-dev sync across RDS and S3 — moving all local development off production data.",
      "Authored technical documentation used in investor due diligence and audits for both products, and serve as the primary technical point of contact with our AWS account team.",
    ],
  },
  {
    title: "Cloud/DevOps Engineer",
    org: "Bridge Informatics",
    period: "July 2022 – December 2024",
    location: "Cambridge, MA",
    bullets: [
      "Designed and implemented scalable cloud architecture on AWS for data-intensive applications, using ECS and EKS (Kubernetes) for container orchestration and CloudWatch for centralized monitoring and alerting — reducing client expenditure by 30%.",
      "Led migration of on-premises applications to AWS using Migration Hub, Application Migration Service (MGN), Database Migration Service (DMS), and DataSync, configuring networking (VPC), access control (IAM, Cognito, SSO), and load balancing (ALB/NLB) for improved performance and lower maintenance costs.",
      "Built and maintained CI/CD pipelines with AWS CodePipeline and GitHub Actions for automated testing, builds, and zero-downtime deployments across multiple environments.",
      "Automated infrastructure provisioning with Terraform, CloudFormation, and Ansible, minimizing configuration drift.",
    ],
  },
];

const education: Education[] = [
  {
    degree: "M.S. Computer Science",
    school: "Northeastern University",
    period: "Jan 2025 – May 2027",
    location: "Boston, MA",
    detail: "Coursework: Foundations of AI, Machine Learning, MLOps, DBMS, Algorithms, PDP",
  },
  {
    degree: "B.S. Computer Science",
    school: "Worcester State University",
    period: "Sept 2018 – May 2022",
    location: "Worcester, MA",
    detail: "Minor in Business · Summa cum laude · Dean's List · Presidential Honor",
  },
];

function TimelineItem({
  variant,
  title,
  org,
  meta,
  children,
}: {
  variant: "role" | "education";
  title: string;
  org: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className={`absolute -left-10 top-1 h-4 w-4 rounded-full border-2 bg-[#030712] ${
          variant === "role" ? "border-accent" : "border-primary"
        }`}
      />
      <div className="rounded-xl border border-white/10 bg-surface p-6 lg:p-8">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className={`text-sm font-medium ${variant === "role" ? "text-accent" : "text-primary"}`}>
              {org}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
            {meta}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="border-t border-white/5 bg-surface/50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          Experience
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
          Cloud engineering in production since 2022, now building AI-powered products.
        </p>

        <div className="relative space-y-12 border-l border-white/10 pl-8">
          {roles.map((role) => (
            <TimelineItem
              key={role.org}
              variant="role"
              title={role.title}
              org={role.org}
              meta={`${role.period} · ${role.location}`}
            >
              {role.summary && (
                <p className="mb-4 text-sm leading-relaxed text-gray-300">{role.summary}</p>
              )}
              <ul className="space-y-3 text-sm leading-relaxed text-gray-400">
                {role.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </TimelineItem>
          ))}

          {education.map((edu) => (
            <TimelineItem
              key={edu.school}
              variant="education"
              title={edu.degree}
              org={edu.school}
              meta={`${edu.period} · ${edu.location}`}
            >
              <p className="text-sm text-gray-400">{edu.detail}</p>
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no output and exit code 0. `React.ReactNode` resolves without an import, as it already does in `src/app/layout.tsx`.

- [ ] **Step 4: Re-run the Step 1 check**

Expected: only `check done`.

---

### Task 3: Skills & Certifications — four certifications, rebuilt categories

**Files:**
- Modify: `src/components/Skills.tsx` — replace the `skillCategories` array (lines 1–34) and the `certifications` array (lines 36–40), and change the certifications grid class on line 53.

**Interfaces:**
- Consumes: nothing. The JSX that renders both arrays stays as is: it reads `cat.title`, `cat.skills`, `cert.name`, and `cert.color`, and the new arrays keep those field names.
- Produces: nothing other tasks use.

- [ ] **Step 1: Run the section check and confirm it fails**

Run this after Tasks 1 and 2, since the old Projects card also contained scikit-learn.

```bash
npm run build > "${TMPDIR:-/tmp}/portfolio-build.log" 2>&1 || { echo "BUILD FAILED"; tail -20 "${TMPDIR:-/tmp}/portfolio-build.log"; }
for s in "AWS Certified Data Engineer – Associate" "AWS Certified DevOps Engineer – Professional" "AWS Certified Solutions Architect – Associate" "Hugging Face Transformers" "OpenTelemetry (ADOT)" "Spring Boot" "Infrastructure &amp; CI/CD" 'class="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"'; do
  grep -qF -- "$s" out/index.html || echo "MISSING: $s"
done
for s in "scikit-learn" "BigQuery" "YAML" "Vertex AI" "GCP Cloud Logging"; do
  grep -qF -- "$s" out/index.html && echo "STILL PRESENT: $s"
done
echo "check done"
```

Expected: `MISSING:` for every string in the first list, `STILL PRESENT:` for all five in the second, then `check done`.

- [ ] **Step 2: Replace the `skillCategories` array (lines 1–34) with**

```ts
const skillCategories = [
  {
    title: "AI / LLMs",
    skills: [
      "OpenAI", "AWS Bedrock", "Cohere Rerank", "LangChain", "LangGraph",
      "LlamaIndex", "Hugging Face Transformers", "vLLM", "NeMo Guardrails",
    ],
  },
  {
    title: "ML & Data",
    skills: ["PyTorch", "pandas", "NumPy", "Apache Spark", "Kafka", "GeoPandas"],
  },
  {
    title: "MLOps / LLMOps",
    skills: ["MLflow", "Apache Airflow", "DVC", "Great Expectations", "Evidently AI"],
  },
  {
    title: "Cloud Platforms",
    skills: [
      "AWS (ECS, EKS, RDS, S3, DMS, IAM, VPC, Cognito)",
      "GCP (Cloud Run, AI Studio, Cloud Build, Cloud Storage)",
    ],
  },
  {
    title: "Infrastructure & CI/CD",
    skills: [
      "Terraform", "CloudFormation", "Ansible", "Docker", "Kubernetes",
      "GitHub Actions", "AWS CodePipeline",
    ],
  },
  {
    title: "Observability",
    skills: [
      "OpenTelemetry (ADOT)", "AWS X-Ray", "CloudWatch", "Prometheus",
      "Grafana", "GCP Cloud Monitoring",
    ],
  },
  {
    title: "Databases & Search",
    skills: [
      "PostgreSQL (pgvector)", "Pinecone", "FAISS", "MySQL", "MongoDB",
      "Embeddings", "Semantic Search",
    ],
  },
  {
    title: "Languages & Frameworks",
    skills: [
      "Python", "SQL", "TypeScript", "JavaScript", "Java", "Bash",
      "FastAPI", "React", "Node.js", "Spring Boot",
    ],
  },
];
```

- [ ] **Step 3: Replace the `certifications` array (lines 36–40) with**

```ts
const certifications = [
  { name: "AWS Certified DevOps Engineer – Professional", color: "from-orange-500 to-amber-400" },
  { name: "AWS Certified Solutions Architect – Associate", color: "from-blue-500 to-cyan-400" },
  { name: "AWS Certified Developer – Associate", color: "from-emerald-500 to-green-400" },
  { name: "AWS Certified Data Engineer – Associate", color: "from-violet-500 to-purple-400" },
];
```

- [ ] **Step 4: Change the certifications grid class**

In `Skills()`, change `<div className="mb-16 grid gap-4 sm:grid-cols-3">` to `<div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no output and exit code 0.

- [ ] **Step 6: Re-run the Step 1 check**

Expected: only `check done`.

---

### Task 4: Hero, About, Contact, and page metadata

**Files:**
- Modify: `src/app/layout.tsx` — the `metadata` export (lines 4–14)
- Modify: `src/components/Hero.tsx` — the kicker paragraph (lines 5–7) and the intro paragraph (lines 14–18)
- Modify (full rewrite): `src/components/About.tsx`
- Modify: `src/components/Contact.tsx` — the blurb paragraph (lines 5–8)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. `metadata` keeps the `Metadata` type from `next`.

- [ ] **Step 1: Run the section check and confirm it fails**

```bash
npm run build > "${TMPDIR:-/tmp}/portfolio-build.log" 2>&1 || { echo "BUILD FAILED"; tail -20 "${TMPDIR:-/tmp}/portfolio-build.log"; }
for s in "<title>Murtaza Nipplewala | AI Software Engineer</title>" "AI Software Engineer · Cloud Engineer · DevOps Engineer · Solutions Architect" "backend APIs and LLM integrations" "4× AWS Certified" "Always happy to connect with people building cool things" "I hold four" "networking platform. Alongside that"; do
  grep -qF -- "$s" out/index.html || echo "MISSING: $s"
done
for s in "Solution Architect" "actively seeking" "co-op opportunities" "I hold three" "Full-Stack Developer" "Cloud Engineer &amp; ML Engineer" "AWS-certified Cloud Engineer"; do
  grep -qF -- "$s" out/index.html && echo "STILL PRESENT: $s"
done
echo "check done"
```

Expected: `MISSING:` for every string in the first list. Then `STILL PRESENT:` for every string in the second list except `Solution Architect`, which was never on the site and only guards against the LinkedIn spelling slipping in. Then `check done`.

- [ ] **Step 2: Replace the `metadata` export in `src/app/layout.tsx` (lines 4–14) with**

```ts
const title = "Murtaza Nipplewala | AI Software Engineer";
const description =
  "AI Software Engineer at Bitcoin Culture Hub · MS CS @ Northeastern · 4× AWS Certified. I build AI-powered applications end to end, from LLM integrations to scalable cloud infrastructure.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};
```

- [ ] **Step 3: Update the two Hero paragraphs in `src/components/Hero.tsx`**

Replace the kicker's text, `Cloud Engineer &middot; ML Engineer &middot; Full-Stack Developer`, with:

```tsx
          AI Software Engineer &middot; Cloud Engineer &middot; DevOps Engineer &middot; Solutions Architect
```

Replace the three text lines inside `<p className="mx-auto mb-10 max-w-xl text-lg text-gray-400">`, from `MS CS @ Northeastern &middot; AWS-certified Cloud Engineer with 2.5 years` through `production-grade ML pipelines.`, with:

```tsx
          AI Software Engineer at Bitcoin Culture Hub &middot; MS CS @ Northeastern
          &middot; 4&times; AWS Certified. I build AI-powered applications end to end
          &mdash; from backend APIs and LLM integrations to the scalable cloud
          infrastructure they run on.
```

- [ ] **Step 4: Replace the entire contents of `src/components/About.tsx`**

```tsx
export default function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-surface/50 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">About</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed">
          <p>
            I&apos;m an AI software engineer who loves building things end to end &mdash;
            from designing backend APIs and AI integrations to deploying them on scalable
            cloud infrastructure. I spent about three years engineering cloud-native
            solutions on AWS and GCP, owning everything from architecture decisions to
            CI/CD pipelines and production deployments.
          </p>
          <p>
            Today I&apos;m an{" "}
            <span className="text-white font-medium">AI Software Engineer at Bitcoin Culture Hub</span>,
            where, as an early team member, I own much of the technical foundation of CLCT,
            an online marketplace, and OptEn, a professional networking platform. Alongside
            that, I&apos;m pursuing my{" "}
            <span className="text-white font-medium">M.S. in Computer Science at Northeastern University</span>.
          </p>
          <p>
            Before that, I spent 2.5 years at{" "}
            <span className="text-white font-medium">Bridge Informatics</span> as a
            Cloud/DevOps Engineer, after graduating{" "}
            <span className="text-white font-medium">summa cum laude</span> from Worcester
            State University with a B.S. in Computer Science and a minor in Business. I hold
            four <span className="text-white font-medium">AWS certifications</span> and have
            worked across the stack &mdash; React, Node, FastAPI, Spring Boot &mdash; whether
            that&apos;s shipping a web app, wiring up an ML model, or automating
            infrastructure. I care most about writing clean, reliable software that actually
            works at scale.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Replace the Contact blurb in `src/components/Contact.tsx` (lines 5–8)**

Replace:

```tsx
      <p className="mb-10 text-gray-400">
        I&apos;m open to co-op opportunities, full-time roles, and interesting collaborations.
        Feel free to reach out.
      </p>
```

with:

```tsx
      <p className="mb-10 text-gray-400">
        Always happy to connect with people building cool things. Feel free to reach out.
      </p>
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no output and exit code 0.

- [ ] **Step 7: Re-run the Step 1 check**

Expected: only `check done`.

---

### Task 5: Whole-page verification

**Files:**
- Create, outside the repo: `${TMPDIR:-/tmp}/verify-content.sh`

**Interfaces:**
- Consumes: the built page at `out/index.html` from Tasks 1–4.
- Produces: the pass/fail result, plus screenshots at 1280px and 390px.

- [ ] **Step 1: Save the verification script**

```bash
#!/usr/bin/env bash
# Checks the static export for refreshed content and live links; exits 1 on any failure.
set -u
html="${1:-out/index.html}"
status=0

must_have=(
  "Bitcoin Culture Hub" "CLCT" "OptEn" "Cohere Rerank 3.5" "AWS Certified Data Engineer"
  "SOC-Claw / Blue Lantern" "Hackathon Winner" "SavVio" "Nuclear Shelter Location by AI-Optimization"
  "Kambaz" "AutoFinder" "Libre Food Pantry" "OP Credit" "Car Insurance Report"
  "Cloud/DevOps Engineer" "10% to 94%" "Solutions Architect" "More Projects"
  "Murtaza Nipplewala | AI Software Engineer" "Always happy to connect"
)
must_not_have=(
  "Cloud Migration" "actively seeking" "co-op opportunities"
  "zero security breaches" "three AWS certifications" "Solution Architect" "2.5 years of professional"
)

for s in "${must_have[@]}"; do
  grep -qF -- "$s" "$html" || { echo "MISSING: $s"; status=1; }
done
for s in "${must_not_have[@]}"; do
  if grep -qF -- "$s" "$html"; then echo "STILL PRESENT: $s"; status=1; fi
done
# Pattern, not the literal number, so this script can live in a public repo.
if grep -qE '\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}' "$html"; then
  echo "PHONE-LIKE NUMBER on the page"; status=1
fi
if grep -qE '&amp;(apos|quot|ndash|mdash|middot|times|rarr);' "$html"; then
  echo "LITERAL ENTITY TEXT: a JS string contains an HTML entity"; status=1
fi

checked=0
while read -r url; do
  checked=$((checked + 1))
  code=$(curl -s -o /dev/null -L --max-time 20 -w '%{http_code}' "$url")
  [ "$code" = "200" ] || { echo "LINK $code: $url"; status=1; }
done < <(grep -oE 'href="https://[^"]+"' "$html" | sed -E 's/^href="//; s/"$//' | grep -vE 'linkedin\.com|fonts\.googleapis\.com' | sort -u)
echo "Checked $checked external links."

[ "$status" -eq 0 ] && echo "All content and link checks passed."
exit "$status"
```

LinkedIn is excluded from the link check because it returns HTTP 999 to automated requests, and its URL is unchanged. The Google Fonts stylesheet is excluded because it isn't a visitor-facing link.

- [ ] **Step 2: Build and run the script**

Run: `npm run build > "${TMPDIR:-/tmp}/portfolio-build.log" 2>&1 && bash "${TMPDIR:-/tmp}/verify-content.sh" out/index.html`
Expected: `Checked 12 external links.` then `All content and link checks passed.`, with exit code 0. The 12 are 11 project links plus the GitHub profile, which the Hero and Contact share.

- [ ] **Step 3: Serve the export**

Run in the background: `python3 -m http.server 4173 --directory out`

- [ ] **Step 4: Check both widths in a browser**

Open `http://localhost:4173/` in the Playwright MCP browser, or a desktop browser's responsive mode.

At 1280×900:
- Take a full-page screenshot.
- Run `document.documentElement.scrollWidth <= window.innerWidth`. Expected: `true`.

At 390×844:
- Take a full-page screenshot.
- Run the same check. Expected: `true`.

Expected in the 1280px screenshot:
- The SOC-Claw card shows the amber badge, a visible red-to-rose tagline, and its GitHub button.
- The Kambaz card shows three link buttons.
- "More Projects" is a two-column grid of four cards. AutoFinder's card has no links.
- The Experience timeline dots sit on the vertical line: cyan for the two roles, blue for the two degrees.
- The four certification cards sit in one row.

Expected in the 390px screenshot:
- Everything is a single column.
- Kambaz's buttons wrap inside the card.
- No text is clipped at the right edge.

- [ ] **Step 5: Clean up**

Stop the server. If the Playwright MCP created a `.playwright-mcp/` folder in the repo, delete it. `git status --short` should list only the modified files under `src/`, the untracked `plans/` folder, and the pre-existing `.gitignore` change.
