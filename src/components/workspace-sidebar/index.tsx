"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { authClient } from "~/lib/auth-client";
import { api } from "~/trpc/react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const WorkspaceSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { data } = authClient.useSession();
  const { data: workspaces } = api.workspace.list.useQuery();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher
          workspaces={workspaces?.map((i) => i.workspace) ?? []}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {data?.user && <NavUser user={data.user as AuthUser} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
