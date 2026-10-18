import { Section } from "@/components/layout/Section";
import { StickySteps } from "@/components/process/StickySteps";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <Section id="process" index="01" title="How I work">
      <StickySteps steps={processSteps} />
    </Section>
  );
}
