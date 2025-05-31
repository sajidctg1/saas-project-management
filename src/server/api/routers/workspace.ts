import { createWorkspaceSchema } from "~/features/workspace/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { insertWorkspace } from "~/server/repositories/workspace-repository";

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
      return insertWorkspace({
        userId: ctx.user.id,
        name: input.name,
        image: input.image,
        inviteCode: generateInviteCode(),
      });
    }),
});
