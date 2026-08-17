const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

async function check() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  console.log('DATABASE_URL:', url ? url.substring(0, 30) + '...' : 'MISSING');
  console.log('TURSO_AUTH_TOKEN:', authToken ? 'PRESENT' : 'MISSING');

  if (!url) return;

  const client = createClient({ url, authToken });
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table';");
  console.log('All tables:', tables.rows.map(r => r.name));

  const res = await client.execute("PRAGMA table_info(Product);");
  console.log('Product table columns:', res.rows.map(r => `${r.name} (${r.type})`));
}

check().catch(console.error);
