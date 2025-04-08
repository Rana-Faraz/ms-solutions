import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamMember } from "@/lib/db/schema";

export const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square overflow-hidden bg-muted">
        {/* Replace with actual team member image */}
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <span className="text-6xl">👨‍⚕️</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{member.name}</CardTitle>
        <CardDescription className="text-primary">
          {member.position}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{member.bio}</p>
      </CardContent>
    </Card>
  );
};
