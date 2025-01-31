import { t } from "elysia";
import { ElysiaWithVideoResolver } from "~/lib/resolver";
import { VideoDataSchema, VideoNameSchema } from "~/lib/schema";
import { storage } from "~/lib/storage";

export const video = ElysiaWithVideoResolver({ prefix: "/video" })
  .get("/:id", ({ data }) => data, {
    detail: {
      description: "Get video data by ID",
    },
    response: VideoDataSchema,
  })
  .put(
    "/:id",
    async ({ data, body }) => {
      storage.update({ id: data.id, name: body.name });
      return new Response(null, {
        status: 204,
      });
    },
    {
      body: t.Object({
        name: VideoNameSchema,
      }),
      detail: {
        description: "Update video data",
      },
      response: {
        204: t.Undefined(),
      },
    }
  )
  .delete(
    "/:id",
    async ({ data }) => {
      await storage.delete(data);
      return new Response(null, {
        status: 204,
      });
    },
    {
      detail: {
        description: "Delete uploaded video",
      },
      response: {
        204: t.Undefined(),
      },
    }
  );
