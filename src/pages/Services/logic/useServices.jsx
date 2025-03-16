import { ActionsDropdown } from "@/components/common/view/actions-dropdown";
import { ColumnHeader } from "@/components/common/view/column-header";
import { EActions } from "@/enums/actions";
import ServicesService from "@/services/services.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import toast from "react-hot-toast";
import { ServiceCard } from "@/pages/Services/view/components/ServiceCard";
import { ServiceForm } from "@/pages/Services/view/components/ServiceForm";
import { DeleteModal } from "@/components/common/delete-modal";
import { displayDate, displayNumber, displayValue } from "@/lib/display";

const useServices = () => {
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
  const queryClient = useQueryClient();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: () => ServicesService.getService(id),
    enabled: !!id,
  });

  const createServiceMutation = useMutation({
    mutationFn: (data) => ServicesService.createService(data),
    onMutate: () => {
      setFetching();
    },
    onError: () => {
      setFetched();
      toast.error("An error occurred");
      onClose();
    },
    onSuccess: () => {
      setFetched();
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      toast.success("Create successfully");
      onClose();
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: (data) => ServicesService.updateService(id, data),
    onMutate: () => {
      setFetching();
    },
    onError: () => {
      setFetched();
      toast.error("An error occurred");
      onClose();
    },
    onSuccess: () => {
      setFetched();
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      toast.success("Update successfully");
      onClose();
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: () => ServicesService.deleteService(id),
    onMutate: () => {
      setFetching();
    },
    onError: () => {
      setFetched();
      toast.error("An error occurred");
      onClose();
    },
    onSuccess: () => {
      setFetched();
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
      toast.success("Delete successfully");
      onClose();
    },
  });

  const breadcrumb = [
    {
      title: "Services",
      url: "/services",
    },
  ];

  function onOpenChange(action, id) {
    setId(id || "");
    setActions(action);
    setOpen();
  }

  function onClose() {
    setClose();
    setId("");
  }

  async function onSubmit(data) {
    if (actions === EActions.CREATE) {
      createServiceMutation.mutate(data);
    }
    if (actions === EActions.UPDATE) {
      updateServiceMutation.mutate(data);
    }
  }

  function formConfigMap(action) {
    const mappingValues = {
      [EActions.CREATE]: {
        title: "Create Service",
        children: (
          <ServiceForm
            isLoading={isLoading}
            isSubmitting={fetching}
            onSubmit={onSubmit}
            onDismiss={onClose}
          />
        ),
      },
      [EActions.UPDATE]: {
        title: "Update Service",
        children: (
          <ServiceForm
            defaultValues={{
              serviceName: service?.serviceName || "",
              price: service?.price.toString() || "0",
              type: service?.type || "",
              description: service?.description || "",
              duration: service?.duration.toString() || "0",
            }}
            isLoading={isLoading}
            isSubmitting={fetching}
            onSubmit={onSubmit}
            onDismiss={onClose}
          />
        ),
      },
      [EActions.VIEW]: {
        title: "View Service",
        children: (
          <ServiceCard
            isLoading={isLoading}
            serviceName={service?.serviceName || ""}
            price={service?.price || 0}
            type={service?.type || ""}
            createdAt={service?.created_at?.toString() || ""}
            description={service?.description || ""}
          />
        ),
      },
      [EActions.DELETE]: {
        title: "Delete Service",
        children: (
          <DeleteModal
            isSubmitting={fetching}
            onDismiss={onClose}
            onSubmitting={() => deleteServiceMutation.mutate(id.toString())}
          />
        ),
      },
    };
    return mappingValues[action];
  }

  const formConfig = formConfigMap(actions);

  const columns = [
    {
      accessorKey: "serviceName",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("Service Name")} />
      ),
      cell: ({ row }) => displayValue(row.original.serviceName),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("Price (VND)")} />
      ),
      cell: ({ row }) => displayNumber(row.original.price),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("Type")} />
      ),
      cell: ({ row }) => displayValue(row.original.type),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("Created At")} />
      ),
      cell: ({ row }) => displayDate(row.original.created_at),
    },
    {
      accessorKey: "actions",
      header: displayValue("Actions"),
      cell: ({ row }) => {
        return (
          <ActionsDropdown
            onView={() => onOpenChange(EActions.VIEW, row.original.serviceId)}
            onDelete={() =>
              onOpenChange(EActions.DELETE, row.original.serviceId)
            }
            onEdit={() => onOpenChange(EActions.UPDATE, row.original.serviceId)}
          />
        );
      },
    },
  ];

  return {
    open,
    breadcrumb,
    columns,
    service,
    actions,
    fetching,
    isLoading,
    formConfig,
    id,
    onClose,
    onOpenChange,
  };
};

export default useServices;
