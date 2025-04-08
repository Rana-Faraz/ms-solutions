"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ContactSubmission } from "@/lib/db/schema/contact";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  updateContactReadStatus,
  updateContactArchiveStatus,
  deleteContactSubmission,
} from "./_actions/contact-actions";
import { formatDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Trash,
  Archive,
  ArchiveRestore,
  MailOpen,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ContactSubmission>[] = [
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
      const submission = row.original;
      return (
        <Link
          href={`/admin/contacts/${submission.id}`}
          className="flex flex-col hover:text-primary hover:underline"
        >
          <span className="font-medium">{submission.name}</span>
          <span className="text-xs text-muted-foreground no-underline hover:no-underline">
            {submission.email}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const submission = row.original;
      return (
        <Link
          href={`/admin/contacts/${submission.id}`}
          className="block max-w-[300px] truncate hover:text-primary hover:underline"
        >
          {submission.subject}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const submission = row.original;
      return (
        <div className="flex flex-wrap gap-2">
          {!submission.isRead && <Badge className="bg-primary">Unread</Badge>}
          {submission.isArchived && <Badge variant="outline">Archived</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return "N/A";
      return formatDate(new Date(date));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const submission = row.original;

      const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this message?")) {
          try {
            const result = await deleteContactSubmission(submission.id);
            if (!result.success) {
              alert(`Failed to delete message: ${result.error}`);
            }
          } catch (error) {
            console.error("Error deleting message:", error);
            alert("An error occurred while deleting the message.");
          }
        }
      };

      const handleReadStatus = async () => {
        try {
          await updateContactReadStatus(submission.id, !submission.isRead);
        } catch (error) {
          console.error("Failed to update read status:", error);
        }
      };

      const handleArchiveStatus = async () => {
        try {
          await updateContactArchiveStatus(
            submission.id,
            !submission.isArchived,
          );
        } catch (error) {
          console.error("Failed to update archive status:", error);
        }
      };

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
              <Link href={`/admin/contacts/${submission.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReadStatus}>
              {submission.isRead ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Mark as Unread
                </>
              ) : (
                <>
                  <MailOpen className="mr-2 h-4 w-4" />
                  Mark as Read
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleArchiveStatus}>
              {submission.isArchived ? (
                <>
                  <ArchiveRestore className="mr-2 h-4 w-4" />
                  Unarchive
                </>
              ) : (
                <>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
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
