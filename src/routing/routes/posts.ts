// import express from "express";
// import { cachedResponseHandler } from "../../utils";
// import pb from "../../utils/pocketbase";

// const router = express.Router();

// router.get("/", (req, res) => {
//   const postsTTL = 60;
//   cachedResponseHandler(
//     req,
//     res,
//     "posts",
//     () => pb.collection("posts").getFullList({ sort: "-created" }),
//     60
//   );
// });

// router.get("/:postid", async (req, res) => {
//   const postid = req.params.postid;
//   const postTTL = 60 * 2;
//   if (!postid) {
//     res.status(400).json({ error: "`postid` parameter is required" });
//     return;
//   }
//   cachedResponseHandler(
//     req,
//     res,
//     `post-${postid}`,
//     () => pb.collection("posts").getOne(postid),
//     postTTL
//   );
// });

// export default router;

import express from "express";
import { cacheMiddleware, } from "../../utils";
import { Request, Response, NextFunction } from "express";
import pb from "../../utils/pocketbase";
import client from "../../utils/redis";
const router = express.Router();

router.get("/", [cacheMiddleware({ key: 'posts', base: true, id: false })], async (req: Request, res: Response) => {
  const postsTTL = 60;
  const data = await pb.collection("posts").getFullList({ sort: "-created" });
  res.status(200).json({ body: data });
  await client.set(req.params.cacheKey, JSON.stringify(data));
  await client.expire(req.params.cacheKey, postsTTL);
});

router.get("/:id", [cacheMiddleware({ key: 'posts', base: true, id: false })],
  async (req: Request, res: Response) => {
    if (!(JSON.parse(req.params.idIsValid) as Boolean)) {
      res.status(400).json({ error: "`postid` parameter is required" });
      return;
    }
    const postid = req.params.id;
    const postTTL = 60 * 2;
    const data = pb.collection("posts").getOne(postid);
    await client.set(req.params.cacheKey, JSON.stringify(data))
    await client.expire(req.params.cacheKey, postTTL);
  });

export default router;

