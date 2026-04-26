import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import type {
  BrandIdentity,
  ColorPalette,
  SiteSection,
  LinkItem,
  InstagramPost,
  JobStatus,
} from "@lumea/types";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const jobStatusEnum = pgEnum("job_status", [
  "pending",
  "processing",
  "done",
  "failed",
]);

// ─── Creators ─────────────────────────────────────────────────────────────────

export const creators = pgTable("creators", {
  id: uuid("id").defaultRandom().primaryKey(),
  handle: text("handle").notNull().unique(),
  username: text("username").notNull(),
  bio: text("bio").default(""),
  avatarUrl: text("avatar_url").default(""),
  followerCount: integer("follower_count"),
  externalLinks: jsonb("external_links").$type<string[]>().default([]),
  scrapedAt: timestamp("scraped_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Sites ────────────────────────────────────────────────────────────────────

export const sites = pgTable("sites", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk User ID
  creatorId: uuid("creator_id").references(() => creators.id, { onDelete: "cascade" }).notNull(),
  slug: text("slug").notNull().unique(),  // same as handle, lowercase
  brandIdentity: jsonb("brand_identity").$type<BrandIdentity>().notNull(),
  palette: jsonb("palette").$type<ColorPalette>().notNull(),
  sections: jsonb("sections").$type<SiteSection[]>().default([]),
  links: jsonb("links").$type<LinkItem[]>().default([]),
  posts: jsonb("posts").$type<InstagramPost[]>().default([]),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"), // Clerk User ID (optional for now to support existing jobs if any)
  handle: text("handle").notNull(),
  status: jobStatusEnum("status").notNull().default("pending"),
  reason: text("reason"),         // failure reason
  siteUrl: text("site_url"),      // populated on success
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Creator = typeof creators.$inferSelect;
export type NewCreator = typeof creators.$inferInsert;
export type Site = typeof sites.$inferSelect;
export type NewSite = typeof sites.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
