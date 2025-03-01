import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NewTeamForm } from "../_components/new-team-form";

export const metadata = {
  title: "Create New Team Member",
  description: "Add a new team member to your website",
};

export default async function NewTeamPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/team/new");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Team Member</h1>
        <p className="text-muted-foreground">
          Add a new team member to your website
        </p>
      </div>

      <NewTeamForm />
    </div>
  );
}
