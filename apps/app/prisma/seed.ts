import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// ─── System Item Types ────────────────────────────────────────────────────────

const SYSTEM_ITEM_TYPES = [
  { name: "snippet", icon: "Code",       color: "#3b82f6" },
  { name: "prompt",  icon: "Sparkles",   color: "#8b5cf6" },
  { name: "command", icon: "Terminal",   color: "#f97316" },
  { name: "note",    icon: "StickyNote", color: "#fde047" },
  { name: "file",    icon: "File",       color: "#6b7280" },
  { name: "image",   icon: "Image",      color: "#ec4899" },
  { name: "link",    icon: "Link",       color: "#10b981" },
];

// ─── Seed Data ────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    items: [
      {
        type: "snippet",
        title: "useDebounce Hook",
        contentType: "text",
        language: "typescript",
        isPinned: true,
        isFavorite: true,
        content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
        description: "Delays updating a value until after a specified delay",
      },
      {
        type: "snippet",
        title: "useLocalStorage Hook",
        contentType: "text",
        language: "typescript",
        content: `import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}`,
        description: "Sync state with localStorage with type safety",
      },
      {
        type: "snippet",
        title: "Context Provider Pattern",
        contentType: "text",
        language: "typescript",
        isFavorite: true,
        content: `import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`,
        description: "Typed context provider with custom hook",
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        type: "prompt",
        title: "Code Review Prompt",
        contentType: "text",
        isPinned: true,
        isFavorite: true,
        content: `You are a senior software engineer performing a code review. Analyze the following code and provide feedback on:

1. **Correctness** — Does it work as intended? Are there edge cases?
2. **Performance** — Any unnecessary re-renders, N+1 queries, or inefficiencies?
3. **Security** — Input validation, auth checks, injection risks?
4. **Readability** — Is it clear and maintainable?
5. **Patterns** — Does it follow project conventions?

Be direct. Prioritize critical issues. Suggest specific improvements with examples.

Code to review:
\`\`\`
{{code}}
\`\`\``,
        description: "Structured prompt for thorough code reviews",
      },
      {
        type: "prompt",
        title: "Documentation Generator",
        contentType: "text",
        content: `Generate clear, concise documentation for the following code. Include:

- **Purpose**: What this code does in one sentence
- **Parameters/Props**: Name, type, description, required/optional
- **Returns**: What it returns and when
- **Example**: A minimal usage example
- **Notes**: Edge cases, gotchas, or important behaviour

Keep it developer-friendly. No filler. Use markdown.

Code:
\`\`\`
{{code}}
\`\`\``,
        description: "Auto-generate docs for functions, components, and APIs",
      },
      {
        type: "prompt",
        title: "Refactoring Assistant",
        contentType: "text",
        content: `Refactor the following code to improve quality without changing behaviour.

Focus on:
- Removing duplication (DRY)
- Simplifying complex logic
- Improving naming for clarity
- Splitting large functions
- Applying relevant design patterns

Show the refactored version with a brief explanation of each change.

Original code:
\`\`\`
{{code}}
\`\`\``,
        description: "Step-by-step refactoring with explanations",
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        type: "snippet",
        title: "Docker Compose — Next.js + PostgreSQL",
        contentType: "text",
        language: "yaml",
        isFavorite: true,
        content: `version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/devstash
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: devstash
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:`,
        description: "Local dev stack with Next.js app and PostgreSQL",
      },
      {
        type: "command",
        title: "Deploy to Production",
        contentType: "text",
        content: `#!/bin/bash
set -e

echo "Running migrations..."
npx prisma migrate deploy

echo "Building app..."
npm run build

echo "Restarting service..."
pm2 restart devstash

echo "Deploy complete."`,
        description: "Production deploy script: migrate, build, restart",
      },
      {
        type: "link",
        title: "Prisma Migrations Docs",
        contentType: "url",
        url: "https://www.prisma.io/docs/orm/prisma-migrate/getting-started",
        description: "Official guide to Prisma Migrate",
      },
      {
        type: "link",
        title: "Docker Compose Reference",
        contentType: "url",
        url: "https://docs.docker.com/compose/compose-file/",
        description: "Complete Docker Compose file reference",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        type: "command",
        title: "Git — Undo Last Commit (keep changes)",
        contentType: "text",
        isPinned: true,
        content: "git reset --soft HEAD~1",
        description: "Undo the last commit while keeping changes staged",
      },
      {
        type: "command",
        title: "Docker — Remove All Stopped Containers",
        contentType: "text",
        content: "docker container prune -f",
        description: "Clean up all stopped containers in one command",
      },
      {
        type: "command",
        title: "Find & Kill Process on Port",
        contentType: "text",
        content: "lsof -ti tcp:3000 | xargs kill -9",
        description: "Kill whatever is running on port 3000",
      },
      {
        type: "command",
        title: "pnpm — Clean Install",
        contentType: "text",
        content: "rm -rf node_modules pnpm-lock.yaml && pnpm install",
        description: "Wipe node_modules and lock file, then reinstall",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        type: "link",
        title: "Tailwind CSS Docs",
        contentType: "url",
        url: "https://tailwindcss.com/docs",
        description: "Official Tailwind CSS documentation",
      },
      {
        type: "link",
        title: "shadcn/ui Components",
        contentType: "url",
        url: "https://ui.shadcn.com/docs/components",
        description: "Beautifully designed components built with Radix and Tailwind",
      },
      {
        type: "link",
        title: "Radix UI Primitives",
        contentType: "url",
        url: "https://www.radix-ui.com/primitives/docs/overview/introduction",
        description: "Accessible, unstyled UI primitives for React",
      },
      {
        type: "link",
        title: "Lucide Icons",
        contentType: "url",
        url: "https://lucide.dev/icons/",
        description: "Open source icon library used throughout this project",
      },
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // 1. System item types
  console.log("Seeding system item types...");
  const typeMap: Record<string, string> = {};

  for (const type of SYSTEM_ITEM_TYPES) {
    let record = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true },
    });

    if (!record) {
      record = await prisma.itemType.create({
        data: { ...type, isSystem: true },
      });
      console.log(`  Created: ${type.name}`);
    } else {
      console.log(`  Exists:  ${type.name}`);
    }

    typeMap[type.name] = record.id;
  }

  // 2. Demo user
  console.log("\nSeeding demo user...");

  let user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });

  if (!user) {
    const passwordHash = await bcrypt.hash("12345678", 12);
    user = await prisma.user.create({
      data: {
        email: "demo@devstash.io",
        name: "Demo User",
        password: passwordHash,
        isPro: false,
        emailVerified: new Date(),
      },
    });
    console.log(`  Created: ${user.email}`);
  } else {
    console.log(`  Exists:  ${user.email}`);
  }

  // 3. Collections and items
  console.log("\nSeeding collections and items...");

  for (const col of COLLECTIONS) {
    let collection = await prisma.collection.findFirst({
      where: { name: col.name, userId: user.id },
    });

    if (!collection) {
      collection = await prisma.collection.create({
        data: { name: col.name, description: col.description, isFavorite: col.isFavorite ?? false, userId: user.id },
      });
      console.log(`  Created collection: ${collection.name}`);
    } else {
      console.log(`  Exists  collection: ${collection.name}`);
      continue; // skip items if collection already seeded
    }

    for (const itemDef of col.items) {
      const { type, ...itemData } = itemDef;
      const typeId = typeMap[type];

      const item = await prisma.item.create({
        data: { ...itemData, userId: user.id, typeId },
      });

      await prisma.collectionItem.create({
        data: { collectionId: collection.id, itemId: item.id },
      });

      console.log(`    Item: ${item.title}`);
    }
  }

  console.log("\nDone.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
