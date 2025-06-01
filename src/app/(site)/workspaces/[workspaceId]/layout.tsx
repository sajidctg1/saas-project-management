import { AppBreadcrumbs } from "~/components/app-breadcrumb";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { WorkspaceSidebar } from "~/components/workspace-sidebar/index";
import { KBar } from "~/components/workspace-sidebar/kbar";
import { CreateWorkspaceModal } from "~/features/workspace/components/create-workspace-modal";
import { constructMetadata } from "~/lib/construct-metadata";
import { authenticate } from "~/server/helpers";
import { findWorkspaceById } from "~/server/repositories/workspace-repository";

export const metadata = constructMetadata({ title: "Workspace" });

interface Props {
  params: Promise<{ workspaceId: string }>;
  children: React.ReactNode;
}

export default async function WorkspaceLayout(props: Props) {
  await authenticate();
  const params = await props.params;
  const workspace = await findWorkspaceById(params.workspaceId);

  return (
    <KBar>
      <SidebarProvider>
        <WorkspaceSidebar />
        <SidebarInset>
          <header className="sidebar bg-background sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="inline-flex w-full items-center gap-2 px-4 lg:px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <AppBreadcrumbs
                values={{ [params.workspaceId]: workspace?.name ?? "" }}
              />
              <div className="ml-auto inline-flex items-center gap-2">
                <ThemeSwitcher />
              </div>
            </div>
          </header>
          <div className="@container/main">{props.children}</div>
          <CreateWorkspaceModal />
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
