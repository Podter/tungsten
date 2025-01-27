import { Elysia } from "elysia";
import { env } from "./env";
import fs from "node:fs";

if (!fs.existsSync(env.DATA_DIR)) {
  fs.mkdirSync(env.DATA_DIR);
}

new Elysia()
  .get("/", () => "Hello Elysia")
  .listen(env.PORT, (server) => {
    console.log(`Tungsten running at ${server.url.toString()}`);
  });
