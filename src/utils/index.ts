import { Request, Response } from "express";
import client from "./redis";

/**
 * Cached response handler for GET requests
 * @param req Express request object
 * @param cacheKey The key to use for caching in redis
 * @param fetchFn data fetching function
 * @param cacheTTL cache time-to-live in seconds
 * @returns sends response to client
 * @example ```ts
 * app.get("/", (req,res) =>
 *    cachedResponseHandler(req,res,
 *      "users",
 *      () => pb.collection("users").getFullList({ sort: "-created" }),
 *      60 * 2
 *    )
 * );
 * ```
 */
export async function cachedResponseHandler(
  req: Request,
  res: Response,
  cacheKey: string,
  fetchFn: () => any,
  cacheTTL: number
) {
  try {
    const cachedData = await client.get(cacheKey);
    // if no cached data, refetch new data and cache it
    if (!cachedData) {
      const result = await fetchFn();
      res.status(200).json({ body: result });
      // cache new data for ttl seconds
      await client.set(cacheKey, JSON.stringify(result));
      await client.expire(cacheKey, cacheTTL);
      return;
    }
    // if cached data, return cached data
    res.status(200).json({ body: JSON.parse(cachedData) });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
