import { useEffect, useState } from "react";
export function ThemeToggle() {
const [dark, setDark] = useState(false);
useEffect(() => {
document.documentElement.classList.toggle("dark", dark);
}, [dark]);
return (
<button
onClick={() => setDark((v) => !v)}
className="p-2 rounded-full border"
aria-label="Toggle theme"
>
{dark ? "☀️" : "🌙"}
</button>
);
}
