import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

const projects = [
  {
    id: "stockroom",
    name: "Stockroom",
    category: "FULL-STACK WEB APP",
    date: "2026 — ONGOING",
    status: "IN PROGRESS",
    caption: "INVENTORY, IN FOCUS",
    number: "PROJECT / 001",
    summary:
      "An inventory management app in the making. Starting with a secure API, now growing into a clear dashboard for products, stock levels, and the things that need attention.",
    details:
      "Stockroom brings everyday inventory tasks into one clear view, making it easier to understand what is in stock and what needs attention.",
    highlights: [
      "Browse and manage product records",
      "See total stock at a glance",
      "Spot low-stock items from the dashboard",
    ],
    technologies: ["React", "TypeScript", "Spring Boot", "MySQL", "JWT"],
    repository:
      "https://github.com/Soumya1869/Inventory-Management-System",
    visual: "stockroom",
  },
  {
    id: "teamspace",
    name: "TeamSpace",
    category: "TEAM PROJECT MANAGEMENT",
    date: "2026",
    status: "TEAM PROJECT",
    caption: "GOOD TEAMS, IN SYNC",
    number: "PROJECT / 002",
    summary:
      "A collaboration platform for teams to organize work across workspaces, projects, and Kanban boards. Includes task assignments, comments, role-based membership, and account security, with a demo mode and a Spring Boot API.",
    details:
      "TeamSpace gives a team a shared place to plan work, track progress, and keep project conversations close to the tasks they belong to.",
    highlights: [
      "Organize work across workspaces and projects",
      "Move tasks through Kanban boards with assignments and comments",
      "Manage team membership with roles and account security",
      "Explore the app with a demo mode",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "TanStack",
      "Spring Boot",
      "PostgreSQL",
      "JWT",
    ],
    repository: "https://github.com/Soumya1869/team-flow-haven-24",
    visual: "teamspace",
  },
];

function StockroomArtwork() {
  return (
    <>
      <div className="project-visual-glow" />
      <div className="project-product">
        <span className="product-cube">▧</span>
        <span>STOCKROOM</span>
        <span className="product-arrow">↗</span>
      </div>
    </>
  );
}

function TeamSpaceArtwork() {
  return (
    <div className="team-board">
      <div className="team-board-top">
        <span className="team-brand"><i>t.</i> teamspace</span>
        <span className="team-avatar-stack"><i>S</i><i>P</i><i>+</i></span>
      </div>
      <div className="team-board-title">
        <small>PRODUCT TEAM / THIS WEEK</small>
        <strong>Make room for<br /><em>good work.</em></strong>
      </div>
      <div className="board-columns">
        <div><b>TO DO <i>2</i></b><span>Plan launch</span><span>Review notes</span></div>
        <div><b>IN PROGRESS <i>1</i></b><span className="board-highlight">Build the thing</span></div>
        <div><b>DONE <i>3</i></b><span>Kickoff ✳</span></div>
      </div>
    </div>
  );
}

function ProjectDetailsDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      onClose={onClose}
    >
      {project && (
        <div className="project-dialog-panel">
          <div className="project-dialog-topline">
            <span className="eyebrow"><span className="status-dot" /> PROJECT NOTES</span>
            <button
              className="project-dialog-close"
              type="button"
              aria-label="Close project details"
              onClick={() => dialogRef.current?.close()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <p className="project-dialog-category">{project.category} <span>·</span> {project.date}</p>
          <h2 id="project-dialog-title">{project.name}<span>.</span></h2>
          <p className="project-dialog-summary">{project.details}</p>
          <div className="project-dialog-content">
            <section aria-labelledby="project-highlights-title">
              <h3 id="project-highlights-title">A closer look</h3>
              <p className="project-dialog-intro">{project.summary}</p>
              <ul className="project-highlight-list">
                {project.highlights.map((highlight) => (
                  <li key={highlight}><span aria-hidden="true">✳</span>{highlight}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="project-stack-title">
              <h3 id="project-stack-title">Made with</h3>
              <div className="project-dialog-tags">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </section>
          </div>
          <a className="button button-primary project-dialog-link" href={project.repository} target="_blank" rel="noreferrer">
            Visit the repository <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </dialog>
  );
}

function ProjectCard({ project, onOpen }) {
  const isTeamSpace = project.visual === "teamspace";
  return (
    <article className={`project-card reveal${isTeamSpace ? " project-card-alt" : ""}`}>
      <div className={`project-visual${isTeamSpace ? " project-visual-team" : ""}`}>
        <div className="project-visual-label"><span className="status-dot" /> {project.status}</div>
        {isTeamSpace ? <TeamSpaceArtwork /> : <StockroomArtwork />}
        <div className="project-visual-bottom"><span>{project.caption}</span><span>{project.number}</span></div>
      </div>
      <div className="project-details">
        <div className="project-meta"><span>{project.category}</span><span>{project.date}</span></div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="project-card-actions">
          <button
            className="project-link project-detail-trigger"
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
          >
            Explore project details <span aria-hidden="true">↗</span>
          </button>
          <a className="project-repo-link" href={project.repository} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectsApp() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");
    const year = document.querySelector("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    const toggleMenu = () => {
      const expanded = menuButton?.getAttribute("aria-expanded") === "true";
      menuButton?.setAttribute("aria-expanded", String(!expanded));
      menuButton?.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      navigation?.classList.toggle("is-open", !expanded);
    };
    const closeMenu = () => {
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Open navigation");
      navigation?.classList.remove("is-open");
    };

    menuButton?.addEventListener("click", toggleMenu);
    navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });
      revealItems.forEach((item) => observer.observe(item));
      return () => {
        observer.disconnect();
        menuButton?.removeEventListener("click", toggleMenu);
        navigation?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
      };
    }

    revealItems.forEach((item) => item.classList.add("is-visible"));
    return () => {
      menuButton?.removeEventListener("click", toggleMenu);
      navigation?.querySelectorAll("a").forEach((link) => link.removeEventListener("click", closeMenu));
    };
  }, []);

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
      ))}
      <div className="coming-soon reveal">
        <span className="coming-mark">✳</span>
        <p>More projects are brewing.<br /><span>I'm building one good thing at a time.</span></p>
        <span className="coming-line" />
        <span className="coming-number">03 / NEXT</span>
      </div>
      <ProjectDetailsDialog project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

createRoot(document.getElementById("projects-react-root")).render(<ProjectsApp />);
