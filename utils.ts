// Safe JSON parse that never throws
export function safeJsonParse<T = unknown>(value: string): T | null {
try {
return JSON.parse(value) as T;
} catch {
return null;
}
}

// Join class names safely (handles conditionals)
export function cn(...parts: Array<string | false | null | undefined>): string {
return parts.filter(Boolean).join(" ");
}

// Simple sleep helper
export function sleep(ms: number): Promise<void> {
return new Promise((res) => setTimeout(res, ms));
}

// No-op logger (won’t break build on server/client)
export function log(...args: unknown[]) {
try {
// eslint-disable-next-line no-console
console.log(...args);
} catch {
// ignore
}
}
