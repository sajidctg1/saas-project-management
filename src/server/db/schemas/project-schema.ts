import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

import { rowId, timestamps, workspace } from "./";

export const project = pgTable("project", {
  id: rowId(),
  workspaceId: uuid("workspaceId")
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name").notNull(),
  desc: text("desc"),
  ...timestamps,
});

export const projectRelations = relations(project, ({ many, one }) => ({
  workspace: one(workspace, {
    fields: [project.workspaceId],
    references: [workspace.id],
  }),
}));
