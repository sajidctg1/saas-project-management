import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1),
  desc: z.string().optional(),
  image: z.string().optional(),
});
export type CreateWorkspacePayload = z.infer<typeof createWorkspaceSchema>;
