import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

interface CaseStudyCardProps {
  item: Partial<{
    id: number;
    title: string;
    category: string;
    description: string;
    results: string[];
    slug: string;
    icon: React.ElementType;
    color: string;
  }>;
  showResults?: boolean;
}

export const CaseStudyCard = ({
  item,
  showResults = false,
}: CaseStudyCardProps) => {
  return (
    <Card key={item.id} className="overflow-hidden">
      <CardHeader className={`${item.color}`}>
        <div className="flex items-center justify-between">
          {item.icon && <item.icon className="h-10 w-10" />}
          <Badge variant="outline" className="bg-white/30">
            Case Study
          </Badge>
        </div>
        <CardTitle className="mt-4 text-2xl">{item.title}</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {item.category && (
          <Badge className="mb-3 bg-muted text-foreground hover:bg-muted">
            {item.category}
          </Badge>
        )}
        <p className="mb-6 text-foreground">{item.description}</p>
        {showResults && (
          <>
            <h4 className="mb-3 font-semibold">Outcomes:</h4>
            <ul className="space-y-2">
              {item.results?.map((result, index) => (
                <li key={index} className="flex items-start">
                  <span
                    className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full ${item.color?.split(" ")[1]} text-xs`}
                  >
                    ✓
                  </span>
                  <span className="text-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter className="justify-end p-6 pt-0">
        <Button
          asChild
          variant="link"
          className={`${item.color?.split(" ")[1]} p-0`}
        >
          <Link href={`${ROUTES.PORTFOLIO}/${item.slug}`}>
            View Full Case Study
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
};
