import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio — Jehkaran Singh",
  description: "Electronics and Computer Engineering student. RTL design, FPGA systems, digital verification.",
};

export const revalidate = 60;

const projects = [
  {
    title: "RISC-V CPU with Custom AES ISA Extension",
    description:
      "Pipelined RV32I in Verilog with a custom AES instruction — SubBytes/ShiftRows/MixColumns datapath in the execute stage. 5-stage pipeline with hazard detection and forwarding unit. AES in R-type format with dedicated combinational crypto datapath bypassing the ALU. UART plaintext-to-ciphertext demo on FPGA.",
    tags: ["Verilog", "RISC-V", "AES", "FPGA", "Pipelining"],
    status: "In Progress",
    github: "https://github.com/Jehka",
  },
  {
    title: "AXI-Lite Hardware Accelerator with Firmware Control",
    description:
      "AXI-Lite slave with register file, control FSM, and datapath. Synthesized in Vivado, verified via directed testbenches, driven by bare-metal firmware on FPGA. MMIO address decode; FSM: IDLE→EXEC→DONE; firmware polls status register for completion.",
    tags: ["AXI-Lite", "Verilog", "Vivado", "Firmware", "MMIO"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
  {
    title: "Multichannel Signal Processing System",
    description:
      "3-channel round-robin SPI ADC pipeline with per-channel AXI-Lite accelerators for FIR filtering. On-fabric DSP algorithms for edge computing without host dependency. Arch: Arbitrated SPI master → dedicated FIR blocks → central DSP core via AXI-Lite fabric.",
    tags: ["FPGA", "SPI", "FIR", "AXI-Lite", "DSP"],
    status: "In Progress",
    github: "https://github.com/Jehka",
  },
  {
    title: "FPGA-Based Optical Sensor Acquisition System",
    description:
      "Mixed-signal FPGA pipeline: SPI ADC master, synchronous FIFO, UART TX in Verilog RTL. Deterministic 1 kHz streaming. 16-deep FIFO decouples acquisition/UART domains. CDC via gray-coded pointers, verified with ModelSim directed testbench.",
    tags: ["FPGA", "Verilog", "SPI", "UART", "CDC", "ModelSim"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
];

const skills = [
  { label: "Hardware & HDL", items: ["Verilog", "VHDL", "RTL Design", "FSMs", "Pipelining", "Timing Analysis", "CDC", "AXI-Lite", "MMIO"] },
  { label: "SoC & Verification", items: ["SystemVerilog", "Testbenches", "Directed Simulation", "ModelSim", "Functional Verification"] },
  { label: "Embedded & Firmware", items: ["Embedded C", "Bare-Metal", "FreeRTOS", "SPI/UART Protocols"] },
  { label: "EDA & Tools", items: ["Vivado", "ModelSim", "MATLAB", "Altium", "Python", "Git", "Linux CLI"] },
];

const certifications = [
  "ISWDP Level 1 — Samsung / IISc / Synopsys SARA (88%)",
  "Control Systems Fundamentals — Siemens",
  "ERP Systems Training — Shoppers Drug Mart",
];

export default async function PortfolioPage() {
  const technicalPosts = await getPosts("Technical");

  return (
    <main className="portfolio-page">
      <div className="portfolio-content">

        {/* Hero */}
        <header className="portfolio-hero">
          <Image
  src="/oshio.JPEG"
  alt="Jehkaran"
  width={64}
  height={64}
  className="about-photo"
  priority
/>
          <div>
            <h1 className="portfolio-name">Jehkaran Singh</h1>
            <p className="portfolio-role">
              B.Tech Electronics & Computer Engineering · UPES Dehradun · CGPA 8.7
            </p>
            <p className="portfolio-tagline">
              RTL Design · Digital Verification · FPGA Systems
            </p>
          </div>
        </header>

        {/* Bio */}
        <section className="portfolio-section">
          <p className="sb-label">About</p>
          <p className="portfolio-bio">
            An inquisitive learner who observes too closely when it comes to
            systems — any system. Prior diploma in Electronics Engineering
            Technology from Seneca College, Canada. Targeting VLSI and
            semiconductor roles at Qualcomm, AMD, and Micron.
          </p>
        </section>

        {/* Skills */}
        <section className="portfolio-section">
          <p className="sb-label">Skills</p>
          <div className="portfolio-skill-groups">
            {skills.map((group) => (
              <div key={group.label} className="portfolio-skill-group">
                <p className="portfolio-skill-group-label">{group.label}</p>
                <div className="portfolio-skills">
                  {group.items.map((s) => (
                    <span key={s} className="portfolio-skill">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="portfolio-section">
          <p className="sb-label">Projects</p>
          <div className="projects-grid" style={{ marginTop: 12 }}>
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <div className="project-card-header">
                  <h2 className="project-title">{project.title}</h2>
                  <span className={`project-status ${project.status === "In Progress" ? "project-status--active" : ""}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-footer">
                  <div className="project-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="meta-tag">{t}</span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="portfolio-section">
          <p className="sb-label">Certifications</p>
          <ul className="portfolio-certs">
            {certifications.map((c) => (
              <li key={c} className="portfolio-cert-item">{c}</li>
            ))}
          </ul>
        </section>

        {/* Technical writing */}
        {technicalPosts.length > 0 && (
          <section className="portfolio-section">
            <p className="sb-label">Technical Writing</p>
            <div className="portfolio-writing-list">
              {technicalPosts.slice(0, 5).map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="portfolio-writing-item">
                  <span className="portfolio-writing-title">{post.title}</span>
                  {post.date && <span className="portfolio-writing-date">{post.date}</span>}
                </Link>
              ))}
            </div>
            {technicalPosts.length > 5 && (
              <Link href="/technical" className="portfolio-see-all">See all →</Link>
            )}
          </section>
        )}

        {/* Links */}
        <section className="portfolio-section">
          <p className="sb-label">Links</p>
          <div className="portfolio-links">
            <a href="https://github.com/Jehka" target="_blank" rel="noopener noreferrer" className="portfolio-link">
              <span className="portfolio-link-icon">⌥</span> GitHub — Jehka
            </a>
            <a href="mailto:imjehkaransingh@gmail.com" className="portfolio-link">
              <span className="portfolio-link-icon">✉</span> imjehkaransingh@gmail.com
            </a>
            <Link href="/technical" className="portfolio-link">
              <span className="portfolio-link-icon">◎</span> Technical Writing
            </Link>
            <Link href="/" className="portfolio-link">
              <span className="portfolio-link-icon">✦</span> Blog — Theology Subtext
            </Link>
            {/* Uncomment after adding resume.pdf to /public */}
            {<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="portfolio-link portfolio-link--accent">
              <span className="portfolio-link-icon">↓</span> Download Resume (PDF)
            </a>}
          </div>
        </section>

      </div>
    </main>
  );
}