'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true on small viewports or when the user prefers reduced motion.
 * SSR-safe: starts as false, then flips on mount once the media queries are read.
 * Heavy decorative animations should be conditionally rendered against this so
 * they never start on phones (where blur+infinite-loop motion causes jank).
 */
export function useReducedAnimations() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => setReduced(mqMobile.matches || mqMotion.matches)
    update()

    mqMobile.addEventListener('change', update)
    mqMotion.addEventListener('change', update)
    return () => {
      mqMobile.removeEventListener('change', update)
      mqMotion.removeEventListener('change', update)
    }
  }, [])

  return reduced
}
