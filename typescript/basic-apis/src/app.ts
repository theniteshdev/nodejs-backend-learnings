import http from "http";
import { connectDB, getDB } from "./db";
import { ObjectId } from "mongodb";
import { Post } from "./models/post.ts";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const db = getDB();
  const posts = db.collection("posts");
  const url = req.url || "";
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  // GET /posts
  if (url === "/posts" && method === "GET") {
    const allPosts = await posts.find({}).toArray();
    res.end(JSON.stringify(allPosts));
  }

  // POST /posts
  else if (url === "/posts" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const data = JSON.parse(body);
      const newPost: Post = { ...data, createdAt: new Date() };
      await posts.insertOne(newPost);
      res.writeHead(201);
      res.end(JSON.stringify(newPost));
    });
  }

  // DELETE /posts/:id
  else if (url.startsWith("/posts/") && method === "DELETE") {
    const id = url.split("/")[2];
    await posts.deleteOne({ _id: new ObjectId(id) });
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
