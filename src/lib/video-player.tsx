import { Html } from "@elysiajs/html";
import { VideoData } from "./schema";

interface VideoPlayerProps {
  data: VideoData;
}

export default function VideoPlayer({ data }: VideoPlayerProps) {
  const fileUrl = `/video/${data.id}`;

  return (
    <html lang="en">
      <head>
        {/* Metadata */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.name}</title>
        <meta name="robots" content="noindex, nofollow" />
        {/* Preconnect */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* Styles */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
        />
        <style>{`::-webkit-scrollbar{width:0px;background:transparent;}`}</style>
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: 0,
        }}
      >
        <h1 class="title">{data.name}</h1>
        <video class="mb-5" controls src={fileUrl} />
        <a
          class="button is-primary"
          download={`${data.name}.${data.type}`}
          href={fileUrl}
        >
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </span>
          <span>Download</span>
        </a>
      </body>
    </html>
  );
}
