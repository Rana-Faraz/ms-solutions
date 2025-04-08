"use server";

import { db } from "@/lib/db";
import { contactSubmission, ContactSubmission, NewContactSubmission } from "@/lib/db/schema/contact";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { eq, desc, asc, sql, and, or, like, SQL } from "drizzle-orm";
import { TableQueryParams } from "@/types/table";

/**
 * Verifies user authentication and returns the session
 */
async function verifyAuthentication(errorMessage = "Unauthorized") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error(errorMessage);
  }

  return session;
}

/**
 * Revalidates contact submission related paths
 */
function revalidateContactPaths(contactId?: string) {
  revalidatePath("/admin/contacts");
  if (contactId) {
    revalidatePath(`/admin/contacts/${contactId}`);
  }
}

/**
 * Creates a new contact submission
 * This can be used by public users on the contact form
 */
export async function createContactSubmission(data: Omit<NewContactSubmission, "id" | "isRead" | "isArchived" | "createdAt" | "updatedAt">) {
  try {
    // Insert the contact submission
    const result = await db
      .insert(contactSubmission)
      .values({
        ...data,
        isRead: false,
        isArchived: false,
      })
      .returning({ id: contactSubmission.id });

    // Revalidate paths
    revalidateContactPaths();

    return { success: true, id: result[0].id };
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Marks a contact submission as read/unread
 */
export async function updateContactReadStatus(id: string, isRead: boolean) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update the contact submission status
    await db.update(contactSubmission)
      .set({ 
        isRead,
        updatedAt: new Date(),
      })
      .where(eq(contactSubmission.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error updating contact read status:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Archives/unarchives a contact submission
 */
export async function updateContactArchiveStatus(id: string, isArchived: boolean) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update the contact submission status
    await db.update(contactSubmission)
      .set({ 
        isArchived,
        updatedAt: new Date(),
      })
      .where(eq(contactSubmission.id, id));

    // Revalidate paths
    revalidateContactPaths(id);

    return { success: true };
  } catch (error) {
    console.error("Error updating contact archive status:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Deletes a contact submission
 */
export async function deleteContactSubmission(id: string) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Delete the contact submission
    await db.delete(contactSubmission).where(eq(contactSubmission.id, id));

    // Revalidate paths
    revalidateContactPaths();

    return { success: true };
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Gets a contact submission by ID
 */
export async function getContactSubmissionById(id: string) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Get the contact submission
    const result = await db
      .select()
      .from(contactSubmission)
      .where(eq(contactSubmission.id, id))
      .limit(1);

    if (result.length === 0) {
      return { contactSubmission: null, error: "Contact submission not found." };
    }

    return { contactSubmission: result[0], error: null };
  } catch (error) {
    console.error("Error getting contact submission:", error);
    return { contactSubmission: null, error: (error as Error).message };
  }
}

/**
 * Gets all contact submissions with pagination, sorting, and filtering
 */
export async function getContactSubmissions(params: TableQueryParams<ContactSubmission>) {
  try {
    const { limit = 10, offset = 0, sort, filters = [] } = params;

    // Initialize base query builders
    const baseQueryBuilder = db.select().from(contactSubmission);
    const countQueryBuilder = db
      .select({ count: sql<number>`count(*)` })
      .from(contactSubmission);

    // Build filter conditions
    let conditions = undefined;
    const filterConditions: SQL[] = [];

    // Process filters
    if (filters.length > 0) {
      filters.forEach((filter) => {
        const { id, value } = filter;
        if (id === "name" && value) {
          filterConditions.push(like(contactSubmission.name, `%${value}%`));
        } else if (id === "email" && value) {
          filterConditions.push(like(contactSubmission.email, `%${value}%`));
        } else if (id === "subject" && value) {
          filterConditions.push(like(contactSubmission.subject, `%${value}%`));
        } else if (id === "isRead" && value !== undefined) {
          filterConditions.push(eq(contactSubmission.isRead, value === "true"));
        } else if (id === "isArchived" && value !== undefined) {
          filterConditions.push(eq(contactSubmission.isArchived, value === "true"));
        }
      });
    }

    // Apply filter conditions if any
    if (filterConditions.length > 0) {
      conditions = and(...filterConditions);
    }

    // Get total count with filters
    const filteredCountQuery = conditions
      ? countQueryBuilder.where(conditions)
      : countQueryBuilder;

    // Get the count first
    const [totalCount] = await filteredCountQuery;

    // Build the order by clause
    let orderBy;
    if (sort) {
      const [column, direction] = sort.split(".");

      if (column === "name") {
        orderBy = direction === "asc" ? asc(contactSubmission.name) : desc(contactSubmission.name);
      } else if (column === "email") {
        orderBy = direction === "asc" ? asc(contactSubmission.email) : desc(contactSubmission.email);
      } else if (column === "createdAt") {
        orderBy = direction === "asc" ? asc(contactSubmission.createdAt) : desc(contactSubmission.createdAt);
      } else {
        // Default sorting
        orderBy = desc(contactSubmission.createdAt);
      }
    } else {
      // Default sorting
      orderBy = desc(contactSubmission.createdAt);
    }

    // Final query with pagination and sorting
    const records = await baseQueryBuilder
      .where(conditions || undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);

    return {
      data: {
        records,
        pageCount: Math.ceil(Number(totalCount.count) / limit),
        totalCount: Number(totalCount.count),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error getting contact submissions:", error);
    return { data: null, error: (error as Error).message };
  }
} 