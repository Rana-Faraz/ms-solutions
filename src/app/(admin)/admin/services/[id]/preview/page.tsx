import { Metadata } from "next";
import { getServiceById } from "../../_actions/service-actions";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import ServiceDetailPage from "@/app/(root)/services/[slug]/page";

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
