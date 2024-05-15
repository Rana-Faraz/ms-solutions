import { Bell, Mail, Phone } from "lucide-react";
import Logo from "../../public/images/logo.svg";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Sidebar = () => (
  <Sheet>
    <SheetTrigger>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
    <SheetContent>
      <SheetHeader className="my-4">
        <Image src={Logo} alt="Logo" />
      </SheetHeader>
      <hr className="mb-4" />
      <ul className="flex flex-col gap-4 font-semibold">
        <li>
          <SheetTrigger>
            <a href="#landing">Home</a>
          </SheetTrigger>
        </li>
        <li>
          <SheetTrigger>
            <a href="#about">About Us</a>
          </SheetTrigger>
        </li>
        <li>
          <SheetTrigger>
            <a href="#services">Services</a>
          </SheetTrigger>
        </li>
        <li>
          <SheetTrigger>
            <a href="#portfolio">Work</a>
          </SheetTrigger>
        </li>
        <li>
          <SheetTrigger>
            <a href="#misson">Misson</a>
          </SheetTrigger>
        </li>
        <li>
          <SheetTrigger>
            <a href="#contact">Contact Us</a>
          </SheetTrigger>
        </li>
        <hr />
        <li>
          <SheetTrigger className="w-full">
            <Link href={"#contact"} className="w-full">
              <Button className="w-full">Schedule A Call</Button>
            </Link>
          </SheetTrigger>
        </li>
      </ul>
    </SheetContent>
  </Sheet>
);

export default function Navbar() {
  return (
    <>
      <div className="mx-auto hidden w-[90%] items-center justify-between py-4 text-sm md:flex">
        <div className="flex items-center gap-2">
          <Bell size={20} />
          <span>We Will Grow Your Small Business To The Next Level</span>
        </div>
        <div className="flex gap-4">
          <a
            href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
            className="flex gap-2"
          >
            <Phone size={20} />
            <span>{process.env.NEXT_PUBLIC_PHONE}</span>
          </a>
          <div className="h-[26px] w-[1px] bg-[#FDE4D9]" />
          <a
            href={`mialto:${process.env.NEXT_PUBLIC_EMAIL}`}
            className="flex gap-2"
          >
            <Mail size={20} />
            <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
          </a>
        </div>
      </div>
      <div className="mx-auto h-[1px] w-[90%] bg-[#FDE4D9]" />
      <div className="sticky left-0 right-0 top-0 z-50 bg-white">
        <div className="mx-auto flex w-[90%] items-center justify-between py-4">
          <Image src={Logo} alt="Logo" />
          <ul className="hidden items-center gap-4 font-semibold md:flex">
            <li>
              <a href="#landing">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#portfolio">Work</a>
            </li>
            <li>
              <a href="#misson">Mission</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <hr />
            <li>
              <Link href={"#contact"}>
                <Button className="w-full">Schedule A Call</Button>
              </Link>
            </li>
          </ul>
          <div className="md:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
