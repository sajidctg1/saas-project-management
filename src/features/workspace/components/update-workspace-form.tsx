"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { useConfirm } from "~/components/ui-ext/alert";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { Heading } from "~/components/ui-ext/heading";
import { env } from "~/env";
import { api } from "~/trpc/react";

import { type CreateWorkspacePayload, createWorkspaceSchema } from "../schemas";

interface Props {
  workspace: Workspace;
}

export const UpdateWorkspaceForm = ({ workspace }: Props) => {
  const router = useRouter();
  const confirm = useConfirm();
  const { mutate: update, isPending } = api.workspace.update.useMutation();
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    api.workspace.delete.useMutation();
  const { mutate: resetInviteCode, isPending: isResetting } =
    api.workspace.resetInviteCode.useMutation();

  const form = useForm<CreateWorkspacePayload>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: workspace.name,
      image: workspace.image ?? "",
    },
  });

  const fullInviteLink = `${env.NEXT_PUBLIC_APP_URL}/workspaces/${workspace.id}/join/${workspace.inviteCode}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  const handleSubmit = (data: CreateWorkspacePayload) => {
    update({ ...data, workspaceId: workspace.id });
  };

  const handleDelete = async () => {
    const ok = await confirm({ title: "Are you sure to delete?" });
    if (!ok) return;
    deleteWorkspace({ workspaceId: workspace.id });
  };

  const handleResetInviteCode = async () => {
    const ok = await confirm({ title: "Are you sure to reset?" });
    if (!ok) return;
    resetInviteCode(
      { workspaceId: workspace.id },
      {
        onSuccess: () => router.refresh(),
      }
    );
  };

  return (
    <div className="space-y-4">
      <Heading>Workspace Settings</Heading>
      <Card>
        <CardHeader>
          <CardTitle>Workspace details</CardTitle>
        </CardHeader>
        <CardContent>
          <GenericForm {...form} onSubmit={handleSubmit}>
            <FormInput name="name" />
            <FormInput name="desc" type="textarea" />
            <ButtonLoading
              disabled={!form.formState.isDirty}
              loading={isPending}
            >
              save changes
            </ButtonLoading>
          </GenericForm>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Invite Member</CardTitle>
          <CardDescription>
            Use the invite link to add members to your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <div className="flex items-center gap-x-2">
              <Input disabled value={fullInviteLink} />
              <Button
                onClick={handleCopyInviteLink}
                variant={"secondary"}
                size="icon"
              >
                <CopyIcon className="size-5" />
              </Button>
            </div>
            <Separator className="py-7" />
            <ButtonLoading
              loading={isResetting}
              onClick={handleResetInviteCode}
            >
              Reset Invite
            </ButtonLoading>
          </div>
        </CardContent>
      </Card>
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Deleting a workspace is irreversible and will remove all associated
            data
          </p>
          <ButtonLoading
            loading={isDeleting}
            variant={"destructive"}
            onClick={handleDelete}
          >
            Delete Workspace
          </ButtonLoading>
        </CardContent>
      </Card>
    </div>
  );
};
