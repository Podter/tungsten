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
      query: t.Object({
        html: t.Optional(
          t.Boolean({
            description: "Return as a HTML player",
          })
        ),
      }),
      detail: {
        description: "Get a video by ID",
      },
    }
  );
