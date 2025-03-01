"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteTeamMember,
  updateTeamMemberStatus,
} from "../_actions/team-actions";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TeamPreviewActionsProps {
  teamId: string;
  isEnabled: boolean;
}

export function TeamPreviewActions({
  teamId,
  isEnabled,
}: TeamPreviewActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [enabled, setEnabled] = useState(isEnabled);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteTeamMember(teamId);
      if (result.success) {
        toast.success("Team member deleted successfully");
        router.push("/admin/team");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async () => {
    setIsUpdatingStatus(true);
    try {
      const newStatus = !enabled;
      const result = await updateTeamMemberStatus(teamId, newStatus);
      if (result.success) {
        setEnabled(newStatus);
        toast.success(
          `Team member ${newStatus ? "activated" : "deactivated"} successfully`,
        );
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Button variant="outline" size="sm" asChild>
        <Link href="/admin/team">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Team Members
        </Link>
      </Button>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Switch
            checked={enabled}
            onCheckedChange={handleStatusChange}
            disabled={isUpdatingStatus}
          />
          <span>{enabled ? "Active" : "Inactive"}</span>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/team/${teamId}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              <Trash className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                team member from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
