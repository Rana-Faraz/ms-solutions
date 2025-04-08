"use client";

import { Service } from "@/lib/db/schema/service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as Icons from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface ServicePreviewProps {
  service: Service;
}

export function ServicePreview({ service }: ServicePreviewProps) {
  // Get the icon component
  const IconComponent = Icons[service.icon as keyof typeof Icons];

  // Define color classes based on order (alternating)
  const colorClass =
    service.order % 2 === 0
      ? "bg-secondary/10 text-secondary"
      : "bg-primary/10 text-primary";

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{service.title}</CardTitle>
            <Badge variant={service.enabled ? "default" : "secondary"}>
              {service.enabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
          <CardDescription>
            Display Order: {service.order} • Created:{" "}
            {formatDate(service.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`rounded-lg p-3 ${colorClass}`}>
              {IconComponent && <IconComponent className="h-6 w-6" />}
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Features:</h3>
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1 text-primary">
                    <Icons.FaCheck className="h-3 w-3" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Website Preview</CardTitle>
          <CardDescription>
            This is how the service will appear on your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className={`rounded-lg p-4 ${colorClass}`}>
                {IconComponent && <IconComponent className="h-8 w-8" />}
              </div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
              <ul className="mt-2 space-y-1 text-left">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Icons.FaCheck className="h-3 w-3 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
