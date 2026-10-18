"use client";

import { SplitReveal } from "@/components/motion/SplitReveal";
import { useCursorVariant } from "@/components/motion/CursorProvider";
import { site } from "@/content/site";

export function Hero() {
  const cursorProps = useCursorVariant("link");

  return (
    <div className="py-8">
      <SplitReveal
        text="Websites that bring customers to your door."
        as="h1"
        className="font-display text-hero leading-[0.95] tracking-[-0.04em] text-fg"
      />
      <SplitReveal
        text="Simple to use. Easy to trust."
        as="h1"
        className="font-display text-hero leading-[0.95] tracking-[-0.04em] text-muted"
      />
      <p className="mt-8 max-w-prose text-lg leading-8 text-muted">
        {site.intro}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          {...cursorProps}
          href="#work"
          className="inline-flex items-center justify-center rounded-[var(--radius)] bg-accent px-5 py-3 font-mono text-sm text-bg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          See my work
        </a>
        <a
          {...cursorProps}
          href="#contact"
          className="inline-flex items-center justify-center rounded-[var(--radius)] border border-border px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
        >
          Tell me about your project
        </a>
      </div>
      <ul className="mt-10 flex flex-col gap-3 font-mono text-xs text-muted sm:flex-row sm:gap-6">
        {site.trustPoints.map((point) => (
          <li key={point} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
