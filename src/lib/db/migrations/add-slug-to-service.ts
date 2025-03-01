import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Migration to add the slug field to the service table
 */
export async function addSlugToService() {
  try {
    // Check if the column already exists
    const checkColumnExists = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'service' AND column_name = 'slug'
    `);

    // If the column doesn't exist, add it
    if (checkColumnExists.rows.length === 0) {
      console.log("Adding slug column to service table...");

      // Add the slug column
      await db.execute(sql`
        ALTER TABLE service 
        ADD COLUMN slug TEXT
      `);

      // Update existing records to set slug based on title
      await db.execute(sql`
        UPDATE service 
        SET slug = LOWER(REPLACE(title, ' ', '-'))
      `);

      // Make the column not null after populating it
      await db.execute(sql`
        ALTER TABLE service 
        ALTER COLUMN slug SET NOT NULL
      `);

      console.log("Migration completed successfully!");
    } else {
      console.log("Slug column already exists in service table.");
    }

    return { success: true };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, error };
  }
}
