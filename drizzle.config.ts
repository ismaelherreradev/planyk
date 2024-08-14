import { env } from "@/env";
import { type Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["planyk_*"],
} satisfies Config;
