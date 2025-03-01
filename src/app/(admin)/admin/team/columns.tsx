"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TeamMember } from "@/lib/db/schema/team";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateTeamMemberStatus } from "./_actions/team-actions";
import { Switch } from "@/components/ui/switch";

export const TeamColumns: ColumnDef<TeamMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{member.name}</span>
            <span className="text-xs text-muted-foreground">
              {member.position}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => row.getValue("position"),
  },
  {
    accessorKey: "enabled",
    header: "Status",
    cell: ({ row }) => {
      const member = row.original;
      const isEnabled = member.enabled;

      const handleStatusChange = async () => {
        try {
          await updateTeamMemberStatus(member.id, !isEnabled);
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={handleStatusChange}
            aria-label="Toggle status"
          />
          <span>{isEnabled ? "Active" : "Inactive"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return "N/A";
      return format(new Date(date), "MMM d, yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/team/${member.id}/preview`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/team/${member.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this team member?",
                  )
                ) {
                  // Delete action will be implemented in the actions file
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
