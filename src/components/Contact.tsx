import { useState, type FormEvent } from 'react'
import { ScrollReveal } from './ScrollReveal'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again or email us directly.')
        return
      }
      setSent(true)
      form.reset()
    } catch {
      setError('Could not reach the server. If you are running locally, use npm run dev (starts the contact API).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/90">
              Contact
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Let&apos;s build your next system
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Tell us about your stack, timelines, and constraints. We respond with a concrete
              next step — not a generic pitch deck.
            </p>
            <ul className="mt-10 space-y-4 text-sm text-zinc-400">
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                Discovery call for MeetingBuddyAI or custom AI programs
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                Architecture review for SaaS and internal platforms
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                On-prem and hybrid deployment planning
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass-contact rounded-3xl p-8 sm:p-10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    disabled={loading || sent}
                    className="input-neon mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-600 disabled:opacity-50"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    disabled={loading || sent}
                    className="input-neon mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-600 disabled:opacity-50"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={loading || sent}
                    className="input-neon mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-600 disabled:opacity-50"
                    placeholder="Goals, timeline, compliance needs…"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-6 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              {sent ? (
                <div className="mt-8 space-y-4">
                  <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    Thanks — your message was sent. Check your inbox for a confirmation from us; our
                    team will review and reply soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="w-full rounded-full border border-white/15 py-3 text-sm font-medium text-zinc-300 transition hover:border-cyan-500/40 hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glass-primary mt-8 w-full rounded-full py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Sending…' : 'Start Your Project'}
                </button>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
