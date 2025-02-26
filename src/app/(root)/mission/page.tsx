import React from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  FaLightbulb,
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaHeart,
  FaGlobe,
  FaCheckCircle,
  FaStar,
  FaCompass,
} from "react-icons/fa";

export const metadata = {
  title: "Our Mission | Your Business Name",
  description:
    "Learn about our mission and values that drive us to help small businesses grow to the next level.",
};

export default function MissionPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Mission</h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-blue-600"></div>
        <p className="mx-auto max-w-3xl text-lg text-gray-700">
          Discover the values and principles that drive our commitment to
          helping small businesses thrive.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="p-8 text-center md:p-12">
            <p className="mx-auto mb-6 max-w-2xl text-xl font-medium italic text-gray-700">
              "To empower small businesses with the tools, strategies, and
              support they need to grow, thrive, and make a lasting impact in
              their communities."
            </p>
            <div className="mx-auto h-1 w-16 bg-blue-200"></div>
          </div>
        </div>
      </section>

      {/* About Our Mission */}
      <section className="mb-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            At Your Business Name, we believe that small businesses are the
            backbone of our economy and the heart of our communities. Our
            mission is to help these businesses not just survive, but truly
            thrive in today's competitive marketplace.
          </p>

          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            We understand the unique challenges that small business owners face
            – limited resources, fierce competition, and the constant pressure
            to adapt to changing market conditions. That's why we've dedicated
            ourselves to providing accessible, effective solutions that deliver
            real results.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Our team brings together decades of experience across various
            industries, but we share one common passion: seeing small businesses
            succeed. We measure our success by your success, and we're committed
            to being a trusted partner in your growth journey.
          </p>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What Drives Us</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            Our vision and approach are centered around creating sustainable
            growth and meaningful impact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="bg-indigo-50 p-6 text-indigo-600">
              <FaCompass className="h-10 w-10" />
              <h3 className="mt-4 text-2xl font-bold">Our Vision</h3>
            </div>
            <div className="p-6">
              <p className="mb-4 text-gray-700">
                We envision a world where small businesses have access to the
                same quality of expertise, tools, and strategies as large
                corporations, enabling them to compete effectively and grow
                sustainably.
              </p>
              <p className="text-gray-700">
                We see a future where entrepreneurship is accessible to all, and
                where small businesses can make a significant positive impact on
                their communities and the broader economy.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="bg-blue-50 p-6 text-blue-600">
              <FaChartLine className="h-10 w-10" />
              <h3 className="mt-4 text-2xl font-bold">Our Approach</h3>
            </div>
            <div className="p-6">
              <p className="mb-4 text-gray-700">
                We believe in a holistic, data-driven approach to business
                growth. We don't just focus on quick wins – we help you build
                sustainable systems and strategies that will support your
                business for years to come.
              </p>
              <p className="text-gray-700">
                Every business is unique, which is why we take the time to
                understand your specific goals, challenges, and opportunities
                before recommending solutions. We're not interested in
                one-size-fits-all approaches – we want what truly works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Commitments</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            The promises we make to our clients, our team, and our community
            guide everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="bg-blue-50 p-6 text-blue-600">
              <FaHandshake className="h-10 w-10" />
              <h3 className="mt-4 text-xl font-bold">To Our Clients</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {[
                  "Deliver exceptional value and measurable results",
                  "Provide honest, transparent communication",
                  "Respect your time and resources",
                  "Stay at the forefront of industry trends",
                  "Be a trusted partner in your growth journey",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="bg-purple-50 p-6 text-purple-600">
              <FaUsers className="h-10 w-10" />
              <h3 className="mt-4 text-xl font-bold">To Our Team</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {[
                  "Foster a culture of innovation and excellence",
                  "Provide opportunities for growth and development",
                  "Recognize and reward contributions",
                  "Maintain work-life balance",
                  "Create a diverse and inclusive workplace",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-purple-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="bg-green-50 p-6 text-green-600">
              <FaGlobe className="h-10 w-10" />
              <h3 className="mt-4 text-xl font-bold">To Our Community</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {[
                  "Support local economic development",
                  "Participate in community initiatives",
                  "Operate with environmental responsibility",
                  "Share knowledge and expertise",
                  "Promote ethical business practices",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-20 rounded-2xl bg-gray-50 p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-gray-700">
            These principles guide our decisions and actions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FaStar,
              title: "Excellence",
              description:
                "We strive for excellence in everything we do, from client service to the solutions we deliver.",
              color: "text-amber-600 bg-amber-50",
            },
            {
              icon: FaHeart,
              title: "Integrity",
              description:
                "We operate with honesty, transparency, and a strong ethical foundation in all our interactions.",
              color: "text-red-600 bg-red-50",
            },
            {
              icon: FaHandshake,
              title: "Partnership",
              description:
                "We view ourselves as partners in your success, not just service providers.",
              color: "text-blue-600 bg-blue-50",
            },
            {
              icon: FaLightbulb,
              title: "Innovation",
              description:
                "We continuously seek new and better ways to solve problems and create opportunities.",
              color: "text-purple-600 bg-purple-50",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-6"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                <value.icon
                  className={`h-7 w-7 ${value.color.split(" ")[0]}`}
                />
              </div>
              <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">Join Us in Our Mission</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Whether you're a small business owner looking for support, a potential
          team member who shares our values, or a community partner interested
          in collaboration, we'd love to connect with you.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href={ROUTES.CONTACT}
            className="rounded-md bg-white px-8 py-3 font-semibold text-blue-600"
          >
            Get in Touch
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
