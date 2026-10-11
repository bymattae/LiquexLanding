import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * One clean visual per idea. Borderless soft surfaces, generous type,
 * nothing nested — the product, not a diagram of it.
 */

export const surface = 'rounded-[28px] bg-white/[0.035]'

/* ── Content: one post, read ───────────────────────────────────────────── */

export function ContentPreview() {
  return (
    <div className={cn(surface, 'grid items-center gap-8 p-6 sm:grid-cols-[180px_1fr] sm:p-8')}>
      <div className="relative mx-auto aspect-[9/16] w-[150px] overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_30%_20%,rgba(110,231,183,0.18),transparent_60%),linear-gradient(180deg,#151922,#07090c)] sm:w-full">
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur"><Play className="size-4 fill-white text-white" /></span>
      </div>
      <div>
        <div className="text-[15px] text-zinc-500">Pre NFP workout</div>
        <div className="mt-1 text-4xl font-semibold tracking-tight">261K views</div>
        <div className="mt-1 text-[15px] text-emerald-300">53× their usual · 132 joins</div>
        <dl className="mt-8 grid grid-cols-3 gap-4">
          {[['Type', 'Lifestyle'], ['Topic', 'NFP'], ['CTA', 'DM']].map(([k, v]) => (
            <div key={k}><dt className="text-[13px] text-zinc-500">{k}</dt><dd className="mt-1 text-[17px] font-medium">{v}</dd></div>
          ))}
        </dl>
        <p className="mt-8 text-[15px] leading-relaxed text-zinc-400">The physical angle stood out from typical trading content.</p>
      </div>
    </div>
  )
}

/* ── Links: three sources ──────────────────────────────────────────────── */

export function LinksPreview() {
  const rows = [['Instagram · DM', 835], ['Instagram · Bio', 781], ['TikTok · Bio', 65]] as const
  return (
    <div className={cn(surface, 'space-y-8 p-8 sm:p-10')}>
      {rows.map(([name, n], i) => (
        <div key={name}>
          <div className="flex items-baseline justify-between">
            <span className="text-[17px]">{name}</span>
            <span className="text-[17px] tabular-nums text-zinc-400">{n.toLocaleString()} joins</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
            <div className={cn('h-full rounded-full', i === 0 ? 'bg-emerald-300' : 'bg-white/25')} style={{ width: `${Math.max(3, (n / 835) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Verify: the phone ─────────────────────────────────────────────────── */

export function MiniAppPreview() {
  return (
    <div className="mx-auto w-[260px] rounded-[44px] bg-[#0b0d11] p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.08]">
      <div className="rounded-[36px] bg-[#0f1218] px-6 pb-8 pt-12 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-[18px] bg-sky-500 text-xl font-semibold">F</div>
        <div className="mt-5 text-[19px] font-semibold tracking-tight">FXD Sniper</div>
        <div className="mt-1 text-[13px] text-zinc-500">Verify to get access</div>
        <div className="mt-8 space-y-2.5 text-left">
          {['Gold Signals', 'Community', 'Members Area'].map(t => (
            <div key={t} className="rounded-2xl bg-white/[0.05] px-4 py-3 text-[14px]">{t}</div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-sky-500 py-3.5 text-[14px] font-medium">Verify</div>
      </div>
    </div>
  )
}

/* ── AI read: one client ───────────────────────────────────────────────── */

export function AiReadPreview() {
  return (
    <div className={cn(surface, 'p-8 sm:p-10')}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-white/[0.07] text-[13px] font-medium">KK</span>
        <span className="text-[17px] font-medium">Kamil K.</span>
      </div>
      <p className="mt-6 text-[19px] leading-relaxed text-zinc-200 sm:text-[21px]">
        Deposited twice since August and is down <span className="text-rose-300">$1,494</span>. Scalps gold in big sizes. Very engaged lately.
      </p>
      <div className="mt-8 flex items-start gap-3 text-[15px]">
        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-300" />
        <span className="text-zinc-400"><span className="text-white">Next:</span> share something on risk management.</span>
      </div>
    </div>
  )
}

/* ── Automate: three switches ──────────────────────────────────────────── */

export function AutomatePreview() {
  const rows: [string, boolean][] = [['Balance under $100', true], ['No trades in 30 days', true], ['Moved to another IB', true]]
  return (
    <div className={cn(surface, 'divide-y divide-white/[0.05] px-8 sm:px-10')}>
      {rows.map(([t, on]) => (
        <div key={t} className="flex items-center justify-between py-6">
          <span className="text-[17px]">{t}</span>
          <span className={cn('relative h-7 w-12 rounded-full', on ? 'bg-emerald-300' : 'bg-white/10')}>
            <span className={cn('absolute top-1 size-5 rounded-full bg-[#0b0d10]', on ? 'left-6' : 'left-1')} />
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Live: stacked notifications ───────────────────────────────────────── */

export function ActivityPreview() {
  const items = [
    ['Imma joined your channel', 'Instagram · Bio', 'now'],
    ['Alexandra deposited $9,445', 'Standard STP', '2m'],
    ['Zuneid traded 2.5 lots', 'XAUUSD', '9m'],
  ]
  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      {items.map(([t, s, w], i) => (
        <div
          key={t}
          className="w-full rounded-[22px] bg-white/[0.06] px-5 py-4 backdrop-blur-xl ring-1 ring-white/[0.06]"
          style={{ transform: `scale(${1 - i * 0.05})`, marginTop: i ? -10 : 0, opacity: 1 - i * 0.28, zIndex: 10 - i }}
        >
          <div className="flex items-center justify-between text-[15px]"><span className="font-medium">{t}</span><span className="text-[13px] text-zinc-500">{w}</span></div>
          <div className="mt-0.5 text-[13px] text-zinc-500">{s}</div>
        </div>
      ))}
    </div>
  )
}
