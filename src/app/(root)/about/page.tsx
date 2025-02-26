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
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export const metadata = {
  title: "About Us | Your Business Name",
  description:
    "Learn about our company, our mission, and how we help small businesses grow to the next level.",
};

// Team members data
const teamMembers = [
  {
    name: "Jane Doe",
    position: "Founder & CEO",
    bio: "15+ years of experience in business strategy and marketing. Passionate about helping small businesses thrive.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "John Smith",
    position: "Marketing Director",
    bio: "Former agency executive with expertise in digital marketing and brand development for SMBs.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Emily Johnson",
    position: "Lead Developer",
    bio: "Full-stack developer with a background in creating scalable solutions for growing businesses.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Michael Brown",
    position: "Business Strategist",
    bio: "MBA graduate with experience helping over 50 small businesses develop growth strategies.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
    },
  },
];

// Company values data
const values = [
  {
    title: "Client Success",
    description:
      "We measure our success by the success of our clients. Your growth is our primary objective, and we're committed to delivering results that make a real difference to your business.",
    icon: FaChartLine,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    title: "Innovation",
    description:
      "We stay at the forefront of industry trends and technologies to ensure our clients benefit from the most effective and cutting-edge solutions available.",
    icon: FaLightbulb,
    color: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty. We'll always give you straightforward advice, even when it's not what you might want to hear.",
    icon: FaHandshake,
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    title: "Community",
    description:
      "We believe in giving back to the communities we serve and supporting local economic development through our work with small businesses.",
    icon: FaUsers,
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    title: "Sustainability",
    description:
      "We're committed to environmentally responsible business practices and helping our clients implement sustainable solutions.",
    icon: FaLeaf,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  {
    title: "Growth Mindset",
    description:
      "We embrace challenges, persist in the face of obstacles, and see effort as the path to mastery—both for ourselves and our clients.",
    icon: FaRocket,
    color: "bg-rose-50 text-rose-600 border-rose-200",
  },
];

// Company milestones
const milestones = [
  {
    year: "2015",
    title: "Founded",
    description:
      "Started with a mission to help small businesses access quality services at affordable prices.",
  },
  {
    year: "2017",
    title: "Expanded Services",
    description:
      "Added digital marketing and web development to our core offerings.",
  },
  {
    year: "2019",
    title: "Opened Second Office",
    description:
      "Expanded to a second location to better serve our growing client base.",
  },
  {
    year: "2021",
    title: "50th Client Milestone",
    description:
      "Celebrated helping our 50th small business achieve significant growth.",
  },
  {
    year: "2023",
    title: "Award Recognition",
    description:
      "Recognized as a top small business service provider in our region.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/grid-pattern.svg')] bg-center"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">About Us</h1>
            <div className="mx-auto mb-8 h-1 w-24 bg-white"></div>
            <p className="mb-8 text-lg md:text-xl">
              We are a dedicated team of professionals passionate about helping
              small businesses thrive in today's competitive marketplace. With
              years of experience and a client-first approach, we deliver
              tailored solutions that drive real results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={ROUTES.SERVICES}
                className="rounded-md bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Our Services
              </Link>
              <Link
                href={ROUTES.CONTACT}
                className="rounded-md border border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:bg-opacity-10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section with Side-by-Side Layout */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaHistory className="mr-3 h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold md:text-4xl">Our Story</h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <p className="italic text-blue-800">
                  "We set out to create a company that combines enterprise-level
                  expertise with personalized service and affordable pricing
                  tailored specifically for small businesses."
                </p>
              </div>
              <p className="mb-4 text-gray-700">
                Founded in 2015, our company began with a simple observation:
                small businesses often struggle to access the same quality of
                services and expertise that larger corporations enjoy.
              </p>
              <p className="mb-4 text-gray-700">
                We set out to change that by creating a company that combines
                enterprise-level expertise with personalized service and
                affordable pricing tailored specifically for small businesses.
              </p>
              <p className="mb-4 text-gray-700">
                Since then, we've helped hundreds of small businesses across
                various industries achieve sustainable growth, increase their
                market presence, and realize their full potential.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">
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
                <div className="absolute inset-0 bg-gray-200">
                  {/* Replace with your actual image */}
                  <div className="flex h-full w-full items-center justify-center text-gray-500">
                    <FaBuilding className="h-20 w-20 opacity-40" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">Our Journey</h3>
                  <p>From startup to trusted partner for small businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section with Icon Cards - No Hover */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaHeart className="mr-3 h-8 w-8 text-red-500" />
            <h2 className="text-3xl font-bold md:text-4xl">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className={`rounded-lg border ${value.color} p-6 shadow-md`}
              >
                <div className="mb-4 flex items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${value.color.split(" ")[0]}`}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold">{value.title}</h3>
                </div>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - No Hover Effects */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaUsers className="mr-3 h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold md:text-4xl">Our Team</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-gray-200">
                  {/* Replace with actual team member image */}
                  <div className="flex h-full w-full items-center justify-center text-gray-500">
                    <span className="text-6xl">👤</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="mb-3 text-blue-600">{member.position}</p>
                  <p className="mb-4 text-sm text-gray-700">{member.bio}</p>
                  <div className="flex space-x-3">
                    {Object.entries(member.social).map(
                      ([platform, url], idx) => (
                        <a
                          key={idx}
                          href={url}
                          className="rounded-full bg-blue-100 p-2 text-blue-600"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <span className="text-xs font-medium capitalize">
                            {platform}
                          </span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[
              { number: "500+", label: "Clients Served", icon: FaUsers },
              { number: "8+", label: "Years Experience", icon: FaAward },
              { number: "50+", label: "Industries", icon: FaBuilding },
              { number: "95%", label: "Client Satisfaction", icon: FaHeart },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-4 h-10 w-10 text-blue-200" />
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Work With Us?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              We're excited to learn about your business and discuss how we can
              help you achieve your goals.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdPhone className="mb-2 h-8 w-8" />
                <span className="text-sm">Call Us</span>
                <a
                  href="tel:1234567890"
                  className="font-semibold hover:underline"
                >
                  (123) 456-7890
                </a>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdEmail className="mb-2 h-8 w-8" />
                <span className="text-sm">Email Us</span>
                <a
                  href="mailto:contact@example.com"
                  className="font-semibold hover:underline"
                >
                  contact@example.com
                </a>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdLocationOn className="mb-2 h-8 w-8" />
                <span className="text-sm">Visit Us</span>
                <address className="font-semibold not-italic">
                  123 Business St, City
                </address>
              </div>
            </div>
            <Link
              href={ROUTES.CONTACT}
              className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
