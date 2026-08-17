import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaLibSql({ 
  url: process.env.DATABASE_URL || "", 
  authToken: process.env.TURSO_AUTH_TOKEN || "" 
});
const prisma = new PrismaClient({ adapter });

async function check() {
  const topics = await prisma.knowledgeTopic.findMany({
    include: { lessons: true }
  });
  console.log("TOTAL TOPICS IN DATABASE:", topics.length);
  topics.forEach(t => {
    console.log(`Topic Title: "${t.title}" | Slug: "${t.slug}" | Lessons Count: ${t.lessons.length}`);
  });
}

check().catch(console.error).finally(() => prisma.$disconnect());
