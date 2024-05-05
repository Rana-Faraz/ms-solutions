import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer";

const degular = localFont({
  src: [
    {
      path: "../../fonts/Degular-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../fonts/Degular-RegularItalic.otf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../fonts/Degular-Bold.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../fonts/Degular-BoldItalic.otf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../../fonts/Degular-Light.otf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../fonts/Degular-LightItalic.otf",
      style: "italic",
      weight: "300",
    },
    {
      path: "../../fonts/Degular-Medium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../fonts/Degular-MediumItalic.otf",
      style: "italic",
      weight: "500",
    },
    {
      path: "../../fonts/Degular-SemiBold.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../fonts/Degular-SemiBoldItalic.otf",
      style: "italic",
      weight: "600",
    },
    {
      path: "../../fonts/Degular-Thin.otf",
      style: "normal",
      weight: "100",
    },
    {
      path: "../../fonts/Degular-ThinItalic.otf",
      style: "italic",
      weight: "100",
    },
  ],
  variable: "--font-degular",
  preload: true,
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M&S Solutions",
  description: "M&S Solutions is a software development company.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${degular.variable} ${poppins.variable} snap-start scroll-smooth`}
    >
      <body className="snap-start scroll-smooth">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
