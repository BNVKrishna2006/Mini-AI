import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const DIR = path.join(process.cwd(), ".next", "cache", "uploads");
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
const fd = await req.formData();
const files = fd.getAll("files") as unknown as File[];
await mkdir(DIR, { recursive: true });
const saved: { name: string; path: string }[] = [];
for (const f of files) {
const buf = Buffer.from(await f.arrayBuffer());
const id = randomUUID();
const safe = f.name.replace(/[^\w-.]+/g, "_");
const p = path.join(DIR, ${id}-${safe});
await writeFile(p, buf);
saved.push({ name: f.name, path: p });
}
return NextResponse.json({ files: saved });
}
