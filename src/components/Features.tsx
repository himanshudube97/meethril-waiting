'use client'

import { useEffect, useState, ReactNode, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme, fontSerif, fontBody } from '@/lib/theme'

type Feature = {
  title: string
  description: string
  preview: ReactNode
  accentTint: string
}

const features: Feature[] = [
  {
    title: 'Journal entries',
    description:
      'Quiet pages that hold whatever the day asked of you. Words, doodles, photos, songs — all in one soft place.',
    preview: <JournalPreview />,
    accentTint: theme.accent.warm,
  },
  {
    title: 'Letters',
    description:
      'Write to your future self, to a friend on a date you choose, or to an anonymous stranger across the world. Sealed until the moment is right.',
    preview: <LetterPreview />,
    accentTint: theme.accent.highlight,
  },
  {
    title: 'Scrapbooks',
    description:
      'A canvas for the things words alone can’t carry. Photos, polaroids, ticket stubs, small artifacts of a life lived.',
    preview: <ScrapbookPreview />,
    accentTint: theme.accent.warm,
  },
  {
    title: 'Memory',
    description:
      'Old entries return when you need them — and each theme reveals them in its own way. A garden in rose. A harbour in ocean. A fire in hearth.',
    preview: <MemoryPreview />,
    accentTint: theme.accent.highlight,
  },
  {
    title: 'End-to-end encryption',
    description:
      'Only you ever see your words. Encrypted on your device with a key only you hold — even we cannot read them.',
    preview: <EncryptionPreview />,
    accentTint: theme.accent.warm,
  },
]

export default function Features() {
  return (
    <section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #2A0F18 0%, #4A1A24 25%, #7A2C36 60%, #5A2530 100%)`,
      }}
    >
      <Starfield />
      <ShootingStars />

      {/* Big atmospheric glows */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: 800,
          maxHeight: 800,
          background: `radial-gradient(circle, ${theme.accent.warm}28 0%, transparent 65%)`,
          filter: 'blur(80px)',
          top: '15%',
          left: '-20%',
        }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '55vw',
          height: '55vw',
          maxWidth: 700,
          maxHeight: 700,
          background: `radial-gradient(circle, ${theme.accent.highlight}22 0%, transparent 65%)`,
          filter: 'blur(90px)',
          bottom: '5%',
          right: '-15%',
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-5xl text-center mb-4"
          style={{
            color: theme.bg.primary,
            fontFamily: fontSerif,
            letterSpacing: '0.05em',
            fontWeight: 500,
            textShadow: `0 0 30px ${theme.accent.warm}55`,
          }}
        >
          a place for everything
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-base md:text-lg italic mb-16 md:mb-24"
          style={{ color: theme.accent.highlight, fontFamily: fontBody }}
        >
          and somewhere quiet for the parts of you that haven’t found their words yet
        </motion.p>

        <div className="flex flex-col gap-8 md:gap-12">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Starfield() {
  // Generate stars once on mount; deterministic per render via index-based math
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: (i * 13.7) % 100,
      top: (i * 19.3) % 100,
      size: 1 + ((i * 3) % 4) * 0.6,
      duration: 2 + (i % 5),
      delay: (i * 0.27) % 6,
      bright: i % 7 === 0,
    }))
  }, [])

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.bright ? theme.accent.highlight : theme.bg.primary,
            boxShadow: s.bright
              ? `0 0 ${4 + s.size * 2}px ${theme.accent.warm}, 0 0 ${8 + s.size * 3}px ${theme.accent.warm}55`
              : `0 0 3px ${theme.bg.primary}`,
          }}
          animate={{
            opacity: [0.15, s.bright ? 1 : 0.7, 0.15],
            scale: s.bright ? [0.9, 1.4, 0.9] : [1, 1.15, 1],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function ShootingStars() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { top: '15%', delay: 4, duration: 2.4 },
        { top: '55%', delay: 11, duration: 2.8 },
      ].map((cfg, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: cfg.top,
            left: '-10%',
            width: 100,
            height: 1.5,
            background: `linear-gradient(90deg, transparent 0%, ${theme.accent.highlight} 60%, ${theme.bg.primary} 100%)`,
            borderRadius: 1,
            boxShadow: `0 0 6px ${theme.accent.highlight}, 0 0 12px ${theme.accent.warm}`,
            filter: 'blur(0.4px)',
          }}
          animate={{
            x: ['0vw', '120vw'],
            y: [0, 80],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: cfg.duration,
            delay: cfg.delay,
            repeat: Infinity,
            repeatDelay: 16 + i * 6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  // Even-indexed cards slide in from the left, odd from the right.
  const slideFromLeft = index % 2 === 0
  const slideX = slideFromLeft ? -120 : 120

  return (
    <motion.div
      initial={{ opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(155deg, #FFF1DC 0%, #FFE2BC 55%, #FFD2A8 100%)`,
        border: `1px solid rgba(255, 200, 144, 0.6)`,
        boxShadow: `
          0 24px 60px rgba(0, 0, 0, 0.5),
          0 8px 24px rgba(200, 71, 45, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.85),
          inset 0 -1px 0 rgba(200, 71, 45, 0.15)
        `,
      }}
    >
      {/* Inner top-light */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: 90,
          background: `radial-gradient(ellipse at top, ${theme.accent.highlight}88 0%, transparent 70%)`,
          opacity: 0.6,
        }}
      />

      {/* Accent glow on the side the card slides in from */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 260,
          height: 260,
          background: `radial-gradient(circle, ${feature.accentTint}66 0%, transparent 65%)`,
          filter: 'blur(50px)',
          top: -80,
          ...(slideFromLeft ? { right: -90 } : { left: -90 }),
        }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
        transition={{
          duration: 6 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      />

      <div
        className={`relative z-10 flex flex-col ${
          slideFromLeft ? 'md:flex-row' : 'md:flex-row-reverse'
        } md:items-stretch min-h-[260px] md:min-h-[240px]`}
      >
        {/* Preview area */}
        <div
          className="relative shrink-0 w-full md:w-[44%] h-48 md:h-auto overflow-hidden flex items-center justify-center"
          style={{
            background: `linear-gradient(180deg, #3A1F26 0%, #5A2C36 100%)`,
            borderBottom: `1px solid rgba(58, 31, 38, 0.4)`,
            boxShadow: `inset 0 2px 16px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 200, 144, 0.08)`,
          }}
        >
          {/* tiny stars inside the preview window */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 1.5,
                height: 1.5,
                background: theme.accent.highlight,
                left: `${10 + i * 16}%`,
                top: `${15 + (i * 17) % 70}%`,
                boxShadow: `0 0 4px ${theme.accent.warm}`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}
          {feature.preview}
        </div>

        {/* Text area */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-10">
          <h3
            className="text-2xl md:text-3xl mb-3"
            style={{
              color: '#3A1F26',
              fontFamily: fontSerif,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            {feature.title}
          </h3>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{
              color: '#6E4248',
              fontFamily: fontBody,
            }}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- Mini animated previews ---------- */

function JournalPreview() {
  return (
    <svg viewBox="0 0 220 140" className="w-4/5 h-4/5 relative z-10">
      <defs>
        <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255, 245, 225, 0.95)" />
          <stop offset="100%" stopColor="rgba(255, 232, 200, 0.88)" />
        </linearGradient>
      </defs>
      <rect x="14" y="10" width="192" height="120" fill="url(#paperGrad)" rx="3" />
      <line
        x1="110"
        y1="10"
        x2="110"
        y2="130"
        stroke="rgba(58, 31, 38, 0.18)"
        strokeWidth="1"
      />
      {[36, 56, 76, 96].map((y) => (
        <line
          key={y}
          x1="22"
          y1={y}
          x2="200"
          y2={y}
          stroke="rgba(154, 112, 120, 0.45)"
          strokeWidth="0.5"
          opacity="0.8"
        />
      ))}
      {[36, 56, 76].map((y, idx) => (
        <motion.path
          key={y}
          d={
            idx === 0
              ? 'M 24 36 Q 38 30, 52 35 T 80 36 Q 92 32, 104 35'
              : idx === 1
                ? 'M 116 56 Q 130 50, 144 55 T 172 55 T 200 55'
                : 'M 24 76 Q 40 72, 56 76 T 86 75 T 106 75'
          }
          stroke={theme.accent.primary}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: idx * 0.6,
            times: [0, 0.55, 0.92, 1],
          }}
        />
      ))}
    </svg>
  )
}

function LetterPreview() {
  const labels = ['self', 'friend', 'stranger']
  return (
    <div className="flex justify-around items-center w-full h-full px-4 relative z-10">
      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: '70%',
          height: 12,
          background: `radial-gradient(ellipse at center, ${theme.accent.warm}55, transparent 70%)`,
          filter: 'blur(6px)',
        }}
      />
      {labels.map((label, i) => (
        <motion.div
          key={label}
          className="flex flex-col items-center gap-2 relative z-10"
          animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
          transition={{
            duration: 3.5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          <svg
            width="56"
            height="40"
            viewBox="0 0 56 40"
            style={{ filter: `drop-shadow(0 4px 10px ${theme.accent.primary}88)` }}
          >
            <rect
              x="2"
              y="4"
              width="52"
              height="32"
              rx="3"
              fill="rgba(255, 245, 225, 0.95)"
              stroke={theme.accent.primary}
              strokeWidth="1.2"
            />
            <path
              d="M 2 6 L 28 22 L 54 6"
              stroke={theme.accent.primary}
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="28" cy="30" r="2.5" fill={theme.accent.primary} opacity="0.8" />
          </svg>
          <span
            className="text-xs italic"
            style={{
              color: theme.accent.highlight,
              opacity: 0.95,
              fontFamily: fontBody,
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function ScrapbookPreview() {
  const items = [
    { rotate: -12, x: -38, hue: theme.accent.warm, accent: theme.accent.highlight, delay: 0 },
    { rotate: -2, x: -10, hue: theme.accent.highlight, accent: theme.bg.primary, delay: 0.15 },
    { rotate: 6, x: 18, hue: theme.accent.primary, accent: theme.accent.warm, delay: 0.3 },
    { rotate: 14, x: 40, hue: theme.accent.warm, accent: theme.accent.primary, delay: 0.45 },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center z-10">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `calc(50% + ${item.x}px)`,
            top: '50%',
          }}
          initial={{ opacity: 0, scale: 0.4, rotate: 0, y: 20, x: '-50%' }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: item.rotate,
            y: '-50%',
            x: '-50%',
          }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: item.delay, ease: 'easeOut' }}
        >
          <div
            className="w-16 h-20 md:w-18 md:h-24 p-1.5 md:p-2"
            style={{
              background: 'rgba(255, 250, 240, 0.97)',
              boxShadow: `0 12px 24px rgba(0,0,0,0.45)`,
              borderRadius: 2,
            }}
          >
            <div
              className="w-full h-10 md:h-14 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.hue} 0%, ${item.accent} 100%)`,
              }}
            >
              <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full"
                style={{
                  width: '40%',
                  height: '55%',
                  background: `rgba(58, 31, 38, ${0.18 + (i % 2) * 0.08})`,
                }}
              />
            </div>
            <div
              className="w-full h-1.5 mt-1 rounded-full"
              style={{ background: `${theme.accent.primary}33` }}
            />
            <div
              className="w-2/3 h-1 mt-1 rounded-full mx-auto"
              style={{ background: `${theme.accent.primary}22` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function MemoryPreview() {
  const particleCount = 14
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-10">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 110,
          border: `1px solid ${theme.accent.warm}88`,
        }}
        animate={{ scale: [0.7, 1.3, 0.7], opacity: [0, 0.7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 70,
          height: 70,
          background: `radial-gradient(circle, ${theme.accent.highlight}ee 0%, ${theme.accent.warm}aa 35%, transparent 70%)`,
          filter: 'blur(3px)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2
        const radius = 55
        const cx = Math.cos(angle) * radius
        const cy = Math.sin(angle) * radius
        const nx = Math.cos(angle + Math.PI * 2) * radius
        const ny = Math.sin(angle + Math.PI * 2) * radius
        const isWarm = i % 3 === 0
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: isWarm ? 5 : 3,
              height: isWarm ? 5 : 3,
              background: isWarm ? theme.accent.highlight : theme.bg.primary,
              boxShadow: `0 0 8px ${theme.accent.warm}`,
            }}
            animate={{
              x: [cx, nx],
              y: [cy, ny],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.12,
            }}
          />
        )
      })}
    </div>
  )
}

function EncryptionPreview() {
  const phases = [
    'today felt quiet',
    '••••• •••• ••••••',
    'only you can read this',
    '•••• ••• ••• •••• ••••',
  ]
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((p) => (p + 1) % phases.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [phases.length])

  return (
    <div className="w-full h-full flex items-center justify-center px-6 relative z-10">
      <motion.svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        className="absolute top-4 right-5"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M 8 18 V 12 a 8 8 0 0 1 16 0 V 18"
          stroke={theme.accent.highlight}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="4"
          y="18"
          width="24"
          height="18"
          rx="2.5"
          fill={theme.accent.highlight}
          opacity="0.95"
        />
        <circle cx="16" cy="26" r="2" fill={theme.accent.primary} />
        <rect x="15" y="27" width="2" height="5" rx="1" fill={theme.accent.primary} />
      </motion.svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-xl italic text-center tracking-wide"
          style={{
            color: idx % 2 === 0 ? theme.bg.primary : theme.accent.highlight,
            fontFamily: fontBody,
            opacity: 0.95,
            letterSpacing: idx % 2 === 0 ? 'normal' : '0.15em',
          }}
        >
          {phases[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
