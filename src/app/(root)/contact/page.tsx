import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ContactFaq } from "@/components/ContactFaq";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FaHeadset, FaRegClock } from "react-icons/fa";

export const metadata = {
  title: "Contact Us | Your Business Name",
  description:
    "Get in touch with our team to discuss how we can help your small business grow.",
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/grid-pattern.svg')] bg-center"></div>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <div className="mx-auto mb-8 h-1 w-24 bg-white"></div>
            <p className="mb-8 text-lg md:text-xl">
              We're excited to hear from you! Whether you have a question about
              our services, want to discuss a project, or just want to say
              hello, we're here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Cards with Improved Design */}

        {/* Main Content with Form and Info */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          {/* Contact Form Section */}
          <div className="rounded-xl bg-white p-8 ">
            <div className="mb-6 flex items-center">
              <FaHeadset className="mr-3 h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">Send Us a Message</h2>
            </div>
            <div className="mb-6 h-1 w-20 bg-blue-600"></div>
            <ContactForm />
          </div>

          {/* Right Side Information */}
          <div className="space-y-8">
            {/* Office Hours Card */}
            <div className=" p-8 ">
              <div className="mb-4 flex items-center">
                <FaRegClock className="mr-3 h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold">Our Office Hours</h3>
              </div>
              <div className="mb-6 h-1 w-16 bg-blue-600"></div>

              <ul className="space-y-4">
                <li className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium text-gray-700">
                    Monday - Friday
                  </span>
                  <span className="font-semibold text-blue-600">
                    9:00 AM - 5:00 PM
                  </span>
                </li>
                <li className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium text-gray-700">Saturday</span>
                  <span className="font-semibold text-blue-600">
                    10:00 AM - 2:00 PM
                  </span>
                </li>
                <li className="flex justify-between rounded-lg bg-gray-50 p-3">
                  <span className="font-medium text-gray-700">Sunday</span>
                  <span className="font-semibold text-blue-600">Closed</span>
                </li>
              </ul>

              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <p className="text-gray-700">
                  Need urgent assistance? Email us at{" "}
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {process.env.NEXT_PUBLIC_EMAIL ||
                      "contact@yourbusiness.com"}
                  </a>{" "}
                  and we'll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 mb-16 grid grid-cols-1 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="group rounded-lg bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Phone className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Call Us</h3>
              <p className="mb-4 text-gray-700">
                We're available Monday-Friday, 9am-5pm
              </p>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {process.env.NEXT_PUBLIC_PHONE || "(123) 456-7890"}
              </a>
            </div>

            <div className="group rounded-lg bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Mail className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Email Us</h3>
              <p className="mb-4 text-gray-700">
                We'll respond as quickly as possible
              </p>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {process.env.NEXT_PUBLIC_EMAIL || "contact@yourbusiness.com"}
              </a>
            </div>

            <div className="group rounded-lg bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <MapPin className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Visit Us</h3>
              <p className="mb-4 text-gray-700">Come say hello at our office</p>
              <address className="font-medium not-italic text-blue-600">
                123 Business St.
                <br />
                City, State 12345
              </address>
            </div>
          </div>
          {/* FAQ Section */}
          <ContactFaq />
        </div>

        {/* CTA Section */}
        <section className="mt-20 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Ready to Work With Us?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            We're excited to learn about your business and discuss how we can
            help you achieve your goals.
          </p>
          <Link
            href={ROUTES.SERVICES}
            className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Explore Our Services
          </Link>
        </section>
      </div>
    </main>
  );
}
