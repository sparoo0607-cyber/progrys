const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const res = await client.execute({
    sql: "UPDATE Product SET downloadFileName = ?, downloadFileUrl = ?, downloadFileSize = ?, downloadFileType = ? WHERE slug = ?",
    args: [
      "Progrys-HabitTracker-Setup.exe",
      "/downloads/Progrys-HabitTracker-Setup.exe",
      18213265,
      "application/x-msdownload",
      "progrys-habit-tracker"
    ]
  });

  console.log("Updated rows:", res.rowsAffected);

  const check = await client.execute("SELECT id, title, slug, downloadFileName, downloadFileUrl, downloadFileSize FROM Product WHERE slug = 'progrys-habit-tracker';");
  console.log("Updated Product:", JSON.stringify(check.rows, null, 2));
}

main().catch(console.error);
