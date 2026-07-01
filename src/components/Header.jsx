import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { personalInfo } from "../data/config";
import { useTheme } from "../hooks/useTheme";
import Card from "./Card";
import ComicText from "./ComicText";
import SectionTitle from "./SectionTitle";
import { SocialGrid, ResumeButton } from "./SocialIcons";

export default function Header() {
  const { pathname } = useLocation();
  const { theme, cycleTheme } = useTheme();
  const [showComic, setShowComic] = useState(false);

  const isHome = pathname === "/";

  const linkClass = (path) =>
    `text-sm transition-colors ${
      pathname === path
        ? "text-accent"
        : "text-gray-400 hover:text-accent"
    }`;

  function toggleName() {
    setShowComic((prev) => !prev);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleName();
    }
  }

  return (
    <Card className="flex items-center gap-4 pointer-events-auto">
      {/* Avatar */}
      <img
        src={personalInfo.avatarUrl}
        alt="avatar"
        role="button"
        tabIndex={0}
        onClick={toggleName}
        onKeyDown={handleKeyDown}
        className="size-12 md:size-15 object-cover shrink-0 cursor-pointer"
      />

      {/* Name & Nav */}
      <div className="w-full">
        <div className="min-h-9">
          {showComic ? (
            <ComicText fontSize={1.6} className="text-left leading-tight">
              {personalInfo.name}
            </ComicText>
          ) : isHome ? (
            <ComicText fontSize={1.6} className="text-left leading-tight">
              {personalInfo.name}
            </ComicText>
          ) : (
            <SectionTitle>{personalInfo.fullName}</SectionTitle>
          )}
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

      {/* Right side: social + resume (hidden on mobile) */}
      <div className="max-sm:hidden flex flex-col gap-2 self-center ml-auto shrink-0">
        <SocialGrid />
        <ResumeButton />
      </div>
    </Card>
  );
}
