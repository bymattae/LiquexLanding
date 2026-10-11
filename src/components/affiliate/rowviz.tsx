import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Activity, Film, Link2, Zap, ShieldCheck, Sparkles, TrendingDown, TrendingUp, Users, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReelThumb, Tick, useCount, useCycle } from './animated'
import { Avatar, BrokerMark, InstagramMark, LiquexMark, TelegramMark, TikTokMark, YouTubeMark, ease } from './premium'

/**
 * The five feature visuals, in one calm widget language (think Apple Health):
 * one large tile and two small tiles each, a coloured label, one big number,
 * one simple chart. No borders, no glows, no chips.
 */

/** Glossy but quiet: a soft top-lit gradient, a hairline edge, an inner highlight and a sheen across the top half. */
const tile = 'sweep relative overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#0f1012_0%,#09090b_55%,#060607_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.045),0_24px_60px_-12px_rgba(0,0,0,0.8)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/[0.03] before:to-transparent'

type Tone = 'emerald' | 'pink' | 'blue' | 'violet' | 'sky' | 'amber' | 'rose'
const TXT: Record<Tone, string> = { emerald: 'text-emerald-300', pink: 'text-pink-300', blue: 'text-sky-400', violet: 'text-violet-300', sky: 'text-sky-300', amber: 'text-amber-300', rose: 'text-rose-300' }
const BG: Record<Tone, string> = { emerald: 'bg-gradient-to-t from-emerald-500 to-emerald-200 shadow-[0_0_18px_rgba(110,231,183,0.45)]', pink: 'bg-gradient-to-t from-pink-500 to-pink-200 shadow-[0_0_18px_rgba(244,114,182,0.45)]', blue: 'bg-gradient-to-t from-sky-600 to-sky-300', violet: 'bg-gradient-to-t from-violet-500 to-violet-200', sky: 'bg-gradient-to-t from-sky-500 to-sky-200', amber: 'bg-gradient-to-t from-amber-500 to-amber-200', rose: 'bg-gradient-to-t from-rose-500 to-rose-200' }

function useGo() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  return { ref, go }
}

/** The fixed frame: every visual is the same size. */
function Box({ inner, children }: { inner: React.Ref<HTMLDivElement>; children: React.ReactNode }) {
  return <div ref={inner} className="flex h-[400px] w-full max-w-[440px] flex-col justify-center gap-3">{children}</div>
}

function Tile({ go, delay = 0, className, children }: { go: boolean; delay?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div style={{ ['--sweep-c' as string]: 'rgba(255,255,255,0.5)', animationDelay: `${-delay * 10}s` } as React.CSSProperties} initial={{ opacity: 0, y: 12 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.8, ease }} className={cn(tile, 'p-5 [&>*]:relative', className)}>
      {children}
    </motion.div>
  )
}

function Label({ tone, icon, children, right }: { tone: Tone; icon: React.ReactNode; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn('flex items-center gap-1.5 text-[13px] font-semibold [&_svg]:size-3.5 [&_svg]:stroke-[2.5]', TXT[tone])}>{icon}{children}</span>
      {right && <span className="text-[12px] text-zinc-500">{right}</span>}
    </div>
  )
}

function Big({ value, unit }: { value: React.ReactNode; unit?: string }) {
  return <div className="mt-3 flex items-baseline gap-1.5"><span className="text-[34px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-white">{value}</span>{unit && <span className="text-[15px] font-medium text-zinc-500">{unit}</span>}</div>
}

/** Rounded vertical bars, the last one in colour — Apple Health style. */
function Bars({ data, tone, go, h = 64 }: { data: number[]; tone: Tone; go: boolean; h?: number }) {
  const max = Math.max(...data)
  return (
    <div className="mt-4 flex items-end gap-[5px]" style={{ height: h }}>
      {data.map((v, i) => (
        <motion.span key={i} initial={{ height: 0 }} animate={go ? { height: `${(v / max) * 100}%` } : {}} transition={{ delay: 0.3 + i * 0.03, duration: 0.7, ease }}
          className={cn('flex-1 rounded-full', i === data.length - 1 ? BG[tone] : 'bg-gradient-to-t from-white/[0.06] to-white/[0.14]')} />
      ))}
    </div>
  )
}

function Small({ go, delay, tone, icon, label, value, unit }: { go: boolean; delay: number; tone: Tone; icon: React.ReactNode; label: string; value: React.ReactNode; unit?: string }) {
  return (
    <Tile go={go} delay={delay}>
      <Label tone={tone} icon={icon}>{label}</Label>
      <div className="mt-3 flex items-baseline gap-1"><span className="text-[26px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-white">{value}</span>{unit && <span className="text-[13px] font-medium text-zinc-500">{unit}</span>}</div>
    </Tile>
  )
}

/* ── 1 · Your clients ──────────────────────────────────────────────────── */

const BAL = [62, 66, 64, 70, 73, 71, 76, 80, 78, 84, 88, 86, 92, 96, 100]

export function BookViz() {
  const { ref, go } = useGo()
  const bal = useCount(184920, go, 1600)
  return (
    <Box inner={ref}>
      <Tile go={go}>
        <Label tone="emerald" icon={<Wallet />} right="Last 30 days">Client balance</Label>
        <Big value={`$${Math.round(bal).toLocaleString()}`} />
        <div className="mt-1.5 text-[13px] text-zinc-500">Up <span className="text-zinc-200">$20,180</span> this month</div>
        <Bars data={BAL} tone="emerald" go={go} />
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="sky" icon={<TrendingUp />} label="Lots traded" value="1,240" />
        <Small go={go} delay={0.25} tone="amber" icon={<TrendingDown />} label="Slipping" value="8" unit="clients" />
      </div>
    </Box>
  )
}

/* ── 2 · Your content ──────────────────────────────────────────────────── */

export type { Tone as VizTone }
export function ContentViz() {
  const { ref, go } = useGo()
  const joined = useCount(96, go, 1400)
  return (
    <Box inner={ref}>
      <Tile go={go}>
        <Label tone="pink" icon={<Film />} right="This month">Top post</Label>
        <div className="mt-4 flex items-center gap-5">
          <ReelThumb caption="My morning routine" views="184K" go={go} className="h-[132px] w-[76px] shrink-0 rounded-2xl ring-0" />
          <div>
            <div className="flex items-baseline gap-1.5"><span className="text-[34px] font-semibold leading-none tracking-[-0.03em] tabular-nums">{Math.round(joined)}</span><span className="text-[15px] font-medium text-zinc-500">traders</span></div>
            <div className="mt-2 text-[13px] leading-5 text-zinc-500">joined your channel from this reel</div>
            <div className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-emerald-300">↗ 38× your usual</div>
          </div>
        </div>
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="pink" icon={<Activity />} label="Views" value="184K" />
        <Small go={go} delay={0.25} tone="emerald" icon={<Wallet />} label="Deposited" value="$12.4K" />
      </div>
    </Box>
  )
}

/* ── 3 · Your VIP ──────────────────────────────────────────────────────── */

const CHECKS = ['Under your IB', 'Eligible account', 'Balance over $100']

export function VerifyViz() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-60px' })
  const step = useCycle(7, go, 1000) // 0 waiting · 1-3 ticks · 4-6 added
  const ticked = Math.min(3, step)
  const done = step >= 4
  return (
    <Box inner={ref}>
      <Tile go={go}>
        <Label tone="blue" icon={<ShieldCheck />} right="Just now">Verification</Label>
        <div className="mt-4 flex items-center gap-3">
          <Avatar name="Daniel" i={1} className="size-10 text-[14px] ring-0" />
          <div className="flex-1"><div className="text-[16px] font-semibold">Daniel R.</div><div className="text-[13px] text-zinc-500">Wants to join your VIP</div></div>
          <AnimatePresence mode="wait">
            {done
              ? <motion.span key="y" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="grid size-8 place-items-center rounded-full bg-sky-400 text-black"><Tick className="size-4" /></motion.span>
              : <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-sky-400" />}
          </AnimatePresence>
        </div>
        <div className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
          {CHECKS.map((c, i) => (
            <div key={c} className="flex items-center justify-between text-[14px]">
              <span className={cn('transition-colors duration-500', i < ticked ? 'text-zinc-200' : 'text-zinc-600')}>{c}</span>
              <Tick className={cn('size-3.5 transition-colors duration-500', i < ticked ? 'text-sky-400' : 'text-transparent')} />
            </div>
          ))}
        </div>
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="blue" icon={<Users />} label="In your VIP" value="214" />
        <Small go={go} delay={0.25} tone="rose" icon={<TrendingDown />} label="Removed" value="6" unit="this week" />
      </div>
    </Box>
  )
}

/* ── 4 · Who to talk to ────────────────────────────────────────────────── */

const READS = [
  { n: 'Ryan P.', read: 'Moved to another IB last week with $24,600.', step: 'Call him today', tone: 'rose' as Tone },
  { n: 'Leo T.', read: 'Up $1,940 this month and trading every day.', step: 'Invite him to VIP', tone: 'emerald' as Tone },
  { n: 'Ella J.', read: 'Deposited $500 four days ago. No trades yet.', step: 'Send a nudge', tone: 'amber' as Tone },
]

export function AiViz() {
  const { ref, go } = useGo()
  const t = useCycle(READS.length, go, 3200)
  const r = READS[t]
  return (
    <Box inner={ref}>
      <Tile go={go} className="h-[196px]">
        <Label tone="violet" icon={<Sparkles />} right={`${t + 1} of 5 today`}>Next step</Label>
        <AnimatePresence mode="wait">
          <motion.div key={t} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease }}>
            <div className="mt-4 flex items-center gap-3"><Avatar name={r.n} i={t + 1} className="size-10 text-[14px] ring-0" /><span className="text-[16px] font-semibold">{r.n}</span></div>
            <p className="mt-3 text-[15px] leading-6 text-zinc-300">{r.read}</p>
            <div className={cn('mt-3 text-[14px] font-semibold', TXT[r.tone])}>{r.step} →</div>
          </motion.div>
        </AnimatePresence>
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="rose" icon={<TrendingDown />} label="At risk" value="3" unit="clients" />
        <Small go={go} delay={0.25} tone="emerald" icon={<TrendingUp />} label="Ready for VIP" value="5" unit="clients" />
      </div>
    </Box>
  )
}

/* ── 5 · Live ──────────────────────────────────────────────────────────── */

const NOTES: [React.ReactNode, string, string][] = [
  [<BrokerMark className="size-9" />, 'New deposit', 'Maya deposited $4,200'],
  [<InstagramMark className="size-9" />, 'New join', 'Ava joined from your Instagram'],
  [<LiquexMark className="size-9 rounded-[10px]" />, 'Verified', 'Daniel is now in your VIP'],
  [<TikTokMark className="size-9" />, 'New join', 'Noah joined from your TikTok'],
  [<TelegramMark className="size-9" />, 'New lead', 'Chloe messaged you'],
]

export function LiveViz() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-60px' })
  const t = useCycle(1000, go, 2000)
  const rows = [0, 1, 2].map(i => ({ key: t - i, n: NOTES[((t - i) % NOTES.length + NOTES.length) % NOTES.length], age: i }))
  return (
    <Box inner={ref}>
      <div className="relative flex h-[236px] flex-col gap-2.5">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map(({ key, n: [mark, title, text], age }) => (
            <motion.div key={key} layout initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1 - age * 0.25, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease }} className={cn(tile, 'flex shrink-0 items-center gap-3.5 rounded-[22px] p-3.5 pr-5')}>
              <span className="shrink-0">{mark}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between text-[13px]"><span className="font-semibold text-white">{title}</span><span className="text-zinc-500">{age === 0 ? 'now' : `${age * 2}m ago`}</span></div>
                <div className="mt-0.5 truncate text-[14px] text-zinc-400">{text}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="sky" icon={<Users />} label="Joins today" value="43" />
        <Small go={go} delay={0.25} tone="emerald" icon={<Wallet />} label="Deposited" value="$21.4K" />
      </div>
    </Box>
  )
}

/* ── 6 · Tracked links ─────────────────────────────────────────────────── */

const LINKS: [React.ReactNode, string, number][] = [
  [<InstagramMark className="size-5" />, 'Instagram bio', 642],
  [<InstagramMark className="size-5" />, 'Instagram DM', 518],
  [<TikTokMark className="size-5" />, 'TikTok bio', 74],
]

export function LinksViz() {
  const { ref, go } = useGo()
  return (
    <Box inner={ref}>
      <Tile go={go}>
        <Label tone="sky" icon={<Link2 />} right="Last 30 days">Tracked links</Label>
        <div className="mt-4 space-y-4">
          {LINKS.map(([m, k, n], i) => (
            <div key={k}>
              <div className="flex items-center justify-between text-[14px]"><span className="flex items-center gap-2.5 text-zinc-200">{m}{k}</span><span className="font-semibold tabular-nums">{n} <span className="text-[12px] font-medium text-zinc-500">joins</span></span></div>
              <div className="mt-2 h-1.5 rounded-full bg-white/[0.08]"><motion.div className="h-full rounded-full bg-sky-300" initial={{ width: 0 }} animate={go ? { width: `${(n / 642) * 100}%` } : {}} transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease }} /></div>
            </div>
          ))}
        </div>
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="emerald" icon={<Wallet />} label="Funded" value="186" unit="clients" />
        <Small go={go} delay={0.25} tone="sky" icon={<TrendingUp />} label="Best link" value="IG bio" />
      </div>
    </Box>
  )
}

/* ── 7 · Automations ───────────────────────────────────────────────────── */

const RULES: [string, string][] = [['Balance drops under $100', 'Remove from VIP'], ['No trades in 30 days', 'Send a check-in'], ['Moves to another IB', 'Alert you'], ['First deposit lands', 'Add to VIP']]

export function RulesViz() {
  const { ref, go } = useGo()
  const t = useCycle(RULES.length, go, 1800)
  return (
    <Box inner={ref}>
      <Tile go={go}>
        <Label tone="amber" icon={<Zap />} right="Always on">Automations</Label>
        <div className="mt-4 divide-y divide-white/[0.06]">
          {RULES.map(([when, then], i) => (
            <div key={when} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0"><div className="text-[14px] text-zinc-200">{when}</div><div className="mt-0.5 text-[12.5px] text-zinc-500">then {then.toLowerCase()}</div></div>
              <span className={cn('relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-500', i === t ? 'bg-amber-300' : 'bg-emerald-300/80')}>
                <span className="absolute right-[2px] top-[2px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
              </span>
            </div>
          ))}
        </div>
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="amber" icon={<Zap />} label="Ran this week" value="128" />
        <Small go={go} delay={0.25} tone="emerald" icon={<Activity />} label="Hours saved" value="9" unit="hrs" />
      </div>
    </Box>
  )
}

/* ── Grow: traffic sources ─────────────────────────────────────────────── */

const SOURCES: [React.ReactNode, string, number, string][] = [
  [<InstagramMark className="size-5" />, 'Instagram', 1240, '64 clients'],
  [<TikTokMark className="size-5" />, 'TikTok', 580, '21 clients'],
  [<TelegramMark className="size-5" />, 'Telegram', 310, '14 clients'],
  [<YouTubeMark className="size-5" />, 'YouTube', 120, '5 clients'],
]

export function TrafficViz() {
  const { ref, go } = useGo()
  return (
    <Box inner={ref}>
      <Tile go={go}>
        <Label tone="pink" icon={<Activity />} right="Last 30 days">Traffic sources</Label>
        <div className="mt-4 space-y-4">
          {SOURCES.map(([m, k, n, c], i) => (
            <div key={k}>
              <div className="flex items-center justify-between text-[14px]"><span className="flex items-center gap-2.5 text-zinc-200">{m}{k}</span><span className="tabular-nums text-zinc-400"><span className="font-semibold text-white">{n.toLocaleString()}</span> joins · {c}</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-white/[0.08]"><motion.div className={cn('h-full rounded-full', i === 0 ? 'bg-gradient-to-r from-pink-500 to-pink-300' : 'bg-white/25')} initial={{ width: 0 }} animate={go ? { width: `${(n / 1240) * 100}%` } : {}} transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease }} /></div>
            </div>
          ))}
        </div>
      </Tile>
      <div className="grid grid-cols-2 gap-3">
        <Small go={go} delay={0.15} tone="pink" icon={<TrendingUp />} label="Best platform" value="Instagram" />
        <Small go={go} delay={0.25} tone="emerald" icon={<Users />} label="Clients" value="104" />
      </div>
    </Box>
  )
}

/* ── Stage heroes: one wide panel, three tiles ─────────────────────────── */

export function StageHero({ tiles }: { tiles: React.ReactNode[] }) {
  const { ref, go } = useGo()
  return (
    <div ref={ref} className="grid w-full gap-3 md:grid-cols-3">
      {tiles.map((t, i) => <Tile key={i} go={go} delay={i * 0.12} className="min-h-[200px]">{t}</Tile>)}
    </div>
  )
}

export function HeroStat({ tone, icon, label, value, unit, sub, bars }: { tone: Tone; icon: React.ReactNode; label: string; value: string; unit?: string; sub?: string; bars?: number[] }) {
  const { ref, go } = useGo()
  return (
    <div ref={ref}>
      <Label tone={tone} icon={icon}>{label}</Label>
      <Big value={value} unit={unit} />
      {sub && <div className="mt-1.5 text-[13px] text-zinc-500">{sub}</div>}
      {bars && <Bars data={bars} tone={tone} go={go} h={48} />}
    </div>
  )
}
