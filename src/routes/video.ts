import { t } from "elysia";
import { ElysiaWithVideoResolver } from "~/lib/resolver";

export const video = ElysiaWithVideoResolver({
  prefix: "/video",
  tags: ["Video"],
}).get(
  "/:id",
  ({ data }) => {
    return data.file;
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
