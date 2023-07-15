import express from "express";
import pb from "../../utils/pocketbase";
import { cachedResponseHandler } from "../../utils";

const router = express.Router();

router.get("/", (req, res) => {
  const usersTTL = 60 * 2;
  cachedResponseHandler(
    req,
    res,
    "users",
    () => pb.collection("users").getFullList({ sort: "-created" }),
    usersTTL
  );
});

export default router;
