import type { Metadata } from "next";
import Link from "next/link";
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
                Hi, I&apos;m Murtaza. I&apos;m an AI software engineer who enjoys solving
                problems with technology, especially when it makes someone&apos;s life a
                little better.
              </p>
              <p>
                That&apos;s why <span className="font-medium text-white">SavVio</span> is the
                project I&apos;m proudest of. Most apps want you to buy more; SavVio does the
                opposite. Before you check out, it tells you whether to buy, wait or walk
                away. Your bank account can thank us later.
              </p>
              <p>
                I&apos;m an experimenter at heart: new tools, new cuisines, new cities.
                I&apos;m the friend who plans every trip around the food, and I used to play
                football (the kind where you actually use your feet).
              </p>
              <p>
                If you&apos;re building something that genuinely helps people, or you just
                have a great restaurant recommendation, I&apos;d love to hear from you.{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent transition-colors hover:text-white"
                >
                  Say hi &rarr;
                </Link>
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
