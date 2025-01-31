import { Elysia, t } from "elysia";

export const video = new Elysia({ prefix: "/video", tags: ["Video"] }).get(
  "/:id",
  ({ error }) => {
    return error(501);
  },
  {
    params: t.Object({
      id: t.String({
        description: "The video ID",
        example: "123",
      }),
    }),
    detail: {
      description: "Get a video file by its ID",
    },
  }
);
