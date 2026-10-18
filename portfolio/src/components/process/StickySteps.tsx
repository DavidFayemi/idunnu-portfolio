"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export type StickyStep = {
  id: string;
  index: string;
  title: string;
  summary: string;
};

function StickyStepScene({ step }: { step: StickyStep }) {
  const target = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <article
      ref={target}
      className="grid min-h-[120svh] grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:sticky lg:top-[20vh] lg:col-span-4 lg:h-fit">
        <p className="font-mono text-xs text-muted">
          {step.index}
        </p>
        <h3 className="mt-4 max-w-xs font-display text-display font-semibold leading-none tracking-tight">
          {step.title}
        </h3>
        <div className="mt-8 h-32 w-px bg-border">
          <motion.div
            className="h-full w-px origin-top bg-accent"
            style={{ scaleY }}
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="lg:col-span-8 lg:pt-[20vh]"
      >
        <p className="max-w-2xl text-lg leading-8 text-muted">
          {step.summary}
        </p>
      </motion.div>
    </article>
  );
}

export function StickySteps({ steps }: { steps: StickyStep[] }) {
  return (
    <div>
      {steps.map((step) => (
        <StickyStepScene key={step.id} step={step} />
      ))}
    </div>
  );
}
