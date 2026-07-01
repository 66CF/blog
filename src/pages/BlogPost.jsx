import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionTitle from "../components/SectionTitle";

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        // Try loading from blog posts defined in config
        // For now, load from a markdown file in the data directory
        const module = await import(`../data/blog-posts/${slug}.md?raw`);
        if (module) {
          const raw = module.default || module;
          // Parse frontmatter if exists
          const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
          if (match) {
            const frontmatter = {};
            match[1].split("\n").forEach((line) => {
              const [key, ...vals] = line.split(":");
              if (key && vals.length) {
                frontmatter[key.trim()] = vals.join(":").trim();
              }
            });
            setMetadata(frontmatter);
            setContent(match[2]);
          } else {
            setContent(raw);
          }
        }
      } catch (e) {
        setContent(`# 404\n\nBlog post not found. [Go back](/blog)`);
      }
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-none">
      <Link
        to="/blog"
        className="text-sm text-gray-500 hover:text-accent transition-colors mb-6 inline-block"
        style={{ color: undefined }}
      >
        ← back to blog
      </Link>

      {metadata?.title && (
        <SectionTitle>{metadata.title}</SectionTitle>
      )}
      {metadata?.date && (
        <p className="text-gray-500 text-xs font-mono mt-2 mb-8">{metadata.date}</p>
      )}

      <div className="prose prose-invert prose-green max-w-none
        prose-headings:text-accent
        prose-a:text-accent
        prose-code:text-gray-300
        prose-pre:bg-black/50
        prose-pre:border
        prose-pre:border-zinc-700/50
        prose-strong:text-gray-200
        prose-li:text-gray-300
        prose-p:text-gray-300
        text-sm leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
