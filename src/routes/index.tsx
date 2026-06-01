import { useState } from "react";
import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root.tsx";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "motion/react";
import { ArrowUpRight, Instagram, Mail, MapPin, Menu, X } from "lucide-react";
import heroImg from "@/assets/hero-stationery.jpg";
import invitationImg from "@/assets/work-invitation.jpg";
import sealImg from "@/assets/work-seal.jpg";
import keepsakeImg from "@/assets/work-keepsake.jpg";
import monogramImg from "@/assets/work-monogram.jpg";
import studioImg from "@/assets/about-studio.jpg";
import marqueePaper from "@/assets/marquee-paper.jpg";
import {
  BentoGrid,
  BentoCell,
  ContainerScale,
  ContainerScroll,
} from "@/components/blocks/hero-gallery-scroll-animation";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import { Preloader } from "@/components/ui/preloader";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeBlur}
      transition={{ delay, duration: 0.9, ease }}
    >
      {children}
    </motion.div>
  );
}

function Index() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Journey />
        <Portfolio />
        <Process />
        <Booking />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -12, filter: "blur(5px)" },
    open: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const navLinks = [
    ["Work", "#work"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["Studio", "#about"],
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 relative z-50">
        <a href="#top" className="font-display text-xl tracking-tight">
          Paperie<span className="text-accent font-sans font-bold">.</span>by V
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-9 text-sm text-foreground/80 md:flex">
          {navLinks.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="transition-colors hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <a
            href="#book"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-4 py-2 text-sm backdrop-blur transition-colors hover:bg-foreground hover:text-background"
          >
            Enquire
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Hamburger Menu Icon for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="flex items-center justify-center p-2 rounded-full border border-foreground/15 bg-background/65 backdrop-blur md:hidden transition-transform active:scale-95 hover:bg-foreground/5 cursor-pointer"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Responsive Glassmorphism Staggered Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute inset-x-0 top-0 pt-24 pb-8 px-6 bg-background/95 border-b border-border/40 backdrop-blur-xl shadow-lg z-40 md:hidden"
          >
            <motion.ul className="flex flex-col gap-4 text-lg font-display">
              {navLinks.map(([label, href]) => (
                <motion.li key={href} variants={itemVariants}>
                  <a
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-foreground/90 transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const images = [
    heroImg,
    invitationImg,
    sealImg,
    keepsakeImg,
    marqueePaper,
  ];
  return (
    <section id="top" className="relative">
      <ContainerScroll className="h-[350vh]">
        {/* Sticky Bento Grid comes FIRST */}
        <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4 md:p-10">
          {images.map((src, i) => (
            <BentoCell
              key={i}
              className="overflow-hidden rounded-md bg-muted shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]"
            >
              <img
                src={src}
                alt={`Paperie by V work ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </BentoCell>
          ))}
        </BentoGrid>

        {/* Text Overlay comes SECOND with z-10 index */}
        <ContainerScale className="relative z-10 flex flex-col items-center justify-center text-center">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            Kohima · Nagaland
            <span className="h-px w-8 bg-foreground/40" />
          </p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] tracking-tight">
            Paper, slowed
            <br />
            into a <em className="italic text-accent">keepsake</em>.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A boutique design and print studio for couples who want their
            invitations to feel like the wedding itself — hand-illustrated,
            quietly considered, made to be saved.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background transition-transform hover:scale-[1.02]"
            >
              Begin your suite
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#work"
              className="text-sm underline decoration-foreground/30 underline-offset-[6px] transition-colors hover:decoration-foreground"
            >
              View the portfolio
            </a>
          </div>
        </ContainerScale>
      </ContainerScroll>
    </section>
  );
}

function Marquee() {
  const items = [
    "Bespoke invitation suites",
    "Hand illustration",
    "Wax seals & monograms",
    "Keepsake boxes",
    "Personalized gifting",
    "Worldwide shipping",
  ];
  return (
    <div className="border-y border-border/60 bg-secondary/40 py-5 overflow-hidden">
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-muted-foreground">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from {transform:translateX(0)} to {transform:translateX(-50%)} }`}</style>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
      <div className="grid gap-14 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-5">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              (01) The Studio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={studioImg}
                alt="V at the studio desk in Kohima, hand-illustrating an invitation"
                width={1400}
                height={1750}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:pt-12">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.05]">
              We make paper that holds a moment.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              Founded in Kohima by V, often in collaboration with Welly & Co.,
              Paperie by V is a small studio devoted to bespoke wedding
              stationery and keepsakes. Every suite is built from scratch —
              illustrated by hand, sourced thoughtfully, assembled in-house.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              We work with a small number of couples each season so that nothing
              feels rushed and everything feels theirs.
            </p>
          </Reveal>
          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-12 grid grid-cols-2 gap-8 border-t border-border/60 pt-10 sm:grid-cols-3"
          >
            {[
              ["Est.", "Kohima"],
              ["Couples / year", "12 only"],
              ["Booking", "2026 / 2027"],
            ].map(([k, v]) => (
              <motion.div key={k} variants={fadeBlur}>
                <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-2 font-display text-2xl">{v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      n: "I.",
      title: "Bespoke Wedding Suites",
      body:
        "Fully custom invitation suites — illustrated, printed and assembled around the atmosphere, theme and palette of your wedding.",
    },
    {
      n: "II.",
      title: "Keepsakes",
      body:
        "Hand-illustrated paperie meant to be kept. Vow books, ceremony programs, menus and signage with quiet, lasting detail.",
    },
    {
      n: "III.",
      title: "Personalized Gifting",
      body:
        "Considered gift sets and welcome boxes for guests, bridal parties and milestone moments — wrapped, sealed and signed.",
    },
    {
      n: "IV.",
      title: "Monograms & Seals",
      body:
        "A small mark that carries the whole story. Custom monograms, wax seals, ribbons and finishing touches.",
    },
  ];
  return (
    <section id="services" className="border-y border-border/60 bg-secondary/30 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between gap-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              (02) Services
            </p>
          </Reveal>
          <Reveal>
            <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
              Four ways we work — always intimate, always made for one.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05]">
            Slow craft, for the once-in-a-lifetime kind of paper.
          </h2>
        </Reveal>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2"
        >
          {services.map((s) => (
            <motion.li
              key={s.title}
              variants={fadeBlur}
              className="group bg-background p-8 transition-colors hover:bg-card md:p-12"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-sm italic text-accent">
                  {s.n}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-10 font-display text-2xl md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Portfolio() {
  const items = [
    { img: invitationImg, title: "Verdure", meta: "Invitation · Gold leaf" , span: "md:col-span-7 md:row-span-2 aspect-[4/5]"},
    { img: sealImg, title: "The Seal", meta: "Wax · Monogram", span: "md:col-span-5 aspect-[4/3]" },
    { img: keepsakeImg, title: "Welcome Box", meta: "Gifting · Bridal", span: "md:col-span-5 aspect-[4/3]" },
    { img: monogramImg, title: "D & E", meta: "Save the date · Ribbon", span: "md:col-span-12 aspect-[16/7]" },
  ];
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
      <div className="flex items-end justify-between gap-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            (03) Selected Work
          </p>
        </Reveal>
        <Reveal>
          <a
            href="https://instagram.com/paperiebyv"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm"
          >
            More on Instagram
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
      <Reveal>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05]">
          A few recent suites from the studio.
        </h2>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mt-16 grid gap-5 md:grid-cols-12"
      >
        {items.map((it) => (
          <motion.figure
            key={it.title}
            variants={fadeBlur}
            className={`group relative overflow-hidden rounded-sm bg-muted ${it.span}`}
          >
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-black/10 to-transparent p-5 text-background">
              <div>
                <div className="font-display text-xl">{it.title}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">
                  {it.meta}
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Enquire", "Tell us about the day — the place, the people, the feeling."],
    ["Concept", "Mood, palette and illustration directions are drafted by hand."],
    ["Craft", "We illustrate, print, source papers and assemble in studio."],
    ["Deliver", "Suites are sealed, packed and shipped — within India or worldwide."],
  ];
  return (
    <section id="process" className="border-t border-border/60 bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            (04) Process
          </p>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05]">
            Four chapters — about four months, end to end.
          </h2>
        </Reveal>
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4"
        >
          {steps.map(([t, body], i) => (
            <motion.li
              key={t}
              variants={fadeBlur}
              className="bg-background p-8 md:p-10"
            >
              <div className="font-display text-sm italic text-accent">
                0{i + 1}
              </div>
              <h3 className="mt-8 font-display text-2xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-background/60">
                (05) Bookings — 2026 / 2027
              </p>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02]">
                Let's begin your <em className="italic text-accent">paper</em>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-background/70">
                Custom suites take time — concept development, sourcing and
                assembly by hand. We recommend reaching out as early as you can
                in your wedding planning.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:pl-10">
            <Reveal delay={0.15}>
              <div className="rounded-sm border border-background/15 p-8">
                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                    <div>
                      <div className="text-background/60 uppercase tracking-[0.2em] text-[11px]">
                        Studio
                      </div>
                      <div className="mt-1">
                        New Secretariat Road
                        <br />
                        Kohima, Nagaland
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Instagram className="mt-0.5 h-4 w-4 text-accent" />
                    <a
                      href="https://instagram.com/paperiebyv"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent"
                    >
                      @paperiebyv
                    </a>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-0.5 h-4 w-4 text-accent" />
                    <a href="mailto:hello@paperiebyv.com" className="hover:text-accent">
                      hello@paperiebyv.com
                    </a>
                  </div>
                </div>
                <a
                  href="https://instagram.com/paperiebyv"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 group inline-flex w-full items-center justify-between rounded-full bg-background px-6 py-4 text-sm text-foreground transition-transform hover:scale-[1.02]"
                >
                  Send an enquiry
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    {
      n: "01",
      title: "Discover the Story",
      body: "We begin with a conversation — the place, the people, the small details that make your day yours.",
      img: studioImg,
    },
    {
      n: "02",
      title: "Illustrate by Hand",
      body: "Mood, palette and motifs are drawn from scratch — eucalyptus, ribbon, monograms, all rendered in ink.",
      img: invitationImg,
    },
    {
      n: "03",
      title: "Print & Seal",
      body: "Suites are letter-pressed, gold-foiled and finished with wax seals — a slow craft, made to be touched.",
      img: sealImg,
    },
    {
      n: "04",
      title: "Deliver the Keepsake",
      body: "Packed, ribboned and shipped — paperie that arrives as a gift, kept long after the day itself.",
      img: keepsakeImg,
    },
  ];
  return (
    <section className="border-t border-border/60 bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              The Journey
              <span className="h-px w-8 bg-foreground/40" />
            </p>
          </Reveal>
          <Reveal>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05]">
              From first letter to <em className="italic text-accent">final seal</em> — unhurried.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              A quiet, four-chapter process — designed so nothing is rushed and every piece feels considered.
            </p>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-20 grid gap-6 md:grid-cols-4"
        >
          {steps.map((s) => (
            <motion.li
              key={s.n}
              variants={fadeBlur}
              className="group relative flex flex-col rounded-sm border border-border/60 bg-card/40 p-7 transition-colors duration-500 hover:bg-card"
            >
              <div className="font-display text-5xl text-muted-foreground/40 transition-colors duration-500 group-hover:text-accent">
                {s.n}
              </div>

              <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-sm bg-muted border border-border/40">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/[0.03] transition-opacity duration-500 group-hover:opacity-0" />
              </div>

              <h3 className="mt-7 font-display text-2xl leading-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>

              <div className="mt-6 h-px w-10 bg-accent transition-all duration-500 group-hover:w-full group-hover:bg-foreground/30" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-border/60 bg-secondary/30 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-8 bg-foreground/40" />
              (06) Kind Words
              <span className="h-px w-8 bg-foreground/40" />
            </p>
          </Reveal>
          <Reveal>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05]">
              From the couples we&rsquo;ve made <em className="italic text-accent">paper</em> for.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <TestimonialCarousel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="font-display text-lg">
          Paperie<span className="text-accent">.</span>by V
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} — Made by hand in Kohima
        </p>
      </div>
    </footer>
  );
}
