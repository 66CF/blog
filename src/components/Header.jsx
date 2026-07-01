import { Link, NavLink, useLocation } from "react-router-dom";
import { personalInfo } from "../data/config";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const linkClass = (path) =>
    `text-sm transition-colors ${
      pathname === path
        ? "text-accent"
        : "text-gray-400 hover:text-accent"
    }`;

  return (
    <header className="flex items-center justify-between py-4 px-4 max-w-5xl mx-auto">
      <div>
        {isHome ? (
          <h1
            className="text-left leading-tight font-bold text-accent"
            style={{ fontSize: "1.6rem", color: "var(--color-accent)" }}
          >
            {personalInfo.name}
          </h1>
        ) : (
          <Link
            to="/"
            className="text-xl font-bold text-accent"
            style={{ color: "var(--color-accent)" }}
          >
            {personalInfo.fullName}
          </Link>
        )}
      </div>

      <nav className="flex items-center gap-2">
        <NavLink to="/" className={linkClass("/")}>
          /home
        </NavLink>
        <NavLink to="/blog" className={linkClass("/blog")}>
          /blog
        </NavLink>
        <NavLink to="/projects" className={linkClass("/projects")}>
          /projects
        </NavLink>
      </nav>
    </header>
  );
}
