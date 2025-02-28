import { FC } from "react";
import { cn } from "@/lib/utils";

interface StarsProps {
  stars: number;
  className?: string;
}

const Stars: FC<StarsProps> = ({ stars, className }) => {
  const renderStars = () => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starElements.push(
          <span key={i} className="text-2xl text-secondary">
            &#9733;
          </span>,
        );
      } else {
        starElements.push(
          <span key={i} className="text-2xl text-muted-foreground">
            &#9733;
          </span>,
        );
      }
    }
    return starElements;
  };

  return <div className={cn(className)}>{renderStars()}</div>;
};

export default Stars;
