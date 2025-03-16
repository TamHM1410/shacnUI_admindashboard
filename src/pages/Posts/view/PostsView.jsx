
import PostsService from "@/services/posts.service";
import { EActions } from "@/enums/actions";
import { MainLayout } from "@/layout/MainLayout";
import { PostView } from "@/components/common/view/post-view";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { usePosts } from "@/pages/Posts/logic";
export default function PostsView() {
  const { formConfig, breadcrumb, columns, open, onOpenChange, onClose } =
    usePosts();

  return (
    <MainLayout>
      <PostView
        columns={columns}
        breadcrumb={breadcrumb}
        queryConfig={{
          queryKey: ["posts"],
          queryFn: PostsService.getPosts,
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
