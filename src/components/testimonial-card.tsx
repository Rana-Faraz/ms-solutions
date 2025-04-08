import { Card, CardContent } from "@/components/ui/card";
import { FaQuoteRight } from "react-icons/fa";

interface Testimonial {
  quote: string;
  name: string;
  position: string;
}

export const TestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  return (
    <Card className="border-primary/20 bg-accent">
      <CardContent className="p-8">
        <div className="mb-6 flex justify-center">
          <FaQuoteRight className="h-10 w-10 text-primary/30" />
        </div>
        <p className="mb-6 text-center italic text-foreground">
          "{testimonial.quote}"
        </p>
        <div className="flex items-center justify-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-lg">👨‍⚕️</span>
          </div>
          <div>
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.position}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
