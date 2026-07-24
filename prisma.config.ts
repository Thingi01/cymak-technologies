// Prisma 7 moved CLI-facing connection config (used by `migrate`, `studio`,
// etc.) out of schema.prisma and into this file. The running app itself
// still connects via the @prisma/adapter-pg driver adapter in lib/prisma.ts
// — this file is only read by the Prisma CLI, not by PrismaClient at runtime.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
