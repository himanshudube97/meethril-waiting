import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/validate'
import { rateLimitOk } from '@/lib/ratelimit'
import { getResend } from '@/lib/resend'
import { buildWelcomeHtml, buildWelcomeText, WELCOME_SUBJECT } from '@/lib/welcome-email'
import { signUnsubscribeToken } from '@/lib/unsubscribe-token'

export const runtime = 'nodejs'

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

function getSiteOrigin(req: NextRequest): string {
  const fromEnv = process.env.SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  // Fall back to the request origin (good enough for previews / local dev).
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  return host ? `${proto}://${host}` : ''
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown; website?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot — silently accept and discard.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const ip = getClientIp(req)
  if (!rateLimitOk(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const segmentId = process.env.RESEND_SEGMENT_ID
  if (!segmentId) {
    console.error('[waitlist] RESEND_SEGMENT_ID not set')
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }

  const email = body.email
  const resend = getResend()

  let alreadyOnList = false
  try {
    await resend.contacts.create({
      email,
      segments: [{ id: segmentId }],
      unsubscribed: false,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message.toLowerCase() : ''
    if (msg.includes('already') || msg.includes('exists') || msg.includes('duplicate')) {
      alreadyOnList = true
    } else {
      console.error('[waitlist] resend contacts error', err)
      return NextResponse.json({ error: 'server' }, { status: 500 })
    }
  }

  // Send welcome email only on first signup. Don't fail the request if this errors —
  // the contact is already on the list and that's the important state.
  if (!alreadyOnList) {
    const from = process.env.RESEND_FROM_EMAIL
    if (!from) {
      console.error('[waitlist] RESEND_FROM_EMAIL not set — skipping welcome email')
    } else {
      try {
        const origin = getSiteOrigin(req)
        const token = signUnsubscribeToken(email)
        const unsubscribeUrl = `${origin}/api/unsubscribe?t=${token}`
        const mailtoUnsub = `mailto:hello@meethril.com?subject=unsubscribe`
        await resend.emails.send({
          from,
          to: email,
          subject: WELCOME_SUBJECT,
          html: buildWelcomeHtml(unsubscribeUrl),
          text: buildWelcomeText(unsubscribeUrl),
          headers: {
            'List-Unsubscribe': `<${mailtoUnsub}>, <${unsubscribeUrl}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        })
      } catch (err) {
        console.error('[waitlist] welcome email error', err)
      }
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
