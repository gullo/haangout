import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowUpRight,
  Apple,
  Play as PlayIcon,
  Bike,
  DoorOpen,
  Sun,
  Check,
} from "lucide-react";
import { SmoothScroll } from "@/components/SmoothScroll";
import heroStreet from "@/assets/hero-street.jpg";
import kidsRunning from "@/assets/kids-running.jpg";
import logoMark from "@/assets/brand/logo-mark.png";
import screenHome from "@/assets/brand/screen-home.png";
import screenLive from "@/assets/brand/screen-live.png";
import screenUpcoming from "@/assets/brand/screen-upcoming.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haangout — Spontaneous play, the way it used to be" },
      {
        name: "description",
        content:
          "Haangout brings back the doorbell-ring era of childhood. No group chats, no calendars — just kids finding kids who can play, right now.",
      },
      { property: "og:title", content: "Haangout — Spontaneous play, the way it used to be" },
      {
        property: "og:description",
        content:
          "Bring back the doorbell-ring era. Less coordination, more outside.",
      },
      { property: "og:url", content: "https://haangout.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://haangout.lovable.app/" }],
  }),
  component: Marketing,
});

/* ---------- Tiny utilities ---------- */

const ease = [0.16, 1, 0.3, 1] as const;

function MagneticButton({
  children,
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const inner = (
    <motion.span style={{ x, y }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );
  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={className}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {inner}
    </motion.button>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Sections ---------- */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 sm:px-8 sm:pt-6">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-black/5 bg-[oklch(0.985_0.003_90/0.7)] px-5 py-3 backdrop-blur-xl sm:px-7">
        <Link to="/" className="group flex items-center gap-2">
          <img src={logoMark} alt="Haangout" className="size-9 rounded-xl" />
          <span className="font-display text-xl font-black tracking-tight">
            haang<span className="italic text-accent">out</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
          <a href="#story" className="hover:text-foreground">The story</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#preview" className="hover:text-foreground">The app</a>
          <a href="#feedback" className="hover:text-foreground">Feedback</a>
        </nav>
        <MagneticButton
          href="#download"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-[var(--color-page)] sm:text-sm"
        >
          Get the app <ArrowUpRight className="size-3.5" />
        </MagneticButton>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Cursor-tracked sun glow
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, oklch(0.71 0.187 41 / 0.18), transparent 60%)`;

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[oklch(0.94_0.01_75)]"
    >
      <motion.img
        src={heroStreet}
        alt="Kids riding bikes down a suburban street at golden hour"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.94_0.01_75/0.2)] via-transparent to-[oklch(0.18_0.02_270/0.6)]" />
      <motion.div style={{ background: bg }} className="absolute inset-0" />

      {/* Top meta line */}
      <div className="absolute inset-x-0 top-24 z-10 px-5 sm:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[var(--color-page)]/80">
          <span>Est. 2026 · A return to outside</span>
          <span className="hidden sm:inline">No calendars · No group chats</span>
        </div>
      </div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 px-5 pb-14 sm:px-10 sm:pb-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] font-black leading-[0.85] tracking-[-0.04em] text-[var(--color-page)]">
            <KineticWord text="Knock." delay={0} />
            <br />
            <KineticWord text="Ring." delay={0.15} />
            <br />
            <span className="italic font-light">
              <KineticWord text="Play." delay={0.3} accent />
            </span>
          </h1>
          <div className="mt-8 grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_auto]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease }}
              className="max-w-xl text-base text-[var(--color-page)]/85 sm:text-lg"
            >
              The childhood you remember, rebuilt for now. Haangout shows your kid
              who's free, who's nearby, who's outside — without a single group
              chat or shared calendar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="#download"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-pop)]"
              >
                Get Haangout <ArrowUpRight className="size-4" />
              </MagneticButton>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3.5 text-sm font-medium text-[var(--color-page)] backdrop-blur hover:bg-white/10"
              >
                See the app
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-page)]/70"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

function KineticWord({
  text,
  delay,
  accent,
}: {
  text: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%", rotate: 8 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.05, ease, delay }}
        className={`inline-block ${accent ? "text-accent" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* Ticker */
function Ticker() {
  const items = [
    "Door-to-door",
    "★",
    "Whiffle ball at dusk",
    "★",
    "Sprinkler tag",
    "★",
    "Be home by streetlights",
    "★",
    "Can Joey come out?",
    "★",
    "No RSVPs",
    "★",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-foreground/10 bg-[var(--color-page)] py-5">
      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap font-display text-3xl font-light italic tracking-tight text-foreground/85 sm:text-5xl"
      >
        {row.map((w, i) => (
          <span key={i} className="mx-6 inline-block">
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* Story section: large editorial text with image inset */
function Story() {
  return (
    <section id="story" className="relative bg-[var(--color-page)] px-5 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              The thesis
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,5.2rem)] font-black leading-[0.95] tracking-[-0.03em]">
              We over-scheduled childhood.{" "}
              <span className="italic font-light text-foreground/70">
                Haangout gives it back.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-foreground/80">
              <p>
                In 1985, "playdate" wasn't a word. Kids knocked on doors. They
                yelled across the street. They called the house phone and asked
                if Joey could come out. The whole system ran on impulse.
              </p>
              <p>
                Today, parents run logistics. Group chats, shared calendars,
                three-week RSVP threads for two kids to ride bikes.
              </p>
              <p className="font-medium text-foreground">
                Haangout is the spontaneous layer. Kids find kids — parents
                stay out of it.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={0.2}>
            <ParallaxImage src={kidsRunning} alt="Kids running through a backyard sprinkler" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.18]);
  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-foreground/5"
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale }}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}

/* How it works — 3 numbered, rotating cards */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Show up",
      body: "Open Haangout and your kid's avatar lights up. Friends nearby see they're free.",
      Icon: Sun,
    },
    {
      n: "02",
      title: "Find a friend",
      body: "See which buddies are also free — at the park, on the block, ready to roll.",
      Icon: Bike,
    },
    {
      n: "03",
      title: "Knock & go",
      body: "Tap Hangout Now. Parents get the lightest possible heads-up. Then the kids handle the rest.",
      Icon: DoorOpen,
    },
  ];
  return (
    <section id="how" className="relative bg-foreground px-5 py-28 text-[var(--color-page)] sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] opacity-60">
                How it works
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.95] tracking-[-0.03em]">
                Three taps from couch to{" "}
                <span className="italic font-light opacity-80">haang.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-base opacity-70">
              We removed every step a parent has to take. Permissions stay on,
              location stays private, kids run their own social calendar.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <TiltCard>
                <div className="flex h-full flex-col justify-between gap-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl font-black italic opacity-60">
                      {s.n}
                    </span>
                    <s.Icon className="size-6 opacity-70" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-black tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed opacity-75">
                      {s.body}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 180, damping: 16 });
  const ry = useSpring(0, { stiffness: 180, damping: 16 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/* Big numbers / contrast section */
function Numbers() {
  const stats = [
    { v: "0", l: "Group chats required" },
    { v: "62%", l: "Less screen time in pilot families" },
    { v: "3 taps", l: "From bored to outside" },
  ];
  return (
    <section className="bg-accent px-5 py-24 text-accent-foreground sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08}>
            <div>
              <p className="font-display text-[clamp(4rem,9vw,9rem)] font-black leading-[0.85] tracking-[-0.04em]">
                {s.v}
              </p>
              <p className="mt-3 max-w-xs text-sm opacity-90">{s.l}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* App preview — phone tilts with scroll */
function AppPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="preview"
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-page)] px-5 py-28 sm:px-10 sm:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              The app
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.95] tracking-[-0.03em]">
              Built like a{" "}
              <span className="italic font-light text-accent">doorbell,</span>{" "}
              not a calendar.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-4 text-base text-foreground/80">
              {[
                "Live availability — your kid's status, not yours",
                "Trusted families circle, vetted by you once",
                "Community groups for activities (soccer, art, books)",
                "Spontaneous hangout button — one tap, parents loop in",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <MagneticButton
                href="/app"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-[var(--color-page)]"
              >
                Try the live preview <ArrowUpRight className="size-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <motion.div style={{ rotate, y }} className="relative mx-auto w-full max-w-[420px]">
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[3rem] border border-foreground/10 bg-foreground/95 p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]">
            <img
              src={screenHome}
              alt="Haangout app home screen"
              loading="lazy"
              className="size-full rounded-[2.3rem] object-cover object-top"
            />
          </div>
          {/* floating chip */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-16 rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-soft)] ring-1 ring-black/5"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              Avery
            </p>
            <p className="text-sm font-semibold">Free until 6:00</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 bottom-24 rounded-2xl bg-accent px-4 py-3 text-accent-foreground shadow-[var(--shadow-pop)]"
          >
            <p className="text-xs font-semibold">Joey just rang the doorbell 🔔</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* Screens gallery — three real app screens, staggered */
function Screens() {
  const shots = [
    { src: screenLive, label: "Live now", tone: "bg-[oklch(0.74_0.14_280)]" },
    { src: screenHome, label: "Today's matches", tone: "bg-accent" },
    { src: screenUpcoming, label: "Upcoming hangouts", tone: "bg-foreground" },
  ];
  return (
    <section className="relative overflow-hidden bg-[oklch(0.96_0.01_75)] px-5 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                Inside the app
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[0.95] tracking-[-0.03em]">
                One tap to{" "}
                <span className="italic font-light text-accent">live.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-base text-foreground/70">
              Go live for an afternoon, see who's free, line up the next hang.
              The whole loop in three screens.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {shots.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div
                className="group relative mx-auto w-full max-w-[340px]"
                style={{
                  transform: `translateY(${i === 1 ? "-2rem" : "0"}) rotate(${
                    i === 0 ? "-3deg" : i === 2 ? "3deg" : "0deg"
                  })`,
                }}
              >
                <div className={`absolute -inset-3 -z-10 rounded-[2.6rem] ${s.tone} opacity-20 blur-2xl transition group-hover:opacity-40`} />
                <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.2rem] border border-foreground/10 bg-foreground p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] transition duration-500 group-hover:-translate-y-2">
                  <img
                    src={s.src}
                    alt={s.label}
                    loading="lazy"
                    className="size-full rounded-[1.7rem] object-cover object-top"
                  />
                </div>
                <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const lines = [
    "Bring back the street.",
    "Bring back the bike.",
    "Bring back the knock.",
    "Bring back the holler.",
    "Bring back the dusk.",
  ];
  return (
    <section className="bg-[var(--color-page)] px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        {lines.map((l, i) => (
          <Reveal key={l} delay={i * 0.04}>
            <p className="font-display text-[clamp(2.5rem,8vw,8rem)] font-black leading-[0.95] tracking-[-0.04em]">
              <span className={i % 2 === 0 ? "" : "italic font-light text-foreground/60"}>
                {l}
              </span>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Download + Feedback */
function Download() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-foreground px-5 py-28 text-[var(--color-page)] sm:px-10 sm:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.71 0.187 41) 0, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.71 0.187 41) 0, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] opacity-60">Get it</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,7vw,7rem)] font-black leading-[0.9] tracking-[-0.04em]">
            Tell your kid to{" "}
            <span className="italic font-light opacity-80">put on shoes.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="https://apps.apple.com"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-page)] px-7 py-4 text-sm font-semibold text-foreground shadow-[var(--shadow-pop)]"
            >
              <Apple className="size-5" /> App Store
            </MagneticButton>
            <MagneticButton
              href="https://play.google.com"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-[var(--color-page)] hover:bg-white/5"
            >
              <PlayIcon className="size-5" /> Google Play
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Feedback() {
  const [sent, setSent] = useState(false);
  return (
    <section
      id="feedback"
      className="bg-[var(--color-page)] px-5 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              Feedback
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em]">
              Tell us what's{" "}
              <span className="italic font-light text-foreground/60">missing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-base text-foreground/70">
              Haangout is built with parents. Ideas, bugs, requests — send them
              over. We read every one.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-[2rem] border border-foreground/10 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  className="rounded-2xl border border-foreground/10 bg-[var(--color-page)] px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="rounded-2xl border border-foreground/10 bg-[var(--color-page)] px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <textarea
                required
                placeholder="What should Haangout do next?"
                rows={5}
                className="mt-4 w-full rounded-2xl border border-foreground/10 bg-[var(--color-page)] px-4 py-3 text-sm focus:border-accent focus:outline-none"
              />
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs text-foreground/50">
                  We'll only use this to reply to you.
                </p>
                <MagneticButton
                  onClick={() => {}}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-pop)]"
                >
                  {sent ? (
                    <>
                      <Check className="size-4" /> Sent
                    </>
                  ) : (
                    <>
                      Send <ArrowUpRight className="size-4" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-[var(--color-page)] px-5 py-12 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 md:grid-cols-4">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoMark} alt="Haangout" className="size-12 rounded-2xl" />
            <span className="font-display text-3xl font-black tracking-tight">
              haang<span className="italic text-accent">out</span>
            </span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-foreground/60">
            A return to the doorbell era. Made for kids, quietly useful for
            parents.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
            Product
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#story" className="hover:text-accent">Story</a></li>
            <li><a href="#how" className="hover:text-accent">How it works</a></li>
            <li><Link to="/app" className="hover:text-accent">Try the app</Link></li>
            <li><a href="#feedback" className="hover:text-accent">Feedback</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
            Legal
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-accent">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            <li>
              <a
                href="https://apps.apple.com"
                className="hover:text-accent"
              >
                App Store
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com"
                className="hover:text-accent"
              >
                Google Play
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-xs text-foreground/50">
        <span>© {new Date().getFullYear()} Haangout. Go outside.</span>
        <span>Made for kids who'd rather be on a bike.</span>
      </div>
    </footer>
  );
}

function Marketing() {
  return (
    <>
      <SmoothScroll />
      <main className="bg-[var(--color-page)] text-foreground">
        <Nav />
        <Hero />
        <Ticker />
        <Story />
        <HowItWorks />
        <Numbers />
        <AppPreview />
        <Screens />
        <Manifesto />
        <Download />
        <Feedback />
        <Footer />
      </main>
    </>
  );
}
