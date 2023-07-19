import { Request, Response } from "express";
import client from "./redis";

// TODO: refactor with middlewares
// export async function cachedResponseHandler(req: Request, res: Response, next: any) {
//   const { postid } = req.params;
//   try {
//     const cachedPost = await client.get(`post:${postid}`);
//     if (!cachedPost) {
//       return next();
//     }
//     res.status(200).json({ body: cachedPost });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// }

export async function cachedResponseHandler(
  req: Request,
  res: Response,
  cacheKey: string,
  fetchFn: () => any,
  cacheTTL: number
) {
  try {
    const cachedData = await client.get(cacheKey);
    // if we don't have cached data, refetch and cache it
    if (!cachedData) {
      const data = await fetchFn();
      res.status(200).json({ body: data });
      await client.set(cacheKey, JSON.stringify(data));
      await client.expire(cacheKey, cacheTTL);
      return;
    }
    // if we have cached data, return it
    res.status(200).json({ body: JSON.parse(cachedData) });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
