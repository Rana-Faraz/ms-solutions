"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Stars from "./ui/stars";
import { FaQuoteRight } from "react-icons/fa";

type TestimonialProps = {
  reviews: {
    name: string;
    content: string;
    stars: number;
  }[];
};

export default function Testimonial({ reviews }: TestimonialProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        active: true,
      }}
      plugins={[
        Autoplay({
          playOnInit: true,
          delay: 3500,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {[...reviews, ...reviews].map((item, index) => {
          const { name, content, stars } = item;
          return (
            <CarouselItem
              key={index}
              className="my-4 px-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-background to-background/95 p-6 shadow-md transition-all duration-300 hover:border-primary/20 hover:shadow-lg md:p-8">
                <div className="mb-6 flex justify-end">
                  <FaQuoteRight className="h-8 w-8 text-primary/20" />
                </div>

                <p className="mb-6 text-pretty text-base leading-relaxed text-muted-foreground">
                  "{content}"
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-center text-lg font-medium text-primary">
                    {name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{name}</span>
                    <Stars stars={stars} className="mt-1" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
