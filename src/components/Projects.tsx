const projects = [
  {
    id: "savvio",
    title: "SavVio",
    tagline: "AI Financial Advocate",
    description:
      "An AI-driven financial advocacy tool that evaluates purchase decisions using a hybrid architecture combining LLM-based context understanding with a deterministic financial logic engine for affordability analysis.",
    problem:
      "Consumers often make impulsive purchases without understanding the true financial impact. Existing budgeting apps track spending but don't proactively evaluate whether a purchase is wise. SavVio bridges this gap by combining AI reasoning with deterministic financial rules to deliver personalized Buy/Wait/Avoid recommendations.",
    highlights: [
      "Hybrid architecture: LLM + deterministic financial logic engine — not everything needs an LLM",
      "RAG pipeline with LangChain + pgvector for context-aware product utility analysis via GPT-4.1, Claude 4.5, and Gemini 3",
      "XGBoost classifier + logistic regression for purchase recommendations with MLflow experiment tracking",
      "Apache Airflow orchestrated data ingestion & model training pipelines",
      "Data quality validation with Great Expectations, drift monitoring with Evidently AI",
      "NVIDIA NeMo Guardrails as FastAPI middleware for safe, compliant financial guidance",
      "Deployed on GCP Cloud Run with CI/CD via GitHub Actions + Cloud Build",
    ],
    techStack: [
      "Python", "LangChain", "XGBoost", "scikit-learn", "FastAPI",
      "GCP Cloud Run", "Apache Airflow", "MLflow", "pgvector",
      "Docker", "GitHub Actions", "Evidently AI", "NeMo Guardrails",
    ],
    writeupAngle: "Why I didn't just use an LLM for everything",
    github: "https://github.com/MurtazaN",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    tagline: "On-Prem to AWS Case Study",
    description:
      "Led migration of on-premises applications to AWS at Bridge Informatics, designing scalable architecture with container orchestration and infrastructure as code — reducing client costs by 30%.",
    problem:
      "Clients were running legacy on-premises infrastructure with high maintenance costs, limited scalability, and no automated deployment pipeline. Downtime during updates was common, and security posture was difficult to maintain consistently across environments.",
    highlights: [
      "Designed scalable AWS architecture with ECS/EKS for container orchestration",
      "Configured VPCs, IAM policies, and Application Load Balancers for secure, high-performance networking",
      "Built CI/CD pipelines with AWS CodePipeline and GitHub Actions for zero-downtime deployments",
      "Infrastructure as Code with Terraform, CloudFormation, and Ansible — minimizing configuration drift",
      "CloudWatch + SNS monitoring stack for centralized alerting and incident response",
      "Zero security breaches over a two-year period",
      "Reduced client expenditure by 30%, cut production timelines by 10%, increased app speed by 20%",
    ],
    techStack: [
      "AWS", "ECS", "EKS", "Terraform", "Ansible", "CloudFormation",
      "GitHub Actions", "CodePipeline", "CloudWatch", "Docker", "IAM", "VPC",
    ],
    writeupAngle: "Migrating on-prem to AWS: reducing costs by 30%",
    color: "from-orange-500 to-amber-400",
  },
  {
    id: "nuclear-shelter",
    title: "Nuclear Shelter Siting Optimizer",
    tagline: "Genetic Algorithm for NP-Hard Optimization",
    description:
      "A Genetic Algorithm solution for the Uncapacitated Facility Location Problem (UFLP), optimizing nuclear shelter placement across ~30,000 US zip codes for maximum population coverage.",
    problem:
      "Placing emergency shelters optimally is an NP-hard problem — brute force is intractable at scale. This project uses evolutionary computation to find near-optimal shelter placements that maximize population coverage while respecting blast zone safety constraints and infrastructure accessibility.",
    highlights: [
      "Genetic Algorithm solving an NP-hard UFLP across ~30,000 US zip codes",
      "Multi-objective fitness: population coverage, 15-mile blast zone exclusion, infrastructure proximity",
      "Geospatial processing with GeoPandas + OSMnx for road network & power grid analysis",
      "US Census Bureau, nuclear target databases, and OpenStreetMap data integration",
      "Tournament selection, uniform crossover, and bit-flip mutation operators",
      "Benchmarked against greedy baseline heuristic to validate GA effectiveness",
    ],
    techStack: [
      "Python", "GeoPandas", "NumPy", "OSMnx", "Matplotlib", "SciPy",
    ],
    writeupAngle: "Using evolutionary computation for real-world facility placement",
    github: "https://github.com/MurtazaN",
    color: "from-emerald-500 to-green-400",
  },
  {
    id: "kambaz",
    title: "Kambaz",
    tagline: "Learning Management System",
    description:
      "A full-stack learning management system built with React and Node.js, featuring role-based access control for Admins, Professors, and Students with a complete course management workflow.",
    problem:
      "Educational institutions need flexible LMS platforms that handle distinct user workflows — admins managing users, professors building courses, and students consuming content. Kambaz demonstrates end-to-end web development with complex authorization logic and a split deployment architecture.",
    highlights: [
      "Role-based access control architecture supporting Admin, Professor, and Student personas",
      "RESTful API design with Node.js/Express backend and MongoDB data layer",
      "React frontend with dynamic routing, state management, and responsive UI",
      "Split deployment: Vercel (frontend) + Render (backend) with CORS configuration",
      "Course modules, assignments, quizzes, and grade management workflows",
      "Production considerations: environment-based configs, error handling, and security headers",
    ],
    techStack: [
      "React", "Node.js", "Express", "MongoDB", "TypeScript",
      "Vercel", "Render", "REST API",
    ],
    writeupAngle: "Designing for three different user types",
    github: "https://github.com/MurtazaN",
    color: "from-violet-500 to-purple-400",
  },
];

function TechBadge({ name }: { name: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
      {name}
    </span>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all hover:border-white/20">
      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

      <div className="p-8 lg:p-10">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className={`bg-gradient-to-r ${project.color} bg-clip-text text-sm font-medium text-transparent`}>
              {project.tagline}
            </p>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-400 transition-colors hover:border-white/30 hover:text-white"
            >
              View on GitHub
            </a>
          )}
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
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
