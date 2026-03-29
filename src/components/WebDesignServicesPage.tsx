import { Suspense, lazy } from 'react'
import type { ProjectVariant } from './ProjectMini3D'
import { ScrollReveal } from './ScrollReveal'

const ProjectMini3D = lazy(() =>
  import('./ProjectMini3D').then((m) => ({ default: m.ProjectMini3D })),
)

const services: {
  title: string
  subtitle: string
  detail: string
  bullets: string[]
  variant: ProjectVariant
}[] = [
  {
    title: 'Web Development',
    subtitle: 'Full-stack websites and web apps',
    detail:
      'We build modern websites, admin portals, and scalable web applications with performance, security, and SEO in mind.',
    bullets: [
      'Business websites and landing pages',
      'Custom dashboards and SaaS platforms',
      'API integrations and deployment setup',
    ],
    variant: 'webgl',
  },
  {
    title: 'Android App Development',
    subtitle: 'Native-feeling mobile products',
    detail:
      'From MVP to production release, we design and develop Android apps focused on reliable UX, clean architecture, and maintainable code.',
    bullets: [
      'Custom Android app development',
      'Backend and API connectivity',
      'Play Store release assistance',
    ],
    variant: 'dashboard',
  },
  {
    title: 'Web Design',
    subtitle: 'UI/UX and brand-ready visual systems',
    detail:
      'We design user interfaces that are visually strong and conversion-driven, then deliver design systems ready for implementation.',
    bullets: [
      'Responsive UI/UX design',
      'Wireframes and clickable prototypes',
      'Design system and component styling',
    ],
    variant: 'saas',
  },
]

const process = [
  'Discovery and requirement mapping',
  'UI/UX and architecture planning',
  'Development with QA checkpoints',
  'Launch, support, and iterative upgrades',
]

export function WebDesignServicesPage() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            Web Design Services
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Complete digital product services for web and Android
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-zinc-300">
            Apex Cognition delivers end-to-end web development, Android app development, and
            modern web design. Our team combines technical execution with strong UI direction so
            your product ships faster and looks premium.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
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
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">{item.subtitle}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
                  <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                    {item.bullets.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-cyan-400">●</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.12}>
          <div className="glass-panel mt-12 rounded-2xl p-8 sm:p-10">
            <h3 className="font-display text-2xl font-semibold text-white">
              How we deliver
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {process.map((step, i) => (
                <p
                  key={step}
                  className="rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-sm text-zinc-300"
                >
                  <span className="mr-2 font-semibold text-cyan-300">0{i + 1}</span>
                  {step}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/#contact"
                className="btn-glass-primary rounded-full px-7 py-3 text-sm font-semibold"
              >
                Start Your Project
              </a>
              <a
                href="/"
                className="btn-glass-secondary rounded-full px-7 py-3 text-sm font-semibold"
              >
                Back to Home
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
