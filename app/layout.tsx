import { ReactNode } from "react";

export const metadata = {
title: "Mini‑AI",
description: "Minimal Next.js app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body
style={{
margin: 0,
fontFamily:
'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", Arial, sans-serif',
color: "#0f172a",
background: "white",
}}
>
{children}
</body>
</html>
);
}
