const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function main() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  
  const prisma = new PrismaClient({ adapter });

  try {
    const user = await prisma.user.findUnique({
      where: { email: 'nithinreddyjeeru@gmail.com' }
    });
    console.log(user);
    
    // if not admin, make them admin
    if (user && user.role !== 'admin') {
      await prisma.user.update({
        where: { email: 'nithinreddyjeeru@gmail.com' },
        data: { role: 'admin' }
      });
      console.log('User role updated to admin');
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
