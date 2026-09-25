export default function About() {
  return (
    <section id="about" className="border-t border-white/5 bg-surface/50 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">About</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed">
          <p>
            I graduated <span className="text-white font-medium">Summa cum laude</span> from
            Worcester State University with a B.S. in Computer Science and a minor in Business.
            After graduating, I spent 2.5 years at{" "}
            <span className="text-white font-medium">Bridge Informatics</span> as a Cloud
            Engineer and Solutions Architect, where I designed scalable AWS infrastructure,
            led on-prem to cloud migrations, and maintained a zero-breach security record.
          </p>
          <p>
            I&apos;m currently pursuing my{" "}
            <span className="text-white font-medium">M.S. in Computer Science at Northeastern University</span>,
            focusing on machine learning, AI, and MLOps. My work bridges the gap between
            building intelligent ML systems and deploying them reliably at scale — from
            training XGBoost classifiers to orchestrating Airflow pipelines on GCP.
          </p>
          <p>
            I hold three{" "}
            <span className="text-white font-medium">AWS certifications</span>{" "}
            (DevOps Engineer Pro, Solutions Architect, Developer) and I&apos;m actively
            seeking opportunities where I can apply both my cloud infrastructure expertise
            and my growing ML/AI skill set.
          </p>
        </div>
      </div>
    </section>
  );
}
