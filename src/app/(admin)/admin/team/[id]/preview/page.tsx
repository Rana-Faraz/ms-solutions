import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getTeamMemberById, getTeamMembers } from "../../_actions/team-actions";
import { TeamPreviewActions } from "../../_components/team-preview-actions";
import { TeamPreviewContent } from "../../_components/team-preview-content";

interface TeamPreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Team Member Preview",
  description: "Preview team member details",
};

export default async function TeamPreviewPage({
  params,
}: TeamPreviewPageProps) {
  const awaitedParams = await params;
  const id = awaitedParams.id;

  // Fetch the team member
  const { member, error } = await getTeamMemberById(id);

  // Handle errors
  if (error || !member) {
    if (error === "Team member not found.") {
      notFound();
    }

    return (
      <div className="container mx-auto py-6">
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          Error: {error || "Failed to load team member"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        {/* Actions */}
        <TeamPreviewActions teamId={id} isEnabled={member.enabled} />

        <Separator />

        {/* Content */}
        <TeamPreviewContent member={member} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const teamMembers = await getTeamMembers({
    limit: 100,
    offset: 0,
  });
  if (teamMembers.error || !teamMembers.data) {
    return [];
  }
  return teamMembers.data.records.map((member) => ({
    id: member.id,
  }));
}

export const dynamicParams = true;
