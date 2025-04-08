"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/lib/db/schema/service";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateServiceStatus, deleteService } from "./_actions/service-actions";
import { formatDate } from "@/lib/utils";
import * as Icons from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Service>[] = [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const service = row.original;
      const iconName = service.icon as string;
      const IconComponent =
        Icons[iconName as keyof typeof Icons] || Icons.FaFileMedical;

      return (
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-md ${service.order % 2 === 0 ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}
          >
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{service.title}</span>
            <span className="max-w-[200px] truncate text-xs text-muted-foreground">
              {service.description.substring(0, 50)}...
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("order")}</div>
      );
    },
  },
  {
    accessorKey: "enabled",
    header: "Status",
    cell: ({ row }) => {
      const service = row.original;
      const isEnabled = service.enabled;

      const handleStatusChange = async () => {
        try {
          await updateServiceStatus(service.id, !isEnabled);
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
      return formatDate(new Date(date));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;

      const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this service?")) {
          try {
            const result = await deleteService(service.id);
            if (!result.success) {
              alert(`Failed to delete service: ${result.error}`);
            }
          } catch (error) {
            console.error("Error deleting service:", error);
            alert("An error occurred while deleting the service.");
          }
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
              <Link href={`/admin/services/${service.id}/preview`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/services/${service.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
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
