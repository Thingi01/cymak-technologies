/**
 * Creates (or updates) the first admin user from environment variables.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Reads ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME from .env (or the shell env).
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running the seed script.");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("ADMIN_PASSWORD should be at least 8 characters.");
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: { passwordHash, name },
    create: { email: email.toLowerCase(), passwordHash, name, role: "ADMIN" },
  });

  console.log(`✔ Admin user ready: ${user.email} (id: ${user.id})`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
