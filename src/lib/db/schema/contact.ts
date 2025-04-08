import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// Contact submissions table schema
export const contactSubmission = pgTable("contact_submission", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  isArchived: boolean("is_archived").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Type definitions for type safety
export type ContactSubmission = typeof contactSubmission.$inferSelect;
export type NewContactSubmission = typeof contactSubmission.$inferInsert; 