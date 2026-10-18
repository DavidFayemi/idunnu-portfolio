"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "boot", label: "00 / BOOT" },
  { id: "principles", label: "01 / PRINCIPLES" },
  { id: "stack", label: "02 / STACK" },
  { id: "work", label: "03 / WORK" },
  { id: "contact", label: "04 / CONTACT" },
];

export function Rail() {
  const [activeChapter, setActiveChapter] = useState("boot");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry?.target.id) {
          setActiveChapter(visibleEntry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed bottom-8 left-0 top-20 z-20 hidden w-56 min-[1024px]:block" aria-label="Chapter navigation">
      <nav className="flex h-full flex-col justify-center gap-3 pl-[var(--gutter)] font-mono text-xs">
        {chapters.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-current={isActive ? "page" : undefined}
              className={`border-l px-3 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent ${
                isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-fg"
              }`}
            >
              {chapter.label}
            </a>
          );
        })}
      </nav>
      <div className="absolute bottom-[-2rem] left-0 h-0.5 w-full bg-accent" aria-hidden="true" />
    </aside>
  );
}