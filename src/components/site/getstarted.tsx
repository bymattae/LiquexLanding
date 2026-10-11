import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, ShieldCheck, TrendingUp, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { InstagramMark, TikTokMark } from '@/components/affiliate/premium'
import { AppWindow, Badge, Card, Chip, DeltaPill, DotMatrix, Fit, Kpi, Line, NetBars, SegMeter, T } from '@/components/app/kit'
import { GET_URL } from './chrome'

/**
 * The closing section on every page (after Mochi's "Get up and running"):
 * three steps on a line that fills as you read, then the product itself —
 * a live activity feed beside the Home dashboard, cropped and fading out.
 */

const ease = [0.16, 1, 0.3, 1] as const

const STEPS = [
  ['Book a call', 'Tell us about your business on a quick call.'],
  ['Sync your data', 'We’ll connect your broker, Telegram and socials.'],
  ['Supercharge your IB', 'You’ll see the results of Liquex after day one.'],
]

const FEED: [React.ReactNode, React.ReactNode, React.ReactNode?][] = [
  [<UserPlus />, <><b>Ava Morgan</b> joined via</>, <Chip><InstagramMark />Instagram · Bio</Chip>],
  [<MessageCircle />, <><b>Leo Turner</b> sent you a message</>, <Badge s="New lead" />],
  [<ShieldCheck />, <><b>Chloe Martin</b> got verified</>, <Badge s="Verified" />],
  [<TrendingUp />, <><b>Maya Ross</b> deposited</>, <span className="text-[12px] font-medium text-[hsl(145_55%_55%)]">+$4,200</span>],
  [<UserPlus />, <><b>Noah Price</b> joined via</>, <Chip><TikTokMark />TikTok · Bio</Chip>],
]

function useLoop(ms: number, go: boolean) {
  const [t, setT] = useState(0)
  useEffect(() => { if (!go) return; const id = setInterval(() => setT(x => x + 1), ms); return () => clearInterval(id) }, [go, ms])
  return t
}

/** The accent each page closes in: Liquex violet on the homepage, the stage colour on a stage page. */
const ACCENT = {
  violet: { aura: 'rgba(139,120,245,0.16)', title: 'text-[hsl(248_85%_80%)]', dot: 'bg-[hsl(248_85%_74%)]', bar: 'bg-[hsl(248_85%_74%/0.7)]', glow: 'bg-[hsl(248_85%_74%/0.12)]', chip: 'bg-[hsl(248_85%_74%/0.14)] text-[hsl(248_85%_82%)]' },
  pink: { aura: 'rgba(244,114,182,0.14)', title: 'bg-gradient-to-r from-pink-200 to-rose-400 bg-clip-text text-transparent', dot: 'bg-pink-300', bar: 'bg-pink-300/70', glow: 'bg-pink-300/[0.10]', chip: 'bg-pink-300/[0.14] text-pink-200' },
  sky: { aura: 'rgba(56,189,248,0.14)', title: 'bg-gradient-to-r from-sky-200 to-cyan-400 bg-clip-text text-transparent', dot: 'bg-sky-300', bar: 'bg-sky-300/70', glow: 'bg-sky-300/[0.10]', chip: 'bg-sky-300/[0.14] text-sky-200' },
  blue: { aura: 'rgba(96,140,250,0.15)', title: 'bg-gradient-to-r from-blue-200 to-indigo-400 bg-clip-text text-transparent', dot: 'bg-blue-300', bar: 'bg-blue-300/70', glow: 'bg-blue-300/[0.10]', chip: 'bg-blue-300/[0.14] text-blue-200' },
  emerald: { aura: 'rgba(52,211,153,0.13)', title: 'bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-transparent', dot: 'bg-emerald-300', bar: 'bg-emerald-300/70', glow: 'bg-emerald-300/[0.10]', chip: 'bg-emerald-300/[0.14] text-emerald-200' },
}
export type Accent = keyof typeof ACCENT

export function GetStarted({ title = ['Liquex is', 'the level up.'], accent = 'violet', framed = true }: { title?: [string, string]; accent?: Accent; framed?: boolean }) {
  const a = ACCENT[accent]
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-120px' })
  const step = Math.min(2, useLoop(1100, go))
  const t = useLoop(2600, go)
  const rows = Array.from({ length: 4 }, (_, i) => ({ k: t - i, r: FEED[((t - i) % FEED.length + FEED.length) % FEED.length], age: i }))
  return (
    <section className="px-3 sm:px-6">
      <div ref={ref} className={cn('relative isolate mx-auto max-w-6xl overflow-hidden px-6 pt-20 sm:px-14 sm:pt-24', framed && 'border border-white/[0.08]')}>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" style={{ backgroundImage: `radial-gradient(45% 60% at 22% 20%, ${a.aura}, transparent 70%)` }} />

        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            className="text-balance text-[2.25rem] font-medium leading-[1.05] tracking-tight sm:text-[3.25rem]">{title[0]} <span className={cn('pb-1', a.title)}>{title[1]}</span></motion.h2>
          <Button asChild className="h-11 rounded-full bg-white px-6 text-[15px] text-black hover:bg-white/90"><a href={GET_URL}>Book a demo</a></Button>
        </div>

        {/* three steps on a line that fills */}
        <div className="relative mt-14 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {STEPS.map(([h, d], i) => (
            <div key={h}>
              <div className="flex items-center gap-3">
                <span className={cn('relative grid size-3 place-items-center rounded-full transition-colors duration-500', i <= step && go ? a.dot : 'bg-white/20')}>
                  {i === step && go && <span className={cn('absolute inset-0 animate-ping rounded-full opacity-50', a.dot)} />}
                </span>
                <span className="relative h-px flex-1 bg-white/10">
                  <motion.span className={cn('absolute inset-y-0 left-0', a.bar)} initial={{ width: '0%' }} animate={go && i < step ? { width: '100%' } : {}} transition={{ duration: 1, ease }} />
                </span>
              </div>
              <div className={cn('mt-5 text-[17px] font-medium tracking-tight transition-colors duration-500', i <= step && go ? 'text-white' : 'text-zinc-500')}>{h}</div>
              <p className="mt-1.5 max-w-xs text-[14.5px] leading-6 text-zinc-400">{d}</p>
            </div>
          ))}
        </div>

        {/* the product, cropped */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 1.1, ease }} className="relative mt-10 h-[270px] md:mt-14 md:h-[400px]">
          <div className="absolute inset-x-0 top-0 grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr]">
            {/* activity, phone-like */}
            <Card className="hidden h-[420px] overflow-hidden rounded-[28px] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:block">
              <div className="text-[20px] font-semibold tracking-tight">Activity</div>
              <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[hsl(145_55%_55%)]"><span className="relative flex size-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" /><span className="size-1.5 rounded-full bg-current" /></span>Live</div>
              <div className="mt-3">
                <AnimatePresence initial={false}>
                  {rows.map(({ k, r: [ic, txt, tag], age }) => (
                    <motion.div key={k} layout initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1 - age * 0.18, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
                      className={cn('mb-2 rounded-2xl p-3 text-[12.5px] leading-5 transition-colors duration-[1500ms] [&_b]:font-medium', age === 0 && t > 0 ? a.glow : 'bg-[#111111]')}>
                      <div className="flex items-start gap-2.5">
                        <span className={cn('grid size-7 shrink-0 place-items-center rounded-full [&_svg]:size-3.5', a.chip)}>{ic}</span>
                        <div className="min-w-0"><div className="text-[#cfcfcf]">{txt}</div>{tag && <div className="mt-1">{tag}</div>}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Card>

            {/* home */}
            <div className="overflow-hidden rounded-[22px]">
              <Fit w={1000} h={600} minScale={0.5}>
              <AppWindow active="home" title="Home" w={1000} h={600}>
                <div className="pt-1"><div className="text-[22px] font-medium tracking-tight">Good afternoon</div><div className="mt-1 text-[14px] text-[#8f8f8f]">Here’s how your business has done over the last 30 days.</div></div>
                <div className="mt-5 grid grid-cols-4 gap-4">
                  <Kpi title="Your balance" value="$184,920" delta={<DeltaPill v="12.4%" />} viz={<Line values={[60, 58, 62, 61, 66, 70, 68, 74, 78, 82]} />} />
                  <Kpi title="New joins" value="2,140" delta={<DeltaPill v="24.0%" />} viz={<DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3]} />} />
                  <Kpi title="Active clients" value="312" delta={<DeltaPill v="6.0%" />} viz={<SegMeter share={0.3} />} />
                  <Kpi title="Net funding" value="+$62,410" delta={<DeltaPill v="4.6%" />} viz={<NetBars values={[8, -2, 6, 3, -1, 2, 1, -1, 2, 1, 0, 1, 2, -1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 3]} />} />
                </div>
                <Card className="relative mt-4 overflow-hidden">
                  <div className="grid grid-cols-5 divide-x divide-[#1c1c1c]">
                    {[['Joined', '2,140', T.info], ['Leads', '1,380', T.accent], ['Verified', '420', T.success], ['Funded', '186', T.success], ['Active', '312', T.warning]].map(([k, v, c]) => (
                      <div key={k} className="relative z-10 px-5 py-4"><div className="flex items-center gap-1.5 text-[12.5px] text-[#b3b3b3]"><span className="size-1.5 rounded-full" style={{ background: c }} />{k}</div><div className="mt-1 text-[20px] font-medium tabular-nums">{v}</div></div>
                    ))}
                  </div>
                  <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="h-[120px] w-full" aria-hidden>
                    <defs><linearGradient id="gs-fun" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="hsl(248 85% 74%)" stopOpacity="0.14" /><stop offset="1" stopColor="hsl(248 85% 74%)" stopOpacity="0" /></linearGradient></defs>
                    <motion.path d="M0,20 C150,24 180,40 200,44 C320,52 380,60 400,62 C520,70 580,78 600,80 C720,86 780,92 800,94 C900,98 960,100 1000,102 L1000,120 L0,120 Z" fill="url(#gs-fun)" initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: 1, duration: 1.2 }} />
                  </svg>
                </Card>
              </AppWindow>
              </Fit>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
