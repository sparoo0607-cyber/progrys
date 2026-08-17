import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { MOCK_AFFILIATES } from './lib/data/affiliates';
import { MOCK_ROADMAPS } from './lib/data/roadmaps';
import { MOCK_TOPICS } from './lib/data/knowledge';

async function main() {
  const { prisma } = await import('./lib/prisma');
  console.log("Seeding data...");

  // Seed Affiliates
  for (const item of MOCK_AFFILIATES) {
    await prisma.affiliateProduct.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        originalPrice: item.originalPrice,
        imageUrl: item.imageUrl,
        url: item.url,
        platform: item.platform,
        category: item.category,
        rating: item.rating,
        reviewCount: item.reviewCount,
      }
    });
  }
  console.log("Affiliates seeded");

  // Seed Roadmaps
  for (const roadmap of MOCK_ROADMAPS) {
    await prisma.roadmap.upsert({
      where: { slug: roadmap.slug },
      update: {},
      create: {
        id: roadmap.id,
        slug: roadmap.slug,
        title: roadmap.title,
        description: roadmap.description,
        difficulty: roadmap.difficulty,
        estimatedTime: roadmap.estimatedTime,
        nodes: {
          create: roadmap.nodes.map(node => ({
            title: node.title,
            description: node.description,
          }))
        }
      }
    });
  }
  console.log("Roadmaps seeded");

  // Seed Knowledge Hub
  for (const topic of MOCK_TOPICS) {
    await prisma.knowledgeTopic.upsert({
      where: { slug: topic.slug },
      update: {},
      create: {
        id: topic.id,
        slug: topic.slug,
        title: topic.title,
        description: topic.description,
        iconName: topic.iconName,
        lessons: {
          create: topic.lessons.map(lesson => ({
            slug: lesson.slug,
            title: lesson.title,
            explanationHtml: lesson.explanationHtml,
            codeExample: lesson.codeExample,
            tryItDefault: lesson.tryItDefault,
          }))
        }
      }
    });
  }
  console.log("Knowledge Hub seeded");
  await prisma.$disconnect();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
