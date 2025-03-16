import {GalleryVerticalEnd} from "lucide-react";
import { NavMain } from "@/components/common/nav-main";
import { NavUser } from "@/components/common/nav-user";
import { TeamSwitcher } from "@/components/common/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { menu } from "@/lib/menu";
import { useUser } from "@/context/UserContext";

const data = {
  teams: [
    {
      name: "SWP391",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useUser();


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
