'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme, fontBody } from '@/lib/theme'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.p
            key={`thanks-${id ?? 'default'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-base md:text-lg italic text-center"
            style={{ color: theme.text.secondary, fontFamily: fontBody }}
          >
            you&rsquo;re on the list ♥ — see you in may
          </motion.p>
        ) : (
          <motion.form
            key={`form-${id ?? 'default'}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 w-full"
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
              className="flex-1 h-12 sm:h-13 px-5 rounded-full border outline-none transition-all"
              style={{
                backgroundColor: 'rgba(255, 222, 198, 0.6)',
                borderColor:
                  status === 'error' ? theme.accent.primary : 'rgba(200, 71, 45, 0.2)',
                color: theme.text.primary,
                fontFamily: fontBody,
                fontSize: '16px',
                backdropFilter: 'blur(8px)',
              }}
            />

            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ scale: status === 'submitting' ? 1 : 1.04 }}
              whileTap={{ scale: status === 'submitting' ? 1 : 0.96 }}
              className="relative h-12 sm:h-13 px-8 rounded-full text-base font-medium overflow-hidden disabled:opacity-60 whitespace-nowrap"
              style={{
                background: theme.accent.primary,
                color: theme.bg.primary,
                boxShadow: `0 0 32px ${theme.accent.primary}30`,
                fontFamily: fontBody,
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
          className="mt-3 text-sm italic text-center"
          style={{ color: theme.accent.primary, fontFamily: fontBody }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  )
}
