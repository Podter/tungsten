import { Static, t } from "elysia";

export const VideoIdSchema = t.String({
  description: "Video ID",
  examples: ["a1bc23def456gh78"],
});

export const VideoNameSchema = t.String({
  description: "Video file name",
  examples: ["An awesome video"],
});

export const VideoDataSchema = t.Object({
  id: VideoIdSchema,
  name: VideoNameSchema,
  type: t.String({
    description: "Video type",
    examples: ["mp4"],
  }),
});

export type VideoData = Static<typeof VideoDataSchema>;
