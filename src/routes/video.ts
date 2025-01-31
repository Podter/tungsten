import html from "@elysiajs/html";
import { t } from "elysia";
import { ElysiaWithVideoResolver } from "~/lib/resolver";
import VideoPlayer from "~/lib/video-player";

export const video = ElysiaWithVideoResolver({
  prefix: "/video",
  tags: ["Video"],
})
  .use(html())
  .get(
    "/:id",
    ({ data, query }) => {
      if (query.html) {
        return VideoPlayer({ data });
      }

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
