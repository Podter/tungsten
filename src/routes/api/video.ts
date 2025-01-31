import { Elysia, t } from "elysia";

export const video = new Elysia({ prefix: "/video" })
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
        description: "Get video data by ID",
      },
    }
  )
  .put(
    "/:id",
    ({ error }) => {
      return error(501);
    },
    {
      detail: {
        description: "Update video data",
      },
    }
  )
  .delete(
    "/:id",
    ({ error }) => {
      return error(501);
    },
    {
      detail: {
        description: "Delete uploaded video",
      },
    }
  );
