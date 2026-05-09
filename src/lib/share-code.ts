/**
 * Deterministic 6-char share code derived from email.
 * Same email → same code, no DB lookup needed. Used to attribute
 * referrals via `?ref=CODE` without storing a mapping.
 *
 * SHA-256 the lowercased email, take first 4 bytes, base36-encode → uppercase.
 */
export async function shareCodeFor(email: string): Promise<string> {
  const data = new TextEncoder().encode(email.trim().toLowerCase())
  const hash = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(hash, 0, 4)
  // Combine 4 bytes into a 32-bit unsigned int, then base36
  const n = (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]
  return (n >>> 0).toString(36).toUpperCase().padStart(6, '0').slice(0, 6)
}
