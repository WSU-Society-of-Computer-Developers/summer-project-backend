// import express from "express";
// import pb from "../../utils/pocketbase";
// import { cachedResponseHandler } from "../../utils";

// const router = express.Router();

// router.get("/", (req, res) => {
//   const usersTTL = 60 * 2;
//   cachedResponseHandler(
//     req,
//     res,
//     "users",
//     () => pb.collection("users").getFullList({ sort: "-created" }),
//     usersTTL
//   );
// });

// export default router;

import express from "express";
import pb from "../../utils/pocketbase";
import { cacheMiddleware } from "../../utils";
import { Request, Response } from "express-serve-static-core";
import client from "../../utils/redis";

const router = express.Router();

router.get("/", [cacheMiddleware({ key: 'users', base: true, id: false })], async (req: Request, res: Response) => {
  try {
    const usersTTL = 60 * 2;
    const result = await pb.collection("users").getFullList({ sort: "-created" })
    res.status(200).json({ body: result });
    // cache new data for ttl seconds
    await client.set(req.params.cacheKey, JSON.stringify(result));
    await client.expire(req.params.cacheKey, usersTTL);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
},);

export default router;