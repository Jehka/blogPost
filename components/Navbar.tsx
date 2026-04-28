import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link href="/" className="nav-title">
          Theology Subtext
        </Link>
      </div>

      <div className="nav-right">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/now">Now</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}