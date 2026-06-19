import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Haangout" },
      {
        name: "description",
        content: "How Haangout handles your family's data — written in plain language.",
      },
      { property: "og:url", content: "https://haangout.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://haangout.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-foreground/60">
          Last updated June 19, 2026
        </p>
        <div className="prose mt-10 max-w-none space-y-6 text-base leading-relaxed text-foreground/80">
          <p>
            This page is maintained by the Haangout team. It describes the
            personal information we collect, why we collect it, and the
            choices you have.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            What we collect
          </h2>
          <ul className="list-disc pl-6">
            <li>Account info you give us (name, email, phone).</li>
            <li>Kid profile info you choose to add (first name, age, photo).</li>
            <li>Connections you make to other families.</li>
            <li>Approximate location when you opt in, used only to show who's nearby.</li>
          </ul>
          <h2 className="font-display text-2xl font-bold text-foreground">
            What we don't do
          </h2>
          <ul className="list-disc pl-6">
            <li>We don't sell your data.</li>
            <li>We don't share kid profiles with anyone outside your trusted families circle.</li>
            <li>We don't track location in the background.</li>
          </ul>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Your choices
          </h2>
          <p>
            You can delete your account, export your data, or remove individual
            kid profiles at any time from the Profile screen.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Subprocessors
          </h2>
          <p>
            We use trusted providers for hosting and email. We share only the
            minimum data needed to operate the service.
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Contact
          </h2>
          <p>
            Privacy questions? Reach us through the feedback form on the
            homepage and we'll respond.
          </p>
        </div>
      </div>
    </main>
  );
}
