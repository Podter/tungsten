import { Elysia } from "elysia";
import { env } from "./env";

new Elysia()
  .get("/", () => "Hello Elysia")
  .listen(env.PORT, (server) => {
    console.log(`Tungsten running at ${server.url.toString()}`);
  });
