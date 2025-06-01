import type {
  SessionWithImpersonatedBy,
  UserWithRole,
} from "better-auth/plugins";

import { type table } from "~/server/db/drizzle";

declare global {
  interface Role {
    name: "admin" | "user";
    permissions: any;
    createdAt: Date;
    updatedAt: Date;
  }

  type Session = Prettify<
    Omit<SessionWithImpersonatedBy, "impersonatedBy"> & {
      impersonatedBy?: SessionWithImpersonatedBy["impersonatedBy"] | null;
    }
  >;

  type AuthUser = Prettify<
    Omit<UserWithRole, "role"> & {
      role?: Role["name"] | null;
    }
  >;

  type User = typeof table.user.$inferSelect;

  type Workspace = typeof table.workspace.$inferSelect;
  type Member = typeof table.member.$inferSelect;
  type MemberRole = "ADMIN" | "MEMBER";

  type Project = typeof table.project.$inferSelect;
}
