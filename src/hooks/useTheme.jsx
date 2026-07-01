import { createContext, useContext, useState, useEffect } from "react";
import { themes } from "../data/config";

const ThemeContext = createContext(null);
const STORAGE_KEY = "theme";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return themes.find((t) => t.name === saved) || themes[0];
  } catch {
    return themes[0];
  }
}

function cycleTheme(current) {
  const idx = themes.indexOf(current);
  return themes[(idx + 1) % themes.length];
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const cycle = () => {
    setTheme((prev) => {
      const next = cycleTheme(prev);
      try {
        localStorage.setItem(STORAGE_KEY, next.name);
      } catch {}
      document.documentElement.style.setProperty("--color-accent", next.color);
      return next;
    });
  };

  // Keyboard shortcut: press T to cycle
  useEffect(() => {
    const handler = (e) => {
      if (e.code === "KeyT" && e.target === document.body) {
        e.preventDefault();
        cycle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Apply accent on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", theme.color);
  }, [theme]);

  const value = { theme, cycleTheme: cycle };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
