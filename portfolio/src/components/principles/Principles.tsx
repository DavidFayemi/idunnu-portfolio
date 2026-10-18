"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { principles } from "@/content/principles";
import { useCursorVariant } from "@/components/motion/CursorProvider";

function PrincipleScene({ principle }: { principle: (typeof principles)[number] }) {
  const target = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cursorProps = useCursorVariant("text");

  return (
    <article ref={target} className="grid min-h-[120svh] grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4 lg:sticky lg:top-[20vh] lg:h-fit">
        <p className="font-mono text-xs text-muted">{principle.index} / 03</p>
        <h3 className="mt-4 max-w-xs font-display text-display font-semibold leading-none tracking-tight">{principle.title}</h3>
        <div className="mt-8 h-32 w-px bg-border">
          <motion.div className="h-full w-px origin-top bg-accent" style={{ scaleY }} />
        </div>
      </div>
      <div className="grid gap-5 lg:col-span-8 lg:grid-cols-2 lg:pt-[20vh]">
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="rounded-[var(--radius)] border border-dashed border-border-strong p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{principle.lab.label}</p>
          <p className="mt-8 text-lg leading-8 text-muted">{principle.lab.summary}</p>
        </motion.section>
        <motion.section {...cursorProps} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="rounded-[var(--radius)] border border-border border-t-2 border-t-accent bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{principle.production.label}</p>
          <p className="mt-8 text-lg leading-8 text-fg">{principle.production.summary}</p>
          <ul className="mt-8 space-y-4 border-t border-border pt-6 text-sm leading-6 text-muted">
            {principle.production.bullets.map((bullet) => <li key={bullet}>— {bullet}</li>)}
          </ul>
        </motion.section>
      </div>
    </article>
  );
}

export function Principles() {
  return <div>{principles.map((principle) => <PrincipleScene key={principle.id} principle={principle} />)}</div>;
}
