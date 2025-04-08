"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createTeamMember } from "../_actions/team-actions";
import { Separator } from "@/components/ui/separator";

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  image: z.string().min(1, "Image URL is required"),
  enabled: z.boolean().default(true),
  social: z
    .object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface NewTeamFormProps {
  defaultValues?: {
    name: string;
    position: string;
    bio: string;
    image: string;
    enabled: boolean;
  };
  onSubmit?: (values: any) => Promise<void>;
  submitLabel?: string;
}

export function NewTeamForm({
  defaultValues = {
    name: "",
    position: "",
    bio: "",
    image: "/placeholder.jpg",
    enabled: true,
  },
  onSubmit: customSubmit,
  submitLabel = "Create Team Member",
}: NewTeamFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Handle form submission
  async function onSubmit(values: FormValues) {
    if (customSubmit) {
      await customSubmit(values);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create team member
      const result = await createTeamMember({
        name: values.name,
        position: values.position,
        bio: values.bio,
        image: values.image,
        enabled: values.enabled,
        social: values.social || null,
      });

      if (result.success) {
        toast.success("Team member created successfully");
        router.push("/admin/team");
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Enter the team member's basic information
            </p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Smith" {...field} />
                  </FormControl>
                  <FormDescription>
                    The full name of the team member
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Chief Medical Officer" {...field} />
                  </FormControl>
                  <FormDescription>
                    The job title or position of the team member
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Board-certified physician with 15+ years of experience..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief biography of the team member
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="/placeholder.jpg" {...field} />
                </FormControl>
                <FormDescription>
                  URL to the team member's profile image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    Whether this team member should be displayed on the website
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
