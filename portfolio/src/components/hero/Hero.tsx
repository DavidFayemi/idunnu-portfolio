import { SplitReveal } from "@/components/motion/SplitReveal";

export function Hero() {
  return (
    <div className="py-8">
      <SplitReveal
        text="Placeholder"
        as="h1"
        className="font-display text-hero leading-[0.95] tracking-[-0.04em] text-fg"
      />
    </div>
  );
}
