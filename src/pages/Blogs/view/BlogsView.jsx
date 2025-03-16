import { ResponsiveModal } from "@/components/common/responsive-modal";
import { PostView } from "@/components/common/view/post-view";
import { EActions } from "@/enums/actions";
import { MainLayout } from "@/layout/MainLayout";
import BlogsService from "@/services/blogs.service";
import { useBlogs } from "@/pages/Blogs/logic";

export default function BlogsView() {
  const {
    breadcrumb,
    columns,
    formConfig,
    open,
    onClose,
    onOpenChange,
  } = useBlogs();

  return (
    <MainLayout>
      <PostView
        columns={columns}
        breadcrumb={breadcrumb}
        queryConfig={{
          queryKey: ["blogs"],
          queryFn: BlogsService.getBlogs,
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
