require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

async function main() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  
  const prisma = new PrismaClient({ adapter });

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

main().catch(console.error).finally(() => process.exit(0));
