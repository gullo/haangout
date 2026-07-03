import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield, Users, Lock, Eye, Fingerprint, Bell, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety — Haangout" },
      {
        name: "description",
        content:
          "How Haangout keeps kids safe while they find friends, join groups, and head outside.",
      },
      { property: "og:url", content: "https://haangout.lovable.app/safety" },
    ],
    links: [{ rel: "canonical", href: "https://haangout.lovable.app/safety" }],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  const pillars = [
    {
      icon: Users,
      title: "You approve every connection",
      body: "Kids can only interact with people inside the trusted circle or groups you create or approve. There is no open directory, no random friend requests, and no public profiles.",
    },
    {
      icon: Lock,
      title: "Private groups, public groups with guardrails",
      body: "Private groups are invite-only and hidden from search. Public neighborhood or activity groups are visible by name only; a child can only join after a parent approves, and posts inside are still member-only.",
    },
    {
      icon: Eye,
      title: "Parents see what's happening",
      body: "Every bat signal, hangout request, and group join sends a lightweight notification to the parent account. You always know who your kid is connecting with and what they're planning.",
    },
    {
      icon: Fingerprint,
      title: "No personal contact info is shared",
      body: "Phone numbers, emails, home addresses, and exact locations are never exposed to other kids or families. Communication stays inside the app, and location is approximate and opt-in.",
    },
    {
      icon: Bell,
      title: "Smart, not spooky notifications",
      body: "We only notify you about the things that matter: a new connection request, a bat signal your kid sent, or a hangout plan that needs a ride. No endless pings, no dark patterns.",
    },
    {
      icon: MessageSquare,
      title: "In-app chat with boundaries",
      body: "Chat is tied to specific hangouts or approved groups. There are no one-on-one messages with strangers, and parents can see the threads their kid is part of.",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-page)] px-5 py-16 text-foreground sm:px-10 sm:py-24">
      <div className="mx-auto max-w-3xl">
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
          Here is how we keep the experience safe, private, and parent-first.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-[1.5rem] border border-foreground/10 bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <p.icon className="size-5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold tracking-tight">
                {p.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[1.75rem] border border-foreground/10 bg-foreground px-6 py-8 text-[var(--color-page)] sm:px-10 sm:py-10">
          <h2 className="font-display text-2xl font-bold">A few things we don't do</h2>
          <ul className="mt-5 space-y-3 text-[var(--color-page)]/80">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>We don't show exact location to other kids or parents.</span>
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
              <span>We don't track location in the background when the app isn't open.</span>
            </li>
          </ul>
        </div>

        <div className="prose mt-12 max-w-none space-y-6 text-base leading-relaxed text-foreground/80">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Who can see my kid?
          </h2>
          <p>
            Only the families and groups you explicitly connect with. Your kid's
            profile, availability status, and posts are hidden from the public
            internet and from unapproved users. Public groups show only the
            group name and general activity to nearby members; your child does
            not appear in a public list.
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
            from the app. You can also reach us through the{" "}
            <Link to="/" hash="feedback" className="text-accent hover:underline">
              feedback form
            </Link>{" "}
            on the homepage and we will respond within one business day.
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
