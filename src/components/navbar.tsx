import { ArrowRight, CalendarCheck, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getLatestThreeBlogs } from "@/lib/actions/blog";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { CONSTANTS } from "@/static/Constants";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";
import Logo from "../../public/images/download.png";
import { Button } from "./ui/button";
import { ComponentPropsWithoutRef } from "react";
import { ElementRef } from "react";
import { forwardRef } from "react";
import { getPublicServices } from "@/app/(admin)/admin/services/_actions/service-actions";
import * as FaIcons from "react-icons/fa";

// Single source of truth for navigation items
const NAV_ITEMS = [
  { href: ROUTES.HOME, label: "Home", hasDropdown: false },
  { href: ROUTES.ABOUT, label: "About Us", hasDropdown: false },
  { href: ROUTES.SERVICES, label: "Services", hasDropdown: true },
  { href: ROUTES.BLOGS, label: "Blogs", hasDropdown: true },
  { href: ROUTES.CONTACT, label: "Contact Us", hasDropdown: false },
];

const Sidebar = ({ latestBlogs }: { latestBlogs: BlogPost[] }) => {
  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </SheetTrigger>
      <SheetContent className="flex w-[300px] flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-center">
            <Image src={Logo} alt="Logo" className="h-14 w-auto" />
          </div>
        </SheetHeader>

        {/* Contact Info */}
        <div className="border-b py-4">
          <div className="space-y-3 px-1">
            <a
              href={`tel:${CONSTANTS.PHONE}`}
              className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            >
              <Phone className="mr-3 h-4 w-4 text-blue-600" />
              <span>{CONSTANTS.PHONE}</span>
            </a>
            <a
              href={`mailto:${CONSTANTS.EMAIL}`}
              className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            >
              <Mail className="mr-3 h-4 w-4 text-blue-600" />
              <span>{CONSTANTS.EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-auto py-6">
          <ul className="space-y-4 px-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <SheetTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex w-full items-center rounded-md py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </SheetTrigger>
              </li>
            ))}
          </ul>
        </nav>

        {/* Recent Blog Posts */}
        <div className="border-b border-t py-4">
          <h3 className="mb-3 px-1 text-sm font-semibold text-gray-500">
            RECENT POSTS
          </h3>
          <ul className="space-y-3 px-1">
            {latestBlogs.map((post) => (
              <li key={post.id}>
                <SheetTrigger asChild>
                  <Link
                    href={`${ROUTES.BLOGS}/${post.slug}`}
                    className="block rounded-md py-1 text-sm text-gray-700 transition-colors hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </SheetTrigger>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="py-6">
          <SheetTrigger asChild>
            <Link href={ROUTES.CONTACT} className="block w-full">
              <Button className="w-full">Schedule A Call</Button>
            </Link>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Custom ListItem component for navigation menu
const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

// Blog post item for the dropdown
const BlogPostItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a"> & { date: string }
>(({ className, title, date, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
            className,
          )}
          {...props}
        >
          <div className="mb-1 text-sm font-medium leading-none">{title}</div>
          <p className="text-xs text-muted-foreground">
            {format(new Date(date), "MMM d, yyyy")}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
BlogPostItem.displayName = "BlogPostItem";

export default async function Navbar() {
  const latestBlogs = await getLatestThreeBlogs();
  const latestServices = await getPublicServices();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Top bar with contact info */}
      <div className="hidden border-b border-gray-100 bg-gray-50 py-2 md:block">
        <div className="container mx-auto flex items-center justify-end px-4">
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${CONSTANTS.PHONE}`}
              className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>{CONSTANTS.PHONE}</span>
            </a>
            <div className="h-4 w-px bg-gray-300"></div>
            <a
              href={`mailto:${CONSTANTS.EMAIL}`}
              className="flex items-center text-sm text-gray-600 hover:text-blue-600"
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>{CONSTANTS.EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Branding (Left Section) */}
          <div className="flex items-center">
            <Link href={ROUTES.HOME} className="flex items-center">
              <Image src={Logo} alt="Logo" className="h-14 w-auto " />
            </Link>
          </div>

          {/* Navigation Links (Middle Section) */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {NAV_ITEMS.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    {item.hasDropdown ? (
                      <>
                        <NavigationMenuTrigger>
                          <Link href={item.href} legacyBehavior passHref>
                            {item.label}
                          </Link>
                        </NavigationMenuTrigger>
                        {item.href === ROUTES.BLOGS && (
                          <NavigationMenuContent>
                            <div className="w-[450px] p-4">
                              <div className="mb-4 flex items-center justify-between border-b pb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  Our Blog
                                </h3>
                                <Link
                                  href={ROUTES.BLOGS}
                                  className="flex items-center text-sm font-medium text-primary hover:text-primary/80"
                                >
                                  View All
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </div>

                              <p className="mb-3 text-sm text-gray-600">
                                Stay updated with our latest insights and
                                industry trends
                              </p>

                              <div className="grid gap-4">
                                {latestBlogs.map((post) => (
                                  <div
                                    key={post.id}
                                    className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all "
                                  >
                                    <Link
                                      href={`${ROUTES.BLOGS}/${post.slug}`}
                                      className="block p-3"
                                    >
                                      <h4 className="mb-1 font-medium text-gray-900 transition-colors group-hover:text-primary/80">
                                        {post.title}
                                      </h4>
                                      {post.excerpt && (
                                        <p className="mb-2 line-clamp-2 text-xs text-gray-600">
                                          {post.excerpt}
                                        </p>
                                      )}
                                      <div className="flex items-center text-xs text-gray-500">
                                        <CalendarCheck className="mr-1 h-3 w-3" />
                                        {post.publishedAt
                                          ? format(
                                              new Date(post.publishedAt),
                                              "MMM d, yyyy",
                                            )
                                          : ""}
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        )}
                        {item.href === ROUTES.SERVICES && (
                          <NavigationMenuContent>
                            <div className="w-[450px] p-4">
                              <div className="mb-4 flex items-center justify-between border-b pb-2">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  Our Services
                                </h3>
                                <Link
                                  href={ROUTES.SERVICES}
                                  className="flex items-center text-sm font-medium text-primary hover:text-primary/80"
                                >
                                  View All
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </div>

                              <p className="mb-3 text-sm text-gray-600">
                                Comprehensive solutions tailored to your
                                business needs
                              </p>

                              <div className="grid grid-cols-2 gap-4">
                                {latestServices.services.map(
                                  (service, index) => {
                                    const Icon =
                                      FaIcons[
                                        service.icon as keyof typeof FaIcons
                                      ];
                                    const colorClass =
                                      index % 2 === 0
                                        ? "bg-secondary/10 text-secondary"
                                        : "bg-primary/10 text-primary";
                                    return (
                                      <div
                                        key={service.id}
                                        className={`group rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all  ${colorClass}`}
                                      >
                                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 ">
                                          <Icon />
                                        </div>
                                        <h4 className="mb-1 font-medium text-gray-900 transition-colors ">
                                          {service.title}
                                        </h4>
                                        <p className="text-xs text-gray-600">
                                          {service.description}
                                        </p>
                                      </div>
                                    );
                                  },
                                )}
                              </div>

                              <div className="mt-4">
                                <Link
                                  href={ROUTES.CONTACT}
                                  className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/80"
                                >
                                  Request a Consultation
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </div>
                            </div>
                          </NavigationMenuContent>
                        )}
                      </>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button (Right Section) */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link href={ROUTES.CONTACT}>
                <Button>Schedule A Call</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Sidebar latestBlogs={latestBlogs as BlogPost[]} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
