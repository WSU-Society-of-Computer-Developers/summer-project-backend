import app from "./app";
import pb from "./utils/pocketbase";
import client from "./utils/redis";

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await pb.admins.authWithPassword(
    process.env.PB_ADMIN_USERNAME,
    process.env.PB_ADMIN_PASSWORD
  ); // sign in as admin
  await client.connect(); // connect to redis server
});
