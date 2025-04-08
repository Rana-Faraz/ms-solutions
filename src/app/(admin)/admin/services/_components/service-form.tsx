"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Service } from "@/lib/db/schema/service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createService, updateService } from "../_actions/service-actions";
import { toast } from "sonner";
import { FeaturesList } from "./features-list";
import { IconPicker } from "./icon-picker";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Icon is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  enabled: z.boolean().default(true),
  order: z.coerce.number().int().positive().default(1),
  slug: z.string().min(1, "Slug is required"),
});

type ServiceFormValues = z.infer<typeof formSchema>;

interface ServiceFormProps {
  service?: Service;
  isEdit?: boolean;
}

export function ServiceForm({ service, isEdit = false }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default values for the form
  const defaultValues: Partial<ServiceFormValues> = {
    title: service?.title || "",
    description: service?.description || "",
    icon: service?.icon || "FaFileMedical",
    features: service?.features || [""],
    enabled: service?.enabled ?? true,
    order: service?.order || 1,
    slug: service?.slug || "",
  };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(data: ServiceFormValues) {
    setIsSubmitting(true);

    try {
      if (isEdit && service) {
        // Update existing service
        const result = await updateService(service.id, data);
        if (result.success) {
          toast.success("Service updated successfully");
          router.push("/admin/services");
          router.refresh();
        } else {
          toast.error(`Failed to update service: ${result.error}`);
        }
      } else {
        // Create new service
        const result = await createService(data);
        if (result.success) {
          toast.success("Service created successfully");
          router.push("/admin/services");
          router.refresh();
        } else {
          toast.error(`Failed to create service: ${result.error}`);
        }
      }
    } catch (error) {
      toast.error(`An error occurred: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Service title" {...field} />
                  </FormControl>
                  <FormDescription>
                    The title of the service to display.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Service slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    The slug of the service to display.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Service description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of the service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <IconPicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Select an icon for this service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <FeaturesList
                      features={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    List the key features of this service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Display order"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The order in which this service appears (lower numbers
                    appear first).
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
                    <FormLabel className="text-base">Enabled</FormLabel>
                    <FormDescription>
                      Enable or disable this service on the website.
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
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/services")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update" : "Create"} Service
          </Button>
        </div>
      </form>
    </Form>
  );
}
