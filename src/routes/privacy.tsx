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
          Last updated August 8, 2026
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
          <div className="mt-5 rounded-[1.5rem] border border-accent/25 bg-accent/10 p-5">
            <p className="leading-relaxed text-foreground/85">
              <strong className="font-bold text-foreground">Important:</strong>{" "}
              Haangout is built for parents and guardians to manage their
              children's social connections. Only adults create accounts,
              send and accept connection requests, and make decisions about who
              their family connects with. Children may use Haangout only through
              a linked account created by, and subject to the supervision of,
              their parent or legal guardian.
            </p>
          </div>

          <H2 n="02">Account roles and child accounts</H2>
          <P>
            <strong className="font-semibold text-foreground">
              Adult accounts:
            </strong>{" "}
            A parent or legal guardian creates the primary Haangout account.
            That adult is the account owner, is responsible for all activity under
            the account, and controls who the family connects with.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Child accounts:
            </strong>{" "}
            An adult may invite their child to create a linked child account.
            The child account is tied to the adult's account and is not
            independent. The child cannot connect with other families or share
            information outside of the controls set by the adult.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Parent visibility:
            </strong>{" "}
            The adult who creates and manages a child account can see, review,
            and delete everything the child does on the Service, including
            messages, hangout requests, availability, group memberships, and
            profile information. Haangout does not provide children with any
            communication, posting, or connection feature that is hidden from
            their parent or guardian.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Consent:
            </strong>{" "}
            By creating a child account or providing a child's information, the
            adult represents that they are the parent or legal guardian of that
            child, that they have authority to consent on the child's behalf, and
            that they consent to this Privacy Policy and our Terms of Service on
            behalf of the child.
          </P>

          <H2 n="03">Information we collect</H2>
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
              "Authentication credentials",
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
              "Child's account activity, messages, and hangout requests",
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
              "Group or community memberships",
            ]}
          />

          <H3>B. Information collected automatically</H3>
          <List
            items={[
              "Device information (device type, operating system, app version)",
              "Usage data (features used, frequency of use)",
              "Calendar and availability patterns",
              "Group/family membership information",
              "Messages and in-app communication content",
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

          <H2 n="04">How we use information</H2>
          <P>We use collected information to:</P>
          <List
            items={[
              "Create and maintain the adult account and any linked child accounts",
              "Allow parents/guardians to manage children's profiles and connections",
              "Facilitate safe connections between families that adults have chosen to connect with",
              "Suggest hangout opportunities based on shared availability",
              "Send notifications about upcoming hangouts to the adult account",
              "Improve app functionality and user experience",
              "Respond to support requests and verify parental status",
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
              "Allow children to make independent connections or share data without parental visibility",
            ]}
          />

          <H2 n="05">How we share information</H2>
          <H3>Within your family account</H3>
          <List
            items={[
              "Linked parents/partners can see each other's and their children's information",
              "Adults can see all activity on any linked child account",
              "This enables joint calendar management and hangout coordination",
            ]}
          />
          <H3>With other families (for hangout matching)</H3>
          <List
            items={[
              <>
                Your child's name, age, and interests are visible to other
                families <strong className="font-semibold">only if an adult in your family has connected with them</strong>{" "}
                or if you both participate in the same private group or community
              </>,
              "Photos are shared only with families an adult has actively connected with",
              "Contact information (phone number) is shared only to facilitate hangout planning",
              "Children cannot independently share information with other families or users",
            ]}
          />
          <H3>With service providers</H3>
          <List
            items={[
              "We use backend infrastructure providers for data storage, authentication, and messaging",
              "These providers are contractually obligated to protect your data and only process it on our behalf",
            ]}
          />
          <H3>Legal requirements</H3>
          <P>
            We may disclose information if required by law, court order, or to
            protect safety. We will attempt to notify the adult account owner of
            any legal request affecting a child account unless prohibited by law.
          </P>

          <H2 n="06">Data security</H2>
          <P>
            We implement reasonable security measures to protect personal
            information:
          </P>
          <List
            items={[
              "Encrypted data transmission (HTTPS/SSL)",
              "Secure authentication (phone number, Apple Sign-In, Google Sign-In)",
              "Access controls and security rules limiting data to authorized users",
              "Regular security audits",
            ]}
          />
          <P>
            However, no online service is completely secure. We cannot guarantee
            absolute security.
          </P>

          <H2 n="07">Parental rights and controls</H2>
          <P>
            As the adult account owner, you have the following rights and controls
            over your own account and any linked child accounts:
          </P>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                t: "Access & review",
                b: "You can view all information we have collected about you and your children, including all child account activity and messages, at any time in the app.",
              },
              {
                t: "Edit & update",
                b: "You can edit your profile, children's profiles, family information, and connection settings.",
              },
              {
                t: "Delete",
                b: "You can delete individual children's profiles, or request deletion of your entire account and all associated child data.",
              },
              {
                t: "Opt-out",
                b: "You can stop sharing availability/calendar data, remove connections with other families, and revoke a child's access to the Service.",
              },
              {
                t: "Manage connections",
                b: "Only adults can send, accept, or remove connections with other families. Children cannot initiate connections on their own.",
              },
              {
                t: "Revoke consent",
                b: "You may withdraw consent for a child's data collection at any time by deleting the child's profile or contacting us.",
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

          <H2 n="08">Data retention</H2>
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

          <H2 n="09">Third-party links</H2>
          <P>
            The Haangout app may contain links to external websites. We are not
            responsible for the privacy practices of third-party sites. Please
            review their privacy policies before providing any information.
          </P>

          <H2 n="10">International users</H2>
          <P>
            If you are located outside the United States, your information may
            be transferred to and processed in the United States under COPPA and
            U.S. privacy laws. By using Haangout, you consent to this transfer.
          </P>

          <H2 n="11">Changes to this Privacy Policy</H2>
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

          <H2 n="12">Contact us</H2>
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
