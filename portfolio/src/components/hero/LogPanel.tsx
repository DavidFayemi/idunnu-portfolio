"use client";

import { useEffect, useState } from "react";

export const logLines = [
  "> GET /api/projects?limit=10",
  "[client] dispatched",
  "[nest] route matched: ProjectsController.findAll",
  "[nest] ValidationPipe ok (limit=10)",
  "[prisma] SELECT id, title, stack FROM projects ORDER BY created_at DESC LIMIT 10",
  "[pg] 10 rows in 3.2ms",
  "[nest] serialised 10 DTOs",
  "[client] 200 OK in 11.4ms",
];

export function LogPanel({ visibleLines }: { visibleLines: number }) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    logLines.slice(0, visibleLines).forEach((line, lineIndex) => {
      for (let characterIndex = 0; characterIndex < line.length; characterIndex += 1) {
        const timer = window.setTimeout(() => {
          if (cancelled) return;
          setTypedLines((current) => {
            const next = [...current];
            next[lineIndex] = line.slice(0, characterIndex + 1);
            return next;
          });
        }, lineIndex * 18 * Math.max(line.length, 1) + characterIndex * 18);
        timers.push(timer);
      }
    });
    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [visibleLines]);

  return (
    <div className="flex min-h-[18rem] max-h-[28rem] flex-col overflow-y-auto rounded-[var(--radius)] border border-border bg-surface p-4 font-mono text-xs text-muted">
      <div className="mb-5 flex items-center gap-1.5 border-b border-border pb-3">
        <span className="h-2 w-2 rounded-full border border-border-strong" />
        <span className="h-2 w-2 rounded-full border border-border-strong" />
        <span className="h-2 w-2 rounded-full border border-border-strong" />
        <span className="ml-3">~/request.log</span>
      </div>
      <div className="space-y-2">
        {typedLines.map((line) => <p key={line}>{line}</p>)}
        <span className="inline-block h-4 w-1 animate-pulse bg-accent align-middle" aria-hidden="true" />
      </div>
    </div>
  );
}
