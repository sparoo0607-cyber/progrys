
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaLibSql({ 
  url: process.env.DATABASE_URL || "", 
  authToken: process.env.TURSO_AUTH_TOKEN || "" 
});
const prisma = new PrismaClient({ adapter });

async function seedRoadmaps() {
  const dataDir = path.join(process.cwd(), "scripts", "data");
  if (!fs.existsSync(dataDir)) return;
  
  const files = fs.readdirSync(dataDir).filter(f => f.startsWith("roadmaps_") && f.endsWith(".json"));
  
  for (const file of files) {
    console.log(`Seeding roadmaps from ${file}...`);
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
    
    for (const roadmap of data) {
      const { slug, title, description, difficulty, estimatedTime, nodes } = roadmap;
      
      const existing = await prisma.roadmap.findUnique({ where: { slug } });
      if (existing) {
        await prisma.roadmapNode.deleteMany({ where: { roadmapId: existing.id } });
      }

      await prisma.roadmap.upsert({
        where: { slug },
        update: {
          title, description, difficulty, estimatedTime,
          nodes: {
            create: nodes.map((node: any) => ({
              title: node.title,
              description: node.description
            }))
          }
        },
        create: {
          slug, title, description, difficulty, estimatedTime,
          nodes: {
            create: nodes.map((node: any) => ({
              title: node.title,
              description: node.description
            }))
          }
        }
      });
      console.log(`- Upserted roadmap: ${title}`);
    }
  }
}

async function seedKnowledgeHub() {
  const dataDir = path.join(process.cwd(), "scripts", "data");
  if (!fs.existsSync(dataDir)) return;

  const files = fs.readdirSync(dataDir).filter(f => f.startsWith("knowledge_") && f.endsWith(".json"));

  for (const file of files) {
    console.log(`Seeding knowledge topics from ${file}...`);
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));

    for (const topic of data) {
      const { slug, title, description, iconName, lessons } = topic;
      
      const existing = await prisma.knowledgeTopic.findUnique({ where: { slug } });
      if (existing) {
        await prisma.knowledgeLesson.deleteMany({ where: { topicId: existing.id } });
      }

      await prisma.knowledgeTopic.upsert({
        where: { slug },
        update: {
          title, description, iconName,
          lessons: {
            create: lessons.map((lesson: any) => ({
              slug: lesson.slug,
              title: lesson.title,
              explanationHtml: lesson.explanationHtml,
              codeExample: lesson.codeExample || "",
              tryItDefault: lesson.tryItDefault || null
            }))
          }
        },
        create: {
          slug, title, description, iconName,
          lessons: {
            create: lessons.map((lesson: any) => ({
              slug: lesson.slug,
              title: lesson.title,
              explanationHtml: lesson.explanationHtml,
              codeExample: lesson.codeExample || "",
              tryItDefault: lesson.tryItDefault || null
            }))
          }
        }
      });
      console.log(`- Upserted knowledge topic: ${title}`);
    }
  }
}

async function main() {
  console.log("Starting seed process...");
  await seedRoadmaps();
  await seedKnowledgeHub();
  console.log("Seed complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});

