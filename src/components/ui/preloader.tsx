"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

const items = [
  { word: "Bespoke", image: "/work-invitation.jpg", rotate: -3, x: -15, y: -10 },
  { word: "Hand-illustrated", image: "/about-studio.jpg", rotate: 2, x: 15, y: -15 },
  { word: "Quietly considered", image: "/work-seal.jpg", rotate: -2, x: -10, y: 15 },
  { word: "Paperie.by V", image: "/hero-stationery.jpg", rotate: 3, x: 10, y: -5 }
]

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = React.useState(0)
  const [dimension, setDimension] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  React.useEffect(() => {
    if (index === items.length - 1) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete()
      }, 1400) // Keep final logo screen slightly longer for brand impact
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1)
    }, 1100)

    return () => clearTimeout(timer)
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} Z`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} Z`

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 }
    }
  }

  const slideUp = {
    initial: {
      top: 0
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 }
    }
  }

  const textOpacity = {
    initial: {
      opacity: 0,
      y: 20
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] as const, delay: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const }
    }
  }

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: 40,
      rotate: 0
    },
    enter: (custom: typeof items[0]) => ({
      opacity: 1,
      scale: 1,
      y: custom.y,
      x: custom.x,
      rotate: custom.rotate,
      transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] as const, delay: 0.1 }
    }),
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -30,
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] as const }
    }
  }

  React.useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary overflow-hidden grain"
      style={{ background: "oklch(0.22 0.018 40)" }} // Deep walnut ink
    >
      {dimension.width > 0 && (
        <>
          <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full px-6">
            {/* Elegant header mark */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 text-center"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[oklch(0.97_0.012_80)] font-sans">
                Paperie · Kohima
              </span>
            </motion.div>

            {/* Floating Showcase Image Container */}
            <div className="relative w-56 h-72 md:w-64 md:h-80 mb-10 overflow-visible flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  custom={items[index]}
                  variants={imageVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="w-full h-full rounded-sm overflow-hidden border border-[oklch(0.97_0.012_80)]/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] bg-[oklch(0.28_0.025_35)]"
                >
                  <img
                    src={items[index].image}
                    alt={items[index].word}
                    className="w-full h-full object-cover grayscale-[20%] sepia-[15%] contrast-[105%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Word cycle */}
            <div className="h-16 overflow-hidden flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  variants={textOpacity}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[oklch(0.97_0.012_80)]"
                >
                  {index === items.length - 1 ? (
                    <span>
                      {items[index].word}
                      <span className="text-accent font-sans font-bold text-2xl ml-0.5 animate-pulse">.</span>
                    </span>
                  ) : (
                    items[index].word
                  )}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {items.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.15, width: 4 }}
                  animate={{
                    opacity: i === index ? 1 : i < index ? 0.5 : 0.15,
                    width: i === index ? 16 : 4,
                    backgroundColor: i === index ? "oklch(0.78 0.07 40)" : "oklch(0.97 0.012 80)"
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-1 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* SVG liquid curves curtain reveal */}
          <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)] pointer-events-none z-0">
            <motion.path
              variants={curveVariants}
              initial="initial"
              exit="exit"
              fill="oklch(0.22 0.018 40)"
            />
          </svg>
        </>
      )}
    </motion.div>
  )
}
