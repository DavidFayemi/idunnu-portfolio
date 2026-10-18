import { SplitReveal } from "@/components/motion/SplitReveal";
import { RequestLifecycle } from "@/components/hero/RequestLifecycle";
import { site } from "@/content/site";

export function Hero() {
  return (
    <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <SplitReveal text="Backends that answer in milliseconds." as="h1" className="font-display text-hero leading-[0.95] tracking-[-0.04em] text-fg" />
        <SplitReveal text="Interfaces that never make you wait." as="h1" delay={0.2} className="font-display text-hero leading-[0.95] tracking-[-0.04em] text-muted" />
      </div>
      <div className="lg:col-span-7">
        <p className="max-w-xl font-mono text-sm leading-7 text-muted">Compiled with Next.js + NestJS + PostgreSQL. <span className="text-fg">{site.name}</span></p>
      </div>
      <div className="lg:col-span-12"><RequestLifecycle /></div>
    </div>
  );
}
