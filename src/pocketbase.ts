import dotenv from "dotenv";
dotenv.config();
const PocketBase = require("pocketbase/cjs");
const pb = new PocketBase(process.env.PB_URL);
pb.admins.authWithPassword(
  process.env.PB_ADMIN_USERNAME,
  process.env.PB_ADMIN_PASSWORD
);
export default pb;
