const WINDOW_MS = 60_000
const MAX_HITS = 5

const hits = new Map<string, number[]>()

export function rateLimitOk(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_HITS) {
    hits.set(ip, timestamps)
    return false
  }

  timestamps.push(now)
  hits.set(ip, timestamps)

  if (hits.size > 10_000) {
    for (const [k, v] of hits.entries()) {
      const fresh = v.filter((t) => now - t < WINDOW_MS)
      if (fresh.length === 0) hits.delete(k)
    }
  }

  return true
}
