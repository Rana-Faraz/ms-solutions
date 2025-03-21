import {
  Scale,
  FileCheck,
  AlertCircle,
  Stethoscope,
  ClipboardList,
  HeartPulse,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using our healthcare services and platform",
};

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-degular text-4xl font-bold text-primary md:text-5xl">
          Terms of Service
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Please read these terms carefully before using our healthcare services
          and platform. Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Introduction */}
      <div className="mb-16 rounded-xl bg-primary/5 p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4">
            These Terms of Service ("Terms") govern your access to and use of
            Healthcare Services, including our website, mobile applications, and
            healthcare services (collectively, the "Services"). By accessing or
            using our Services, you agree to be bound by these Terms.
          </p>
          <p>
            If you are using our Services on behalf of an organization or
            entity, you represent and warrant that you have the authority to
            bind that organization or entity to these Terms.
          </p>
        </div>
      </div>

      {/* Main content with icons */}
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Stethoscope size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">
              Healthcare Services
            </h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Our Services include:</p>
            <ul className="ml-4 space-y-2">
              <li>• Electronic Health Records management</li>
              <li>• Telehealth consultations</li>
              <li>• Medical practice management solutions</li>
              <li>• Healthcare analytics</li>
              <li>• Patient engagement tools</li>
            </ul>
            <p>
              All healthcare services are provided in accordance with applicable
              medical standards and regulations.
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <FileCheck size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">
              User Responsibilities
            </h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>When using our Services, you agree to:</p>
            <ul className="ml-4 space-y-2">
              <li>• Provide accurate and complete information</li>
              <li>• Maintain the security of your account credentials</li>
              <li>• Promptly notify us of any unauthorized access</li>
              <li>• Use the Services in compliance with all applicable laws</li>
              <li>• Not misuse or interfere with the Services</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <HeartPulse size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">
              Medical Disclaimer
            </h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Important information about our Services:</p>
            <ul className="ml-4 space-y-2">
              <li>• Our Services do not replace professional medical advice</li>
              <li>• Always consult with qualified healthcare providers</li>
              <li>
                • In case of emergency, contact emergency services immediately
              </li>
              <li>• Information provided is for general purposes only</li>
              <li>• Healthcare outcomes may vary between individuals</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <ClipboardList size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">HIPAA Compliance</h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Our commitment to healthcare regulations:</p>
            <ul className="ml-4 space-y-2">
              <li>• We maintain HIPAA compliance for all healthcare data</li>
              <li>• Protected Health Information (PHI) is secured</li>
              <li>
                • Business Associate Agreements are in place with partners
              </li>
              <li>• Regular security assessments are conducted</li>
              <li>• Staff are trained on privacy and security procedures</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Intellectual Property
          </h3>
          <p className="text-muted-foreground">
            All content, features, and functionality of our Services, including
            but not limited to text, graphics, logos, icons, images, audio
            clips, digital downloads, data compilations, and software, are the
            exclusive property of Healthcare Services or our licensors and are
            protected by United States and international copyright, trademark,
            patent, and other intellectual property laws.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Limitation of Liability
          </h3>
          <p className="text-muted-foreground">
            To the maximum extent permitted by law, Healthcare Services and our
            affiliates, officers, employees, agents, partners, and licensors
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including without limitation,
            loss of profits, data, use, goodwill, or other intangible losses,
            resulting from your access to or use of or inability to access or
            use the Services.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Termination
          </h3>
          <p className="text-muted-foreground">
            We may terminate or suspend your access to the Services immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach these Terms. Upon
            termination, your right to use the Services will immediately cease.
            All provisions of the Terms which by their nature should survive
            termination shall survive, including without limitation, ownership
            provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Governing Law
          </h3>
          <p className="text-muted-foreground">
            These Terms shall be governed and construed in accordance with the
            laws of the United States, without regard to its conflict of law
            provisions. Our failure to enforce any right or provision of these
            Terms will not be considered a waiver of those rights. If any
            provision of these Terms is held to be invalid or unenforceable by a
            court, the remaining provisions of these Terms will remain in
            effect.
          </p>
        </div>
      </div>

      {/* Warning section */}
      <div className="mt-12 rounded-xl bg-yellow-500/10 p-6 lg:p-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20">
            <AlertCircle size={24} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="mb-2 font-degular text-xl font-bold text-yellow-700">
              Important Notice
            </h3>
            <p className="text-yellow-700/80">
              The information provided through our Services is not intended to
              be a substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-12 rounded-xl bg-primary/5 p-6 text-center lg:p-8">
        <h3 className="mb-3 font-degular text-xl font-bold text-primary">
          Questions About Our Terms?
        </h3>
        <p className="mb-6 text-muted-foreground">
          If you have any questions about these Terms, please contact our legal
          department.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:legal@healthcareservices.com`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Scale size={16} />
            Contact Legal Department
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
