import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, index, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} data-chapter aria-labelledby={headingId}>
      <Container className="min-h-[100svh] py-32">
        <p className="font-mono text-label uppercase tracking-[0.16em] text-muted">
          {index} / {title}
        </p>
        <h2 id={headingId} className="mt-4 font-display text-display font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}