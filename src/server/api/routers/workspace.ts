import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "~/features/workspace/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  deleteWorkspace,
  findWorkspacesOfUser,
  insertWorkspace,
  isWorkspaceOwner,
  updateWorkspace,
} from "~/server/repositories/workspace-repository";

export const generateInviteCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let inviteCode = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    inviteCode += characters[randomIndex];
  }

  return inviteCode;
};

export const workspaceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createWorkspaceSchema)
    .mutation(async ({ ctx, input }) => {
      const now = new Date()
      const workspace: Workspace = {
        id: crypto.randomUUID(),
        userId: ctx.user.id,
        name: input.name,
        image: input.image ?? null,
        inviteCode: generateInviteCode(),
        desc: input.desc ?? null,
        createdAt: now,
        updatedAt: now,
      }
      const member: Member = {
        id: crypto.randomUUID(),
        workspaceId: workspace.id,
        userId: ctx.user.id,
        role: 'ADMIN',
      }

      await insertWorkspace(workspace, member);

      return workspace;
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return findWorkspacesOfUser(ctx.user.id);
  }),
});
