import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { ROLES } from "~/constants";

import { rowId, timestamps } from "./index";

type RoleName = (typeof ROLES)[number];

export const roles = pgTable("role", {
  name: varchar("name", { enum: ROLES }).unique().$type<RoleName>().notNull(),
  permissions: jsonb("permissions").$type<any>(),
  ...timestamps,
});

export const user = pgTable("user", {
  id: rowId(),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  emailVerified: boolean("emailVerified").notNull(),
  image: varchar("image"),
  role: varchar("role", { enum: ROLES }).$type<RoleName>().notNull(),
  banned: boolean("banned"),
  banReason: text("banReason"),
  banExpires: timestamp("banExpires", { withTimezone: true }),
  ...timestamps,
});

export const account = pgTable("account", {
  id: rowId(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: varchar("accountId").notNull(),
  providerId: varchar("providerId").notNull(),
  accessToken: varchar("accessToken"),
  refreshToken: varchar("refreshToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", {
    withTimezone: true,
  }),
  scope: varchar("scope"),
  idToken: varchar("idToken"),
  password: varchar("password"),
  ...timestamps,
});

export const verification = pgTable("verification", {
  id: rowId(),
  identifier: varchar("identifier").notNull(),
  value: varchar("value").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  ...timestamps,
});

export const session = pgTable("session", {
  id: rowId(),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  ...timestamps,
});
