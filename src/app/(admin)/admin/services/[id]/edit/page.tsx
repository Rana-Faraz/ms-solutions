import { Metadata } from "next";
import { ServiceForm } from "../../_components/service-form";
import { getServiceById } from "../../_actions/service-actions";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Service",
  description: "Edit an existing service",
};

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;
  // Verify authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-2">
        <div className="text-center text-lg font-medium">
          You need to be logged in to access this page.
        </div>
      </div>
    );
  }

  // Get service data
  const { service, error } = await getServiceById(id);

  if (error || !service) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
        <p className="text-muted-foreground">
          Update the details of an existing service.
        </p>
      </div>

      <div className="space-y-6">
        <ServiceForm service={service} isEdit />
      </div>
    </div>
  );
}
