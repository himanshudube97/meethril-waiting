'use client'

import { useEffect, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme, fontSerif, fontBody } from '@/lib/theme'

type Feature = {
  title: string
  description: string
  preview: ReactNode
}

const features: Feature[] = [
  {
    title: 'Journal entries',
    description:
      'Quiet pages that hold whatever the day asked of you. Words, doodles, photos, songs — all in one soft place.',
    preview: <JournalPreview />,
  },
  {
    title: 'Letters',
    description:
      'Write to your future self, to a friend on a date you choose, or to an anonymous stranger across the world. Sealed until the moment is right.',
    preview: <LetterPreview />,
  },
  {
    title: 'Scrapbooks',
    description:
      'A canvas for the things words alone can’t carry. Photos, polaroids, ticket stubs, small artifacts of a life lived.',
    preview: <ScrapbookPreview />,
  },
  {
    title: 'Memory',
    description:
      'Old entries return when you need them — and each theme reveals them in its own way. A garden in rose. A harbour in ocean. A fire in hearth.',
    preview: <MemoryPreview />,
  },
  {
    title: 'End-to-end encryption',
    description:
      'Only you ever see your words. Encrypted on your device with a key only you hold — even we cannot read them.',
    preview: <EncryptionPreview />,
  },
]

export default function Features() {
  return (
    <section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #B85E5C 0%, #A04A50 50%, #6E4248 100%)`,
      }}
    >
      <div className="max-w-3xl mx-auto">
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
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center text-base md:text-lg italic mb-20"
          style={{ color: theme.bg.primary, fontFamily: fontBody }}
        >
          and somewhere quiet for the parts of you that haven’t found their words yet
        </motion.p>

        <div className="flex flex-col gap-12 md:gap-20">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isReversed = index % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex flex-col ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-6 md:gap-10 rounded-3xl p-6 md:p-8`}
      style={{
        background: 'rgba(255, 222, 198, 0.08)',
        backdropFilter: 'blur(12px)',
        border: `1px solid rgba(255, 222, 198, 0.15)`,
      }}
    >
      <div
        className="w-full md:w-2/5 h-40 md:h-44 rounded-2xl overflow-hidden flex items-center justify-center shrink-0"
        style={{
          background: 'rgba(58, 31, 38, 0.25)',
          border: `1px solid rgba(255, 222, 198, 0.1)`,
        }}
      >
        {feature.preview}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3
          className="text-2xl md:text-3xl mb-3"
          style={{
            color: theme.bg.primary,
            fontFamily: fontSerif,
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          {feature.title}
        </h3>
        <p
          className="text-base md:text-lg leading-relaxed"
          style={{
            color: theme.bg.primary,
            fontFamily: fontBody,
            opacity: 0.85,
          }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ---------- Mini animated previews ---------- */

function JournalPreview() {
  return (
    <svg viewBox="0 0 200 120" className="w-4/5 h-4/5">
      <rect
        x="14"
        y="10"
        width="172"
        height="100"
        fill="rgba(255, 240, 220, 0.55)"
        rx="3"
      />
      {[36, 56, 76, 96].map((y) => (
        <line
          key={y}
          x1="26"
          y1={y}
          x2="174"
          y2={y}
          stroke={theme.text.muted}
          strokeWidth="0.4"
          opacity="0.35"
        />
      ))}
      <motion.path
        d="M 28 36 Q 42 30, 56 36 T 84 36 Q 98 32, 112 36 T 140 36 T 168 35"
        stroke={theme.accent.primary}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.55, 0.9, 1],
        }}
      />
      <motion.path
        d="M 28 56 Q 50 52, 74 56 T 124 55 T 168 56"
        stroke={theme.accent.primary}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 0, 1, 1, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.3, 0.75, 0.9, 1],
        }}
      />
    </svg>
  )
}

function LetterPreview() {
  const labels = ['self', 'friend', 'stranger']
  return (
    <div className="flex justify-around items-center w-full h-full px-4">
      {labels.map((label, i) => (
        <motion.div
          key={label}
          className="flex flex-col items-center gap-2"
          animate={{ y: [-3, 3, -3] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          <svg width="44" height="32" viewBox="0 0 44 32">
            <rect
              x="2"
              y="3"
              width="40"
              height="26"
              rx="2"
              fill="rgba(255, 240, 220, 0.85)"
              stroke={theme.accent.primary}
              strokeWidth="1"
            />
            <path
              d="M 2 5 L 22 18 L 42 5"
              stroke={theme.accent.primary}
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <span
            className="text-[10px] md:text-xs italic"
            style={{ color: theme.bg.primary, opacity: 0.8, fontFamily: fontBody }}
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
    { rotate: -10, x: -28, delay: 0, hue: theme.accent.warm },
    { rotate: 4, x: 0, delay: 0.2, hue: theme.accent.highlight },
    { rotate: 8, x: 28, delay: 0.4, hue: theme.accent.primary },
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
            translate: '-50% -50%',
          }}
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: item.rotate }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: item.delay, ease: 'easeOut' }}
        >
          <div
            className="w-14 h-16 md:w-16 md:h-20 p-1.5"
            style={{
              background: 'rgba(255, 250, 240, 0.95)',
              boxShadow: `0 8px 18px rgba(0,0,0,0.25)`,
            }}
          >
            <div
              className="w-full h-9 md:h-12"
              style={{
                background: `linear-gradient(135deg, ${item.hue}, ${theme.accent.primary})`,
              }}
            />
            <div
              className="w-full h-1.5 mt-1"
              style={{ background: 'rgba(58, 31, 38, 0.18)' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function MemoryPreview() {
  const particleCount = 10
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 64,
          height: 64,
          background: `radial-gradient(circle, ${theme.accent.warm}cc 0%, ${theme.accent.primary}55 50%, transparent 70%)`,
          filter: 'blur(6px)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2
        const radius = 50
        const cx = Math.cos(angle) * radius
        const cy = Math.sin(angle) * radius
        const nextAngle = angle + Math.PI * 2
        const nx = Math.cos(nextAngle) * radius
        const ny = Math.sin(nextAngle) * radius
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              background: i % 2 === 0 ? theme.accent.highlight : theme.bg.primary,
              boxShadow: `0 0 6px ${theme.accent.warm}`,
            }}
            animate={{
              x: [cx, nx],
              y: [cy, ny],
              opacity: [0.3, 0.95, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.15,
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
    <div className="w-full h-full flex items-center justify-center px-4 relative">
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        className="absolute top-3 right-3 opacity-70"
      >
        <rect x="3" y="10" width="14" height="11" rx="1.5" fill={theme.bg.primary} />
        <path
          d="M 6 10 V 7 a 4 4 0 0 1 8 0 V 10"
          stroke={theme.bg.primary}
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="10" cy="15" r="1.2" fill={theme.accent.primary} />
      </svg>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-lg italic text-center tracking-wide"
          style={{ color: theme.bg.primary, fontFamily: fontBody, opacity: 0.9 }}
        >
          {phases[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
