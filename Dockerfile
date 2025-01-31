# Build
FROM oven/bun:slim AS build
WORKDIR /app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lockb,target=bun.lock \
    --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile
COPY . .
RUN bun run build

# Final
FROM gcr.io/distroless/cc-debian12 AS final
WORKDIR /app
ENV NODE_ENV production
ENV DATA_DIR=/data
VOLUME ${DATA_DIR}
ENV PORT 3000
EXPOSE ${PORT}
COPY --from=build /app/dist/tungsten .
CMD ["/app/tungsten"]
