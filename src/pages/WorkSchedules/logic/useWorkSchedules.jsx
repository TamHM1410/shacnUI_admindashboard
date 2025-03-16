import { ActionsDropdown } from "@/components/common/view/actions-dropdown";
import { ColumnHeader } from "@/components/common/view/column-header";
import { EActions } from "@/enums/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components/common/delete-modal";
import { displayDate, displayValue } from "@/lib/display";
import WorkScheduleService from "@/services/work-schedule.service";
import { WorkScheduleForm } from "@/pages/WorkSchedules/view/components/WorkScheduleForm";
import { WorkScheduleCard } from "@/pages/WorkSchedules/view/components/WorkScheduleCard";
import { setTimeStringToValidTime, setValidDate, setValidTime } from "@/lib/time-picker";

const useWorkSchedules = () => {
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

  const { data: workSchedule, isLoading } = useQuery({
    queryKey: ["work-schedule", id],
    queryFn: () => WorkScheduleService.getWorkSchedule(id),
    enabled: !!id,
  });

  const createWorkScheduleMutation = useMutation({
    mutationFn: ({ expertId, data }) => WorkScheduleService.createWorkSchedule(expertId, data),
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
        queryKey: ["work-schedules"],
      });
      toast.success("Create successfully");
      onClose();
    },
  });

  const updateWorkScheduleMutation = useMutation({
    mutationFn: (data) => WorkScheduleService.updateWorkSchedule(id, data),
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
        queryKey: ["work-schedules"],
      });
      toast.success("Update successfully");
      onClose();
    },
  });

  const deleteWorkScheduleMutation = useMutation({
    mutationFn: () => WorkScheduleService.deleteWorkSchedule(id),
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
        queryKey: ["work-schedules"],
      });
      toast.success("Delete successfully");
      onClose();
    },
  });

  const breadcrumb = [
    {
      title: "Work Schedules",
      url: "/work-schedules",
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
    const payload = {
      work_date: setValidDate(data.work_date),
      start_at: setValidTime(data.start_at),
      end_at: setValidTime(data.end_at),
    };

    if (actions === EActions.CREATE) {
      createWorkScheduleMutation.mutate({ expertId: data.expertId, data: payload });
    } else  {
      updateWorkScheduleMutation.mutate(payload);
    }
  }

  function formConfigMap(action) {
    const mappingValues = {
      [EActions.CREATE]: {
        title: "Create Work Schedule",
        children: (
          <WorkScheduleForm
            isLoading={isLoading}
            isSubmitting={fetching}
            onSubmit={onSubmit}
            onDismiss={onClose}
          />
        ),
      },
      [EActions.UPDATE]: {
        title: "Update Work Schedule",
        children: (
          <WorkScheduleForm
            defaultValues={{
              expertId: workSchedule?.expertId.toString(),
              work_date: workSchedule?.work_date,
              start_at: setTimeStringToValidTime(workSchedule?.start_at),
              end_at: setTimeStringToValidTime(workSchedule?.end_at),
            }}
            isLoading={isLoading}
            isSubmitting={fetching}
            onSubmit={onSubmit}
            onDismiss={onClose}
          />
        ),
      },
      [EActions.VIEW]: {
        title: "View Work Schedule",
        children: (
          <WorkScheduleCard
            isLoading={isLoading}
            workDate={workSchedule?.work_date}
            endAt={workSchedule?.end_at}
            startAt={workSchedule?.start_at}
            createdAt={workSchedule?.created_at.toString() || "-"}
          />
        ),
      },
      [EActions.DELETE]: {
        title: "Delete Work Schedule",
        children: (
          <DeleteModal
            isSubmitting={fetching}
            onDismiss={onClose}
            onSubmitting={() =>
              deleteWorkScheduleMutation.mutate(id.toString())
            }
          />
        ),
      },
    };
    return mappingValues[action];
  }

  const formConfig = formConfigMap(actions);

  const columns = [
    {
      accessorKey: "work_date",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("Work Date")} />
      ),
      cell: ({ row }) => displayDate(row.original.work_date),
    },
    {
      accessorKey: "start_at",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("Start At")} />
      ),
      cell: ({ row }) => displayValue(row.original.start_at),
    },
    {
      accessorKey: "end_at",
      header: ({ column }) => (
        <ColumnHeader column={column} title={displayValue("End At")} />
      ),
      cell: ({ row }) => displayValue(row.original.end_at),
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
            onView={() =>
              onOpenChange(EActions.VIEW, row.original.workScheduleId)
            }
            onDelete={() =>
              onOpenChange(EActions.DELETE, row.original.workScheduleId)
            }
            onEdit={() =>
              onOpenChange(EActions.UPDATE, row.original.workScheduleId)
            }
          />
        );
      },
    },
  ];

  return {
    open,
    breadcrumb,
    columns,
    workSchedule,
    actions,
    fetching,
    isLoading,
    formConfig,
    id,
    onClose,
    onOpenChange,
  };
};

export default useWorkSchedules;
