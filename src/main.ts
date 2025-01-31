import { Elysia } from "elysia";
import { env } from "./env";
import fs from "node:fs";
import { api } from "./routes/api";
import { swagger } from "@elysiajs/swagger";
import { video } from "./routes/video";
import { cors } from "@elysiajs/cors";
import { version, description, author, license } from "../package.json";
import logixlysia from "logixlysia";
import { others } from "./routes/others";

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
          description,
          contact: author,
          license: {
            name: license,
          },
        },
        tags: [
          {
            name: "API",
            description: "API for video operations",
          },
          {
            name: "Video",
            description: "Serve or stream the video",
          },
          {
            name: "Others",
            description: "Other routes",
          },
        ],
      },
      exclude: ["/"],
    })
  )
  .get("/", ({ redirect }) => redirect("/docs"))
  .use(api)
  .use(video)
  .use(others)
  .listen(env.PORT, (server) => {
    console.log(`Tungsten running at ${server.url.toString()}`);
  });
