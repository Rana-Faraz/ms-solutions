import { getPublicServices } from "@/app/(admin)/admin/services/_actions/service-actions";
import { CustomAccordion } from "@/components/CustomAccordion";
import ServicesCard from "@/components/services-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import {
  FaHandHoldingMedical,
  FaHospital,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";

export default async function ServicesPage() {
  const { services, error } = await getPublicServices();

  if (error || !services) {
    console.error("Error loading services:", error);
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            We're currently updating our services. Please check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Services</h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-primary"></div>
        <p className="mx-auto max-w-3xl text-lg text-foreground">
          At Stardom Meditech, we offer a range of healthcare technology
          solutions designed to enhance efficiency, improve patient care, and
          streamline operations for medical practices.
        </p>
      </section>

      {/* Services Grid with Cards */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServicesCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-20 rounded-2xl bg-muted p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Our Healthcare Implementation Process
          </h2>
          <p className="mx-auto max-w-2xl text-foreground">
            At Stardom Meditech, we are committed to optimizing healthcare
            operations through technology-driven solutions. Let us help you
            enhance efficiency and improve patient outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processItems.map((item) => (
            <Card key={item.step} className="relative">
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {item.step}
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mb-20">
        <div className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="mb-6 text-xl italic md:text-2xl">
              "Implementing their EHR solution has transformed our practice.
              Patient wait times have decreased by 30%, documentation is more
              efficient, and our providers can focus more on patient care rather
              than paperwork. Their team understood our unique clinical
              workflows and provided exceptional support throughout the
              transition."
            </p>
            <div className="flex items-center justify-center">
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-primary-foreground bg-opacity-20">
                {/* Client image placeholder */}
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-lg">👩‍⚕️</span>
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold">Dr. Rebecca Chen</p>
                <p className="text-sm opacity-75">
                  Medical Director, Westside Family Practice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with custom component */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Healthcare FAQ</h2>
          <p className="mx-auto max-w-2xl text-foreground">
            Find answers to common questions about our healthcare technology
            solutions.
          </p>
        </div>

        <CustomAccordion items={faqItems} />
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to enhance your healthcare practice?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Contact us today to discuss how our healthcare solutions can help
          improve patient care and practice efficiency.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-accent hover:text-primary"
          >
            <Link href={ROUTES.CONTACT}>Schedule a Consultation</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white bg-transparent text-white hover:bg-white/10"
          >
            <Link href={ROUTES.PORTFOLIO}>View Case Studies</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Medical Services | Healthcare Solutions Provider",
  description:
    "Explore our comprehensive range of healthcare services designed to help medical practices improve patient care and operational efficiency.",
};

const processItems = [
  {
    step: 1,
    title: "Clinical Assessment",
    description:
      "We analyze your practice's unique workflows, challenges, and objectives.",
    icon: FaStethoscope,
  },
  {
    step: 2,
    title: "Solution Design",
    description:
      "We develop a customized implementation plan tailored to your specific clinical needs.",
    icon: FaUserMd,
  },
  {
    step: 3,
    title: "Implementation",
    description:
      "We execute the plan with minimal disruption to your patient care operations.",
    icon: FaHospital,
  },
  {
    step: 4,
    title: "Ongoing Support",
    description:
      "We provide continuous optimization and support to ensure long-term success.",
    icon: FaHandHoldingMedical,
  },
];

// FAQ data
const faqItems = [
  {
    question: "How do you ensure patient data security with your solutions?",
    answer:
      "We implement multiple layers of security including encryption, access controls, and regular security audits. All our solutions are fully HIPAA-compliant and we conduct regular risk assessments to ensure ongoing protection of sensitive patient information.",
  },
  {
    question:
      "How long does implementation of your healthcare solutions typically take?",
    answer:
      "Implementation timelines vary based on the specific solution and the size of your practice. EHR implementations typically take 3-6 months, while telehealth platforms can be deployed in 4-8 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you work with specific medical specialties?",
    answer:
      "We serve healthcare providers across various specialties including primary care, cardiology, orthopedics, pediatrics, and many others. Our solutions are customizable to address the unique workflows and requirements of different medical specialties.",
  },
  {
    question: "What makes your healthcare solutions different from others?",
    answer:
      "Our solutions are developed with direct input from practicing clinicians, ensuring they address real-world healthcare challenges. We focus on intuitive design, seamless integration with existing systems, and ongoing support to ensure long-term success.",
  },
  {
    question: "Do you provide training for our medical staff?",
    answer:
      "Yes, comprehensive training is included with all our implementations. We offer both in-person and virtual training options, role-specific education, and ongoing support resources to ensure your entire team can effectively utilize our solutions.",
  },
  {
    question: "Can your solutions integrate with our existing medical systems?",
    answer:
      "Absolutely! We prioritize interoperability and can integrate with most major EHR systems, laboratory information systems, radiology information systems, and other healthcare platforms. We'll conduct a thorough assessment of your current technology ecosystem during our initial consultation.",
  },
];
