import { Suspense, lazy } from 'react'
import { TiltCard } from './TiltCard'
import { ScrollReveal } from './ScrollReveal'
import { useIsMobile } from '../hooks/useIsMobile'

const MeetingBuddyScene = lazy(() =>
  import('./MeetingBuddyScene').then((m) => ({ default: m.MeetingBuddyScene })),
)

const features = [
  {
    title: 'Local Deployment (USP)',
    body: 'Runs inside your infrastructure. No external data exposure.',
    badge: 'USP',
    icon: '🛡',
  },
  {
    title: 'AI Structured Summaries',
    body: 'Automatically generates key decisions and action items using 5W1H format.',
    badge: 'AI',
    icon: '◇',
  },
  {
    title: 'Voice → Workflows',
    body: 'Convert meeting discussions into tasks, Kanban boards, and CRM updates.',
    badge: 'Flow',
    icon: '⎘',
  },
  {
    title: 'Contextual Memory',
    body: 'Ask questions from past meetings instantly.',
    badge: 'Memory',
    icon: '◎',
  },
  {
    title: 'Seamless Integration',
    body: 'Works with Jira and existing enterprise systems.',
    badge: 'Link',
    icon: '⎈',
  },
]

export function MeetingBuddy() {
  const isMobile = useIsMobile()

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="meetingbuddy"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/10 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.18),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(100%,720px)] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
              Flagship product
            </span>
            <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              MeetingBuddyAI — Secure AI Meeting Automation for Enterprises
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cyan-200/90">
              Automate meetings. Protect your data. Work smarter.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-zinc-300">
              <span className="font-medium text-white">
                Secure, locally-deployed AI meeting automation platform for enterprises.
              </span>{' '}
              MeetingBuddyAI keeps conversations productive without sending sensitive audio or
              transcripts to third-party clouds.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
              Built for companies that cannot use cloud AI due to data privacy concerns.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <ScrollReveal>
              <div className="glass-panel relative overflow-hidden rounded-3xl p-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-fuchsia-600/25 blur-3xl" />

                <h3 className="relative font-display text-xl font-bold text-white">
                  The problem we solve
                </h3>
                <ul className="relative mt-8 space-y-6">
                  <li className="flex gap-4">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-sm font-bold text-red-300">
                      !
                    </span>
                    <div>
                      <p className="font-medium text-white">Time lost in meetings</p>
                      <p className="mt-1 text-sm text-zinc-400">
                        Teams lose up to 2 hours daily in meetings — without durable outcomes.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-sm font-bold text-amber-200">
                      ⚠
                    </span>
                    <div>
                      <p className="font-medium text-white">Cloud exposure risk</p>
                      <p className="mt-1 text-sm text-zinc-400">
                        Many cloud meeting tools expose sensitive data to external servers — a
                        non-starter for privacy-first teams.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="relative mt-10 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollTo('#contact')}
                    className="btn-glass-primary rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Request a Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo('#projects')}
                    className="btn-glass-secondary rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    See How It Works
                  </button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass-panel relative h-[min(380px,48vh)] overflow-hidden rounded-3xl border-cyan-500/20 lg:h-[min(420px,52vh)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_65%)]" />
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                      Loading visualization…
                    </div>
                  }
                >
                  <MeetingBuddyScene reduced={isMobile} />
                </Suspense>
                <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-center text-[11px] text-zinc-500">
                  Abstract visualization — local boundary vs. cloud exposure
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-linear-to-b from-cyan-400/50 via-fuchsia-500/40 to-transparent md:left-6"
            />
            <div className="space-y-5">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 0.05}>
                  <TiltCard className="h-full" intensity={11}>
                    <article className="glass-panel group relative ml-0 rounded-2xl border-cyan-500/10 p-6 pl-14 transition hover:border-cyan-400/30 md:pl-16">
                      <span className="absolute left-3 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/35 bg-linear-to-br from-cyan-500/20 to-fuchsia-600/10 text-sm shadow-[0_0_20px_rgba(34,211,238,0.15)] md:left-5">
                        <span aria-hidden className="text-base leading-none">
                          {f.icon}
                        </span>
                      </span>
                      <h4 className="font-display text-lg font-semibold text-white">
                        {f.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.body}</p>
                      <span className="mt-4 inline-block text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                        Step {String(i + 1).padStart(2, '0')}
                      </span>
                    </article>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
