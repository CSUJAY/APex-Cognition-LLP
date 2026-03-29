import { ScrollReveal } from './ScrollReveal'

type DashboardStudy = {
  title: string
  image: string
  service: string
  challenge: string
  solution: string
  value: string
}

const studies: Record<string, DashboardStudy> = {
  'operational-intelligence': {
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
  'ux-redesign': {
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
  'advanced-analytics': {
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
}

type Props = {
  slug: string
}

export function DashboardCaseStudyDetailPage({ slug }: Props) {
  const study = studies[slug]

  if (!study) {
    return (
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold text-white">
            Case study not found
          </h1>
          <a href="/" className="btn-glass-secondary mt-8 inline-flex rounded-full px-7 py-3 text-sm font-semibold">
            Back to Home
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            SaaS Dashboard Case Study
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-300">
            Custom dashboard architecture aligned to real business workflows, with a focus on
            clarity, speed, and actionable insight.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <article className="glass-panel mt-12 overflow-hidden rounded-2xl p-6 sm:p-8">
            <img
              src={study.image}
              alt={study.title}
              className="h-auto w-full rounded-xl border border-white/10 object-contain"
              loading="lazy"
            />
            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-violet-300/90">
              Service: {study.service}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-zinc-200">
              <span className="font-semibold text-white">The Challenge Addressed:</span>{' '}
              {study.challenge}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-zinc-200">
              <span className="font-semibold text-white">Our Solution:</span> {study.solution}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-zinc-200">
              <span className="font-semibold text-white">The Value Delivered:</span> {study.value}
            </p>
          </article>
        </ScrollReveal>

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
