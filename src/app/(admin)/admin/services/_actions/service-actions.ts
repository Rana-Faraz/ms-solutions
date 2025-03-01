"use server";

import { db } from "@/lib/db";
import { service, Service, NewService } from "@/lib/db/schema/service";
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
 * Revalidates service related paths
 */
function revalidateServicePaths(serviceId?: string) {
  revalidatePath("/admin/services");
  if (serviceId) {
    revalidatePath(`/admin/services/${serviceId}`);
    revalidatePath(`/admin/services/${serviceId}/edit`);
    revalidatePath(`/admin/services/${serviceId}/preview`);
  }
  revalidatePath("/services");
}

/**
 * Creates a new service
 */
export async function createService(data: Omit<NewService, "id">) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Insert the service
    const result = await db
      .insert(service)
      .values(data)
      .returning({ id: service.id });

    // Revalidate paths
    revalidateServicePaths();

    return { success: true, id: result[0].id };
  } catch (error) {
    console.error("Error creating service:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Updates an existing service
 */
export async function updateService(id: string, data: Omit<NewService, "id">) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update the service
    await db.update(service).set(data).where(eq(service.id, id));

    // Revalidate paths
    revalidateServicePaths(id);

    return { success: true };
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Updates a service's status (enabled/disabled)
 */
export async function updateServiceStatus(id: string, enabled: boolean) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update the service status
    await db.update(service).set({ enabled }).where(eq(service.id, id));

    // Revalidate paths
    revalidateServicePaths(id);

    return { success: true };
  } catch (error) {
    console.error("Error updating service status:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Deletes a service
 */
export async function deleteService(id: string) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Delete the service
    await db.delete(service).where(eq(service.id, id));

    // Revalidate paths
    revalidateServicePaths();

    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Gets a service by ID
 */
export async function getServiceById(id: string) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Get the service
    const result = await db
      .select()
      .from(service)
      .where(eq(service.id, id))
      .limit(1);

    if (result.length === 0) {
      return { service: null, error: "Service not found." };
    }

    return { service: result[0], error: null };
  } catch (error) {
    console.error("Error getting service:", error);
    return { service: null, error: (error as Error).message };
  }
}

/**
 * Gets all services with pagination, sorting, and filtering
 */
export async function getServices(params: TableQueryParams<Service>) {
  try {
    const { limit = 10, offset = 0, sort, filters = [] } = params;

    // Initialize base query builders
    const baseQueryBuilder = db.select().from(service);
    const countQueryBuilder = db
      .select({ count: sql<number>`count(*)` })
      .from(service);

    // Build filter conditions
    let conditions = undefined;
    const filterConditions: SQL[] = [];

    // Process filters
    if (filters.length > 0) {
      filters.forEach((filter) => {
        const { id, value } = filter;
        if (id === "title" && value) {
          filterConditions.push(like(service.title, `%${value}%`));
        } else if (id === "icon" && value) {
          filterConditions.push(like(service.icon, `%${value}%`));
        } else if (id === "enabled" && value !== undefined) {
          filterConditions.push(eq(service.enabled, value === "true"));
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

      if (column === "title") {
        orderBy =
          direction === "asc" ? asc(service.title) : desc(service.title);
      } else if (column === "order") {
        orderBy =
          direction === "asc" ? asc(service.order) : desc(service.order);
      } else if (column === "createdAt") {
        orderBy =
          direction === "asc"
            ? asc(service.createdAt)
            : desc(service.createdAt);
      } else {
        // Default sorting
        orderBy = asc(service.order);
      }
    } else {
      // Default sorting
      orderBy = asc(service.order);
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
    console.error("Error getting services:", error);
    return { data: null, error: (error as Error).message };
  }
}

/**
 * Get all enabled services for public display
 */
export async function getPublicServices() {
  try {
    const services = await db
      .select()
      .from(service)
      .where(eq(service.enabled, true))
      .orderBy(asc(service.order));

    return { services, error: null };
  } catch (error) {
    console.error("Error getting public services:", error);
    return { services: [], error: (error as Error).message };
  }
}

/**
 * Updates the order of services
 */
export async function updateServicesOrder(orderedIds: string[]) {
  try {
    // Verify authentication
    await verifyAuthentication();

    // Update each service with its new order
    await Promise.all(
      orderedIds.map((id, index) =>
        db
          .update(service)
          .set({ order: index + 1 })
          .where(eq(service.id, id)),
      ),
    );

    // Revalidate paths
    revalidateServicePaths();

    return { success: true };
  } catch (error) {
    console.error("Error updating services order:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Get a service by its slug
 */
export async function getServiceBySlug(slug: string) {
  try {
    const services = await db
      .select()
      .from(service)
      .where(eq(service.slug, slug))
      .limit(1);

    const serviceData = services[0] || null;

    return { service: serviceData };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Failed to fetch service" };
  }
}
