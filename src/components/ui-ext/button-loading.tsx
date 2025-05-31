import { type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { Button, type buttonVariants } from "../ui/button";

type Props = {
  loading: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const ButtonLoading: React.FC<Props> = ({
  loading,
  children,
  className,
  type = "submit",
  ...props
}) => {
  return (
    <Button type={type} disabled={loading} className={className} {...props}>
      {loading && <Loader2Icon className="animate-spin" />}
      {children}
    </Button>
  );
};
