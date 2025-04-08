"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import AutoScroll from "embla-carousel-auto-scroll";

const marqueeVariants = cva("py-2 text-primary-foreground", {
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
export interface MarqueeProps extends VariantProps<typeof marqueeVariants> {
  asChild?: boolean;
  content: string[];
  direction?: "forward" | "backward";
}

export default function Marquee({ content, direction, variant }: MarqueeProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        active: true,
        dragFree: true,
      }}
      plugins={[
        AutoScroll({
          playOnInit: true,
          direction: direction,
          startDelay: 0,
          speed: 0.3,
          stopOnInteraction: false,
          stopOnFocusIn: false,
        }),
      ]}
      className={cn(marqueeVariants({ variant }))}
    >
      <CarouselContent>
        {[...content, ...content, ...content, ...content].map((item, index) => (
          <CarouselItem
            key={index}
            className="basis-auto whitespace-nowrap px-4 pl-0"
          >
            <span className="text-sm tracking-wider">{item}</span>{" "}
            <span className="ml-4">-</span>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
