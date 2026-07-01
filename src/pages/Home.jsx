import { Link } from "react-router-dom";
import { personalInfo, aboutParagraphs, projects, blogPosts } from "../data/config";
import SectionTitle from "../components/SectionTitle";
import Paragraph from "../components/Paragraph";
import SocialIcons from "../components/SocialIcons";

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3);
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-none space-y-12">
      {/* About Section */}
      <section className="mb-16 space-y-6">
        <SectionTitle>about</SectionTitle>
        <div className="space-y-5 text-sm">
          {aboutParagraphs.map((text, i) => (
            <Paragraph key={i}>{text}</Paragraph>
          ))}
          <div className="flex justify-between">
            <Paragraph>open to work &lt;3</Paragraph>
            <SocialIcons className="max-sm:hidden" />
          </div>
          <div className="max-sm:grid hidden">
            <SocialIcons />
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="mb-4">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle>latest posts</SectionTitle>
            <Link
              to="/blog"
              className="text-sm text-gray-500 hover:text-accent transition-all duration-300 flex items-center gap-1"
              style={{ color: undefined }}
            >
              view all <span className="text-xs">→</span>
            </Link>
          </div>
          <div className="space-y-8">
            {latestPosts.map((post) => (
              <div key={post.slug} className="group">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-200 group-hover:text-accent transition-colors duration-300 truncate">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-xs font-mono whitespace-nowrap">
                      {post.date}
                    </p>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-[95%]">
                    {post.excerpt}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-8">
          <SectionTitle>projects</SectionTitle>
          <Link
            to="/projects"
            className="text-sm text-gray-500 hover:text-accent transition-all duration-300 flex items-center gap-1"
            style={{ color: undefined }}
          >
            view all <span className="text-xs">→</span>
          </Link>
        </div>
        <div className="space-y-8">
          {featuredProjects.map((project) => (
            <div key={project.title} className="group">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
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
      </section>
    </div>
  );
}
