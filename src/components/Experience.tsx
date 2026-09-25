export default function Experience() {
  return (
    <section id="experience" className="border-t border-white/5 bg-surface/50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          Experience
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-gray-400">
          2.5 years of professional cloud engineering in production environments.
        </p>

        <div className="relative border-l border-white/10 pl-8">
          {/* Bridge Informatics */}
          <div className="relative mb-12">
            <div className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-accent bg-[#030712]" />
            <div className="rounded-xl border border-white/10 bg-surface p-6 lg:p-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Cloud Engineer / Solutions Architect</h3>
                  <p className="text-sm font-medium text-accent">Bridge Informatics</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                  July 2022 &ndash; December 2024 &middot; Cambridge, MA
                </span>
              </div>
              <ul className="space-y-3 text-sm leading-relaxed text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  Designed and implemented scalable cloud architecture on AWS, leveraging ECS/EKS for container orchestration and CloudWatch for centralized monitoring — reducing client expenditure by 30%.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  Led migration of on-premises applications to AWS, configuring VPCs, IAM policies, and ALB for improved performance and reduced maintenance costs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  Built CI/CD pipelines using AWS CodePipeline and GitHub Actions, enabling automated testing, builds, and zero-downtime deployments across multiple environments.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  Reduced production timeline by 10% and increased application speed by 20% through cross-functional collaboration and streamlined deployment workflows.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  Achieved zero security breaches over a two-year period by enforcing DevOps and cloud security standards with CloudWatch + SNS alerting.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  Developed IaC using Terraform, CloudFormation, and Ansible — automating provisioning and minimizing configuration drift.
                </li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="relative mb-12">
            <div className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-primary bg-[#030712]" />
            <div className="rounded-xl border border-white/10 bg-surface p-6 lg:p-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">M.S. Computer Science</h3>
                  <p className="text-sm font-medium text-primary">Northeastern University</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                  Jan 2025 &ndash; May 2027 &middot; Boston, MA
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Coursework: Foundations of AI, Machine Learning, MLOps, DBMS, Algorithms, PDP
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-primary bg-[#030712]" />
            <div className="rounded-xl border border-white/10 bg-surface p-6 lg:p-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">B.S. Computer Science</h3>
                  <p className="text-sm font-medium text-primary">Worcester State University</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                  Sept 2018 &ndash; May 2022 &middot; Worcester, MA
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Minor in Business &middot; Summa cum laude &middot; Dean&apos;s List &middot; Presidential Honor
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
