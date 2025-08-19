import React from "react";

type ToggleProps = {
pressed: boolean;
onPressedChange: (value: boolean) => void;
className?: string;
children?: React.ReactNode;
};

export default function Toggle({
pressed,
onPressedChange,
className = "",
children,
}: ToggleProps) {
return (
<button
type="button"
onClick={() => onPressedChange(!pressed)}
className={px-3 py-1 rounded-full border transition ${ pressed ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-white dark:bg-slate-900" } ${className}}
>
{children ?? (pressed ? "On" : "Off")}
</button>
);
}
