// pages/index.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/users"),
        ]);

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();

        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Next.js + Prisma + MongoDB Atlas Blog</title>
        <meta
          name="description"
          content="A blog built with Next.js, Prisma, and MongoDB"
        />
      </Head>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <header style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ color: "#333", marginBottom: "10px" }}>
            Docker + Production + Next.js + Prisma + MongoDB Atlas
          </h1>
          <p style={{ color: "#666" }}>
            A full-stack application with Docker containerization
          </p>
        </header>

        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              color: "#333",
              borderBottom: "2px solid #0070f3",
              paddingBottom: "10px",
            }}
          >
            Recent Posts
          </h2>
          {posts?.length === 0 ? (
            <p style={{ color: "#666", fontStyle: "italic" }}>No posts found</p>
          ) : (
            <div>
              {posts?.map((post) => (
                <article
                  key={post.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h3 style={{ color: "#333", marginBottom: "10px" }}>
                    {post.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.6",
                      marginBottom: "15px",
                    }}
                  >
                    {post.content}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.9em",
                      color: "#888",
                    }}
                  >
                    <span>By {post.author.name}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2
            style={{
              color: "#333",
              borderBottom: "2px solid #0070f3",
              paddingBottom: "10px",
            }}
          >
            Authors
          </h2>
          {users.length === 0 ? (
            <p style={{ color: "#666", fontStyle: "italic" }}>No users found</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h4 style={{ color: "#333", marginBottom: "5px" }}>
                    {user.name}
                  </h4>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "0.9em",
                      marginBottom: "10px",
                    }}
                  >
                    {user.email}
                  </p>
                  <p style={{ color: "#888", fontSize: "0.8em" }}>
                    {user._count.posts} post{user._count.posts !== 1 ? "s" : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer
          style={{
            marginTop: "60px",
            textAlign: "center",
            color: "#888",
            fontSize: "0.9em",
          }}
        >
          <p>Built with Next.js, Prisma, MongoDB Atlas, and Docker</p>
        </footer>
      </div>
    </>
  );
}
