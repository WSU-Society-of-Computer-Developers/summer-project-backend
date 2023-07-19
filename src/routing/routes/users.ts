import express from "express";
import pb from "../../utils/pocketbase";
import { cachedResponseHandler } from "../../utils";
const router = express.Router();
router.get("/", async (req, res) => {
  // TODO: filter out sensitive information like email
  cachedResponseHandler(
    req,
    res,
    "users",
    () => pb.collection("users").getFullList({ sort: "-created" }),
    120
  );
});

export default router;
