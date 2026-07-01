import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Card from "../components/Card";

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const module = await import(`../data/blog-posts/${slug}.md?raw`);
        const raw = module.default || module;
        const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (match) {
          const frontmatter = {};
          match[1].split("\n").forEach((line) => {
            const [key, ...vals] = line.split(":");
            if (key && vals.length)
              frontmatter[key.trim()] = vals.join(":").trim();
          });
          setMetadata(frontmatter);
          setContent(match[2]);
        } else {
          setContent(raw);
        }
      } catch {
        setContent("## 404\n\nBlog post not found.");
      }
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">loading...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <Link
          to="/blog"
          className="text-sm text-gray-500 hover:text-accent transition-colors mb-6 inline-block"
        >
          ← back to blog
        </Link>

        {metadata?.title && (
          <h1 className="text-2xl font-bold text-accent mb-2">
            {metadata.title}
          </h1>
        )}
        {metadata?.date && (
          <p className="text-gray-500 text-xs font-mono mb-8">
            {metadata.date}
          </p>
        )}

        <div
          className="prose prose-invert max-w-none
            prose-headings:text-accent
            prose-a:text-accent
            prose-code:text-gray-300
            prose-pre:bg-black/50
            prose-pre:border
            prose-pre:border-zinc-700/50
            prose-strong:text-gray-200
            prose-li:text-gray-300
            prose-p:text-gray-300
            text-sm leading-relaxed"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </Card>
  );
}
