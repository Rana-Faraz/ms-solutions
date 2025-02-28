import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import Logo from "../../public/images/logo.svg";
import { ROUTES } from "@/lib/routes";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getLatestThreeBlogs } from "@/lib/actions/blog";
import { format } from "date-fns";
import { CONSTANTS } from "@/static/Constants";

// Sample recent blog posts - in a real app, these would come from your CMS or API
const recentBlogPosts = [
  {
    title: "10 Digital Marketing Strategies for Small Businesses in 2023",
    href: `${ROUTES.BLOGS}/digital-marketing-strategies-2023`,
    date: "June 15, 2023",
  },
  {
    title: "How to Build a Strong Brand Identity for Your Small Business",
    href: `${ROUTES.BLOGS}/build-strong-brand-identity`,
    date: "May 28, 2023",
  },
  {
    title: "The Ultimate Guide to E-commerce Success for Small Retailers",
    href: `${ROUTES.BLOGS}/ecommerce-success-guide`,
    date: "May 12, 2023",
  },
];

const Sidebar = () => (
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
        <div className="flex items-center justify-center py-4">
          <Image src={Logo} alt="Logo" className="h-8 w-auto" />
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
          {[
            { href: ROUTES.HOME, label: "Home" },
            { href: ROUTES.ABOUT, label: "About Us" },
            { href: ROUTES.SERVICES, label: "Services" },
            { href: ROUTES.PORTFOLIO, label: "Work" },
            { href: ROUTES.MISSION, label: "Mission" },
            { href: ROUTES.CONTACT, label: "Contact Us" },
            { href: ROUTES.BLOGS, label: "Blogs" },
          ].map((item) => (
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
          {recentBlogPosts.map((post) => (
            <li key={post.href}>
              <SheetTrigger asChild>
                <Link
                  href={post.href}
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

// Custom ListItem component for navigation menu
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
});
ListItem.displayName = "ListItem";

// Blog post item for the dropdown
const BlogPostItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { date: string }
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
              <Image src={Logo} alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Navigation Links (Middle Section) */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={ROUTES.HOME} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={ROUTES.ABOUT} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={ROUTES.SERVICES} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Services
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={ROUTES.PORTFOLIO} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Work
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={ROUTES.MISSION} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Mission
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Link href={ROUTES.BLOGS} legacyBehavior passHref>
                      Blogs
                    </Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium">Recent Posts</h4>
                        <Link
                          href={ROUTES.BLOGS}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View All
                        </Link>
                      </div>
                      {latestBlogs.map((post) => (
                        <BlogPostItem
                          key={post.id}
                          title={post.title}
                          date={post.publishedAt?.toISOString() || ""}
                          href={`${ROUTES.BLOGS}/${post.slug}`}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={ROUTES.CONTACT} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
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
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
