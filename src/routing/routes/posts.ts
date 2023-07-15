import express from "express";
import { cachedResponseHandler } from "../../utils";
import pb from "../../utils/pocketbase";

const router = express.Router();

router.get("/", (req, res) => {
  const postsTTL = 60;
  cachedResponseHandler(
    req,
    res,
    "posts",
    () => pb.collection("posts").getFullList({ sort: "-created" }),
    60
  );
});

router.get("/:postid", async (req, res) => {
  const postid = req.params.postid;
  const postTTL = 60 * 2;
  if (!postid) {
    res.status(400).json({ error: "`postid` parameter is required" });
    return;
  }
  cachedResponseHandler(
    req,
    res,
    `post-${postid}`,
    () => pb.collection("posts").getOne(postid),
    postTTL
  );
});

export default router;
