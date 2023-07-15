import express from "express";
import posts from "./routes/posts";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ body: "OK" });
});

router.use("/posts", posts);

export default router;
