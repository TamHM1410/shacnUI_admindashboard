import ServicesService from "@/services/services.service";
import { EActions } from "@/enums/actions";
import { MainLayout } from "@/layout/MainLayout";
import { PostView } from "@/components/common/view/post-view";
import { useServices } from "@/pages/Services/logic";
import { ResponsiveModal } from "@/components/common/responsive-modal";
export default function ServicesView() {
  const { formConfig, breadcrumb, columns, open, onOpenChange, onClose } =
    useServices();

  return (
    <MainLayout>
      <PostView
        columns={columns}
        breadcrumb={breadcrumb}
        queryConfig={{
          queryKey: ["services"],
          queryFn: ServicesService.getServices,
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
