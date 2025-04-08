import Link from "next/link";
import * as Icons from "react-icons/fa";
import { Service } from "@/lib/db/schema/service";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

interface ServicesCardProps {
  service: Service;
  index: number;
}

export default function ServicesCard({ service, index }: ServicesCardProps) {
  // Get the icon component
  const IconComponent =
    Icons[service.icon as keyof typeof Icons] || Icons.FaFileMedical;

  // Define color classes based on order (alternating)
  const colorClass =
    index % 2 === 0
      ? "bg-secondary/10 text-secondary"
      : "bg-primary/10 text-primary";

  return (
    <Card
      key={service.id}
      className="overflow-hidden transition-all duration-300"
    >
      <CardHeader className={`${colorClass}`}>
        <div className="flex items-center justify-between">
          <IconComponent className="h-10 w-10" />
          <Badge variant="outline" className="bg-white/30">
            Medical Service
          </Badge>
        </div>
        <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <p className="mb-6 text-foreground">{service.description}</p>
        <h4 className="mb-3 font-semibold">Key Features:</h4>
        <ul className="space-y-2">
          {service.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <span
                className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full ${colorClass.split(" ")[1]} text-xs`}
              >
                ✓
              </span>
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end p-6 pt-0">
        <Button
          asChild
          variant="link"
          className={`${colorClass.split(" ")[1]} p-0`}
        >
          <Link href={`${ROUTES.SERVICES}/${service.slug}`}>
            Learn more
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
