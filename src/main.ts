import { Elysia } from "elysia";
import { env } from "./env";
import fs from "node:fs";
import { api } from "./routes/api";
import { swagger } from "@elysiajs/swagger";
import { video } from "./routes/video";
import { cors } from "@elysiajs/cors";
import { version } from "../package.json";
import logixlysia from "logixlysia";

if (!fs.existsSync(env.DATA_DIR)) {
  fs.mkdirSync(env.DATA_DIR);
}

new Elysia()
  .use(
    logixlysia({
      config: {
        showStartupMessage: false,
        customLogFormat:
          "{now} {level} {duration} {method} {pathname} {status}",
      },
    })
  )
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Tungsten",
          version,
          description: "An API for storing and streaming video",
          contact: {
            name: "Nonthaphat Chaisu",
            email: "hi@podter.me",
            url: "https://podter.me",
          },
          license: {
            name: "MIT",
          },
        },
      },
    })
  )
  .get("/", ({ redirect }) => redirect("/docs"), {
    detail: {
      hide: true,
    },
  })
  .use(api)
  .use(video)
  .listen(env.PORT, (server) => {
    console.log(`Tungsten running at ${server.url.toString()}`);
  });
