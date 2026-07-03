import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import Card from "./Card";

// Giscus 评论组件
// 使用方法：在 src/data/config.js 中配置 giscus 对象
export default function Comments({ giscusConfig }) {
  const ref = useRef(null);
  const { theme } = useTheme();

  // 如果未配置 Giscus，不渲染
  if (!giscusConfig?.repo) return null;

  return (
    <Card className="mt-8">
      <div className="text-xs text-gray-500 font-mono mb-4">// comments</div>
      <GiscusWidget config={giscusConfig} theme={theme.name} />
    </Card>
  );
}

function GiscusWidget({ config, theme: themeName }) {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  // Giscus 支持的主题映射
  const themeMap = {
    green: "noborder_green",
    purple: "noborder_gray",
    blue: "noborder_blue",
    orange: "noborder_orange",
    pink: "noborder_pink",
  };

  const giscusTheme = themeMap[themeName] || "noborder_gray";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 清空容器
    container.innerHTML = "";

    // 创建 <giscus-widget> 元素
    const giscusEl = document.createElement("giscus-widget");
    giscusEl.setAttribute("repo", config.repo);
    giscusEl.setAttribute("repoid", config.repoId);
    giscusEl.setAttribute("category", config.category);
    giscusEl.setAttribute("categoryid", config.categoryId);
    giscusEl.setAttribute("mapping", config.mapping || "pathname");
    giscusEl.setAttribute("strict", config.strict || "0");
    giscusEl.setAttribute("reactionsenabled", config.reactionsEnabled || "1");
    giscusEl.setAttribute("emitmetadata", config.emitMetadata || "0");
    giscusEl.setAttribute("inputposition", config.inputPosition || "top");
    giscusEl.setAttribute("theme", giscusTheme);
    giscusEl.setAttribute("lang", config.lang || "zh-CN");
    giscusEl.setAttribute("loading", config.loading || "lazy");
    container.appendChild(giscusEl);

    // 如果 Giscus 脚本尚未加载，动态加载
    if (!scriptLoadedRef.current) {
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
      script.setAttribute("data-input-position", config.inputPosition || "top");
      script.setAttribute("data-theme", giscusTheme);
      script.setAttribute("data-lang", config.lang || "zh-CN");
      script.setAttribute("data-loading", config.loading || "lazy");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);
    }

    return () => {
      // 清理：清空容器，但保留脚本（避免反复加载）
      if (container) container.innerHTML = "";
    };
  }, [config, giscusTheme]);

  // 监听主题切换，更新 giscus-widget 的 theme 属性
  useEffect(() => {
    const giscusEl = containerRef.current?.querySelector("giscus-widget");
    if (giscusEl) {
      giscusEl.setAttribute("theme", giscusTheme);
    }
    // 也更新已加载脚本的 data-theme
    const script = document.querySelector('script[src="https://giscus.app/client.js"]');
    if (script) {
      script.setAttribute("data-theme", giscusTheme);
    }
  }, [giscusTheme]);

  return <div ref={containerRef} className="min-h-[200px]" />;
}
