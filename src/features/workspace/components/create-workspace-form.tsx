"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { api } from "~/trpc/react";

import { type CreateWorkspacePayload, createWorkspaceSchema } from "../schemas";

export const CreateWorkspaceForm = () => {
  const router = useRouter();
  const { mutate, isPending } = api.workspace.create.useMutation();

  const form = useForm<CreateWorkspacePayload>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: "", desc: "", image: "" },
  });

  const handleSubmit = (data: CreateWorkspacePayload) => {
    mutate(data, {
      onSuccess: () => router.replace("/workspaces"),
    });
  };

  return (
    <GenericForm {...form} onSubmit={handleSubmit}>
      <FormInput name="name" />
      <FormInput name="desc" type="textarea" />
      <ButtonLoading loading={isPending} className="w-full">
        create
      </ButtonLoading>
    </GenericForm>
  );
};
