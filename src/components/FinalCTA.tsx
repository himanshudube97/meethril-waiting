'use client'

import { motion } from 'framer-motion'
import { theme, fontSerif, fontBody } from '@/lib/theme'
import { useReducedAnimations } from '@/lib/use-reduced-animations'
import WaitlistForm from './WaitlistForm'

/*
 * Three drafted poetic-copy variants. The first is active.
 * To swap, copy one of the others into POEM and the cue line into CUE.
 *
 * Variant A — contemplative (matches the whisper voice in the hero):
 *   POEM: ['Some things take root slowly.', 'Yours will be ready in a few weeks.']
 *   CUE:  'leave us a way to find you when it is.'
 *
 * Variant B — metaphorical (lighter, a bit more branded):
 *   POEM: ['There will be a quieter place soon.', 'Leave a candle in the window.']
 *   CUE:  'we’ll know where to look.'
 *
 * Variant C — direct, warm (less metaphor, more clarity):
 *   POEM: ['In a few weeks, a quieter place.', 'We’ll send word when it’s ready.']
 *   CUE:  'tell us where to send it.'
 */
const POEM = ['Some things take root slowly.', 'Yours will be ready in a few weeks.']
const CUE = 'leave us a way to find you when it is.'

export default function FinalCTA() {
  const reduced = useReducedAnimations()

  // Static-star count on mobile, animated on desktop
  const starCount = reduced ? 12 : 30

  return (
    <section
      className="relative py-24 md:py-32 px-6 overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(180deg, #5A2530 0%, #4A1F2A 40%, #2A0F18 100%)`,
        minHeight: '100vh',
      }}
    >
      {/* Soft warm glow at the bottom — desktop only (huge blur radius) */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            width: '70vw',
            height: '70vw',
            maxWidth: 900,
            maxHeight: 900,
            background: `radial-gradient(circle, ${theme.accent.warm}30 0%, transparent 65%)`,
            filter: 'blur(80px)',
            bottom: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Drifting embers — desktop only */}
      {!reduced &&
        Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: theme.accent.highlight,
              left: `${5 + (i * 6.1) % 90}%`,
              bottom: 0,
              boxShadow: `0 0 8px ${theme.accent.warm}`,
            }}
            animate={{
              y: [0, -260 - (i % 4) * 50],
              x: [0, i % 2 === 0 ? 14 : -14],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: 9 + (i % 5) * 1.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}

      {/* Faint background stars — fewer + static on mobile */}
      {Array.from({ length: starCount }).map((_, i) =>
        reduced ? (
          <div
            key={`star-${i}`}
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: 1 + (i % 3) * 0.4,
              height: 1 + (i % 3) * 0.4,
              background: theme.bg.primary,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 19.1) % 100}%`,
              opacity: 0.4,
            }}
          />
        ) : (
          <motion.div
            key={`star-${i}`}
            aria-hidden
            className="absolute rounded-full"
            style={{
              width: 1 + (i % 3) * 0.4,
              height: 1 + (i % 3) * 0.4,
              background: theme.bg.primary,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 19.1) % 100}%`,
              boxShadow: `0 0 3px ${theme.accent.warm}88`,
            }}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.31) % 5,
              ease: 'easeInOut',
            }}
          />
        )
      )}

      <div
        className="relative z-10 text-center max-w-2xl mx-auto rounded-3xl px-8 md:px-14 py-12 md:py-16"
        style={{
          background: reduced
            ? `linear-gradient(135deg,
              rgba(255, 200, 144, 0.16) 0%,
              rgba(232, 148, 90, 0.20) 50%,
              rgba(184, 94, 92, 0.16) 100%)`
            : `linear-gradient(135deg,
              rgba(255, 200, 144, 0.10) 0%,
              rgba(232, 148, 90, 0.13) 50%,
              rgba(184, 94, 92, 0.10) 100%)`,
          ...(reduced
            ? {}
            : {
                backdropFilter: 'blur(28px) saturate(150%)',
                WebkitBackdropFilter: 'blur(28px) saturate(150%)',
              }),
          border: `1px solid rgba(255, 200, 144, 0.22)`,
          boxShadow: reduced
            ? `0 12px 32px rgba(0, 0, 0, 0.4)`
            : `
            0 24px 60px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 222, 198, 0.18),
            inset 0 -1px 0 rgba(58, 31, 38, 0.25)
          `,
        }}
      >
        {POEM.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: i * 0.25, ease: 'easeOut' }}
            className={`text-2xl sm:text-3xl md:text-4xl ${
              i === POEM.length - 1 ? 'mb-10' : 'mb-3'
            }`}
            style={{
              color: theme.bg.primary,
              fontFamily: fontSerif,
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.4,
            }}
          >
            {line}
          </motion.p>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base italic mb-8"
          style={{ color: theme.bg.primary, fontFamily: fontBody }}
        >
          {CUE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <WaitlistForm id="final" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 text-xs"
          style={{
            color: theme.bg.primary,
            fontFamily: fontBody,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          meethril · may 2026
        </motion.p>
      </div>
    </section>
  )
}
