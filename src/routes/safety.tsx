import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Shield,
  Users,
  Lock,
  Eye,
  Fingerprint,
  Bell,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Flag,
  Clock,
  Bug,
  HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety — Haangout" },
      {
        name: "description",
        content:
          "How Haangout keeps kids safe: parent-approved circles, COPPA compliance, honest location practices, and same-day safety report reviews.",
      },
      { property: "og:title", content: "Safety — Haangout" },
      {
        property: "og:description",
        content:
          "Parent-approved circles, COPPA compliance, honest location practices, and same-day safety report reviews.",
      },
      { property: "og:url", content: "https://haangoutapp.com/safety" },
    ],
    links: [{ rel: "canonical", href: "https://haangoutapp.com/safety" }],
  }),
  component: SafetyPage,
});

type Pillar = {
  icon: typeof Shield;
  title: string;
  body: string;
};

type Tier = {
  label: string;
  n: string;
  tagline: string;
  pillars: Pillar[];
};

const tiers: Tier[] = [
  {
    n: "01",
    label: "Our biggest promises",
    tagline: "The three things every parent should know before their kid opens the app.",
    pillars: [
      {
        icon: Users,
        title: "You approve every connection",
        body: "Kids can only interact with people inside the trusted circle or groups you create or approve. There is no open directory, no random friend requests, and no public profiles. When Liam wants to add a new friend, the request lands in your account first.",
      },
      {
        icon: Fingerprint,
        title: "No personal contact info is shared",
        body: "Phone numbers, emails, and home addresses are never exposed to other kids or families. Communication stays inside the app.",
      },
      {
        icon: ShieldCheck,
        title: "COPPA-compliant, by default",
        body: "We follow the Children's Online Privacy Protection Act. That means real, verifiable parental consent before we collect a child's information, no targeted advertising to kids, ever, and a delete request that actually deletes the data — the kid's profile, their posts, their history — not just hides it.",
      },
    ],
  },
  {
    n: "02",
    label: "The basics, done right",
    tagline: "The everyday guardrails that make the app feel calm instead of chaotic.",
    pillars: [
      {
        icon: Lock,
        title: "Private groups, public groups with guardrails",
        body: "Private groups are invite-only and hidden from search. Public neighborhood or activity groups are visible by name only; a child can only join after a parent approves, and posts inside are still member-only.",
      },
      {
        icon: Eye,
        title: "Parents see what's happening",
        body: "Every bat signal, hangout request, and group join sends a lightweight notification to the parent account. When Joey pings his soccer group, you know.",
      },
      {
        icon: Bell,
        title: "Smart, not spooky notifications",
        body: "We only notify you about the things that matter: a new connection request, a bat signal your kid sent, or a hangout plan that needs a ride. No endless pings, no dark patterns.",
      },
    ],
  },
  {
    n: "03",
    label: "What sets us apart",
    tagline: "The choices most kid apps get wrong. We made them on purpose.",
    pillars: [
      {
        icon: MessageSquare,
        title: "In-app chat with boundaries",
        body: "Chat is tied to a specific hangout or an approved group. There are no one-on-one DMs with strangers, and parents can see the threads their kid is part of.",
      },
      {
        icon: MapPin,
        title: "No background location tracking",
        body: "We do not track your kid's location when the app is closed. When Maya posts \"Volleyball at Douglass Park, 3–5pm,\" that place and time is what she chose to share with her circle — not something the phone is quietly broadcasting. Home addresses and background whereabouts are never shown.",
      },
      {
        icon: HeartHandshake,
        title: "Caregivers and co-parents, built in",
        body: "You can add a co-parent, grandparent, or babysitter as a caregiver with their own login. They see the same hangouts and reports you do, so nobody has to share a password.",
      },
    ],
  },
  {
    n: "04",
    label: "Proof, not just promises",
    tagline: "What actually happens behind the scenes when something goes wrong.",
    pillars: [
      {
        icon: Flag,
        title: "What happens when you report a family",
        body: "The reported family is paused the moment you file the report — they can't message, join hangouts, or see your kid while we look at it. For serious concerns (threats, sexual content, contact with a minor outside the circle), we escalate to our trust team and, when appropriate, to law enforcement.",
      },
      {
        icon: Clock,
        title: "Safety reports reviewed within 4 hours",
        body: "Safety reports get their own queue. A real human on our trust team reviews every one within 4 hours during daytime U.S. hours, and by the next morning otherwise. That's separate from — and faster than — the one-business-day turnaround on the general feedback form.",
      },
      {
        icon: Bug,
        title: "We invite people to try to break in",
        body: "We run regular security testing and welcome vulnerability reports from independent researchers. If you find something, email security@haangoutapp.com — we respond, we fix, and we credit you.",
      },
    ],
  },
];

function SafetyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-page)] px-5 py-16 text-foreground sm:px-10 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-accent"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          <Shield className="size-3.5" /> For parents
        </div>

        <h1 className="mt-5 font-display text-5xl font-black tracking-tight sm:text-6xl">
          Safety by design.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/70">
          Haangout is made for kids to be spontaneous, but never unsupervised.
          Here is how we keep the experience safe, private, and parent-first —
          in the order that matters most.
        </p>

        <div className="mt-16 space-y-16">
          {tiers.map((tier) => (
            <section key={tier.n} aria-labelledby={`tier-${tier.n}`}>
              <div className="flex items-baseline gap-4">
                <span className="font-display text-2xl font-black text-accent">
                  {tier.n}
                </span>
                <h2
                  id={`tier-${tier.n}`}
                  className="font-display text-2xl font-black tracking-tight sm:text-3xl"
                >
                  {tier.label}
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/60">
                {tier.tagline}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {tier.pillars.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-[1.5rem] border border-foreground/10 bg-card p-6 shadow-[var(--shadow-soft)]"
                  >
                    <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <p.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* A few things we don't do */}
        <div className="mt-16 rounded-[1.75rem] border border-foreground/10 bg-foreground px-6 py-8 text-[var(--color-page)] sm:px-10 sm:py-10">
          <h2 className="font-display text-2xl font-bold">A few things we don't do</h2>
          <ul className="mt-5 space-y-3 text-[var(--color-page)]/80">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>We don't track your kid's location in the background when the app isn't open.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>We don't allow strangers to message, follow, or request your kid.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>We don't share kid data with advertisers or third-party data brokers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>We don't show your kid's home address, phone number, or email to anyone in the app.</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="prose mt-16 max-w-none space-y-6 text-base leading-relaxed text-foreground/80">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Are you COPPA compliant?
          </h2>
          <p>
            Yes. Before we collect any information from a child under 13, we get
            verifiable parental consent from you. We don't run targeted ads at
            kids. And when you ask us to delete your child's data, we actually
            delete it — profile, posts, hangout history, chat — not archive it.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            What happens after I report someone?
          </h2>
          <p>
            The reported family is paused immediately — they can't reach your
            kid while the report is open. Our trust team reviews every safety
            report within 4 hours during U.S. daytime hours, and by the next
            morning otherwise. Serious concerns get escalated to our head of
            trust and, when appropriate, law enforcement.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Who can see my kid?
          </h2>
          <p>
            Only the families and groups you explicitly connect with. Your kid's
            profile, availability, and posts are hidden from the public internet
            and from unapproved users. Public groups show only the group name to
            nearby members; your child does not appear in a public list.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            What about location? Isn't posting an exact place risky?
          </h2>
          <p>
            Broadcasts show the specific place and time your kid chose to post
            — because "meet at the park at 3" is the whole point of the app.
            But it only goes to the trusted circle you approved. We never expose
            home addresses, and the phone is not quietly tracking your kid in
            the background.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            What happens when my kid wants to connect?
          </h2>
          <p>
            Connection requests and group invites route to the parent account
            first. A kid cannot add a new family, join a private group, or be
            added to a chat without your approval.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            How do I report a concern?
          </h2>
          <p>
            You can block a family, remove a group, or report a message directly
            from the app. Safety reports go to a dedicated queue with the
            same-day turnaround above. General product feedback can go through
            the{" "}
            <Link to="/" hash="feedback" className="text-accent hover:underline">
              feedback form
            </Link>{" "}
            on the homepage.
          </p>

          <h2 className="font-display text-2xl font-bold text-foreground">
            Want the technical details?
          </h2>
          <p>
            Read our{" "}
            <Link to="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>{" "}
            for the full picture on data collection, retention, and subprocessors.
          </p>
        </div>
      </div>
    </main>
  );
}
