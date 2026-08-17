import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaLibSql({ 
  url: process.env.DATABASE_URL || "", 
  authToken: process.env.TURSO_AUTH_TOKEN || "" 
});
const prisma = new PrismaClient({ adapter });

async function cleanup() {
  console.log("Cleaning up old 5-8 lesson duplicate topics...");
  
  const oldSlugs = [
    "html5-foundations",
    "modern-css-layouts",
    "javascript-core",
    "react-fundamentals",
    "nextjs-mastery",
    "nodejs-backend",
    "python-basics",
    "sql-fundamentals",
    "aws-cloud-foundations",
    "docker-and-containers",
    "git-and-github"
  ];

  for (const slug of oldSlugs) {
    const existing = await prisma.knowledgeTopic.findUnique({
      where: { slug },
      include: { lessons: true }
    });

    if (existing) {
      console.log(`Deleting old duplicate topic: "${existing.title}" (Slug: ${slug}, Lessons: ${existing.lessons.length})`);
      await prisma.knowledgeLesson.deleteMany({ where: { topicId: existing.id } });
      await prisma.knowledgeTopic.delete({ where: { id: existing.id } });
    }
  }

  // Also delete any remaining topic with fewer than 20 lessons
  const allTopics = await prisma.knowledgeTopic.findMany({
    include: { lessons: true }
  });

  for (const topic of allTopics) {
    if (topic.lessons.length < 20) {
      console.log(`Removing outdated topic under 20 lessons: "${topic.title}" (Lessons: ${topic.lessons.length})`);
      await prisma.knowledgeLesson.deleteMany({ where: { topicId: topic.id } });
      await prisma.knowledgeTopic.delete({ where: { id: topic.id } });
    }
  }

  console.log("Cleanup complete!");
}

cleanup().catch(console.error).finally(() => prisma.$disconnect());
