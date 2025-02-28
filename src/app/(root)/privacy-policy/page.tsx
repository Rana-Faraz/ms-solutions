import { Shield, Lock, Eye, FileText, Server, UserCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Healthcare Services",
  description:
    "Our commitment to protecting your personal and health information",
};

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-degular text-4xl font-bold text-primary md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Our commitment to protecting your personal and health information.
          Last updated:{" "}
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
            At Healthcare Services, we understand the importance of privacy,
            especially when it comes to your health information. This Privacy
            Policy outlines how we collect, use, disclose, and protect your
            information when you use our services.
          </p>
          <p>
            We are committed to ensuring the confidentiality and security of
            your personal and health information in compliance with all
            applicable healthcare privacy laws, including HIPAA (Health
            Insurance Portability and Accountability Act).
          </p>
        </div>
      </div>

      {/* Main content with icons */}
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <FileText size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">
              Information We Collect
            </h2>
          </div>
          <ul className="ml-4 space-y-2 text-muted-foreground">
            <li>
              • Personal identifiers (name, date of birth, contact information)
            </li>
            <li>• Health insurance information</li>
            <li>• Medical history and health records</li>
            <li>• Treatment information</li>
            <li>• Payment information</li>
            <li>• Website usage data and analytics</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Eye size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">
              How We Use Your Information
            </h2>
          </div>
          <ul className="ml-4 space-y-2 text-muted-foreground">
            <li>• Provide and manage healthcare services</li>
            <li>• Process insurance claims and payments</li>
            <li>• Communicate about your care and appointments</li>
            <li>• Improve our services and patient experience</li>
            <li>• Comply with legal and regulatory requirements</li>
            <li>• Conduct research with de-identified data</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Shield size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">
              How We Protect Your Information
            </h2>
          </div>
          <ul className="ml-4 space-y-2 text-muted-foreground">
            <li>• Encryption of sensitive data</li>
            <li>• Secure electronic health record systems</li>
            <li>• Regular security assessments and updates</li>
            <li>• Staff training on privacy practices</li>
            <li>• Physical safeguards for paper records</li>
            <li>• Business Associate Agreements with vendors</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-border/40 p-6 transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <UserCheck size={20} className="text-primary" />
            </div>
            <h2 className="font-degular text-xl font-bold">Your Rights</h2>
          </div>
          <ul className="ml-4 space-y-2 text-muted-foreground">
            <li>• Access your health information</li>
            <li>• Request corrections to your records</li>
            <li>• Receive a copy of your health records</li>
            <li>• Request restrictions on certain uses</li>
            <li>• Receive a list of disclosures</li>
            <li>
              • File a complaint if you believe your rights have been violated
            </li>
          </ul>
        </div>
      </div>

      {/* Additional sections */}
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Information Sharing and Disclosure
          </h3>
          <p className="text-muted-foreground">
            We may share your information with healthcare providers involved in
            your care, insurance companies for billing purposes, and as required
            by law. We will not sell your personal information to third parties.
            Any sharing of information is conducted in compliance with HIPAA and
            other applicable laws.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Cookies and Tracking Technologies
          </h3>
          <p className="text-muted-foreground">
            Our website uses cookies and similar technologies to enhance your
            experience, analyze usage patterns, and improve our services. You
            can control cookie settings through your browser preferences. We use
            analytics tools to understand how visitors interact with our
            website, always respecting your privacy preferences.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-degular text-xl font-bold text-primary">
            Changes to This Privacy Policy
          </h3>
          <p className="text-muted-foreground">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. We will notify you of any
            material changes by posting the new policy on our website and
            updating the "Last Updated" date. We encourage you to review this
            policy regularly.
          </p>
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-16 rounded-xl bg-primary/5 p-6 text-center lg:p-8">
        <h3 className="mb-3 font-degular text-xl font-bold text-primary">
          Contact Us About Privacy
        </h3>
        <p className="mb-6 text-muted-foreground">
          If you have questions or concerns about our privacy practices or would
          like to exercise your rights, please contact our Privacy Officer.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:privacy@healthcareservices.com`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Lock size={16} />
            Contact Privacy Officer
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
