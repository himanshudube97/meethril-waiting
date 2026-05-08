'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const title = 'MEETHRIL'
const tagline = 'a quieter place to think'

const theme = {
  bg: {
    primary: '#FFD2A8',
    gradient:
      'linear-gradient(180deg, #FFE2BC 0%, #FFB888 35%, #F08A6B 65%, #B85E5C 100%)',
  },
  text: {
    primary: '#3A1F26',
    secondary: '#6E4248',
    muted: '#9A7078',
  },
  accent: {
    primary: '#C8472D',
    secondary: '#A53A20',
    warm: '#E8945A',
    highlight: '#FFC890',
  },
}

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

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Page() {
  const [currentWhisper, setCurrentWhisper] = useState('')
  const [whisperKey, setWhisperKey] = useState(0)

  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const changeWhisper = () => {
      setCurrentWhisper(whispers[Math.floor(Math.random() * whispers.length)])
      setWhisperKey((prev) => prev + 1)
    }
    changeWhisper()
    const interval = setInterval(changeWhisper, 6000)
    return () => clearInterval(interval)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      if (res.ok) {
        setStatus('success')
        return
      }
      const data = await res.json().catch(() => ({}))
      if (data?.error === 'invalid_email') setErrorMsg("that doesn't look like an email")
      else if (data?.error === 'rate_limited') setErrorMsg('slow down a moment')
      else setErrorMsg('something broke — try again?')
      setStatus('error')
    } catch {
      setErrorMsg('something broke — try again?')
      setStatus('error')
    }
  }

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
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

        {/* Floating particles */}
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
      <div className="relative z-10 text-center w-full max-w-xl">
        {/* Letter-by-letter Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl tracking-[0.3em] mb-6"
          style={{
            color: theme.text.primary,
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 500,
          }}
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

        {/* Typewriter Tagline */}
        <motion.p
          className="text-lg md:text-xl font-light tracking-wide mb-12"
          style={{
            color: theme.text.secondary,
            fontFamily: 'var(--font-crimson), Georgia, serif',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <TypewriterText text={tagline} delay={1} accent={theme.accent.primary} />
        </motion.p>

        {/* Floating Whisper */}
        <div className="h-16 mb-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={whisperKey}
              className="text-sm md:text-base italic max-w-md"
              style={{
                color: theme.text.muted,
                fontFamily: 'var(--font-crimson), Georgia, serif',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              &ldquo;{currentWhisper}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Coming Soon + Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <p
            className="text-xs md:text-sm mb-4"
            style={{
              color: theme.text.muted,
              fontFamily: 'var(--font-crimson), Georgia, serif',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            coming soon · may 2026
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="thanks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-base md:text-lg italic"
                style={{
                  color: theme.text.secondary,
                  fontFamily: 'var(--font-crimson), Georgia, serif',
                }}
              >
                you&rsquo;re on the list ♥ — see you in may
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    pointerEvents: 'none',
                    height: 0,
                    width: 0,
                  }}
                />

                <input
                  type="email"
                  required
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  className="flex-1 h-12 px-5 rounded-full border outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(255, 222, 198, 0.6)',
                    borderColor:
                      status === 'error' ? theme.accent.primary : 'rgba(200, 71, 45, 0.2)',
                    color: theme.text.primary,
                    fontFamily: 'var(--font-crimson), Georgia, serif',
                    fontSize: '16px',
                    backdropFilter: 'blur(8px)',
                  }}
                />

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.04 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.96 }}
                  className="relative h-12 px-8 rounded-full text-base font-medium overflow-hidden disabled:opacity-60"
                  style={{
                    background: theme.accent.primary,
                    color: theme.bg.primary,
                    boxShadow: `0 0 32px ${theme.accent.primary}30`,
                    fontFamily: 'var(--font-crimson), Georgia, serif',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: theme.accent.warm }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10">
                    {status === 'submitting' ? 'joining...' : 'Join waitlist'}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === 'error' && errorMsg && (
            <p
              role="alert"
              className="mt-3 text-sm italic"
              style={{
                color: theme.accent.primary,
                fontFamily: 'var(--font-crimson), Georgia, serif',
              }}
            >
              {errorMsg}
            </p>
          )}
        </motion.div>
      </div>
    </main>
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
