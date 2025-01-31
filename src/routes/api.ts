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
        id: t.String(),
      }),
    }
  )
  .post(
    "/upload",
    ({ error }) => {
      return error(501);
    },
    {
      body: t.Object({
        name: t.String(),
        file: t.File(),
      }),
    }
  )
  .post(
    "/download",
    ({ error }) => {
      return error(501);
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    }
  );
