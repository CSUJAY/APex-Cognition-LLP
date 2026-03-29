export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left sm:px-6">
        <div>
          <p className="font-display text-lg font-bold text-white">
            Apex Cognition LLP
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Secure AI systems · Intelligent automation · MeetingBuddyAI
          </p>
        </div>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Apex Cognition LLP. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
