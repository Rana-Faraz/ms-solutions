import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import {
  FaChartLine,
  FaCheckCircle,
  FaCompass,
  FaGlobe,
  FaHandHoldingMedical,
  FaHeartbeat,
  FaLaptopMedical,
  FaStethoscope,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

export const metadata = {
  title: "Our Mission",
  description:
    "Learn about our mission and values that drive us to improve healthcare delivery and patient outcomes through innovative technology solutions.",
};

export default function MissionPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Our Healthcare Mission
        </h1>
        <div className="mx-auto mb-8 h-1 w-24 bg-primary"></div>
        <p className="mx-auto max-w-3xl text-lg text-foreground">
          Discover the values and principles that drive our commitment to
          transforming healthcare delivery through innovative technology
          solutions.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-20">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="p-8 text-center md:p-12">
            <p className="mx-auto mb-6 max-w-2xl text-xl font-medium italic text-foreground">
              "To empower healthcare providers with the technology, tools, and
              support they need to deliver exceptional patient care, improve
              clinical outcomes, and create more efficient healthcare systems."
            </p>
            <div className="mx-auto h-1 w-16 bg-primary/30"></div>
          </div>
        </div>
      </section>

      {/* About Our Mission */}
      <section className="mb-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-lg leading-relaxed text-foreground">
            At Healthcare Solutions Provider, we believe that technology can
            transform healthcare delivery and improve patient outcomes. Our
            mission is to help healthcare organizations not just adapt to
            changing industry demands, but truly excel in providing
            patient-centered care.
          </p>

          <p className="mb-6 text-lg leading-relaxed text-foreground">
            We understand the unique challenges that healthcare providers face –
            complex regulatory requirements, evolving patient expectations, and
            the constant pressure to improve quality while managing costs.
            That's why we've dedicated ourselves to providing accessible,
            effective healthcare technology solutions that deliver measurable
            results.
          </p>

          <p className="text-lg leading-relaxed text-foreground">
            Our team brings together decades of experience across healthcare and
            technology, but we share one common passion: improving patient care
            through innovation. We measure our success by your clinical and
            operational outcomes, and we're committed to being a trusted partner
            in your healthcare transformation journey.
          </p>
        </div>
      </section>

      {/* What Drives Us */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What Drives Us</h2>
          <p className="mx-auto max-w-2xl text-foreground">
            Our vision and approach are centered around creating sustainable
            healthcare improvements and meaningful patient impact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="bg-primary/10 text-primary">
              <FaCompass className="h-10 w-10" />
              <CardTitle className="mt-4 text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4 text-foreground">
                We envision a healthcare ecosystem where technology seamlessly
                supports clinical decision-making, enhances patient engagement,
                and optimizes operational efficiency, enabling providers to
                focus on what matters most: patient care.
              </p>
              <p className="text-foreground">
                We see a future where healthcare technology is accessible to
                organizations of all sizes, and where data-driven insights lead
                to better health outcomes for communities everywhere.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-secondary/10 text-secondary">
              <FaChartLine className="h-10 w-10" />
              <CardTitle className="mt-4 text-2xl">Our Approach</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4 text-foreground">
                We believe in a patient-centered, evidence-based approach to
                healthcare technology. We don't just focus on implementing
                systems – we help you build sustainable clinical and operational
                workflows that will support your organization for years to come.
              </p>
              <p className="text-foreground">
                Every healthcare organization is unique, which is why we take
                the time to understand your specific clinical needs, challenges,
                and goals before recommending solutions. We're not interested in
                one-size-fits-all approaches – we want what truly works for your
                patients and providers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Commitments</h2>
          <p className="mx-auto max-w-2xl text-foreground">
            The promises we make to our healthcare clients, our team, and our
            community guide everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="bg-primary/10 text-primary">
              <FaUserMd className="h-10 w-10" />
              <CardTitle className="mt-4 text-xl">
                To Healthcare Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {[
                  "Deliver solutions that enhance clinical care",
                  "Provide responsive, knowledgeable support",
                  "Respect your clinical workflows and resources",
                  "Stay at the forefront of healthcare technology",
                  "Be a trusted partner in your care delivery",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-secondary/10 text-secondary">
              <FaUsers className="h-10 w-10" />
              <CardTitle className="mt-4 text-xl">To Our Team</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {[
                  "Foster a culture of clinical excellence",
                  "Provide opportunities for professional growth",
                  "Recognize and reward healthcare expertise",
                  "Maintain work-life balance for wellbeing",
                  "Create a diverse and inclusive workplace",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-secondary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-accent text-accent-foreground">
              <FaGlobe className="h-10 w-10" />
              <CardTitle className="mt-4 text-xl">To Our Community</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {[
                  "Support improved community health outcomes",
                  "Participate in healthcare outreach initiatives",
                  "Operate with environmental responsibility",
                  "Share healthcare knowledge and expertise",
                  "Promote ethical health technology practices",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-accent-foreground" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-20 rounded-2xl bg-muted p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-foreground">
            These healthcare principles guide our decisions and actions every
            day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FaStethoscope,
              title: "Clinical Excellence",
              description:
                "We strive for excellence in everything we do, ensuring our solutions meet the highest standards of clinical quality and safety.",
              color: "text-primary bg-primary/10",
            },
            {
              icon: FaHeartbeat,
              title: "Patient-Centered",
              description:
                "We operate with the patient at the center of all our solutions, ensuring technology enhances the care experience.",
              color: "text-secondary bg-secondary/10",
            },
            {
              icon: FaHandHoldingMedical,
              title: "Collaborative Care",
              description:
                "We view ourselves as partners in your healthcare mission, not just technology providers.",
              color: "text-primary bg-primary/10",
            },
            {
              icon: FaLaptopMedical,
              title: "Healthcare Innovation",
              description:
                "We continuously seek new and better ways to solve healthcare challenges through technology and process improvement.",
              color: "text-secondary bg-secondary/10",
            },
          ].map((value, index) => (
            <Card key={index} className="border-muted-foreground/20">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted-foreground/10">
                  <value.icon
                    className={`h-7 w-7 ${value.color.split(" ")[0]}`}
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                <p className="text-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">
          Join Us in Our Healthcare Mission
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Whether you're a healthcare provider looking for technology solutions,
          a potential team member who shares our values, or a community partner
          interested in improving health outcomes, we'd love to connect with
          you.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-accent hover:text-primary"
          >
            <Link href={ROUTES.CONTACT}>Schedule a Consultation</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white bg-transparent text-white hover:bg-white/10"
          >
            <Link href={ROUTES.SERVICES}>Explore Our Healthcare Services</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
