import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/validate'
import { rateLimitOk } from '@/lib/ratelimit'
import { getResend } from '@/lib/resend'

export const runtime = 'nodejs'

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
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

  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    console.error('[waitlist] RESEND_AUDIENCE_ID not set')
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }

  try {
    await getResend().contacts.create({
      email: body.email,
      audienceId,
      unsubscribed: false,
    })
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message.toLowerCase() : ''
    if (msg.includes('already') || msg.includes('exists') || msg.includes('duplicate')) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
    console.error('[waitlist] resend error', err)
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
