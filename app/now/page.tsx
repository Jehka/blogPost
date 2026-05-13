export const metadata = {
  title: "Now · Theology Subtext",
  description: "What i am working on, reading, and thinking about right now.",
};

export default function NowPage() {
  return (
    <main className="now-page">
      <div className="now-content">
        <div className="now-header">
          <p className="now-eyebrow">Last updated April 2026</p>
          <h1 className="now-title">Now</h1>
          <p className="now-lead">
            A snapshot of what I&apos;m doing, reading, and thinking about.
            Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer">/now</a>.
          </p>
        </div>

        <section className="now-section">
          <h2>Reading</h2>
          <p>
            Bukowski's collection of 100 poems, Orwell's 1984. Dabble in some substack these days.
            Most of the time goes into assimilating information from short term content hihi.
          </p>
        </section>

        <section className="now-section">
          <h2>Thinking about</h2>
          <p>
            The relationship between constraint and meaning - what surrounds us, what suffocates us,
           what ship we embark, what do we abandon, what do we live for the sake of it, what do
           we dislike because of its surface appearance.
          </p>
        </section>

        <section className="now-section">
          <h2>Studying</h2>
          <p>
            Final year of B.Tech Electronics and Computer Engineering at UPES Dehradun starts soon. 
          </p>
        </section>

        <p className="now-footer-note">
          This is a <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">now page</a>.
          Update it whenever life shifts.
        </p>
      </div>
    </main>
  );
}
