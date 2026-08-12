import { NavLink, useLocation } from "react-router-dom";
import { personalInfo } from "../data/config";
import { useTheme } from "../hooks/useTheme";
import Card from "./Card";
import SectionTitle from "./SectionTitle";
import { SocialGrid } from "./SocialIcons";

export default function Header() {
  const { pathname } = useLocation();
  const { theme, cycleTheme } = useTheme();

  const linkClass = (path) =>
    `text-sm transition-colors ${
      pathname === path
        ? "text-accent"
        : "text-gray-400 hover:text-accent"
    }`;

  return (
    <Card className="flex items-center gap-4 rounded-full pointer-events-auto">
      {/* Avatar */}
      <img
        src={personalInfo.avatarUrl}
        alt="avatar"
        className="size-12 md:size-15 rounded-full object-cover shrink-0"
      />

      {/* Name & Nav */}
      <div className="w-full">
        <div className="min-h-9">
          <SectionTitle className="!text-2xl">{personalInfo.fullName}</SectionTitle>
        </div>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass("/")}>
            /home
          </NavLink>
          <NavLink to="/projects" className={linkClass("/projects")}>
            /projects
          </NavLink>
          <NavLink to="/blog" className={linkClass("/blog")}>
            /blog
          </NavLink>
          <button
            type="button"
            onClick={cycleTheme}
            className="text-sm text-accent transition-colors cursor-pointer"
            aria-label="Cycle theme"
          >
            {theme.color}
          </button>
        </div>
      </div>

      {/* Right side: social links (hidden on mobile) */}
      <div className="max-sm:hidden flex flex-col gap-2 self-center ml-auto shrink-0">
        <SocialGrid />
      </div>
    </Card>
  );
}
