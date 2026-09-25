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
