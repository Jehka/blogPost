import Link from "next/link";

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
        <Link href="/now">Now</Link>
      </div>
    </nav>
  );
}