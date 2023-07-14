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
    const posts = await client.get("posts");
    if (!posts) {
      const result = await pb.collection("posts").getFullList({
        sort: "-created",
      });

      res.status(200).json({ body: result });
      await client.set("posts", JSON.stringify(result));
      await client.expire("posts", Posts_TTL);
      return;
    }
    res.status(200).json({ body: JSON.parse(posts) });
    return;
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
    return;
  }
});

export default app;
