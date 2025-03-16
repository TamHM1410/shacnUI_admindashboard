import BlogsView from "@/pages/Blogs/view/BlogsView";
import UsersView from "@/pages/Users/view/UsersView";
import OverviewPage from "@/pages/Dashboard/OverView";
import ServicesView from "@/pages/Services/view/ServicesView";
import PostsView from "@/pages/Posts/view/PostsView";
import WorkSchedulesView from "@/pages/WorkSchedules/view/WorkSchedulesView";
import ExpertsView from "@/pages/Experts/view/ExpertsView";

export const mainRoutes = [
      {
        path: "/dashboard",
        component: OverviewPage,
      },
      {
        path: "/users",
        component: UsersView,
      },
      {
        path: "/blogs",
        component: BlogsView,
      },
      {
        path: "/posts",
        component: PostsView,
      },
      {
        path: "/services",
        component: ServicesView,
      },
      {
        path: "/work-schedules",
        component: WorkSchedulesView,
      },
      {
        path: "/experts",
        component: ExpertsView,
      }
];
