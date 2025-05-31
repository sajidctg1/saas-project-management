import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Container } from "~/components/ui-ext/container";
import { CreateWorkspaceForm } from "~/features/workspace/components/create-workspace-form";
import { authenticate } from "~/server/helpers";

export const metadata = {
  title: "Create workspace",
};

export default async function WorkspaceCreatePage() {
  await authenticate();

  return (
    <Container className="flex h-screen place-items-center">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Create workspace</CardTitle>
          <CardDescription>Create a new workspace for teams</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateWorkspaceForm />
        </CardContent>
      </Card>
    </Container>
  );
}
