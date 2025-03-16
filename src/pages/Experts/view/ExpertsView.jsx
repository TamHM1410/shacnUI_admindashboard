import ExpertsService from "@/services/experts.service";
import { EActions } from "@/enums/actions";
import { MainLayout } from "@/layout/MainLayout";
import { PostView } from "@/components/common/view/post-view";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { useExperts } from "@/pages/Experts/logic";
export default function ExpertsView() {
  const { formConfig, breadcrumb, columns, open, onOpenChange, onClose } =
  useExperts();

  return (
    <MainLayout>
      <PostView
        columns={columns}
        breadcrumb={breadcrumb}
        queryConfig={{
          queryKey: ["experts"],
          queryFn: ExpertsService.getExperts,
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
