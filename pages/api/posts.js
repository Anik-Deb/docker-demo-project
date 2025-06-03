// pages/api/posts.js
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content, authorId } = req.body;

      if (!title || !content || !authorId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
          published: true,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
