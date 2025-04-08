import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="snap-start scroll-smooth">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
