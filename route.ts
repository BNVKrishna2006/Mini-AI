import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

const MODE = process.env.MODE || "providers"; // "providers" | "ollama"
const OLLAMA_BASE = process.env.OLLAMA_BASE || "";

async function readTextPreview(paths: string[], limit = 4000) {
const parts: string[] = [];
for (const p of paths) {
try {
const buf = await readFile(p);
const s = buf.toString("utf-8");
parts.push(s.slice(0, limit));
} catch {}
}
return parts.join("\n\n---\n\n").slice(0, limit);
}

async function askOpenAI(prompt: string) {
if (!process.env.OPENAI_API_KEY) return "OpenAI not set.";
const r = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
Authorization: Bearer ${process.env.OPENAI_API_KEY},
"Content-Type": "application/json",
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }],
temperature: 0.3,
}),
});
if (!r.ok) return OpenAI error: ${r.status} ${await r.text()};
const j = await r.json();
return j.choices?.?.message?.content?.trim() ?? "";
}

async function askPerplexity(prompt: string) {
if (!process.env.PPLX_API_KEY) return "Perplexity not set.";
const r = await fetch("https://api.perplexity.ai/chat/completions", {
method: "POST",
headers: {
Authorization: Bearer ${process.env.PPLX_API_KEY},
"Content-Type": "application/json",
},
body: JSON.stringify({
model: "llama-3.1-sonar-small-128k-online",
messages: [{ role: "user", content: prompt }],
temperature: 0.2,
}),
});
if (!r.ok) return Perplexity error: ${r.status} ${await r.text()};
const j = await r.json();
return j.choices?.?.message?.content?.trim() ?? "";
}

async function askGemini(prompt: string) {
if (!process.env.GOOGLE_API_KEY) return "Gemini not set.";
const url = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY};
const r = await fetch(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
contents: [{ parts: [{ text: prompt }] }],
generationConfig: { temperature: 0.3 },
}),
});
if (!r.ok) return Gemini error: ${r.status} ${await r.text()};
const j = await r.json();
const text = j?.candidates?.?.content?.parts?.map((p: any) => p.text).join("") ?? "";
return (text || "").trim();
}

async function askGroq(prompt: string) {
if (!process.env.GROQ_API_KEY) return "Groq not set.";
const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
method: "POST",
headers: {
Authorization: Bearer ${process.env.GROQ_API_KEY},
"Content-Type": "application/json",
},
body: JSON.stringify({
model: "llama-3.1-70b-versatile",
messages: [{ role: "user", content: prompt }],
temperature: 0.2,
}),
});
if (!r.ok) return Groq error: ${r.status} ${await r.text()};
const j = await r.json();
return j.choices?.?.message?.content?.trim() ?? "";
}

async function askDeepSeek(prompt: string) {
if (!process.env.DEEPSEEK_API_KEY) return "DeepSeek not set.";
const r = await fetch("https://api.deepseek.com/chat/completions", {
method: "POST",
headers: {
Authorization: Bearer ${process.env.DEEPSEEK_API_KEY},
"Content-Type": "application/json",
},
body: JSON.stringify({
model: "deepseek-chat",
messages: [{ role: "user", content: prompt }],
temperature: 0.3,
}),
});
if (!r.ok) return DeepSeek error: ${r.status} ${await r.text()};
const j = await r.json();
return j.choices?.?.message?.content?.trim() ?? "";
}

async function askOllama(model: string, prompt: string) {
if (!OLLAMA_BASE) return "OLLAMA_BASE not set.";
const r = await fetch(${OLLAMA_BASE}/api/generate, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ model, prompt, stream: false }),
});
if (!r.ok) return Ollama error: ${r.status} ${await r.text()};
const j = await r.json();
return (j?.response || "").trim();
}

const MAP: Record<string, string> = {
ChatGPT: "llama3.1",
Perplexity: "mistral",
Gemini: "qwen2",
Groq: "phi3",
DeepSeek: "qwen2",
};

export async function POST(req: NextRequest) {
const { query, models, files }: { query: string; models: string[]; files?: { name: string; path: string }[] } =
await req.json();

const paths = (files || []).map((f) => f.path).filter(Boolean);
const fileText = paths.length ? await readTextPreview(paths) : "";
const prompt = fileText
? Task:\n${query}\n\nAttached file excerpts (truncated):\n${fileText}\n\nUse file info if relevant. If insufficient, say so.
: query || "Respond helpfully.";

const tasks: Record<string, Promise<string>> = {};
for (const m of models || []) {
if (MODE === "providers") {
if (m === "ChatGPT") tasks[m] = askOpenAI(prompt);
if (m === "Perplexity") tasks[m] = askPerplexity(prompt);
if (m === "Gemini") tasks[m] = askGemini(prompt);
if (m === "Groq") tasks[m] = askGroq(prompt);
if (m === "DeepSeek") tasks[m] = askDeepSeek(prompt);
} else {
const modelName = MAP[m] || "llama3.1";
tasks[m] = askOllama(modelName, prompt);
}
}

const entries = await Promise.all(
Object.entries(tasks).map(async ([k, p]) => {
try {
return [k, await p] as const;
} catch (e: any) {
return [k, Error: ${e?.message || "Unknown error"}] as const;
}
})
);

return NextResponse.json({ responses: Object.fromEntries(entries) });
  }
  
