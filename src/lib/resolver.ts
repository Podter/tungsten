import { Elysia, t } from "elysia";
import { storage } from "./storage";

export const ElysiaWithVideoResolver = (
  ...args: ConstructorParameters<typeof Elysia>
) =>
  new Elysia(...args)
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
      response: {
        404: t.Object({
          error: t.Literal("Not found"),
        }),
      },
    })
    .resolve(({ params, error }) => {
      const data = storage.getVideo((params as { id: string }).id);

      if (!data) {
        return error(404, { error: "Not found" });
      }

      return { data };
    });
