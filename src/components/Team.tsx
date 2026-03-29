import { Suspense, lazy, useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import type { Team3DVariant } from './TeamMember3D'

const TeamMember3D = lazy(() =>
  import('./TeamMember3D').then((m) => ({ default: m.TeamMember3D })),
)

type Member = {
  name: string
  role: string
  bio: string
  imageCandidates: string[]
  variant: Team3DVariant
}

const members: Member[] = [
  {
    name: 'Sujay',
    role: 'Engineering & build',
    bio: 'Owns product build-out—architecture, secure AI systems, full-stack delivery, and technical direction across web and mobile.',
    imageCandidates: ['/images/Team/Sujay.jpg', '/images/team/Sujay.jpg'],
    variant: 'core',
  },
  {
    name: 'Shreyas',
    role: 'Operations & marketing',
    bio: 'Leads operations, go-to-market, and client engagement—keeping delivery aligned with your business and growth.',
    imageCandidates: ['/images/Team/Shreyas.jpg', '/images/team/Shreyas.jpg'],
    variant: 'flow',
  },
]

function MemberPhoto({ candidates, alt }: { candidates: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const src = candidates[index] ?? candidates[0]
  const failed = index >= candidates.length

  if (failed || !src) {
    return (
      <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-center text-[10px] leading-tight text-zinc-500 sm:h-20 sm:w-20">
        Photo:
        <br />
        <span className="text-zinc-600">images/Team/</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-lg border border-white/10 object-cover sm:h-20 sm:w-20"
      loading="lazy"
      onError={() => setIndex((i) => i + 1)}
    />
  )
}

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 border-t border-white/5 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/90">
            Team
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-white sm:text-3xl">
            Who we are
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-400">
            Two founders behind Apex Cognition—building the product and running the business.
          </p>
        </ScrollReveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {members.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 0.06}>
              <li className="glass-panel flex h-full min-h-0 gap-2.5 rounded-xl p-3 sm:gap-3 sm:p-4">
                <div className="flex shrink-0 gap-2">
                  <Suspense
                    fallback={
                      <div className="h-[4.5rem] w-[4.5rem] shrink-0 animate-pulse rounded-lg bg-white/5 sm:h-20 sm:w-20" />
                    }
                  >
                    <TeamMember3D variant={m.variant} compact />
                  </Suspense>
                  <MemberPhoto candidates={m.imageCandidates} alt={m.name} />
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                    {m.name}
                  </h3>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-300/85 sm:text-xs">
                    {m.role}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-zinc-400 sm:text-sm">{m.bio}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
