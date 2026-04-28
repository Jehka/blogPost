import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-brand">Theology Subtext</span>
          <span className="footer-copy">&copy; {new Date().getFullYear()} Oshio</span>
        </div>
        <nav className="footer-nav">
          <Link href="/">Posts</Link>
          <Link href="/about">About</Link>
          <Link href="/now">Now</Link>
          <a href="/feed.xml" target="_blank" rel="noopener noreferrer">RSS</a>
          <a href="https://github.com/Jehka" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
