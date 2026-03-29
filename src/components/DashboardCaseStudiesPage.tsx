import { ScrollReveal } from './ScrollReveal'

const studies = [
  {
    id: 'operational-intelligence',
    title: 'Real-Time Operational Intelligence',
    image: '/images/case-studies/FleetDashboard.png',
    service: 'Building from Scratch: Unifying Data Silos',
    challenge:
      'Data is scattered across APIs, databases, and spreadsheets, creating reporting delays and fragmented decisions.',
    solution:
      'We architect and ship a live SaaS command center with real-time map visualization, dynamic KPI rollups, and contextual alert feeds.',
    value:
      'You get instant operational awareness with one trusted source of truth, tuned to your exact business logic and workflows.',
  },
  {
    id: 'ux-redesign',
    title: 'UX/UI & Performance Redesign',
    image: '/images/case-studies/UglyVsProSaasDashboard.png',
    service: 'System Redesign & Mobile Optimization',
    challenge:
      'Existing dashboards are slow, hard to navigate, and break on mobile, so teams avoid the data or interpret it inconsistently.',
    solution:
      'We redesign the SaaS dashboard experience end-to-end using UX-first patterns, clear color hierarchy, intuitive charting, and responsive layouts.',
    value:
      'Data adoption increases because the interface is fast, readable, and consistently actionable across desktop and mobile devices.',
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Feature Integration',
    image: '/images/case-studies/AllIntervention.png',
    service: 'Integrating Advanced Analytics (AI/ML Blending)',
    challenge:
      'Traditional dashboards only show historical metrics and miss proactive insights from complex analytics models.',
    solution:
      'We blend advanced scoring signals such as AI anomaly detection directly into the SaaS interface so high-risk patterns stand out immediately.',
    value:
      'Teams focus on the most critical events first, turning passive reporting into proactive, high-impact action.',
  },
]

export function DashboardCaseStudiesPage() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            SaaS Dashboard Case Studies
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Custom expertise in action across modern SaaS dashboard delivery
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-zinc-300">
            Each case below demonstrates how we design and engineer dashboard systems around real
            workflows, not generic tooling templates.
          </p>
        </ScrollReveal>

        <div className="mt-14 space-y-8">
          {studies.map((study, i) => (
            <ScrollReveal key={study.id} delay={i * 0.06}>
              <article
                id={study.id}
                className="glass-panel scroll-mt-28 overflow-hidden rounded-2xl p-6 sm:p-8"
              >
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-auto w-full rounded-xl border border-white/10 object-contain"
                  loading="lazy"
                />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/90">
                  Service: {study.service}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-white">
                  {study.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  <span className="text-white">The Challenge Addressed:</span> {study.challenge}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  <span className="text-white">Our Solution:</span> {study.solution}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  <span className="text-white">The Value Delivered:</span> {study.value}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href="/#contact" className="btn-glass-primary rounded-full px-7 py-3 text-sm font-semibold">
              Schedule Your Custom Data Strategy Session
            </a>
            <a href="/" className="btn-glass-secondary rounded-full px-7 py-3 text-sm font-semibold">
              Back to Home
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
