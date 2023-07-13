import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
