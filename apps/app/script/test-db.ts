import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });

  console.log(`Connected! Found ${itemTypes.length} system item types:\n`);

  for (const type of itemTypes) {
    console.log(`  ${type.icon?.padEnd(12)} ${type.name.padEnd(10)} ${type.color}`);
  }
}

main()
  .catch((e) => {
    console.error("Connection failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
