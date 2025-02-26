"use client";

import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { CustomAccordion } from "@/components/CustomAccordion";

// FAQ data
const faqItems = [
  {
    question: "How quickly can you start on my project?",
    answer:
      "Typically, we can begin work within 1-2 weeks of finalizing project details and receiving the initial payment. For urgent projects, we may be able to accommodate a faster timeline - just let us know your needs during our initial consultation.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes, we offer various maintenance and support packages to ensure your business continues to thrive. Our support options include technical maintenance, content updates, performance monitoring, and strategic consultations to help your business adapt and grow.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with small businesses across various industries, including retail, professional services, healthcare, technology, hospitality, education, and more. Our diverse experience allows us to apply best practices while tailoring our approach to your specific industry needs.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer customized pricing based on your specific needs and the scope of your project. After our initial consultation, we'll provide a detailed proposal outlining the services, timeline, and associated costs. We're committed to providing transparent pricing with no hidden fees.",
  },
  {
    question: "Do you work with businesses outside your local area?",
    answer:
      "Absolutely! We work with clients nationwide and can handle all aspects of your project remotely. We use video conferencing, collaborative tools, and regular check-ins to ensure smooth communication regardless of location.",
  },
];

export function ContactFaq() {
  return (
    <div className="col-span-1 p-6 md:col-span-2">
      <div className="mb-6 flex items-center">
        <FaQuestionCircle className="mr-3 h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
      </div>

      <CustomAccordion items={faqItems} />
    </div>
  );
}
