import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "~/public/images/hero.png";
import About from "~/public/images/section-about.png";
import Plane from "~/public/images/floating-plane.svg";
import Rings from "~/public/images/floating-rings.svg";
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

export default function Home() {
  const Portfolio = [Portfolio1, Portfolio2, Portfolio3, Portfolio4];

  return (
    <main className="snap-start scroll-smooth">
      <section id="landing" className="snap-start scroll-m-36 scroll-smooth">
        <div className="my-16 grid grid-cols-1 gap-4 px-4 sm:place-items-center md:grid-cols-2">
          <div className="relative flex flex-col justify-center space-y-4">
            <Image
              src={Plane}
              alt="Plane"
              className="absolute -top-16"
              placeholder="blur"
            />
            <Image
              placeholder="blur"
              src={Rings}
              alt="Rings"
              className="absolute bottom-4 hidden xl:-right-64 xl:block"
            />
            <h1 className="font-degular text-5xl font-bold text-primary md:text-5xl xl:text-7xl">
              Design,
              <br />
              <span className="text-secondary">Development</span>
              <br />& Identity
            </h1>
            <span className="font-poppins text-3xl">For Your Product.</span>
            <div className="grid grid-cols-2 gap-4">
              <Button>Schedule A Call</Button>
              <Button variant={"outline"}>View Services</Button>
            </div>
          </div>
          <div>
            <Image src={Hero} alt="Hero" placeholder="blur" />
          </div>
        </div>
      </section>
      <Marquee direction="forward" content={Services} />
      <Marquee direction="backward" content={Services} variant={"secondary"} />

      <section id="about" className="snap-start scroll-m-36 scroll-smooth">
        <div className="container my-16 grid grid-cols-1 gap-4 px-4 sm:place-items-center md:grid-cols-2">
          <div>
            <Image src={About} alt="About" placeholder="blur" />
          </div>
          <div className="space-y-4">
            <span className="font-degular text-xl text-primary ">
              ABOUT AGENCY
            </span>
            <h2 className="font-degular text-5xl font-bold md:text-5xl xl:text-5xl">
              We’re a digital design studio connecting brands to people
            </h2>
            <p className="text-pretty font-poppins text-lg text-muted-foreground">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a
            </p>
          </div>
        </div>
      </section>
      <section id="services" className="snap-start scroll-m-36 scroll-smooth">
        <div className="container flex flex-col items-center border-t border-[#B9B9B9] px-4 py-8 font-degular">
          <span className="text-center text-xl">
            Contact Us or Send An Email to{" "}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className=" font-semibold text-secondary hover:underline"
            >
              {process.env.NEXT_PUBLIC_EMAIL}
            </a>
          </span>
          <div className="flex w-full flex-col items-center justify-center">
            <span className="mt-16 font-degular text-xl text-primary">
              TRUSTED SERVICES
            </span>
            <h2 className="my-4 max-w-[600px] font-degular text-5xl font-bold md:text-center md:text-5xl xl:text-5xl">
              We’re a digital design studio connecting brands to people
            </h2>
            <div className="grid w-full grid-cols-1 gap-4 vt-name-[main-content] md:grid-cols-2 md:gap-8">
              {DeatilServices.map((service) => (
                <Card key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="w-full bg-primary">
        <div className="container flex flex-wrap items-center justify-center gap-16 md:p-8">
          {CompanyHistory.map((history) => (
            <History key={history.title} history={history} />
          ))}
        </div>
      </div>
      <section
        id="portfolio"
        className="snap-start scroll-m-36 scroll-smooth bg-squiggly-pattern bg-contain bg-center bg-no-repeat"
      >
        <div className="container my-16 flex flex-col gap-4">
          <span className="font-degular text-xl text-primary">PORTFOLIO</span>
          <h2 className="font-degular text-5xl font-bold md:text-5xl xl:text-5xl">
            Our Case Study
          </h2>
          <ImageCarousel content={Portfolio} />
        </div>
      </section>
      <Marquee direction="forward" content={Services} />
      <Marquee direction="backward" content={Services} variant={"secondary"} />
      <section
        id="testimonial"
        className="snap-start scroll-m-36 scroll-smooth"
      >
        <div className="container my-8 py-8">
          <span className="font-degular text-xl text-primary">TESTIMONIAL</span>
          <h2 className="font-degular text-5xl font-bold md:text-5xl xl:text-5xl">
            What Our Clients Say
          </h2>
          <div className="my-4">
            <Testimonial reviews={Testimonials} />
          </div>
        </div>
      </section>
      <div className="h-64 w-full bg-squiggly-pattern bg-cover bg-center bg-no-repeat " />
      <div className="mx-4 flex items-center justify-center">
        <section
          id="contact"
          className="container my-8 grid snap-start scroll-m-36 grid-cols-1 place-items-center gap-4 scroll-smooth rounded-md bg-contact-pattern bg-cover bg-center bg-no-repeat md:grid-cols-2"
        >
          <div className="my-16 flex flex-col gap-4 py-8">
            <span className="font-degular text-xl text-primary">
              CONTACT US
            </span>
            <h2 className="font-degular text-5xl font-bold md:text-5xl xl:text-5xl">
              Let's Talk About Your Project
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name"
                className="w-full border-[#B9B9B9] bg-[#F9F9F9]"
              />
              <Input
                type="email"
                placeholder="Email"
                className="w-full border-[#B9B9B9] bg-[#F9F9F9]"
              />
              <Textarea
                placeholder="Message"
                className="w-full border-[#B9B9B9] bg-[#F9F9F9]"
              />
              <Button size={"lg"}>Send Message</Button>
            </div>
          </div>
          <Image
            src={ContactImage}
            alt="Contact"
            placeholder="blur"
            className="hidden h-[600px] w-full object-contain md:block"
          />
        </section>
      </div>
    </main>
  );
}
