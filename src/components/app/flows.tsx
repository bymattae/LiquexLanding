import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp as TrendingUpIcon, AlertTriangle, ArrowRightLeft, Check, ChevronRight, Copy, Play, Plus, Sparkles, UserPlus, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CursorClick as PhCursorClick, ChartBar as PhChartBar, Sparkle as PhSparkle, UserPlus as PhUserPlus, ChatCircle as PhChatCircle, User as PhUser, ShieldCheck as PhShieldCheck, PaperPlaneTilt as PhPaperPlaneTilt, LockKeyOpen as PhLockKeyOpen, Warning as PhWarning, CheckCircle as PhCheckCircle, Link as PhLink, ShareNetwork as PhShareNetwork, SquaresFour as PhSquaresFour, InstagramLogo as PhInstagramLogo, TiktokLogo as PhTiktokLogo, Tag as PhTag, ArrowBendUpLeft as PhArrowBendUpLeft, Sliders as PhSliders, Eye as PhEye, ArrowsLeftRight as PhArrowsLeftRight, BellRinging as PhBellRinging, CurrencyDollar as PhCurrencyDollar, ArrowsClockwise as PhArrowsClockwise, ListChecks as PhListChecks, CalendarCheck as PhCalendarCheck } from '@phosphor-icons/react'
import { ReelThumb } from '@/components/affiliate/animated'
import { InstagramMark, LiquexMark, TelegramMark, TikTokMark, YouTubeMark } from '@/components/affiliate/premium'
import { AppWindow, Badge, BarsWithLine, Card, CardHead, Chip, DeltaPill, DotMatrix, Fit, Ghost, Initials, Kpi, Line, Live, MiniBars, Num, PillTabs, SegMeter, Split, T, useGo } from './kit'

/**
 * Product demos: each one is a short, looping story played inside a Liquex
 * window — a cursor clicks, data loads, the AI reads it, you act on it.
 * Built on the real app's look, polished for the marketing site.
 */

const ease = [0.16, 1, 0.3, 1] as const
const W = 540, H = 444, BODY = H - 46

/** Each step's caption: a small coloured glyph for what's happening, then the words. */
const CAPTION: Record<string, [React.ReactNode, string]> = {
  'Pick a post': [<PhCursorClick weight="fill" />, 'text-pink-300'],
  'Stats load': [<PhChartBar weight="fill" />, 'text-sky-300'],
  'AI read': [<PhSparkle weight="fill" />, 'text-violet-300'],
  'New join': [<PhUserPlus weight="fill" />, 'text-sky-300'],
  'Becomes a lead': [<PhChatCircle weight="fill" />, 'text-violet-300'],
  'See their story': [<PhUser weight="fill" />, 'text-sky-300'],
  'Verify them': [<PhShieldCheck weight="fill" />, 'text-emerald-300'],
  'Client sends ID': [<PhPaperPlaneTilt weight="fill" />, 'text-sky-300'],
  'Checked with your broker': [<PhShieldCheck weight="fill" />, 'text-emerald-300'],
  'VIP access, automatically': [<PhLockKeyOpen weight="fill" />, 'text-emerald-300'],
  'Spot the risk': [<PhWarning weight="fill" />, 'text-amber-300'],
  'Open the client': [<PhUser weight="fill" />, 'text-sky-300'],
  'Act on it': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'Create a link': [<PhLink weight="fill" />, 'text-pink-300'],
  'Copy & share it': [<PhShareNetwork weight="fill" />, 'text-sky-300'],
  'Track every join': [<PhUserPlus weight="fill" />, 'text-emerald-300'],
  'All platforms': [<PhSquaresFour weight="fill" />, 'text-sky-300'],
  'Instagram': [<PhInstagramLogo weight="fill" />, 'text-pink-300'],
  'TikTok': [<PhTiktokLogo weight="fill" />, 'text-zinc-200'],
  'Someone joins': [<PhUserPlus weight="fill" />, 'text-sky-300'],
  'Source tagged': [<PhTag weight="fill" />, 'text-violet-300'],
  'Added to your CRM': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'A DM lands': [<PhChatCircle weight="fill" />, 'text-sky-300'],
  'Reply in one click': [<PhArrowBendUpLeft weight="fill" />, 'text-violet-300'],
  'Now a lead': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'Set your rule': [<PhSliders weight="fill" />, 'text-violet-300'],
  'Liquex watches': [<PhEye weight="fill" />, 'text-sky-300'],
  'Access handled': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'Client moves IB': [<PhArrowsLeftRight weight="fill" />, 'text-amber-300'],
  'You’re alerted': [<PhBellRinging weight="fill" />, 'text-amber-300'],
  'Handled for you': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'Deposit lands': [<PhCurrencyDollar weight="fill" />, 'text-emerald-300'],
  'Book updates': [<PhArrowsClockwise weight="fill" />, 'text-sky-300'],
  'Always up to date': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'AI reads every client': [<PhSparkle weight="fill" />, 'text-violet-300'],
  'Your list for today': [<PhListChecks weight="fill" />, 'text-sky-300'],
  'All done': [<PhCheckCircle weight="fill" />, 'text-emerald-300'],
  'Your numbers load': [<PhChartBar weight="fill" />, 'text-sky-300'],
  'Spot your best day': [<PhCalendarCheck weight="fill" />, 'text-pink-300'],
  'Open the post': [<PhCursorClick weight="fill" />, 'text-pink-300'],
}

function Caption({ label }: { label: string }) {
  const [icon, tone] = CAPTION[label] ?? [null, '']
  return (
    <div className="relative mt-5 h-5 text-center text-[13px] text-zinc-400">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.35 }} className="inline-flex items-center gap-1.5">
          {icon && <span className={cn('[&_svg]:size-3.5', tone)}>{icon}</span>}{label}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ── Engine ────────────────────────────────────────────────────────────── */

function useScript(durs: number[]) {
  const { ref, go } = useGo<HTMLDivElement>('-80px')
  const [s, setS] = useState(0)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (!go) return
    const id = setTimeout(() => { if (s === durs.length - 1) { setS(0); setRun(r => r + 1) } else setS(s + 1) }, durs[s])
    return () => clearTimeout(id)
  }, [go, s]) // eslint-disable-line react-hooks/exhaustive-deps
  return { ref, go, s, run }
}

const pressOf = (s: number, run: number, clicks: number[]) => { const c = [...clicks].reverse().find(c => s >= c); return c === undefined ? 0 : run * 100 + c + 1 }

function Demo({ inner, crumb, labels, at, children }: { inner: React.Ref<HTMLDivElement>; crumb: string; labels: string[]; at: number; children: React.ReactNode }) {
  const parts = crumb.split(' / ')
  return (
    <div ref={inner} className="w-full max-w-[440px]">
      <Fit w={W} h={H}>
        <div className="rounded-[22px] bg-[#070708] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]" style={{ width: W, height: H }}>
          <div className="relative h-full overflow-hidden rounded-[21px] bg-[#070708] text-[#ededed]">
            <div className="relative flex h-[45px] items-center justify-between bg-[#0b0b0c] px-4 text-[12px]">
              <span className="flex items-center gap-2 text-[#8f8f8f]">
                <LiquexMark className="size-[18px] rounded-[5px]" />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={crumb} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3 }} className="flex items-center">
                    {parts.map((c, i) => <span key={c} className={i === parts.length - 1 ? 'text-[#ededed]' : ''}>{c}{i < parts.length - 1 && <span className="mx-1.5 text-[#444]">/</span>}</span>)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[hsl(145_55%_55%)]"><span className="size-1.5 rounded-full bg-current" />Live</span>
            </div>
            <div className="relative" style={{ height: BODY }}>{children}</div>
          </div>
        </div>
      </Fit>
      <Caption label={labels[Math.min(at, labels.length - 1)]} />
    </div>
  )
}

function Cursor({ x, y, press }: { x: number; y: number; press: number }) {
  return (
    <motion.div className="pointer-events-none absolute left-0 top-0 z-50" initial={false} animate={{ x, y }} transition={{ type: 'spring', stiffness: 80, damping: 17, mass: 0.9 }}>
      <AnimatePresence>{press > 0 && <motion.span key={press} className="absolute -left-4 -top-4 size-8 rounded-full bg-white/30" initial={{ scale: 0.2, opacity: 1 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} />}</AnimatePresence>
      <motion.svg key={`c${press}`} viewBox="0 0 20 20" className="size-[19px] drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]" animate={press ? { scale: [1, 0.8, 1] } : {}} transition={{ duration: 0.28 }}>
        <path d="M3 2.5l13 6.2-5.6 1.6-2 5.6z" fill="white" stroke="rgba(0,0,0,0.6)" strokeWidth="1" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  )
}

function Type({ text, delay = 0, speed = 16 }: { text: string; delay?: number; speed?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let id = 0
    const t0 = window.setTimeout(() => { id = window.setInterval(() => setN(x => (x >= text.length ? (clearInterval(id), x) : x + 1)), speed) }, delay)
    return () => { clearTimeout(t0); clearInterval(id) }
  }, [text, delay, speed])
  return <>{text.slice(0, n)}{n < text.length && <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[hsl(248_85%_80%)]" />}</>
}

const Skel = ({ className }: { className?: string }) => <span className={cn('shimmer block rounded-md', className)} />

function AiRead({ text, chips, action, delay = 350 }: { text: string; chips?: React.ReactNode; action?: React.ReactNode; delay?: number }) {
  const after = (delay + text.length * 16) / 1000
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
      className="rounded-2xl bg-[#0f0d16]">
      <div className="rounded-2xl p-3.5">
        <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[hsl(248_85%_82%)]"><Sparkles className="size-3.5" />AI read</div>
        <p className="mt-1.5 min-h-[36px] text-[12.5px] leading-[18px] text-[#dcdcdc]"><Type text={text} delay={delay} /></p>
        {chips && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: after, duration: 0.4 }} className="mt-2.5 flex flex-wrap gap-1.5">{chips}</motion.div>}
        {action && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: after, duration: 0.4 }} className="mt-3 border-t border-white/[0.06] pt-3">{action}</motion.div>}
      </div>
    </motion.div>
  )
}

/** A sparkline area that draws itself. */
function Area({ data, color = 'hsl(248 85% 74%)', h = 44, id }: { data: number[]; color?: string; h?: number; id: string }) {
  const w = 480, mx = Math.max(...data), mn = Math.min(...data)
  const pts = data.map((v, i) => [i / (data.length - 1) * w, h - 3 - (v - mn) / (mx - mn || 1) * (h - 8)])
  const line = pts.reduce((d, p, i) => { if (!i) return `M${p[0]},${p[1]}`; const q = pts[i - 1], cx = (q[0] + p[0]) / 2; return `${d} C${cx},${q[1]} ${cx},${p[1]} ${p[0]},${p[1]}` }, '')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" aria-hidden>
      <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity="0.14" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <motion.path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
      <motion.path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease }} />
    </svg>
  )
}

const Stat = ({ k, v, loading, i = 0, tone }: { k: string; v: string; loading?: boolean; i?: number; tone?: string }) => (
  <div className="rounded-xl bg-[#0e0e0f] p-2.5">
    <div className="text-[10.5px] text-[#8f8f8f]">{k}</div>
    {loading ? <Skel className="mt-1.5 h-5 w-16" /> : <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={cn('mt-0.5 text-[19px] font-medium tracking-tight tabular-nums', tone)}><Num v={v} ms={900} /></motion.div>}
  </div>
)

const Btn = ({ done, children, doneText, hover }: { done?: boolean; children: React.ReactNode; doneText: string; hover?: boolean }) => (
  <AnimatePresence mode="wait" initial={false}>
    {done
      ? <motion.span key="d" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[hsl(145_55%_55%/0.15)] text-[12.5px] font-medium text-[hsl(145_55%_60%)]"><Check className="size-3.5" strokeWidth={2.5} />{doneText}</motion.span>
      : <motion.span key="b" exit={{ opacity: 0, scale: 0.97 }} className={cn('flex h-9 items-center justify-center rounded-xl bg-white text-[12.5px] font-medium text-black transition-transform', hover && 'scale-[1.02] shadow-[0_0_0_4px_rgba(255,255,255,0.08)]')}>{children}</motion.span>}
  </AnimatePresence>
)

const rowIn = { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.5, ease } }

/* ── Grow: pick a post → stats load → AI read ─────────────────────────── */

const POSTS = [
  { t: 'My morning routine', m: <InstagramMark className="size-3" />, k: 'Reel', v: '184K', j: 96, tone: 0 },
  { t: 'Gold setup this week', m: <TikTokMark className="size-3" />, k: 'Video', v: '88K', j: 41, tone: 1 },
  { t: 'How I trade NFP', m: <YouTubeMark className="size-3" />, k: 'Video', v: '52K', j: 27, tone: 0 },
  { t: 'Day in the life', m: <InstagramMark className="size-3" />, k: 'Reel', v: '31K', j: 14, tone: 1 },
  { t: 'Why most traders lose', m: <TikTokMark className="size-3" />, k: 'Video', v: '24K', j: 9, tone: 0 },
]

export function GrowFlow() {
  const { ref, s, run } = useScript([1300, 1000, 450, 1200, 1700, 4200, 1600])
  const detail = s >= 3
  const at = s < 3 ? 0 : s < 5 ? 1 : 2
  const cur: [number, number] = s === 0 ? [440, 300] : s <= 2 ? [200, 108] : s <= 4 ? [470, 200] : [440, 352]
  return (
    <Demo inner={ref} crumb={detail ? 'Growth / Content / Post' : 'Growth / Content'} labels={['Pick a post', 'Stats load', 'AI read']} at={at}>
      <AnimatePresence mode="wait" initial={false}>
        {!detail ? (
          <motion.div key={`l${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }} className="absolute inset-0 p-4">
            <div className="flex items-center justify-between"><span className="text-[15px] font-medium">Top posts</span><span className="rounded-full bg-[#141414] px-2.5 py-1 text-[11px] text-[#b3b3b3]">Last 30 days</span></div>
            <div className="mt-3 grid grid-cols-[1fr_60px_50px] px-2 pb-1.5 text-[10.5px] text-[#8f8f8f]"><span>Post</span><span className="text-right">Views</span><span className="text-right">Joins</span></div>
            {POSTS.map((p, i) => (
              <div key={p.t} className={cn('grid grid-cols-[1fr_60px_50px] items-center rounded-xl px-2 py-1.5 text-[12.5px] transition-colors duration-300', i === 0 && s === 1 && 'bg-white/[0.05]', i === 0 && s === 2 && 'bg-[hsl(248_85%_74%/0.16)]')}>
                <span className="flex min-w-0 items-center gap-2.5"><ReelThumb caption="" views="" tone={p.tone} mark={false} className="h-[44px] w-[32px] shrink-0 rounded-md" /><span className="min-w-0"><span className="block truncate">{p.t}</span><span className="flex items-center gap-1 text-[10.5px] text-[#8f8f8f]">{p.m}{p.k}</span></span></span>
                <span className="text-right tabular-nums text-[#b3b3b3]">{p.v}</span><span className="text-right font-medium tabular-nums">{p.j}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key={`d${run}`} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="absolute inset-0 p-4">
            <div className="flex items-center gap-3">
              <ReelThumb caption="" views="" tone={0} className="h-[62px] w-[46px] shrink-0 rounded-lg" />
              <div><div className="flex items-center gap-1 text-[11px] text-[#8f8f8f]">Top posts<ChevronRight className="size-3" /></div><div className="mt-0.5 text-[16px] font-medium">My morning routine</div><div className="mt-1 flex gap-1.5"><Chip><InstagramMark />Reel</Chip><Chip>4 Oct</Chip></div></div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat k="Views" v="184K" loading={s === 3} /><Stat k="Joins" v="96" loading={s === 3} i={1} /><Stat k="Deposited" v="$12.4K" loading={s === 3} i={2} tone="text-[hsl(145_55%_55%)]" />
            </div>
            <div className="mt-2 rounded-xl bg-[#0e0e0f] px-3 pb-1 pt-2.5">
              <div className="flex justify-between text-[10.5px] text-[#8f8f8f]"><span>Joins after posting</span><span>48h</span></div>
              {s === 3 ? <Skel className="mt-2 h-[40px] w-full" /> : <Area id={`gf${run}`} data={[2, 10, 26, 44, 38, 28, 20, 14, 10, 7, 5, 4]} h={42} />}
            </div>
            {s >= 5 && <div className="mt-2.5"><AiRead text="Lifestyle hook in the first 2 seconds and a clear “DM me” ending. 38× your usual joins — post more like this." chips={<><Chip>Lifestyle</Chip><Chip>Hook · 2s</Chip><Chip>CTA · DM me</Chip></>} /></div>}
          </motion.div>
        )}
      </AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [2])} />
    </Demo>
  )
}

/* ── Convert: someone joins → becomes a lead → open them → send verify link ── */

const PEOPLE = [['Leo Turner', 'Lead', 'Bio', '12m'], ['Chloe Martin', 'Joined', 'DM', '22m'], ['Noah Price', 'Verified', 'DM', '1h'], ['Maya Ross', 'Joined', 'Bio', '1h'], ['Ethan Cole', 'Joined', 'Bio', '2h']] as const

export function ConvertFlow() {
  const { ref, s, run } = useScript([1400, 1300, 1500, 900, 450, 2700, 900, 450, 2100])
  const stage = s < 2 ? 'Joined' : s < 7 ? 'Lead' : 'Submitted'
  const at = s < 2 ? 0 : s < 3 ? 1 : s < 6 ? 2 : 3
  const cur: [number, number] = s <= 2 ? [470, 320] : s <= 4 ? [170, 112] : s === 5 ? [430, 200] : [390, 345]
  const panel = s >= 5
  return (
    <Demo inner={ref} crumb={panel ? 'CRM / Ava Morgan' : 'CRM'} labels={['New join', 'Becomes a lead', 'See their story', 'Verify them']} at={at}>
      <div className="absolute inset-0 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-[#0d0d0d] p-1 text-[11.5px]">{['All', 'Joined', 'Leads', 'Verified'].map((t, i) => <span key={t} className={cn('rounded-full px-2.5 py-1', i === 0 ? 'bg-[#171717] text-white' : 'text-[#8f8f8f]')}>{t}</span>)}</div>
          <span className="text-[11.5px] text-[#8f8f8f]"><Live v={(1486 + (s >= 1 ? 1 : 0)).toLocaleString()} /> people</span>
        </div>
        <div className="mt-3 grid grid-cols-[1.6fr_.8fr_.7fr_.5fr] px-2 pb-1.5 text-[10.5px] text-[#8f8f8f]"><span>Person</span><span>Stage</span><span>Source</span><span className="text-right">Joined</span></div>
        <AnimatePresence initial={false}>
          {s >= 1 && (
            <motion.div key={`ava${run}`} {...rowIn} className="overflow-hidden">
              <div className={cn('grid grid-cols-[1.6fr_.8fr_.7fr_.5fr] items-center rounded-xl px-2 py-2 text-[12.5px] transition-colors duration-[1200ms]', s <= 4 ? 'bg-[hsl(248_85%_74%/0.12)]' : 'bg-white/[0.03]')}>
                <span className="flex min-w-0 items-center gap-2"><Initials n="Ava Morgan" i={2} /><span className="min-w-0"><span className="block">Ava Morgan</span>
                  <AnimatePresence mode="wait">{s >= 2 ? <motion.span key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="block truncate text-[10.5px] text-[hsl(248_85%_82%)]">“How do I join VIP?”</motion.span> : <span className="block text-[10.5px] text-[#8f8f8f]">No username</span>}</AnimatePresence></span></span>
                <span><AnimatePresence mode="wait"><motion.span key={stage} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="inline-block"><Badge s={stage} /></motion.span></AnimatePresence></span>
                <span><Chip><InstagramMark />Bio</Chip></span><span className="text-right text-[11px] text-[#8f8f8f]">now</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {PEOPLE.map(([n, st, src, t], i) => (
          <div key={n} className="grid grid-cols-[1.6fr_.8fr_.7fr_.5fr] items-center px-2 py-2 text-[12.5px]">
            <span className="flex items-center gap-2"><Initials n={n} i={i + 3} /><span>{n}</span></span><span><Badge s={st} /></span><span><Chip><InstagramMark />{src}</Chip></span><span className="text-right text-[11px] text-[#8f8f8f]">{t}</span>
          </div>
        ))}
      </div>

      {/* the join, as it lands */}
      <AnimatePresence>
        {s === 1 && (
          <motion.div key={`t${run}`} initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}
            className="absolute right-3 top-3 z-20 flex w-[250px] items-center gap-2.5 rounded-xl bg-[#111112] p-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <span className="grid size-7 place-items-center rounded-full bg-[hsl(248_85%_74%/0.15)] text-[hsl(248_85%_80%)]"><UserPlus className="size-3.5" /></span>
            <span className="text-[11.5px] leading-4"><b className="font-medium">Ava Morgan</b> joined your channel via <span className="text-[#b3b3b3]">Instagram · Bio</span></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* her profile */}
      <AnimatePresence>
        {panel && (
          <motion.div key={`p${run}`} initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ duration: 0.55, ease }}
            className="absolute bottom-0 right-0 top-0 z-10 w-[300px] bg-[#0b0b0c] p-4 shadow-[-30px_0_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-violet-300 to-indigo-500 text-[13px] font-semibold text-white">AM</span>
              <div className="flex-1"><div className="text-[14px] font-medium">Ava Morgan</div><div className="flex items-center gap-1 text-[11px] text-[hsl(199_85%_65%)]"><TelegramMark className="size-3" />@avamorgan</div></div>
              <AnimatePresence mode="wait"><motion.span key={stage} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><Badge s={stage} /></motion.span></AnimatePresence>
            </div>
            <div className="mt-3 rounded-xl bg-[#101012] p-2.5 text-[11.5px]">
              <div className="text-[10.5px] text-[#8f8f8f]">Came from</div>
              <div className="mt-1 flex items-center justify-between"><span className="flex items-center gap-1.5"><InstagramMark className="size-3.5" />Instagram · Bio</span><span className="font-mono text-[10.5px] text-[#8f8f8f]">liquex.link/ig-bio</span></div>
            </div>
            <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Timeline</div>
            <div className="relative mt-2 space-y-3 pl-4 before:absolute before:bottom-1 before:left-[3px] before:top-1 before:w-px before:bg-white/[0.08]">
              {[[<Play />, 'Watched “My morning routine”', '11:58'], [<UserPlus />, 'Joined your channel', '12:02'], [<MessageCircle />, 'Messaged: “How do I join VIP?”', '12:04']].map(([ic, t, tm], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.35, duration: 0.4 }} className="relative flex items-center gap-2 text-[11.5px]">
                  <span className="absolute -left-4 top-1 size-[7px] rounded-full bg-[hsl(248_85%_74%)] ring-2 ring-[#0b0b0c]" />
                  <span className="text-[#8f8f8f] [&_svg]:size-3">{ic}</span><span className="flex-1 truncate">{t}</span><span className="text-[10.5px] text-[#8f8f8f]">{tm}</span>
                </motion.div>
              ))}
            </div>
            <div className="absolute inset-x-4 bottom-4"><Btn done={s >= 7} hover={s === 6} doneText="Verify link sent">Send verify link</Btn></div>
          </motion.div>
        )}
      </AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [4, 7])} />
    </Demo>
  )
}

/* ── Verify: client sends ID in Telegram → broker checks → VIP ────────── */

const CHECKS = ['Under your IB', 'Eligible account type', 'Balance over $100']

export function VerifyFlow() {
  const { ref, s, run } = useScript([1100, 1700, 700, 900, 900, 900, 1500, 1900, 1400])
  const at = s < 3 ? 0 : s < 6 ? 1 : 2
  const ok = s >= 6
  return (
    <Demo inner={ref} crumb="Verification" labels={['Client sends ID', 'Checked with your broker', 'VIP access, automatically']} at={at}>
      <div className="absolute inset-0 grid grid-cols-[222px_1fr] gap-3 p-4">
        {/* Telegram */}
        <div key={`tg${run}`} className="flex flex-col overflow-hidden rounded-2xl bg-[#17212b]">
          <div className="flex items-center gap-2 bg-[#1f2c3a] px-3 py-2.5"><span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-blue-500 text-[9px] font-bold text-white">VIP</span><div className="leading-tight"><div className="text-[12px] font-medium">Your VIP Bot</div><div className="text-[10px] text-sky-300">bot</div></div></div>
          <div className="flex flex-1 flex-col gap-2 p-2.5 text-[11.5px] leading-4">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-[85%] rounded-xl rounded-bl-sm bg-[#182533] px-2.5 py-1.5">Send your broker account ID to join the VIP.</motion.div>
            {s >= 2 && <motion.div initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="ml-auto rounded-xl rounded-br-sm bg-[#2b5278] px-2.5 py-1.5 font-mono">24881364</motion.div>}
            {s >= 3 && !ok && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-fit gap-1 rounded-xl bg-[#182533] px-3 py-2">{[0, 1, 2].map(i => <motion.span key={i} className="size-1.5 rounded-full bg-white/50" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />)}</motion.div>}
            {ok && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-[90%] rounded-xl rounded-bl-sm bg-[#182533] px-2.5 py-1.5">Verified — you’re in. 🎉<div className="mt-1.5 rounded-lg bg-white/[0.06] py-1 text-center text-[11px] text-sky-300">Open VIP channel</div></motion.div>}
          </div>
          <div className="m-2 flex items-center rounded-full bg-[#1f2c3a] px-3 py-1.5 font-mono text-[11.5px] text-white/80">{s === 1 ? <Type text="24881364" speed={110} /> : <span className="font-sans text-white/30">Message</span>}</div>
        </div>
        {/* Liquex */}
        <div className="flex flex-col rounded-2xl bg-[#0c0c0d] p-3">
          <div className="text-[12.5px] font-medium">Incoming</div>
          <AnimatePresence mode="wait">
            {s < 2 ? (
              <motion.div key="w" exit={{ opacity: 0 }} className="mt-3 flex flex-1 flex-col items-center justify-center gap-2 text-[11.5px] text-[#8f8f8f]"><span className="size-5 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />Waiting for requests…</motion.div>
            ) : (
              <motion.div key={`r${run}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex-1">
                <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] p-2.5"><Initials n="Chloe Martin" i={1} /><div className="min-w-0 flex-1 text-[12px]"><div>Chloe Martin</div><div className="font-mono text-[10.5px] text-[#8f8f8f]">ID 24881364</div></div>
                  <AnimatePresence mode="wait"><motion.span key={ok ? 'v' : 's'} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><Badge s={ok ? 'Verified' : 'Submitted'} /></motion.span></AnimatePresence></div>
                <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Checking with your broker</div>
                <div className="mt-1.5 space-y-1.5">
                  {CHECKS.map((c, i) => {
                    const done = s > 3 + i, spin = s === 3 + i
                    return (
                      <div key={c} className="flex items-center justify-between rounded-lg bg-white/[0.025] px-2.5 py-2 text-[11.5px]">
                        <span className={done ? 'text-[#ededed]' : 'text-[#8f8f8f]'}>{c}</span>
                        {done ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="grid size-4 place-items-center rounded-full bg-[hsl(145_55%_55%)] text-black"><Check className="size-2.5" strokeWidth={3} /></motion.span>
                          : spin ? <span className="size-3.5 animate-spin rounded-full border-[1.5px] border-white/15 border-t-[hsl(248_85%_74%)]" /> : <span className="size-4 rounded-full ring-1 ring-white/10" />}
                      </div>
                    )
                  })}
                </div>
                {s >= 7 && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center justify-between rounded-xl bg-[hsl(145_55%_55%/0.1)] px-3 py-2.5 text-[11.5px]"><span className="text-[hsl(145_55%_62%)]">Added to VIP channel</span><span className="text-[#b3b3b3]">Members <Live v="215" /></span></motion.div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Demo>
  )
}

/* ── Retain: a client goes quiet → open them → AI read → act ─────────── */

const CLIENTS = [['Daniel Reyes', 'Active', '$24,820', '1d'], ['Leo Turner', 'Active', '$15,930', '1d'], ['Maya Ross', 'Active', '$14,205', '2d'], ['Noah Price', 'Dormant', '$6,611', '2mo']] as const

export function RetainFlow() {
  const { ref, s, run } = useScript([1400, 1500, 900, 450, 1600, 4300, 900, 450, 2000])
  const detail = s >= 4
  const at = s < 2 ? 0 : s < 5 ? 1 : s < 6 ? 2 : 3
  const cur: [number, number] = s <= 1 ? [470, 330] : s <= 3 ? [440, 64] : s <= 5 ? [470, 175] : [390, 344]
  const risk = s >= 1
  return (
    <Demo inner={ref} crumb={detail ? 'Clients / Isla Grant' : 'Clients'} labels={['Spot the risk', 'Open the client', 'AI read', 'Act on it']} at={at}>
      <AnimatePresence mode="wait" initial={false}>
        {!detail ? (
          <motion.div key={`l${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }} className="absolute inset-0 p-4">
            <AnimatePresence>
              {risk && (
                <motion.div {...rowIn} className="overflow-hidden">
                  <div className={cn('mb-3 flex items-center gap-2.5 rounded-xl bg-[hsl(38_90%_60%/0.10)] px-3 py-2.5 text-[12px] ring-1 ring-[hsl(38_90%_60%/0.25)] transition-transform', s >= 2 && 'scale-[1.01]')}>
                    <AlertTriangle className="size-4 shrink-0 text-[hsl(38_90%_60%)]" />
                    <span className="flex-1"><b className="font-medium">Isla Grant</b> hasn’t traded in 14 days · <span className="text-[hsl(38_90%_65%)]">$8,940 at risk</span></span>
                    <span className="flex items-center text-[11px] text-[#b3b3b3]">View<ChevronRight className="size-3" /></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="grid grid-cols-[1.6fr_.8fr_.8fr_.5fr] px-2 pb-1.5 text-[10.5px] text-[#8f8f8f]"><span>Client</span><span>Stage</span><span className="text-right">Balance</span><span className="text-right">Last trade</span></div>
            {[['Isla Grant', risk ? 'At risk' : 'Active', '$8,940', risk ? '14d' : '1d'], ...CLIENTS].map(([n, st, b, t], i) => (
              <div key={n} className={cn('grid grid-cols-[1.6fr_.8fr_.8fr_.5fr] items-center rounded-xl px-2 py-2 text-[12.5px] transition-colors duration-700', i === 0 && risk && 'bg-[hsl(38_90%_60%/0.06)]')}>
                <span className="flex items-center gap-2"><Initials n={n} i={i} /><span>{n}</span></span>
                <span><AnimatePresence mode="wait"><motion.span key={st} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block"><Badge s={st} /></motion.span></AnimatePresence></span>
                <span className="text-right tabular-nums">{b}</span><span className={cn('text-right text-[11.5px] tabular-nums', t === '14d' || t === '2mo' ? 'text-[hsl(0_80%_66%)]' : 'text-[hsl(145_55%_55%)]')}>{t}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key={`d${run}`} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="absolute inset-0 p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-500 text-[13px] font-semibold text-black/70">IG</span>
              <div className="flex-1"><div className="text-[15px] font-medium">Isla Grant</div><div className="font-mono text-[11px] text-[#8f8f8f]">9981277 · Standard STP</div></div><Badge s="At risk" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat k="Balance" v="$8,940" loading={s === 4} /><Stat k="Last trade" v="14 days" loading={s === 4} i={1} tone="text-[hsl(38_90%_62%)]" /><Stat k="Deposited" v="$12,400" loading={s === 4} i={2} />
            </div>
            <div className="mt-2 rounded-xl bg-[#0e0e0f] px-3 pb-1 pt-2.5">
              <div className="flex justify-between text-[10.5px] text-[#8f8f8f]"><span>Balance</span><span className="text-[hsl(0_80%_66%)]">−$1,494</span></div>
              {s === 4 ? <Skel className="mt-2 h-[34px] w-full" /> : <Area id={`rf${run}`} data={[10.4, 10.6, 10.9, 10.7, 10.8, 10.5, 9.9, 9.6, 9.3, 9.1, 9.0, 8.94]} color="hsl(38 90% 60%)" h={36} />}
            </div>
            {s >= 5 && <div className="mt-2.5"><AiRead text="Traded gold every day until the last drop, then went quiet. Down $1,494 — clients like this usually move IB within a month."
              action={<div className="flex items-center gap-3"><span className="flex-1 text-[11.5px] text-[#8f8f8f]">Next step<span className="block text-[12.5px] text-[#ededed]">Call her today</span></span><span className="w-[150px]"><Btn done={s >= 7} hover={s === 6} doneText="Reminder set">Set reminder</Btn></span></div>} /></div>}
          </motion.div>
        )}
      </AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [3, 7])} />
    </Demo>
  )
}

/* ── Links: create a link → copy it → joins roll in ───────────────────── */

function Ticker({ to, every = 520 }: { to: number; every?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => { const id = setInterval(() => setN(x => (x >= to ? x : x + 1)), every); return () => clearInterval(id) }, [to, every])
  return <Live v={String(n)} />
}

const LROWS = [['instagram-dm', 'Instagram · DM', 642, 198], ['instagram-bio', 'Instagram · Bio', 518, 162], ['tiktok-bio', 'TikTok · Bio', 74, 21], ['youtube-description', 'YouTube · Description', 22, 8]] as const

export function LinksFlow() {
  const { ref, s, run } = useScript([1100, 900, 450, 1500, 900, 450, 1000, 3200, 1200])
  const modal = s >= 2 && s <= 5
  const at = s < 5 ? 0 : s < 7 ? 1 : 2
  const cur: [number, number] = s === 0 ? [300, 300] : s <= 2 ? [470, 26] : s === 3 ? [200, 170] : s <= 5 ? [270, 300] : [420, 330]
  return (
    <Demo inner={ref} crumb="Growth / Links" labels={['Create a link', 'Copy & share it', 'Track every join']} at={at}>
      <div className="absolute inset-0 p-4">
        <div className="flex items-center justify-between"><span className="text-[15px] font-medium">Links</span><span className={cn('flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-black transition-transform', s === 1 && 'scale-105')}><Plus className="size-3" />New link</span></div>
        <div className="mt-3 grid grid-cols-[1.7fr_.6fr_.6fr] px-2 pb-1.5 text-[10.5px] text-[#8f8f8f]"><span>Source</span><span className="text-right">Joined</span><span className="text-right">Leads</span></div>
        <AnimatePresence initial={false}>
          {s >= 6 && (
            <motion.div key={`n${run}`} {...rowIn} className="overflow-hidden">
              <div className="grid grid-cols-[1.7fr_.6fr_.6fr] items-center rounded-xl bg-[hsl(248_85%_74%/0.12)] px-2 py-2 text-[12.5px]">
                <span><span className="block">instagram-reel</span><span className="text-[10.5px] text-[#8f8f8f]">Instagram · Reel · new</span></span>
                <span className="text-right font-medium tabular-nums">{s >= 7 ? <Ticker to={7} /> : '0'}</span><span className="text-right tabular-nums">{s >= 7 ? <Ticker to={3} every={1100} /> : '0'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {LROWS.map(([n, p, j, l]) => (
          <div key={n} className="grid grid-cols-[1.7fr_.6fr_.6fr] items-center px-2 py-2 text-[12.5px]"><span><span className="block">{n}</span><span className="text-[10.5px] text-[#8f8f8f]">{p}</span></span><span className="text-right tabular-nums">{j}</span><span className="text-right tabular-nums text-[#b3b3b3]">{l}</span></div>
        ))}
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div key={`m${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 grid place-items-center bg-black/55 backdrop-blur-[2px]">
            <motion.div initial={{ scale: 0.94, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.4, ease }} className="w-[340px] rounded-2xl bg-[#141415] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <div className="text-[14px] font-medium">New link</div>
              <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Platform</div>
              <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                {[[<InstagramMark className="size-4" />, 'Instagram'], [<TikTokMark className="size-4" />, 'TikTok'], [<YouTubeMark className="size-4" />, 'YouTube'], [<TelegramMark className="size-4" />, 'Telegram']].map(([m, k], i) => (
                  <span key={k as string} className={cn('flex flex-col items-center gap-1 rounded-xl py-2 text-[10.5px] ring-1 transition-colors duration-300', i === 0 && s >= 3 ? 'bg-[hsl(248_85%_74%/0.14)] text-white ring-[hsl(248_85%_74%/0.5)]' : 'text-[#8f8f8f] ring-white/[0.06]')}>{m}{k}</span>
                ))}
              </div>
              <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Placement</div>
              <div className="mt-1.5 flex gap-1.5">{['Bio', 'DM', 'Reel', 'Story'].map(p => <span key={p} className={cn('rounded-lg px-2.5 py-1 text-[11px] ring-1 transition-colors duration-300', p === 'Reel' && s >= 3 ? 'bg-[hsl(248_85%_74%/0.14)] text-white ring-[hsl(248_85%_74%/0.5)]' : 'text-[#8f8f8f] ring-white/[0.06]')}>{p}</span>)}</div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 font-mono text-[11.5px]"><span>liquex.link/{s >= 3 ? <Type text="ig-reel" speed={60} /> : <span className="text-white/30">…</span>}</span><Copy className="size-3.5 text-[#8f8f8f]" /></div>
              <div className="mt-3"><Btn done={s >= 5} hover={s === 4} doneText="Created · link copied">Create link</Btn></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [2, 5])} />
    </Demo>
  )
}

/* ── Platforms: switch platform → everything re-draws ─────────────────── */

const PF = [
  { k: 'All platforms', joins: '2,140', views: '1.8M', clients: '104', split: [['Instagram', 62], ['TikTok', 26], ['YouTube', 12]], line: [3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15] },
  { k: 'Instagram', joins: '1,320', views: '1.1M', clients: '64', split: [['Reels', 70], ['Carousels', 18], ['Stories', 12]], line: [2, 3, 3, 5, 4, 7, 6, 8, 9, 10, 9, 12] },
  { k: 'TikTok', joins: '560', views: '520K', clients: '21', split: [['Videos', 84], ['Lives', 16]], line: [4, 3, 5, 4, 6, 5, 4, 6, 7, 6, 8, 9] },
] as const

export function PlatformsFlow() {
  const { ref, s, run } = useScript([2600, 800, 450, 2600, 800, 450, 2600])
  const tab = s < 3 ? 0 : s < 6 ? 1 : 2
  const p = PF[tab]
  const cur: [number, number] = s === 0 ? [380, 280] : s <= 2 ? [128, 28] : s === 3 ? [380, 260] : [212, 28]
  return (
    <Demo inner={ref} crumb={`Growth / ${p.k}`} labels={['All platforms', 'Instagram', 'TikTok']} at={tab}>
      <div className="absolute inset-0 p-4">
        <div className="flex items-center gap-1 rounded-full bg-[#0d0d0d] p-1 text-[11.5px] w-fit">
          {[['All', null], ['Instagram', <InstagramMark className="size-3" />], ['TikTok', <TikTokMark className="size-3" />]].map(([t, m], i) => (
            <span key={t as string} className="relative flex items-center gap-1 rounded-full px-3 py-1">
              {i === tab && <motion.span layoutId={`pft${run}`} className="absolute inset-0 rounded-full bg-[#19191b]" transition={{ duration: 0.4, ease }} />}
              <span className={cn('relative flex items-center gap-1', i === tab ? 'text-white' : 'text-[#8f8f8f]')}>{m}{t}</span>
            </span>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={`${tab}-${run}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease }}>
            <div className="mt-3 grid grid-cols-3 gap-2"><Stat k="Joins" v={p.joins} /><Stat k="Views" v={p.views} i={1} /><Stat k="Clients" v={p.clients} i={2} tone="text-[hsl(145_55%_55%)]" /></div>
            <div className="mt-2 rounded-xl bg-[#0e0e0f] px-3 pb-1 pt-2.5"><div className="text-[10.5px] text-[#8f8f8f]">Joins over time</div><Area id={`pf${tab}${run}`} data={[...p.line]} h={58} /></div>
            <div className="mt-2 rounded-xl bg-[#0e0e0f] p-3">
              <div className="text-[10.5px] text-[#8f8f8f]">{tab === 0 ? 'Share of joins' : 'By format'}</div>
              <div className="mt-2 flex h-14 gap-1">
                {p.split.map(([k, v], i) => <motion.span key={k} initial={{ flexGrow: 0.001 }} animate={{ flexGrow: v }} transition={{ duration: 0.8, delay: i * 0.08, ease }} className="flex min-w-[4px] items-end overflow-hidden rounded-lg bg-[hsl(248_85%_74%)] p-1.5 text-[10.5px] font-medium text-white" style={{ opacity: [1, 0.68, 0.45][i] }}>{v >= 14 && `${v}%`}</motion.span>)}
              </div>
              <div className="mt-2 flex gap-3 text-[11px] text-[#b3b3b3]">{p.split.map(([k], i) => <span key={k} className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[hsl(248_85%_74%)]" style={{ opacity: [1, 0.68, 0.45][i] }} />{k}</span>)}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [2, 5])} />
    </Demo>
  )
}

/* ── Full-window demos (Grow page hero + showcase) ─────────────────────── */

/** A cursor that finds its target by `data-hot` inside `root` — so it always lands on the real element. */
function SmartCursor({ root, target, press, w }: { root: React.RefObject<HTMLDivElement | null>; target: string; press: number; w: number }) {
  const [pos, setPos] = useState<[number, number]>([w - 120, 520])
  useLayoutEffect(() => {
    const measure = () => {
      const r = root.current; if (!r) return
      const el = r.querySelector<HTMLElement>(`[data-hot="${target}"]`)
      const rr = r.getBoundingClientRect(), k = rr.width / w || 1
      if (!el) return
      const e = el.getBoundingClientRect()
      setPos([(e.left + e.width * 0.55 - rr.left) / k, (e.top + e.height * 0.6 - rr.top) / k])
    }
    measure(); const a = setTimeout(measure, 380); const b = setTimeout(measure, 800)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [target, root, w])
  return <Cursor x={pos[0]} y={pos[1]} press={press} />
}

const DAYS = ['14 Sep', '17 Sep', '20 Sep', '23 Sep', '26 Sep', '29 Sep', '2 Oct', '5 Oct', '8 Oct', '11 Oct']
const VBARS = [4, 18, 62, 88, 58, 14, 6, 92, 3, 12, 98, 18, 38, 54, 12, 20, 2, 8, 30, 22, 38, 20, 14, 2, 6, 20, 24, 2, 12, 14]
const VLINE = [10, 4, 48, 12, 80, 26, 4, 30, 6, 52, 18, 50, 8, 22, 4, 3, 10, 20, 46, 14, 30, 22, 6, 4, 12, 36, 8, 6, 4, 2].map(v => v * 1.6)
const HW = 1180, HH = 720

const TOP = [['My morning routine', '184K', 96, 0, 'Reel'], ['Gold setup this week', '88K', 41, 1, 'Video'], ['How I trade NFP', '52K', 27, 0, 'Video'], ['Day in the life', '31K', 14, 1, 'Reel']] as const

export function GrowHeroFlow() {
  const { ref: goRef, s, run } = useScript([1100, 2300, 1700, 900, 450, 1900, 900, 450, 4600, 1400])
  const root = useRef<HTMLDivElement>(null)
  const posts = s >= 5
  const panel = s >= 8
  const target = s <= 1 ? 'idle' : s === 2 ? 'peak' : s <= 4 ? 'posts' : s === 5 ? 'idle2' : 'post0'
  return (
    <div ref={goRef} className="mx-auto w-full max-w-[1180px]">
      <div className="relative">
        <Fit w={HW} h={HH} minScale={0.5}>
          <div ref={root} className="relative" style={{ width: HW, height: HH }}>
            <AppWindow active="growth" title="Growth">
              <div className="flex items-center justify-between">
                <PillTabs items={['Content', 'Links', 'CTAs']} active="Content" />
                <div className="inline-flex items-center rounded-full bg-[#0d0d0d] p-1">
                  {['Overview', 'Playbook', 'Posts'].map(t => <span key={t} data-hot={t === 'Posts' ? 'posts' : undefined} className={cn('rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300', (t === 'Posts') === posts ? 'bg-[#141414] text-[#ededed]' : 'text-[#8f8f8f]', t === 'Posts' && (s === 3 || s === 4) && !posts && 'bg-white/[0.06] text-white')}>{t}</span>)}
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {!posts ? (
                  <motion.div key={`o${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                    <div className="mt-5 grid grid-cols-4 gap-4">
                      {s === 0 ? [0, 1, 2, 3].map(i => <Card key={i} className="h-[150px] p-4"><Skel className="h-4 w-20" /><Skel className="mt-4 h-7 w-28" /><Skel className="mt-3 h-4 w-24" /><Skel className="mt-4 h-8 w-full" /></Card>) : <>
                        <Kpi title="Views" value="1.8M" delta={<DeltaPill v="18.0%" note="vs prev 30D" />} viz={<MiniBars values={[1, 2, 1, 1, 2, 1, 3, 2, 1, 0, 1, 9, 1, 2, 3, 1, 0, 6, 2, 1, 7, 1, 2, 1, 1, 0, 1, 2, 1, 1]} />} />
                        <Kpi title="Joins" value="2,140" delta={<DeltaPill v="24.0%" note="vs prev 30D" />} viz={<DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3]} />} />
                        <Kpi title="New clients" value="104" delta={<DeltaPill v="31.0%" note="vs prev 30D" />} viz={<Line values={[2, 3, 3, 4, 5, 5, 6, 7, 8, 9]} />} />
                        <Kpi title="Deposited" value="$38,240" delta={<DeltaPill v="12.0%" note="vs prev 30D" />} viz={<Line values={[5, 4, 6, 6, 7, 8, 7, 9, 10, 11]} color={T.success} />} />
                      </>}
                    </div>
                    <div className="mt-4 grid grid-cols-[1.75fr_1fr] gap-4">
                      <Card className="relative p-6">
                        <CardHead title="Views and joins" right={<span className="flex items-center gap-4 text-[12px] text-[#8f8f8f]"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#555]" />Views</span><span className="flex items-center gap-1.5"><span className="h-px w-3 bg-[hsl(248_85%_74%)]" />Joins</span></span>} />
                        <div className="mt-2 flex items-center gap-3"><span className="text-[30px] font-medium tracking-tight">{s === 0 ? <Skel className="h-8 w-24" /> : <Num v="1.8M" />}</span>{s > 0 && <DeltaPill v="18.0%" />}<span className="text-[12.5px] text-[#8f8f8f]">1 in 840 viewers joined</span></div>
                        <div className="mt-4 h-[248px]">{s === 0 ? <Skel className="h-full w-full" /> : <BarsWithLine bars={VBARS} line={VLINE} lineColor={T.accent} dashed={false} labels={DAYS} yTicks={['0', '150K', '300K', '450K']} topLabel="412K" h={248} />}</div>
                        <span data-hot="peak" className="absolute" style={{ left: 24 + 40 + (10 + 0.5) * ((710 - 40) / 30), top: 150 }} />
                        <AnimatePresence>{s >= 2 && s <= 4 && (
                          <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                            className="absolute z-20 w-[230px] rounded-xl bg-[#131315] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" style={{ left: 330, top: 110 }}>
                            <div className="text-[11.5px] text-[#8f8f8f]">24 Sep</div>
                            <div className="mt-1 flex items-center gap-2.5"><ReelThumb caption="" views="" tone={0} mark={false} className="h-10 w-7 rounded-md" /><div className="text-[12.5px]"><div>My morning routine</div><div className="text-[#8f8f8f]">412K views · <span className="text-[hsl(248_85%_80%)]">96 joins</span></div></div></div>
                          </motion.div>)}</AnimatePresence>
                      </Card>
                      <Card className="p-6">
                        <CardHead title="When to post" />
                        <div className="mt-2 text-[20px] font-medium tracking-tight">Best on Thursday around 19:00</div>
                        <div className="mt-1 text-[12.5px] text-[#8f8f8f]">Typical views per post, by the day it went out</div>
                        <div className="mt-5 flex h-[200px] items-end gap-2">
                          {[['Mon', 58], ['Tue', 52], ['Wed', 61], ['Thu', 100], ['Fri', 66], ['Sat', 48], ['Sun', 50]].map(([d, v], i) => (
                            <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                              <span className="text-[11px] text-[#8f8f8f]">{Math.round((v as number) * 0.11)}K</span>
                              <motion.span initial={{ height: 0 }} animate={{ height: s === 0 ? 0 : `${v}%` }} transition={{ delay: 0.2 + i * 0.06, duration: 0.8, ease }} className={cn('w-full rounded-lg', d === 'Thu' ? 'bg-[hsl(248_85%_74%)]' : 'bg-[#222222]')} />
                              <span className="text-[11.5px] text-[#b3b3b3]">{d}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={`p${run}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="mt-5 grid grid-cols-[1.4fr_1fr] gap-4">
                    <Card className="p-6">
                      <CardHead title="Top posts" right={<Ghost>View all</Ghost>} />
                      <div className="mt-4 grid grid-cols-4 gap-3">
                        {TOP.map(([t, v, j, tone, k], i) => (
                          <motion.div key={t} data-hot={`post${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5, ease }}
                            className={cn('rounded-xl p-1.5 transition-colors duration-300', i === 0 && s >= 6 && 'bg-white/[0.06]', i === 0 && s >= 7 && 'bg-[hsl(248_85%_74%/0.16)]')}>
                            <div className="relative"><ReelThumb caption="" views="" tone={tone} mark={false} className="aspect-[3/4] w-full rounded-lg" /><span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[12px] font-medium text-white">{i % 2 ? <TikTokMark className="size-3" /> : <InstagramMark className="size-3" />}{v}</span></div>
                            <div className="mt-2 truncate text-[13px]">{t}</div>
                            <div className="text-[11.5px] text-[#8f8f8f]">{k} · <span className="text-[hsl(248_85%_80%)]">{j} joins</span></div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                    <Card className="p-6">
                      <CardHead title="Formats" right={<span className="text-[12px] text-[#8f8f8f]">share of joins</span>} />
                      <Split items={[{ label: 'Reel', value: 62, hint: '28 posts' }, { label: 'Video', value: 22, hint: '14 posts' }, { label: 'Carousel', value: 16, hint: '6 posts' }]} />
                    </Card>
                    <Card className="col-span-2 p-6">
                      <CardHead title="Breakouts" right={<span className="text-[12px] text-[#8f8f8f]">1.5× their usual or more</span>} />
                      <div className="mt-3 grid grid-cols-2 gap-x-8">
                        {[['reel', '38×', '412K views', '24 Sep', 0], ['video', '114×', '210K views', '7 Oct', 1], ['carousel', '22×', '61K views', '2 Oct', 0], ['reel', '49×', '261K views', '29 Sep', 1]].map(([k, x, v, d, tone], i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }} className="flex items-center gap-3 border-b border-[#1c1c1c] py-2.5 text-[13.5px]">
                            <ReelThumb caption="" views="" tone={tone as number} mark={false} className="h-9 w-8 shrink-0 rounded-md" />
                            <span className="flex-1 text-[#b3b3b3]"><span className="text-[#ededed]">Your {k}</span> did <span className="rounded-md bg-[hsl(145_55%_55%/0.15)] px-1.5 py-0.5 text-[12px] text-[hsl(145_55%_55%)]">{x} usual</span> · {v}</span>
                            <span className="text-[12px] text-[#8f8f8f]">{d}</span>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </AppWindow>

            {/* the post, opened */}
            <AnimatePresence>
              {panel && (
                <motion.div key={`pp${run}`} initial={{ x: 440 }} animate={{ x: 0 }} exit={{ x: 440 }} transition={{ duration: 0.6, ease }}
                  className="absolute bottom-px right-px top-px z-30 w-[420px] rounded-r-[18px] bg-[#0a0a0b] p-6 shadow-[-40px_0_80px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-3.5">
                    <ReelThumb caption="" views="" tone={0} className="h-[84px] w-[62px] shrink-0 rounded-lg" />
                    <div><div className="text-[18px] font-medium">My morning routine</div><div className="mt-1.5 flex gap-1.5"><Chip><InstagramMark />Reel</Chip><Chip>24 Sep</Chip></div></div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2"><Stat k="Views" v="412K" /><Stat k="Joins" v="96" i={1} /><Stat k="Deposited" v="$12.4K" i={2} tone="text-[hsl(145_55%_55%)]" /></div>
                  <div className="mt-2 rounded-xl bg-[#0e0e0f] px-3 pb-1 pt-2.5"><div className="flex justify-between text-[11px] text-[#8f8f8f]"><span>Joins after posting</span><span>48h</span></div><Area id={`hp${run}`} data={[2, 10, 26, 44, 38, 28, 20, 14, 10, 7, 5, 4]} h={60} /></div>
                  <div className="mt-3"><AiRead delay={700} text="A lifestyle hook in the first 2 seconds and a clear “DM me” ending. 38× your usual joins — your best format this month. Post two more like this." chips={<><Chip>Lifestyle</Chip><Chip>Hook · 2s</Chip><Chip>CTA · DM me</Chip></>} /></div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6, duration: 0.5 }} className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-[#0e0e0f] p-3"><div className="text-[11px] text-[#8f8f8f]">Best time to post</div><div className="mt-1 text-[15px] font-medium">Thu · 19:00</div></div>
                    <div className="rounded-xl bg-[#0e0e0f] p-3"><div className="text-[11px] text-[#8f8f8f]">Joins → clients</div><div className="mt-1 text-[15px] font-medium">14 <span className="text-[12px] font-normal text-[hsl(145_55%_55%)]">funded</span></div></div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <span data-hot="idle" className="absolute" style={{ left: 980, top: 600 }} /><span data-hot="idle2" className="absolute" style={{ left: 700, top: 560 }} />
            <SmartCursor root={root} target={target} press={pressOf(s, run, [4, 7])} w={HW} />
          </div>
        </Fit>
      </div>
    </div>
  )
}

/* ── Showcase: wide, live screens ──────────────────────────────────────── */

function Clock({ every, children }: { every: number; children: (t: number) => React.ReactNode }) {
  const { ref, go } = useGo<HTMLDivElement>('-60px')
  const [t, setT] = useState(0)
  useEffect(() => { if (!go) return; const id = setInterval(() => setT(x => x + 1), every); return () => clearInterval(id) }, [go, every])
  return <div ref={ref}>{children(t)}</div>
}

const th = 'text-[12px] font-medium text-[#b3b3b3]'
const NEWJOIN = [['Ava Morgan', 'instagram-bio', 'Bio', 1], ['Noah Price', 'tiktok-bio', 'Bio', 2], ['Omar Haddad', 'instagram-dm', 'DM', 0], ['Isla Grant', 'instagram-dm', 'DM', 0], ['Ethan Cole', 'instagram-bio', 'Bio', 1]] as const

function WideToast({ k, children, icon = <UserPlus className="size-4" /> }: { k: number; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {k > 0 && <motion.div key={k} initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.4, ease }}
        className="absolute bottom-6 right-6 z-20 flex w-[330px] items-center gap-3 rounded-2xl bg-[#111112] p-3.5 text-[13px] shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
        <span className="grid size-9 place-items-center rounded-full bg-[hsl(248_85%_74%/0.15)] text-[hsl(248_85%_80%)] [&_svg]:size-4">{icon}</span><span className="flex-1 leading-5">{children}</span>
      </motion.div>}
    </AnimatePresence>
  )
}

export function LinksWide() {
  const base = [['instagram-dm', 'Instagram · DM', 642, 198, 38], ['instagram-bio', 'Instagram · Bio', 518, 162, 30], ['tiktok-bio', 'TikTok · Bio', 74, 21, 5], ['youtube-description', 'YouTube · Description', 22, 8, 2], ['instagram-story', 'Instagram · Story', 14, 3, 1], ['telegram-pinned', 'Telegram · Pinned', 9, 2, 0]] as const
  return (
    <Clock every={2400}>{t => {
      const hits = base.map(([n]) => NEWJOIN.slice(0, 0).length + Array.from({ length: t }, (_, i) => NEWJOIN[i % NEWJOIN.length][1]).filter(x => x === n).length)
      const ev = t > 0 ? NEWJOIN[(t - 1) % NEWJOIN.length] : null
      return (
        <div className="relative" style={{ width: HW, height: HH }}>
          <AppWindow active="growth" title="Growth" right={<span className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 font-medium text-black"><Plus className="size-3.5" />New link</span>}>
            <PillTabs items={['Content', 'Links', 'CTAs']} active="Links" />
            <Card className="mt-5 overflow-hidden">
              <div className="grid grid-cols-[1.6fr_1.3fr_.8fr_.8fr_.8fr] border-b border-[#1c1c1c] px-5 py-3"><span className={th}>Source</span><span className={th}>Placement</span><span className={cn(th, 'text-right')}>Joined</span><span className={cn(th, 'text-right')}>Leads</span><span className={cn(th, 'text-right')}>Funded</span></div>
              {base.map(([n, p, j, l, f], i) => {
                const lit = ev && ev[1] === n
                return (
                  <div key={n} className={cn('grid grid-cols-[1.6fr_1.3fr_.8fr_.8fr_.8fr] items-center border-b border-[#1c1c1c] px-5 py-3 text-[13.5px] transition-colors duration-[1200ms] last:border-0', lit ? 'bg-[hsl(248_85%_74%/0.10)]' : 'bg-transparent')}>
                    <span><span className="block">{n}</span><span className="text-[12px] text-[#8f8f8f]">{p}</span></span><span className="text-[#b3b3b3]">{p}</span>
                    <span className="text-right tabular-nums"><Live v={String(j + hits[i])} /></span><span className="text-right tabular-nums">{l}</span><span className="text-right tabular-nums">{f}</span>
                  </div>
                )
              })}
            </Card>
          </AppWindow>
          <WideToast k={t}>{ev && <><b className="font-medium">{ev[0]}</b> joined your channel via <b className="font-medium">{ev[1]}</b></>}</WideToast>
        </div>
      )
    }}</Clock>
  )
}

export function JoinsWide() {
  const base = [['Leo Turner', 'Lead', 'Bio', '12m'], ['Chloe Martin', 'Submitted', 'DM', '22m'], ['Daniel Reyes', 'Verified', 'DM', '1h'], ['Maya Ross', 'Joined', 'Bio', '1h'], ['Ryan Porter', 'Joined', 'Bio', '2h'], ['Ella James', 'Verified', 'DM', '3h']] as const
  return (
    <Clock every={2600}>{t => {
      const fresh = Array.from({ length: Math.min(t, 3) }, (_, i) => ({ k: t - i, p: NEWJOIN[(t - 1 - i) % NEWJOIN.length] }))
      return (
        <div className="relative" style={{ width: HW, height: HH }}>
          <AppWindow active="crm" title="CRM">
            <div className="grid grid-cols-3 gap-4">
              <Kpi title="New joins" value="2,140" delta={<DeltaPill v="24.0%" />} viz={<DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3]} />} />
              <Kpi title="New leads" value="1,380" delta={<DeltaPill v="18.0%" />} viz={<MiniBars values={[2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 9, 5, 6, 8, 7, 9, 8, 10, 9]} />} />
              <Kpi title="Join → lead" value="64%" delta={<DeltaPill v="5.2%" />} viz={<Line values={[52, 54, 53, 56, 58, 57, 60, 61, 63, 64]} />} />
            </div>
            <div className="mt-4 flex items-center justify-between"><PillTabs items={['All', 'Joined', 'Leads', 'Submitted', 'Verified', 'Left']} active="All" /><span className="text-[13px]"><Live v={(1486 + t).toLocaleString()} /> <span className="text-[#8f8f8f]">people</span></span></div>
            <Card className="mt-4 overflow-hidden">
              <div className="grid grid-cols-[1.7fr_.8fr_.8fr_.6fr] border-b border-[#1c1c1c] px-5 py-3"><span className={th}>Person</span><span className={th}>Stage</span><span className={th}>Source</span><span className={cn(th, 'text-right')}>Joined</span></div>
              <AnimatePresence initial={false}>
                {fresh.map(({ k, p }, i) => (
                  <motion.div key={k} {...rowIn} className="overflow-hidden">
                    <div className={cn('grid grid-cols-[1.7fr_.8fr_.8fr_.6fr] items-center border-b border-[#1c1c1c] px-5 py-3 text-[13.5px] transition-colors duration-[1500ms]', i === 0 ? 'bg-[hsl(248_85%_74%/0.10)]' : 'bg-transparent')}>
                      <span className="flex items-center gap-2.5"><Initials n={p[0]} i={p[3]} />{p[0]}</span><span><Badge s="Joined" /></span><span><Chip>{p[1].startsWith('tiktok') ? <TikTokMark /> : <InstagramMark />}{p[2]}</Chip></span><span className="text-right text-[12px] text-[#8f8f8f]">{i === 0 ? 'now' : `${i * 2}m ago`}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {base.slice(0, 5 - Math.min(t, 3)).map(([n, st, src, tm], i) => (
                <div key={n} className="grid grid-cols-[1.7fr_.8fr_.8fr_.6fr] items-center border-b border-[#1c1c1c] px-5 py-3 text-[13.5px] last:border-0">
                  <span className="flex items-center gap-2.5"><Initials n={n} i={i} />{n}</span><span><Badge s={st} /></span><span><Chip><InstagramMark />{src}</Chip></span><span className="text-right text-[12px] text-[#8f8f8f]">{tm}</span>
                </div>
              ))}
            </Card>
          </AppWindow>
          <WideToast k={t}>{t > 0 && <><b className="font-medium">{NEWJOIN[(t - 1) % NEWJOIN.length][0]}</b> joined your channel via <b className="font-medium">{NEWJOIN[(t - 1) % NEWJOIN.length][1]}</b></>}</WideToast>
        </div>
      )
    }}</Clock>
  )
}

/* ══ Convert ══════════════════════════════════════════════════════════════ */

const JOINERS = [['Ava Morgan', 'instagram-bio', 'Instagram · Bio', 0], ['Noah Price', 'tiktok-bio', 'TikTok · Bio', 1], ['Omar Haddad', 'instagram-dm', 'Instagram · DM', 0], ['Isla Grant', 'instagram-story', 'Instagram · Story', 0]] as const

/** People join the channel → each is tagged with the link that brought them → lands in the CRM. */
export function ChannelFlow() {
  const { ref, s, run } = useScript([900, 900, 1300, 900, 900, 1300, 900, 900, 1300, 900, 900, 1600])
  const ev = Math.floor(s / 3), phase = s % 3
  const OLD = [{ k: -2, p: ['Maya Ross', 'instagram-dm', 'Instagram · DM', 0] as const }, { k: -1, p: ['Ethan Cole', 'instagram-bio', 'Instagram · Bio', 0] as const }]
  const shown = [...OLD, ...Array.from({ length: ev + 1 }, (_, i) => ({ k: i, p: JOINERS[i % JOINERS.length] }))].reverse()
  const counts = [642, 518, 74]; shown.forEach(({ p, k }) => { if (k < 0) return; if (k < ev || phase >= 1) { const i = ['instagram-dm', 'instagram-bio', 'tiktok-bio'].indexOf(p[1]); if (i >= 0) counts[i]++ } })
  return (
    <Demo inner={ref} crumb="Channel / VIP Signals" labels={['Someone joins', 'Source tagged', 'Added to your CRM']} at={phase}>
      <div className="absolute inset-0 p-4">
        <div className="flex items-end justify-between">
          <div><div className="text-[11px] text-[#8f8f8f]">Members</div><div className="text-[24px] font-medium tracking-tight tabular-nums"><Live v={(4812 + ev + (phase >= 0 ? 1 : 0)).toLocaleString()} /></div></div>
          <span className="flex items-center gap-1.5 rounded-full bg-[#141414] px-2.5 py-1 text-[11px] text-[#b3b3b3]"><TelegramMark className="size-3.5" />Telegram</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(['instagram-dm', 'instagram-bio', 'tiktok-bio'] as const).map((k, i) => (
            <div key={k} className="rounded-xl bg-[#0e0e0f] p-2.5"><div className="truncate text-[10.5px] text-[#8f8f8f]">{k}</div><div className="mt-0.5 text-[16px] font-medium tabular-nums"><Live v={String(counts[i])} /></div></div>
          ))}
        </div>
        <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Just joined</div>
        <div className="mt-1.5">
          <AnimatePresence initial={false}>
            {shown.slice(0, 5).map(({ k, p }, i) => (
              <motion.div key={`${k}-${run}`} {...rowIn} className="overflow-hidden">
                <div className={cn('flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12.5px] transition-colors duration-1000', i === 0 ? 'bg-[hsl(199_85%_65%/0.08)]' : '')}>
                  <Initials n={p[0]} i={p[3] + k + 3} /><span className="flex-1">{p[0]}</span>
                  <AnimatePresence>{(i > 0 || phase >= 1) && <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}><Chip>{p[3] ? <TikTokMark /> : <InstagramMark />}{p[2]}</Chip></motion.span>}</AnimatePresence>
                  <AnimatePresence>{(i > 0 || phase >= 2) && <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}><Badge s="Joined" /></motion.span>}</AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Demo>
  )
}

const DMS = [['Leo Turner', 'How do I join the VIP?', '2m', 1], ['Chloe Martin', 'Which broker do you use?', '9m', 1], ['Maya Ross', 'Thanks for the signal!', '1h', 0], ['Ethan Cole', 'Is there a minimum deposit?', '2h', 1]] as const

/** A DM lands → open it → reply with your verify link → they become a lead. */
export function InboxFlow() {
  const { ref, s, run } = useScript([1300, 900, 450, 2200, 700, 450, 2000])
  const open = s >= 3
  const at = s < 3 ? 0 : s < 6 ? 1 : 2
  const cur: [number, number] = s === 0 ? [430, 320] : s <= 2 ? [200, 92] : s <= 4 ? [470, 340] : [470, 340]
  return (
    <Demo inner={ref} crumb={open ? 'Inbox / Leo Turner' : 'Inbox'} labels={['A DM lands', 'Reply in one click', 'Now a lead']} at={at}>
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.div key={`l${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }} className="absolute inset-0 p-4">
            <div className="flex items-center justify-between"><span className="text-[15px] font-medium">Inbox</span><span className="rounded-full bg-[hsl(248_85%_74%/0.15)] px-2 py-0.5 text-[11px] text-[hsl(248_85%_82%)]">3 unread</span></div>
            <div className="mt-3">
              {DMS.map(([n, m, t, unread], i) => (
                <motion.div key={n} initial={i === 0 ? { opacity: 0, y: -10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className={cn('flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[12.5px] transition-colors duration-300', i === 0 && s === 1 && 'bg-white/[0.05]', i === 0 && s === 2 && 'bg-[hsl(248_85%_74%/0.16)]')}>
                  <Initials n={n} i={i + 1} /><span className="min-w-0 flex-1"><span className="flex justify-between"><span className={unread ? 'font-medium' : ''}>{n}</span><span className="text-[10.5px] text-[#8f8f8f]">{t}</span></span><span className="block truncate text-[11.5px] text-[#8f8f8f]">{m}</span></span>
                  {unread ? <span className="size-2 rounded-full bg-[hsl(248_85%_74%)]" /> : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key={`c${run}`} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="absolute inset-0 flex flex-col p-4">
            <div className="flex items-center gap-2.5"><Initials n="Leo Turner" i={1} /><div className="flex-1"><div className="text-[13.5px] font-medium">Leo Turner</div><div className="flex items-center gap-1 text-[10.5px] text-[#8f8f8f]"><InstagramMark className="size-3" />via instagram-bio</div></div>
              <AnimatePresence mode="wait"><motion.span key={s >= 6 ? 'l' : 'j'} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}><Badge s={s >= 6 ? 'Lead' : 'Joined'} /></motion.span></AnimatePresence></div>
            <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#0e0e0f] p-2.5 text-[11.5px]"><ReelThumb caption="" views="" tone={0} mark={false} className="h-9 w-7 shrink-0 rounded-md" /><span className="flex-1 text-[#b3b3b3]">Joined after watching <span className="text-white">My morning routine</span></span><span className="text-[#8f8f8f]">2m ago</span></div>
            <div className="mt-3 flex flex-1 flex-col gap-2 text-[12.5px]">
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-[#141414] px-3 py-2">Hey! Loved the reel 🙌</div>
              <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-[#141414] px-3 py-2">How do I join the VIP?</div>
              {s >= 5 && <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[hsl(248_85%_74%/0.25)] px-3 py-2">Here’s how — verify your account and you’re in:<div className="mt-1.5 rounded-lg bg-black/30 px-2 py-1 font-mono text-[11px]">liquex.link/verify</div></motion.div>}
              {s >= 6 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mx-auto mt-1 rounded-full bg-[hsl(145_55%_55%/0.12)] px-2.5 py-1 text-[11px] text-[hsl(145_55%_62%)]">Moved to Leads · verify link sent</motion.div>}
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#0e0e0f] p-2">
              <span className="flex-1 truncate px-1.5 text-[12px] text-[#b3b3b3]">{s === 3 ? <Type text="Here’s how — verify your account and you’re in" speed={28} /> : s >= 5 ? <span className="text-white/30">Message</span> : 'Here’s how — verify your account and you’re in'}</span>
              <span className={cn('rounded-lg bg-white px-3 py-1.5 text-[11.5px] font-medium text-black transition-transform', s === 4 && 'scale-105')}>Send</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [2, 5])} />
    </Demo>
  )
}

/* ══ Verify ═══════════════════════════════════════════════════════════════ */

const VIPS = [['Daniel Reyes', '$24,820'], ['Leo Turner', '$15,930'], ['Ryan Porter', '$64'], ['Maya Ross', '$14,205'], ['Noah Price', '$6,611']] as const

/** Turn on a rule → Liquex spots a member who no longer qualifies → removes them. */
export function GatingFlow() {
  const { ref, s, run } = useScript([1200, 900, 450, 1400, 1500, 2200])
  const on = s >= 3
  const flagged = s >= 4
  const gone = s >= 5
  const at = s < 3 ? 0 : s < 5 ? 1 : 2
  const cur: [number, number] = s === 0 ? [420, 330] : s <= 2 ? [474, 74] : [440, 340]
  return (
    <Demo inner={ref} crumb="Automate / VIP access" labels={['Set your rule', 'Liquex watches', 'Access handled']} at={at}>
      <div className="absolute inset-0 p-4">
        <div className="rounded-xl bg-[#0e0e0f] p-3">
          <div className="text-[10.5px] text-[#8f8f8f]">Rules</div>
          {[['Remove when balance drops under $100', on], ['Remove when they move IB', true]].map(([k, v], i) => (
            <div key={i} className="mt-2 flex items-center justify-between text-[12.5px]">
              <span>{k}</span>
              <span className={cn('relative h-[20px] w-[34px] rounded-full transition-colors duration-300', v ? 'bg-[hsl(145_55%_55%)]' : 'bg-white/10', i === 0 && s === 1 && !on && 'ring-2 ring-white/20')}><span className={cn('absolute top-[2px] size-4 rounded-full bg-white shadow transition-all duration-300', v ? 'left-[16px]' : 'left-[2px]')} /></span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between"><span className="text-[13px] font-medium">VIP members</span><span className="text-[12px] text-[#8f8f8f]"><Live v={String(gone ? 213 : 214)} /> members</span></div>
        <div className="mt-1.5">
          <AnimatePresence initial={false}>
            {VIPS.filter(([n]) => !(gone && n === 'Ryan Porter')).map(([n, b], i) => {
              const bad = n === 'Ryan Porter' && flagged
              return (
                <motion.div key={`${n}${run}`} {...rowIn} className="overflow-hidden">
                  <div className={cn('flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12.5px] transition-colors duration-500', bad && 'bg-[hsl(0_80%_66%/0.10)]')}>
                    <Initials n={n} i={i} /><span className="flex-1">{n}</span>
                    <span className={cn('tabular-nums', bad ? 'text-[hsl(0_80%_70%)]' : 'text-[#b3b3b3]')}>{b}</span>
                    {bad ? <span className="rounded-md bg-[hsl(0_80%_66%/0.15)] px-1.5 py-0.5 text-[11px] text-[hsl(0_80%_70%)]">Under $100</span> : <Badge s="Verified" />}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>{gone && (
        <motion.div key={`t${run}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-x-4 bottom-4 flex items-center gap-2.5 rounded-xl bg-[#111112] p-3 text-[12px] shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          <Check className="size-4 text-[hsl(145_55%_55%)]" /><span><b className="font-medium">Ryan Porter</b> removed from VIP · balance under $100</span>
        </motion.div>)}</AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [2])} />
    </Demo>
  )
}

/** A client moves to another IB → you're alerted → access and win-back handled. */
export function MovedFlow() {
  const { ref, s, run } = useScript([1300, 1300, 900, 450, 2600, 1600])
  const moved = s >= 1
  const detail = s >= 4
  const at = s < 2 ? 0 : s < 4 ? 1 : 2
  const cur: [number, number] = s <= 1 ? [440, 330] : s <= 3 ? [440, 60] : [440, 340]
  const rows = [['Omar Haddad', moved ? 'Moved' : 'Active', '$12,400'], ['Daniel Reyes', 'Active', '$24,820'], ['Leo Turner', 'Active', '$15,930'], ['Ella James', 'At risk', '$12,003'], ['Noah Price', 'Dormant', '$6,611']] as const
  return (
    <Demo inner={ref} crumb={detail ? 'Clients / Omar Haddad' : 'Clients'} labels={['Client moves IB', 'You’re alerted', 'Handled for you']} at={at}>
      <AnimatePresence mode="wait" initial={false}>
        {!detail ? (
          <motion.div key={`l${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -24 }} className="absolute inset-0 p-4">
            <AnimatePresence>{s >= 2 && (
              <motion.div {...rowIn} className="overflow-hidden"><div className="mb-3 flex items-center gap-2.5 rounded-xl bg-[hsl(199_85%_65%/0.10)] px-3 py-2.5 text-[12px]">
                <ArrowRightLeft className="size-4 shrink-0 text-[hsl(199_85%_65%)]" /><span className="flex-1"><b className="font-medium">Omar Haddad</b> moved to another IB · <span className="text-[hsl(199_85%_72%)]">$12,400</span></span><span className="flex items-center text-[11px] text-[#b3b3b3]">View<ChevronRight className="size-3" /></span>
              </div></motion.div>)}</AnimatePresence>
            <div className="grid grid-cols-[1.6fr_.8fr_.8fr] px-2 pb-1.5 text-[10.5px] text-[#8f8f8f]"><span>Client</span><span>Stage</span><span className="text-right">Balance</span></div>
            {rows.map(([n, st, b], i) => (
              <div key={n} className={cn('grid grid-cols-[1.6fr_.8fr_.8fr] items-center rounded-xl px-2 py-2 text-[12.5px] transition-colors duration-700', i === 0 && moved && 'bg-[hsl(199_85%_65%/0.06)]')}>
                <span className="flex items-center gap-2"><Initials n={n} i={i} />{n}</span>
                <span><AnimatePresence mode="wait"><motion.span key={st} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block"><Badge s={st} /></motion.span></AnimatePresence></span>
                <span className="text-right tabular-nums">{b}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key={`d${run}`} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} className="absolute inset-0 p-4">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-sky-200 to-sky-500 text-[13px] font-semibold text-black/70">OH</span><div className="flex-1"><div className="text-[15px] font-medium">Omar Haddad</div><div className="font-mono text-[11px] text-[#8f8f8f]">4441486 · Standard STP</div></div><Badge s="Moved" /></div>
            <div className="mt-3 grid grid-cols-3 gap-2"><Stat k="Balance" v="$12,400" /><Stat k="Moved on" v="9 Oct" i={1} /><Stat k="Was trading" v="3 lots/wk" i={2} /></div>
            <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Liquex handled</div>
            <div className="mt-1.5 space-y-1.5">
              {['Removed from your VIP channel', 'Added to your win-back list', 'Flagged on your Home page'].map((t, i) => (
                <motion.div key={t} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.35 }} className="flex items-center gap-2.5 rounded-lg bg-[#0e0e0f] px-3 py-2.5 text-[12px]">
                  <span className="grid size-4 place-items-center rounded-full bg-[hsl(145_55%_55%)] text-black"><Check className="size-2.5" strokeWidth={3} /></span>{t}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Cursor x={cur[0]} y={cur[1]} press={pressOf(s, run, [3])} />
    </Demo>
  )
}

/* ══ Retain ═══════════════════════════════════════════════════════════════ */

const DEPS = [['Maya Ross', 4200], ['Leo Turner', 1500], ['Daniel Reyes', 9100], ['Noah Price', 800]] as const

/** Deposits land → the book updates → you always know what it's worth. */
export function BookFlow() {
  const { ref, s, run } = useScript([1500, 1700, 1700, 1700, 1700])
  const total = 184920 + DEPS.slice(0, s).reduce((n, d) => n + d[1], 0)
  const rows = [{ d: ['Isla Grant', 2400] as const, k: -2 }, { d: ['Omar Haddad', 1100] as const, k: -1 }, ...DEPS.slice(0, s).map((d, i) => ({ d, k: i }))].reverse().slice(0, 5)
  return (
    <Demo inner={ref} crumb="Home / Your book" labels={['Deposit lands', 'Book updates', 'Always up to date']} at={s === 0 ? 0 : s % 2 === 1 ? 1 : 2}>
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-[1fr_1fr] gap-3">
          <div className="rounded-xl bg-[#0e0e0f] p-3">
            <div className="relative mx-auto max-w-[200px]"><BookGaugeLite /><div className="absolute inset-x-0 top-[42%] text-center"><div className="text-[22px] font-medium tracking-tight tabular-nums"><Live v={'$' + Math.round(total / 1000) + 'k'} /></div><div className="text-[10.5px] text-[#8f8f8f]">in your book</div></div></div>
          </div>
          <div className="space-y-2">
            <div className="rounded-xl bg-[#0e0e0f] p-3"><div className="text-[10.5px] text-[#8f8f8f]">Money in</div><div className="mt-0.5 text-[18px] font-medium tabular-nums text-[hsl(145_55%_55%)]"><Live v={'+$' + (148200 + total - 184920).toLocaleString()} /></div></div>
            <div className="rounded-xl bg-[#0e0e0f] p-3"><div className="text-[10.5px] text-[#8f8f8f]">Active clients</div><div className="mt-0.5 text-[18px] font-medium tabular-nums"><Live v={String(312 + s)} /></div></div>
          </div>
        </div>
        <div className="mt-3 text-[10.5px] text-[#8f8f8f]">Latest deposits</div>
        <div className="mt-1.5">
          <AnimatePresence initial={false}>
            {rows.map(({ d, k }, i) => (
              <motion.div key={`${k}${run}`} {...rowIn} className="overflow-hidden">
                <div className={cn('flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12.5px] transition-colors duration-1000', i === 0 && s > 0 && 'bg-[hsl(145_55%_55%/0.08)]')}>
                  <Initials n={d[0]} i={k + 3} /><span className="flex-1">{d[0]} deposited</span><span className="font-medium tabular-nums text-[hsl(145_55%_55%)]">+${d[1].toLocaleString()}</span><span className="text-[10.5px] text-[#8f8f8f]">{i === 0 ? 'now' : `${i * 4}m`}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Demo>
  )
}

function BookGaugeLite() {
  const N = 48, plan: [number, string][] = [[0.72, '#22c55e'], [0.04, '#f59e0b'], [0.06, '#94a3b8'], [0.18, '#f43f5e']]
  const segs: string[] = []; plan.forEach(([p, c]) => { for (let i = 0; i < Math.round(p * N); i++) segs.push(c) })
  return (
    <svg viewBox="0 0 200 110" width="100%" aria-hidden>
      {segs.slice(0, N).map((c, i) => { const a = Math.PI - (i + 0.5) / N * Math.PI; return <motion.line key={i} x1={100 + 66 * Math.cos(a)} y1={100 - 66 * Math.sin(a)} x2={100 + 92 * Math.cos(a)} y2={100 - 92 * Math.sin(a)} stroke={c} strokeWidth="3.4" strokeLinecap="round" initial={{ opacity: 0.08 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} /> })}
    </svg>
  )
}

const STEPS_AI = [['Ryan Porter', 'Moved IB last week with $24,600.', 'Call him today', 'rose'], ['Ella James', 'Deposited $500, no trades in 4 days.', 'Send a nudge', 'amber'], ['Leo Turner', 'Up $1,940 and trading daily.', 'Invite to VIP', 'emerald']] as const

/** AI builds today's list → you work through it → done. */
export function AiNextFlow() {
  const { ref, s, run } = useScript([1600, 900, 450, 900, 900, 450, 900, 900, 450, 1800])
  const done = [s >= 2, s >= 5, s >= 8]
  const at = s < 2 ? 0 : s < 8 ? 1 : 2
  const idx = done.filter(Boolean).length
  const cur: [number, number] = s === 0 ? [420, 330] : [446, 108 + Math.min(idx, 2) * 0 + [0, 0, 0][0] + (s <= 2 ? 0 : s <= 5 ? 0 : 0)]
  return (
    <Demo inner={ref} crumb="Ask AI / Today" labels={['AI reads every client', 'Your list for today', 'All done']} at={at}>
      <div className="absolute inset-0 p-4">
        <div className="flex items-center gap-1.5 text-[12px] text-[hsl(248_85%_82%)]"><Sparkles className="size-3.5" />Today’s next steps</div>
        <div className="mt-3 grid grid-cols-3 gap-2">{[['Clients read', '312'], ['Need you', String(3 - Math.min(3, [s >= 2, s >= 5, s >= 8].filter(Boolean).length))], ['Done today', String([s >= 2, s >= 5, s >= 8].filter(Boolean).length)]].map(([k, v]) => <div key={k} className="rounded-xl bg-[#0e0e0f] p-2.5"><div className="text-[10.5px] text-[#8f8f8f]">{k}</div><div className="mt-0.5 text-[17px] font-medium tabular-nums"><Live v={v} /></div></div>)}</div>
        <div className="mt-4 text-[16px] font-medium">{idx >= 3 ? 'All done for today.' : `${3 - idx} client${3 - idx === 1 ? '' : 's'} need${3 - idx === 1 ? 's' : ''} you today`}</div>
        <div className="mt-3 space-y-2">
          <AnimatePresence initial={false}>
            {STEPS_AI.map(([n, why, act, tone], i) => !done[i] && (
              <motion.div key={`${n}${run}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }} transition={{ duration: 0.45, ease, delay: s === 0 ? i * 0.2 : 0 }} className="overflow-hidden">
                <div className="flex items-center gap-3 rounded-xl bg-[#0e0e0f] p-3">
                  <Initials n={n} i={i + 1} /><div className="min-w-0 flex-1"><div className="text-[12.5px] font-medium">{n}</div><div className="truncate text-[11.5px] text-[#8f8f8f]">{why}</div></div>
                  <span className={cn('shrink-0 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium transition-transform', tone === 'rose' ? 'bg-[hsl(0_80%_66%/0.15)] text-[hsl(0_80%_72%)]' : tone === 'amber' ? 'bg-[hsl(38_90%_60%/0.15)] text-[hsl(38_90%_66%)]' : 'bg-[hsl(145_55%_55%/0.15)] text-[hsl(145_55%_62%)]', i === idx && [1, 4, 7].includes(s) && 'scale-105')}>{act}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {idx >= 3 && <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center gap-2 rounded-xl bg-[hsl(145_55%_55%/0.08)] py-8 text-center text-[12.5px] text-[hsl(145_55%_62%)]"><span className="grid size-8 place-items-center rounded-full bg-[hsl(145_55%_55%)] text-black"><Check className="size-4" strokeWidth={3} /></span>3 clients looked after</motion.div>}
        </div>
      </div>
      <Cursor x={s === 0 ? cur[0] : 446} y={s === 0 ? cur[1] : 206} press={pressOf(s, run, [2, 5, 8])} />
    </Demo>
  )
}

/* ══ Wide heroes ══════════════════════════════════════════════════════════ */

export function WideHero({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1180px]"><Fit w={HW} h={HH} minScale={0.5}>{children}</Fit></div>
}

const VREQ = [['Ava Morgan', '', '', 0], ['Noah Price', '', '', 1], ['Omar Haddad', '', '', 2], ['Isla Grant', '', '', 3], ['Leo Turner', '', '', 4], ['Chloe Martin', '', '', 0], ['Maya Ross', '', '', 1], ['Ethan Cole', '', '', 2], ['Ella James', '', '', 3]] as const

export function VerifyWide() {
  return (
    <Clock every={2400}>{t => {
      const reqs = Array.from({ length: 6 }, (_, i) => ({ k: t - i, p: VREQ[((t - i) % VREQ.length + VREQ.length) % VREQ.length], age: i }))
      const ev = t > 0 ? VREQ[(t - 1) % VREQ.length] : null
      return (
        <div className="relative" style={{ width: HW, height: HH }}>
          <AppWindow active="crm" title="Verification">
            <div className="grid grid-cols-3 gap-4">
              <Kpi title="Verified this month" value="186" delta={<DeltaPill v="31.0%" />} viz={<DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3]} lit={T.success} />} />
              <Kpi title="In your VIP" value="214" delta={<DeltaPill v="12.0%" />} viz={<Line values={[150, 158, 163, 170, 176, 184, 190, 199, 207, 214]} color={T.success} />} />
              <Kpi title="Removed automatically" value="9" delta={<DeltaPill v="moved or under $100" good={false} />} viz={<MiniBars values={[0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0]} />} />
            </div>
            <Card className="mt-4 overflow-hidden">
              <div className="grid grid-cols-[1.6fr_1fr_1.6fr_.8fr] border-b border-[#1c1c1c] px-5 py-3"><span className={th}>Person</span><span className={th}>Account</span><span className={th}>Checks</span><span className={cn(th, 'text-right')}>Status</span></div>
              <AnimatePresence initial={false}>
                {reqs.map(({ k, p, age }) => (
                  <motion.div key={k} {...rowIn} className="overflow-hidden">
                    <div className={cn('grid grid-cols-[1.6fr_1fr_1.6fr_.8fr] items-center border-b border-[#1c1c1c] px-5 py-3 text-[13.5px] transition-colors duration-[1500ms]', age === 0 ? 'bg-[hsl(199_85%_65%/0.06)]' : '')}>
                      <span className="flex items-center gap-2.5"><Initials n={p[0]} i={p[3] + age} />{p[0]}</span>
                      <span className="font-mono text-[12.5px] text-[#8f8f8f]">{24881364 + ((k * 7919) % 90000)}</span>
                      <span className="flex items-center gap-2 text-[12.5px] text-[#b3b3b3]">{age === 0 ? <><span className="size-3.5 animate-spin rounded-full border-[1.5px] border-white/15 border-t-[hsl(248_85%_74%)]" />Checking with your broker…</> : <><Check className="size-3.5 text-[hsl(145_55%_55%)]" />Under your IB · Balance OK</>}</span>
                      <span className="text-right"><Badge s={age === 0 ? 'Submitted' : 'Verified'} /></span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Card>
          </AppWindow>
          <WideToast k={t} icon={<Check />}>{ev && <><b className="font-medium">{ev[0]}</b> verified · VIP access given</>}</WideToast>
        </div>
      )
    }}</Clock>
  )
}

const CLIENTS_W = [['Daniel Reyes', '8347195', 24820, 'Active', '1d'], ['Ryan Porter', '2666148', 18410, 'Moved', '5mo'], ['Leo Turner', '1062637', 15930, 'Active', '1d'], ['Maya Ross', '2518299', 14205, 'Active', '2d'], ['Isla Grant', '9981277', 8940, 'Active', '1d'], ['Ella James', '3547008', 12003, 'Wrong', '2d'], ['Noah Price', '9197060', 6611, 'Dormant', '2mo']] as const
const RETAIN_EVENTS = [{ who: 'Maya Ross', add: 4200, text: 'deposited +$4,200' }, { who: 'Isla Grant', stage: 'At risk', text: 'hasn’t traded in 14 days' }, { who: 'Leo Turner', add: 1500, text: 'deposited +$1,500' }, { who: 'Noah Price', stage: 'Active', text: 'is trading again' }]

export function ClientsWide() {
  return (
    <Clock every={2800}>{t => {
      const bal: Record<string, number> = {}, stage: Record<string, string> = {}
      for (let i = 0; i < t; i++) { const e = RETAIN_EVENTS[i % RETAIN_EVENTS.length]; if (e.add) bal[e.who] = (bal[e.who] ?? 0) + e.add; if (e.stage) stage[e.who] = e.stage }
      const ev = t > 0 ? RETAIN_EVENTS[(t - 1) % RETAIN_EVENTS.length] : null
      return (
        <div className="relative" style={{ width: HW, height: HH }}>
          <AppWindow active="clients" title="Clients">
            <div className="grid grid-cols-3 gap-4">
              <Kpi title="Your book" value={'$' + (184920 + Object.values(bal).reduce((n, v) => n + v, 0)).toLocaleString()} delta={<DeltaPill v="12.4%" />} viz={<Line values={[60, 58, 62, 61, 66, 70, 68, 74, 78, 82]} />} />
              <Kpi title="Active clients" value="312" delta={<DeltaPill v="6.0%" />} viz={<SegMeter share={0.72} />} />
              <Kpi title="At risk" value={String(4 + (stage['Isla Grant'] === 'At risk' ? 1 : 0))} delta={<DeltaPill v="$31k" good={false} note="balance at risk" />} viz={<MiniBars values={[1, 0, 2, 1, 0, 1, 3, 1, 0, 2, 1, 1, 0, 2, 1, 4]} />} />
            </div>
            <Card className="mt-4 overflow-hidden">
              <div className="grid grid-cols-[1.8fr_.9fr_1fr_.7fr] border-b border-[#1c1c1c] px-5 py-3"><span className={th}>Client</span><span className={th}>Stage</span><span className={cn(th, 'text-right')}>Balance</span><span className={cn(th, 'text-right')}>Last trade</span></div>
              {CLIENTS_W.filter(c => c[0] !== 'Ella James').map(([n, id, b, st, lt], i) => {
                const s2 = stage[n] ?? st, lit = ev?.who === n
                return (
                  <div key={n} className={cn('grid grid-cols-[1.8fr_.9fr_1fr_.7fr] items-center border-b border-[#1c1c1c] px-5 py-2 text-[13.5px] transition-colors duration-[1500ms] last:border-0', lit ? (ev?.stage === 'At risk' ? 'bg-[hsl(38_90%_60%/0.08)]' : 'bg-[hsl(145_55%_55%/0.07)]') : '')}>
                    <span className="flex items-center gap-2.5"><Initials n={n} i={i} /><span><span className="block">{n}</span><span className="font-mono text-[12px] text-[#8f8f8f]">{id}</span></span></span>
                    <span><AnimatePresence mode="wait"><motion.span key={s2} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block"><Badge s={s2} /></motion.span></AnimatePresence></span>
                    <span className="text-right tabular-nums"><Live v={'$' + (b + (bal[n] ?? 0)).toLocaleString()} /></span>
                    <span className={cn('text-right text-[12.5px] tabular-nums', s2 === 'Active' ? 'text-[hsl(145_55%_55%)]' : 'text-[hsl(0_80%_66%)]')}>{s2 === 'At risk' ? '14d' : n === 'Noah Price' && s2 === 'Active' ? 'today' : lt}</span>
                  </div>
                )
              })}
            </Card>
          </AppWindow>
          <WideToast k={t} icon={ev?.stage === 'At risk' ? <AlertTriangle /> : <TrendingUpIcon />}>{ev && <><b className="font-medium">{ev.who}</b> {ev.text}</>}</WideToast>
        </div>
      )
    }}</Clock>
  )
}
