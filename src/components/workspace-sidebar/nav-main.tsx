"use client";

import {
  CheckCircleIcon,
  CogIcon,
  LucideLayoutDashboard,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { useWorkspaceId } from "~/features/workspace/hooks/use-workspace-id";

export const NavMain = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  const menus: NavItem[] = [
    {
      title: "Dashboard",
      icon: LucideLayoutDashboard,
      href: `/workspaces/${workspaceId}`,
    },
    {
      title: "Members",
      icon: UsersIcon,
      href: `/workspaces/${workspaceId}/members`,
    },
    {
      title: "Tasks",
      icon: CheckCircleIcon,
      href: `/workspaces/${workspaceId}/tasks`,
    },
    {
      title: "Settings",
      icon: CogIcon,
      href: `/workspaces/${workspaceId}/settings`,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton isActive={item.href === pathname} asChild>
              <Link href={item.href ?? "/workspaces"}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
