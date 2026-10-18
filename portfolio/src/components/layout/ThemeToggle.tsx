"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this session */
    }
  }, [theme]);

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={theme === "light"}
      onClick={toggle}
      className="rounded-[var(--radius)] border border-border px-2 py-1 font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-fg"
    >
      {theme}
    </button>
  );
}
