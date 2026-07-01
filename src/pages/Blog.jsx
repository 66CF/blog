import { Link } from "react-router-dom";
import { blogPosts } from "../data/config";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";

export default function Blog() {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <SectionTitle>blog</SectionTitle>
        <p className="text-gray-400 text-sm mt-2 mb-8">
          writing about things I learn and build
        </p>

        {blogPosts.length > 0 ? (
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="p-6 border border-zinc-700/50 group transition-all duration-200 ease-in-out hover:border-accent"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block group-hover:text-accent"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-xl font-bold">{post.title}</p>
                    <span className="text-gray-500 text-xs font-mono whitespace-nowrap">
                      {post.date}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">{post.excerpt}</p>
                  {post.tags && (
                    <p className="text-sm text-gray-500 mt-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="mr-3">
                          # {tag}
                        </span>
                      ))}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">coming soon...</p>
            <p className="text-gray-600 text-sm mt-2">
              blog posts in the making. check back later!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
