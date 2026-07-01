import { projects } from "../data/config";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";

export default function Projects() {
  return (
    <Card className="!p-0">
      <div className="grid">
        {projects.map((project) => (
          <div
            key={project.title}
            className="p-6 border border-zinc-700/50 group transition-all duration-200 ease-in-out hover:border-accent"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group-hover:text-accent"
            >
              <p className="text-xl font-bold">{project.title}</p>
              <p className="text-gray-400 text-sm mt-5">{project.description}</p>
              <p className="text-sm text-gray-500 mt-4">
                {project.technologies.map((tech) => (
                  <span key={tech}>* {tech} </span>
                ))}
              </p>
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
}
