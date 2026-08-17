const { PrismaClient } = require('@prisma/client');
const Database = require('better-sqlite3');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL.replace('file:', '');
const db = new Database(connectionString);
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
