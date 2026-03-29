import { ScrollReveal } from './ScrollReveal'
import { TiltCard } from './TiltCard'
import { CyberAIMini3D, type CyberAIVariant } from './CyberAIMini3D'

const items: { title: string; detail: string; variant: CyberAIVariant }[] = [
  {
    title: 'Cybersecurity Visualization',
    detail: '3D security motifs (shields, locks, secure tunnels) that reinforce trust without feeling like stock icons.',
    variant: 'shield',
  },
  {
    title: 'Secure Data Flows',
    detail: 'Motion-led 3D scenes that communicate protected pipelines, encrypted pathways, and system resilience.',
    variant: 'secure-tunnel',
  },
  {
    title: 'AI Intelligence Core',
    detail: 'Neural-style 3D systems that suggest real-time reasoning, anomaly scoring, and decision support.',
    variant: 'ai-core',
  },
]

export function CyberAIDesign() {
  return (
    <section id="cyber-ai-3d" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/90">
            Cybersecurity + AI 3D
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            3D visuals that communicate trust, security, and intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-zinc-400">
            We design motion and 3D systems that make complex security and AI concepts feel clear,
            modern, and premium — without turning your UI into a gimmick.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <TiltCard className="h-full" intensity={14}>
                <article className="glass-panel h-full overflow-hidden rounded-2xl">
                  <CyberAIMini3D variant={item.variant} className="border-x-0 border-t-0 border-b border-white/10" />
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

