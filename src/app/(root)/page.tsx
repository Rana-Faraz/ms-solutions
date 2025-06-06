import { BlogCard } from "@/components/BlogCard";
import { StatsSection } from "@/components/stats-section";
import { TestimonialCard } from "@/components/testimonial-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/actions/blog";
import { ROUTES } from "@/lib/routes";
import { CONSTANTS } from "@/static/Constants";
import Image from "next/image";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import {
  FaArrowRight,
  FaBookMedical,
  FaClinicMedical,
  FaCommentMedical,
  FaEnvelope,
  FaFileMedical,
  FaHandHoldingMedical,
  FaHeartbeat,
  FaLightbulb,
  FaPhoneAlt,
} from "react-icons/fa";
import Hero from "~/public/images/hero.jpeg";
import About from "~/public/images/about.png";
import { getPublicServices } from "../(admin)/admin/services/_actions/service-actions";

export default async function Home() {
  const recentBlogs = await getBlogPosts({
    limit: 4,
  });

  const services = await getPublicServices();
  return (
    <main className="overflow-hidden">
      {/* Full-width Hero Section with Image Background */}
      <section className="relative max-h-[55vh] min-h-[55vh] w-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/90 to-secondary/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src={Hero}
            alt="Healthcare Technology"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="container relative z-10 mx-auto flex max-h-[55vh] min-h-[55vh] flex-col items-center justify-center px-4 py-12 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <FaHeartbeat className="mr-2 h-3 w-3" /> HEALTHCARE SOLUTIONS
            </Badge>
            <h1 className="mb-4 text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Modern Healthcare Technology
            </h1>
            <p className="mb-6 text-sm md:text-sm">
              to empowering healthcare providers with cutting-edge technology
              that enhances patient care, streamlines clinical workflows, and
              optimizes medical practice operations. Our solutions are designed
              to improve efficiency, reduce administrative burdens, and support
              better health outcomes. Join us in shaping the future of
              healthcare through innovation and technology.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-primary hover:bg-accent hover:text-primary sm:w-auto"
              >
                <Link href={ROUTES.CONTACT} className="flex items-center">
                  <FaHandHoldingMedical className="mr-2 h-4 w-4" /> Get Started
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={ROUTES.SERVICES} className="flex items-center">
                  <FaLightbulb className="mr-2 h-4 w-4" /> Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
      </section>

      <StatsSection />

      {/* Services Section with Cards */}
      <section id="services" className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:mb-16">
            <Badge className="mb-3 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
              <FaLightbulb className="mr-2 h-3 w-3" /> SERVICES
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Healthcare Technology Solutions
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {services.services.map((service, index) => {
              const Icon = FaIcons[service.icon as keyof typeof FaIcons];
              const colorClass =
                index % 2 === 0
                  ? "bg-secondary/10 text-secondary"
                  : "bg-primary/10 text-primary";

              return (
                <Card
                  key={service.id}
                  className="w-full min-w-56 max-w-96 overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <CardHeader
                    className={`${colorClass} flex flex-col items-center p-5`}
                  >
                    <Icon className="h-8 w-8" />
                    <CardTitle className="mt-3 text-xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-5 text-center text-sm text-muted-foreground md:text-base">
                    <p className="line-clamp-2">{service.description}</p>
                    <Link
                      href={ROUTES.SERVICES}
                      className="mt-4 inline-flex items-center text-primary hover:underline"
                    >
                      Learn more <FaArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href={ROUTES.SERVICES} className="flex items-center">
                <FaClinicMedical className="mr-2 h-4 w-4" /> View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section id="about" className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative order-2 md:order-1">
              <div className="relative h-[400px] overflow-hidden rounded-xl md:h-[450px]">
                <Image
                  src={About}
                  alt="Healthcare Solutions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary md:-bottom-6 md:-right-6 md:h-32 md:w-32"></div>
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-secondary md:-left-6 md:-top-6 md:h-24 md:w-24"></div>
            </div>

            <div className="order-1 flex flex-col justify-center md:order-2">
              <Badge className="mb-3 w-fit bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
                <FaBookMedical className="mr-2 h-3 w-3" /> ABOUT US
              </Badge>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
                Transforming Healthcare Through Technology
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="text-base md:text-lg">
                  At our core, we're dedicated to revolutionizing healthcare
                  delivery through technological excellence. We understand that
                  effective healthcare technology is the foundation of modern
                  medical practice.
                </p>
                <div className="relative px-8 py-4">
                  <div className="absolute -left-2 top-0 text-5xl text-primary/20">
                    "
                  </div>
                  <div className="absolute -right-2 bottom-0 rotate-180 text-5xl text-primary/20">
                    "
                  </div>
                  <p className="relative text-center text-base font-medium italic text-primary md:text-lg">
                    Advancing Patient Care Through Digital Innovation
                  </p>
                  <div className="mt-3 flex justify-center">
                    <div className="h-0.5 w-16 rounded bg-primary/30"></div>
                  </div>
                </div>
                <p className="text-base md:text-lg">
                  Our healthcare technology experts bring years of clinical and
                  technical experience to every solution, designed to meet your
                  unique needs and enhance patient outcomes.
                </p>
              </div>

              <div className="mt-6">
                <Button
                  asChild
                  className="bg-secondary text-white hover:bg-secondary/90"
                >
                  <Link href={ROUTES.ABOUT} className="flex items-center">
                    <FaArrowRight className="mr-2 h-4 w-4" /> Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className=" py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <Badge className="mb-3 bg-secondary/10 px-4 py-1 text-xs font-medium text-secondary">
              <FaBookMedical className="mr-2 h-3 w-3" /> BLOGS
            </Badge>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              Healthcare Insights
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {recentBlogs.data?.records &&
            recentBlogs.data.records.length > 0 ? (
              recentBlogs.data.records.map((blog) => (
                <BlogCard variant="secondary" key={blog.id} post={blog} />
              ))
            ) : (
              <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-gradient-to-r from-primary to-secondary backdrop-blur-sm">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-primary/30 blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-secondary/30 blur-xl"></div>
                  <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 transform rounded-full bg-white/5 blur-3xl"></div>

                  {/* Content */}
                  <div className="relative flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                      <div className="flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-white/10">
                        <FaFileMedical className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div className="mb-6 max-w-md">
                      <h3 className="mb-3 text-2xl font-bold text-white">
                        Healthcare Insights Coming Soon
                      </h3>
                      <div className="relative">
                        <div className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-primary/40 to-secondary/40"></div>
                        <p className="pl-4 text-slate-400">
                          We're crafting thoughtful articles on healthcare
                          innovation and medical technology. Subscribe to be
                          notified when new content is available.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                      <Button
                        asChild
                        variant="ghost"
                        className="text-white hover:bg-white/10 hover:text-white"
                      >
                        <Link
                          href={ROUTES.CONTACT}
                          className="flex items-center"
                        >
                          <FaArrowRight className="mr-2 h-4 w-4" /> Contact Us
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {recentBlogs.data?.records && recentBlogs.data.records.length > 0 && (
            <div className="mt-8 text-center md:mt-10">
              <Button asChild size="lg">
                <Link href={ROUTES.BLOGS} className="flex items-center">
                  <FaArrowRight className="mr-2 h-4 w-4" /> View All Blogs
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-6 md:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <Badge className="mb-3 bg-primary/20 px-4 py-1 text-xs font-medium text-primary">
                  <FaIcons.FaPhoneAlt className="mr-2 h-3 w-3" /> CONTACT US
                </Badge>
                <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
                  Ready to Transform Your Practice?
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FaPhoneAlt className="h-4 w-4" />
                    </div>
                    <a
                      href={`tel:${CONSTANTS.PHONE}`}
                      className="text-base font-medium hover:text-primary md:text-lg"
                    >
                      {CONSTANTS.PHONE}
                    </a>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <FaEnvelope className="h-4 w-4" />
                    </div>
                    <a
                      href={`mailto:${CONSTANTS.EMAIL}`}
                      className="text-base font-medium hover:text-secondary md:text-lg"
                    >
                      {CONSTANTS.EMAIL}
                    </a>
                  </div>
                </div>

                <div className="mt-6 md:mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    <Link href={ROUTES.CONTACT} className="flex items-center">
                      <FaHandHoldingMedical className="mr-2 h-4 w-4" /> Schedule
                      a Consultation
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="border-6 relative h-56 w-56 overflow-hidden rounded-full border-white md:h-64 md:w-64 lg:h-72 lg:w-72">
                  <Image
                    src={Hero}
                    alt="Healthcare Consultation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
