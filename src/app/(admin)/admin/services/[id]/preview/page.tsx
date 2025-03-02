import ServiceDetailPage from "@/app/(root)/services/[slug]/page";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById, getServices } from "../../_actions/service-actions";

export const metadata: Metadata = {
  title: "Service Preview",
  description: "Preview a service",
};

interface ServicePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ServicePreviewPage({
  params,
}: ServicePreviewPageProps) {
  const { id } = await params;

  // Get service data
  const { service, error } = await getServiceById(id);

  if (error || !service) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Service Preview</h1>
          <div className="flex space-x-2">
            <Link href="/admin/services">
              <Button variant="outline">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
            <Link href={`/admin/services/${id}/edit`}>
              <Button>Edit Service</Button>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground">
          Preview how this service will appear on the website.
        </p>
      </div>

      <div className="space-y-6">
        <ServiceDetailPage params={{ slug: service.slug }} />
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
