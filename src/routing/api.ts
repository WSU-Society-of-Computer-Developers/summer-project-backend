import express from "express";
import posts from "./routes/posts";
import users from "./routes/users";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ body: "OK" });
});

router.use("/posts", posts);
router.use("/users", users);

export default router;
