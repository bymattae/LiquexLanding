import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownLeft, ShieldCheck, Sparkles, UserPlus, MessageCircle, ArrowUpRight } from 'lucide-react'
import { InstagramMark, TikTokMark, YouTubeMark } from '@/components/affiliate/premium'
import { AppWindow, Card, DotMatrix, Fit, Line, Live, NetBars, SegMeter, T, useClock } from './kit'

/**
 * The homepage hero, until the film is ready: the Liquex Home screen, live.
 * Every couple of seconds something happens — a join, a lead, a deposit, a
 * verification, an AI insight — and the numbers, funnel and feed react.
 * Dummy figures throughout.
 */

const W = 1180, H = 720
const ease = [0.16, 1, 0.3, 1] as const

type Ev = { k: 'join' | 'lead' | 'dep' | 'ver' | 'ai'; who: string; text: React.ReactNode; sub: React.ReactNode; amt?: number }
const src = (m: React.ReactNode, t: string) => <span className="inline-flex items-center gap-1 rounded-md bg-[#141414] px-1.5 py-0.5 text-[11.5px] text-[#ededed] [&_svg]:size-3">{m}{t}</span>
const EVENTS: Ev[] = [
  { k: 'join', who: 'Ava Morgan', text: <><b>Ava Morgan</b> joined your channel</>, sub: src(<InstagramMark />, 'Instagram · Bio') },
  { k: 'lead', who: 'Leo Turner', text: <><b>Leo Turner</b> sent you a message</>, sub: <span className="text-[#8f8f8f]">“How do I join the VIP?”</span> },
  { k: 'dep', who: 'Maya Ross', text: <><b>Maya Ross</b> deposited</>, sub: <span className="text-[hsl(145_55%_55%)]">+$4,200</span>, amt: 4200 },
  { k: 'ver', who: 'Noah Price', text: <><b>Noah Price</b> got verified</>, sub: <span className="text-[#8f8f8f]">VIP access given automatically</span> },
  { k: 'join', who: 'Ethan Cole', text: <><b>Ethan Cole</b> joined your channel</>, sub: src(<TikTokMark />, 'TikTok · Bio') },
  { k: 'ai', who: 'AI', text: <><b>Your reel</b> is doing 3.8× your usual</>, sub: <span className="text-[hsl(248_85%_82%)]">Post more like “My morning routine”</span> },
  { k: 'dep', who: 'Daniel Reyes', text: <><b>Daniel Reyes</b> deposited</>, sub: <span className="text-[hsl(145_55%_55%)]">+$2,500</span>, amt: 2500 },
  { k: 'join', who: 'Chloe Martin', text: <><b>Chloe Martin</b> joined your channel</>, sub: src(<YouTubeMark />, 'YouTube · Description') },
  { k: 'ver', who: 'Isla Grant', text: <><b>Isla Grant</b> got verified</>, sub: <span className="text-[#8f8f8f]">VIP access given automatically</span> },
]
const ICON: Record<Ev['k'], [React.ReactNode, string]> = {
  join: [<UserPlus />, 'bg-[hsl(199_85%_65%/0.14)] text-[hsl(199_85%_72%)]'],
  lead: [<MessageCircle />, 'bg-[hsl(248_85%_74%/0.14)] text-[hsl(248_85%_80%)]'],
  dep: [<ArrowDownLeft />, 'bg-[hsl(145_55%_55%/0.14)] text-[hsl(145_55%_60%)]'],
  ver: [<ShieldCheck />, 'bg-[hsl(145_55%_55%/0.14)] text-[hsl(145_55%_60%)]'],
  ai: [<Sparkles />, 'bg-[hsl(248_85%_74%/0.14)] text-[hsl(248_85%_80%)]'],
}

const money = (n: number) => '$' + n.toLocaleString('en-US')

function Stat({ title, value, delta, viz }: { title: string; value: string; delta: string; viz: React.ReactNode }) {
  return (
    <Card className="flex flex-col p-4">
      <span className="flex items-center justify-between text-[14px] text-[#b3b3b3]">{title}<span className="grid size-7 place-items-center rounded-full bg-[#141414] text-[#8f8f8f]"><ArrowUpRight className="size-3.5" /></span></span>
      <span className="mt-1 text-[28px] font-medium leading-tight tracking-tight tabular-nums"><Live v={value} /></span>
      <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-md bg-[hsl(145_55%_55%/0.14)] px-1.5 py-0.5 text-[11.5px] text-[hsl(145_55%_60%)]">↗ {delta}</span>
      <span className="mt-3 block h-9 overflow-hidden">{viz}</span>
    </Card>
  )
}

export function HomeHero({ minScale = 0.5 }: { minScale?: number } = {}) {
  const { ref, t } = useClock(2300)
  const seen = EVENTS.slice(0, 0)
  for (let i = 0; i < t + 3; i++) seen.unshift(EVENTS[i % EVENTS.length])
  const count = (k: Ev['k']) => seen.filter(e => e.k === k).length
  const deposits = seen.reduce((a, e) => a + (e.amt ?? 0), 0)
  const joins = 2140 + count('join'), leads = 1380 + count('lead'), verified = 420 + count('ver'), funded = 186 + count('dep')
  const feed = seen.slice(0, 5)
  const now = seen[0]
  const funnel: [string, number, string][] = [['Joined', joins, T.info], ['Leads', leads, T.accent], ['Verified', verified, T.success], ['Funded', funded, T.success], ['Active', 312 + count('dep'), T.warning]]

  return (
    <div ref={ref}>
      <Fit w={W} h={H} minScale={minScale}>
        <AppWindow active="home" title="Home">
          <div className="flex items-end justify-between">
            <div><div className="text-[22px] font-medium tracking-tight">Good afternoon</div><div className="mt-1 text-[14px] text-[#8f8f8f]">Here’s how your business has done over the last 30 days.</div></div>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-4">
            <Stat title="Your balance" value={money(184920 + Math.round(deposits * 0.04))} delta="12.4%" viz={<Line values={[60, 58, 62, 61, 66, 70, 68, 74, 78, 82 + t % 3]} />} />
            <Stat title="New joins" value={joins.toLocaleString('en-US')} delta="24.0%" viz={<DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 2 + count('join')]} />} />
            <Stat title="Active clients" value={String(312 + count('dep'))} delta="6.0%" viz={<SegMeter share={0.3 + Math.min(0.2, count('dep') * 0.02)} />} />
            <Stat title="Net funding" value={'+' + money(62410 + deposits)} delta="4.6%" viz={<NetBars values={[8, -2, 6, 3, -1, 2, 1, -1, 2, 1, 0, 1, 2, -1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 3 + count('dep')]} />} />
          </div>

          <div className="mt-4 grid grid-cols-[1.55fr_1fr] gap-4">
            {/* the funnel: every stage of the business, live */}
            <Card className="relative overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-4 text-[14px] font-medium">Your funnel<span className="text-[12px] font-normal text-[#8f8f8f]">Last 30 days</span></div>
              <div className="mt-3 grid grid-cols-5 divide-x divide-[#1c1c1c]">
                {funnel.map(([k, v, c]) => (
                  <div key={k} className="relative z-10 px-5 py-3">
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#b3b3b3]"><span className="size-1.5 rounded-full" style={{ background: c }} />{k}</div>
                    <div className="mt-1 text-[20px] font-medium tabular-nums"><Live v={v.toLocaleString('en-US')} /></div>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 700 250" preserveAspectRatio="none" className="mt-2 h-[250px] w-full" aria-hidden>
                <defs>
                  <linearGradient id="hh-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="hsl(248 85% 74%)" stopOpacity="0.22" /><stop offset="1" stopColor="hsl(248 85% 74%)" stopOpacity="0" /></linearGradient>
                </defs>
                <motion.path d="M0,30 C100,36 120,70 140,80 C220,100 260,118 280,124 C360,142 400,160 420,166 C500,182 540,196 560,200 C620,210 670,214 700,216 L700,250 L0,250 Z" fill="url(#hh-fill)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.2 }} />
                <motion.path d="M0,30 C100,36 120,70 140,80 C220,100 260,118 280,124 C360,142 400,160 420,166 C500,182 540,196 560,200 C620,210 670,214 700,216" fill="none" stroke="hsl(248 85% 74%)" strokeWidth="2" vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 1.8, ease }} />
                {[140, 280, 420, 560].map(x => <line key={x} x1={x} x2={x} y1={0} y2={250} stroke="#1c1c1c" />)}
              </svg>
            </Card>

            {/* the feed: what just happened */}
            <Card className="relative overflow-hidden p-4">
              <div className="flex items-center justify-between text-[14px] font-medium">Activity<span className="flex items-center gap-1.5 text-[12px] font-normal text-[hsl(145_55%_55%)]"><span className="size-1.5 rounded-full bg-current" />Live</span></div>
              <div className="mt-3 space-y-2">
                <AnimatePresence initial={false}>
                  {feed.map((e, i) => (
                    <motion.div key={`${t + 3 - i}`} layout initial={{ opacity: 0, y: -16, scale: 0.97 }} animate={{ opacity: 1 - i * 0.14, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}
                      className={`flex gap-3 rounded-xl px-3 py-2.5 ${i === 0 ? 'bg-[#141414]' : ''}`}>
                      <span className={`grid size-8 shrink-0 place-items-center rounded-full [&_svg]:size-4 ${ICON[e.k][1]}`}>{ICON[e.k][0]}</span>
                      <span className="min-w-0 flex-1 text-[13px] leading-5 [&_b]:font-medium">
                        <span className="block truncate">{e.text}</span>
                        <span className="mt-0.5 block truncate text-[12px]">{e.sub}</span>
                      </span>
                      <span className="text-[11px] text-[#8f8f8f]">{i === 0 ? 'now' : `${i * 2}m`}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {feed.length === 0 && <div className="grid h-40 place-items-center text-[12.5px] text-[#8f8f8f]">Waiting for activity…</div>}
              </div>
            </Card>
          </div>

          {/* a pop-up for the big moments */}
          <div className="pointer-events-none absolute bottom-6 right-6">
            <AnimatePresence mode="wait">
              {now && (now.k === 'dep' || now.k === 'ai') && (
                <motion.div key={t} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.4, ease }}
                  className="flex w-[300px] gap-3 rounded-2xl bg-[#141414] p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full [&_svg]:size-4 ${ICON[now.k][1]}`}>{ICON[now.k][0]}</span>
                  <span className="text-[13px] leading-5 [&_b]:font-medium"><span className="block">{now.text}</span><span className="block text-[12px]">{now.sub}</span></span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AppWindow>
      </Fit>
    </div>
  )
}
