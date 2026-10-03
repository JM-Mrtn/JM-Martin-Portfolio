export const categories = [
  {
    key: "Web Development",
    blurb: "Responsive websites and web experiences built around real business needs.",
  },
];

export const projects = [
  {
    slug: "lumispire",
    title: "Lumispire",
    client: "LTC Group of Companies",
    category: "Web Development",
    image: "/projects/lumispire/cover.svg",
    year: "2026",
    role: "Web Developer",
    result:
      "A polished corporate website for LTC Group of Companies with a clear, responsive presentation across devices.",
    problem:
      "The company needed a modern online presence that could present its identity and information clearly in one place.",
    study: {
      intro:
        "Lumispire is a corporate website for LTC Group of Companies, designed to give the business a clean and professional online presence.",
      tech: ["React", "Responsive UI", "Web Design"],
      link: {
        href: "https://lumispire.online/",
        label: "Visit live site",
      },
      gallery: [],
      problem:
        "The business needed a website that could communicate its brand and company information more clearly while remaining easy to use on desktop and mobile devices.",
      approach:
        "I focused on a simple visual hierarchy, readable content, responsive layouts, and a consistent experience so visitors can move through the site without unnecessary friction.",
      solution:
        "The result is a responsive corporate website with a structured presentation of the company, modern styling, and a layout that adapts cleanly across screen sizes.",
      outcome:
        "Lumispire now gives LTC Group of Companies a dedicated web presence that can be shared directly with customers, partners, and visitors through lumispire.online.",
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
