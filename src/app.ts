import express, { Express } from "express";
import dotenv from "dotenv";
import client from "./redis";
import pb from "./pocketbase";

dotenv.config();
const app: Express = express();

app.get("/", async (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/posts", async (req, res) => {
  const Posts_TTL = 60;
  try {
    const posts = await client.get("posts"); // get cached posts
    if (!posts) {
      // if no cached posts, get posts from pocketbase
      const result = await pb.collection("posts").getFullList({
        sort: "-created",
      });

      res.status(200).json({ body: result });
      // cache new posts for ttl seconds
      await client.set("posts", JSON.stringify(result));
      await client.expire("posts", Posts_TTL);
      return;
    }
    // if cached posts, return cached posts
    res.status(200).json({ body: JSON.parse(posts) });
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
    return;
  }
});

app.get("/posts/:postid", async (req, res) => {
  const postid = req.params.postid;
  const Post_TTL = 60 * 3;
  try {
    if (!postid) {
      res.status(400).json({ error: "`postid` parameter is required" });
      return;
    }
    // get cached post
    const post = await client.get(`post:${postid}`);
    if (!post) {
      // if no cached post, get post from pocketbase
      const result = await pb.collection("posts").getOne(postid);
      res.status(200).json({ body: result });
      // cache post for ttl seconds
      await client.set(`post:${postid}`, JSON.stringify(result));
      await client.expire(`post:${postid}`, Post_TTL);
      return;
    }
    // if cached post, return cached post
    res.status(200).json({ body: JSON.parse(post) });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
    return;
  }
});

export default app;
