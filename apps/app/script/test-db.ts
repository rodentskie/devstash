import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  // System item types
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });

  console.log(`✓ System item types (${itemTypes.length}):\n`);
  for (const type of itemTypes) {
    console.log(`  ${type.icon?.padEnd(12)} ${type.name.padEnd(10)} ${type.color}`);
  }

  // Demo user
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    include: {
      collections: {
        include: {
          items: {
            include: { item: { include: { type: true } } },
          },
        },
        orderBy: { name: "asc" },
      },
    },
  });

  if (!user) {
    console.log("\n✗ Demo user not found. Run: TASK=db:seed APP=app pnpm run nx-run");
    return;
  }

  console.log(`\n✓ Demo user: ${user.name} <${user.email}>`);
  console.log(`  isPro: ${user.isPro}  |  emailVerified: ${user.emailVerified?.toISOString().split("T")[0]}`);

  // Collections + items
  console.log(`\n✓ Collections (${user.collections.length}):\n`);
  for (const col of user.collections) {
    const itemCount = col.items.length;
    console.log(`  [${col.name}] — ${col.description} (${itemCount} item${itemCount !== 1 ? "s" : ""})`);
    for (const ci of col.items) {
      const item = ci.item;
      console.log(`    • [${item.type.name.padEnd(8)}] ${item.title}`);
    }
  }

  const totalItems = user.collections.reduce((sum, c) => sum + c.items.length, 0);
  console.log(`\n✓ Total items across all collections: ${totalItems}`);
  console.log("\nConnection OK.");
}

main()
  .catch((e) => {
    console.error("Connection failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
