import { relations } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

import { rowId, timestamps, user } from "./";

export const workspace = pgTable("workspace", {
  id: rowId(),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "restrict" })
    .notNull(),
  name: varchar("name").notNull(),
  desc: text("desc"),
  image: varchar("image"),
  inviteCode: varchar("inviteCode", { length: 100 }),
  ...timestamps,
});

export const workspaceRelations = relations(workspace, ({ many }) => ({
  // tasks: many(projects),
  // members: many(members),
}));
