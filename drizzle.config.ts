import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    // authToken: env.TURSO_AUTH_TOKEN
  },
  tablesFilter: ["planyk_*"],
});
