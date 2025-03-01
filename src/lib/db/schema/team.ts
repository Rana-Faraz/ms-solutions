import {
  pgTable,
  text,
  uuid,
  jsonb,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// Team members table schema
export const teamMember = pgTable("team_member", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  social: jsonb("social"), // Store social links as JSON
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// Relations and select helpers
export type TeamMember = typeof teamMember.$inferSelect;
export type NewTeamMember = typeof teamMember.$inferInsert;

// Initial seed data based on the Constants.ts file
export const initialTeamMembers = [
  {
    name: "Dr. Jane Smith",
    position: "Chief Medical Officer",
    bio: "Board-certified physician with 15+ years of experience in healthcare management and clinical excellence.",
    image: "/placeholder.jpg",
    enabled: true,
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Dr. Michael Chen",
    position: "Medical Director",
    bio: "Specialist in healthcare systems optimization with a focus on improving patient outcomes and clinical workflows.",
    image: "/placeholder.jpg",
    enabled: true,
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sarah Johnson",
    position: "Healthcare IT Specialist",
    bio: "Expert in medical software implementation and electronic health record systems for modern practices.",
    image: "/placeholder.jpg",
    enabled: true,
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Robert Williams",
    position: "Patient Experience Consultant",
    bio: "Dedicated to enhancing patient satisfaction and streamlining healthcare delivery processes.",
    image: "/placeholder.jpg",
    enabled: true,
    social: null,
  },
];
