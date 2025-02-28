import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FaStethoscope,
  FaLaptopMedical,
  FaUserMd,
  FaHospitalUser,
  FaFileMedical,
  FaChartBar,
  FaHeartbeat,
  FaClinicMedical,
  FaHandHoldingMedical,
  FaTablets,
  FaBriefcaseMedical,
  FaHospital,
} from "react-icons/fa";
import { CustomAccordion } from "@/components/CustomAccordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Medical Services | Healthcare Solutions Provider",
  description:
    "Explore our comprehensive range of healthcare services designed to help medical practices improve patient care and operational efficiency.",
};

// Service data with icons
const services = [
  {
    id: 1,
    title: "Electronic Health Records",
    description:
      "Streamlined EHR solutions that improve clinical documentation, enhance patient care, and ensure regulatory compliance.",
    icon: FaFileMedical,
    color: "bg-primary/10 text-primary",
    features: [
      "Customized EHR Implementation",
      "Legacy System Migration",
      "Interoperability Solutions",
      "Regulatory Compliance (HIPAA, MACRA)",
    ],
  },
  {
    id: 2,
    title: "Telehealth Services",
    description:
      "Secure, user-friendly telehealth platforms that expand your practice's reach and improve patient access to care.",
    icon: FaLaptopMedical,
    color: "bg-secondary/10 text-secondary",
    features: [
      "Virtual Visit Platform",
      "Remote Patient Monitoring",
      "Secure Messaging Systems",
      "Mobile Health Applications",
    ],
  },
  {
    id: 3,
    title: "Practice Management",
    description:
      "Comprehensive practice management solutions to optimize workflows, improve efficiency, and enhance the patient experience.",
    icon: FaClinicMedical,
    color: "bg-primary/10 text-primary",
    features: [
      "Scheduling Optimization",
      "Revenue Cycle Management",
      "Staff Training & Development",
      "Operational Efficiency Analysis",
    ],
  },
  {
    id: 4,
    title: "Patient Engagement",
    description:
      "Tools and strategies to enhance patient communication, satisfaction, and involvement in their healthcare journey.",
    icon: FaHospitalUser,
    color: "bg-secondary/10 text-secondary",
    features: [
      "Patient Portal Implementation",
      "Automated Appointment Reminders",
      "Patient Education Resources",
      "Satisfaction Survey Systems",
    ],
  },
  {
    id: 5,
    title: "Healthcare Analytics",
    description:
      "Data-driven insights to improve clinical outcomes, operational efficiency, and financial performance.",
    icon: FaChartBar,
    color: "bg-primary/10 text-primary",
    features: [
      "Clinical Outcomes Analysis",
      "Population Health Management",
      "Financial Performance Metrics",
      "Customized Reporting Dashboards",
    ],
  },
  {
    id: 6,
    title: "Medical Compliance",
    description:
      "Expert guidance and solutions to ensure your practice meets all regulatory requirements and industry standards.",
    icon: FaBriefcaseMedical,
    color: "bg-secondary/10 text-secondary",
    features: [
      "HIPAA Compliance Audits",
      "Policy & Procedure Development",
      "Staff Compliance Training",
      "Risk Assessment & Management",
    ],
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

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Healthcare Services
        </h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-primary"></div>
        <p className="mx-auto max-w-3xl text-lg text-foreground">
          We offer a comprehensive range of healthcare technology and consulting
          services designed to help medical practices enhance patient care,
          improve operational efficiency, and navigate the complex healthcare
          landscape. Each service is tailored to meet the specific needs of your
          healthcare organization.
        </p>
      </section>

      {/* Services Grid with Cards */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden transition-all duration-300"
            >
              <CardHeader className={`${service.color}`}>
                <div className="flex items-center justify-between">
                  <service.icon className="h-10 w-10" />
                  <Badge variant="outline" className="bg-white/30">
                    Medical Service
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <p className="mb-6 text-foreground">{service.description}</p>
                <h4 className="mb-3 font-semibold">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full ${service.color.split(" ")[1]} text-xs`}
                      >
                        ✓
                      </span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-end p-6 pt-0">
                <Button
                  asChild
                  variant="link"
                  className={`${service.color.split(" ")[1]} p-0`}
                >
                  <Link
                    href={`${ROUTES.SERVICES}/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Learn more
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
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
            We follow a clinically-informed process to ensure seamless
            integration of our solutions into your healthcare practice.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
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
          ].map((item) => (
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
