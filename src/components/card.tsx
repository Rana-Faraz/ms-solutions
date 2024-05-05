import { ArrowBigRight, ArrowUpRight } from "lucide-react";

type CardProps = {
  service: {
    id: number;
    name: string;
    description: string;
    link: string;
  };
};

export default function Card({ service }: CardProps) {
  return (
    <div className="group cursor-pointer space-y-4 border border-transparent border-b-[#B9B9B9] py-4 transition-all hover:border-[#B9B9B9]  hover:bg-[#f0f0f0] md:px-4">
      <span className="font-degular text-4xl font-bold text-primary">
        {service.id < 10 ? "0" + service.id : service.id}
      </span>
      <div className="flex items-center justify-between">
        <h3 className="font-degular text-4xl transition-all group-hover:scale-105">
          {service.name}
        </h3>
        <div className="rounded-full bg-secondary p-2">
          <ArrowUpRight
            size={24}
            className="text-white transition-all duration-300 ease-in-out group-hover:rotate-45"
          />
        </div>
      </div>
      <p className="text-pretty text-muted-foreground">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s,
      </p>
    </div>
  );
}
