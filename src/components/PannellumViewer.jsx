import { useEffect, useRef, useState } from "react";

let resourcesLoaded = false;
let loadPromise = null;

function ensureResources() {
  if (resourcesLoaded) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    // CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(link);

    // JS
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.onload = () => {
      resourcesLoaded = true;
      resolve();
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

export default function PannellumViewer({ src, className = "" }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    ensureResources().then(() => {
      if (cancelled || !containerRef.current) return;
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    // Destroy previous viewer if any
    if (viewerRef.current) {
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    // Pannellum is loaded globally via the CDN script
    viewerRef.current = window.pannellum.viewer(containerRef.current, {
      panorama: src,
      autoLoad: true,
      crossOrigin: "anonymous",
      showControls: true,
    });
  }, [ready, src]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`my-6 ${className}`}>
      {!ready && (
        <div className="aspect-video bg-black/50 border border-zinc-700/50 flex items-center justify-center text-gray-500 text-sm">
          loading panorama…
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full"
        style={{ height: ready ? "480px" : "0" }}
      />
    </div>
  );
}
