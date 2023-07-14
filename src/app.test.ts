import assert from "assert";
import app from "./app";

import request from "supertest";
import client from "./redis";

describe("GET /", () => {
  beforeAll(async () => {
    await client.connect();
  });
  // afterAll(async () => {
  //   await client.disconnect();
  // });
  // TODO: make redis connection teardown work
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("Hello World");
  });

  it("should return posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    const posts = res.body.body;
    expect(posts).toHaveProperty("length");
    if (posts.length > 0) {
      // all these properties are fields within the posts collection from pb
      expect(posts[0]).toHaveProperty("title");
      expect(posts[0]).toHaveProperty("content");
      expect(posts[0]).toHaveProperty("created");
      expect(posts[0]).toHaveProperty("updated");
      expect(posts[0]).toHaveProperty("id");
      expect(posts[0]).toHaveProperty("author");
    }
  });
});
