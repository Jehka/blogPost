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
  // ── MINERVA ──────────────────────────────────────────────────────
  {
    title: "MINERVA P1 — CDC Heterogeneous FIFO Arbiter & Timestamp Engine",
    description:
      "Clock-domain-crossing arbitration engine in SystemVerilog featuring a round-robin arbiter, heterogeneous FIFO depth management, and per-channel timestamp tagging. Synthesized on Xilinx XC7Z020 (321 LUTs, 365 FFs, 4× RAMB36). Hardware-verified via UART on Zedboard using Vivado 2025.1.",
    tags: ["SystemVerilog", "CDC", "FIFO", "Vivado", "Zedboard", "UART"],
    status: "Complete",
    github: "https://github.com/Jehka/minerva-p1",
  },
  {
    title: "MINERVA P2 — 5-Stage Pipelined RV32I CPU",
    description:
      "32-bit RISC-V CPU in SystemVerilog with a classic 5-stage pipeline (IF/ID/EX/MEM/WB), full data hazard forwarding (EX-EX, MEM-EX), load-use stall detection, and branch flush. Hardware-verified on Zedboard running bubble sort with sorted output confirmed over UART.",
    tags: ["SystemVerilog", "RISC-V", "Pipelining", "Vivado", "Zedboard", "UART"],
    status: "Complete",
    github: "https://github.com/Jehka/minerva-p2",
  },
  {
    title: "MINERVA P3 — Cache Controller & DMA Engine",
    description:
      "Direct-mapped cache controller with hit/miss handling and a scatter-gather DMA engine. Sits between the P2 RISC-V CPU and a slower backing memory. AXI4 master interface, configurable burst length, interrupt-driven completion.",
    tags: ["SystemVerilog", "Cache", "DMA", "AXI4", "RTL Design"],
    status: "In Progress",
    github: "https://github.com/Jehka/minerva-p3",
  },
  {
    title: "MINERVA P4 — AXI Crossbar Interconnect",
    description:
      "Parameterizable AXI crossbar connecting the RISC-V CPU, cache controller, DMA engine, and peripherals. Multi-master multi-slave arbitration with address decoding and full AXI4 handshake compliance.",
    tags: ["SystemVerilog", "AXI4", "Interconnect", "RTL Design"],
    status: "In Progress",
    github: "https://github.com/Jehka/minerva-p4",
  },
  {
    title: "MINERVA P5 — Fault Injection Framework & OpenLane Tapeout",
    description:
      "Hardware fault injection framework targeting pipeline registers of the P2 RISC-V CPU. Single-event upset simulation with error detection and correction circuits. Full RTL-to-GDS flow through OpenLane on the SKY130 PDK.",
    tags: ["SystemVerilog", "Fault Injection", "OpenLane", "SKY130", "RTL-to-GDS"],
    status: "In Progress",
    github: "https://github.com/Jehka/minerva-p5",
  },
  // ── Standalone ───────────────────────────────────────────────────
  {
    title: "AXI-Lite Hardware Accelerator with Firmware Control",
    description:
      "AXI-Lite slave with register file, control FSM, and datapath. Synthesized in Vivado, verified via directed testbenches, driven by bare-metal firmware on FPGA. MMIO address decode; FSM: IDLE→EXEC→DONE; firmware polls status register for completion.",
    tags: ["AXI-Lite", "Verilog", "Vivado", "Firmware", "MMIO"],
    status: "Complete",
    github: "https://github.com/Jehka/axi-lite-accelerator",
  },
  {
    title: "Multichannel Signal Processing System",
    description:
      "3-channel round-robin SPI ADC pipeline with per-channel AXI-Lite accelerators for FIR filtering. On-fabric DSP algorithms for edge computing without host dependency. Arch: Arbitrated SPI master → dedicated FIR blocks → central DSP core via AXI-Lite fabric.",
    tags: ["FPGA", "SPI", "FIR", "AXI-Lite", "DSP"],
    status: "In Progress",
    github: "https://github.com/Jehka/multichannel-dsp",
  },
  {
    title: "FPGA-Based Optical Sensor Acquisition System",
    description:
      "Mixed-signal FPGA pipeline: SPI ADC master, synchronous FIFO, UART TX in Verilog RTL. Deterministic 1 kHz streaming. 16-deep FIFO decouples acquisition/UART domains. CDC via gray-coded pointers, verified with ModelSim directed testbench.",
    tags: ["FPGA", "Verilog", "SPI", "UART", "CDC", "ModelSim"],
    status: "Complete",
    github: "https://github.com/Jehka/optical-sensor-fpga",
  },
];

const skills = [
  { label: "Hardware & HDL", items: ["Verilog", "VHDL", "RTL Design", "FSMs", "Pipelining", "Timing Analysis", "CDC", "AXI-Lite", "MMIO"] },
  { label: "SoC & Verification", items: ["SystemVerilog", "Testbenches", "Directed Simulation", "ModelSim", "Functional Verification"] },
  { label: "Embedded & Firmware", items: ["Embedded C", "Bare-Metal", "FreeRTOS", "SPI/UART Protocols"] },
  { label: "EDA & Tools", items: ["Vivado", "ModelSim", "MATLAB", "Altium", "Python", "Git", "Linux CLI"] },
];

const certifications = [
  "ISWDP Samsung / IISc / Synopsys SARA",
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
            semiconductor roles specialising RTL, and Physical design
            FPGA design engineering.
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
            <a href="/jehkaran-resume.pdf" target="_blank" rel="noopener noreferrer" className="portfolio-link portfolio-link--accent">
              <span className="portfolio-link-icon">↓</span> Download Resume (PDF)
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}