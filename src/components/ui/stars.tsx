import { FC } from "react";

interface StarsProps {
  stars: number;
}

const Stars: FC<StarsProps> = ({ stars }) => {
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

  return <div>{renderStars()}</div>;
};

export default Stars;
