"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionFaqProps {
  items: FaqItem[];
}

export default function AccordionFaq({ items }: AccordionFaqProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-700">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
