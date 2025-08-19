import React from "react";
export function Toggle({
pressed,
onPressedChange,
children,
className = "",
}: {
pressed: boolean;
onPressedChange: (v: boolean) => void;
children: React.ReactNode;
className?: string;
}) {
return (
<button
onClick={() => onPressedChange(!pressed)}
className={
px-3 py-1 rounded-full border transition ${ pressed ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-white dark:bg-slate-900" } + className
}
>
{children}
</button>
);
}
