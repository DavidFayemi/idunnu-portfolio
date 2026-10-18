"use client";

import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Fragment, useRef, type ElementType } from "react";
type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
};

export function SplitReveal({
  text,
  as = "p",
  className,
  delay = 0,
  once = true,
}: SplitRevealProps) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  // Observe the outer tag (never clipped), not the masked words.
  const inView = useInView(ref, { once, amount: 0.3 });

  if (reducedMotion) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: inView ? "0%" : "110%" }}
                transition={{
                  delay: delay + index * 0.06,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
