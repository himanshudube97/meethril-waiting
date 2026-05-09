'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme, fontBody } from '@/lib/theme'
import { shareCodeFor } from '@/lib/share-code'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const SUBSCRIBED_KEY = 'meethril_subscribed'
const SUBSCRIBED_EMAIL_KEY = 'meethril_subscribed_email'

export default function WaitlistForm({
  id,
  showInviteNote = false,
}: {
  id?: string
  showInviteNote?: boolean
}) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [shareCode, setShareCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [arrivedViaRef, setArrivedViaRef] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(SUBSCRIBED_KEY) === '1') {
        setStatus('success')
        const savedEmail = localStorage.getItem(SUBSCRIBED_EMAIL_KEY)
        if (savedEmail) setEmail(savedEmail)
      }
    } catch {
      // localStorage blocked — ignore, form stays interactive.
    }
    // Detect arrival via a share link so we can show a soft "a friend sent you here" note.
    try {
      if (new URLSearchParams(window.location.search).get('ref')) {
        setArrivedViaRef(true)
      }
    } catch {
      // ignore
    }
  }, [])

  // Once we have a successful signup with an email, derive the share code.
  useEffect(() => {
    if (status !== 'success' || !email) return
    let cancelled = false
    shareCodeFor(email)
      .then((code) => {
        if (!cancelled) setShareCode(code)
      })
      .catch(() => {
        // SubtleCrypto unavailable — share section just shows generic link.
      })
    return () => {
      cancelled = true
    }
  }, [status, email])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')
    // Pull ?ref= from the page URL (if someone arrived via a share link).
    let ref: string | null = null
    try {
      ref = new URLSearchParams(window.location.search).get('ref')
    } catch {
      // ignore — SSR or weird env
    }
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, ref }),
      })
      if (res.ok) {
        try {
          localStorage.setItem(SUBSCRIBED_KEY, '1')
          localStorage.setItem(SUBSCRIBED_EMAIL_KEY, email)
        } catch {
          // localStorage blocked — fine, just won't persist across refresh.
        }
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

  const shareUrl =
    typeof window !== 'undefined' && shareCode
      ? `${window.location.origin}/?ref=${shareCode}`
      : ''

  async function handleCopy() {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const shareTextX = encodeURIComponent(
    'found a quieter place to journal — coming may. early notes go out from here:'
  )
  const shareTextWa = encodeURIComponent(
    `i found this — a quieter place to write. it opens in may, but you can get on the list early:\n${shareUrl}`
  )

  return (
    <div className="w-full max-w-xl mx-auto">
      {showInviteNote && arrivedViaRef && status !== 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base italic text-center mb-5"
          style={{ color: theme.text.secondary, fontFamily: fontBody }}
        >
          a friend sent you here ♥
        </motion.p>
      )}

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key={`thanks-${id ?? 'default'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p
              className="text-base md:text-lg italic"
              style={{ color: theme.text.secondary, fontFamily: fontBody }}
            >
              you&rsquo;re on the list ♥ — see you in may
            </p>

            {shareCode && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 pt-6"
                style={{ borderTop: `1px solid ${theme.accent.primary}22` }}
              >
                <p
                  className="text-sm italic mb-4"
                  style={{ color: theme.text.muted, fontFamily: fontBody }}
                >
                  if someone in your life would love this, here&rsquo;s a quiet way to share:
                </p>

                <div
                  className="flex items-center gap-2 mx-auto max-w-md mb-4 px-4 py-2.5 rounded-full"
                  style={{
                    background: 'rgba(255, 245, 225, 0.6)',
                    border: `1px solid ${theme.accent.primary}33`,
                  }}
                >
                  <span
                    className="flex-1 text-sm truncate text-left"
                    style={{ color: theme.text.secondary, fontFamily: fontBody }}
                  >
                    {shareUrl}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-xs font-medium px-3 py-1 rounded-full transition-opacity hover:opacity-80 whitespace-nowrap"
                    style={{
                      background: theme.accent.primary,
                      color: theme.bg.primary,
                      fontFamily: fontBody,
                    }}
                  >
                    {copied ? 'copied ✓' : 'copy'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareTextX}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-full transition-opacity hover:opacity-80"
                    style={{
                      background: 'rgba(255, 245, 225, 0.6)',
                      color: theme.text.secondary,
                      border: `1px solid ${theme.accent.primary}33`,
                      fontFamily: fontBody,
                    }}
                  >
                    share on x
                  </a>
                  <a
                    href={`https://wa.me/?text=${shareTextWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-full transition-opacity hover:opacity-80"
                    style={{
                      background: 'rgba(255, 245, 225, 0.6)',
                      color: theme.text.secondary,
                      border: `1px solid ${theme.accent.primary}33`,
                      fontFamily: fontBody,
                    }}
                  >
                    whatsapp
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent('a quieter place to write')}&body=${shareTextWa}`}
                    className="text-xs px-4 py-2 rounded-full transition-opacity hover:opacity-80"
                    style={{
                      background: 'rgba(255, 245, 225, 0.6)',
                      color: theme.text.secondary,
                      border: `1px solid ${theme.accent.primary}33`,
                      fontFamily: fontBody,
                    }}
                  >
                    email
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
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
              className="w-full sm:flex-1 h-12 sm:h-[52px] px-5 rounded-full border outline-none transition-all"
              style={{
                backgroundColor: 'rgba(255, 245, 225, 0.78)',
                borderColor:
                  status === 'error' ? theme.accent.primary : 'rgba(200, 71, 45, 0.4)',
                color: theme.text.primary,
                fontFamily: fontBody,
                fontSize: '16px',
                backdropFilter: 'blur(10px)',
                boxShadow: `inset 0 1px 2px rgba(58, 31, 38, 0.08)`,
              }}
            />

            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ scale: status === 'submitting' ? 1 : 1.04 }}
              whileTap={{ scale: status === 'submitting' ? 1 : 0.96 }}
              className="relative w-full sm:w-auto h-12 sm:h-[52px] px-6 sm:px-8 rounded-full text-base font-medium overflow-hidden disabled:opacity-60 whitespace-nowrap"
              style={{
                background: theme.accent.primary,
                color: theme.bg.primary,
                boxShadow: `0 6px 18px ${theme.accent.primary}55`,
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
