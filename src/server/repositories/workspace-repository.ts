import { eq } from "drizzle-orm";

import { db, table } from "../db/drizzle";

export async function insertWorkspace(
  data: typeof table.workspace.$inferInsert
) {
  const [res] = await db.insert(table.workspace).values(data).returning();
  return res;
}

export async function findWorkspaceById(id: Workspace["id"]) {
  return db.query.workspace.findFirst({
    where: eq(table.workspace.id, id),
  });
}

export async function findWorkspacesByUserId(userId: Workspace["id"]) {
  return db.query.workspace.findMany({
    where: eq(table.workspace.userId, userId),
  });
}

export async function updateWorkspace(
  id: string,
  data: Partial<typeof table.workspace.$inferInsert>
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
