import express from "express";
import posts from "./routes/posts";
import users from "./routes/users";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ body: "OK" });
});

router.use("/posts", posts);
router.use("/users", users);

export default router;
