import assert from "assert";
import app from "./app";

import request from "supertest";

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Hello World");
  });
});
