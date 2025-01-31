import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),

    COBALT_API: z.string().default("http://localhost:9000"),

    PORT: z.string().transform(Number).default("3000"),
    DATA_DIR: z.string().default("data"),
  },
  runtimeEnv: Bun.env,
  emptyStringAsUndefined: true,
});
