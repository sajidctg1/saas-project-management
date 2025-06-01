import { redirect } from "next/navigation";

import { authenticate } from "~/server/helpers";
import { findWorkspacesOfUser } from "~/server/repositories/workspace-repository";

export default async function WorkspacesPage() {
  const { user } = await authenticate();
  const workspaces = await findWorkspacesOfUser(user.id);

  if (workspaces.length === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces[0]?.id}`);
  }
}
