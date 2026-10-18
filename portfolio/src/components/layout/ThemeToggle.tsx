"use client";

import { useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const currentTheme = typeof document === "undefined" ? undefined : document.documentElement.dataset.theme;
    return currentTheme === "light" || currentTheme === "dark" ? currentTheme : "dark";
  });

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
      className="rounded-[var(--radius)] border border-border px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
