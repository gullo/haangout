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
          <P>
            <strong className="font-semibold text-foreground">
              Neutral platform:
            </strong>{" "}
            Haangout only provides tools that help families and kids discover
            and contact one another. We do not supervise, verify, endorse, or
            guarantee the conduct, background, or intentions of any user. You
            are solely responsible for deciding whom to connect with, what
            information to share, and whether to participate in any activity
            arranged through the Service.
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
            of any kind, whether express or implied. We do not warrant that the
            Service will be error-free, uninterrupted, secure, or free of harmful
            or inappropriate content or users.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              No liability for user conduct or connections:
            </strong>{" "}
            We are a technology platform only. We are not responsible for:
          </P>
          <List
            items={[
              "Connections, introductions, or matches made through the Service, whether between families, kids, or groups",
              "Hangouts, activities, meetings, or events arranged through the Service or their outcomes",
              "Injuries, disputes, property damage, loss, or harm resulting from activities or interactions coordinated via the Service",
              "Conduct, statements, omissions, or behavior of any user, their children, or any other person encountered through the Service",
              "Failure to complete scheduled activities, or inaccurate, misleading, or unlawful user content",
              "Malicious, abusive, fraudulent, or unlawful acts by any user, even if that connection originated through the Service",
              "Any damage or harm resulting from a user's decision to share personal information, meet in person, or participate in an activity",
            ]}
          />
          <P>
            <strong className="font-semibold text-foreground">
              No background checks or verification:
            </strong>{" "}
            We do not conduct background checks, identity verification, or safety
            screenings of users. We are under no obligation to monitor, review,
            or approve any user, post, or activity. You assume all risks
            associated with connecting with others through the Service.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Cap on liability:
            </strong>{" "}
            To the maximum extent permitted by law, Haangout and its officers,
            directors, employees, agents, affiliates, licensors, successors, and
            assigns shall not be liable for any direct, indirect, incidental,
            special, consequential, punitive, or exemplary damages arising from or
            relating to your access to or use of (or inability to use) the
            Service, including any damages resulting from user conduct, content,
            connections, or offline interactions, even if we have been advised
            of the possibility of such damages.
          </P>

          <H2 n="08">Indemnification</H2>
          <P>
            You agree to indemnify, defend, and hold harmless Haangout, Inc. and
            its parent companies, subsidiaries, affiliates, officers, directors,
            employees, agents, representatives, licensors, partners, members,
            successors, and assigns (collectively, the "Haangout Parties") from
            and against any and all claims, liabilities, damages, losses, costs,
            expenses, fines, settlements, judgments, and attorneys' fees arising
            out of or relating to:
          </P>
          <List
            items={[
              "Your access to or use of the Service",
              "Your violation of these Terms or any applicable law, regulation, or third-party right",
              "Your user content, posts, messages, or any information you submit or share through the Service",
              "Any connection, introduction, interaction, communication, or relationship you form with another user through the Service",
              "Any hangout, activity, meeting, or event you arrange, join, or facilitate through the Service",
              "Any harm, injury, loss, property damage, or dispute involving you, your children, or anyone else arising from or connected to your use of the Service",
              "Any claim by a third party, including another user or a member of their family, that arises from your conduct, content, or connections through the Service",
              "Any claim that Haangout's connection of you or your children with another user caused or contributed to any harm or wrongdoing",
            ]}
          />
          <P>
            You agree to cooperate fully in the defense of any such claim. We
            reserve the right to assume the exclusive defense and control of any
            matter otherwise subject to indemnification by you, and you agree not
            to settle any claim without our prior written consent.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Important:
            </strong>{" "}
            Haangout is not a babysitter, supervisor, or guarantor of any user or
            activity. Our role is limited to providing technology that helps
            families and kids discover one another. You are solely responsible
            for the choices you make and the people you connect with through the
            Service.
          </P>

          <H2 n="09">Assumption of risk &amp; release</H2>
          <P>
            <strong className="font-semibold text-foreground">
              Voluntary participation:
            </strong>{" "}
            You acknowledge that your use of the Service, including any
            communication, connection, or in-person interaction with another
            user, is at your sole risk. You are responsible for evaluating the
            suitability, safety, and trustworthiness of any person, activity, or
            situation you or your children encounter through the Service.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Release of claims:
            </strong>{" "}
            To the maximum extent permitted by law, you voluntarily release,
            waive, acquit, and forever discharge Haangout and the Haangout
            Parties from any and all claims, demands, actions, causes of
            action, damages, or liabilities, whether known or unknown, suspected
            or unsuspected, arising out of or in any way connected with your use
            of the Service or any interaction you or your children have with
            any other user. This release includes, without limitation, claims
            arising from personal injury, property damage, harassment, emotional
            distress, or any other harm.
          </P>

          <H2 n="10">Privacy &amp; data protection</H2>
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

          <H2 n="11">COPPA compliance</H2>
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

          <H2 n="12">Limitation on collection &amp; use</H2>
          <List
            items={[
              "We collect only information necessary to provide the Service",
              "We do not track children's location, use cookies for tracking, or engage in behavioral profiling",
              "We do not display advertisements or engage in marketing to children",
            ]}
          />

          <H2 n="13">Dispute resolution &amp; governing law</H2>
          <P>
            <strong className="font-semibold text-foreground">
              Governing law:
            </strong>{" "}
            These Terms are governed by and construed in accordance with the
            laws of the State of Georgia, United States, without regard to its
            conflict of law principles.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Informal resolution:
            </strong>{" "}
            Before initiating any formal dispute resolution, please contact us
            at{" "}
            <a
              href="mailto:support@haangoutapp.com"
              className="text-accent hover:underline"
            >
              support@haangoutapp.com
            </a>{" "}
            to attempt to resolve disputes informally.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Binding individual arbitration:
            </strong>{" "}
            To the fullest extent permitted by law, any dispute, claim, or
            controversy arising out of or relating to these Terms, your use of
            the Service, or the relationship between you and Haangout shall be
            resolved by binding arbitration on an individual basis. Arbitration
            shall be administered by the American Arbitration Association (AAA)
            under its Consumer Arbitration Rules, with the arbitration hearing to
            take place in Atlanta, Georgia, unless otherwise agreed by the
            parties. The arbitrator's decision shall be final and binding.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Class action waiver:
            </strong>{" "}
            You agree that any dispute or claim will be brought only in your
            individual capacity, and not as a class representative, class
            member, or in any representative or private attorney general
            capacity. Class actions, collective actions, class-wide arbitrations,
            and any other proceeding where someone acts in a representative
            capacity are not permitted.
          </P>
          <P>
            <strong className="font-semibold text-foreground">
              Jurisdiction:
            </strong>{" "}
            Any legal action or proceeding that is not subject to arbitration
            shall be brought exclusively in the state or federal courts located
            in Georgia, United States, and you irrevocably consent to the
            personal jurisdiction and venue of these courts.
          </P>

          <H2 n="14">No duty to monitor</H2>
          <P>
            You agree that Haangout has no obligation, and you do not expect us,
            to monitor, review, edit, filter, approve, or verify user content,
            messages, profiles, posts, or conduct on the Service. We may,
            at our sole discretion, investigate or remove content or users that
            violate these Terms, but we are not required to do so. We are not
            liable for any failure to monitor, detect, report, or prevent any user
            content, conduct, or activity.
          </P>

          <H2 n="15">Entire agreement</H2>
          <P>
            These Terms, together with our Privacy Policy, Safety page, and any
            other policies or guidelines incorporated by reference, constitute
            the entire agreement between you and Haangout regarding the Service
            and supersede all prior or contemporaneous agreements, understandings,
            negotiations, or representations, whether oral or written, relating
            to the Service.
          </P>

          <H2 n="16">Force majeure</H2>
          <P>
            Haangout will not be liable for any failure or delay in performing
            its obligations under these Terms where the failure or delay results
            from any cause beyond our reasonable control, including but not
            limited to acts of God, natural disasters, pandemic, government
            action, war, terrorism, riots, embargoes, sanctions, strikes,
            lockouts, internet or telecommunications failures, power outages,
            denial-of-service attacks, or other events beyond our reasonable
            control.
          </P>

          <H2 n="17">No third-party beneficiaries</H2>
          <P>
            These Terms are for the benefit of you and Haangout only. They do
            not create any rights, remedies, or obligations for any third party,
            including any child, family member, friend, neighbor, or other user.
            Only you and Haangout may enforce these Terms.
          </P>

          <H2 n="18">Modifications to Terms</H2>
          <P>
            We may modify these Terms at any time. Continued use of the Service
            following notice of material changes constitutes your acceptance of
            the updated Terms.
          </P>

          <H2 n="19">Severability</H2>
          <P>
            If any provision of these Terms is found to be unenforceable or
            invalid for any reason, that provision shall be modified to the
            minimum extent necessary to make it enforceable, or if that is not
            possible, it shall be severed from these Terms. The remaining
            provisions shall remain in full force and effect, and the invalid or
            unenforceable provision shall be replaced by a valid provision that
            most closely matches the intent of the original.
          </P>

          <H2 n="20">Contact &amp; support</H2>
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
