import UsersService from "@/services/users.service";
import { MainLayout } from "@/layout/MainLayout";
import { useUsers } from "@/pages/Users/logic";
import { PostView } from "@/components/common/view/post-view";

export default function UsersView() {
    const { breadcrumb, columns } = useUsers()

    return (
        <MainLayout>
            <PostView
                columns={columns}
                breadcrumb={breadcrumb}
                queryConfig={{
                    queryKey: ["users"],
                    queryFn: UsersService.getUsers,
                }}
                showAdd
                addConfig={{
                    onClick: () => { console.log("Add new user") },
                }}
                showSearch
                showRefresh
            />
        </MainLayout>
    );
}