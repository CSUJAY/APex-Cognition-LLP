import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { TiltCard } from './TiltCard'

type CaseStudy = {
  title: string
  image: string
  service: string
  challenge: string
  solution: string
  value: string
  href: string
}

const caseStudies: CaseStudy[] = [
  {
    title: 'Real-Time Operational Intelligence',
    image: '/images/case-studies/FleetDashboard.png',
    service: 'Building from Scratch: Unifying Data Silos',
    challenge:
      'Data is scattered across APIs, databases, and spreadsheets, slowing insight and forcing manual reporting.',
    solution:
      'Delivered a live command center with real-time map visualization, dynamic KPI rollups, and contextual alert feeds.',
    value:
      'Instant operational awareness with a single source of truth tailored to the user workflow.',
    href: '/dashboard-case-studies/operational-intelligence',
  },
  {
    title: 'UX/UI & Performance Redesign',
    image: '/images/case-studies/UglyVsProSaasDashboard.png',
    service: 'System Redesign & Mobile Optimization',
    challenge:
      'Legacy dashboards are slow, confusing, and unusable on mobile, causing low adoption and misread insights.',
    solution:
      'Rebuilt the experience with UX-first layout, clear color-coded panels, intuitive charts, and mobile responsiveness.',
    value: 'Higher data adoption and clarity across teams and devices.',
    href: '/dashboard-case-studies/ux-redesign',
  },
  {
    title: 'Advanced Feature Integration',
    image: '/images/case-studies/AllIntervention.png',
    service: 'Advanced Feature Integration (AI Anomaly Detection)',
    challenge:
      'Most tools only describe what happened and fail to surface proactive insights from advanced models.',
    solution:
      'Integrated AI anomaly scoring directly in the SaaS dashboard UI so high-risk signals are immediately visible.',
    value:
      'Actionable intelligence that helps teams prioritize critical edge cases for security and efficiency.',
    href: '/dashboard-case-studies/advanced-analytics',
  },
]

function CaseStudyImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="relative h-52 w-full overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-cyan-500/10 via-transparent to-violet-500/10">
        <div className="absolute inset-0 apex-grid opacity-35" />
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center text-sm text-zinc-400">
          Add image to /public/images/case-studies/
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-52 w-full rounded-xl border border-white/10 object-cover"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

export function DashboardCaseStudies() {
  return (
    <section id="expertise" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            Our Expertise in Action
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Three delivery paths, proven through real dashboard outcomes
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-zinc-400">
            These case studies show how we solve business-specific problems with custom design and
            engineering, not generic templates.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <TiltCard className="h-full" intensity={14}>
                <article className="glass-panel h-full rounded-2xl p-6">
                  <CaseStudyImage src={item.image} alt={item.title} />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/90">
                    Service: {item.service}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    <span className="text-zinc-300">Challenge:</span> {item.challenge}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    <span className="text-zinc-300">Solution:</span> {item.solution}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    <span className="text-zinc-300">Value:</span> {item.value}
                  </p>
                  <a
                    href={item.href}
                    className="mt-5 inline-flex text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                  >
                    Explore Details
                  </a>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
