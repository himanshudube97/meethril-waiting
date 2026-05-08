'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme, fontSerif, fontBody } from '@/lib/theme'
import WaitlistForm from './WaitlistForm'

const title = 'MEETHRIL'
const tagline = 'a quieter place to think'

const whispers = [
  "The trees don't rush to grow. Neither should you.",
  "The river doesn't fight its path. It finds it.",
  "You're here now. That's what matters.",
  'Some things take root slowly.',
  'The page is patient.',
  'The stars have time. So do you.',
  'This moment is yours alone.',
  "There's wisdom in the quiet.",
  'The light returns. It always does.',
  'Be gentle with yourself today.',
  'Warmth finds those who wait.',
  'The sun sets, but it will rise again.',
  'You are made of stardust and wonder.',
]

export default function Hero() {
  const [currentWhisper, setCurrentWhisper] = useState('')
  const [whisperKey, setWhisperKey] = useState(0)

  useEffect(() => {
    const changeWhisper = () => {
      setCurrentWhisper(whispers[Math.floor(Math.random() * whispers.length)])
      setWhisperKey((prev) => prev + 1)
    }
    changeWhisper()
    const interval = setInterval(changeWhisper, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12 md:py-16"
      style={{ background: theme.bg.gradient }}
    >
      {/* Soft Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.accent.primary}25 0%, transparent 70%)`,
            filter: 'blur(60px)',
            top: '-10%',
            right: '-5%',
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.accent.secondary}20 0%, transparent 70%)`,
            filter: 'blur(50px)',
            bottom: '5%',
            left: '-5%',
          }}
          animate={{ x: [0, -20, 0], y: [0, -30, 0], scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.accent.warm}15 0%, transparent 70%)`,
            filter: 'blur(40px)',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: theme.text.muted,
              left: `${5 + (i * 4.7) % 90}%`,
              top: `${10 + (i * 7.3) % 80}%`,
            }}
            animate={{
              y: [-20, -60 - (i % 3) * 20],
              x: [i % 2 === 0 ? -10 : 10, i % 2 === 0 ? 10 : -10],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.15em] sm:tracking-[0.18em] mb-6 whitespace-nowrap"
          style={{ color: theme.text.primary, fontFamily: fontSerif, fontWeight: 500 }}
        >
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ textShadow: `0 0 40px ${theme.accent.primary}40` }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light tracking-wide mb-12"
          style={{ color: theme.text.secondary, fontFamily: fontBody }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <TypewriterText text={tagline} delay={1} accent={theme.accent.primary} />
        </motion.p>

        <div className="h-16 mb-8 md:mb-10 flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={whisperKey}
              className="text-sm md:text-base italic max-w-md"
              style={{ color: theme.text.secondary, fontFamily: fontBody }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.95, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              &ldquo;{currentWhisper}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="px-4"
        >
          <p
            className="text-xs md:text-sm mb-4"
            style={{
              color: theme.text.muted,
              fontFamily: fontBody,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            coming soon · may 2026
          </p>

          <WaitlistForm id="hero" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl"
        style={{ color: theme.text.muted }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 3, duration: 1 },
          y: { delay: 3, duration: 2, repeat: Infinity },
        }}
      >
        ↓
      </motion.div>
    </section>
  )
}

function TypewriterText({
  text,
  delay = 0,
  accent,
}: {
  text: string
  delay?: number
  accent: string
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 1500)
        }
      }, 60)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: accent }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}
