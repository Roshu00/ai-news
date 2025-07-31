// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

// Check if we should use Neon adapter
const useNeonAdapter =
  process.env.NODE_ENV === "production" &&
  process.env.DATABASE_URL &&
  !process.env.NEXT_PHASE?.includes("build");

function createPrismaClient(): PrismaClient {
  if (useNeonAdapter) {
    try {
      const { Pool, neonConfig } = require("@neondatabase/serverless");
      const { PrismaNeon } = require("@prisma/adapter-neon");
      const ws = require("ws");

      neonConfig.webSocketConstructor = ws;
      const connectionString = process.env.DATABASE_URL!;
      const pool = new Pool({ connectionString });
      const adapter = new PrismaNeon(pool);

      return new PrismaClient({ adapter });
    } catch (error) {
      console.warn("Neon adapter failed, using standard client:", error);
      return new PrismaClient();
    }
  }

  return new PrismaClient();
}

export const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
