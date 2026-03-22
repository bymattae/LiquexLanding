import { cn } from '@/lib/utils'

export function TopBar({ label }: { label?: string }) {
  const clock = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/5 bg-black/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <img src="/Liquexdark.png" alt="Liquex" className="h-7 w-auto" />
          {label ? (
            <div className={cn('rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/44')}>
              {label}
            </div>
          ) : null}
        </div>
        <div className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-sm text-white/58">{clock}</div>
      </div>
    </header>
  )
}
