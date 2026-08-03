import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Haangout" },
      {
        name: "description",
        content:
          "How Haangout collects, uses, and protects family data — COPPA-compliant, no tracking, no ads, written in plain language.",
      },
      { property: "og:title", content: "Privacy Policy — Haangout" },
      {
        property: "og:description",
        content:
          "How Haangout collects, uses, and protects family data — COPPA-compliant, no tracking, no ads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://haangoutapp.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://haangoutapp.com/privacy" }],
  }),
  component: PrivacyPage,
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

function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-foreground/60">
          Last updated August 1, 2026
        </p>

        <div className="mt-10 text-base">
          <H2 n="01">Introduction</H2>
          <P>
            Haangout ("we," "us," "our," or "Company") is committed to
            protecting your privacy and complying with the Children's Online
            Privacy Protection Act (COPPA). This Privacy Policy explains how we
            collect, use, disclose, and safeguard information when you use our
            mobile application and website (collectively, the "Service").
          </P>
          <div className="mt-5 rounded-[1.25rem] border border-accent/25 bg-accent/10 p-5">
            <p className="leading-relaxed text-foreground/85">
              <strong className="font-bold text-foreground">Important:</strong>{" "}
              Haangout is designed for families to coordinate children's
              schedules. We collect personal information about children only
              with verifiable parental consent. If you are under 13, you may
              only use Haangout under the direct supervision of a parent or
              legal guardian who has agreed to this Privacy Policy on your
              behalf.
            </p>
          </div>

          <H2 n="02">Information we collect</H2>
          <H3>A. Information you provide directly</H3>
          <P>
            <strong className="font-semibold text-foreground">
              Parent/guardian information:
            </strong>
          </P>
          <List
            items={[
              "Full name",
              "Phone number",
              "Email address (if applicable)",
              "Profile photo (optional)",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              Child information:
            </strong>
          </P>
          <List
            items={[
              "Child's full name",
              "Child's age",
              "Child's photo (optional)",
              "Child's interests and activities (e.g., soccer, painting)",
              "Child's calendar availability and schedule",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              Family connections:
            </strong>
          </P>
          <List
            items={[
              "Information about linked parents/partners and their children",
              "Hangout proposals and confirmed plans",
            ]}
          />

          <H3>B. Information collected automatically</H3>
          <List
            items={[
              "Device information (device type, operating system, app version)",
              "Usage data (features used, frequency of use)",
              "Calendar and availability patterns",
              "Group/family membership information",
            ]}
          />

          <div className="mt-8 rounded-[1.5rem] border border-foreground/10 bg-foreground px-6 py-7 text-[var(--color-page)]">
            <h3 className="font-display text-xl font-bold">
              What we don't use
            </h3>
            <ul className="mt-4 space-y-3 text-[var(--color-page)]/80">
              {[
                "Third-party analytics that track children's behavior",
                "Advertising networks or behavioral profiling",
                "Location data or GPS tracking",
                "Biometric data",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <H2 n="03">How we use information</H2>
          <P>We use collected information to:</P>
          <List
            items={[
              "Create and maintain your family account",
              "Allow parents/guardians to manage children's profiles",
              "Facilitate safe connections between families",
              "Suggest hangout opportunities based on shared availability",
              "Send notifications about upcoming hangouts",
              "Improve app functionality and user experience",
              "Respond to support requests",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              We do not:
            </strong>
          </P>
          <List
            items={[
              "Sell, rent, or trade your information to third parties",
              "Use children's information for marketing or behavioral targeting",
              "Share children's photos publicly without parental consent",
              "Use information for purposes other than providing the Service",
            ]}
          />

          <H2 n="04">How we share information</H2>
          <H3>Within your family account</H3>
          <List
            items={[
              "Linked parents/partners can see each other's and their children's information",
              "This enables joint calendar management and hangout coordination",
            ]}
          />
          <H3>With other families (for hangout matching)</H3>
          <List
            items={[
              <>
                Your child's name, age, and interests are visible to other
                families <strong className="font-semibold">only if you connect with them</strong>{" "}
                or they appear in matching suggestions
              </>,
              "Photos are shared only with families you actively connect with",
              "Contact information (phone number) is shared only to facilitate hangout planning",
            ]}
          />
          <H3>With service providers</H3>
          <List
            items={[
              "We use Firebase (Google) for data storage and authentication",
              "These providers are contractually obligated to protect your data",
            ]}
          />
          <H3>Legal requirements</H3>
          <P>
            We may disclose information if required by law, court order, or to
            protect safety.
          </P>

          <H2 n="05">Data security</H2>
          <P>
            We implement reasonable security measures to protect personal
            information:
          </P>
          <List
            items={[
              "Encrypted data transmission (HTTPS/SSL)",
              "Secure authentication (phone number, Apple Sign-In)",
              "Firestore security rules limiting access to authorized users only",
              "Regular security audits",
            ]}
          />
          <P>
            However, no online service is completely secure. We cannot guarantee
            absolute security.
          </P>

          <H2 n="06">Parental rights and controls</H2>
          <P>As a parent or guardian, you have the following rights:</P>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                t: "Access & review",
                b: "You can view all information we have collected about you and your children at any time in the app.",
              },
              {
                t: "Edit & update",
                b: "You can edit your profile, children's profiles, and family information.",
              },
              {
                t: "Delete",
                b: "You can delete individual children's profiles, or request deletion of your entire account and all associated data.",
              },
              {
                t: "Opt-out",
                b: "You can stop sharing availability/calendar data at any time, and remove connections with other families.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-[1.25rem] border border-foreground/10 bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <h3 className="font-display text-base font-bold tracking-tight">
                  {c.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
          <P>
            To exercise these rights, go to Settings &gt; Privacy &amp; Data in
            the Haangout app or contact us at{" "}
            <a
              href="mailto:support@haangoutapp.com"
              className="text-accent hover:underline"
            >
              support@haangoutapp.com
            </a>
            .
          </P>

          <H2 n="07">Data retention</H2>
          <List
            items={[
              <>
                <strong className="font-semibold text-foreground">
                  Active accounts:
                </strong>{" "}
                Information is retained as long as your account is active.
              </>,
              <>
                <strong className="font-semibold text-foreground">
                  Deleted accounts:
                </strong>{" "}
                We delete all personal data within 30 days of account deletion,
                including photos and chat history.
              </>,
              <>
                <strong className="font-semibold text-foreground">
                  Hangout history:
                </strong>{" "}
                Past hangout records are archived for 1 year, then permanently
                deleted.
              </>,
              <>
                <strong className="font-semibold text-foreground">
                  Photos:
                </strong>{" "}
                Photos are deleted immediately when a child's profile is removed
                or when the account is deleted.
              </>,
            ]}
          />

          <H2 n="08">Third-party links</H2>
          <P>
            The Haangout app may contain links to external websites. We are not
            responsible for the privacy practices of third-party sites. Please
            review their privacy policies before providing any information.
          </P>

          <H2 n="09">International users</H2>
          <P>
            If you are located outside the United States, your information may
            be transferred to and processed in the United States under COPPA and
            U.S. privacy laws. By using Haangout, you consent to this transfer.
          </P>

          <H2 n="10">Changes to this Privacy Policy</H2>
          <P>
            We may update this Privacy Policy periodically. We will notify you
            of significant changes by:
          </P>
          <List
            items={[
              'Posting the updated policy on our website with a new "Last Updated" date',
              "Requesting renewed consent for material changes before implementing them",
            ]}
          />
          <P>
            Your continued use of the Service constitutes acceptance of the
            updated Privacy Policy.
          </P>

          <H2 n="11">Contact us</H2>
          <P>
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us:
          </P>
          <div className="mt-5 rounded-[1.25rem] border border-foreground/10 bg-card p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm text-foreground/60">Email</p>
            <a
              href="mailto:support@haangoutapp.com"
              className="font-display text-lg font-bold text-accent hover:underline"
            >
              support@haangoutapp.com
            </a>
            <p className="mt-4 text-sm text-foreground/60">Mailing address</p>
            <p className="leading-relaxed text-foreground/80">
              Haangout, Inc.
              <br />
              [Your Company Address]
              <br />
              [City, State ZIP]
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/60">
              Response time: we will respond to privacy inquiries within 30
              days.
            </p>
          </div>

          <p className="mt-12 border-t border-foreground/10 pt-6 text-sm text-foreground/60">
            See also our{" "}
            <Link to="/terms" className="text-accent hover:underline">
              Terms of Service
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
