import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FaHospital,
  FaLaptopMedical,
  FaHeartbeat,
  FaUserMd,
  FaClinicMedical,
  FaHandHoldingMedical,
  FaQuoteRight,
  FaBriefcaseMedical,
  FaUsers,
  FaAward,
  FaChartLine,
  FaFileMedical,
  FaStethoscope,
  FaHospitalUser,
  FaTablets,
  FaFlask,
} from "react-icons/fa";
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
  title: "Case Studies | Healthcare Solutions Provider",
  description:
    "Explore our portfolio of successful healthcare implementations and see how we help medical practices improve patient care and operational efficiency.",
};

// Enhanced portfolio data with icons and colors
const portfolioItems = [
  {
    id: 1,
    title: "Westside Family Practice",
    category: "Electronic Health Records",
    description:
      "Complete EHR implementation for a multi-provider family practice, including data migration, workflow optimization, and staff training.",
    results: [
      "30% reduction in documentation time",
      "40% decrease in patient wait times",
      "Improved clinical data reporting capabilities",
    ],
    slug: "westside-family-practice",
    icon: FaFileMedical,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Metro Cardiology Associates",
    category: "Telehealth",
    description:
      "Comprehensive telehealth platform implementation enabling remote patient monitoring and virtual consultations for a cardiology specialty practice.",
    results: [
      "35% increase in patient appointment adherence",
      "Expanded patient base to rural areas",
      "Reduced no-show rate by 45%",
    ],
    slug: "metro-cardiology",
    icon: FaLaptopMedical,
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: 3,
    title: "Oakridge Pediatrics",
    category: "Practice Management",
    description:
      "End-to-end practice management solution including scheduling optimization, billing workflow redesign, and patient communication tools.",
    results: [
      "25% increase in revenue collection",
      "50% reduction in billing errors",
      "Improved patient satisfaction scores",
    ],
    slug: "oakridge-pediatrics",
    icon: FaClinicMedical,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 4,
    title: "Riverside Medical Group",
    category: "Patient Engagement",
    description:
      "Patient engagement platform implementation with portal, automated reminders, and educational resources for a large multi-specialty practice.",
    results: [
      "60% patient portal adoption within 3 months",
      "28% increase in preventive care compliance",
      "Significant reduction in phone call volume",
    ],
    slug: "riverside-medical",
    icon: FaHospitalUser,
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: 5,
    title: "Valley Orthopedic Center",
    category: "Healthcare Analytics",
    description:
      "Custom analytics solution providing clinical outcomes tracking, operational metrics, and financial performance dashboards.",
    results: [
      "Identified 3 key areas for clinical protocol improvement",
      "15% reduction in operational costs",
      "Data-driven expansion of high-performing service lines",
    ],
    slug: "valley-orthopedic",
    icon: FaChartLine,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 6,
    title: "Bayside Mental Health",
    category: "Compliance & Security",
    description:
      "Comprehensive HIPAA compliance program and security infrastructure for a behavioral health practice with multiple locations.",
    results: [
      "Achieved 100% HIPAA compliance score",
      "Implemented secure telehealth for sensitive patient sessions",
      "Established ongoing compliance monitoring system",
    ],
    slug: "bayside-mental-health",
    icon: FaHandHoldingMedical,
    color: "bg-secondary/10 text-secondary",
  },
];

// Client testimonials with enhanced structure
const testimonials = [
  {
    name: "Dr. Rebecca Chen",
    position: "Medical Director, Westside Family Practice",
    quote:
      "Implementing their EHR solution has transformed our practice. Patient wait times have decreased by 30%, documentation is more efficient, and our providers can focus more on patient care rather than paperwork. Their team understood our unique clinical workflows and provided exceptional support throughout the transition.",
  },
  {
    name: "Dr. James Wilson",
    position: "Cardiologist, Metro Cardiology Associates",
    quote:
      "The telehealth platform has revolutionized how we deliver care. We're now able to monitor high-risk patients remotely and intervene earlier when issues arise. The implementation was smooth, and the ongoing support has been outstanding. I highly recommend their services to any medical practice looking to expand their care delivery options.",
  },
];

// Project categories for filter buttons
const categories = [
  "All Case Studies",
  "Electronic Health Records",
  "Telehealth",
  "Practice Management",
  "Patient Engagement",
  "Healthcare Analytics",
];

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Healthcare Case Studies
        </h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-primary"></div>
        <p className="mx-auto max-w-3xl text-lg text-foreground">
          Explore our portfolio of successful healthcare implementations and see
          how we've helped medical practices of all sizes improve patient care,
          streamline operations, and enhance their technology infrastructure.
        </p>
      </section>

      {/* Categories */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={index === 0 ? "default" : "outline"}
            className="rounded-full"
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className={`${item.color}`}>
                <div className="flex items-center justify-between">
                  <item.icon className="h-10 w-10" />
                  <Badge variant="outline" className="bg-white/30">
                    Case Study
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-2xl">{item.title}</CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <Badge className="mb-3 bg-muted text-foreground hover:bg-muted">
                  {item.category}
                </Badge>
                <p className="mb-6 text-foreground">{item.description}</p>
                <h4 className="mb-3 font-semibold">Outcomes:</h4>
                <ul className="space-y-2">
                  {item.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full ${item.color.split(" ")[1]} text-xs`}
                      >
                        ✓
                      </span>
                      <span className="text-foreground">{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-end p-6 pt-0">
                <Button
                  asChild
                  variant="link"
                  className={`${item.color.split(" ")[1]} p-0`}
                >
                  <Link href={`${ROUTES.PORTFOLIO}/${item.slug}`}>
                    View Full Case Study
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

      {/* Stats Section */}
      <section className="mb-20 rounded-2xl bg-muted p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Healthcare Impact</h2>
          <p className="mx-auto max-w-2xl text-foreground">
            We're proud of the results we've achieved for healthcare providers
            across various specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "100+",
              label: "Healthcare Implementations",
              icon: FaHospital,
            },
            {
              number: "500+",
              label: "Medical Providers Served",
              icon: FaUserMd,
            },
            {
              number: "12+",
              label: "Healthcare Innovation Awards",
              icon: FaAward,
            },
            {
              number: "98%",
              label: "Client Satisfaction Rate",
              icon: FaHeartbeat,
            },
          ].map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            What Healthcare Providers Say
          </h2>
          <p className="mx-auto max-w-2xl text-foreground">
            Hear from the medical practices we've helped transform their
            operations and patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-primary/20 bg-accent">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">
                  <FaQuoteRight className="h-10 w-10 text-primary/30" />
                </div>
                <p className="mb-6 text-center italic text-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg">👨‍⚕️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to Transform Your Healthcare Practice?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Let's discuss how our healthcare technology solutions can help your
          practice improve patient care, streamline operations, and achieve your
          goals.
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
            <Link href={ROUTES.SERVICES}>Explore Our Healthcare Services</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
