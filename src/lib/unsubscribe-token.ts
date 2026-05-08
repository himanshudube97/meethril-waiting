import crypto from 'node:crypto'

function getSecret(): string {
  const s = process.env.UNSUBSCRIBE_SECRET
  if (!s) throw new Error('UNSUBSCRIBE_SECRET is not set')
  return s
}

export function signUnsubscribeToken(email: string): string {
  const payload = Buffer.from(email.toLowerCase()).toString('base64url')
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyUnsubscribeToken(token: string): string | null {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payload, sig] = parts
  const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return null
  if (!crypto.timingSafeEqual(a, b)) return null
  try {
    return Buffer.from(payload, 'base64url').toString('utf-8')
  } catch {
    return null
  }
}
