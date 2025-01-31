import { Elysia, t } from "elysia";

export const video = new Elysia({ prefix: "/video", tags: ["Video"] })
  .guard({
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
  })
  .get(
    "/:id",
    ({ error }) => {
      return error(501);
    },
    {
      detail: {
        description: "Get a video file by its ID",
      },
    }
  )
  .get(
    "/:id/html",
    ({ error }) => {
      return error(501);
    },
    {
      detail: {
        description: "Get a video file by its ID in HTML format",
      },
    }
  );
