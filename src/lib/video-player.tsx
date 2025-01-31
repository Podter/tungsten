import { Html } from "@elysiajs/html";
import { VideoData } from "./schema";

interface VideoPlayerProps {
  data: VideoData;
}

export default function VideoPlayer({ data }: VideoPlayerProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.name}</title>
      </head>
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        }}
      >
        <video controls src={`/video/${data.id}`} />
      </body>
    </html>
  );
}
