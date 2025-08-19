import React from "react";

export default function Home() {
return (
<main
style={{
minHeight: "100vh",
padding: 24,
fontFamily:
'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", Arial, sans-serif',
lineHeight: 1.5,
}}
>
<h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Mini‑AI</h1>
<p style={{ opacity: 0.7, marginBottom: 16 }}>
Build OK. This minimal page uses the legacy pages/ router at /.
</p>
<p style={{ opacity: 0.7 }}>
Next step: we can switch to the App Router later by creating app/page.tsx.
</p>
</main>
);
}
