import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.TURSO_AUTH_TOKEN 
      ? `${process.env.DATABASE_URL}?authToken=${process.env.TURSO_AUTH_TOKEN}` 
      : process.env.DATABASE_URL,
  },
});
