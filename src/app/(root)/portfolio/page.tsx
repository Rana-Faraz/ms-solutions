import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FaStore,
  FaLaptopCode,
  FaPaintBrush,
  FaBullhorn,
  FaDumbbell,
  FaBalanceScale,
  FaQuoteRight,
  FaBriefcase,
  FaUsers,
  FaAward,
  FaChartLine,
} from "react-icons/fa";

export const metadata = {
  title: "Our Work | Your Business Name",
  description:
    "Explore our portfolio of successful projects and see how we help small businesses grow.",
};

// Enhanced portfolio data with icons and colors
const portfolioItems = [
  {
    id: 1,
    title: "Bloom Boutique",
    category: "E-commerce",
    description:
      "A complete e-commerce solution for a local flower shop, including website design, online ordering system, and digital marketing strategy.",
    results: [
      "200% increase in online sales",
      "35% increase in customer retention",
      "Expanded market reach to neighboring cities",
    ],
    slug: "bloom-boutique",
    icon: FaStore,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: 2,
    title: "Tech Solutions Inc.",
    category: "Web Development",
    description:
      "A modern, responsive website redesign for an IT consulting firm, focusing on improved user experience and lead generation.",
    results: [
      "150% increase in lead generation",
      "40% reduction in bounce rate",
      "Improved search engine rankings for key terms",
    ],
    slug: "tech-solutions",
    icon: FaLaptopCode,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 3,
    title: "Green Earth Landscaping",
    category: "Branding & Marketing",
    description:
      "Complete brand refresh and marketing strategy for a sustainable landscaping company, including logo design, website, and social media campaigns.",
    results: [
      "75% increase in qualified leads",
      "Successfully entered high-end residential market",
      "Featured in local business magazine",
    ],
    slug: "green-earth",
    icon: FaPaintBrush,
    color: "bg-green-50 text-green-600",
  },
  {
    id: 4,
    title: "Sunrise Cafe",
    category: "Digital Marketing",
    description:
      "Comprehensive digital marketing campaign for a family-owned cafe, including social media management, email marketing, and local SEO.",
    results: [
      "45% increase in foot traffic",
      "30% growth in catering orders",
      "Built an engaged social media community of over 5,000 followers",
    ],
    slug: "sunrise-cafe",
    icon: FaBullhorn,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: 5,
    title: "Elite Fitness",
    category: "Web Development",
    description:
      "Custom website with integrated booking system, membership management, and virtual class platform for a boutique fitness studio.",
    results: [
      "60% of new members now sign up online",
      "Successful pivot to hybrid in-person/virtual model",
      "Streamlined administrative processes",
    ],
    slug: "elite-fitness",
    icon: FaDumbbell,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 6,
    title: "Coastal Law Group",
    category: "Branding & Web Development",
    description:
      "Professional brand identity and website for a new law firm, focusing on establishing credibility and generating client inquiries.",
    results: [
      "Established strong market position within 6 months",
      "Website converts 25% of visitors to inquiries",
      "Recognized as a top new business in the region",
    ],
    slug: "coastal-law",
    icon: FaBalanceScale,
    color: "bg-cyan-50 text-cyan-600",
  },
];

// Client testimonials with enhanced structure
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Owner, Bloom Boutique",
    quote:
      "Working with this team has been transformative for our business. They took the time to understand our unique challenges and created solutions that perfectly fit our needs. Our online sales have more than doubled, and we're reaching customers we never could before.",
  },
  {
    name: "Michael Rodriguez",
    position: "Founder, Tech Solutions Inc.",
    quote:
      "The website redesign exceeded our expectations. Not only does it look fantastic, but it's also delivering real business results. The team was professional, responsive, and truly invested in our success. I highly recommend their services.",
  },
];

// Project categories for filter buttons
const categories = [
  "All Projects",
  "E-commerce",
  "Web Development",
  "Branding",
  "Digital Marketing",
];

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Work</h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-blue-600"></div>
        <p className="mx-auto max-w-3xl text-lg text-gray-700">
          Explore our portfolio of successful projects and see how we've helped
          small businesses across various industries grow and thrive.
        </p>
      </section>

      {/* Categories */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              index === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <section className="mb-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white"
            >
              <div className={`p-6 ${item.color}`}>
                <div className="flex items-center justify-between">
                  <item.icon className="h-10 w-10" />
                  <span className="rounded-full bg-white bg-opacity-30 px-3 py-1 text-xs font-semibold">
                    Project {item.id}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
              </div>

              <div className="p-6">
                <div className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                  {item.category}
                </div>
                <p className="mb-6 text-gray-700">{item.description}</p>
                <h4 className="mb-3 font-semibold">Results:</h4>
                <ul className="space-y-2">
                  {item.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full ${item.color.split(" ")[1]} text-xs`}
                      >
                        ✓
                      </span>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-right">
                  <Link
                    href={`${ROUTES.PORTFOLIO}/${item.slug}`}
                    className={`inline-flex items-center font-medium ${item.color.split(" ")[1]}`}
                  >
                    View Case Study
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

      {/* Stats Section */}
      <section className="mb-20 rounded-2xl bg-gray-50 p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Impact</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            We're proud of the results we've achieved for our clients across
            various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { number: "50+", label: "Completed Projects", icon: FaBriefcase },
            { number: "100+", label: "Happy Clients", icon: FaUsers },
            { number: "15+", label: "Industry Awards", icon: FaAward },
            { number: "85%", label: "Growth Rate", icon: FaChartLine },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-100 bg-white p-6 text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            Don't just take our word for it - hear from the businesses we've
            helped.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-blue-100 bg-blue-50 p-8"
            >
              <div className="mb-6 flex justify-center">
                <FaQuoteRight className="h-10 w-10 text-blue-200" />
              </div>
              <p className="mb-6 text-center italic text-gray-700">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to Grow Your Business?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Let's discuss how we can help your small business reach the next level
          with tailored strategies and solutions.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href={ROUTES.CONTACT}
            className="rounded-md bg-white px-8 py-3 font-semibold text-blue-600"
          >
            Start Your Project
          </Link>
          <Link
            href={ROUTES.SERVICES}
            className="rounded-md border border-white bg-transparent px-8 py-3 font-semibold text-white"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
    </main>
  );
}
