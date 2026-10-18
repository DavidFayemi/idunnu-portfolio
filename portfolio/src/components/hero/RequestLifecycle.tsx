"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useReducer, useState } from "react";
import { heroSnippets } from "@/content/hero";
import { useCursorVariant } from "@/components/motion/CursorProvider";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { LogPanel, logLines } from "@/components/hero/LogPanel";

type RequestState = "idle" | "sending" | "processing" | "querying" | "responding" | "resolved";
type Action = { type: "start" } | { type: "advance"; state: RequestState };
const durations: Record<Exclude<RequestState, "idle" | "resolved">, number> = {
  sending: 500,
  processing: 450,
  querying: 600,
  responding: 500,
};
const initialState: RequestState = "idle";
const reducer = (state: RequestState, action: Action): RequestState => {
  if (action.type === "start" && (state === "idle" || state === "resolved")) return "sending";
  if (action.type === "advance") return action.state;
  return state;
};
const states: RequestState[] = ["sending", "processing", "querying", "responding", "resolved"];
const desktopNodes = [
  { x: 90, y: 80, title: "Client", label: "Next.js Client", sub: "fetch(/api/projects)", key: "client" as const },
  { x: 320, y: 80, title: "Controller", label: "NestJS Controller", sub: "ProjectsController.findAll", key: "controller" as const },
  { x: 550, y: 80, title: "Database", label: "PostgreSQL", sub: "projects table", key: "database" as const },
];
const verticalNodes = [
  { x: 30, y: 40, title: "Client", label: "Next.js Client", sub: "fetch(/api/projects)", key: "client" as const },
  { x: 30, y: 210, title: "Controller", label: "NestJS Controller", sub: "ProjectsController.findAll", key: "controller" as const },
  { x: 30, y: 380, title: "Database", label: "PostgreSQL", sub: "projects table", key: "database" as const },
];

function activeNode(state: RequestState, index: number) {
  if (state === "sending") return index === 0;
  if (state === "processing") return index === 1;
  if (state === "querying") return index === 2;
  return state === "responding" ? index === 1 : state === "resolved";
}

export function RequestLifecycle() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const vertical = useMediaQuery("(max-width: 767px)");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hovered, setHovered] = useState<string | null>(null);
  const nodes = vertical ? verticalNodes : desktopNodes;
  const nodeProps = useCursorVariant("link");
  const visibleLines = reducedMotion ? logLines.length : state === "idle" ? 1 : state === "sending" ? 2 : state === "processing" ? 4 : state === "querying" ? 5 : state === "responding" ? 7 : 8;

  useEffect(() => {
    if (reducedMotion) {
      dispatch({ type: "advance", state: "resolved" });
      return;
    }
    if (state === "idle" || state === "resolved") return;
    const index = states.indexOf(state);
    const timer = window.setTimeout(() => dispatch({ type: "advance", state: states[index + 1] ?? "resolved" }), durations[state]);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, state]);

  const paths = useMemo(() => nodes.slice(0, 2).map((node, index) => {
    const next = nodes[index + 1];
    return { d: `M ${node.x + 180} ${node.y + 30} L ${next.x} ${next.y + 30}`, from: { x: node.x + 180, y: node.y + 30 }, to: { x: next.x, y: next.y + 30 } };
  }), [nodes]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="relative overflow-visible rounded-[var(--radius)] border border-border bg-surface-2 p-4">
          <svg viewBox={vertical ? "0 0 320 520" : "0 0 800 220"} className="h-auto w-full" role="img" aria-label="Request lifecycle from client to controller to database">
            {paths.map((path) => <path key={path.d} d={path.d} fill="none" stroke="var(--border-strong)" strokeWidth="1" />)}
            {paths.map((path, index) => {
              const packetState = state === "responding" ? 1 : 0;
              return (
                <motion.circle
                  key={`packet-${index}`}
                  r="4"
                  fill="var(--accent)"
                  initial={{ cx: path.from.x, cy: path.from.y }}
                  animate={{ cx: packetState ? path.from.x : path.to.x, cy: packetState ? path.from.y : path.to.y }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, repeat: reducedMotion ? 0 : Infinity, repeatType: "reverse" }}
                />
              );
            })}
            {nodes.map((node, index) => {
              const isActive = activeNode(state, index);
              return (
                <g
                  key={node.key}
                  {...nodeProps}
                  onMouseEnter={() => setHovered(node.key)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <rect x={node.x} y={node.y} width="180" height="60" rx="4" fill="var(--surface)" stroke={isActive ? "var(--accent)" : "var(--border-strong)"} />
                  <text x={node.x + 14} y={node.y + 23} fill="var(--fg)" fontSize="12" fontFamily="var(--font-jetbrains)">{node.label}</text>
                  <text x={node.x + 14} y={node.y + 43} fill="var(--muted)" fontSize="10" fontFamily="var(--font-jetbrains)">{node.sub}</text>
                  {isActive ? <circle cx={node.x + 166} cy={node.y + 14} r="3" fill="var(--accent)" /> : null}
                </g>
              );
            })}
          </svg>
          {hovered ? <pre className="absolute left-4 top-full z-10 mt-2 max-w-[calc(100%-2rem)] overflow-auto whitespace-pre-wrap rounded-[var(--radius)] border border-border bg-surface p-3 font-mono text-xs text-muted">{heroSnippets[hovered as keyof typeof heroSnippets]}</pre> : null}
        </div>
        <button {...nodeProps} type="button" onClick={() => dispatch({ type: "start" })} disabled={state !== "idle" && state !== "resolved"} className="mt-5 border border-border px-4 py-2 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent">
          {state === "resolved" ? "Send again" : "Send request"}
        </button>
      </div>
      <div className="lg:col-span-4"><LogPanel key={visibleLines} visibleLines={visibleLines} /></div>
    </div>
  );
}
