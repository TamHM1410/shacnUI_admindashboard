import { ActionsDropdown } from "@/components/common/view/actions-dropdown";
import { ColumnHeader } from "@/components/common/view/column-header";
import { EActions } from "@/enums/actions";
import { displayDate, displayPhone, displayValue } from "@/lib/display";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";

const useUsers = () => {

    const {
        value: open,
        setTrue: setOpen,
        setFalse: setClose,
    } = useBoolean(false);
    const {
        value: fetching,
        setTrue: setFetching,
        setFalse: setFetched,
    } = useBoolean(false);

    const [actions, setActions] = useState(EActions.CREATE);
    const [id, setId] = useState("");

    const breadcrumb = [
        {
            title: "Users",
            url: "/users",
        },
    ];

    function onOpenChange(action, id) {
        setId(id || "");
        setActions(action);
        setOpen();
    }

    const columns = [
        {
            accessorKey: "fullName",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title={displayValue("Full Name")}
                />
            ),
            cell: ({ row }) => displayValue(row.original.fullName),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title={displayValue("Email")}
                />
            ),
            cell: ({ row }) => displayValue(row.original.email),
        },
        {
            accessorKey: "phone",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title={displayValue("Phone")}
                />
            ),
            cell: ({ row }) => displayPhone(row.original.phone),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <ColumnHeader
                    column={column}
                    title={displayValue("Created At")}
                />
            ),
            cell: ({ row }) => displayDate(row.original.created_at),
        },
        {
            accessorKey: "actions",
            header: displayValue("Actions"),
            cell: ({ row }) => {
                return (
                    <ActionsDropdown
                        allowDelete={false}
                        allowEdit={false}
                        onView={() => onOpenChange(EActions.VIEW, row.original.id)}
                    />
                );
            },
        },
    ];

    return { open, breadcrumb, columns, actions, fetching };
}


export default useUsers;