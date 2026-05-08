'use client'

import { useEffect, useState, ReactNode } from 'react'
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
        background: `linear-gradient(180deg, #B85E5C 0%, #8E3A44 50%, #5A2C36 100%)`,
      }}
    >
      {/* Soft glow accents in the section background */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: 700,
          maxHeight: 700,
          background: `radial-gradient(circle, ${theme.accent.warm}22 0%, transparent 65%)`,
          filter: 'blur(70px)',
          top: '20%',
          left: '-15%',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: 600,
          maxHeight: 600,
          background: `radial-gradient(circle, ${theme.accent.highlight}1a 0%, transparent 65%)`,
          filter: 'blur(70px)',
          bottom: '10%',
          right: '-10%',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl text-center mb-4"
          style={{
            color: theme.bg.primary,
            fontFamily: fontSerif,
            letterSpacing: '0.05em',
            fontWeight: 500,
          }}
        >
          a place for everything
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.75 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center text-base md:text-lg italic mb-16 md:mb-20"
          style={{ color: theme.bg.primary, fontFamily: fontBody }}
        >
          and somewhere quiet for the parts of you that haven’t found their words yet
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              fullWidth={i === features.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
  fullWidth,
}: {
  feature: Feature
  index: number
  fullWidth: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-3xl p-6 md:p-8 ${
        fullWidth ? 'md:col-span-2' : ''
      }`}
      style={{
        background: `linear-gradient(150deg, rgba(255, 222, 198, 0.18) 0%, rgba(232, 148, 90, 0.12) 50%, rgba(184, 94, 92, 0.18) 100%)`,
        backdropFilter: 'blur(16px)',
        border: `1px solid rgba(255, 222, 198, 0.25)`,
        boxShadow: `0 12px 40px rgba(58, 31, 38, 0.35), inset 0 1px 0 rgba(255, 222, 198, 0.15)`,
      }}
    >
      {/* Accent corner glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${feature.accentTint}55 0%, transparent 65%)`,
          filter: 'blur(40px)',
          top: -60,
          right: -60,
        }}
      />

      <div
        className={`relative z-10 ${
          fullWidth
            ? 'flex flex-col md:flex-row md:items-center gap-6 md:gap-10'
            : 'flex flex-col gap-6'
        }`}
      >
        <div
          className={`rounded-2xl overflow-hidden flex items-center justify-center shrink-0 ${
            fullWidth ? 'w-full md:w-2/5 h-44 md:h-52' : 'w-full h-44 md:h-52'
          }`}
          style={{
            background: `linear-gradient(180deg, rgba(58, 31, 38, 0.55) 0%, rgba(58, 31, 38, 0.35) 100%)`,
            border: `1px solid rgba(255, 222, 198, 0.12)`,
            boxShadow: `inset 0 1px 12px rgba(0, 0, 0, 0.25)`,
          }}
        >
          {feature.preview}
        </div>
        <div className="flex-1">
          <h3
            className="text-2xl md:text-3xl mb-3"
            style={{
              color: theme.accent.highlight,
              fontFamily: fontSerif,
              fontWeight: 500,
              letterSpacing: '0.01em',
              textShadow: `0 0 20px ${feature.accentTint}55`,
            }}
          >
            {feature.title}
          </h3>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{
              color: theme.bg.primary,
              fontFamily: fontBody,
              opacity: 0.92,
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
    <svg viewBox="0 0 220 140" className="w-4/5 h-4/5">
      <defs>
        <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255, 245, 225, 0.92)" />
          <stop offset="100%" stopColor="rgba(255, 232, 200, 0.85)" />
        </linearGradient>
      </defs>
      <rect x="14" y="10" width="192" height="120" fill="url(#paperGrad)" rx="3" />
      {/* spine shadow */}
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
    <div className="flex justify-around items-center w-full h-full px-4 relative">
      {/* Soft floor glow */}
      <div
        aria-hidden
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: '70%',
          height: 12,
          background: `radial-gradient(ellipse at center, ${theme.accent.warm}40, transparent 70%)`,
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
            style={{ filter: `drop-shadow(0 4px 8px ${theme.accent.primary}55)` }}
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
            {/* tiny wax seal */}
            <circle cx="28" cy="30" r="2.5" fill={theme.accent.primary} opacity="0.7" />
          </svg>
          <span
            className="text-xs italic"
            style={{
              color: theme.accent.highlight,
              opacity: 0.9,
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
    <div className="relative w-full h-full flex items-center justify-center">
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
              boxShadow: `0 10px 22px rgba(0,0,0,0.32)`,
              borderRadius: 2,
            }}
          >
            <div
              className="w-full h-10 md:h-14 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${item.hue} 0%, ${item.accent} 100%)`,
              }}
            >
              {/* tiny "subject" silhouette in the photo */}
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
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 110,
          border: `1px solid ${theme.accent.warm}66`,
        }}
        animate={{ scale: [0.7, 1.3, 0.7], opacity: [0, 0.6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* central glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 70,
          height: 70,
          background: `radial-gradient(circle, ${theme.accent.highlight}cc 0%, ${theme.accent.warm}88 35%, transparent 70%)`,
          filter: 'blur(4px)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* orbiting particles */}
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
    <div className="w-full h-full flex items-center justify-center px-6 relative">
      {/* Animated padlock */}
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
        <rect
          x="15"
          y="27"
          width="2"
          height="5"
          rx="1"
          fill={theme.accent.primary}
        />
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
