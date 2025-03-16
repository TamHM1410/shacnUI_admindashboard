import { cn } from "@/lib/utils";

export const Col = ({
    label,
    value,
    labelClassname,
    valueClassname,
    className,
}) => {
    return (
        <div className={cn("flex flex-col items-start", className)}>
            <span className={cn("text-neutral-500 text-sm", labelClassname)}>
                {label}
            </span>
            <span className={cn("text-neutral-900 text-sm", valueClassname)}>
                {value}
            </span>
        </div>
    );
};
