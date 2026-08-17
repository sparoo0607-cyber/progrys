const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const res = await client.execute("SELECT id, title, slug, downloadFileName, downloadFileSize, LENGTH(downloadFileUrl) as fileUrlLength, SUBSTR(downloadFileUrl, 1, 30) as fileUrlPrefix FROM Product;");
  console.log("Products in DB:", JSON.stringify(res.rows, null, 2));
}

main().catch(console.error);
