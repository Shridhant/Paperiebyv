import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  names: string;
  location: string;
  date: string;
  avatarLetter: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "V took our vague, fragmented ideas and spun them into a breathtaking physical keepsake. Our guests still remark on the raw cotton paper texture, the delicate letterpress depth, and the hand-pressed Nagaland oak-leaf wax seal. It was the very first physical invitation of our wedding, and it set the slow, beautiful, and thoughtful tone perfectly.",
    names: "Azo & Kevisenuo",
    location: "Kohima, Nagaland",
    date: "Winter 2025",
    avatarLetter: "A",
  },
  {
    id: 2,
    quote:
      "The custom invitation suite created by V was a pure work of art. The hand-drawn indigenous flora illustrations and the shimmering delicate gold leaf accents felt incredibly intimate, bespoke, and luxurious. V and her studio are true craftspeople — exceptionally patient, highly detailed, and profoundly talented.",
    names: "Meera & Rohan",
    location: "Alibaug & Mumbai",
    date: "Spring 2026",
    avatarLetter: "M",
  },
  {
    id: 3,
    quote:
      "We desired wedding stationery that felt quiet but deeply memorable, almost like opening a private museum archive. The customized monogram cards, hand-torn borders, and satin-tied boxes felt like opening a true treasury. Paperie by V makes paper to be saved, framed, and cherished forever.",
    names: "Elena & David",
    location: "Tuscany & New Delhi",
    date: "Autumn 2025",
    avatarLetter: "E",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Autoplay functionality every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials[currentIndex];

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-8">
      {/* Testimonial Box */}
      <div className="relative min-h-[380px] md:min-h-[290px] w-full overflow-hidden rounded-lg border border-border/50 bg-card/40 p-8 md:p-12 backdrop-blur-md shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)]">
        
        {/* Background Decorative Serif Quote Icon */}
        <div className="absolute right-6 top-6 text-accent/8 opacity-20 pointer-events-none">
          <Quote className="h-28 w-28 rotate-180 stroke-[0.5]" />
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={active.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10"
          >
            {/* Elegant Initial Monogram Avatar */}
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full border border-accent/20 bg-background/80 shadow-inner">
              <span className="font-display text-2xl md:text-3xl italic text-accent">
                {active.avatarLetter}
              </span>
            </div>

            {/* Content block */}
            <div className="flex-grow flex flex-col justify-center">
              {/* Quote text in elegant Serif font */}
              <blockquote className="font-display text-lg md:text-xl italic leading-relaxed text-foreground/90">
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              {/* Author Metadata */}
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                <cite className="not-italic font-sans font-medium text-sm tracking-wide text-foreground">
                  {active.names}
                </cite>
                <span className="text-muted-foreground/50 text-xs">•</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {active.location}
                </span>
                <span className="text-muted-foreground/50 text-xs hidden sm:inline">•</span>
                <span className="text-xs uppercase tracking-widest text-accent/90 hidden sm:inline">
                  {active.date}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav Controls */}
      <div className="mt-8 flex items-center justify-between px-2">
        {/* Dot Indicators */}
        <div className="flex items-center gap-2.5">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-8 bg-foreground"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/45"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-foreground/10 bg-background/50 text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-foreground/10 bg-background/50 text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground hover:scale-105 active:scale-95"
          >
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
