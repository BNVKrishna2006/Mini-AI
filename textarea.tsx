import React from "react";
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
const { className = "", ...rest } = props;
return (
<textarea
{...rest}
className={
"w-full px-3 py-2 rounded-md border bg-white dark:bg-slate-900 " + className
}
/>
);
}
