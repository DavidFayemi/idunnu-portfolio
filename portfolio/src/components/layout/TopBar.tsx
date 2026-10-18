"use client";

import { site } from "@/content/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useCursorVariant } from "@/components/motion/CursorProvider";

export function TopBar() {
  const cursorProps = useCursorVariant("link");
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--max-w)] items-center justify-between px-[var(--gutter)]">
        <a
          {...cursorProps}
          href="#boot"
          className="font-display font-semibold tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          {site.name}
        </a>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-accent" aria-hidden="true" />
            AVAILABLE FOR WORK
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}