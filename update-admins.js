import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  try {
    // 1. Remove previous admin
    const oldAdminEmail = 'nithinreddyjeeru@gmail.com';
    const oldAdmin = await prisma.user.findUnique({ where: { email: oldAdminEmail } });
    if (oldAdmin) {
      await prisma.user.update({
        where: { email: oldAdminEmail },
        data: { role: 'user' }
      });
      console.log(`Demoted ${oldAdminEmail} to user.`);
    }

    // Helper to create or update admin
    async function upsertAdmin(email, password, firstName, lastName) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        await prisma.user.update({
          where: { email },
          data: { role: 'admin', passwordHash }
        });
        console.log(`Updated existing user ${email} to admin and updated password.`);
      } else {
        await prisma.user.create({
          data: {
            email,
            passwordHash,
            firstName,
            lastName,
            role: 'admin'
          }
        });
        console.log(`Created new admin user ${email}.`);
      }
    }

    // 2. Add Admin 1
    await upsertAdmin('karthikjeeru18@gmail.com', 'jkr@123#', 'Karthik', 'Jeeru');

    // 3. Add Admin 2
    await upsertAdmin('admin@progrys.com', 'password', 'Admin', 'Progrys');

    console.log("Admin updates completed successfully.");
  } catch (err) {
    console.error("Error updating admins:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
