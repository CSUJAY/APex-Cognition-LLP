import { Suspense, lazy } from 'react'
import { TiltCard } from './TiltCard'
import { ScrollReveal } from './ScrollReveal'
import type { ProjectVariant } from './ProjectMini3D'

const ProjectMini3D = lazy(() =>
  import('./ProjectMini3D').then((m) => ({ default: m.ProjectMini3D })),
)

const projects: {
  title: string
  desc: string
  tag: string
  variant: ProjectVariant
}[] = [
  {
    title: '3D Product Website',
    desc: 'Immersive product storytelling with performant WebGL and conversion-focused UX.',
    tag: 'WebGL',
    variant: 'webgl',
  },
  {
    title: 'AI Dashboard',
    desc: 'Operational visibility for models and automations — built for speed and trust.',
    tag: 'Analytics',
    variant: 'dashboard',
  },
  {
    title: 'SaaS Platform',
    desc: 'Multi-tenant foundations, billing-ready architecture, and resilient APIs.',
    tag: 'Platform',
    variant: 'saas',
  },
]

function PreviewFallback() {
  return (
    <div className="h-44 w-full animate-pulse bg-linear-to-br from-white/4 to-transparent" />
  )
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/90">
            Projects
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Recent work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
            A sample of the systems we design and ship — each tuned for clarity and scale.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <TiltCard intensity={14} className="h-full">
                <article className="glass-panel group relative flex h-full flex-col overflow-hidden rounded-2xl transition duration-300 hover:border-cyan-400/35">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-linear-to-br from-cyan-500/25 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
                  <Suspense fallback={<PreviewFallback />}>
                    <ProjectMini3D variant={p.variant} className="border-x-0 border-t-0 border-b border-white/10" />
                  </Suspense>
                  <div className="relative flex flex-1 flex-col p-8 pt-6">
                    <span className="inline-block w-fit rounded-md bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                      {p.tag}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                    <div className="mt-6 h-px w-full bg-linear-to-r from-white/10 to-transparent" />
                    <p className="mt-4 text-xs text-zinc-500">Hover — 3D preview snaps forward</p>
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
