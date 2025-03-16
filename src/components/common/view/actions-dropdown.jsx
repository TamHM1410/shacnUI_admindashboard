import {
    Eye,
    MoreHorizontal,
    Pencil,
    FileSpreadsheet,
    Trash,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const ActionsDropdown = ({
    id,
    allowCopy,
    allowView = true,
    allowEdit = true,
    allowDelete = true,
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {allowCopy && (
                    <>
                        <DropdownMenuItem
                            onClick={() =>
                                toast.success("Copied to clipboard") &&
                                navigator.clipboard.writeText(id?.toString() || "")
                            }
                        >
                            <FileSpreadsheet className="h-4 w-4 mr-1" />
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                {allowView && (
                    <DropdownMenuItem onClick={onView}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </DropdownMenuItem>
                )}
                {allowEdit && (
                    <DropdownMenuItem onClick={onEdit}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                    </DropdownMenuItem>
                )}
                {allowDelete && (
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

