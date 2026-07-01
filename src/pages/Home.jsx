import { Link } from "react-router-dom";
import { aboutParagraphs, projects } from "../data/config";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import Paragraph from "../components/Paragraph";
import { SocialGrid } from "../components/SocialIcons";

function renderText(content) {
  if (Array.isArray(content)) {
    return content.map((part, j) =>
      part === "br" ? <br key={j} /> : part
    );
  }
  return content;
}

export default function Home() {
  const allButLast = aboutParagraphs.slice(0, -1);
  const lastOne = aboutParagraphs[aboutParagraphs.length - 1];
  const featuredProjects = projects.slice(0, 4);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {/* About Section */}
        <section className="mb-16 space-y-6">
          <SectionTitle>about</SectionTitle>
          <div className="space-y-5 text-sm">
            {allButLast.map((content, i) => (
              <Paragraph key={i}>{renderText(content)}</Paragraph>
            ))}
            <div className="flex justify-between">
              <Paragraph>{renderText(lastOne)}</Paragraph>
              <div className="max-sm:grid grid-cols-5 max-w-fit gap-2 hidden">
                <SocialGrid
                  size={20}
                  iconClassName="text-accent flex items-center justify-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <div className="text-white mb-4">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle>projects</SectionTitle>
            <Link
              to="/projects"
              className="text-sm text-gray-500 hover:text-accent transition-all duration-300 flex items-center gap-1"
            >
              view all <span className="text-xs">→</span>
            </Link>
          </div>
          <div className="space-y-8">
            {featuredProjects.map((project) => (
              <div key={project.title} className="group">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-200 group-hover:text-accent transition-colors duration-300 truncate">
                      {project.title}
                    </h2>
                    <p className="text-gray-500 text-xs font-mono whitespace-nowrap">
                      {project.technologies.join(", ")}
                    </p>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-[95%]">
                    {project.description}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
