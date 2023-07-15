import dotenv from "dotenv";
dotenv.config();
const PocketBase = require("pocketbase/cjs");
const pb = new PocketBase(process.env.PB_URL);
export default pb;
