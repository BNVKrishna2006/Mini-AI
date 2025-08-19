import React from "react";
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
const { className = "", ...rest } = props;
return (
<button
{...rest}
className={
"px-3 py-2 rounded-md border bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition " +
className
}
/>
);
}
