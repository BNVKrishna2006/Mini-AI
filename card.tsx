import React from "react";
export function Card({ className = "", ...p }: any) {
return (
<div
{...p}
className={
"rounded-2xl border bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow " +
className
}
/>
);
}
export function CardHeader({ className = "", ...p }: any) {
return <div {...p} className={"p-4 border-b " + className} />;
}
export function CardTitle({ className = "", ...p }: any) {
return <h3 {...p} className={"font-semibold " + className} />;
}
export function CardContent({ className = "", ...p }: any) {
return <div {...p} className={"p-4 " + className} />;
}
