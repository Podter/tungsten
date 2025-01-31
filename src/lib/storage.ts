import { Database } from "bun:sqlite";
import fs from "node:fs";
import path from "node:path";
import { env } from "~/env";
import { nanoid } from "./nanoid";
import { VideoData } from "./schema";

export class VideoStorage {
  private db: Database;
  private filesDir: string;

  constructor() {
    this.filesDir = path.join(env.DATA_DIR, "files");

    if (!fs.existsSync(env.DATA_DIR)) {
      fs.mkdirSync(env.DATA_DIR);
      fs.mkdirSync(this.filesDir);
    }

    const dbFile = path.join(env.DATA_DIR, "data.db");
    this.db = new Database(dbFile, {
      strict: true,
      create: true,
    });

    this.db.run("PRAGMA journal_mode = WAL;");

    this.db.run(`
      CREATE TABLE IF NOT EXISTS files (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL
      );
    `);
  }

  private getVideoPath(id: string, type: string) {
    return path.join(this.filesDir, `${id}.${type}`);
  }

  private getVideoFile(id: string, type: string) {
    return Bun.file(this.getVideoPath(id, type));
  }

  getVideo(id: string) {
    const query = this.db.query<VideoData, { id: string }>(
      `SELECT * FROM files WHERE id = $id LIMIT 1`
    );

    const data = query.get({ id });
    if (!data) {
      return null;
    }

    const file = this.getVideoFile(data.id, data.type);

    return {
      ...data,
      file,
    };
  }

  async add({ name, type, data }: { name: string; type: string; data: Blob }) {
    const id = nanoid();

    await Bun.write(this.getVideoPath(id, type), data);

    const query = this.db.query<undefined, VideoData>(
      "INSERT INTO files (id, name, type) VALUES ($id, $name, $type)"
    );

    query.run({ id, name, type });

    return { id };
  }

  update({ id, name }: { id: string; name: string }) {
    const query = this.db.query<undefined, { id: string; name: string }>(
      "UPDATE files SET name = $name WHERE id = $id"
    );
    query.run({ id, name });
  }

  async delete(data: VideoData) {
    this.db.query("DELETE FROM files WHERE id = ?").run(data.id);
    await Bun.file(this.getVideoPath(data.id, data.type)).delete();
  }
}

export const storage = new VideoStorage();
