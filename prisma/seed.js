// prisma/seed.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create users
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Johnson",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob Smith",
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: "Getting Started with Next.js and Prisma",
      content:
        "This is a comprehensive guide on building modern web applications with Next.js and Prisma. We'll cover database setup, API routes, and more.",
      published: true,
      authorId: alice.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "MongoDB with Prisma: A Perfect Match",
      content:
        "Learn how to leverage MongoDB's flexibility with Prisma's type-safe database access. This combination provides excellent developer experience.",
      published: true,
      authorId: bob.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "Docker for Full-Stack Development",
      content:
        "Containerizing your Next.js application with Docker makes deployment and development environment setup much easier and more consistent.",
      published: false,
      authorId: alice.id,
    },
  });

  console.log("Seed completed successfully!");
  console.log(`Created users: ${alice.name}, ${bob.name}`);
  console.log(`Created ${3} posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
