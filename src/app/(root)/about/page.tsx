import { getTeamMembers } from "@/app/(admin)/admin/team/_actions/team-actions";
import { StatsSection } from "@/components/stats-section";
import { TeamMemberCard } from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { CONSTANTS, MILESTONES } from "@/static/Constants";
import Link from "next/link";
import {
  FaChartLine,
  FaHandHoldingMedical,
  FaHandshake,
  FaHeart,
  FaHeartbeat,
  FaHospital,
  FaQuoteLeft,
  FaShieldAlt,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

export const metadata = {
  title: "About Us",
  description:
    "Learn about our healthcare team, our mission, and how we help medical practices and healthcare providers deliver better patient care.",
};

// Company values data
const values = [
  {
    title: "Patient-Centered Care",
    description:
      "We believe that all healthcare solutions should ultimately improve patient outcomes and experiences. Every service we provide is designed with the patient journey in mind.",
    icon: FaHeartbeat,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Clinical Excellence",
    description:
      "We maintain the highest standards of medical expertise and stay current with the latest healthcare innovations to ensure our solutions meet clinical best practices.",
    icon: FaUserMd,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    title: "Data Security",
    description:
      "We understand the critical importance of protecting patient information and maintaining HIPAA compliance in all our systems and processes.",
    icon: FaShieldAlt,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Collaborative Approach",
    description:
      "We work closely with healthcare providers to understand their unique challenges and develop customized solutions that address their specific needs.",
    icon: FaHandshake,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    title: "Continuous Improvement",
    description:
      "Healthcare is constantly evolving, and so are we. We continuously refine our services and solutions based on outcomes data and client feedback.",
    icon: FaChartLine,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Accessibility",
    description:
      "We're committed to making quality healthcare solutions accessible to medical practices of all sizes, from solo practitioners to large hospital systems.",
    icon: FaHandHoldingMedical,
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
];

export default async function AboutPage() {
  const { data: teamMembers, error } = await getTeamMembers({
    limit: 8,
    offset: 0,
    sort: "createdAt.desc",
  });

  if (error) {
    console.error(error);
  }

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Moderenized Healthcare
            </h1>
            <div className="mx-auto mb-8 h-1 w-24 bg-white"></div>
            <p className="mb-8 text-lg md:text-xl">
              Empowering healthcare professionals with Stradom tech-services to
              optimize patient care, streamline clinical workflows, minimize
              administrative burdens, and ensure overall health outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="bg-white text-primary hover:bg-accent hover:text-primary"
              >
                <Link href={ROUTES.SERVICES}>Our Medical Services</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10"
              >
                <Link href={ROUTES.CONTACT}>Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section with Side-by-Side Layout */}
      <section className="py-20" aria-labelledby="our-mission">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaStethoscope className="mr-3 h-8 w-8 text-primary" />
            <h2 id="our-mission" className="text-3xl font-bold md:text-4xl">
              MISSION
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="mb-6 rounded-lg bg-accent p-4">
                <p className="italic text-accent-foreground">
                  "Enabling optimized care for sustainable healthcare growth."
                </p>
              </div>
              <p className="mb-4 text-foreground">
                We are dedicated to enabling healthcare professionals with
                innovative solutions that optimize care and streamline
                operations, ensuring sustainable growth within their practices.
                By offering specialised resources that ensures patient care,
                reduce administrative burdens, and improve workflow efficiency,
                we help providers focus more on what matters most—delivering
                exceptional care. Our commitment is to support healthcare
                businesses in achieving both immediate and long-term success,
                enhancing the quality of care while maintaining operational
                excellence.
              </p>
              <p className="mb-4 text-foreground">
                We understand the unique challenges healthcare providers face,
                from complex regulations to rising patient expectations and cost
                pressures. That's why we offer accessible, effective technology
                solutions designed to deliver measurable results.
              </p>
              <p className="mb-4 text-foreground">
                With decades of experience in healthcare and technology, our
                team is driven by a shared passion for improving patient care
                through innovation. We measure our success by your clinical and
                operational outcomes, committed to being your trusted partner in
                healthcare transformation.
              </p>

              {/* <div className="mt-8 flex flex-wrap gap-4">
                {MILESTONES.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {milestone.year}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">{milestone.title}</span>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>

            <div className="order-1 md:order-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <div className="absolute inset-0 bg-muted">
                  {/* Replace with your actual image */}
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <FaHospital className="h-20 w-20 opacity-40" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">Our Healthcare Journey</h3>
                  <p>From startup to trusted partner for medical providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section with Cards */}
      <section className="bg-muted py-20" aria-labelledby="our-values">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaHeart className="mr-3 h-8 w-8 text-primary" />
            <h2 id="our-values" className="text-3xl font-bold md:text-4xl">
              Our Healthcare Values
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className={`border ${value.color}`}>
                <CardHeader>
                  <div className="mb-4 flex items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${value.color.split(" ")[0]}`}
                    >
                      <value.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="ml-4 text-xl">
                      {value.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Cards */}
      <section className="py-20" aria-labelledby="our-team">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaUserMd className="mr-3 h-8 w-8 text-primary" />
            <h2 id="our-team" className="text-3xl font-bold md:text-4xl">
              Our Medical Team
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers?.records.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      {/* Testimonials Section */}
      <section className="bg-accent/50 py-20" aria-labelledby="testimonials">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-center">
            <FaQuoteLeft className="mr-3 h-8 w-8 text-primary" />
            <h2 id="testimonials" className="text-3xl font-bold md:text-4xl">
              What Healthcare Providers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <p className="mb-4 italic text-foreground">
                  "Their solutions have transformed our practice. Patient wait
                  times are down 40%, and our staff can focus more on care
                  instead of paperwork."
                </p>
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <span className="text-xl">👩‍⚕️</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Dr. Rebecca Chen</p>
                    <p className="text-sm text-muted-foreground">
                      Family Medicine Practice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <p className="mb-4 italic text-foreground">
                  "The telehealth platform implementation was seamless. We've
                  been able to reach patients in rural areas who previously had
                  limited access to specialists."
                </p>
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <span className="text-xl">👨‍⚕️</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">Dr. James Wilson</p>
                    <p className="text-sm text-muted-foreground">
                      Regional Hospital Director
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20" aria-labelledby="contact-us">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
            <h2 id="contact-us" className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Enhance Your Healthcare Practice?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Our team of healthcare specialists is ready to discuss your unique
              challenges and how our solutions can help improve patient care and
              practice efficiency.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdPhone className="mb-2 h-8 w-8" />
                <span className="text-sm">Call Our Medical Team</span>
                <a
                  href={`tel:${CONSTANTS.PHONE}`}
                  className="font-semibold hover:underline"
                >
                  {CONSTANTS.PHONE}
                </a>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdEmail className="mb-2 h-8 w-8" />
                <span className="text-sm">Email Us</span>
                <a
                  href={`mailto:${CONSTANTS.EMAIL}`}
                  className="font-semibold hover:underline"
                >
                  {CONSTANTS.EMAIL}
                </a>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-white bg-opacity-10 p-4">
                <MdLocationOn className="mb-2 h-8 w-8" />
                <span className="text-sm">Visit Our Office</span>
                <address className="font-semibold not-italic">
                  {CONSTANTS.ADDRESS}
                </address>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-accent hover:text-primary"
            >
              <Link href={ROUTES.CONTACT}>Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
