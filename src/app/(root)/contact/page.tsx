import { ContactFaq } from "@/components/ContactFaq";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { CONSTANTS } from "@/static/Constants";
import Link from "next/link";
import {
  FaEnvelope,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
  FaStethoscope,
} from "react-icons/fa";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our healthcare team to discuss how we can help improve your medical practice with our innovative solutions.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/grid-pattern.svg')] bg-center"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Contact Our Healthcare Team
            </h1>
            <div className="mx-auto mb-8 h-1 w-24 bg-white"></div>
            <p className="mb-8 text-lg md:text-xl">
              We're here to support your healthcare organization. Whether you
              have questions about our medical solutions, want to schedule a
              consultation, or need technical support, our team is ready to
              assist.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Main Content with Form and Info */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          {/* Contact Form Section */}
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="mb-4 flex items-center">
                <FaStethoscope className="mr-3 h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-semibold">
                  Request a Healthcare Consultation
                </CardTitle>
              </div>
              <div className="mb-2 h-1 w-20 bg-primary"></div>
            </CardHeader>
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>

          {/* Right Side Information */}
          <div className="space-y-8">
            {/* Office Hours Card */}
            <Card className="border-secondary/20">
              <CardHeader className="bg-secondary/5 pb-2">
                <div className="mb-4 flex items-center">
                  <FaRegClock className="mr-3 h-6 w-6 text-secondary" />
                  <CardTitle className="text-xl font-semibold">
                    Healthcare Support Hours
                  </CardTitle>
                </div>
                <div className="mb-2 h-1 w-16 bg-secondary"></div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex justify-between rounded-lg bg-muted p-3">
                    <span className="font-medium text-foreground">
                      Monday - Friday
                    </span>
                    <span className="font-semibold text-primary">
                      8:00 AM - 6:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-muted p-3">
                    <span className="font-medium text-foreground">
                      Saturday
                    </span>
                    <span className="font-semibold text-primary">
                      9:00 AM - 1:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between rounded-lg bg-muted p-3">
                    <span className="font-medium text-foreground">Sunday</span>
                    <span className="font-semibold text-primary">Closed</span>
                  </li>
                </ul>

                <div className="mt-6 rounded-lg bg-accent p-4">
                  <p className="text-foreground">
                    <span className="font-semibold">
                      24/7 Technical Support:
                    </span>{" "}
                    For urgent healthcare system issues, email us at{" "}
                    <a
                      href={`mailto:${CONSTANTS.EMAIL}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {CONSTANTS.EMAIL}
                    </a>{" "}
                    with "URGENT" in the subject line.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 mb-16 grid grid-cols-1 gap-8 md:col-span-2 md:grid-cols-3">
            <Card className="group border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <FaPhoneAlt className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Call Our Medical Team
                </h3>
                <p className="mb-4 text-foreground">
                  Healthcare consultants available during business hours
                </p>
                <a
                  href={`tel:${CONSTANTS.PHONE}`}
                  className="font-medium text-primary hover:underline"
                >
                  {CONSTANTS.PHONE}
                </a>
              </CardContent>
            </Card>

            <Card className="group border-secondary/20">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <FaEnvelope className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Email Our Healthcare Team
                </h3>
                <p className="mb-4 text-foreground">
                  We respond to all inquiries within 24 hours
                </p>
                <a
                  href={`mailto:${CONSTANTS.EMAIL}`}
                  className="font-medium text-secondary hover:underline"
                >
                  {CONSTANTS.EMAIL}
                </a>
              </CardContent>
            </Card>

            <Card className="group border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <FaMapMarkerAlt className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Visit Our Medical Office
                </h3>
                <p className="mb-4 text-foreground">
                  Schedule an in-person healthcare consultation
                </p>
                <address className="font-medium not-italic text-primary">
                  {CONSTANTS.ADDRESS}
                </address>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-8 flex items-center justify-center">
              <FaHeartbeat className="mr-3 h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Healthcare FAQ</h2>
            </div>
            <ContactFaq />
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-20 rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Ready to Transform Your Healthcare Practice?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Our healthcare technology experts are ready to discuss your specific
            needs and how our solutions can improve patient care and practice
            efficiency.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-accent hover:text-primary"
          >
            <Link href={ROUTES.SERVICES}>Explore Our Healthcare Services</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
