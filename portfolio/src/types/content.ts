export type SiteContent = {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  degree: string;
};

export type Principle = {
  id: string;
  index: string;
  title: string;
  lab: {
    label: string;
    summary: string;
  };
  production: {
    label: string;
    summary: string;
    bullets: string[];
  };
};