"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import { ButtonLoading } from "~/components/ui-ext/button-loading";

import { useResetPassword } from "../api/reset-password";
import { AUTH_URI } from "../constants";
import { type ResetPasswordPayload, ResetPasswordSchema } from "../schemas";
import { AuthCard } from "./auth-card";

interface Props {
  email: string;
}

export const ResetPasswordForm = ({ email }: Props) => {
  const { mutate, isPending } = useResetPassword();

  const handleSubmit = (data: ResetPasswordPayload) => {
    mutate(data);
  };
  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email,
      otp: "",
      password: "test123",
      passwordConfirmation: "test123",
    },
  });

  return (
    <AuthCard
      title="Enter a new password"
      buttonLabel="Don't have an account?"
      buttonHref={AUTH_URI.signUp}
    >
      <GenericForm {...form} onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormInput<ResetPasswordPayload>
            name="password"
            type="password"
            disabled={isPending}
          />
          <FormInput<ResetPasswordPayload>
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            disabled={isPending}
          />
          <FormInput<ResetPasswordPayload>
            name="otp"
            label="OTP Code"
            type="otp"
            disabled={isPending}
          />
        </div>
        <ButtonLoading loading={isPending} className="w-full">
          Change Password
        </ButtonLoading>
      </GenericForm>
    </AuthCard>
  );
};
