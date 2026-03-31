import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number
  /** Delay before unmount after leaving view — frees WebGL contexts. */
  hideDelayMs?: number
}

/**
 * Mount heavy content only while (or shortly after) the element is on screen.
 * Unmounting after scroll-away avoids hitting the browser WebGL context limit.
 */
export function useInViewMount(options: Options = {}) {
  const { rootMargin = '100px', threshold = 0.06, hideDelayMs = 700 } = options
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (hideTimer.current) {
          clearTimeout(hideTimer.current)
          hideTimer.current = null
        }
        if (entry.isIntersecting) {
          setActive(true)
        } else {
          hideTimer.current = setTimeout(() => setActive(false), hideDelayMs)
        }
      },
      { rootMargin, threshold },
    )
    obs.observe(el)
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
      obs.disconnect()
    }
  }, [rootMargin, threshold, hideDelayMs])

  return { ref, active }
}
