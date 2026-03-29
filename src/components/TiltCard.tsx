import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

type TiltCardProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className = '', intensity = 14 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    gsap.killTweensOf(el)
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rx = ((y - cy) / cy) * intensity * 0.65
    const ry = ((cx - x) / cx) * intensity * 0.65

    gsap.to(el, {
      rotationX: rx,
      rotationY: ry,
      z: 18,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
      transformPerspective: 1100,
    })
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      z: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.55)',
      overwrite: 'auto',
      transformPerspective: 1100,
    })
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`transform-gpu transform-3d will-change-transform ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
