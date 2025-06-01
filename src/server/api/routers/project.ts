import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createProjectSchema,
  updateProjectSchema,
} from "~/features/project/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  findProjectsByWorkspaceId,
  insertProject,
  updateProject,
} from "~/server/repositories/project-repository";
import { isWorkspaceMember } from "~/server/repositories/workspace-repository";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ input }) => {
      return insertProject({
        workspaceId: input.workspaceId,
        name: input.name,
        image: input.image,
      });
    }),

  list: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ input }) => {
      return findProjectsByWorkspaceId(input.workspaceId);
    }),

  update: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ ctx, input }) => {
      if (!(await isWorkspaceMember(ctx.user.id, input.projectId))) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return updateProject(input.projectId, {
        name: input.name,
        image: input.image,
      });
    }),
});
