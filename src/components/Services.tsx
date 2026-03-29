import { TiltCard } from './TiltCard'
import { ScrollReveal } from './ScrollReveal'

const items = [
  {
    title: 'AI Solutions & Automation',
    body: 'Custom models, agents, and pipelines tuned to your workflows — with deployment options that respect your security posture.',
    icon: '◆',
  },
  {
    title: 'Web Development (SaaS & Full-stack)',
    body: 'High-performance dashboards, customer portals, and internal tools with resilient architecture and measurable UX.',
    icon: '◇',
  },
  {
    title: 'Mobile App Development (Android)',
    body: 'Native-feeling Android experiences with offline-first patterns where your roadmap demands reliability.',
    icon: '○',
  },
  {
    title: 'Cybersecurity & Data Privacy',
    body: 'Threat-aware design reviews, least-privilege integrations, and guidance for regulated environments.',
    icon: '◎',
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            Services
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            What we ship
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-400">
            End-to-end delivery with a bias for clarity, security, and long-term maintainability.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {items.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.06}>
              <TiltCard className="h-full" intensity={16}>
                <article className="glass-panel group relative h-full overflow-hidden rounded-2xl p-8 transition duration-300 hover:border-cyan-400/35">
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/25 via-transparent to-fuchsia-600/20" />
                    <div className="absolute inset-px rounded-2xl bg-apex-void/40" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(34,211,238,0.12),transparent_55%)] opacity-60" />
                  <div className="relative">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-linear-to-br from-cyan-500/15 to-violet-600/15 text-lg text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                      {s.icon}
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.body}</p>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <a
              href="/services"
              className="btn-glass-secondary rounded-full px-7 py-3 text-sm font-semibold"
            >
              View Full Web Design Services Page
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
