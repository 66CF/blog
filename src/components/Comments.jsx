import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import Card from "./Card";

// Giscus 评论组件
export default function Comments({ giscusConfig }) {
  const { theme } = useTheme();

  if (!giscusConfig?.repo) return null;

  return (
    <Card className="mt-8">
      <div className="text-xs text-gray-500 font-mono mb-4">// comments</div>
      <GiscusWidget config={giscusConfig} themeName={theme.name} />
    </Card>
  );
}

function GiscusWidget({ config, themeName }) {
  const containerRef = useRef(null);

  // 博客主题 → Giscus 主题 映射
  const themeMap = {
    green: "dark",
    purple: "dark",
    blue: "dark",
    orange: "dark",
    pink: "dark",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 清空容器
    container.innerHTML = "";

    // 创建 script 元素，放到容器里
    // Giscus 的 client.js 会自动替换 script 标签为评论 widget
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", config.repo);
    script.setAttribute("data-repo-id", config.repoId);
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId);
    script.setAttribute("data-mapping", config.mapping || "pathname");
    script.setAttribute("data-strict", config.strict || "0");
    script.setAttribute("data-reactions-enabled", config.reactionsEnabled || "1");
    script.setAttribute("data-emit-metadata", config.emitMetadata || "0");
    script.setAttribute("data-input-position", config.inputPosition || "bottom");
    script.setAttribute("data-theme", themeMap[themeName] || "dark");
    script.setAttribute("data-lang", config.lang || "zh-CN");
    script.setAttribute("data-loading", config.loading || "lazy");
    script.async = true;
    script.crossOrigin = "anonymous";

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [config, themeName]);

  return <div ref={containerRef} className="min-h-[300px]" />;
}
