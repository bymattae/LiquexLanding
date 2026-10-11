import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HomeHero } from '@/components/app/homehero'
import { GET_URL } from '@/components/site/chrome'
import { cn } from '@/lib/utils'
import { AiGlyph, LiveDot, PersonFrom, ReelThumb, useCount, useCycle } from './animated'
import { AreaChart, BrokerMark, Delta, InstagramMark, LiquexMark, Spark, TelegramMark, TikTokMark, YouTubeMark, ease, label, num } from './premium'

/**
 * The hero: the Liquex platform itself, with everything it's connected to —
 * the broker, Telegram, socials, DMs, the Mini App, AI — popping in on top
 * as live notifications.
 *
 * Drawn on a fixed stage and scaled down on smaller screens.
 */

const W = 1240, H = 680
const money = (n: number) => `$${Math.round(n).toLocaleString()}`

/* ── The app ───────────────────────────────────────────────────────────── */

const NAV: [string, string][] = [['Home', ''], ['Content', 'Grow'], ['Links', 'Grow'], ['Channel', 'Grow'], ['CRM', 'Convert'], ['Clients', 'Keep'], ['Automate', 'Keep']]
const BOOK = [148, 152, 150, 158, 163, 161, 170, 176, 172, 184, 191, 188, 199, 207, 204, 216, 222, 227]

const SOURCES: [React.ReactNode, string, number, string][] = [
  [<InstagramMark className="size-4" />, 'Instagram', 100, 'bg-pink-300'],
  [<TikTokMark className="size-4" />, 'TikTok', 46, 'bg-cyan-300'],
  [<TelegramMark className="size-4" />, 'Telegram', 31, 'bg-sky-300'],
  [<YouTubeMark className="size-4" />, 'YouTube', 12, 'bg-rose-400'],
]

const FEED: [string, React.ReactNode, string, string][] = [
  ['Maya', <BrokerMark />, 'deposited', '+$4,200'],
  ['Ava', <InstagramMark />, 'joined from', 'Instagram'],
  ['Daniel', <LiquexMark />, 'got verified', ''],
  ['Leo', <BrokerMark />, 'traded', '1.8 lots'],
  ['Noah', <TikTokMark />, 'joined from', 'TikTok'],
]

function App({ go }: { go: boolean }) {
  const bal = useCount(184920, go, 2000), net = useCount(62410, go, 2000), act = useCount(312, go, 2000), joins = useCount(2140, go, 2000)
  const t = useCycle(1000, go, 2600)
  const rows = Array.from({ length: 4 }, (_, i) => ({ key: t - i, d: FEED[((t - i) % FEED.length + FEED.length) % FEED.length], age: i }))
  const kpis: [string, string, string, number[]][] = [
    ['Your book', money(bal), '12.4%', [5, 6, 5, 7, 8, 8, 10]],
    ['Net funding', `+${money(net)}`, '4.6%', [6, 5, 7, 6, 8, 7, 9]],
    ['Active clients', Math.round(act).toString(), '25.3%', [3, 4, 4, 6, 6, 7, 9]],
    ['New joins', Math.round(joins).toLocaleString(), '18.2%', [4, 6, 5, 8, 7, 9, 11]],
  ]
  return (
    <div className="grid h-full grid-cols-[188px_1fr] overflow-hidden rounded-[20px] bg-[#08090b] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
      {/* sidebar */}
      <div className="flex flex-col border-r border-white/[0.06] bg-white/[0.015] p-4">
        <div className="flex items-center gap-2 px-1"><LiquexMark className="size-6" /><span className="text-[13.5px] font-semibold">Liquex</span></div>
        <div className="mt-6">
          {NAV.map(([n, g], i) => (
            <div key={n}>
              {g && NAV[i - 1][1] !== g && <div className="px-2.5 pb-1 pt-4 text-[9.5px] font-medium uppercase tracking-[0.08em] text-zinc-600">{g}</div>}
              <div className={cn('rounded-lg px-2.5 py-[7px] text-[12.5px]', i === 0 ? 'bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' : 'text-zinc-500')}>{n}</div>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg px-2 py-2">
          <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-indigo-500 text-[10px] font-bold text-white">IB</span>
          <div className="leading-tight"><div className="text-[12px] text-zinc-200">Your business</div><div className="text-[10.5px] text-zinc-500">All connected</div></div>
        </div>
      </div>

      {/* main */}
      <div className="flex min-w-0 flex-col gap-4 p-6">
        <div className="flex items-end justify-between">
          <div><div className="text-[20px] font-medium tracking-tight">Good morning</div><div className="mt-0.5 text-[12px] text-zinc-500">Your broker, channel and socials — last 30 days.</div></div>
          <div className="flex rounded-lg bg-white/[0.04] p-0.5 text-[11px] text-zinc-500">
            {['7D', '30D', '90D'].map(p => <span key={p} className={cn('rounded-md px-2.5 py-1', p === '30D' && 'bg-white/[0.08] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]')}>{p}</span>)}
          </div>
        </div>

        <div className="grid grid-cols-4 divide-x divide-white/[0.06] rounded-xl bg-white/[0.025] py-4 ring-1 ring-white/[0.05]">
          {kpis.map(([k, v, d, s]) => (
            <div key={k} className="px-4">
              <div className={label}>{k}</div>
              <div className={cn(num, 'mt-1.5 text-[21px] text-white')}>{v}</div>
              <div className="mt-1 flex items-center justify-between"><Delta v={d} /><Spark data={s} go={go} className="h-4 w-12" /></div>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-4">
          <div className="flex flex-col rounded-xl bg-white/[0.025] p-4 ring-1 ring-white/[0.05]">
            <div className="flex items-baseline justify-between"><span className={label}>Your book</span><span className="text-[10.5px] text-zinc-600">11 Sep – 10 Oct</span></div>
            <div className="mt-2 min-h-0 flex-1"><AreaChart data={BOOK} w={460} h={170} go={go} className="h-full" /></div>
            <div className="mt-4 grid grid-cols-4 gap-3 border-t border-white/[0.06] pt-3">
              {SOURCES.map(([m, n, w, c], i) => (
                <div key={n}>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">{m}{n}</div>
                  <div className="mt-2 h-[3px] rounded-full bg-white/[0.06]"><motion.div className={cn('h-full rounded-full', c)} initial={{ width: 0 }} animate={go ? { width: `${w}%` } : {}} transition={{ delay: 0.8 + i * 0.1, duration: 1, ease }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-4">
            <div className="flex gap-3 rounded-xl bg-white/[0.025] p-3 ring-1 ring-white/[0.05]">
              <ReelThumb caption="My morning routine" views="184K" go={go} className="h-[100px] w-[68px] shrink-0" />
              <div className="min-w-0 py-0.5">
                <div className={label}>Top post</div>
                <div className={cn(num, 'mt-1 text-[17px] text-white')}>184K <span className="text-[11px] font-normal tracking-normal text-zinc-500">views</span></div>
                <div className="mt-1 text-[11px] text-zinc-500">Brought <span className="text-zinc-100">96 joins</span></div>
                <div className="mt-1.5"><Delta v="38× usual" /></div>
              </div>
            </div>
            <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-white/[0.025] p-2 ring-1 ring-white/[0.05]">
              <div className="flex items-center justify-between px-2 pb-1 pt-1"><span className={label}>Activity</span><LiveDot /></div>
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                  {rows.map(({ key, d: [n, from, a, v], age }) => (
                    <motion.div key={key} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1 - age * 0.2, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
                      className={cn('flex h-10 items-center gap-2.5 rounded-lg px-2 text-[11.5px]', age === 0 && 'bg-white/[0.04]')}>
                      <PersonFrom name={n} i={((key % 6) + 6) % 6} from={from} />
                      <span className="min-w-0 flex-1 truncate text-zinc-500"><span className="font-medium text-zinc-100">{n}</span> {a} <span className="text-zinc-200">{v}</span></span>
                      <span className="text-[10px] tabular-nums text-zinc-600">{age === 0 ? 'now' : `${age * 2}m`}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Everything it's connected to, popping in ──────────────────────────── */

type Pop = { mark: React.ReactNode; from: string; text: React.ReactNode; c: string }

const POPS: Pop[] = [
  { mark: <BrokerMark className="size-8" />, from: 'Your broker', text: <><b>Maya</b> deposited <b>+$4,200</b></>, c: '#4f9dff' },
  { mark: <InstagramMark className="size-8" />, from: 'Instagram', text: <>Your reel brought <b>96 joins</b></>, c: '#f472b6' },
  { mark: <TelegramMark className="size-8" />, from: 'Your channel', text: <><b>43 people</b> joined today</>, c: '#38bdf8' },
  { mark: <LiquexMark className="size-8" />, from: 'Mini App', text: <><b>Daniel</b> verified · VIP access</>, c: '#6ee7b7' },
  { mark: <TikTokMark className="size-8" />, from: 'TikTok', text: <>New post hit <b>12.4K views</b></>, c: '#22d3ee' },
  { mark: <TelegramMark className="size-8" />, from: 'Your DMs', text: <><b>Chloe</b> messaged you · new lead</>, c: '#a78bfa' },
  { mark: <span className="grid size-8 place-items-center rounded-[9px] bg-violet-400/15 ring-1 ring-violet-300/30"><AiGlyph className="size-4" /></span>, from: 'Next step', text: <>Call <b>Ryan</b> — he moved IB</>, c: '#a78bfa' },
]

/** Where pops land: around the edges, overlapping the app. */
const SLOTS: { style: React.CSSProperties; from: { x: number; y: number } }[] = [
  { style: { left: 0, top: 210 }, from: { x: -24, y: 0 } },
  { style: { right: 0, top: 36 }, from: { x: 24, y: 0 } },
  { style: { left: 20, top: 470 }, from: { x: -24, y: 0 } },
  { style: { right: 0, top: 590 }, from: { x: 24, y: 0 } },
]

function PopCard({ p }: { p: Pop }) {
  return (
    <div className="flex w-[280px] items-center gap-3 rounded-2xl bg-[#0f1013]/95 p-3 pr-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <span className="shrink-0 rounded-[9px]">{p.mark}</span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="flex items-center justify-between text-[11px]"><span className="font-medium" style={{ color: p.c }}>{p.from}</span><span className="text-zinc-600">now</span></div>
        <div className="mt-1 truncate text-[12.5px] text-zinc-300 [&_b]:font-medium [&_b]:text-white">{p.text}</div>
      </div>
    </div>
  )
}

function Pops({ go }: { go: boolean }) {
  const t = useCycle(100000, go, 1700)
  // each tick, the next slot gets the next pop — so they arrive one at a time and never repeat on screen
  return (
    <>
      {SLOTS.map((s, i) => {
        const n = t - ((((t - i) % SLOTS.length) + SLOTS.length) % SLOTS.length)
        if (n < 0 && t < SLOTS.length) return null
        const p = POPS[((n % POPS.length) + POPS.length) % POPS.length]
        return (
          <div key={i} className="absolute z-10" style={s.style}>
            <AnimatePresence mode="wait">
              {go && n >= 0 && (
                <motion.div key={n} initial={{ opacity: 0, scale: 0.92, ...s.from }} animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.5, ease }}>
                  <PopCard p={p} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </>
  )
}

export function Stage() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="relative" style={{ width: W, height: H }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, ease }}
        className="absolute inset-x-[120px] inset-y-[20px]">
        <App go={go} />
      </motion.div>
      <Pops go={go} />
    </div>
  )
}

/**
 * The hero video. Set HERO_VIDEO to an .mp4 (plays muted on loop) or a
 * YouTube/Vimeo embed URL. Until then a placeholder frame shows.
 */
const HERO_VIDEO = ''

function HeroVideo() {
  const isFile = /\.(mp4|webm|mov)(\?|$)/i.test(HERO_VIDEO)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease }}
      id="video" className="relative mx-auto mt-14 max-w-5xl scroll-mt-24 sm:mt-16">
      <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.12),rgba(167,139,250,0.08),transparent)] blur-2xl" />
      {HERO_VIDEO ? (
        <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#08090b] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          {isFile
            ? <video src={HERO_VIDEO} autoPlay muted loop playsInline className="size-full object-cover" />
            : <iframe src={HERO_VIDEO} title="Liquex" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="size-full" />}
        </div>
      ) : (
        /* until the film is ready: the Home screen, live */
        <div className="relative"><HomeHero /></div>
      )}
    </motion.div>
  )
}

export function ConvergeHero() {
  return (
    <div className="relative isolate overflow-hidden px-3 pb-16 pt-32 sm:px-6 sm:pt-40">
      {/* a soft aurora behind the headline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]" style={{ backgroundImage: 'radial-gradient(40% 45% at 35% 30%, rgba(56,189,248,0.10), transparent 70%), radial-gradient(40% 45% at 65% 32%, rgba(139,92,246,0.12), transparent 70%)' }} />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
          className="inline-block text-[14px] font-medium text-zinc-400">
          For IBs, partners and affiliates
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.9, ease }}
          className="mt-6 text-balance text-[2.4rem] font-medium leading-[1.06] tracking-tight sm:text-[3.4rem] lg:text-[3.75rem]">
          The full-stack platform<br className="hidden sm:block" /> <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text pb-1 text-transparent">to run your affiliate business.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease }}
          className="mx-auto mt-5 max-w-lg text-pretty text-[16px] leading-7 text-zinc-400">
          See which content brings you funded traders, verify clients automatically and know who’s about to move IB. All in one place.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease }} className="mt-8 flex items-center justify-center gap-2">
          <Button asChild className="h-11 rounded-full bg-white px-6 text-[15px] text-black hover:bg-white/90"><a href={GET_URL}>Book a demo</a></Button>
          <Button asChild variant="ghost" className="h-11 rounded-full bg-white/[0.06] px-6 text-[15px] hover:bg-white/10"><a href="https://app.liquex.co/auth">Log in</a></Button>
        </motion.div>
      </div>

      <HeroVideo />
    </div>
  )
}
