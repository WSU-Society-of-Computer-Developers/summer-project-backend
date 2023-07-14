import app from "./app";
import client from "./redis";

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await client.connect();
});
