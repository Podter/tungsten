import { Elysia, t } from "elysia";

export const others = new Elysia({ tags: ["Others"] }).get(
  "/health",
  () => new Response("OK"),
  {
    response: t.Literal("OK"),
    detail: {
      description: "Check the health of the server",
    },
  }
);
