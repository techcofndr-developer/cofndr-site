import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.log("Skipping IndexNow key generation because INDEXNOW_KEY is not set.");
  process.exit(0);
}

const publicDir = path.join(process.cwd(), "public");
await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, `${key}.txt`), `${key}\n`, "utf8");
console.log(`Generated IndexNow key file for ${key}.`);
