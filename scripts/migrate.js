import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    throw new Error("Missing DATABASE_URL or TURSO_AUTH_TOKEN");
  }

  const client = createClient({
    url,
    authToken,
  });

  console.log("Connected to Turso. Creating ProductVote table...");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS ProductVote (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      productId TEXT NOT NULL,
      type TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
      FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE
    );
  `);

  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS ProductVote_userId_productId_key ON ProductVote(userId, productId);
  `);

  console.log("Migration complete!");
}

main().catch(console.error);
