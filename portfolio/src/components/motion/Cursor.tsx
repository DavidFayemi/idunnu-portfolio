"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useCursorContext } from "@/components/motion/CursorProvider";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function Cursor() {
  const active = useMediaQuery("(pointer: fine)");
  const { variant, label } = useCursorContext();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("has-custom-cursor");
    const onPointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active, x, y]);

  if (!active) return null;
  const sizes = {
    default: { width: 10, height: 10, borderWidth: 0, backgroundColor: "var(--fg)", borderColor: "transparent", rotate: 0 },
    link: { width: 44, height: 44, borderWidth: 1, backgroundColor: "transparent", borderColor: "var(--accent)", rotate: 0 },
    view: { width: 72, height: 72, borderWidth: 0, backgroundColor: "var(--accent)", borderColor: "transparent", rotate: 0 },
    text: { width: 2, height: 28, borderWidth: 0, backgroundColor: "var(--accent)", borderColor: "transparent", rotate: 0 },
    busy: { width: 28, height: 28, borderWidth: 1, backgroundColor: "transparent", borderColor: "var(--accent)", rotate: 360 },
  };
  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ${
        variant === "busy" ? "border-dashed" : ""
      } ${variant === "default" ? "mix-blend-difference" : ""}`}
      style={{ x: springX, y: springY }}
      animate={sizes[variant]}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {variant === "view" ? <span className="font-mono text-[10px] text-bg">{label || "VIEW"}</span> : null}
    </motion.div>
  );
}