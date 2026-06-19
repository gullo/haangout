import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Haangout" },
      {
        name: "description",
        content: "The terms that govern your use of the Haangout app and website.",
      },
      { property: "og:url", content: "https://haangout.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://haangout.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-page)] px-5 py-16 text-foreground sm:px-10 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-accent"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>
        <h1 className="mt-8 font-display text-5xl font-black tracking-tight sm:text-6xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-foreground/60">
          Last updated June 19, 2026
        </p>
        <div className="prose mt-10 max-w-none space-y-6 text-base leading-relaxed text-foreground/80">
          <p>
            Welcome to Haangout. By using our app or website you agree to these
            terms. This page is maintained by the Haangout team to answer common
            questions about how the service works.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            1. The service
          </h2>
          <p>
            Haangout helps families coordinate spontaneous in-person hangouts
            between trusted friends. We do not provide childcare, supervision,
            or transportation. Parents and guardians remain responsible for
            their children at all times.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            2. Eligibility
          </h2>
          <p>
            Haangout accounts are for parents and guardians 18 and older.
            Children may appear as profiles managed by an adult account.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            3. Acceptable use
          </h2>
          <p>
            Use Haangout to coordinate with people you actually know and trust.
            Don't impersonate others, share contact info you weren't given, or
            use the service to harass anyone.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            4. Content
          </h2>
          <p>
            You own what you post. By posting, you grant Haangout a limited
            license to display it within the app to people you've connected
            with.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            5. Changes
          </h2>
          <p>
            We may update these terms. Continued use after changes means you
            accept the updated terms.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            6. Contact
          </h2>
          <p>
            Questions? Reach us through the feedback form on the homepage.
          </p>
        </div>
      </div>
    </main>
  );
}
