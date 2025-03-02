import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceById, getServices } from "../../_actions/service-actions";
import { ServiceForm } from "../../_components/service-form";

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

export async function generateStaticParams() {
  const services = await getServices({
    limit: 100,
    offset: 0,
  });
  if (services.error || !services.data) {
    return [];
  }
  return services.data.records.map((service) => ({
    id: service.id,
  }));
}

export const dynamicParams = true;
