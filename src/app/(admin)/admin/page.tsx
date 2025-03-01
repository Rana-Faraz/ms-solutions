import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {
  FaUserMd,
  FaNewspaper,
  FaTools,
  FaChartLine,
  FaUsers,
  FaBriefcaseMedical,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import { getTeamMembers } from "./team/_actions/team-actions";
import { getServices } from "./services/_actions/service-actions";
import { getBlogPosts } from "@/lib/actions/blog";
import { TableQueryParams } from "@/types/table";

export default async function AdminDashboard() {
  // Fetch summary data for each section
  const queryParams: TableQueryParams<any> = {
    limit: 5,
    offset: 0,
  };

  const { data: teamData } = await getTeamMembers(queryParams);
  const { data: servicesData } = await getServices(queryParams);
  const { data: blogsData } = await getBlogPosts(queryParams);

  // Calculate counts
  const teamCount = teamData?.totalCount || 0;
  const servicesCount = servicesData?.totalCount || 0;
  const blogsCount = blogsData?.total || 0;

  // Stats cards data
  const statsCards = [
    {
      title: "Team Members",
      value: teamCount,
      description: "Total team members",
      icon: FaUserMd,
      link: "/admin/team",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Services",
      value: servicesCount,
      description: "Active services",
      icon: FaBriefcaseMedical,
      link: "/admin/services",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Blog Posts",
      value: blogsCount,
      description: "Published articles",
      icon: FaNewspaper,
      link: "/admin/blogs",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Analytics",
      value: "View",
      description: "Website performance",
      icon: FaChartLine,
      link: "#",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  // Admin sections data
  const adminSections = [
    {
      title: "Team Management",
      description: "Add, edit, or remove team members",
      icon: FaUsers,
      link: "/admin/team",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Services Management",
      description: "Manage your healthcare services",
      icon: FaTools,
      link: "/admin/services",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Blog Management",
      description: "Create and manage blog content",
      icon: FaNewspaper,
      link: "/admin/blogs",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Settings",
      description: "Configure website settings",
      icon: FaCog,
      link: "#",
      color: "bg-gray-500/10 text-gray-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/">View Website</Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start text-xs"
                >
                  <Link href={stat.link}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
            <CardDescription>
              Recent changes across your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading recent activity...</div>}>
              <div className="space-y-4">
                {/* Team Members */}
                <div>
                  <h3 className="mb-2 text-sm font-medium">Team Members</h3>
                  {teamData && teamData.records.length > 0 ? (
                    <ul className="space-y-2">
                      {teamData.records.slice(0, 3).map((member: any) => (
                        <Link
                          key={member.id}
                          href={`/admin/team/${member.id}/preview`}
                          className="flex items-center gap-2 rounded-md border p-2"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                            <FaUserMd className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {member.role}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No team members found
                    </p>
                  )}
                </div>

                {/* Services */}
                <div>
                  <h3 className="mb-2 text-sm font-medium">Services</h3>
                  {servicesData && servicesData.records.length > 0 ? (
                    <ul className="space-y-2">
                      {servicesData.records.slice(0, 3).map((service: any) => (
                        <Link
                          key={service.id}
                          href={`/admin/services/${service.id}/preview`}
                          className="flex items-center gap-2 rounded-md border p-2"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                            <FaBriefcaseMedical className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {service.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {service.enabled ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No services found
                    </p>
                  )}
                </div>

                {/* Blog Posts */}
                <div>
                  <h3 className="mb-2 text-sm font-medium">Blog Posts</h3>
                  {blogsData && blogsData.records.length > 0 ? (
                    <ul className="space-y-2">
                      {blogsData.records.slice(0, 3).map((blog: any) => (
                        <Link
                          key={blog.id}
                          href={`/admin/blogs/${blog.id}/preview`}
                          className="flex items-center gap-2 rounded-md border p-2"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                            <FaNewspaper className="h-4 w-4 text-purple-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{blog.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {blog.isPublished ? "Published" : "Draft"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No blog posts found
                    </p>
                  )}
                </div>
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
