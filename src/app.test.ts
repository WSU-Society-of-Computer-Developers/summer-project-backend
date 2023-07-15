import app from "./app";

import request from "supertest";
import client from "./utils/redis";
import pb from "./utils/pocketbase";

// TODO: move each route test to its own file

describe("GET /", () => {
  beforeAll(async () => {
    await client.connect();
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_USERNAME,
      process.env.PB_ADMIN_PASSWORD
    );
  });
  // afterAll(async () => {
  //   await client.disconnect();
  // });
  // TODO: make redis connection teardown work
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
      // all these properties are fields within the posts collection from pb
      expect(posts[0]).toHaveProperty("title");
      expect(posts[0]).toHaveProperty("content");
      expect(posts[0]).toHaveProperty("created");
      expect(posts[0]).toHaveProperty("updated");
      expect(posts[0]).toHaveProperty("id");
      expect(posts[0]).toHaveProperty("author");
    }
  });

  it("should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    const users = res.body.body;
    expect(users).toHaveProperty("length");
    if (users.length > 0) {
      // all these properties are fields within the users collection from pb
      expect(users[0]).toHaveProperty("username");
      expect(users[0]).toHaveProperty("email");
      expect(users[0]).toHaveProperty("created");
      expect(users[0]).toHaveProperty("updated");
      expect(users[0].collectionId).toBe("_pb_users_auth_");
      expect(users[0]).toHaveProperty("id");
    }
  });
});
