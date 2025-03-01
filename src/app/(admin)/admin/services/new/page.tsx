import { Metadata } from "next";
import { ServiceForm } from "../_components/service-form";
import { auth } from "@/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create Service",
  description: "Create a new service",
};

export default async function NewServicePage() {
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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Service</h1>
        <p className="text-muted-foreground">
          Add a new service to your website.
        </p>
      </div>

      <div className="space-y-6">
        <ServiceForm />
      </div>
    </div>
  );
}
