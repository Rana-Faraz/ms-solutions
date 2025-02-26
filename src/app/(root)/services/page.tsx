import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FaChartLine,
  FaLaptopCode,
  FaLightbulb,
  FaPaintBrush,
  FaFileAlt,
  FaChartBar,
} from "react-icons/fa";
import { CustomAccordion } from "@/components/CustomAccordion";

export const metadata = {
  title: "Services | Your Business Name",
  description:
    "Explore our range of services designed to help your small business grow to the next level.",
};

// Service data with icons
const services = [
  {
    id: 1,
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies to increase your online presence and drive qualified leads to your business.",
    icon: FaChartLine,
    color: "bg-blue-50 text-blue-600",
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing",
      "Email Marketing Campaigns",
    ],
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Custom website design and development services that create engaging, responsive, and conversion-focused online experiences.",
    icon: FaLaptopCode,
    color: "bg-purple-50 text-purple-600",
    features: [
      "Custom Website Design",
      "E-commerce Solutions",
      "Website Maintenance",
      "Performance Optimization",
    ],
  },
  {
    id: 3,
    title: "Business Consulting",
    description:
      "Strategic business consulting to help you identify opportunities, overcome challenges, and achieve sustainable growth.",
    icon: FaLightbulb,
    color: "bg-amber-50 text-amber-600",
    features: [
      "Business Strategy Development",
      "Market Research & Analysis",
      "Process Optimization",
      "Growth Planning",
    ],
  },
  {
    id: 4,
    title: "Branding & Identity",
    description:
      "Develop a strong, consistent brand identity that resonates with your target audience and sets you apart from competitors.",
    icon: FaPaintBrush,
    color: "bg-green-50 text-green-600",
    features: [
      "Logo Design & Brand Guidelines",
      "Brand Messaging & Positioning",
      "Visual Identity Development",
      "Brand Strategy",
    ],
  },
  {
    id: 5,
    title: "Content Creation",
    description:
      "High-quality content creation services that engage your audience, build authority, and drive conversions.",
    icon: FaFileAlt,
    color: "bg-rose-50 text-rose-600",
    features: [
      "Blog Writing & Management",
      "Copywriting for Websites & Ads",
      "Video Production",
      "Graphic Design",
    ],
  },
  {
    id: 6,
    title: "Analytics & Reporting",
    description:
      "Data-driven insights and reporting to measure performance and inform strategic business decisions.",
    icon: FaChartBar,
    color: "bg-cyan-50 text-cyan-600",
    features: [
      "Performance Tracking",
      "Custom Dashboard Development",
      "Conversion Rate Optimization",
      "ROI Analysis",
    ],
  },
];

// FAQ data
const faqItems = [
  {
    question: "How do you price your services?",
    answer:
      "We offer customized pricing based on your specific needs and the scope of your project. We'll provide a detailed quote after our initial consultation.",
  },
  {
    question: "How long does it typically take to see results?",
    answer:
      "While some services can show immediate results, most strategic initiatives take 3-6 months to demonstrate significant impact. We'll set clear expectations during our planning phase.",
  },
  {
    question: "Do you work with businesses in specific industries?",
    answer:
      "We work with small businesses across various industries. Our diverse experience allows us to apply best practices while tailoring our approach to your specific industry needs.",
  },
  {
    question: "What makes your services different from other agencies?",
    answer:
      "We combine enterprise-level expertise with personalized service and affordable pricing specifically for small businesses. We focus on measurable results and long-term partnerships.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, we offer various maintenance and support packages to ensure your business continues to thrive. We believe in building long-term relationships with our clients.",
  },
  {
    question: "Can you work with my existing team or systems?",
    answer:
      "Absolutely! We're flexible and can collaborate with your in-house team or integrate with your existing systems. We'll adapt our approach to complement your current operations.",
  },
];

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Services</h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-blue-600"></div>
        <p className="mx-auto max-w-3xl text-lg text-gray-700">
          We offer a comprehensive range of services designed to help your small
          business grow and succeed in today's competitive marketplace. Each
          service is tailored to meet your specific needs and goals.
        </p>
      </section>

      {/* Services Grid with Alternating Layout */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300"
            >
              <div className={`p-6 ${service.color}`}>
                <div className="flex items-center justify-between">
                  <service.icon className="h-10 w-10" />
                  <span className="rounded-full bg-white bg-opacity-30 px-3 py-1 text-xs font-semibold">
                    Service {service.id}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{service.title}</h3>
              </div>

              <div className="p-6">
                <p className="mb-6 text-gray-700">{service.description}</p>
                <h4 className="mb-3 font-semibold">What we offer:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full ${service.color.split(" ")[1]} text-xs`}
                      >
                        ✓
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-right">
                  <Link
                    href={`${ROUTES.SERVICES}/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`inline-flex items-center font-medium ${service.color.split(" ")[1]} hover:underline`}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-20 rounded-2xl bg-gray-50 p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Process</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            We follow a proven process to ensure we deliver the best results for
            your business.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: 1,
              title: "Discovery",
              description:
                "We start by understanding your business, goals, and challenges.",
            },
            {
              step: 2,
              title: "Strategy",
              description:
                "We develop a tailored strategy based on your specific needs and objectives.",
            },
            {
              step: 3,
              title: "Implementation",
              description:
                "We execute the strategy with precision and attention to detail.",
            },
            {
              step: 4,
              title: "Optimization",
              description:
                "We continuously monitor and optimize to ensure the best results.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-lg bg-white p-6 shadow-md"
            >
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                {item.step}
              </div>
              <h3 className="mb-3 mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mb-20">
        <div className="rounded-2xl bg-blue-600 p-8 text-white md:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="mb-6 text-xl italic md:text-2xl">
              "Working with this team has been transformative for our business.
              They took the time to understand our unique challenges and created
              solutions that perfectly fit our needs. Our online sales have more
              than doubled!"
            </p>
            <div className="flex items-center justify-center">
              <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-white bg-opacity-20">
                {/* Client image placeholder */}
              </div>
              <div className="text-left">
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm opacity-75">CEO, Bloom Boutique</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with custom component */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            Find answers to common questions about our services.
          </p>
        </div>

        <CustomAccordion items={faqItems} />
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to take your business to the next level?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Contact us today to discuss how our services can help your business
          grow and succeed.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href={ROUTES.CONTACT}
            className="rounded-md bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
          >
            Schedule a Consultation
          </Link>
          <Link
            href={ROUTES.PORTFOLIO}
            className="rounded-md border border-white bg-transparent px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:bg-opacity-10"
          >
            View Our Work
          </Link>
        </div>
      </section>
    </main>
  );
}
