import { InboxIcon } from "lucide-react";

export function EmptyView({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full dark:bg-gray-800">
                <InboxIcon className="size-10 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    {title || "No data available"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    {description || "There is no data to display"}
                </p>
            </div>
        </div>
    );
}
