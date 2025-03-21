import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const degular = localFont({
  src: [
    {
      path: "../fonts/DegularVariable.ttf",
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
  title: {
    default: "Stradom Meditech",
    template: "%s | Stradom Meditech",
  },
  description:
    "Innovative healthcare technology solutions designed to improve patient care, streamline clinical workflows, and optimize medical practice operations.",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
