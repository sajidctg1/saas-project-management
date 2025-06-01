"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { api } from "~/trpc/react";

import { type CreateProjectPayload, createProjectSchema } from "../schemas";

export const CreateProjectForm = () => {
  const router = useRouter();
  const { mutate, isPending } = api.project.create.useMutation();

  const form = useForm<CreateProjectPayload>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "", image: "", workspaceId: "" },
  });

  const handleSubmit = (data: CreateProjectPayload) => {
    mutate(data, {
      onSuccess: () => {},
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
