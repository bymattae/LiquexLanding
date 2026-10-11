import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AreaChart, Avatar, Delta, InstagramMark, LiquexMark, Surface, TelegramMark, TikTokMark, BrokerMark, ease, label, num } from './premium'

/**
 * Living product visuals for the AffiliateOS page. Each starts when it
 * scrolls into view; the loops are slow and quiet. Built on ./premium so
 * every mockup reads as the same product.
 */

/** Card chrome for one-off mockups: hairline edge, top highlight, deep shadow. */
export const card = 'rounded-[18px] bg-[#0c0e11] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.5)]'

/** Counts from 0 to `to` once `go` is true. */
export function useCount(to: number, go: boolean, ms = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!go) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, go, ms])
  return v
}

/** Steps through 0..n-1 every `ms` while visible. */
export function useCycle(n: number, go: boolean, ms: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!go) return
    const id = setInterval(() => setI(x => (x + 1) % n), ms)
    return () => clearInterval(id)
  }, [n, go, ms])
  return i
}

const money = (n: number) => `$${Math.round(n).toLocaleString()}`

export const Tick = ({ className }: { className?: string }) => <svg viewBox="0 0 12 12" className={cn('size-3', className)} aria-hidden><path d="M2.5 6.2 5 8.6l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
const Spinner = () => <span className="size-3 animate-spin rounded-full border-[1.5px] border-white/15 border-t-white/70" />

/** A person with the place they came from badged on the corner. */
export function PersonFrom({ name, i, from }: { name: string; i: number; from?: React.ReactNode }) {
  return (
    <span className="relative shrink-0">
      <Avatar name={name} i={i} className="size-7 text-[11px]" />
      {from && <span className="absolute -bottom-1 -right-1 grid place-items-center rounded-[5px] ring-2 ring-[#0c0e11] [&>*]:size-3.5">{from}</span>}
    </span>
  )
}

/** The Liquex AI glyph: a four-point spark in violet. */
export function AiGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('size-3.5', className)} aria-hidden>
      <defs><linearGradient id="ai-g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#ede9fe" /><stop offset="1" stopColor="#a78bfa" /></linearGradient></defs>
      <path d="M7 1c.5 3.3 1.7 4.5 5 5-3.3.5-4.5 1.7-5 5-.5-3.3-1.7-4.5-5-5 3.3-.5 4.5-1.7 5-5z" fill="url(#ai-g)" />
      <path d="M13 10c.2 1.2.6 1.6 1.8 1.8-1.2.2-1.6.6-1.8 1.8-.2-1.2-.6-1.6-1.8-1.8 1.2-.2 1.6-.6 1.8-1.8z" fill="#c4b5fd" />
    </svg>
  )
}

/** The pulsing "Live" mark. */
export function LiveDot({ text = 'Live' }: { text?: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[10.5px] text-emerald-300/90">
      <span className="relative flex size-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/60" /><span className="size-1.5 rounded-full bg-emerald-300" /></span>{text}
    </span>
  )
}

/* ── Book dashboard: KPIs, drawing line, where the book sits ───────────── */

const BOOK = [148, 152, 150, 158, 163, 161, 170, 176, 172, 184, 191, 188, 199, 207, 204, 216, 227]
export const STAGES = [
  { k: 'Trading', p: 72, c: 'bg-emerald-300' }, { k: 'Wrong account type', p: 21, c: 'bg-rose-400' }, { k: 'Gone quiet', p: 5, c: 'bg-zinc-500' }, { k: 'About to leave', p: 2, c: 'bg-amber-300' },
]

export function StageBar({ go = true, delay = 0.6 }: { go?: boolean; delay?: number }) {
  return (
    <div className="flex h-1.5 gap-0.5 overflow-hidden rounded-full">
      {STAGES.map((s, i) => <motion.span key={s.k} className={cn('h-full', s.c)} initial={{ width: 0 }} animate={go ? { width: `${s.p}%` } : {}} transition={{ delay: delay + i * 0.12, duration: 0.9, ease }} />)}
    </div>
  )
}

export function BookDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  const a = useCount(184920, go), b = useCount(62410, go), c = useCount(312, go)
  return (
    <div ref={ref} className="w-full max-w-[480px]">
      <Surface glow inner="p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[12.5px] font-medium text-zinc-200"><LiquexMark className="size-5 rounded-[6px]" />Your book</span>
          <span className="text-[11px] text-zinc-500">Last 30 days</span>
        </div>
        <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.06]">
          {[['Balance', money(a), '12.4%'], ['Net funding', `+${money(b)}`, '4.6%'], ['Active', Math.round(c).toString(), '25.3%']].map(([k, v, d], i) => (
            <div key={k} className={i ? 'pl-4' : 'pr-4'}>
              <div className={label}>{k}</div>
              <div className={cn(num, 'mt-1 text-[18px] text-white')}>{v}</div>
              <Delta v={d} className="mt-0.5" />
            </div>
          ))}
        </div>
        <AreaChart data={BOOK} w={440} h={110} go={go} className="mt-5 h-[110px]" />
        <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-zinc-600"><span>11 Sep</span><span>25 Sep</span><span>10 Oct</span></div>
        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <StageBar go={go} />
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
            {STAGES.map(s => (
              <div key={s.k} className="flex items-center justify-between text-[11.5px]">
                <span className="flex items-center gap-2 text-zinc-400"><span className={cn('size-1.5 rounded-full', s.c)} />{s.k}</span>
                <span className="tabular-nums text-zinc-200">{s.p}%</span>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </div>
  )
}

/* ── Content: a post that took off ─────────────────────────────────────── */

/** A reel cover drawn in CSS: moody gradient, caption, platform mark, progress. */
export function ReelThumb({ caption, views, go = true, className, tone = 0, mark = true }: { caption: string; views: string; go?: boolean; className?: string; tone?: number; mark?: boolean }) {
  const bg = [
    'bg-[radial-gradient(120%_80%_at_70%_15%,rgba(251,191,36,0.38),transparent_55%),radial-gradient(90%_70%_at_20%_85%,rgba(16,185,129,0.35),transparent_60%),linear-gradient(170deg,#1b2430,#07090c)]',
    'bg-[radial-gradient(110%_80%_at_30%_10%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(90%_70%_at_80%_85%,rgba(168,85,247,0.3),transparent_60%),linear-gradient(170deg,#161b2b,#07090c)]',
  ][tone % 2]
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-[#0b0f14] ring-1 ring-white/10', className)}>
      <div className={cn('absolute inset-0', bg)} />
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.5)_0_1px,transparent_1px_3px)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 to-transparent" />
      {mark && <InstagramMark className="absolute left-2 top-2 size-4" />}
      <div className="absolute inset-x-2.5 bottom-5 text-[11px] font-extrabold uppercase leading-[1.1] tracking-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">{caption}</div>
      <div className="absolute bottom-1.5 left-2.5 flex items-center gap-1 text-[9px] font-medium text-white/80">
        <svg viewBox="0 0 10 10" className="size-2"><path d="M2 1.5v7l6-3.5z" fill="currentColor" /></svg>{views}
      </div>
      <motion.div className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-white/90" initial={{ scaleX: 0 }} animate={go ? { scaleX: 1 } : {}} transition={{ duration: 6, ease: 'linear', repeat: Infinity }} />
    </div>
  )
}

export function ContentAnimated() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  const views = useCount(184, go, 1600)
  const rows = [['Trading lifestyle', '6.0', 100], ['Market analysis', '2.1', 35], ['Memes', '0.4', 8]] as const
  return (
    <div ref={ref} className="w-full max-w-[460px]">
      <Surface glow inner="p-5">
        <div className="flex gap-5">
          <ReelThumb caption="My morning routine" views="184K" go={go} className="h-[156px] w-[92px] shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] text-zinc-500">Reel · 4 Oct</div>
            <div className={cn(num, 'mt-1.5 text-[28px] leading-none text-white')}>{Math.round(views)}K <span className="text-[13px] font-normal tracking-normal text-zinc-500">views</span></div>
            <motion.div initial={{ opacity: 0, y: 4 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4 }}
              className="mt-2.5 flex items-center gap-1.5 text-[12px]"><Delta v="38×" /><span className="text-zinc-500">your usual ·</span><span className="text-zinc-100">96 joins</span></motion.div>
            <div className="mt-4 grid grid-cols-3 border-t border-white/[0.06] pt-3 text-[11px]">
              {[['Type', 'Lifestyle'], ['Topic', 'Routine'], ['CTA', 'DM me']].map(([k, v], i) => (
                <motion.div key={k} initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: 1.6 + i * 0.12 }}><div className="text-zinc-500">{k}</div><div className="mt-0.5 font-medium text-zinc-100">{v}</div></motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <div className="flex justify-between"><span className={label}>What brings joins</span><span className={label}>joins / post</span></div>
          {rows.map(([k, v, w], i) => (
            <div key={k} className="mt-3 grid grid-cols-[116px_1fr_28px] items-center gap-3 text-[12px]">
              <span className="text-zinc-300">{k}</span>
              <div className="h-[3px] rounded-full bg-white/[0.06]"><motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400/50 to-emerald-300" initial={{ width: 0 }} animate={go ? { width: `${w}%` } : {}} transition={{ delay: 0.6 + i * 0.2, duration: 1, ease }} /></div>
              <span className="text-right tabular-nums text-zinc-100">{v}</span>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  )
}

/* ── Verification: the Telegram Mini App, on a loop ────────────────────── */

const CHECKS = ['Under your IB', 'Eligible account type', 'Balance $100+']

export function VerifyPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-60px' })
  const step = useCycle(8, go, 900) // 0-1 typing · 2 checking · 3-5 ticks · 6-7 verified
  const id = '24881364'.slice(0, step === 0 ? 4 : 8)
  const ticked = Math.max(0, Math.min(3, step - 2))
  const done = step >= 6
  return (
    <div ref={ref} className="w-[248px] rounded-[42px] bg-gradient-to-b from-zinc-500/50 via-zinc-800/60 to-zinc-900 p-[1.5px] shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
      <div className="rounded-[41px] bg-[#050607] p-[7px]">
        <div className="relative overflow-hidden rounded-[34px] bg-[#0f1216]">
          <div className="mx-auto mt-2 h-[22px] w-[84px] rounded-full bg-black" />
          <div className="mt-2 flex items-center justify-between px-4 text-[11px]">
            <span className="text-[#5eb5f7]">Close</span>
            <span className="flex flex-col items-center leading-tight"><span className="font-semibold text-zinc-100">VIP Access</span><span className="text-[9px] text-zinc-500">mini app</span></span>
            <span className="tracking-widest text-[#5eb5f7]">···</span>
          </div>
          <div className="px-4 pb-5 pt-5 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-500 text-[12px] font-bold text-black/75 shadow-[0_8px_24px_rgba(251,146,60,0.3)]">VIP</span>
            <div className="mt-3 text-[14px] font-semibold text-zinc-100">Join the VIP</div>
            <div className="mt-0.5 text-[11px] text-zinc-500">Enter your broker account ID</div>
            <div className="mt-4 flex items-center rounded-xl bg-white/[0.05] px-3.5 py-2.5 text-left font-mono text-[13px] text-zinc-100 ring-1 ring-white/[0.06]">
              {id}<span className={cn('ml-0.5 inline-block h-3.5 w-px bg-[#5eb5f7]', step > 1 && 'opacity-0')} />
            </div>
            <div className="mt-3 divide-y divide-white/[0.05] rounded-xl bg-white/[0.03] text-left text-[11.5px] ring-1 ring-white/[0.05]">
              {CHECKS.map((c, i) => (
                <div key={c} className="flex items-center justify-between px-3 py-2.5">
                  <span className={i < ticked ? 'text-zinc-200' : 'text-zinc-500'}>{c}</span>
                  {i < ticked
                    ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid size-4 place-items-center rounded-full bg-emerald-300 text-black"><Tick /></motion.span>
                    : step >= 2 && i === ticked ? <Spinner /> : <span className="size-4 rounded-full ring-1 ring-white/10" />}
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-emerald-300 py-2.5 text-[12.5px] font-semibold text-black">You’re in · welcome to VIP</motion.div>
              ) : (
                <motion.div key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-[#3390ec] py-2.5 text-[12.5px] font-semibold text-white">{step >= 2 ? 'Checking…' : 'Verify'}</motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── AI: next steps appearing ──────────────────────────────────────────── */

export const TONES = {
  violet: 'text-violet-200 bg-violet-300/10 ring-violet-300/20',
  rose: 'text-rose-200 bg-rose-300/10 ring-rose-300/20',
  emerald: 'text-emerald-200 bg-emerald-300/10 ring-emerald-300/20',
  amber: 'text-amber-200 bg-amber-300/10 ring-amber-300/20',
}

const READS = [
  ['Daniel R.', 'Down $820 · trades big on gold', 'Risk call', TONES.violet],
  ['Ryan P.', 'Moved IB with $24.6K', 'Win back', TONES.rose],
  ['Leo T.', 'Up $1,940 · steady scalper', 'VIP invite', TONES.emerald],
  ['Ella J.', 'Deposited, not trading yet', 'Check in', TONES.amber],
]

export function NextSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  const focus = useCycle(READS.length, go, 2200)
  return (
    <div ref={ref} className="w-full max-w-[440px]">
      <Surface inner="p-2">
        <div className="flex items-center justify-between px-3 pb-2 pt-2 text-[12px]"><span className="flex items-center gap-1.5 font-medium text-zinc-100"><AiGlyph />Next steps</span><span className="text-zinc-500">Today · 4</span></div>
        <div className="space-y-0.5">
          {READS.map(([n, d, a, tone], i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 6 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.2, duration: 0.6, ease }}
              className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-500', i === focus && 'bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]')}>
              <Avatar name={n} i={i + 1} className="size-7 text-[11px]" />
              <div className="min-w-0 flex-1"><div className="text-[12.5px] font-medium text-zinc-100">{n}</div><div className="truncate text-[11px] text-zinc-500">{d}</div></div>
              <span className={cn('shrink-0 rounded-md px-2 py-0.5 text-[10.5px] font-medium ring-1', tone)}>{a}</span>
            </motion.div>
          ))}
        </div>
      </Surface>
    </div>
  )
}

/* ── The flow: five stages, light moving through ───────────────────────── */

const FLOW = [
  { k: 'Views', v: 1800000, f: (n: number) => `${(n / 1e6).toFixed(1)}M`, sub: 'on your content', mark: <span className="flex -space-x-1"><InstagramMark className="size-4" /><TikTokMark className="size-4" /></span> },
  { k: 'Joins', v: 2140, f: (n: number) => Math.round(n).toLocaleString(), sub: 'into your channel', mark: <TelegramMark className="size-4" /> },
  { k: 'Leads', v: 1380, f: (n: number) => Math.round(n).toLocaleString(), sub: 'messaged you', mark: <span className="flex -space-x-1.5">{['S', 'M'].map((n, j) => <Avatar key={n} name={n} i={j + 2} className="size-4 text-[7px] ring-1" />)}</span> },
  { k: 'Verified', v: 0, f: () => 'Auto', sub: 'in your Mini App', mark: <LiquexMark className="size-4 rounded-[5px]" /> },
  { k: 'Clients', v: 420, f: (n: number) => Math.round(n).toLocaleString(), sub: 'trading with you', mark: <BrokerMark className="size-4" /> },
]
const RATES = ['0.06%', '69%', 'instant', 'funded']

function FlowNum({ v, f, go }: { v: number; f: (n: number) => string; go: boolean }) {
  const n = useCount(v, go, 1600)
  return <>{f(n)}</>
}

export function FlowBand() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-80px' })
  const lit = useCycle(FLOW.length, go, 1400)
  return (
    <div ref={ref} className="relative mx-auto max-w-5xl">
      <div aria-hidden className="absolute inset-x-[4%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block">
        <motion.span className="absolute -top-px h-[3px] w-28 rounded-full bg-gradient-to-r from-transparent via-emerald-200 to-transparent shadow-[0_0_12px_rgba(110,231,183,0.9)]"
          animate={go ? { left: ['-10%', '100%'] } : {}} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} />
      </div>
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
        {FLOW.map((s, i) => {
          const on = i === lit
          return (
            <motion.div key={s.k} initial={{ opacity: 0, y: 14 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.8, ease }} className="relative">
              <Surface className={cn('transition-shadow duration-700', on && '!shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_20px_50px_rgba(0,0,0,0.45)]')} inner="p-4">
                <div className="flex items-center justify-between"><span className={label}>{s.k}</span>{s.mark}</div>
                <div className={cn(num, 'mt-3 text-[26px] leading-none text-white')}><FlowNum v={s.v} f={s.f} go={go} /></div>
                <div className="mt-2.5 whitespace-nowrap text-[11px] text-zinc-500">{s.sub}</div>
              </Surface>
              {i < FLOW.length - 1 && (
                <span className="absolute left-full top-1/2 z-10 ml-6 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#07090b] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-emerald-200/90 ring-1 ring-white/10 lg:block">{RATES[i]}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Live feed ─────────────────────────────────────────────────────────── */

const FEED: [string, React.ReactNode, string, string][] = [
  ['Ava', <InstagramMark />, 'joined your channel from', 'Instagram bio'],
  ['Maya', <BrokerMark />, 'deposited', '+$4,200'],
  ['Chloe', <TelegramMark />, 'messaged you ·', 'new lead'],
  ['Daniel', <LiquexMark />, 'got verified ·', 'VIP access'],
  ['Ethan', <BrokerMark />, 'went quiet ·', '21 days'],
  ['Leo', <BrokerMark />, 'traded', '1.8 lots'],
  ['Noah', <TikTokMark />, 'joined your channel from', 'TikTok'],
]

export function LiveFeed() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-60px' })
  const t = useCycle(1000, go, 1800)
  const rows = Array.from({ length: 5 }, (_, i) => ({ key: t - i, data: FEED[((t - i) % FEED.length + FEED.length) % FEED.length], age: i }))
  return (
    <div ref={ref} className="w-full max-w-[460px]">
      <Surface inner="p-2">
        <div className="flex items-center justify-between px-3 pb-2 pt-2 text-[12px]">
          <span className="font-medium text-zinc-100">Activity</span>
          <LiveDot />
        </div>
        <div className="relative h-[240px] overflow-hidden">
          <AnimatePresence initial={false}>
            {rows.map(({ key, data: [n, from, a, v], age }) => (
              <motion.div key={key} layout initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1 - age * 0.17, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
                className={cn('flex h-12 items-center gap-3 rounded-xl px-3 text-[12px]', age === 0 && 'bg-white/[0.04]')}>
                <PersonFrom name={n} i={((key % 6) + 6) % 6} from={from} />
                <span className="min-w-0 flex-1 truncate text-zinc-500"><span className="font-medium text-zinc-100">{n}</span> {a} <span className="text-zinc-200">{v}</span></span>
                <span className="shrink-0 text-[10.5px] tabular-nums text-zinc-600">{age === 0 ? 'now' : `${age * 2}m`}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Surface>
    </div>
  )
}
