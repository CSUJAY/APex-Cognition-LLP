import { Suspense, lazy, useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const WriggleScene = lazy(() =>
  import('./WriggleScene').then((m) => ({ default: m.WriggleScene })),
)

export function Hero() {
  const isMobile = useIsMobile()
  const [sceneKey, setSceneKey] = useState(0)

  // Dev-only: force remount after HMR to avoid stale 3D modules
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hot = (import.meta as any).hot as { on: (e: string, cb: () => void) => void } | undefined
    hot?.on('vite:afterUpdate', () => setSceneKey((k: number) => k + 1))
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden pt-28 md:pt-32"
    >
      {/* Full-bleed 3D */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 z-0 md:pointer-events-auto">
          <Suspense
            fallback={
              <div className="flex h-full min-h-[520px] items-center justify-center bg-apex-void text-sm text-zinc-600">
                Initializing scene…
              </div>
            }
          >
            <WriggleScene key={sceneKey} className="min-h-[min(100dvh,920px)]" />
          </Suspense>
        </div>
      )}

      {/* Readability gradients + parallax feel */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-r from-apex-void via-apex-void/93 to-apex-void/40 md:via-apex-void/85" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-t from-apex-void via-transparent to-apex-void/30" />
      <div className="pointer-events-none absolute inset-0 apex-grid z-[1] opacity-50" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 sm:px-6 lg:min-h-[min(88vh,820px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-28">
        <div className="order-2 lg:order-1">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/90 backdrop-blur-md">
            Enterprise AI · On‑prem ready
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_0_40px_rgba(0,0,0,0.65)] sm:text-5xl lg:text-[3.25rem]">
            Secure AI Systems &amp;{' '}
            <span className="text-gradient">Intelligent Workflow Automation</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
            We build AI-powered tools, modern web applications, and secure local systems
            for businesses.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollTo('#projects')}
              className="btn-glass-primary rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              View Our Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="btn-glass-secondary rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              Book a Demo
            </button>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider text-zinc-500">Focus</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-white">
                Privacy-first AI
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-zinc-500">Delivery</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-white">
                SaaS &amp; on‑prem
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs uppercase tracking-wider text-zinc-500">Flagship</dt>
              <dd className="mt-1 font-display text-lg font-semibold text-cyan-300">
                MeetingBuddyAI
              </dd>
            </div>
          </dl>
        </div>

        {/* Right column: breathing room so the 3D core reads in open space */}
        <div className="order-1 hidden min-h-[200px] lg:order-2 lg:block" aria-hidden />

        {isMobile && (
          <div className="order-1 relative mx-auto h-[min(48vh,380px)] w-full max-w-md lg:hidden">
            <div className="hero-blob absolute inset-0 rounded-full opacity-90" />
            <div className="glass-panel absolute inset-[10%] rounded-3xl border-cyan-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-44 w-44 rounded-full border border-cyan-400/25 bg-linear-to-br from-cyan-500/15 to-violet-600/15 shadow-[0_0_50px_rgba(34,211,238,0.2)]" />
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-zinc-500">
              Full interactive 3D + shaders on desktop
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
