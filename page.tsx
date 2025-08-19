import { useState, useRef }

export default function Home() {
const [q, setQ] = useState(""
<HTMLInputElement>(null);

return (
<main className="min-h-screen">
{/* Sticky top b
<div className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur">
<div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-2">

<button onClick={() => fil
Ref.current?.click()} className="rounded-full p-2 hover:bg-
late-100 dark:hover
b
-s
</button>
<input ref={fileRef} type="file" multiple className="hidden" />

<textarea
value={q} onCh
nge={(e) => setQ(e.target.value)}
placeholder="Type your question..." className="flex-1 h-10 resize-none rounded-full px-4 py-2 bg-white/70 dark:bg-slate-800/70 border
or
<button className="rounded-full px-4 py-2 border">Ask</button>
</div>
</div>
