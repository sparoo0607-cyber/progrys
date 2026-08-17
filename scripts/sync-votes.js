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

  console.log("Connected to Turso. Syncing products...");

  // Get all products
  const products = await client.execute(`SELECT id, title, likes, dislikes FROM Product`);
  
  for (const row of products.rows) {
    const productId = row.id;
    const title = row.title;
    const currentLikes = row.likes;
    const currentDislikes = row.dislikes;
    
    // Count exact likes and dislikes
    const likesResult = await client.execute({
      sql: `SELECT COUNT(*) as count FROM ProductVote WHERE productId = ? AND type = 'like'`,
      args: [productId]
    });
    const dislikesResult = await client.execute({
      sql: `SELECT COUNT(*) as count FROM ProductVote WHERE productId = ? AND type = 'dislike'`,
      args: [productId]
    });
    
    const actualLikes = Number(likesResult.rows[0].count);
    const actualDislikes = Number(dislikesResult.rows[0].count);
    
    if (currentLikes !== actualLikes || currentDislikes !== actualDislikes) {
      console.log(`Fixing ${title}: likes ${currentLikes}->${actualLikes}, dislikes ${currentDislikes}->${actualDislikes}`);
      await client.execute({
        sql: `UPDATE Product SET likes = ?, dislikes = ? WHERE id = ?`,
        args: [actualLikes, actualDislikes, productId]
      });
    }
  }
  
  console.log("All products synced perfectly with actual voters!");
}

main().catch(console.error);
