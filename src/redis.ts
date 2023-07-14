import { createClient } from "redis";
// https://redis.io/docs/clients/nodejs/

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

const client = createClient({ url });

export default client;
