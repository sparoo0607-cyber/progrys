export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  coverImage?: string; // base64 data URL or external URL uploaded by admin
  downloadFile?: {
    name: string;       // original filename e.g. "guide.pdf"
    dataUrl: string;    // base64 encoded file content
    size: number;       // bytes
    type: string;       // MIME type
  };
  tags: string[];
  rating: number;
  reviewCount: number;
  isFree: boolean;
  category: "ebooks" | "templates" | "notes" | "kits";
  fileFormats: string[];
  updatedAt: string;
  previewImages?: string[];
  features?: string[];
  likes?: number;
  dislikes?: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "nextjs-saas-starter-kit",
    title: "Ultimate Next.js 14 SaaS Starter Kit",
    description: "A complete, production-ready starter kit with Auth, Prisma, Tailwind, and Stripe pre-configured. Save 50+ hours of setup time.",
    price: 49.0,
    originalPrice: 99.0,
    images: ["/images/products/nextjs-1.jpg", "/images/products/nextjs-2.jpg"],
    tags: ["React", "Next.js", "SaaS", "Tailwind"],
    rating: 4.9,
    reviewCount: 128,
    isFree: false,
    category: "kits",
    fileFormats: ["ZIP", "Markdown"],
    updatedAt: "2024-05-15",
    features: ["Next.js App Router", "Authentication", "Database setup", "Payment integration"],
    likes: 342,
    dislikes: 12,
  },
  {
    id: "p2",
    slug: "computer-networks-cheat-sheet",
    title: "Computer Networks Complete Cheat Sheet",
    description: "Every protocol, port, and OSI layer detail you need for your exams in one high-res PDF.",
    price: 0,
    images: ["/images/products/cn-1.jpg"],
    tags: ["Networking", "Exams", "CS Core"],
    rating: 4.8,
    reviewCount: 342,
    isFree: true,
    category: "notes",
    fileFormats: ["PDF"],
    updatedAt: "2024-01-20",
    features: ["OSI Model", "TCP/IP Suite", "Common Ports", "Subnetting Guide"],
    likes: 890,
    dislikes: 5,
  },
  {
    id: "p3",
    slug: "notion-student-dashboard",
    title: "Aesthetic Student Notion Dashboard",
    description: "Track your assignments, grades, and daily habits with this minimal and highly functional Notion template.",
    price: 9.0,
    images: ["/images/products/notion-1.jpg", "/images/products/notion-2.jpg", "/images/products/notion-3.jpg"],
    tags: ["Notion", "Productivity", "Aesthetic"],
    rating: 5.0,
    reviewCount: 89,
    isFree: false,
    category: "templates",
    fileFormats: ["Notion Link"],
    updatedAt: "2024-06-01",
    features: ["Assignment Tracker", "Grade Calculator", "Habit Tracker", "Course Hub"],
    likes: 421,
    dislikes: 8,
  },
  {
    id: "p4",
    slug: "dsa-interview-handbook",
    title: "The DSA Interview Handbook",
    description: "Over 100+ patterns, visual explanations, and code snippets to help you crack technical interviews.",
    price: 19.99,
    images: ["/images/products/dsa-1.jpg"],
    tags: ["Algorithms", "Interviews", "Coding"],
    rating: 4.7,
    reviewCount: 215,
    isFree: false,
    category: "ebooks",
    fileFormats: ["PDF", "EPUB"],
    updatedAt: "2024-04-10",
    features: ["100+ Patterns", "Visual diagrams", "Code in Python/C++/Java", "Time complexity guide"],
    likes: 1205,
    dislikes: 45,
  }
];

export interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  affiliateUrl: string;
  coverImage?: string; // base64 or external url
  category: "gear" | "software" | "books";
  rating: number;
  reviewCount: number;
  isActive: boolean;
  updatedAt: string;
  likes?: number;
  dislikes?: number;
}

export const MOCK_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: "a1",
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    description: "Industry-leading noise cancellation. Perfect for deep focus study sessions.",
    price: 348.0,
    affiliateUrl: "https://amazon.com",
    category: "gear",
    rating: 4.8,
    reviewCount: 4230,
    isActive: true,
    updatedAt: "2024-05-15",
    likes: 5630,
    dislikes: 120,
  },
  {
    id: "a2",
    title: "Notion Plus Subscription",
    description: "Get the ultimate workspace tool for students with premium features and AI.",
    price: 8.0,
    affiliateUrl: "https://notion.so",
    category: "software",
    rating: 4.9,
    reviewCount: 12500,
    isActive: true,
    updatedAt: "2024-06-01",
    likes: 14200,
    dislikes: 310,
  }
];
