"use server";

import { db } from "@/lib/db";
import { teamMember, TeamMember, NewTeamMember } from "@/lib/db/schema/team";
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
 * Revalidates team member related paths
 */
function revalidateTeamPaths(teamId?: string) {
  revalidatePath("/admin/team");
  if (teamId) {
    revalidatePath(`/admin/team/${teamId}`);
    revalidatePath(`/admin/team/${teamId}/edit`);
    revalidatePath(`/admin/team/${teamId}/preview`);
  }
  revalidatePath("/about");
}

/**
 * Creates a new team member
 */
export async function createTeamMember(data: Omit<NewTeamMember, "id">) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Insert the team member
    const result = await db
      .insert(teamMember)
      .values(data)
      .returning({ id: teamMember.id });

    // Revalidate paths
    revalidateTeamPaths();

    return { success: true, id: result[0].id };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Updates an existing team member
 */
export async function updateTeamMember(
  id: string,
  data: Omit<NewTeamMember, "id">,
) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update the team member
    await db.update(teamMember).set(data).where(eq(teamMember.id, id));

    // Revalidate paths
    revalidateTeamPaths(id);

    return { success: true };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Updates a team member's status (enabled/disabled)
 */
export async function updateTeamMemberStatus(id: string, enabled: boolean) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update the team member status
    await db.update(teamMember).set({ enabled }).where(eq(teamMember.id, id));

    // Revalidate paths
    revalidateTeamPaths(id);

    return { success: true };
  } catch (error) {
    console.error("Error updating team member status:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Deletes a team member
 */
export async function deleteTeamMember(id: string) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Delete the team member
    await db.delete(teamMember).where(eq(teamMember.id, id));

    // Revalidate paths
    revalidateTeamPaths();

    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Gets a team member by ID
 */
export async function getTeamMemberById(id: string) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Get the team member
    const result = await db
      .select()
      .from(teamMember)
      .where(eq(teamMember.id, id))
      .limit(1);

    if (result.length === 0) {
      return { member: null, error: "Team member not found." };
    }

    return { member: result[0], error: null };
  } catch (error) {
    console.error("Error getting team member:", error);
    return { member: null, error: (error as Error).message };
  }
}

/**
 * Gets all team members with pagination, sorting, and filtering
 */
export async function getTeamMembers(params: TableQueryParams<TeamMember>) {
  try {
    const { limit = 10, offset = 0, sort, filters = [] } = params;

    // Initialize base query builders
    const baseQueryBuilder = db.select().from(teamMember);
    const countQueryBuilder = db
      .select({ count: sql<number>`count(*)` })
      .from(teamMember);

    // Build filter conditions
    let conditions = undefined;
    const filterConditions: SQL[] = [];

    // Process filters
    if (filters.length > 0) {
      filters.forEach((filter) => {
        const { id, value } = filter;
        if (id === "name" && value) {
          filterConditions.push(like(teamMember.name, `%${value}%`));
        } else if (id === "position" && value) {
          filterConditions.push(like(teamMember.position, `%${value}%`));
        } else if (id === "enabled" && value !== undefined) {
          filterConditions.push(eq(teamMember.enabled, value === "true"));
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
        orderBy =
          direction === "asc" ? asc(teamMember.name) : desc(teamMember.name);
      } else if (column === "position") {
        orderBy =
          direction === "asc"
            ? asc(teamMember.position)
            : desc(teamMember.position);
      } else if (column === "createdAt") {
        orderBy =
          direction === "asc"
            ? asc(teamMember.createdAt)
            : desc(teamMember.createdAt);
      } else {
        // Default sorting
        orderBy = desc(teamMember.createdAt);
      }
    } else {
      // Default sorting
      orderBy = desc(teamMember.createdAt);
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
    console.error("Error getting team members:", error);
    return { data: null, error: (error as Error).message };
  }
}
