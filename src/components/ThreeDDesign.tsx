import { Suspense, lazy } from 'react'
import type { ProjectVariant } from './ProjectMini3D'
import { ScrollReveal } from './ScrollReveal'
import { TiltCard } from './TiltCard'

const ProjectMini3D = lazy(() =>
  import('./ProjectMini3D').then((m) => ({ default: m.ProjectMini3D })),
)

const designTracks: { title: string; detail: string; variant: ProjectVariant }[] = [
  {
    title: '3D Landing Experiences',
    detail: 'Interactive hero sections and product reveals that keep attention and improve conversion.',
    variant: 'webgl',
  },
  {
    title: '3D UI Prototypes',
    detail: 'Fast concept demos for dashboards and portals so stakeholders can review real motion early.',
    variant: 'dashboard',
  },
  {
    title: '3D Product Storytelling',
    detail: 'Narrative-driven 3D modules for SaaS and digital products with smooth performance.',
    variant: 'saas',
  },
]

export function ThreeDDesign() {
  return (
    <section id="design-3d" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            3D Design Studio
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            More immersive 3D design for your brand
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
            We craft interactive 3D experiences for websites and digital products without sacrificing
            speed, usability, or maintainability.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {designTracks.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <TiltCard className="h-full" intensity={14}>
                <article className="glass-panel h-full overflow-hidden rounded-2xl">
                  <Suspense
                    fallback={
                      <div className="h-44 w-full animate-pulse bg-linear-to-br from-white/4 to-transparent" />
                    }
                  >
                    <ProjectMini3D
                      variant={item.variant}
                      className="border-x-0 border-t-0 border-b border-white/10"
                    />
                  </Suspense>
                  <div className="p-7">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
