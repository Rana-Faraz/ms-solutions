import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import Logo from "../../public/images/logo.svg";
import Image from "next/image";
import Services from "@/static/services.json";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto grid grid-cols-1 border-t border-[#B9B9B9] px-4 py-8 md:grid-cols-2">
        <div className="my-4 flex flex-col items-center justify-center gap-4 text-center md:items-start md:justify-start md:text-start">
          <a href="#landing">
            <Image src={Logo} alt="Logo" />
          </a>
          <span className="w-full text-sm text-muted-foreground md:w-[300px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </span>
          <div className="flex gap-2">
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_INSTAGRAM}`}>
              <Instagram />
            </a>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_FACEBOOK}`}>
              <Facebook />
            </a>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_TWITTER}`}>
              <Twitter />
            </a>
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_LINKEDIN}`}>
              <Linkedin />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center gap-4 text-center md:grid-cols-3 md:place-items-start md:text-start lg:gap-8">
          <div>
            <h4 className="font-degular mb-2 text-xl font-bold text-primary">
              Quick Links
            </h4>
            <ul className="font-degular list-none font-semibold">
              <li className="mb-1">
                <a href="#landing">Home</a>
              </li>
              <li className="mb-1">
                <a href="#about">About</a>
              </li>
              <li className="mb-1">
                <a href="#services">Services</a>
              </li>
              <li className="mb-1">
                <a href="#portfolio">Case Study</a>
              </li>
              <li className="mb-1">
                <a href="#testimonial">Testimonial</a>
              </li>
              <li className="mb-1">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-degular mb-2 text-xl font-bold text-primary">
              Services
            </h4>
            <ul className="font-degular list-none font-semibold">
              {[...Services].splice(6).map((service) => (
                <li key={"Footer_" + service} className="mb-1">
                  <a href="#">{service}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-degular mb-2 text-xl font-bold text-primary">
              Contact Us
            </h4>
            <div className="flex flex-col items-center justify-center gap-4 text-center font-semibold md:place-items-start md:justify-start md:text-start">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                className="flex gap-2"
              >
                <Phone size={20} />
                <span>{process.env.NEXT_PUBLIC_PHONE}</span>
              </a>
              <a
                href={`mialto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="flex gap-2"
              >
                <Mail size={20} />
                <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
