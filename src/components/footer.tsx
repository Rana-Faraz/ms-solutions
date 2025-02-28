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
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { CONSTANTS } from "@/static/Constants";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-background/95 pt-12">
      <div className="container mx-auto px-4">
        {/* Top section with logo and social links */}
        <div className="mb-10 flex flex-col items-center justify-between gap-8 border-b border-border/40 pb-10 md:flex-row">
          <Link
            href={ROUTES.HOME}
            className="transition-opacity hover:opacity-90"
          >
            <Image src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <a
              target="_blank"
              href={`${CONSTANTS.INSTAGRAM}`}
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary hover:text-background"
            >
              <Instagram size={18} />
            </a>
            <a
              target="_blank"
              href={`${CONSTANTS.FACEBOOK}`}
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary hover:text-background"
            >
              <Facebook size={18} />
            </a>
            <a
              target="_blank"
              href={`${CONSTANTS.TWITTER}`}
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary hover:text-background"
            >
              <Twitter size={18} />
            </a>
            <a
              target="_blank"
              href={`${CONSTANTS.LINKEDIN}`}
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary hover:text-background"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Company description */}
          <div className="lg:col-span-4">
            <h4 className="mb-4 font-degular text-xl font-bold text-primary">
              About Us
            </h4>
            <p className="mb-6 text-muted-foreground">
              Leading the Charge in Call Center Excellence and Customer Service
              Solutions. We provide innovative solutions tailored to your
              business needs.
            </p>
            <div className="flex flex-col space-y-3">
              {CONSTANTS.PHONE && (
                <a
                  href={`tel:${CONSTANTS.PHONE}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone size={16} className="text-primary" />
                  <span>{CONSTANTS.PHONE}</span>
                </a>
              )}
              <a
                href={`mailto:${CONSTANTS.EMAIL}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={16} className="text-primary" />
                <span>{CONSTANTS.EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 font-degular text-xl font-bold text-primary">
              Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.SERVICES}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PORTFOLIO}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.MISSION}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CONTACT}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.BLOGS}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-5">
            <h4 className="mb-4 font-degular text-xl font-bold text-primary">
              Services
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[...Services].map((service) => (
                <Link
                  key={"Footer_" + service}
                  href={`${ROUTES.SERVICES}#${service.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="mt-12 border-t border-border/40 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            <div className="flex gap-6">
              <Link
                href={ROUTES.PRIVACY_POLICY}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href={ROUTES.TERMS_OF_SERVICE}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
