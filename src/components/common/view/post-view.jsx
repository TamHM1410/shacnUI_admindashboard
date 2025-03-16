
import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, RotateCcwIcon } from "lucide-react";
import { SearchInput } from "@/components/common/search-input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/view/data-table";

export function PostView({ breadcrumb,
    columns,
    queryConfig,
    showAdd,
    showSearch,
    showRefresh,
    addConfig,
    searchConfig, }) {
    const queryEnabled = useMemo(
        () => queryConfig?.queryOptions?.enabled || true,
        [queryConfig?.queryOptions?.enabled]
    );
    const params = {
        ...queryConfig,
        //    defaultPaging: { page: 1, pageSize: 10 },
    };

    const {
        data: viewQuery,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: queryConfig?.queryKey,
        queryFn: () => queryConfig?.queryFn(params),
        refetchOnWindowFocus: false,
        enabled: !!queryEnabled,
        retry: 1,
        retryDelay: 1000,
    });

    const handleChangePagination = useCallback((state) => {
        console.log(state);
    }, []);

    const handleSearch = useCallback((searchText) => {
        console.log(searchText);
    }, []);


    return (
        <div className="flex flex-col h-full">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex justify-between items-center w-full px-4">
                    <div className="flex items-center gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumb.map((item, index) => (
                                    <BreadcrumbItem key={index}>
                                        <BreadcrumbLink href={item.url}>
                                            {item.title}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2">
                        {showSearch && (
                            <SearchInput
                                placeholder={searchConfig?.placeholder || "Search here..."}
                                onSearch={handleSearch}
                            />
                        )}
                        {showRefresh && (
                            <RotateCcwIcon
                                className="cursor-pointer text-neutral-500 h-5 w-5"
                                onClick={() => refetch()}
                            />
                        )}
                        {showAdd && (
                            <Button onClick={addConfig?.onClick}>
                                <PlusIcon className="text-white h-5 w-5" />
                                {addConfig?.text || "Add"}
                            </Button>
                        )}
                    </div>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <DataTable
                    columns={columns}
                    isLoading={isLoading}
                    data={viewQuery || []}
                    onPaginationChange={handleChangePagination}
                />
            </div>
        </div>
    );
}