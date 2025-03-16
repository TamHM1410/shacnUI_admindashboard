import { useIsMounted } from "usehooks-ts";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { MultiSelect } from "@/components/ui/multi-select";
import { SingleSelect } from "@/components/ui/single-select";

export const SelectQuery = ({
  queryConfig,
  placeholder,
  defaultValue,
  className,
  itemLabelKey,
  itemValueKey,
  mode = "single",
  onValueChange,
}) => {
  const queryClient = new QueryClient();
  const isMounted = useIsMounted();

  const params = {
    ...queryConfig,
    //defaultPaging: { page: 1, pageSize: 10 }
  };
  

  const { data, isLoading } = useQuery(
    {
      queryKey: ["select", queryConfig.queryKey],
      queryFn: () => queryConfig.queryFn(params.defaultPaging),
      refetchOnWindowFocus: false,
      enabled: isMounted(),
    },
    queryClient,
  );

  if (mode === "multiple") {
    return (
      <MultiSelect
        options={
          data?.map((item) => ({
            label: String(item[itemLabelKey]),
            value: String(item[itemValueKey]),
          })) || []
        }
        isLoading={isLoading}
        onValueChange={(values) => onValueChange(values)}
        placeholder={String(placeholder)}
        defaultValue={Array.isArray(defaultValue) ? defaultValue[0] : []}
        className={className}
      />
    );
  }
  return (
    <SingleSelect
      options={
        data?.map((item) => ({
          label: String(item[itemLabelKey]),
          value: String(item[itemValueKey]),
        })) || []
      }
      isLoading={isLoading}
      onValueChange={(value) => onValueChange(value)}
      placeholder={String(placeholder)}
      defaultValue={defaultValue ? defaultValue : ""}
      className={className}
    />
  );
};