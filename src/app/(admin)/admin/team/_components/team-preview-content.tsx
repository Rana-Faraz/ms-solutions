"use client";

import { TeamMember } from "@/lib/db/schema/team";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TeamPreviewContentProps {
  member: TeamMember;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  [key: string]: string | undefined;
}

export function TeamPreviewContent({ member }: TeamPreviewContentProps) {
  const social = (member.social || {}) as SocialLinks;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left">
              <div className="space-y-1">
                <CardTitle className="text-2xl">{member.name}</CardTitle>
                <p className="text-lg text-muted-foreground">
                  {member.position}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant={member.enabled ? "default" : "outline"}>
                  {member.enabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Biography</h3>
            <Separator />
            <p className="whitespace-pre-wrap text-muted-foreground">
              {member.bio}
            </p>
          </div>

          {Object.keys(social).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Social Media</h3>
              <Separator />
              <div className="flex flex-wrap gap-4">
                {social.linkedin && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-9 gap-1"
                  >
                    <Link
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                )}
                {social.twitter && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-9 gap-1"
                  >
                    <Link
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Link>
                  </Button>
                )}
                {social.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-9 gap-1"
                  >
                    <Link
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Metadata</h3>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Created:</span>
                <span>
                  {member.createdAt
                    ? new Date(member.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>
                  {member.updatedAt
                    ? new Date(member.updatedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
