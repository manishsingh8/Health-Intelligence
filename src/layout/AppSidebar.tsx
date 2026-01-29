import * as React from "react";
import { NavMain } from "@/layout/NavMain";
// import { NavProjects } from "@/layout/NavProject";
import { NavUser } from "@/layout/NavUser";
import { TeamSwitcher } from "@/layout/TeamSwitcher";
import { SIDEBAR_DATA } from "../constants/SidebarData";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/Sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SIDEBAR_DATA.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.navMain} />
        {/* <NavProjects projects={SIDEBAR_DATA.documents} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SIDEBAR_DATA.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
