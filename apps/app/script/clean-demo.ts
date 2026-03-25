import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });

  if (!user) {
    console.log("Demo user not found — nothing to clean.");
    return;
  }

  await prisma.user.delete({ where: { id: user.id } });
  console.log("Deleted demo user and all associated data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
