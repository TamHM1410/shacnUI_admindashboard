import WorkScheduleService from "@/services/work-schedule.service";
import { EActions } from "@/enums/actions";
import { MainLayout } from "@/layout/MainLayout";
import { PostView } from "@/components/common/view/post-view";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { useWorkSchedules } from "@/pages/WorkSchedules/logic";

export default function WorkSchedulesView() {
  const { formConfig, breadcrumb, columns, open, onOpenChange, onClose } =
    useWorkSchedules();

  return (
    <MainLayout>
      <PostView
        columns={columns}
        breadcrumb={breadcrumb}
        queryConfig={{
          queryKey: ["work-schedules"],
          queryFn: WorkScheduleService.getWorkSchedules,
        }}
        showAdd
        addConfig={{
          onClick: () => onOpenChange(EActions.CREATE),
        }}
        showSearch
        showRefresh
      />

      <ResponsiveModal
        title={formConfig.title}
        open={open}
        onOpenChange={onClose}
      >
        {formConfig.children}
      </ResponsiveModal>
    </MainLayout>
  );
}
