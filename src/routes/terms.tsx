import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Haangout" },
      {
        name: "description",
        content:
          "The terms that govern your use of the Haangout app and website — eligibility, parental consent, acceptable use, and COPPA compliance.",
      },
      { property: "og:title", content: "Terms of Service — Haangout" },
      {
        property: "og:description",
        content:
          "Eligibility, parental consent, acceptable use, child safety, and COPPA compliance for the Haangout Service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://haangoutapp.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://haangoutapp.com/terms" }],
  }),
  component: TermsPage,
});

function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-14 flex items-baseline gap-3 font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl">
      <span className="text-accent">{n}</span>
      <span>{children}</span>
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-lg font-bold tracking-tight text-foreground">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-relaxed text-foreground/80">{children}</p>;
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-foreground/80">
          <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-page)] px-5 py-16 text-foreground sm:px-10 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>

        <h1 className="mt-8 font-display text-5xl font-black tracking-tight sm:text-6xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-foreground/60">
          Last updated August 8, 2026
        </p>

        <div className="mt-10 text-base">
          <H2 n="01">Acceptance of terms</H2>
          <P>
            By downloading, accessing, or using the Haangout mobile application
            ("App"), website ("Website"), and related services ("Service"), you
            agree to be bound by these Terms of Service ("Terms"). If you do not
            agree to these Terms, do not use the Service.
          </P>

          <H2 n="02">Eligibility &amp; parental consent</H2>
          <P>
            <strong className="font-semibold text-foreground">
              Age restriction:
            </strong>{" "}
            Haangout is intended for parents and guardians to coordinate their
            children's activities. If you are under 13, you may only use this
            Service with the direct supervision and consent of a parent or legal
            guardian.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Parental responsibility:
            </strong>{" "}
            By using Haangout, you confirm that you are a parent, legal
            guardian, or authorized representative of the children whose
            information you provide. You are responsible for:
          </P>
          <List
            items={[
              "Supervising children's use of the Service",
              "Ensuring all information you provide is accurate and truthful",
              "Complying with all applicable laws, including COPPA",
              "Maintaining the confidentiality of your account credentials",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              Parental verification:
            </strong>{" "}
            At account creation, you must affirmatively confirm you are a parent
            or guardian before adding any child information. We reserve the
            right to verify parental status.
          </P>

          <H2 n="03">Account responsibilities</H2>
          <H3>Your obligations</H3>
          <List
            items={[
              "You are responsible for all activity under your account",
              "You must provide accurate, current contact information",
              "You must notify us immediately of any unauthorized access",
              "You must not create multiple accounts to circumvent the Service",
            ]}
          />
          <H3>Account security</H3>
          <List
            items={[
              "Keep your phone number and authentication credentials confidential",
              "Do not share your account credentials with others",
              "We are not responsible for unauthorized access due to your failure to protect credentials",
            ]}
          />
          <H3>Termination</H3>
          <List
            items={[
              "We may suspend or terminate your account if you violate these Terms",
              "We may also terminate accounts with no activity for 2+ years",
            ]}
          />

          <H2 n="04">Use of the Service</H2>
          <H3>Permitted uses</H3>
          <List
            items={[
              "Coordinating children's social activities with other families",
              "Managing your family's calendar and availability",
              "Communicating with families you are connected with",
              "Proposing and confirming hangouts",
            ]}
          />

          <div className="mt-8 rounded-[1.5rem] border border-foreground/10 bg-foreground px-6 py-7 text-[var(--color-page)]">
            <h3 className="font-display text-xl font-bold">Prohibited uses</h3>
            <p className="mt-2 text-sm text-[var(--color-page)]/70">
              You agree not to:
            </p>
            <ul className="mt-4 space-y-3 text-[var(--color-page)]/80">
              {[
                "Impersonate others or create false accounts",
                "Collect or harvest personal information about other users",
                "Harass, threaten, bully, or harm other users or their children",
                "Post obscene, offensive, or inappropriate content",
                "Share child information without proper parental consent",
                "Arrange activities that endanger child safety",
                "Use the Service for commercial purposes or advertising",
                "Attempt to gain unauthorized access to the Service",
                "Upload malware, viruses, or malicious code",
                "Bypass or interfere with Service security features",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <P>
            <strong className="font-semibold text-foreground">
              Safety requirement:
            </strong>{" "}
            Users are responsible for ensuring all proposed activities are safe
            and age-appropriate. Haangout is a coordination tool; users must
            verify safety protocols before arranging activities.
          </P>

          <H2 n="05">Intellectual property rights</H2>
          <List
            items={[
              "All content in the Haangout app and website (designs, logos, text) is owned by Haangout or our licensors",
              "You may not copy, reproduce, distribute, or modify any Service content without permission",
              "Your photos and personal information remain your property, but you grant Haangout a license to store and display them as necessary to provide the Service",
            ]}
          />

          <H2 n="06">Child safety &amp; responsibility</H2>
          <P>
            <strong className="font-semibold text-foreground">
              No automated matching:
            </strong>{" "}
            Haangout does not automatically select or recommend specific
            families. You must explicitly connect with families before sharing
            information.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Verification:
            </strong>{" "}
            We encourage you to verify the identity and safety of families
            before arranging activities. Haangout provides tools for connection
            but does not conduct background checks or verify user information.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Photo &amp; data usage:
            </strong>
          </P>
          <List
            items={[
              "Child photos are only visible to families you have connected with",
              "You control what information is shared about your children",
              "You can delete photos or profiles at any time",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              Content moderation:
            </strong>{" "}
            We prohibit inappropriate content and may remove it, but we are not
            responsible for monitoring all user-generated content. Please report
            violations to{" "}
            <a
              href="mailto:support@haangoutapp.com"
              className="text-accent hover:underline"
            >
              support@haangoutapp.com
            </a>
            .
          </P>

          <H2 n="07">Limitation of liability</H2>
          <P>
            <strong className="font-semibold text-foreground">
              Disclaimer:
            </strong>{" "}
            Haangout is provided "as-is" and "as-available" without warranties
            of any kind. We do not warrant that the Service will be error-free,
            uninterrupted, or secure.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              No liability for user conduct:
            </strong>{" "}
            We are not responsible for:
          </P>
          <List
            items={[
              "Hangouts arranged through the Service or their outcomes",
              "Injuries, disputes, or harm resulting from activities coordinated via the Service",
              "Conduct of other users or their children",
              "Failure to complete scheduled activities",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              Cap on liability:
            </strong>{" "}
            To the maximum extent permitted by law, Haangout shall not be liable
            for any indirect, incidental, special, or consequential damages
            arising from your use of the Service.
          </P>

          <H2 n="08">Indemnification</H2>
          <P>
            You agree to indemnify and hold harmless Haangout, its officers,
            employees, and agents from any claims, damages, losses, or expenses
            arising from:
          </P>
          <List
            items={[
              "Your use of the Service",
              "Your violation of these Terms",
              "Your violation of any law or third-party rights",
              "Your arrangements or activities coordinated through the Service",
            ]}
          />

          <H2 n="09">Privacy &amp; data protection</H2>
          <List
            items={[
              <>
                Please review our{" "}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>{" "}
                for information about how we collect, use, and protect your data
              </>,
              "We comply with COPPA and do not share children's information with third parties without parental consent",
              "You control what information is shared and can delete your account at any time",
            ]}
          />

          <H2 n="10">COPPA compliance</H2>
          <P>
            Haangout is committed to complying with the Children's Online
            Privacy Protection Act (COPPA). We:
          </P>
          <List
            items={[
              "Obtain verifiable parental consent before collecting children's information",
              "Allow parents to access, review, and delete children's data",
              "Do not use children's information for behavioral targeting or marketing",
              "Do not share children's information with third parties without explicit consent",
            ]}
          />

          <H2 n="11">Limitation on collection &amp; use</H2>
          <List
            items={[
              "We collect only information necessary to provide the Service",
              "We do not track children's location, use cookies for tracking, or engage in behavioral profiling",
              "We do not display advertisements or engage in marketing to children",
            ]}
          />

          <H2 n="12">Dispute resolution &amp; governing law</H2>
          <P>
            <strong className="font-semibold text-foreground">
              Governing law:
            </strong>{" "}
            These Terms are governed by and construed in accordance with the
            laws of [Your State/Country], without regard to its conflict of law
            principles.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Dispute resolution:
            </strong>{" "}
            Before initiating legal proceedings, please contact us at{" "}
            <a
              href="mailto:support@haangoutapp.com"
              className="text-accent hover:underline"
            >
              support@haangoutapp.com
            </a>{" "}
            to resolve disputes.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Jurisdiction:
            </strong>{" "}
            Any legal action or proceeding shall be brought exclusively in the
            state or federal courts located in [Your State/County], and you
            irrevocably consent to the jurisdiction and venue of these courts.
          </P>

          <H2 n="13">Modifications to Terms</H2>
          <P>
            We may modify these Terms at any time. Continued use of the Service
            following notice of material changes constitutes your acceptance of
            the updated Terms.
          </P>

          <H2 n="14">Severability</H2>
          <P>
            If any provision of these Terms is found to be unenforceable, the
            remaining provisions shall remain in full force and effect.
          </P>

          <H2 n="15">Contact &amp; support</H2>
          <P>
            For questions about these Terms, privacy concerns, or to exercise
            parental rights:
          </P>
          <div className="mt-5 rounded-[1.25rem] border border-foreground/10 bg-card p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm text-foreground/60">Email</p>
            <a
              href="mailto:support@haangoutapp.com"
              className="font-display text-lg font-bold text-accent hover:underline"
            >
              support@haangoutapp.com
            </a>
            <p className="mt-4 text-sm leading-relaxed text-foreground/60">
              Response time: we will respond to inquiries within 5 business
              days.
            </p>
          </div>

          <p className="mt-12 border-t border-foreground/10 pt-6 text-sm text-foreground/60">
            See also our{" "}
            <Link to="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/safety" className="text-accent hover:underline">
              Safety
            </Link>{" "}
            pages.
          </p>
        </div>
      </div>
    </main>
  );
}
