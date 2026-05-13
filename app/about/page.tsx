import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Who writes Theology Subtext, and why.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-content">

        <header className="about-header">
          {/* To add your photo:
              1. Drop your image into /public/oshio.jpg
              2. Remove the about-avatar div below
              3. Uncomment the Image tag */}
          { <Image
            src="/oshio.JPEG"
            alt="Jehkaran"
            width={72}
            height={72}
            className="about-photo"
          /> }
          <div className="about-avatar">J</div>
          <div>
            <h1 className="about-title">Jehkaran</h1>
            <p className="about-handle">Theology Subtext</p>
          </div>
        </header>

        <section className="about-section">
          <p>
            As Guru Nanak Dev Ji said that Sikh is a person that should be
            perpetually evolving, learning - theologically, logically,
            emotionally, pragmatically and most importantly humanly.
          </p>
          <p>
            This blog is where i will often ponder on what is meaning
            of life and what actually lives in the subtext of things,
            now this could be me in a poem, a breakdown or even an article.
          </p>
        </section>

        <section className="about-section">
          <h2>What I&apos;m doing</h2>
          <p>
            Third year of B.Tech at UPES Dehradun. Currently working on getting
            my fundamentals stable.
          </p>
        </section>

        <section className="about-section">
          <h2>The name</h2>
          <p>
            &ldquo;Subtext&rdquo; because nothing is only what it appears to
            be. What appears to be on the surface, can often be misleading.
            In a world where clarity is of the utmost importance, &ldquo;subtext&rdquo;
            helps me (and perhaps even you) gain some of that clarity.
          </p>
        </section>

        <section className="about-section">
          <h2>Contact</h2>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/Jehka"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Jehka
            </a>
            . For everything else, find me where the writing finds you.
          </p>
        </section>

        <div className="about-links">
          <Link href="/start-here" className="about-cta">Start reading →</Link>
          <Link href="/" className="about-cta-ghost">All posts</Link>
          <Link href="/now" className="about-cta-ghost">What I&apos;m doing now</Link>
        </div>

      </div>
    </main>
  );
}