import type { StickyStep } from "@/components/process/StickySteps";

export const processSteps: StickyStep[] = [
  {
    id: "talk",
    index: "01",
    title: "We talk.",
    summary:
      "You tell me about your business and who you want to reach. No technical knowledge needed.",
  },
  {
    id: "plan",
    index: "02",
    title: "I plan.",
    summary:
      "You get a simple outline and a price before I build anything.",
  },
  {
    id: "build",
    index: "03",
    title: "I build.",
    summary:
      "You see progress along the way and tell me what to change.",
  },
  {
    id: "launch-and-stay",
    index: "04",
    title: "I launch and stay.",
    summary:
      "Your site goes live, and I am here when you need help or updates.",
  },
];
