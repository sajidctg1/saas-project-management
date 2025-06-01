import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z.string().optional(),
  workspaceId: z.string(),
});
export type CreateProjectPayload = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
  projectId: z.string(),
  name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
  image: z.string().optional(),
});
export type UpdateProjectPayload = z.infer<typeof updateProjectSchema>;
