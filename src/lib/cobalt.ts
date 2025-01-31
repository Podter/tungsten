import { z } from "zod";
import { env } from "~/env";
import path from "node:path";

const CobaltResponseSchema = z.union([
  z.object({
    status: z.literal("error"),
    error: z.object({
      code: z.string(),
    }),
  }),
  z.object({
    status: z.union([z.literal("redirect"), z.literal("tunnel")]),
    url: z.string(),
    filename: z.string(),
  }),
]);

export async function cobalt(url: String) {
  const rawData = await fetch(env.COBALT_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "tungsten/1.0",
    },
    body: JSON.stringify({ url }),
  }).then((res) => res.json());
  console.log(rawData);
  const { success, data } = CobaltResponseSchema.safeParse(rawData);

  if (!success) {
    return { error: "Failed to parse Cobalt response" };
  }

  if (data.status === "error") {
    return { error: `Cobalt error: ${data.error.code}` };
  }

  if (data.status === "redirect" || data.status === "tunnel") {
    const type = path.extname(data.filename).slice(1);
    const name = data.filename.slice(0, -type.length - 1);
    return { name, type, url: data.url };
  }

  return { error: "Unknown Cobalt response" };
}
