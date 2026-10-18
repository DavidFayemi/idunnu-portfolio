"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
};

export function SplitReveal({ text, as = "p", className, delay = 0, once = true }: SplitRevealProps) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const Tag = as as ElementType;
  if (reducedMotion) return <Tag className={className}>{text}</Tag>;
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once, amount: 0.6 }}
              transition={{ delay: delay + index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}