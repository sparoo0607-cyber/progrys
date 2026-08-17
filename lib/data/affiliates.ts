export interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  url: string;
  platform: "Amazon" | "Coursera" | "Udemy" | "Other";
  category: "gear" | "courses" | "books";
  rating: number;
  reviewCount: number;
  updatedAt?: string;
}

export const MOCK_AFFILIATES: AffiliateProduct[] = [
  {
    id: "a1",
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry leading noise cancellation. Perfect for deep focus study sessions.",
    price: 348.0,
    originalPrice: 399.0,
    imageUrl: "/images/affiliates/sony.jpg",
    url: "https://amazon.com",
    platform: "Amazon",
    category: "gear",
    rating: 4.8,
    reviewCount: 15420,
  },
  {
    id: "a2",
    title: "Complete Web Development Bootcamp",
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React.",
    price: 19.99,
    originalPrice: 199.99,
    imageUrl: "/images/affiliates/course.jpg",
    url: "https://udemy.com",
    platform: "Udemy",
    category: "courses",
    rating: 4.7,
    reviewCount: 320050,
  },
  {
    id: "a3",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
    price: 35.0,
    imageUrl: "/images/affiliates/book.jpg",
    url: "https://amazon.com",
    platform: "Amazon",
    category: "books",
    rating: 4.9,
    reviewCount: 8900,
  }
];
