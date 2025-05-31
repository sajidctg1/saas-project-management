import { redirect } from "next/navigation";

import { authenticate } from "~/server/helpers";
import { findWorkspaceById } from "~/server/repositories/workspace-repository";

interface Props {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceIdPage(props: Props) {
  await authenticate();

  const params = await props.params;
  const workspace = await findWorkspaceById(params.workspaceId);

  if (!workspace) {
    return redirect("/workspaces");
  }

  return <div>hello</div>;
}
