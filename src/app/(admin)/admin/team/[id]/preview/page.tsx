import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { TeamPreviewActions } from "../../_components/team-preview-actions";
import { TeamPreviewContent } from "../../_components/team-preview-content";
import { getTeamMemberById } from "../../_actions/team-actions";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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
  const { id } = await params;

  // Verify user is authenticated
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/team");
  }

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
