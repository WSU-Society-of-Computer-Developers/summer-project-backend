import express, { Express } from "express";
import dotenv from "dotenv";
import api from "./routing/api";

dotenv.config();
const app: Express = express();

app.use("/api", api);
export default app;
