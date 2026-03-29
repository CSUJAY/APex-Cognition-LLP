import { useEffect, useState } from 'react'

const homeLinks = [
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#services', label: 'Services' },
  { href: '#design-3d', label: '3D Design' },
  { href: '#cyber-ai-3d', label: 'Cyber + AI' },
  { href: '#meetingbuddy', label: 'MeetingBuddyAI' },
  { href: '#projects', label: 'Projects' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
]

const servicesPageLinks = [
  { href: '/', label: 'Home' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = window.location.pathname.toLowerCase()
  const isServicesPage = pathname === '/services' || pathname === '/services/'
  const isCaseStudiesPage =
    pathname === '/dashboard-case-studies' || pathname === '/dashboard-case-studies/'
  const isCaseStudyDetailPage =
    pathname.startsWith('/dashboard-case-studies/') && pathname !== '/dashboard-case-studies/'
  const isSubPage = isServicesPage || isCaseStudiesPage || isCaseStudyDetailPage
  const links = isSubPage ? servicesPageLinks : homeLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-apex-void/80 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          className="font-display text-lg font-bold tracking-tight text-white"
          onClick={() => setOpen(false)}
        >
          Apex Cognition
          <span className="ml-1 text-xs font-medium text-cyan-400/90">LLP</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={isSubPage ? '/#contact' : '#contact'}
            className="hidden rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.15)] transition hover:border-cyan-400/60 hover:bg-cyan-500/20 sm:inline-flex"
            onClick={() => setOpen(false)}
          >
            {isSubPage ? 'Talk to Us' : 'Book a Demo'}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-white/10 bg-apex-void/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={isSubPage ? '/#contact' : '#contact'}
              className="mt-2 rounded-full bg-linear-to-r from-cyan-500 to-violet-600 px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {isSubPage ? 'Talk to Us' : 'Book a Demo'}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
