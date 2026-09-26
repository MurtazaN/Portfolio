const education = [
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

export default function Education() {
  return (
    <section id="education" className="border-t border-white/5 bg-surface/50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
          Education
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu) => (
            <div key={edu.school} className="rounded-xl border border-white/10 bg-surface p-6 lg:p-8">
              <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
              <p className="text-sm font-medium text-primary">{edu.school}</p>
              <span className="mt-3 mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                {`${edu.period} · ${edu.location}`}
              </span>
              <p className="text-sm text-gray-400">{edu.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
