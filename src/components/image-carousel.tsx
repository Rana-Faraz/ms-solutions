"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel({
  content,
}: {
  content: StaticImageData[];
}) {
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
          delay: 2000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {[...content, ...content].map((item, index) => (
          <CarouselItem
            key={index}
            className="my-8 whitespace-nowrap px-4 md:basis-1/2 lg:basis-1/4"
          >
            <Image
              placeholder="blur"
              src={item}
              alt={`Image ${index}`}
              className="w-full cursor-pointer rounded-lg object-cover shadow-lg"
              quality={100}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
