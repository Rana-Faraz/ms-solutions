import {
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { z } from "zod";

// Define the service table
export const service = pgTable("service", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull(), // Add slug field for URL-friendly identifiers
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Store the icon name as a string
  features: jsonb("features").notNull().$type<string[]>(), // Store features as a JSON array
  enabled: boolean("enabled").notNull().default(true),
  order: integer("order").notNull().default(0), // For controlling the display order
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Define the types
export type Service = typeof service.$inferSelect;
export type NewService = typeof service.$inferInsert;

// Initial seed data for services
export const initialServices = [
  {
    title: "Electronic Health Records",
    slug: "electronic-health-records",
    description:
      "Streamlined EHR solutions that improve clinical documentation, enhance patient care, and ensure regulatory compliance.",
    icon: "FaFileMedical",
    features: [
      "Customized EHR Implementation",
      "Legacy System Migration",
      "Interoperability Solutions",
      "Regulatory Compliance (HIPAA, MACRA)",
    ],
    enabled: true,
    order: 1,
  },
  {
    title: "Telehealth Services",
    slug: "telehealth-services",
    description:
      "Secure, user-friendly telehealth platforms that expand your practice's reach and improve patient access to care.",
    icon: "FaLaptopMedical",
    features: [
      "Virtual Visit Platform",
      "Remote Patient Monitoring",
      "Secure Messaging Systems",
      "Mobile Health Applications",
    ],
    enabled: true,
    order: 2,
  },
  {
    title: "Practice Management",
    slug: "practice-management",
    description:
      "Comprehensive practice management solutions to optimize workflows, improve efficiency, and enhance the patient experience.",
    icon: "FaClinicMedical",
    features: [
      "Scheduling Optimization",
      "Revenue Cycle Management",
      "Staff Training & Development",
      "Operational Efficiency Analysis",
    ],
    enabled: true,
    order: 3,
  },
  {
    title: "Patient Engagement",
    slug: "patient-engagement",
    description:
      "Tools and strategies to enhance patient communication, satisfaction, and involvement in their healthcare journey.",
    icon: "FaHospitalUser",
    features: [
      "Patient Portal Implementation",
      "Automated Appointment Reminders",
      "Patient Education Resources",
      "Satisfaction Survey Systems",
    ],
    enabled: true,
    order: 4,
  },
  {
    title: "Healthcare Analytics",
    slug: "healthcare-analytics",
    description:
      "Data-driven insights to improve clinical outcomes, operational efficiency, and financial performance.",
    icon: "FaChartBar",
    features: [
      "Clinical Outcomes Analysis",
      "Population Health Management",
      "Financial Performance Metrics",
      "Customized Reporting Dashboards",
    ],
    enabled: true,
    order: 5,
  },
  {
    title: "Medical Compliance",
    slug: "medical-compliance",
    description:
      "Expert guidance and solutions to ensure your practice meets all regulatory requirements and industry standards.",
    icon: "FaBriefcaseMedical",
    features: [
      "HIPAA Compliance Audits",
      "Policy & Procedure Development",
      "Staff Compliance Training",
      "Risk Assessment & Management",
    ],
    enabled: true,
    order: 6,
  },
];
