import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "~/public/images/hero.png";
import About from "~/public/images/section-about.png";
import Plane from "~/public/images/floating-plane.svg";
import Rings from "~/public/images/floating-rings.svg";
import { CONSTANTS } from "@/static/Constants";
import Services from "@/static/services.json";
import DeatilServices from "@/static/service-details.json";
import CompanyHistory from "@/static/history.json";
import Marquee from "@/components/marquee";
import Card from "@/components/card";
import History from "@/components/history";
import Portfolio1 from "~/public/images/portfolio-1.png";
import Portfolio2 from "~/public/images/portfolio-2.png";
import Portfolio3 from "~/public/images/portfolio-3.png";
import Portfolio4 from "~/public/images/portfolio-4.png";
import ImageCarousel from "@/components/image-carousel";
import Testimonial from "@/components/testimonial";
import Testimonials from "@/static/testimonials.json";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactImage from "~/public/images/contact-image.png";
import CheckmarkPoint from "@/components/checkmark-point";
import ServicePoints from "@/static/service-points.json";
import WhyUsPoints from "@/static/why-us-points.json";
import Link from "next/link";
import {
  FaStethoscope,
  FaHeartbeat,
  FaHospital,
  FaUserMd,
  FaLaptopMedical,
  FaFileMedical,
  FaClinicMedical,
} from "react-icons/fa";
import { ROUTES } from "@/lib/routes";

export const metadata = {
  title:
    "Healthcare Solutions Provider | Medical Technology for Modern Practices",
  description:
    "Innovative healthcare technology solutions designed to improve patient care, streamline clinical workflows, and optimize medical practice operations.",
};

export default function Home() {
  const Portfolio = [Portfolio1, Portfolio2, Portfolio3, Portfolio4];

  return (
    <main className="snap-start scroll-smooth">
      {/* Hero Section */}
      <section
        id="landing"
        className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="relative flex flex-col justify-center space-y-6">
              <h1 className="font-degular text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl xl:text-7xl">
                Healthcare,
                <br />
                <span className="text-secondary">Innovation</span>
                <br />& Technology
              </h1>
              <p className="max-w-lg text-xl text-muted-foreground md:text-2xl">
                For Modern Medicine.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Link href="#contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full text-base font-medium shadow-sm"
                  >
                    Schedule A Consultation
                  </Button>
                </Link>
                <Link href="#services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-base font-medium shadow-sm"
                  >
                    Explore Solutions
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <Image
                src={Hero}
                alt="Healthcare Technology"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Sections */}
      <div className="py-2">
        <Marquee direction="forward" content={Services} />
        <Marquee direction="backward" content={Services} variant="secondary" />
      </div>

      {/* About Section */}
      <section
        id="about"
        className="bg-gradient-to-b from-background to-background/95 py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="relative order-2 flex items-center justify-center md:order-1">
              <Image
                src={About}
                alt="Healthcare Solutions"
                placeholder="blur"
              />
            </div>
            <div className="order-1 space-y-6 md:order-2">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                ABOUT OUR HEALTHCARE SOLUTIONS
              </span>
              <h2 className="font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Transforming Healthcare Through Innovative Technology Solutions
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base leading-relaxed md:text-lg">
                  At our core, we're dedicated to revolutionizing healthcare
                  delivery through technological excellence. We understand that
                  effective healthcare technology is the foundation of modern
                  medical practice, enabling the seamless execution of vital
                  clinical and administrative workflows.
                </p>
                <blockquote className="border-l-4 border-primary/30 bg-primary/5 p-4 text-center italic">
                  "Advancing Patient Care Through Digital Innovation"
                </blockquote>
                <p className="text-base leading-relaxed md:text-lg">
                  Benefit from the guidance of our healthcare technology experts
                  who bring years of clinical and technical experience to every
                  solution. Whether you're a small practice or a large hospital
                  system, our tailored healthcare platforms are designed to meet
                  your unique needs and enhance patient outcomes.
                </p>
                <blockquote className="border-l-4 border-secondary/30 bg-secondary/5 p-4 text-center italic">
                  "Empowering Healthcare Providers with Intelligent Solutions"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 p-6 text-center">
            <p className="text-lg font-medium md:text-xl">
              Contact Our Healthcare Team or Email Us at{" "}
              <a
                href={`mailto:${CONSTANTS.EMAIL}`}
                className="font-semibold text-secondary transition-colors hover:text-secondary/80 hover:underline"
              >
                {CONSTANTS.EMAIL}
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              HEALTHCARE SOLUTIONS
            </span>
            <h2 className="max-w-3xl text-center font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              We're a healthcare technology provider connecting medical
              professionals to patients
            </h2>
            <p className="max-w-3xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
              Our suite of healthcare solutions encompasses comprehensive
              medical technology systems designed to help healthcare providers
              deliver exceptional patient care with efficiency and precision.
              Our expertise spans across various domains including electronic
              health records, telehealth platforms, practice management systems,
              healthcare analytics, and patient engagement solutions.
            </p>
            <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {DeatilServices.map((service) => (
                <Card key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {CompanyHistory.map((history) => (
              <History key={history.title} history={history} />
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="relative overflow-hidden bg-squiggly-pattern bg-contain bg-center bg-no-repeat py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="container relative mx-auto px-4">
          <div className="mb-12 flex flex-col items-center space-y-4 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              CASE STUDIES
            </span>
            <h2 className="font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Healthcare Success Stories
            </h2>
          </div>
          <ImageCarousel content={Portfolio} />
        </div>
      </section>

      {/* Marquee Sections */}
      <div className="py-2">
        <Marquee direction="forward" content={Services} />
        <Marquee direction="backward" content={Services} variant="secondary" />
      </div>

      {/* Mission Section */}
      <section
        id="misson"
        className="bg-gradient-to-b from-background to-background/95 py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col items-center space-y-4 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                MISSION AND VISION
              </span>
              <h2 className="font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Empowering Healthcare Excellence with Medical Solutions
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-base leading-relaxed md:text-lg">
                At Medical Solutions, we are dedicated to revolutionizing
                healthcare delivery through our innovative technology platforms
                and solutions. Our mission is to provide tailored healthcare
                technology to medical practices, helping them enhance patient
                care in the digital age.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                We envision a healthcare ecosystem where technology seamlessly
                supports clinical workflows, where our dedicated solutions not
                only improve efficiency but also enhance the quality of care
                delivered to patients. Through advanced technologies such as
                secure data exchange, interoperability, and intelligent
                analytics, coupled with personalized implementation, we ensure
                compliance, reliability, and clinical success.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                Join us on this journey as we pave the way for healthcare
                excellence with Medical Solutions.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              {ServicePoints.map((point) => (
                <CheckmarkPoint key={point} point={point} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        id="testimonial"
        className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <FaStethoscope className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                HEALTHCARE TESTIMONIALS
              </span>
            </div>
            <h2 className="font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              What Medical Professionals Say
            </h2>
          </div>
          <Testimonial reviews={Testimonials} />
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <FaHeartbeat className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Why Choose Medical Solutions?
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              At Medical Solutions, we're committed to providing unparalleled
              healthcare technology and support, making us a trusted partner for
              medical practices of all sizes. Here's why healthcare providers
              choose our solutions:
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <ul className="space-y-4">
              {WhyUsPoints.map((point, index) => {
                const trueIndex = index + 1;
                return (
                  <li
                    key={index}
                    className="rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {trueIndex}
                      </span>
                      <div>
                        <h3 className="font-bold text-primary">
                          {point.title}
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          {point.content}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl bg-contact-pattern bg-cover bg-center bg-no-repeat shadow-lg">
            <div className="grid grid-cols-1 gap-8 bg-background/90 p-6 backdrop-blur-sm md:grid-cols-2 md:gap-12 md:p-8 lg:p-12">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <FaUserMd className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    CONTACT OUR HEALTHCARE TEAM
                  </span>
                </div>
                <h2 className="font-degular text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                  Let's Discuss Your Healthcare Technology Needs
                </h2>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="h-12 rounded-lg border-border/60 bg-background/80 text-base backdrop-blur-sm focus:border-primary"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="h-12 rounded-lg border-border/60 bg-background/80 text-base backdrop-blur-sm focus:border-primary"
                  />
                  <Textarea
                    placeholder="Tell us about your healthcare practice and technology needs"
                    className="min-h-[120px] rounded-lg border-border/60 bg-background/80 text-base backdrop-blur-sm focus:border-primary"
                  />
                  <Button size="lg" className="mt-2 text-base font-medium">
                    Request Healthcare Consultation
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:justify-center">
                <Image
                  src={ContactImage}
                  alt="Healthcare Consultation"
                  placeholder="blur"
                  className="max-h-[500px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
