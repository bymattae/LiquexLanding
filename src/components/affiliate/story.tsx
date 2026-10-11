import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AiGlyph, LiveDot, PersonFrom, ReelThumb, TONES, Tick, useCount, useCycle } from './animated'
import { AreaChart, Avatar, Delta, InstagramMark, LiquexMark, Spark, Surface, TelegramMark, TikTokMark, BrokerMark, YouTubeMark, ease, label, num } from './premium'
import { Eyebrow, Frame, line, Points, reveal, tint } from './v3'

/**
 * The story sections that make the page read top to bottom:
 *   the problem · one page every morning · how it works · IBs and networks.
 */

const money = (n: number) => `$${Math.round(n).toLocaleString()}`

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <motion.h2 {...reveal} className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{title}</motion.h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-6 text-zinc-400 sm:text-base">{sub}</p>}
    </div>
  )
}

/* ── 1 · The problem ───────────────────────────────────────────────────── */

function UnmeasuredPosts() {
  const caps = ['Gold setup this week', 'My NFP routine', 'Day in the life']
  return (
    <div className="flex gap-2.5">
      {caps.map((c, i) => (
        <div key={c} className="flex flex-col items-center gap-2">
          <ReelThumb caption={c} views={['48K', '184K', '12K'][i]} tone={i} className="h-[112px] w-[66px] opacity-80" />
          <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-500 ring-1 ring-white/[0.06]">? joins</span>
        </div>
      ))}
    </div>
  )
}

function LostDms() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true })
  const n = useCount(47, go, 2000)
  const msgs = [['Chloe', 'Can I join VIP?', '2d'], ['Omar', 'What broker do you use?', '3d'], ['Zara', 'How do I start?', '5d']]
  return (
    <div ref={ref} className="w-[240px]">
      <Surface inner="p-1.5">
        <div className="flex items-center justify-between px-2.5 pb-1.5 pt-1.5 text-[11.5px]">
          <span className="flex items-center gap-1.5 font-medium text-zinc-200"><TelegramMark className="size-4" />Chats</span>
          <span className="rounded-full bg-[#3390ec] px-1.5 text-[10px] font-semibold tabular-nums text-white">{Math.round(n)}</span>
        </div>
        {msgs.map(([who, t, ago], i) => (
          <div key={who} className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5" style={{ opacity: 1 - i * 0.22 }}>
            <Avatar name={who} i={i + 2} className="size-7 text-[11px]" />
            <div className="min-w-0 flex-1"><div className="flex justify-between text-[11.5px]"><span className="font-medium text-zinc-200">{who}</span><span className="text-[10px] text-zinc-600">{ago}</span></div><div className="truncate text-[11px] text-zinc-500">{t}</div></div>
          </div>
        ))}
      </Surface>
    </div>
  )
}

function QuietLeavers() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-40px' })
  const t = useCycle(4, go, 1400)
  const names = ['Bartlomiej P.', 'Irni M.', 'Marcin O.']
  return (
    <div ref={ref} className="w-[240px]">
      <Surface inner="p-1.5">
        {names.map((n, i) => {
          const gone = i < t
          return (
            <div key={n} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11.5px]">
              <Avatar name={n} i={i + 3} className={cn('size-6 text-[10px] transition-all duration-700', gone && 'opacity-40 grayscale')} />
              <span className={cn('flex-1 transition-colors duration-700', gone ? 'text-zinc-600' : 'text-zinc-200')}>{n}</span>
              <span className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 transition-all duration-700', gone ? TONES.rose : TONES.emerald)}>{gone ? 'Moved IB' : 'Active'}</span>
            </div>
          )
        })}
      </Surface>
    </div>
  )
}

const PROBLEMS = [
  { title: 'Content', text: 'You don’t know which posts work.', art: <UnmeasuredPosts /> },
  { title: 'Leads', text: 'Leads go cold in your DMs.', art: <LostDms /> },
  { title: 'Clients', text: 'Clients leave without you noticing.', art: <QuietLeavers /> },
]

export function ProblemSection() {
  return (
    <div className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-28">
          <Head eyebrow="The problem" title="Most IBs are guessing." sub="Your data is spread across a broker portal, your DMs and five apps." />
        </div>
        <div className={cn('grid border-t md:grid-cols-3', line)}>
          {PROBLEMS.map((p, i) => (
            <motion.div key={p.title} {...reveal} className={cn('flex flex-col', line, i < 2 && 'border-b md:border-b-0 md:border-r')}>
              <div className={cn('flex h-52 items-center justify-center px-6', tint)}>{p.art}</div>
              <div className="px-6 pb-10 pt-5 sm:px-8">
                <h3 className="text-[20px] font-semibold">{p.title}</h3>
                <p className="mt-1 text-[15px] text-zinc-400">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p {...reveal} className={cn('border-t px-6 py-8 text-center text-lg font-medium text-zinc-200', line)}>
          Liquex brings it into one place — <span className="text-emerald-300">and fixes all three.</span>
        </motion.p>
      </Frame>
    </div>
  )
}

/* ── 2 · One page, every morning ───────────────────────────────────────── */

const IN = [30, 22, 54, 26, 70, 46, 34, 100, 42, 62, 24, 40, 58, 52, 30, 38, 66, 48, 34, 44, 56, 28]
const OUT = [12, 8, 18, 10, 22, 14, 9, 26, 16, 20, 8, 14, 18, 12, 10, 16, 24, 12, 9, 14, 20, 8]
const NAV: [string, string][] = [['Home', 'Overview'], ['Content', 'Grow'], ['Links', 'Grow'], ['Channel', 'Grow'], ['CRM', 'Convert'], ['Clients', 'Keep'], ['Automate', 'Keep']]

/** Money in above the line, money out below — thin, precise bars. */
function InOut({ go }: { go: boolean }) {
  const top = IN.indexOf(Math.max(...IN))
  return (
    <div className="relative mt-4 h-40">
      <div className="absolute inset-x-0 top-[70%] h-px bg-white/10" />
      <div className="absolute inset-0 flex gap-[5px]">
        {IN.map((v, i) => (
          <div key={i} className="relative flex-1">
            <motion.span initial={{ height: 0 }} animate={go ? { height: `${v * 0.68}%` } : {}} transition={{ delay: 0.2 + i * 0.03, duration: 0.7, ease }}
              className={cn('absolute bottom-[30%] left-0 right-0 rounded-t-[3px]', i === top ? 'bg-gradient-to-t from-emerald-300/40 to-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.4)]' : 'bg-emerald-300/25')} />
            <motion.span initial={{ height: 0 }} animate={go ? { height: `${OUT[i] * 0.9}%` } : {}} transition={{ delay: 0.4 + i * 0.03, duration: 0.7, ease }}
              className="absolute left-0 right-0 top-[70%] rounded-b-[3px] bg-rose-400/30" />
            {i === top && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4 }}
                className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#15181d] px-2 py-1 text-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                <span className="text-zinc-500">24 Sep</span> <span className="font-medium tabular-nums text-emerald-300">+$21,480</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const DFEED: [string, React.ReactNode, string, string][] = [
  ['Isla', <InstagramMark />, 'joined from', 'Instagram'],
  ['Maya', <BrokerMark />, 'deposited', '+$4,200'],
  ['Daniel', <LiquexMark />, 'got verified', ''],
  ['Leo', <BrokerMark />, 'traded', '1.8 lots'],
  ['Noah', <TikTokMark />, 'joined from', 'TikTok'],
]

function FullDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-80px' })
  const bal = useCount(184920, go), net = useCount(62410, go), act = useCount(312, go), vol = useCount(1162, go)
  const t = useCycle(1000, go, 2400)
  const rows = Array.from({ length: 5 }, (_, i) => ({ key: t - i, d: DFEED[((t - i) % DFEED.length + DFEED.length) % DFEED.length], age: i }))
  const kpis: [string, string, string, number[]][] = [
    ['Your balance', money(bal), '12.4%', [5, 6, 5, 7, 8, 8, 10]], ['Trading volume', `${Math.round(vol).toLocaleString()} lots`, '8.1%', [4, 5, 7, 6, 7, 8, 9]],
    ['Active clients', Math.round(act).toString(), '25.3%', [3, 4, 4, 6, 6, 7, 9]], ['Net funding', `+${money(net)}`, '4.6%', [6, 5, 7, 6, 8, 7, 9]],
  ]
  return (
    <div ref={ref} className="w-[1000px]">
      <Surface glow inner="grid grid-cols-[176px_1fr] overflow-hidden">
        <div className="border-r border-white/[0.06] bg-white/[0.015] p-4">
          <div className="flex items-center gap-2 px-1"><LiquexMark className="size-6" /><span className="text-[13px] font-semibold">Liquex</span></div>
          <div className="mt-6 space-y-0.5">
            {NAV.map(([n, g], i) => (
              <div key={n}>
                {i > 0 && NAV[i - 1][1] !== g && <div className="px-2.5 pb-1 pt-3 text-[9.5px] font-medium uppercase tracking-[0.08em] text-zinc-600">{g}</div>}
                <div className={cn('rounded-lg px-2.5 py-1.5 text-[12px]', i === 0 ? 'bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' : 'text-zinc-500')}>{n}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-end justify-between">
            <div><div className="text-[18px] font-medium tracking-tight">Good morning</div><div className="mt-0.5 text-[11.5px] text-zinc-500">Everything from your broker, channel and socials — last 30 days.</div></div>
            <div className="flex rounded-lg bg-white/[0.04] p-0.5 text-[10.5px] text-zinc-500">
              {['7D', '30D', '90D'].map(p => <span key={p} className={cn('rounded-md px-2.5 py-1', p === '30D' && 'bg-white/[0.08] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]')}>{p}</span>)}
            </div>
          </div>
          <div className="grid grid-cols-4 divide-x divide-white/[0.06] rounded-xl bg-white/[0.025] py-4 ring-1 ring-white/[0.05]">
            {kpis.map(([k, v, d, s]) => (
              <div key={k} className="px-4">
                <div className={label}>{k}</div>
                <div className={cn(num, 'mt-1.5 text-[20px] text-white')}>{v}</div>
                <div className="mt-1 flex items-center justify-between"><Delta v={d} /><Spark data={s} go={go} className="h-4 w-12" /></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1.55fr_1fr] gap-4">
            <div className="rounded-xl bg-white/[0.025] p-4 ring-1 ring-white/[0.05]">
              <div className="flex items-baseline justify-between">
                <span className={label}>Money in vs out</span>
                <span className="flex items-center gap-3 text-[10.5px] text-zinc-500"><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-300" />Deposits</span><span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-rose-400" />Withdrawals</span></span>
              </div>
              <div className={cn(num, 'mt-1 text-[17px] text-white')}>+$62,410 <span className="text-[11px] font-normal tracking-normal text-zinc-500">net</span></div>
              <InOut go={go} />
            </div>
            <div className="rounded-xl bg-white/[0.025] p-2 ring-1 ring-white/[0.05]">
              <div className="flex items-center justify-between px-2.5 pb-1 pt-2"><span className={label}>Activity</span><LiveDot /></div>
              <div className="relative h-[222px] overflow-hidden">
                <AnimatePresence initial={false}>
                  {rows.map(({ key, d: [n, from, a, v], age }) => (
                    <motion.div key={key} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1 - age * 0.18, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
                      className={cn('flex h-11 items-center gap-2.5 rounded-lg px-2.5 text-[11.5px]', age === 0 && 'bg-white/[0.04]')}>
                      <PersonFrom name={n} i={((key % 6) + 6) % 6} from={from} />
                      <span className="min-w-0 flex-1 truncate text-zinc-500"><span className="font-medium text-zinc-100">{n}</span> {a} <span className="text-zinc-200">{v}</span></span>
                      <span className="text-[10px] tabular-nums text-zinc-600">{age === 0 ? 'now' : `${age * 3}m`}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Surface>
    </div>
  )
}

export function HomeShowcase() {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="overflow-hidden">
        <div className="px-6 pb-14 pt-20 sm:pt-28">
          <Head eyebrow="Home" title="Open one page. Know everything." sub="Your broker, your channel and your socials — on one screen, the moment you log in." />
          <motion.div {...reveal} className="mt-8 flex flex-wrap justify-center gap-2">
            {['Your numbers, at a glance', 'Your best day, highlighted', 'What just happened, live'].map(t => (
              <span key={t} className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-zinc-300 ring-1 ring-white/[0.08]"><span className="grid size-3.5 place-items-center rounded-full bg-emerald-300/15 text-emerald-300"><Tick className="size-2.5" /></span>{t}</span>
            ))}
          </motion.div>
        </div>
        <div className={cn('relative flex justify-center border-t px-4 pb-0 pt-14', line, tint)}>
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 h-72 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-[100px]" />
          <div className="h-[260px] w-full overflow-hidden sm:h-[330px] md:h-[440px] lg:h-[500px]">
            <div className="relative left-1/2 w-[1000px] origin-top -translate-x-1/2 scale-[0.36] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.92] xl:scale-100">
              <FullDashboard />
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ── 3 · How it works ──────────────────────────────────────────────────── */

function Tile({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Surface className={cn('size-16 !rounded-[20px]', className)} inner="grid place-items-center !rounded-[19px]">{children}</Surface>
}

function SyncArt() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-40px' })
  return (
    <div ref={ref} className="flex items-center gap-3">
      <Tile><BrokerMark className="size-8" /></Tile>
      <div className="relative h-px w-20 overflow-hidden bg-white/10">
        {go && <motion.span className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" animate={{ left: ['-40%', '110%'] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />}
      </div>
      <Tile className="shadow-[0_0_40px_rgba(110,231,183,0.18)]"><LiquexMark className="size-8 rounded-lg" /></Tile>
    </div>
  )
}

function ConnectArt() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-40px' })
  const t = useCycle(5, go, 900)
  const apps: [string, React.ReactNode][] = [['Telegram', <TelegramMark className="size-4" />], ['Instagram', <InstagramMark className="size-4" />], ['TikTok', <TikTokMark className="size-4" />], ['YouTube', <YouTubeMark className="size-4" />]]
  return (
    <div ref={ref} className="w-[250px]">
      <Surface inner="divide-y divide-white/[0.05] p-1">
        {apps.map(([n, m], i) => (
          <div key={n} className="flex items-center justify-between px-3 py-2 text-[11.5px]">
            <span className="flex items-center gap-2.5 text-zinc-200">{m}{n}</span>
            {i < t
              ? <span className="flex items-center gap-1 text-[10.5px] text-emerald-300"><Tick className="size-2.5" />Connected</span>
              : <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10.5px] text-zinc-400 ring-1 ring-white/[0.08]">Connect</span>}
          </div>
        ))}
      </Surface>
    </div>
  )
}

function RunArt() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { margin: '-40px' })
  const t = useCycle(4, go, 1100)
  return (
    <div ref={ref} className="w-[250px]">
      <Surface inner="divide-y divide-white/[0.05] p-1">
        {['Verify new leads', 'Grant VIP access', 'Flag clients slipping'].map((r, i) => (
          <div key={r} className="flex items-center justify-between px-3 py-2.5 text-[11.5px]">
            <span className="text-zinc-200">{r}</span>
            <span className={cn('relative h-[18px] w-[30px] rounded-full transition-colors duration-500', i < t ? 'bg-emerald-300' : 'bg-white/10')}>
              <span className={cn('absolute top-[2px] size-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all duration-500', i < t ? 'left-[14px]' : 'left-[2px]')} />
            </span>
          </div>
        ))}
      </Surface>
    </div>
  )
}

const STEPS = [
  { n: '01', title: 'Connect your broker data', text: 'Your broker reports sync daily.', art: <SyncArt /> },
  { n: '02', title: 'Connect Telegram and socials', text: 'Your bot, channels and socials.', art: <ConnectArt /> },
  { n: '03', title: 'Liquex runs it', text: 'Verifying, access and alerts — done.', art: <RunArt /> },
]

export function HowItWorks() {
  return (
    <div className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-28">
          <Head eyebrow="How it works" title="Three steps. Then it runs itself." sub="We set it up with you." />
        </div>
        <div className={cn('grid border-t md:grid-cols-3', line)}>
          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...reveal} className={cn('flex flex-col', line, i < 2 && 'border-b md:border-b-0 md:border-r')}>
              <div className={cn('flex h-56 items-center justify-center px-6', tint)}>{s.art}</div>
              <div className="px-6 pb-10 pt-6 sm:px-8">
                <span className="text-[13px] font-medium tabular-nums text-emerald-300">{s.n}</span>
                <h3 className="mt-2 text-[17px] font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[14px] leading-6 text-zinc-400">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>
    </div>
  )
}

/* ── 4 · IBs and networks ──────────────────────────────────────────────── */

const IBS: [string, number, number[]][] = [['Ryan C.', 148, [4, 5, 6, 6, 8, 9, 11]], ['Priya S.', 62, [3, 4, 3, 5, 5, 6, 6]], ['Marco D.', 31, [5, 4, 4, 5, 4, 5, 5]], ['Lena W.', 4, [5, 4, 3, 3, 2, 2, 2]]]

function Leaderboard() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <Surface inner="p-2">
        <div className="flex items-center justify-between px-3 pb-2 pt-2"><span className="text-[12px] font-medium text-zinc-100">Top IBs</span><span className={label}>Net funding · 30D</span></div>
        {IBS.map(([n, v, s], i) => (
          <motion.div key={n} initial={{ opacity: 0, y: 6 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease }}
            className={cn('grid grid-cols-[14px_28px_1fr_auto_auto] items-center gap-2.5 rounded-xl px-3 py-2', i === 0 && 'bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]')}>
            <span className={cn('text-[11px] tabular-nums', i === 0 ? 'text-emerald-300' : 'text-zinc-600')}>{i + 1}</span>
            <Avatar name={n} i={i} className="size-7 text-[11px]" />
            <span className="text-[12.5px] text-zinc-100">{n}</span>
            <Spark data={s} go={go} color={i === 3 ? '#fb7185' : '#6ee7b7'} className="h-4 w-12" />
            <span className={cn(num, 'w-14 text-right text-[12.5px] text-zinc-100')}>+${v}k</span>
          </motion.div>
        ))}
      </Surface>
    </div>
  )
}

function IbCard() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <Surface inner="p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-500 text-[13px] font-bold text-black/75">YB</span>
          <div className="flex-1"><div className="text-[14px] font-medium">Your brand</div><div className="flex items-center gap-1 text-[11px] text-zinc-500"><TelegramMark className="size-3" />@YourVerifyBot</div></div>
          <span className="flex items-center gap-1 text-[10.5px] text-violet-200"><AiGlyph className="size-3" />Your brand</span>
        </div>
        <div className="mt-4 grid grid-cols-2 divide-x divide-white/[0.06] border-t border-white/[0.06] pt-4">
          <div className="pr-4"><div className={label}>Your book</div><div className={cn(num, 'mt-1 text-[18px]')}>$184,920</div></div>
          <div className="pl-4"><div className={label}>Joins this month</div><div className={cn(num, 'mt-1 text-[18px]')}>1,669</div></div>
        </div>
        <AreaChart data={[12, 14, 13, 17, 16, 20, 19, 24, 23, 28]} w={360} h={56} go={go} grid={false} className="mt-3 h-14" />
      </Surface>
    </div>
  )
}

export function AudienceSection() {
  return (
    <div className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-28">
          <Head eyebrow="Who it’s for" title="Built for IBs. Ready for networks." />
        </div>
        <div className={cn('grid border-t lg:grid-cols-2', line)}>
          <div className={cn('flex flex-col border-b lg:border-b-0 lg:border-r', line)}>
            <div className={cn('flex h-72 items-center justify-center px-6', tint)}><IbCard /></div>
            <div className="px-6 pb-12 pt-6 sm:px-12">
              <Eyebrow>For IBs</Eyebrow>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Your book. Your brand.</h3>
              <p className="mt-2 max-w-md text-[15px] leading-6 text-zinc-400">Your traders, content and channels — under your brand.</p>
              <Points items={['Your own bot and Mini App', 'A next step for every client']} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className={cn('flex h-72 items-center justify-center px-6', tint)}><Leaderboard /></div>
            <div className="px-6 pb-12 pt-6 sm:px-12">
              <Eyebrow>For networks</Eyebrow>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Every IB, side by side.</h3>
              <p className="mt-2 max-w-md text-[15px] leading-6 text-zinc-400">Who’s growing, who’s slipping, whose content works.</p>
              <Points items={['Every IB ranked', 'Each IB sees only their own']} />
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ── Statement breaks ──────────────────────────────────────────────────── */

/** One huge sentence between chapters — the Hyros-style pause. */
export function Statement({ lead, punch }: { lead: string; punch: string }) {
  return (
    <motion.p {...reveal} className="mx-auto max-w-4xl px-6 py-10 text-balance text-center sm:py-16 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
      {lead} <span className="text-emerald-300">{punch}</span>
    </motion.p>
  )
}
