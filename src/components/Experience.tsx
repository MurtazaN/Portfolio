type Role = {
  title: string;
  org: string;
  period: string;
  location: string;
  summary?: string;
  bullets: string[];
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


function TimelineItem({
  title,
  org,
  meta,
  children,
}: {
  title: string;
  org: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-accent bg-[#030712]"
      />
      <div className="rounded-xl border border-white/10 bg-surface p-6 lg:p-8">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm font-medium text-accent">
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
        <h2 className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
          Experience
        </h2>

        <div className="relative space-y-12 border-l border-white/10 pl-8">
          {roles.map((role) => (
            <TimelineItem
              key={role.org}
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
        </div>
      </div>
    </section>
  );
}
