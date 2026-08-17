export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  authorName: string;
  authorAvatar?: string;
  category: string;
  likes: number;
  rating: number;
  publishedAt: string;
  tags?: string[];
  readTime?: number;
  author?: { name: string; avatar: string };
  coverImage?: string;
}

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "b1",
    slug: "how-to-start-with-nextjs",
    title: "How to really start with Next.js App Router",
    excerpt: "The app router changed everything. Here is a no-nonsense guide to getting started without the boilerplate.",
    content: "<p>Next.js 14 introduced massive changes...</p><p>Here is what you need to know.</p>",
    authorName: "Sarah Drasner",
    category: "Engineering",
    likes: 1240,
    rating: 4.9,
    publishedAt: "2024-06-12",
  },
  {
    id: "b2",
    slug: "design-systems-101",
    title: "Design Systems 101: Building for scale",
    excerpt: "Stop repeating your CSS. Start building tokens.",
    content: "<p>A design system is more than just a UI kit...</p>",
    authorName: "Alex Chen",
    category: "Design",
    likes: 856,
    rating: 4.8,
    publishedAt: "2024-05-30",
  },
  {
    id: "b3",
    slug: "study-habits-that-work",
    title: "Study habits that actually work for CS students",
    excerpt: "Forget the 10-hour grinds. Here is how to study smart.",
    content: "<p>Pomodoro, active recall, and spaced repetition...</p>",
    authorName: "Michael Scott",
    category: "Productivity",
    likes: 3005,
    rating: 5.0,
    publishedAt: "2024-02-15",
  }
];
