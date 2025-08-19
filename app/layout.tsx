import { ReactNode } from "react";

export const metadata = {
title: "Mini‑AI",
description: "Minimal Next.js app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body style={{ margin: 0 }}>{children}</body>
</html>
);
}
