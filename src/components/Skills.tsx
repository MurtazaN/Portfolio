const skillCategories = [
  {
    title: "ML / AI",
    skills: ["PyTorch", "scikit-learn", "XGBoost", "pandas", "NumPy", "SciPy", "Spark"],
  },
  {
    title: "LLM / NLP",
    skills: ["LangChain", "Hugging Face", "NeMo Guardrails", "Vertex AI", "OpenAI API"],
  },
  {
    title: "MLOps",
    skills: ["MLflow", "DVC", "Apache Airflow", "Evidently AI", "Great Expectations", "Docker"],
  },
  {
    title: "Cloud Platforms",
    skills: ["AWS (ECS, EKS, EMR, EC2, S3, IAM, VPC)", "GCP (Cloud Run, Vertex AI, BigQuery)"],
  },
  {
    title: "IaC & Automation",
    skills: ["Terraform", "Ansible", "CloudFormation", "GitHub Actions", "AWS CodePipeline"],
  },
  {
    title: "Monitoring",
    skills: ["Prometheus", "Grafana", "CloudWatch", "GCP Cloud Logging"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "pgvector", "Pinecone", "MongoDB"],
  },
  {
    title: "Languages",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "Bash", "R", "YAML"],
  },
];

const certifications = [
  { name: "AWS DevOps Engineer - Professional", color: "from-orange-500 to-amber-400" },
  { name: "AWS Solutions Architect", color: "from-blue-500 to-cyan-400" },
  { name: "AWS Developer", color: "from-emerald-500 to-green-400" },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
        Skills & Certifications
      </h2>
      <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
        Technologies and tools I use to design, build, and deploy production systems.
      </p>

      {/* Certifications */}
      <div className="mb-16 grid gap-4 sm:grid-cols-3">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface p-6 text-center transition-all hover:border-white/20"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-5 transition-opacity group-hover:opacity-10`} />
            <div className="relative">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/5">
                <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
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
      </div>
    </section>
  );
}
