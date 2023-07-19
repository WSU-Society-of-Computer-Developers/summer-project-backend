import assert from "assert";
import app from "./app";

import request from "supertest";
import client from "./utils/redis";
import pb from "./utils/pocketbase";

describe("GET /", () => {
  beforeAll(async () => {
    await client.connect();
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_USERNAME,
      process.env.PB_ADMIN_PASSWORD
    );
  });

  it("should return 200 OK", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.body).toEqual("OK");
  });

  it("should return all posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    const posts = res.body.body;
    expect(posts).toHaveProperty("length");
    if (posts.length > 0) {
      expect(posts[0]).toHaveProperty("title");
      expect(posts[0]).toHaveProperty("content");
      expect(posts[0]).toHaveProperty("created");
      expect(posts[0]).toHaveProperty("author");
      expect(posts[0]).toHaveProperty("id");
      expect(posts[0]).toHaveProperty("updated");
    }
  });

  it("should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    const users = res.body.body;
    expect(users).toHaveProperty("length");
    if (users.length > 0) {
      expect(users[0]).toHaveProperty("username");
      expect(users[0]).toHaveProperty("email");
      expect(users[0]).toHaveProperty("created");
      expect(users[0]).toHaveProperty("name");
      expect(users[0]).toHaveProperty("id");
      expect(users[0]).toHaveProperty("updated");
    }
  });
});
