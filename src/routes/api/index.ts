import { Elysia, t } from "elysia";
import { video } from "./video";
import { storage } from "~/lib/storage";
import path from "node:path";
import { VideoDataSchema, VideoNameSchema } from "~/lib/schema";

export const api = new Elysia({
  prefix: "/api",
  tags: ["API"],
})
  .use(video)
  .post(
    "/upload",
    async ({ error, body }) => {
      if (!body.file.type.startsWith("video/")) {
        return error(400, {
          error: "Invalid file type",
        });
      }

      const type = path.extname(body.file.name).slice(1);
      const name = body.name ?? body.file.name.slice(0, -type.length - 1);

      const { id } = await storage.add({
        name,
        type,
        data: body.file,
      });

      return {
        id,
        name,
        type,
      };
    },
    {
      body: t.Object({
        file: t.File({
          description: "Video file",
        }),
        name: t.Optional(VideoNameSchema),
      }),
      detail: {
        description: "Upload a video file",
      },
      response: {
        200: VideoDataSchema,
        400: t.Object({
          error: t.Literal("Invalid file type"),
        }),
      },
    }
  )
  .post(
    "/download",
    ({ error }) => {
      return error(501, {
        error: "Not implemented",
      });
    },
    {
      body: t.Object({
        url: t.String({
          description: "Video URL (including YouTube, TikTok, etc.)",
          examples: [
            "http://example.com/video.mp4",
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          ],
        }),
        name: t.Optional(VideoNameSchema),
      }),
      detail: {
        description: "Download a video file, and save it to the server",
      },
      response: {
        200: VideoDataSchema,
        501: t.Object({
          error: t.Literal("Not implemented"),
        }),
      },
    }
  );
