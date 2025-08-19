import React from "react";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
const { className = "", ...rest } = props;
return (
<input
{...rest}
className={
"w-full px-3 py-2 rounded-md border bg-white dark:bg-slate-900 " + className
}
/>
);
}
