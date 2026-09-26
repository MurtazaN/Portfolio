const skillCategories = [
  {
    title: "AI & LLMOps",
    skills: [
      "OpenAI", "AWS Bedrock", "Google AI Studio", "Azure AI Foundry", "LangChain",
      "LangGraph", "LangSmith", "LlamaIndex", "HF Transformers", "Ollama", "vLLM",
      "NeMo Guardrails",
    ],
  },
  {
    title: "ML & MLOps",
    skills: [
      "PyTorch", "scikit-learn", "NumPy", "GeoPandas", "MLflow", "Kubeflow",
      "Apache Airflow", "DVC", "Great Expectations", "Evidently AI",
    ],
  },
  {
    title: "Data & DBs",
    skills: [
      "Apache Spark", "Apache Kafka", "pandas", "AWS Glue", "Redshift", "Snowflake",
      "PostgreSQL (pgvector)", "FAISS", "MySQL", "MongoDB", "DynamoDB", "Embeddings",
    ],
  },
  {
    title: "Cloud Platforms",
    skills: [
      "AWS (ECS, EKS, RDS, S3, DMS, IAM, VPC, Cognito, etc.)",
      "GCP (Cloud Run, Cloud Build, Cloud Storage, Cloud SQL, etc.)",
      "Azure (Container Apps, Azure Pipelines, Blob Storage, Azure SQL)",
      "Linode", "Cloudflare",
    ],
  },
  {
    title: "Infrastructure & CI/CD",
    skills: [
      "Kubernetes", "Terraform", "Pulumi", "CloudFormation", "Ansible", "Docker",
      "Podman", "GitHub Actions",
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
    title: "Languages & Frameworks",
    skills: [
      "Python", "Java", "SQL", "TypeScript", "Bash", "FastAPI", "React", "Node.js",
      "Spring Boot",
    ],
  },
];

const certifications = [
  { name: "AWS Certified DevOps Engineer – Professional", badge: "/aws-certified-devops-engineer-professional.png", color: "from-orange-500 to-amber-400" },
  { name: "AWS Certified Solutions Architect – Associate", badge: "/aws-certified-solutions-architect-associate.png", color: "from-blue-500 to-cyan-400" },
  { name: "AWS Certified Developer – Associate", badge: "/aws-certified-developer-associate.png", color: "from-emerald-500 to-green-400" },
  { name: "AWS Certified Data Engineer – Associate", badge: "/badge-aws-certified-data-engineer-associate.png", color: "from-violet-500 to-purple-400" },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
        Skills & Certifications
      </h2>

      {/* Certifications */}
      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface p-6 text-center transition-all hover:border-white/20"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-5 transition-opacity group-hover:opacity-10`} />
            <div className="relative">
              <img
                src={cert.badge}
                alt={`${cert.name} badge`}
                width={600}
                height={600}
                className="mx-auto mb-4 h-28 w-28 object-contain"
              />
              <p className="text-sm font-semibold text-white">{cert.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="rounded-xl border border-white/10 bg-surface p-5"
          >
            <h3 className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 p-5 text-center">
          <p className="text-sm font-semibold text-white">&hellip;and always learning</p>
          <p className="mt-1 text-xs text-balance text-gray-400">
            Happy to pick up whatever the next problem needs.
          </p>
        </div>
      </div>
    </section>
  );
}
