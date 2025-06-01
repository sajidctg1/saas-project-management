"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { useWorkspaceId } from "~/features/workspace/hooks/use-workspace-id";
import { api } from "~/trpc/react";

import { type CreateProjectPayload, createProjectSchema } from "../schemas";

export const CreateProjectForm = () => {
  const utils = api.useUtils();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = api.project.create.useMutation();

  const form = useForm<CreateProjectPayload>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "", desc: "", workspaceId: "" },
  });

  const handleSubmit = (data: CreateProjectPayload) => {
    mutate(
      { ...data, workspaceId },
      {
        onSuccess: () => {
          utils.project.list.invalidate();
        },
      }
    );
  };

  return (
    <GenericForm {...form} onSubmit={handleSubmit}>
      <FormInput name="name" />
      <FormInput name="desc" type="textarea" />
      <ButtonLoading disabled={!form.formState.isDirty} loading={isPending}>
        create
      </ButtonLoading>
    </GenericForm>
  );
};
