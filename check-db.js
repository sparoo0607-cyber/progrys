const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1,
  });
  
  if (products.length > 0) {
    const p = products[0];
    console.log("Title:", p.title);
    console.log("Has downloadFileUrl:", !!p.downloadFileUrl);
    if (p.downloadFileUrl) {
      console.log("Prefix:", p.downloadFileUrl.substring(0, 50));
    }
  } else {
    console.log("No products found.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
