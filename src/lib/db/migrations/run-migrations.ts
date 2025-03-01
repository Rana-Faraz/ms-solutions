import { addSlugToService } from "./add-slug-to-service";

/**
 * Run all migrations in sequence
 */
async function runMigrations() {
  console.log("Starting migrations...");

  // Add slug to service table
  const slugMigration = await addSlugToService();
  if (!slugMigration.success) {
    console.error("Failed to add slug to service table:", slugMigration.error);
    process.exit(1);
  }

  console.log("All migrations completed successfully!");
  process.exit(0);
}

// Run the migrations
runMigrations().catch((error) => {
  console.error("Migration process failed:", error);
  process.exit(1);
});
