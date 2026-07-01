import { socialLinks } from "../data/config";

// Non-resume social links
const mainLinks = socialLinks.filter((l) => l.title !== "resume");
const resumeLink = socialLinks.find((l) => l.title === "resume");

export function SocialGrid({ size = 22, className = "", iconClassName = "" }) {
  return (
    <div className={`grid grid-cols-5 gap-2 ${className}`}>
      {mainLinks.map((link) => (
        <a
          key={link.title}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.title}
          className={iconClassName || "text-gray-400 hover:text-accent transition-colors flex items-center justify-center"}
        >
          <link.icon size={size} />
        </a>
      ))}
    </div>
  );
}

export function ResumeButton() {
  if (!resumeLink) return null;
  return (
    <a
      href={resumeLink.link}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-gray-700 py-1 text-sm text-gray-400 hover:text-accent hover:border-accent transition-colors text-center flex items-center justify-center gap-1"
    >
      resume <span className="text-xs">→</span>
    </a>
  );
}
