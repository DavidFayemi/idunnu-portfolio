import { Footer } from "@/components/layout/Footer";
import { Rail } from "@/components/layout/Rail";
import { Section } from "@/components/layout/Section";
import { TopBar } from "@/components/layout/TopBar";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <TopBar />
      <Rail />
      <main className="pt-16">
        <Section id="boot" index="00">
          <Hero />
        </Section>
        <Section id="process" index="01" title="Process">
          <div />
        </Section>
        <Section id="stack" index="02" title="Stack">
          <div />
        </Section>
        <Section id="work" index="03" title="Work">
          <div />
        </Section>
        <Section id="contact" index="04" title="Contact">
          <div />
        </Section>
      </main>
      <Footer />
    </>
  );
}
