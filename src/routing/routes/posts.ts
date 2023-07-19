import express from "express";
import pb from "../../utils/pocketbase";
import { cachedResponseHandler } from "../../utils";
const router = express.Router();

router.get("/", async (req, res) => {
  cachedResponseHandler(
    req,
    res,
    "posts",
    () => pb.collection("posts").getFullList({ sort: "-created" }),
    60
  );
});

router.get("/:postid", async (req, res) => {
  const { postid } = req.params;
  cachedResponseHandler(
    req,
    res,
    `post:${postid}`,
    () => pb.collection("posts").getOne(postid),
    60
  );
});

export default router;
