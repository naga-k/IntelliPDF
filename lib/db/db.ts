// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";

// config({ path: ".env.local" }); // or .env.local

// const sql = neon(process.env.DB_URL!);
// export const db = drizzle(sql);


import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
// neonConfig.fetchConnectionCache = true

if (!process.env.DB_URL) {
  throw new Error('DB URL NOT FOUND')
}

const sql = neon(process.env.DB_URL!)

export const db = drizzle(sql as any)