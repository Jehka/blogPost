import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hardware and software projects by Jehkaran Singh.",
};

const projects = [
  {
    title: "Multichannel FPGA Signal Acquisition System",
    description:
      "Full RTL pipeline on Zedboard: MCP3204 SPI ADC → channel mux FSM → per-channel FIR filtering → UART framer → packet FIFO → UART TX. Python monitor and MATLAB analysis on the PC side.",
    tags: ["FPGA", "Verilog", "SPI", "UART", "DSP"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
  {
    title: "RISC-V CPU with AES ISA Extension",
    description:
      "Custom RISC-V core with extended instruction set for AES operations. Designed for hardware-accelerated cryptographic workloads.",
    tags: ["RISC-V", "Verilog", "CPU Design", "AES"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
  {
    title: "AXI-Lite Hardware Accelerator",
    description:
      "AXI-Lite compliant hardware accelerator with C firmware driver. UVM testbench for verification. Cadence Innovus PnR on FreePDK45.",
    tags: ["AXI", "UVM", "Cadence", "Verification"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
  {
    title: "Elevator FSM — FCFS vs SSTF",
    description:
      "RTL implementation comparing First Come First Served and Shortest Seek Time First scheduling algorithms for elevator control.",
    tags: ["FSM", "Verilog", "Algorithms"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
  {
    title: "CMOS Bandgap Reference",
    description:
      "Temperature-independent voltage reference circuit using bipolar junction transistors in CMOS process.",
    tags: ["Analog", "CMOS", "Circuit Design"],
    status: "Complete",
    github: "https://github.com/Jehka",
  },
  {
    title: "Scatter-Gather DMA Engine",
    description:
      "High-throughput DMA engine with scatter-gather capability. AXI4 master interface, configurable burst length, interrupt-driven completion.",
    tags: ["DMA", "AXI4", "RTL Design"],
    status: "In Progress",
    github: "https://github.com/Jehka",
  },
];

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <div className="projects-content">
        <header className="projects-header">
          <p className="now-eyebrow">Hardware & Software</p>
          <h1 className="projects-title">Projects</h1>
          <p className="projects-lead">
            RTL design, FPGA systems, and embedded pipelines.
            All projects are open source.
          </p>
          <div className="tech-nav">
            <Link href="/portfolio" className="tech-nav-link">← Portfolio</Link>
            <Link href="/technical" className="tech-nav-link">Technical Writing →</Link>
          </div>
        </header>

        <div className="projects-grid">
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
      </div>
    </main>
  );
}