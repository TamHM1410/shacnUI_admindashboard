import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Pagination } from "@/components/common/view/pagination";
  import { EmptyView } from "@/components/common/view/empty-view";
  import { Spinner } from "@/components/ui/spinner";
  
  export function DataTable({ columns, data, isLoading, onPaginationChange }) {
    const table = useReactTable({
      data,
      columns,
      enableSorting: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: onPaginationChange,
    });
  
    return (
      <div className="flex flex-col h-full gap-3">
        <div className="flex-grow rounded-md border">
          {isLoading ? (
            <div className="flex flex-1 justify-center h-[50vh]">
              <Spinner size={"large"} />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-neutral-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-left text-black"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table?.getRowModel().rows?.length ? (
                  table?.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-full text-center"
                    >
                      <EmptyView />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        <Pagination table={table} />
      </div>
    );
  }
  