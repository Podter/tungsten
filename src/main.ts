import { Elysia } from "elysia";
import { env } from "./env";
import fs from "node:fs";
import { api } from "./routes/api";

if (!fs.existsSync(env.DATA_DIR)) {
  fs.mkdirSync(env.DATA_DIR);
}

new Elysia()
  .get("/", () => "Tungsten")
  .use(api)
  .listen(env.PORT, (server) => {
    console.log(`Tungsten running at ${server.url.toString()}`);
  });
