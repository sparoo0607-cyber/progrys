export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status?: "pending" | "in-progress" | "completed"; // Usually tracked separately in user state
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  nodes: RoadmapNode[];
}

export const MOCK_ROADMAPS: Roadmap[] = [
  {
    id: "r1",
    slug: "frontend-mastery",
    title: "Frontend Mastery",
    description: "A comprehensive guide covering HTML, CSS, JavaScript, React, and modern frontend tooling.",
    difficulty: "intermediate",
    estimatedTime: "6 Months",
    nodes: [
      { id: "n1", title: "Internet Fundamentals", description: "How the web works, HTTP, DNS, and hosting." },
      { id: "n2", title: "HTML & CSS", description: "Semantic HTML, modern CSS layouts (Flexbox, Grid), responsive design." },
      { id: "n3", title: "JavaScript Basics", description: "Variables, functions, DOM manipulation, ES6+ features." },
      { id: "n4", title: "React Core", description: "Components, state, props, hooks, context API." },
      { id: "n5", title: "Advanced Frontend", description: "Performance optimization, testing, SSR/SSG." },
    ]
  },
  {
    id: "r2",
    slug: "backend-engineer",
    title: "Backend Engineer",
    description: "Learn how to build scalable servers, manage databases, and design APIs.",
    difficulty: "advanced",
    estimatedTime: "8 Months",
    nodes: [
      { id: "n1", title: "Language Basics", description: "Pick a language (Node.js, Python, Go, Java)." },
      { id: "n2", title: "Relational Databases", description: "SQL, normalization, indexes, Postgres/MySQL." },
      { id: "n3", title: "APIs", description: "REST, GraphQL, gRPC." },
      { id: "n4", title: "Security & Auth", description: "JWT, OAuth, hashing, HTTPS." },
    ]
  },
  {
    id: "r3",
    slug: "ui-ux-design-basics",
    title: "UI/UX Design Basics",
    description: "Start designing beautiful and functional user interfaces.",
    difficulty: "beginner",
    estimatedTime: "3 Months",
    nodes: [
      { id: "n1", title: "Design Principles", description: "Color theory, typography, spacing, contrast." },
      { id: "n2", title: "Figma Fundamentals", description: "Frames, constraints, auto-layout, components." },
      { id: "n3", title: "UX Research", description: "User personas, wireframing, prototyping." },
    ]
  }
];
