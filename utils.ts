import { readFile } from "fs/promises";
export async function readTextPreview(paths: string[], limit = 4000) {
const parts: string[] = [];
for (const p of paths) {
try {
const buf = await readFile(p);
const s = buf.toString("utf-8");
parts.push(s.slice(0, limit));
} catch {}
}
