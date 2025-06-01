import { desc, eq } from "drizzle-orm";

import { db, table } from "../db/drizzle";

export async function insertProject(data: typeof table.project.$inferInsert) {
  const [res] = await db.insert(table.project).values(data).returning();
  return res;
}

export async function findProjectById(id: Project["id"]) {
  return db.query.project.findFirst({
    where: eq(table.project.id, id),
  });
}

export async function findProjectsByWorkspaceId(workspaceId: Workspace["id"]) {
  return db.query.project.findMany({
    where: eq(table.project.workspaceId, workspaceId),
    orderBy: desc(table.project.createdAt),
  });
}

export async function updateProject(
  id: Project["id"],
  data: Partial<Omit<typeof table.project.$inferInsert, "id" | "workspaceId">>
) {
  const [res] = await db
    .update(table.project)
    .set(data)
    .where(eq(table.project.id, id))
    .returning();

  return res;
}

export async function deleteProject(id: Project["id"]) {
  return db.delete(table.project).where(eq(table.project.id, id));
}
