// import Pocketbase from "pocketbase";
import dotenv from "dotenv";
dotenv.config();
const Pocketbase = require("pocketbase/cjs");
const pb = new Pocketbase(process.env.PB_URL);
export default pb;
