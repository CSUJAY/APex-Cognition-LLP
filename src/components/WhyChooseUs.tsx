import { Suspense, lazy } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { useIsMobile } from '../hooks/useIsMobile'

const WhyBullet3D = lazy(() =>
  import('./WhyBullet3D').then((m) => ({ default: m.WhyBullet3D })),
)

const points = [
  'Secure Local AI Deployment',
  'High-performance systems',
  'Business-first approach',
  'Scalable architecture',
]

function BulletVisual({ index }: { index: number }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <span className="h-14 w-14 shrink-0 rounded-xl border border-cyan-500/25 bg-linear-to-br from-cyan-500/25 to-fuchsia-600/15 shadow-[0_0_20px_rgba(34,211,238,0.1)]" />
    )
  }

  return (
    <Suspense
      fallback={
        <span className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-white/5" />
      }
    >
      <WhyBullet3D index={index} />
    </Suspense>
  )
}

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-24 border-t border-white/5 bg-linear-to-b from-apex-deep/80 to-apex-void py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
              Why choose us
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Engineering with your risk profile in mind
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              We align product velocity with governance — so your teams move fast without
              outrunning security, compliance, or reliability requirements.
            </p>
          </ScrollReveal>

          <ul className="space-y-4">
            {points.map((text, i) => (
              <ScrollReveal key={text} delay={i * 0.07}>
                <li className="glass-panel flex items-center gap-4 rounded-xl px-4 py-3 sm:px-5 sm:py-4">
                  <BulletVisual index={i} />
                  <span className="font-medium leading-snug text-white">{text}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
