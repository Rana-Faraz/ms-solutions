import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaLeaf,
  FaRocket,
  FaChartLine,
  FaBuilding,
  FaHistory,
  FaAward,
  FaHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStethoscope,
  FaHospital,
  FaUserMd,
  FaClinicMedical,
  FaHeartbeat,
  FaBriefcaseMedical,
  FaFlask,
  FaMicroscope,
  FaHandHoldingMedical,
  FaShieldAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONSTANTS } from "@/static/Constants";

export const metadata = {
  title: "About Us | Medical Solutions Provider",
  description:
    "Learn about our healthcare team, our mission, and how we help medical practices and healthcare providers deliver better patient care.",
};

// Team members data
const teamMembers = [
  {
    name: "Dr. Jane Smith",
    position: "Chief Medical Officer",
    bio: "Board-certified physician with 15+ years of experience in healthcare management and clinical excellence.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Dr. Michael Chen",
    position: "Medical Director",
    bio: "Specialist in healthcare systems optimization with a focus on improving patient outcomes and clinical workflows.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sarah Johnson",
    position: "Healthcare IT Specialist",
    bio: "Expert in medical software implementation and electronic health record systems for modern practices.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Robert Williams",
    position: "Patient Experience Consultant",
    bio: "Dedicated to enhancing patient satisfaction and streamlining healthcare delivery processes.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
    },
  },
];

// Company values data
const values = [
  {
    title: "Patient-Centered Care",
    description:
      "We believe that all healthcare solutions should ultimately improve patient outcomes and experiences. Every service we provide is designed with the patient journey in mind.",
    icon: FaHeartbeat,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Clinical Excellence",
    description:
      "We maintain the highest standards of medical expertise and stay current with the latest healthcare innovations to ensure our solutions meet clinical best practices.",
    icon: FaUserMd,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    title: "Data Security",
    description:
      "We understand the critical importance of protecting patient information and maintaining HIPAA compliance in all our systems and processes.",
    icon: FaShieldAlt,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Collaborative Approach",
    description:
      "We work closely with healthcare providers to understand their unique challenges and develop customized solutions that address their specific needs.",
    icon: FaHandshake,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    title: "Continuous Improvement",
    description:
      "Healthcare is constantly evolving, and so are we. We continuously refine our services and solutions based on outcomes data and client feedback.",
    icon: FaChartLine,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Accessibility",
    description:
      "We're committed to making quality healthcare solutions accessible to medical practices of all sizes, from solo practitioners to large hospital systems.",
    icon: FaHandHoldingMedical,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
];

// Company milestones
const milestones = [
  {
    year: "2015",
    title: "Founded",
    description:
      "Established with a mission to improve healthcare delivery through innovative solutions.",
  },
  {
    year: "2017",
    title: "EHR Integration",
    description:
      "Developed our first electronic health record integration system for small practices.",
  },
  {
    year: "2019",
    title: "Telehealth Platform",
    description:
      "Launched our telehealth platform to help providers reach patients remotely.",
  },
  {
    year: "2021",
    title: "100th Healthcare Client",
    description:
      "Celebrated helping our 100th healthcare provider improve patient care.",
  },
  {
    year: "2023",
    title: "Healthcare Innovation Award",
    description:
      "Recognized for excellence in healthcare technology solutions.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/grid-pattern.svg')] bg-center"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              About Our Healthcare Solutions
            </h1>
            <div className="mx-auto mb-8 h-1 w-24 bg-white"></div>
            <p className="mb-8 text-lg md:text-xl">
              We are a dedicated team of healthcare professionals and technology
              experts committed to improving patient care through innovative
              medical solutions. With deep industry expertise and a
              patient-first approach, we help healthcare providers deliver
              exceptional care efficiently.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-white text-primary hover:bg-accent hover:text-primary"
              >
                <Link href={ROUTES.SERVICES}>Our Medical Services</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10"
              >
                <Link href={ROUTES.CONTACT}>Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section with Side-by-Side Layout */}
      <section className="py-20" aria-labelledby="our-mission">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaStethoscope className="mr-3 h-8 w-8 text-primary" />
            <h2 id="our-mission" className="text-3xl font-bold md:text-4xl">
              Our Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="mb-6 rounded-lg bg-accent p-4">
                <p className="italic text-accent-foreground">
                  "We're dedicated to transforming healthcare delivery through
                  innovative solutions that empower providers and improve
                  patient outcomes."
                </p>
              </div>
              <p className="mb-4 text-foreground">
                Founded in 2015, our company began with a clear vision: to
                address the unique challenges faced by healthcare providers in
                delivering quality patient care while managing the complexities
                of modern medical practice.
              </p>
              <p className="mb-4 text-foreground">
                We recognized that many healthcare organizations struggle with
                outdated systems, inefficient workflows, and limited resources
                that can impact patient care. Our team of medical professionals
                and technology experts came together to create solutions
                specifically designed for the healthcare environment.
              </p>
              <p className="mb-4 text-foreground">
                Since then, we've partnered with hundreds of healthcare
                providers—from small private practices to large hospital
                systems—to implement solutions that enhance clinical outcomes,
                improve operational efficiency, and elevate the patient
                experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {milestone.year}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">{milestone.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <div className="absolute inset-0 bg-muted">
                  {/* Replace with your actual image */}
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <FaHospital className="h-20 w-20 opacity-40" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">Our Healthcare Journey</h3>
                  <p>From startup to trusted partner for medical providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section with Cards */}
      <section className="bg-muted py-20" aria-labelledby="our-values">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaHeart className="mr-3 h-8 w-8 text-primary" />
            <h2 id="our-values" className="text-3xl font-bold md:text-4xl">
              Our Healthcare Values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className={`border ${value.color}`}>
                <CardHeader>
                  <div className="mb-4 flex items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${value.color.split(" ")[0]}`}
                    >
                      <value.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="ml-4 text-xl">
                      {value.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Cards */}
      <section className="py-20" aria-labelledby="our-team">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaUserMd className="mr-3 h-8 w-8 text-primary" />
            <h2 id="our-team" className="text-3xl font-bold md:text-4xl">
              Our Medical Team
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square overflow-hidden bg-muted">
                  {/* Replace with actual team member image */}
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <span className="text-6xl">👨‍⚕️</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground">{member.bio}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-3">
                    {Object.entries(member.social).map(
                      ([platform, url], idx) => (
                        <a
                          key={idx}
                          href={url}
                          className="rounded-full bg-primary/10 p-2 text-primary"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <span className="text-xs font-medium capitalize">
                            {platform}
                          </span>
                        </a>
                      ),
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="bg-primary py-16 text-white"
        aria-labelledby="our-impact"
      >
        <div className="container mx-auto px-4">
          <h2 id="our-impact" className="sr-only">
            Our Healthcare Impact
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              { number: "500+", label: "Healthcare Providers", icon: FaUserMd },
              { number: "8+", label: "Years in Healthcare", icon: FaAward },
              {
                number: "30+",
                label: "Medical Specialties",
                icon: FaBriefcaseMedical,
              },
              { number: "98%", label: "Client Satisfaction", icon: FaHeart },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-4 h-10 w-10 text-primary-foreground/80" />
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-accent/50 py-20" aria-labelledby="testimonials">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaQuoteLeft className="mr-3 h-8 w-8 text-primary" />
            <h2 id="testimonials" className="text-3xl font-bold md:text-4xl">
              What Healthcare Providers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <p className="mb-4 italic text-foreground">
                  "Their solutions have transformed our practice. Patient wait
                  times are down 40%, and our staff can focus more on care
                  instead of paperwork."
                </p>
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <span className="text-xl">👩‍⚕️</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Dr. Rebecca Chen</p>
                    <p className="text-sm text-muted-foreground">
                      Family Medicine Practice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <p className="mb-4 italic text-foreground">
                  "The telehealth platform implementation was seamless. We've
                  been able to reach patients in rural areas who previously had
                  limited access to specialists."
                </p>
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <span className="text-xl">👨‍⚕️</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Dr. James Wilson</p>
                    <p className="text-sm text-muted-foreground">
                      Regional Hospital Director
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20" aria-labelledby="contact-us">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
            <h2 id="contact-us" className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Enhance Your Healthcare Practice?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Our team of healthcare specialists is ready to discuss your unique
              challenges and how our solutions can help improve patient care and
              practice efficiency.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdPhone className="mb-2 h-8 w-8" />
                <span className="text-sm">Call Our Medical Team</span>
                <a
                  href={`tel:${CONSTANTS.PHONE}`}
                  className="font-semibold hover:underline"
                >
                  {CONSTANTS.PHONE}
                </a>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdEmail className="mb-2 h-8 w-8" />
                <span className="text-sm">Email Us</span>
                <a
                  href={`mailto:${CONSTANTS.EMAIL}`}
                  className="font-semibold hover:underline"
                >
                  {CONSTANTS.EMAIL}
                </a>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdLocationOn className="mb-2 h-8 w-8" />
                <span className="text-sm">Visit Our Office</span>
                <address className="font-semibold not-italic">
                  {CONSTANTS.ADDRESS}
                </address>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-accent hover:text-primary"
            >
              <Link href={ROUTES.CONTACT}>Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
