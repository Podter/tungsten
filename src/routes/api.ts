import { Elysia, t } from "elysia";

export const api = new Elysia({
  prefix: "/api",
  tags: ["API"],
})
  .get(
    "/video/:id",
    ({ error }) => {
      return error(501);
    },
    {
      params: t.Object({
        id: t.String({
          description: "Video ID",
          examples: {
            1: {
              value: "a1bc23def456gh78",
            },
          },
        }),
      }),
      detail: {
        description: "Get video data by ID",
      },
    }
  )
  .post(
    "/upload",
    ({ error }) => {
      return error(501);
    },
    {
      body: t.Object({
        file: t.File({
          description: "Video file",
        }),
        name: t.Optional(
          t.String({
            description: "Video file name",
            examples: ["An awesome video"],
          })
        ),
      }),
      detail: {
        description: "Upload a video file",
      },
    }
  )
  .post(
    "/download",
    ({ error }) => {
      return error(501);
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
        name: t.Optional(
          t.String({
            description: "Video file name",
            examples: ["An awesome video"],
          })
        ),
      }),
      detail: {
        description: "Download a video file, and save it to the server",
      },
    }
  );
