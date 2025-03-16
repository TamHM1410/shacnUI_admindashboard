import { DeleteModal } from "@/components/common/delete-modal";
import { ActionsDropdown } from "@/components/common/view/actions-dropdown";
import { ColumnHeader } from "@/components/common/view/column-header";
import { EActions } from "@/enums/actions";
import { displayDate, displayNumber, displayValue } from "@/lib/display";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBoolean } from "usehooks-ts";
import { ExpertsForm } from "@/pages/Experts/view/components/ExpertsForm";
import { ExpertsCard } from "@/pages/Experts/view/components/ExpertsCard";
import ExpertsService from "@/services/experts.service";

const useExperts = () => {
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
      const {invalidateQueries} = useQueryClient();
    
      const { data: expert, isLoading } = useQuery({
        queryKey: ["expert", id],
        queryFn: () => ExpertsService.getExpert(id),
        enabled: !!id,
      });
    
      const createExpertsMutation = useMutation({
        mutationFn: (data) => ExpertsService.createExpert(data),
        onMutate: () => {
          setFetching();
        },
        onError: (error) => {

          invalidateQueries({
            queryKey: ["experts"],
          });

          setFetched();
          // toast.error("An error occurred");
          onClose();
        },
        onSuccess: () => {
          setFetched();
          invalidateQueries({
            queryKey: ["experts"],
          });
          toast.success("Create successfully");
          onClose();
        },
      });
    
      const updateExpertsMutation = useMutation({
        mutationFn: (data) => ExpertsService.updateExpert(data),
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
          invalidateQueries({
            queryKey: ["experts"],
          });
          toast.success("Update successfully");
          onClose();
        },
      });
    
      const deleteExpertsMutation = useMutation({
        mutationFn: (id) => ExpertsService.deleteExpert(id),
        onMutate: () => {
          setFetching();
        },
        onError: (error) => {
          
          setFetched();
          invalidateQueries({
            queryKey: ["experts"],
          });

          // toast.error("An error occurred");
          onClose();
        },
        onSuccess: () => {
          setFetched();
          invalidateQueries({
            queryKey: ["experts"],
          });
          toast.success("Delete successfully");
          onClose();
        },
      });
    
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
           usersDTO: {
            username: data.fullName,
            password: data.password,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            isActive: true,
           },
           expertsDTO:{
            specialization: data.specialization,
            yearOfExperiences: data.yearOfExperiences,
            description: data.description,
            imageBase64: data.imageBase64,
           }
        }


        if (actions === EActions.CREATE) {
          createExpertsMutation.mutate(payload);
        } else {
          updateExpertsMutation.mutate({ id, ...data });
        }
      }
    
      function formConfigMap(action) {
        const mappingValues = {
          [EActions.CREATE]: {
            title: "Create Expert",
            children: (
              <ExpertsForm
                isLoading={isLoading}
                isSubmitting={fetching}
                onSubmit={onSubmit}
                onDismiss={onClose}
              />
            ),
          },
          [EActions.UPDATE]: {
            title: "Update Expert",
            children: (
              <ExpertsForm
                defaultValues={{
                  fullName: expert?.fullName || "",
                  specialization: expert?.specialization || "",
                  yearOfExperiences: expert?.yearOfExperiences || "",
                  description: expert?.description || "",
                  imageBase64: expert?.imageBase64 || "",
                }}
                isLoading={isLoading}
                isSubmitting={fetching}
                onSubmit={onSubmit}
                onDismiss={onClose}
              />
            ),
          },
          [EActions.VIEW]: {
            title: "View Expert",
            children: (
              <ExpertsCard
                isLoading={isLoading}
                createdAt={expert?.created_at || ""}
                fullName={expert?.fullName || ""}
                specialization={expert?.specialization || ""}
                yearOfExperiences={expert?.yearOfExperiences || ""}
                description={expert?.description || ""}
                imageBase64={expert?.imageBase64 || ""}

              />
            ),
          },
          [EActions.DELETE]: {
            title: "Delete Expert",
            children: (
              <DeleteModal
                isSubmitting={fetching}
                onDismiss={onClose}
                onSubmitting={() => deleteExpertsMutation.mutate(id.toString())}
              />
            ),
          },
        };
        return mappingValues[action];
      }
    
      const formConfig = formConfigMap(actions);
    
      const columns = [
        {
          accessorKey: "fullName",
          header: ({ column }) => (
            <ColumnHeader column={column} title={displayValue("Full Name")} />
          ),
          cell: ({ row }) => displayValue(row.original.fullName),
        },
    
        {
          accessorKey: "specialization",
          header: ({ column }) => (
            <ColumnHeader column={column} title={displayValue("Specialization")} />
          ),
          cell: ({ row }) => displayValue(row.original.specialization),
        },
        {
          accessorKey: "yearOfExperiences",
          header: ({ column }) => (
            <ColumnHeader column={column} title={displayValue("Year of experiences")} />
          ),
          cell: ({ row }) => displayNumber(row.original.yearOfExperiences),
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
                onView={() => onOpenChange(EActions.VIEW, row.original.expertId)}
                onDelete={() =>
                  onOpenChange(EActions.DELETE, row.original.expertId)
                }
                onEdit={() => onOpenChange(EActions.UPDATE, row.original.expertId)}
              />
            );
          },
        },
      ];
    
      const breadcrumb = [
        {
          title: "Experts",
          url: "/experts",
        },
      ];
    
      return {
        open,
        breadcrumb,
        columns,
        expert,
        actions,
        fetching,
        isLoading,
        formConfig,
        id,
        onClose,
        onOpenChange,
      };
}
 
export default useExperts;