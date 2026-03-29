import { ScrollReveal } from './ScrollReveal'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-white/5 bg-apex-deep/50 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="about-glass relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-fuchsia-600/15 blur-3xl" />
            </div>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/90">
              About
            </p>
            <h2 className="mt-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
              Built for serious teams
            </h2>
            <p className="relative mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-zinc-300">
              Apex Cognition LLP builds secure, locally deployed AI systems, SaaS platforms,
              and modern digital solutions for businesses that value performance, privacy, and
              scalability.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
