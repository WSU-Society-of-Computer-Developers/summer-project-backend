import express, { Express } from "express";
import dotenv from "dotenv";
import pb from "./utils/pocketbase";
import client from "./utils/redis";
import { cachedResponseHandler } from "./utils";
import api from "./routing/api";
dotenv.config();
const app: Express = express();

app.use("/api", api);

export default app;
