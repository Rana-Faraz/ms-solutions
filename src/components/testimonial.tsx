"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Stars from "./ui/stars";

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
          startDelay: 0,
          delay: 2000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {[...reviews, ...reviews].map((item, index) => {
          const { name, content, stars } = item;
          const getFirstLetters = (name: string) =>
            name
              .split(" ")
              .map((word) => word.charAt(0))
              .join("");

          return (
            <CarouselItem
              key={index}
              className="my-8 whitespace-nowrap px-4 md:basis-1/3"
            >
              <div className="flex cursor-grab flex-col items-center space-y-4 rounded-lg bg-zinc-300 p-8 shadow-md">
                <div className="flex flex-col items-center justify-center space-x-2">
                  <span className="font-degular mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-500 text-center text-3xl font-thin text-white">
                    {getFirstLetters(name)}
                  </span>
                  <span className="font-poppins text-xl">{name}</span>
                  <Stars stars={stars} />
                </div>
                <p className="font-poppins whitespace-normal text-pretty text-center text-sm md:text-lg">
                  {content}
                </p>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
