import { redirect } from "next/navigation";

import { Container } from "~/components/ui-ext/container";
import { UpdateWorkspaceForm } from "~/features/workspace/components/update-workspace-form";
import { authenticate } from "~/server/helpers";
import { findWorkspaceById } from "~/server/repositories/workspace-repository";

interface Props {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspaceSettingsPage({ params }: Props) {
  const [{ workspaceId }] = await Promise.all([params, authenticate()]);
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) return redirect("/workspaces");

  return (
    <Container variant={"narrowConstrainedPadded"}>
      <UpdateWorkspaceForm workspace={workspace} />
    </Container>
  );
}
