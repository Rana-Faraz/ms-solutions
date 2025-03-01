import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as Icons from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import { getServiceBySlug } from "@/app/(admin)/admin/services/_actions/service-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { service, error } = await getServiceBySlug(slug);

  if (error || !service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { service, error } = await getServiceBySlug(params.slug);

  if (error || !service) {
    console.error("Error loading service:", error);
    return notFound();
  }

  // Get the icon component
  const IconComponent =
    Icons[service.icon as keyof typeof Icons] || Icons.FaFileMedical;

  // Define color classes based on order
  const colorClass =
    service.order % 2 === 0
      ? "bg-secondary/10 text-secondary"
      : "bg-primary/10 text-primary";

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Link
          href={ROUTES.SERVICES}
          className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icons.FaArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className={`mb-6 inline-flex rounded-lg p-4 ${colorClass}`}>
            <IconComponent className="h-12 w-12" />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {service.title}
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            {service.description}
          </p>

          <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
          <ul className="mb-8 space-y-3">
            {service.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <div className={`mr-3 mt-1 rounded-full p-1 ${colorClass}`}>
                  <Icons.FaCheck className="h-3 w-3" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="mt-4">
            <Link href={ROUTES.CONTACT}>Request a Consultation</Link>
          </Button>
        </div>

        <div className="rounded-lg bg-muted p-8">
          <h2 className="mb-6 text-2xl font-semibold">
            Why Choose Our {service.title} Service
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div
                className={`h-12 w-12 shrink-0 rounded-full p-3 ${colorClass}`}
              >
                <Icons.FaUserMd className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Expert Implementation</h3>
                <p className="text-muted-foreground">
                  Our team of healthcare technology experts ensures smooth
                  implementation with minimal disruption.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className={`h-12 w-12 shrink-0 rounded-full p-3 ${colorClass}`}
              >
                <Icons.FaHeartbeat className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Improved Patient Outcomes
                </h3>
                <p className="text-muted-foreground">
                  Our solutions are designed to enhance patient care and improve
                  clinical outcomes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className={`h-12 w-12 shrink-0 rounded-full p-3 ${colorClass}`}
              >
                <Icons.FaChartBar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Data-Driven Insights</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights from your healthcare data to make
                  informed decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className={`h-12 w-12 shrink-0 rounded-full p-3 ${colorClass}`}
              >
                <Icons.FaHandHoldingMedical className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Ongoing Support</h3>
                <p className="text-muted-foreground">
                  We provide continuous support and updates to ensure your
                  systems remain effective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Ready to Transform Your Healthcare Practice?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Contact us today to learn more about our {service.title} service and
          how it can benefit your practice.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href={ROUTES.CONTACT}>Contact Us</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={ROUTES.SERVICES}>Explore Other Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
