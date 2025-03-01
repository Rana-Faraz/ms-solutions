"use client";

import { TeamMember } from "@/lib/db/schema/team";
import { NewTeamForm } from "./new-team-form";
import { updateTeamMember } from "../_actions/team-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditTeamFormProps {
  member: TeamMember;
}

export function EditTeamForm({ member }: EditTeamFormProps) {
  const router = useRouter();

  // Prepare default values from the team member data
  const defaultValues = {
    name: member.name,
    position: member.position,
    bio: member.bio,
    image: member.image,
    enabled: member.enabled,
    social: member.social || {
      linkedin: "",
      twitter: "",
      github: "",
    },
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      // Update the team member
      const result = await updateTeamMember(member.id, {
        name: values.name,
        position: values.position,
        bio: values.bio,
        image: values.image,
        enabled: values.enabled,
        social: values.social || null,
      });

      if (result.success) {
        toast.success("Team member updated successfully");
        router.push("/admin/team");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <NewTeamForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel="Update Team Member"
    />
  );
}
