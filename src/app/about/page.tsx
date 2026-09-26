import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Murtaza Nipplewala",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="mx-auto max-w-5xl px-6 py-24">
          <h1 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">About Me</h1>
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
            <img
              src="/profile_pic.jpeg"
              alt="Murtaza Nipplewala"
              width={400}
              height={400}
              className="h-48 w-48 flex-shrink-0 rounded-2xl border border-white/10 object-cover md:h-64 md:w-64"
            />
            <div className="space-y-4 leading-relaxed text-gray-400">
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
        <Education />
      </main>
      <Footer />
    </>
  );
}
