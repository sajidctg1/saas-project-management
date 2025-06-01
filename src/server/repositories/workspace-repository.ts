import { and, eq } from "drizzle-orm";

import { db, table } from "../db/drizzle";

export async function insertWorkspace(
  workspace: typeof table.workspace.$inferInsert,
  member: typeof table.member.$inferInsert
) {
  db.transaction(async tx => {
    try {
      await tx.insert(table.workspace).values(workspace);
      await tx.insert(table.member).values(member);
    } catch (error) {
      tx.rollback()
    }
  })
}

export async function findWorkspaceById(id: Workspace["id"]) {
  return db.query.workspace.findFirst({
    where: eq(table.workspace.id, id),
  });
}

export async function findWorkspacesOfUser(userId: User["id"]) {
  return db.query.member.findMany({
    where: eq(table.member.userId, userId),
    with: {
      workspace: true,
    }
  });
}

export async function updateWorkspace(
  id: Workspace["id"],
  data: Partial<Omit<typeof table.workspace.$inferInsert, "id" | "userId">>
) {
  const [res] = await db
    .update(table.workspace)
    .set(data)
    .where(eq(table.workspace.id, id))
    .returning();

  return res;
}

export async function deleteWorkspace(id: Workspace["id"]) {
  return db.delete(table.workspace).where(eq(table.workspace.id, id));
}

export async function isWorkspaceMember(
  userId: User["id"],
  workspaceId: Workspace["id"]
) {
  const workspace = await db.query.member.findFirst({
    where: and(
      eq(table.member.workspaceId, workspaceId),
      eq(table.member.userId, userId)
    ),
  });
  if (workspace?.id) return true;
  return false;
}

export async function isWorkspaceOwner(
  userId: User["id"],
  workspaceId: Workspace["id"]
) {
  const workspace = await findWorkspaceById(workspaceId);
  if (workspace?.userId === userId) return true;
  return false;
}
