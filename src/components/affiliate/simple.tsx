import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Users, BellRing, CircleHelp, Clock, EyeOff, Hand, MessageCircleOff, UserX, Sparkles, Bell, Bot, Film, Zap, Inbox, KeyRound, Link2, Plug, RotateCcw, ShieldCheck, Trophy, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoCloud } from '@/components/blocks/logo-cloud'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { CALENDLY_URL, GET_URL } from '@/components/site/chrome'
import { SmartLink } from '@/components/site/link'
import { IconContext, BellRinging as PhBellRinging, ChartBar as PhChartBar, FilmStrip as PhFilmStrip, LinkSimple as PhLinkSimple, LockKey as PhLockKey, Robot as PhRobot, ShieldCheck as PhShieldCheck, Sparkle as PhSparkle, Tray as PhTray, Trophy as PhTrophy, Users as PhUsers, Wallet as PhWallet } from '@phosphor-icons/react'
import { AiGlyph, Tick } from './animated'
import { Avatar, BrokerMark, InstagramMark, LiquexMark, TelegramMark, TikTokMark, YouTubeMark } from './premium'
import { AiViz, LinksViz, RulesViz } from './rowviz'
import { ConvertFlow, GrowFlow, RetainFlow, VerifyFlow } from '@/components/app/flows'

/**
 * AffiliateOS: Grok's calm structure, inside square hairline frames, with
 * one accent colour per tool so the page reads as many parts of one system.
 */

export const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

export const line = 'border-white/[0.08]'

/** Each tool's colour: text, solid (iOS-style filled tile), soft fill, and the wash behind its visual. */
export const tile = 'text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
export const TONE = {
  emerald: { text: 'text-emerald-300', grad: 'bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-transparent', tint: 'bg-emerald-400/[0.13] text-emerald-200', solid: 'bg-gradient-to-b from-[#5DB585] to-[#46A06F]', fill: 'bg-emerald-300/10 ring-emerald-300/20', wash: 'rgba(52,211,153,0.2)' },
  pink: { text: 'text-pink-300', grad: 'bg-gradient-to-r from-pink-200 to-rose-400 bg-clip-text text-transparent', tint: 'bg-pink-400/[0.13] text-pink-200', solid: 'bg-gradient-to-b from-[#DA7690] to-[#C8607C]', fill: 'bg-pink-300/10 ring-pink-300/20', wash: 'rgba(244,114,182,0.2)' },
  sky: { text: 'text-sky-300', grad: 'bg-gradient-to-r from-sky-200 to-cyan-400 bg-clip-text text-transparent', tint: 'bg-sky-400/[0.13] text-sky-200', solid: 'bg-gradient-to-b from-[#5AACCF] to-[#4596BA]', fill: 'bg-sky-300/10 ring-sky-300/20', wash: 'rgba(56,189,248,0.2)' },
  blue: { text: 'text-blue-300', grad: 'bg-gradient-to-r from-blue-200 to-indigo-400 bg-clip-text text-transparent', tint: 'bg-blue-400/[0.13] text-blue-200', solid: 'bg-gradient-to-b from-[#6B93E0] to-[#557DCC]', fill: 'bg-blue-400/10 ring-blue-400/20', wash: 'rgba(51,144,236,0.22)' },
  violet: { text: 'text-violet-300', grad: 'bg-gradient-to-r from-violet-200 to-purple-400 bg-clip-text text-transparent', tint: 'bg-violet-400/[0.13] text-violet-200', solid: 'bg-gradient-to-b from-[#9C84DA] to-[#866CC8]', fill: 'bg-violet-300/10 ring-violet-300/20', wash: 'rgba(167,139,250,0.22)' },
  rose: { text: 'text-rose-300', grad: 'bg-gradient-to-r from-rose-200 to-red-400 bg-clip-text text-transparent', tint: 'bg-rose-400/[0.13] text-rose-200', solid: 'bg-gradient-to-b from-[#D86E6E] to-[#C45858]', fill: 'bg-rose-300/10 ring-rose-300/20', wash: 'rgba(251,113,133,0.17)' },
  amber: { text: 'text-amber-300', grad: 'bg-gradient-to-r from-amber-200 to-orange-400 bg-clip-text text-transparent', tint: 'bg-amber-400/[0.13] text-amber-200', solid: 'bg-gradient-to-b from-[#D9A04E] to-[#C68A38]', fill: 'bg-amber-300/10 ring-amber-300/20', wash: 'rgba(252,211,77,0.17)' },
} as const
export type Tone = keyof typeof TONE

export const wash = (t: Tone, at = '50% 0%') => ({ backgroundImage: `radial-gradient(70% 70% at ${at}, ${TONE[t].wash}, transparent 70%)` })

/** A square frame: content between hairlines. */
export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('relative mx-auto max-w-6xl border', line, className)}>{children}</div>
}

export function Divider() {
  return <div aria-hidden className="h-16 sm:h-24" />
}

/** A title with its second half in grey (tone is kept for callers but no longer colours it). */
export function Title({ a, b, tone = 'emerald', sub, className }: { a: string; b: string; tone?: Tone; sub?: string; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-2xl px-6 text-center', className)}>
      <motion.h2 {...reveal} className="text-balance text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl">
        {a} <span data-tone={tone} className="text-zinc-500">{b}</span>
      </motion.h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-balance text-[17px] leading-7 text-zinc-400">{sub}</p>}
    </div>
  )
}

/** A coloured pill: icon and label inside. */
export function Pill({ tone, icon, children }: { tone: Tone; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span data-tone={tone} className={cn('inline-flex items-center gap-2 text-[15px] font-semibold [&_svg]:size-[18px]', TONE[tone].text)}>
      {icon}{children}
    </span>
  )
}

/** Three points, split by faint hairlines — the rough-edged list. */
export function Points({ items, tone }: { items: string[]; tone: Tone }) {
  return (
    <ul className={cn('mt-8 divide-y border-y', line, '[&>li]:border-white/[0.08]')}>
      {items.map((i, n) => (
        <li key={i} className="flex items-center gap-4 py-4 text-[15px] text-zinc-200">
          <span data-tone={tone} className="w-5 text-[11px] font-medium tabular-nums text-zinc-500">0{n + 1}</span>{i}
        </li>
      ))}
    </ul>
  )
}

/* ── Logos ─────────────────────────────────────────────────────────────── */

export function SimpleLogos({ logos }: { logos: { src: string; alt: string; width: number }[] }) {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="px-6 py-8">
        <p className="text-center text-[12px] text-zinc-600">Connected to the brokers your clients already trade with</p>
        <div className="mt-6 opacity-60"><LogoCloud logos={logos} /></div>
      </Frame>
    </div>
  )
}

/* ── Every tool (square grid) ──────────────────────────────────────────── */

const TOOLS: { tone: Tone; icon: React.ReactNode; title: string; text: string }[] = [
  { tone: 'emerald', icon: <Wallet />, title: 'Client book', text: 'Every client under your IB — balance, deposits, lots.' },
  { tone: 'pink', icon: <Film />, title: 'Content analytics', text: 'See which posts bring traders who actually deposit.' },
  { tone: 'sky', icon: <Link2 />, title: 'Tracked links', text: 'Know which link every funded client came from.' },
  { tone: 'blue', icon: <ShieldCheck />, title: 'Auto-verification', text: 'Clients prove they’re under your IB, in Telegram.' },
  { tone: 'violet', icon: <AiGlyph />, title: 'AI next steps', text: 'Know who’s about to move IB — before they do.' },
  { tone: 'amber', icon: <Zap />, title: 'Automations', text: 'VIP in and out, based on balance and trades.' },
]

export function Bento() {
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-14 pt-20 sm:pt-24">
          <Title a="Built for IBs." b="One login." sub="Everything you need to bring in traders, keep them funded and keep the lots coming." />
        </div>
        <div className={cn('grid border-t sm:grid-cols-2 lg:grid-cols-3', line)}>
          {TOOLS.map((t, i) => (
            <motion.div key={t.title} {...reveal}
              className={cn('border-b px-8 py-10 sm:px-10', line, i % 2 === 0 && 'sm:border-r', 'lg:border-r', i % 3 === 2 && 'lg:border-r-0', i >= 4 && 'sm:border-b-0', i === 3 && 'lg:border-b-0')}
              style={wash(t.tone, '0% 0%')}>
              <span className={cn('grid size-11 place-items-center rounded-xl ring-1 [&_svg]:size-5', TONE[t.tone].fill, TONE[t.tone].text)}>{t.icon}</span>
              <h3 className="mt-6 text-[18px] font-medium tracking-tight">{t.title}</h3>
              <p className="mt-1.5 text-[14.5px] leading-6 text-zinc-400">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </Frame>
    </section>
  )
}

/* ── And much more ─────────────────────────────────────────────────────── */

const MORE = [
  [Sparkles, 'Ask AI', 'Ask anything about your business', 'text-violet-300'],
  [Inbox, 'Lead CRM', 'Every DM lead, in one list', 'text-violet-300'],
  [Plug, 'Broker connected', 'Deposits and trades, live', 'text-emerald-300'],
  [Bot, 'Your own bot', 'Your name, your brand', 'text-blue-300'],
  [KeyRound, 'VIP access', 'Granted and removed by rules', 'text-amber-300'],
  [RotateCcw, 'Win-back', 'Who left, and with how much', 'text-rose-300'],
  [Film, 'Video analysis', 'What made each post work', 'text-pink-300'],
  [Bell, 'Pop-ups', 'Big deposits, the moment they land', 'text-emerald-300'],
  [Trophy, 'Top clients', 'Your best traders, ranked', 'text-amber-300'],
] as const

export function More() {
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-10 pt-16 sm:px-12">
          <motion.h2 {...reveal} className="text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">And much more</motion.h2>
          <p className="mt-2 text-[15px] text-zinc-400">Everything an IB needs, from the first post to the hundredth client.</p>
        </div>
        <div className={cn('grid border-t sm:grid-cols-2 lg:grid-cols-3', line)}>
          {MORE.map(([Icon, t, s, c], i) => (
            <div key={t} className={cn('flex gap-3.5 border-b px-6 py-6 sm:px-12', line, i % 3 !== 2 && 'lg:border-r', i >= 6 && 'lg:border-b-0')}>
              <Icon className={cn('mt-0.5 size-4 shrink-0', c)} />
              <div><div className="text-[14px] text-zinc-100">{t}</div><div className="mt-0.5 text-[13px] text-zinc-500">{s}</div></div>
            </div>
          ))}
        </div>
      </Frame>
    </section>
  )
}

/* ── Get started ───────────────────────────────────────────────────────── */

const STEPS: [string, string, string, Tone][] = [
  ['01', 'Apply', 'Tell us about your business. Takes 2 minutes.', 'sky'],
  ['02', 'We connect everything', 'Your broker, Telegram and socials — set up with you.', 'violet'],
  ['03', 'Open Liquex', 'Your whole business, in one place, every morning.', 'emerald'],
]

export function GetStarted() {
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-24"><Title a="Get started" b="in a day." tone="violet" /></div>
        <div className={cn('grid border-t md:grid-cols-3', line)}>
          {STEPS.map(([n, t, s, tone], i) => (
            <motion.div key={n} {...reveal} className={cn('px-8 py-10', line, i < 2 && 'border-b md:border-b-0 md:border-r')} style={wash(tone, '0% 0%')}>
              <div className={cn('text-[13px] font-medium tabular-nums', TONE[tone].text)}>{n}</div>
              <h3 className="mt-8 text-[18px] font-medium tracking-tight">{t}</h3>
              <p className="mt-2 text-[14px] leading-6 text-zinc-400">{s}</p>
            </motion.div>
          ))}
        </div>
        <div className={cn('flex justify-center gap-2 border-t py-10', line)}>
          <Button asChild size="lg" className="h-11 rounded-full bg-white px-6 text-black hover:bg-white/90"><a href="#apply">Apply for access</a></Button>
        </div>
      </Frame>
    </section>
  )
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */

const FAQ = [
  ['What is Liquex?', 'One platform for your IB business. It connects your broker, Telegram and socials so you can see which content brings funded traders, verify them automatically and keep them trading.'],
  ['Who is it for?', 'IBs, IB networks and affiliates who bring in traders through content and Telegram. It’s invite-only — we work with a small number at a time.'],
  ['What does it connect?', 'Your broker account, your Telegram channel and bot, and your Instagram, TikTok and YouTube — all in one place.'],
  ['Do my clients need to do anything?', 'Only verify once in your Telegram Mini App. Nothing else changes for them.'],
  ['How much does it cost?', 'Pricing depends on the size of your book. We go through it on your onboarding call — no surprises.'],
  ['How long does setup take?', 'Usually a day. We connect your broker, Telegram and socials with you, so you don’t have to touch anything technical.'],
  ['Do I need to change brokers?', 'No. Liquex works alongside the brokers you already use.'],
  ['How do I get access?', 'Apply below. We onboard a small group of IBs at a time and set each one up personally.'],
]

export function SimpleFaq() {
  return (
    <section className="px-3 sm:px-6">
      <Frame className="grid gap-8 px-6 py-16 sm:px-12 lg:grid-cols-[1fr_1.6fr]">
        <h2 className="text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">Questions</h2>
        <Accordion type="single" collapsible>
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-white/[0.08]">
              <AccordionTrigger className="text-[15px] font-normal">{q}</AccordionTrigger>
              <AccordionContent className="text-zinc-400">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Frame>
    </section>
  )
}

/* ── Ad-traffic pieces: proof, quotes, urgency, apply ──────────────────── */

/**
 * PLACEHOLDERS — every [bracketed] value below must be replaced with a real
 * figure, date or quote before this page goes live. Don't ship brackets.
 */
export const COHORT = '[Month]'
const PROOF = '[$X.XM]'

export function ProofLine() {
  return (
    <p className="mx-auto max-w-6xl px-6 pb-8 text-center text-[13px] text-zinc-400">
      Trusted by IBs managing <span className="font-medium text-zinc-100">{PROOF}</span> in client funds
    </p>
  )
}

/** The mid-page ask, so nobody has to scroll to the end to act. */
export function MidCta() {
  return (
    <section className="px-3 sm:px-6">
      <Frame className="flex flex-col items-center justify-between gap-5 px-8 py-8 sm:flex-row sm:px-12" >
        <div>
          <div className="text-[18px] font-medium tracking-tight">Seen enough?</div>
          <div className="mt-1 text-[14px] text-zinc-400">Next onboarding group opens in <span className="text-zinc-100">{COHORT}</span>. Places are limited.</div>
        </div>
        <Button asChild className="h-11 shrink-0 rounded-full bg-white px-6 text-black hover:bg-white/90"><a href="#apply">Apply for access</a></Button>
      </Frame>
    </section>
  )
}

/** One hard line: the cost of waiting. */
export function CostOfWaiting() {
  return (
    <motion.p {...reveal} className="mx-auto max-w-4xl px-6 text-balance text-center text-[2rem] font-medium leading-[1.12] tracking-tight sm:text-5xl">
      Every week without it, you lose clients <span className="text-rose-300">you never noticed leaving.</span>
    </motion.p>
  )
}

/* ── Apply: booking embed ──────────────────────────────────────────────── */

/**
 * Paste your Calendly link here (e.g. 'https://calendly.com/you/intro').
 * Until it's set, a placeholder shows where the booking widget will sit.
 */

export function Apply() {
  // Hidden until CALENDLY_URL is set — then the booking widget appears here.
  if (!CALENDLY_URL) return <div id="apply" className="scroll-mt-24" />
  const src = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0c0d0f&text_color=f4f4f5&primary_color=6ee7b7`
  return (
    <section id="apply" className="scroll-mt-24 px-3 sm:px-6">
      <div className="mx-auto max-w-6xl"><iframe title="Book a call" src={src} className="h-[680px] w-full" /></div>
    </section>
  )
}

/* ── Sticky bar, once the hero is gone ─────────────────────────────────── */

export function StickyApply() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const apply = document.getElementById('apply')
      const nearForm = apply ? apply.getBoundingClientRect().top < window.innerHeight : false
      setShow(window.scrollY > 700 && !nearForm)
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.35 }}
          className="fixed inset-x-0 top-[58px] z-20 flex justify-center px-3">
          <div className="flex items-center gap-3 rounded-full bg-[#111214]/90 py-1.5 pl-4 pr-1.5 text-[12.5px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-xl">
            <span className="relative flex size-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/60" /><span className="size-1.5 rounded-full bg-emerald-300" /></span>
            <span className="text-zinc-300">Liquex <span className="hidden text-zinc-500 sm:inline">· the platform for IBs</span></span>
            <a href="#apply" className="rounded-full bg-white px-3.5 py-1.5 font-medium text-black hover:bg-white/90">Book a demo</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Facts under the hero ──────────────────────────────────────────────── */

const FACTS = [['4', 'parts of your business, connected'], ['5', 'channels connected'], ['Live', 'every deposit, join and trade'], ['1 day', 'to get set up']]

export function Facts() {
  return (
    <section className="px-3 sm:px-6">
      <Frame className="grid grid-cols-2 lg:grid-cols-4">
        {FACTS.map(([v, k], i) => (
          <div key={k} className={cn('px-6 py-8 sm:px-10', line, i % 2 === 0 && 'border-r', i < 2 && 'border-b lg:border-b-0', i === 1 && 'lg:border-r', i === 2 && 'lg:border-r')}>
            <div className="text-[2.25rem] font-semibold leading-none tracking-[-0.03em] sm:text-[2.75rem]">{v}</div>
            <div className="mt-2 text-[14px] text-zinc-400">{k}</div>
          </div>
        ))}
      </Frame>
    </section>
  )
}

/* ── The platform: one trader, every step, connected ─────────────────── */

const STEPS6: { tone: Tone; icon: React.ReactNode; step: string; sub: string; tool: string; title: string; text: string; points: string[]; href: string; art: React.ReactNode }[] = [
  { tone: 'pink', icon: <Film />, step: 'Grow', sub: 'Bring traders in', tool: 'Content', href: '/grow', title: 'See which content brings traders', text: 'Every reel, post and link is tracked from the moment it goes live. See exactly what brings traders in, and where they came from.', points: ['Which content performs best', 'Which posts bring the most joins', 'Which channels work best'], art: <GrowFlow /> },
  { tone: 'sky', icon: <Inbox />, step: 'Convert', sub: 'Turn joins into leads', tool: 'Channel & CRM', href: '/convert', title: 'Every join and lead in one place', text: 'New Telegram joins, leads and DMs land in one list as they happen. Nobody slips through the cracks.', points: ['Track every new Telegram join', 'See every lead and new member', 'All your DMs and new leads, together'], art: <ConvertFlow /> },
  { tone: 'blue', icon: <ShieldCheck />, step: 'Verify', sub: 'Know who’s really yours', tool: 'Verification', href: '/verify', title: 'Know every client is really yours', text: 'Clients verify themselves in your Telegram, checked against your broker. You always know who’s yours, and who isn’t anymore.', points: ['Verify their details and access', 'Know which clients are moving IB', 'Know who’s inactive or not trading'], art: <VerifyFlow /> },
  { tone: 'emerald', icon: <Wallet />, step: 'Retain', sub: 'Keep them trading', tool: 'Client book', href: '/retain', title: 'Know every client and every dollar', text: 'See every client under your IB, live from your broker. Understand how they trade, and spot who’s slipping before they leave.', points: ['Know who all your clients are', 'Understand their trading activity', 'Every deposit, withdrawal and lot'], art: <RetainFlow /> },
]

export function Explorer() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto) return
    const id = setTimeout(() => setI(x => (x + 1) % STEPS6.length), 7000)
    return () => clearTimeout(id)
  }, [i, auto])
  const p = STEPS6[i]
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-24">
          <Title a="Every part of your business." b="Connected." sub="Follow one trader from first view to funded client, all in one place." />
        </div>

        {/* four tabs, split by hairlines */}
        <div className={cn('grid grid-cols-2 border-t lg:grid-cols-4', line)}>
          {STEPS6.map((st, n) => {
            const on = n === i
            return (
              <button key={st.step} type="button" onClick={() => { setI(n); setAuto(false) }}
                className={cn('relative flex items-center justify-center gap-3 py-6 text-[17px] font-medium tracking-tight outline-none transition-colors [&_svg]:size-[18px]', line,
                  n % 2 === 0 && 'border-r', n < 2 && 'border-b lg:border-b-0', n === 1 && 'lg:border-r', n === 2 && 'lg:border-r',
                  on ? 'text-white' : 'text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300')}
                >
                <span className={cn('transition-colors', on && TONE[st.tone].text)}>{st.icon}</span>{st.step}
                {on && <motion.span layoutId="tab-bar" className={cn('absolute inset-x-0 bottom-0 h-px', TONE[st.tone].text.replace('text-', 'bg-'))} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />}
              </button>
            )
          })}
        </div>

        {/* the step: what it does, how it connects, what it looks like */}
        <div className={cn('grid border-t lg:grid-cols-2', line)}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn('flex flex-col justify-center border-b px-6 py-14 sm:px-12 lg:border-b-0 lg:border-r', line)}>
              <div><Pill tone={p.tone} icon={p.icon}>{p.tool}</Pill></div>
              <h3 className="mt-3 text-[1.75rem] font-medium tracking-tight sm:text-[2rem] lg:whitespace-nowrap">{p.title}</h3>
              <p className="mt-3 max-w-lg text-[15px] leading-6 text-zinc-400">{p.text}</p>
              <Points tone={p.tone} items={p.points} />
              <SmartLink href={p.href} className="group mt-8 inline-flex h-9 w-fit items-center gap-1.5 rounded-full bg-white/[0.06] px-4 text-[14px] font-medium text-zinc-200 transition-colors hover:bg-white/[0.1] hover:text-white">Explore {p.step}<span aria-hidden className="text-zinc-500 transition-transform group-hover:translate-x-0.5">→</span></SmartLink>
            </motion.div>
          </AnimatePresence>
          <div className="relative flex items-center justify-center overflow-hidden px-6 py-10 lg:min-h-[560px] lg:py-14">
            <AnimatePresence>
              <motion.div key={`glow-${i}`} aria-hidden className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                style={{ backgroundImage: `radial-gradient(55% 50% at 50% 55%, ${TONE[p.tone].wash}, transparent 70%)` }} />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="flex w-full justify-center">
                {p.art}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {auto && <motion.div key={`p-${i}`} className={cn('h-px opacity-50', TONE[p.tone].text.replace('text-', 'bg-'))} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 7, ease: 'linear' }} />}
      </Frame>
    </section>
  )
}

/* ── Why IBs choose Liquex ─────────────────────────────────────────────── */

const WHY: { tone: Tone; icon: React.ReactNode; title: string; text: string }[] = [
  { tone: 'emerald', icon: <Trophy />, title: 'Built only for IBs', text: 'Made for how IBs actually work.' },
  { tone: 'sky', icon: <Plug />, title: 'Works with your broker', text: 'Connects to the brokers you use.' },
  { tone: 'violet', icon: <Activity />, title: 'Live, not month-end', text: 'Every deposit and trade, as it happens.' },
  { tone: 'amber', icon: <Zap />, title: 'Set up in a day', text: 'We connect everything with you.' },
  { tone: 'pink', icon: <Bot />, title: 'Your brand, not ours', text: 'Your bot, your name, your VIP.' },
  { tone: 'blue', icon: <Users />, title: 'Real people, real support', text: 'We set you up and stay on hand.' },
]

export function Why() {
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-24"><Title a="Why IBs choose" b="Liquex." tone="emerald" /></div>
        <div className={cn('grid border-t sm:grid-cols-2 lg:grid-cols-3', line)}>
          {WHY.map((w, n) => (
            <motion.div key={w.title} {...reveal}
              className={cn('flex flex-col gap-4 border-b p-5 sm:p-6', line, n % 2 === 0 ? 'sm:border-r' : 'sm:border-r-0', 'lg:border-r', n % 3 === 2 && 'lg:border-r-0', n >= 4 && 'sm:border-b-0', n === 3 && 'lg:border-b-0')}>
              <div className="relative flex h-[104px] items-center justify-center overflow-hidden rounded-2xl bg-[#141517]">
                <span aria-hidden className={cn('opacity-[0.35] [&_svg]:size-12 [&_svg]:stroke-[1.25]', TONE[w.tone].text)}>{w.icon}</span>
              </div>
              <div className="flex items-start gap-3.5">
                <Tick className="mt-1 size-4 shrink-0 text-white" />
                <div className="min-w-0">
                  <div className="text-[16px] font-medium text-zinc-100">{w.title}</div>
                  <div className="mt-0.5 whitespace-nowrap text-[14px] text-zinc-500">{w.text}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>
    </section>
  )
}

/* ── Grow · Convert · Keep ─────────────────────────────────────────────── */

const STAGES3: { tone: Tone; n: string; stage: string; title: string; text: string; points: string[] }[] = [
  { tone: 'pink', n: '01', stage: 'Grow', title: 'Bring traders in', text: 'Know which content and links actually bring you traders — and do more of it.', points: ['Content analytics', 'Tracked links', 'Channel growth'] },
  { tone: 'sky', n: '02', stage: 'Convert', title: 'Turn joins into funded clients', text: 'Every lead in one place, verified automatically and moved to funded.', points: ['Lead CRM for your DMs', 'Auto-verification', 'VIP access'] },
  { tone: 'emerald', n: '03', stage: 'Keep', title: 'Keep them trading', text: 'Spot who’s slipping before they leave — and know exactly what to do.', points: ['AI next steps', 'Win-back', 'Automations'] },
]

export function Journey() {
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-24"><Title a="Grow. Convert." b="Keep." tone="sky" sub="Liquex covers your whole business — from the first post to the hundredth funded client." /></div>
        <div className={cn('grid border-t md:grid-cols-3', line)}>
          {STAGES3.map((st, i) => (
            <motion.div key={st.stage} {...reveal} className={cn('px-8 py-12 sm:px-10', line, i < 2 && 'border-b md:border-b-0 md:border-r')} style={wash(st.tone, '0% 0%')}>
              <div className={cn('text-[13px] font-medium', TONE[st.tone].text)}>{st.n} · {st.stage}</div>
              <h3 className="mt-6 text-[24px] font-medium leading-tight tracking-tight">{st.title}</h3>
              <p className="mt-3 text-[15px] leading-6 text-zinc-400">{st.text}</p>
              <ul className={cn('mt-8 divide-y border-y', line, '[&>li]:border-white/[0.08]')}>
                {st.points.map(p => <li key={p} className="flex items-center justify-between py-3.5 text-[14.5px] text-zinc-200">{p}<span className={TONE[st.tone].text}>→</span></li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </Frame>
    </section>
  )
}

/* ── Runs inside Telegram ──────────────────────────────────────────────── */

function Bubble({ me, children, delay }: { me?: boolean; children: React.ReactNode; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }}
      className={cn('max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5', me ? 'ml-auto rounded-br-md bg-[#3390ec] text-white' : 'rounded-bl-md bg-[#26272b] text-zinc-100')}>
      {children}
    </motion.div>
  )
}

function TelegramPhone() {
  return (
    <div className="w-[290px] rounded-[48px] bg-[#1c1c1e] p-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
      <div className="overflow-hidden rounded-[38px] bg-[#08090b]">
        <div className="mx-auto mt-2.5 h-[26px] w-[96px] rounded-full bg-black" />
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 pb-3 pt-3">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-blue-500 text-[11px] font-bold text-white">VIP</span>
          <div className="leading-tight"><div className="text-[14px] font-semibold">Your VIP bot</div><div className="text-[11.5px] text-sky-300">bot</div></div>
        </div>
        <div className="space-y-2.5 px-3.5 py-5">
          <Bubble delay={0.1}>Hi Daniel — send your broker account ID to join the VIP.</Bubble>
          <Bubble me delay={0.5}>24881364</Bubble>
          <Bubble delay={0.9}>Checking with your broker…</Bubble>
          <Bubble delay={1.4}><span className="flex items-center gap-1.5"><Tick className="size-3 text-emerald-300" />Verified — you’re in.</span></Bubble>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }}
            className="rounded-xl bg-[#26272b] py-2.5 text-center text-[13px] font-medium text-sky-300">Open VIP channel</motion.div>
        </div>
        <div className="mx-3.5 mb-5 rounded-full bg-[#26272b] px-4 py-2.5 text-[12.5px] text-zinc-500">Message</div>
      </div>
    </div>
  )
}

export function TelegramBand() {
  return (
    <section className="px-3 sm:px-6">
      <Frame className="grid lg:grid-cols-2">
        <motion.div {...reveal} className="flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20">
          <div><Pill tone="blue" icon={<TelegramMark />}>Telegram</Pill></div>
          <h3 className="mt-5 text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">Runs inside your Telegram.</h3>
          <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-400">Your clients never leave Telegram. They verify, join your VIP and hear from you — all through your own bot.</p>
          <Points tone="blue" items={['Your own bot, under your name', 'Verification in seconds, inside the chat', 'VIP access handled automatically']} />
        </motion.div>
        <div className={cn('flex items-center justify-center border-t px-6 py-14 lg:border-l lg:border-t-0', line)} style={wash('blue', '50% 30%')}>
          <TelegramPhone />
        </div>
      </Frame>
    </section>
  )
}

/* ── IB networks ───────────────────────────────────────────────────────── */

const SUBS: [string, string, number[]][] = [['Ryan C.', '+$148K', [4, 5, 6, 6, 8, 9, 11]], ['Priya S.', '+$62K', [3, 4, 3, 5, 5, 6, 7]], ['Marco D.', '+$31K', [5, 4, 4, 5, 4, 5, 6]], ['Lena W.', '+$4K', [5, 4, 3, 3, 2, 2, 2]]]

function NetworkBoard() {
  return (
    <div className="w-full max-w-[440px] space-y-3">
      <div className="rounded-[26px] bg-[#1c1c1e] p-5">
        <div className="flex items-center justify-between"><span className="text-[13px] font-semibold text-amber-300">Your network</span><span className="text-[12px] text-zinc-500">Net funding · 30 days</span></div>
        <div className="mt-4 space-y-1">
          {SUBS.map(([n, v, d], i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-3 py-2">
              <span className="w-4 text-[12px] tabular-nums text-zinc-600">{i + 1}</span>
              <Avatar name={n} i={i} className="size-8 text-[12px] ring-0" />
              <span className="flex-1 text-[14.5px] text-zinc-100">{n}</span>
              <div className="flex h-5 w-16 items-end gap-[3px]">{d.map((x, j) => <span key={j} className={cn('flex-1 rounded-full', i === 3 ? 'bg-rose-300/70' : 'bg-emerald-300/70')} style={{ height: `${(x / 11) * 100}%` }} />)}</div>
              <span className="w-14 text-right text-[14.5px] font-semibold tabular-nums">{v}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[26px] bg-[#1c1c1e] p-5"><div className="text-[13px] font-semibold text-sky-300">Sub-IBs</div><div className="mt-3 text-[26px] font-semibold tabular-nums">24</div></div>
        <div className="rounded-[26px] bg-[#1c1c1e] p-5"><div className="text-[13px] font-semibold text-emerald-300">Network book</div><div className="mt-3 text-[26px] font-semibold tabular-nums">$1.2M</div></div>
      </div>
    </div>
  )
}

export function Networks() {
  return (
    <section className="px-3 sm:px-6">
      <Frame className="grid lg:grid-cols-2">
        <div className={cn('order-2 flex items-center justify-center border-t px-6 py-14 lg:order-1 lg:border-r lg:border-t-0', line)} style={wash('amber', '50% 30%')}>
          <NetworkBoard />
        </div>
        <motion.div {...reveal} className="order-1 flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:order-2">
          <div><Pill tone="amber" icon={<Trophy />}>For IB networks</Pill></div>
          <h3 className="mt-5 text-[1.75rem] font-medium tracking-tight sm:text-[2rem]">Every sub-IB, side by side.</h3>
          <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-400">Run a network? See who’s growing, who’s slipping and whose content works — in one view.</p>
          <Points tone="amber" items={['Every sub-IB ranked by funding', 'Each sub-IB sees only their own clients', 'Your whole network book, live']} />
        </motion.div>
      </Frame>
    </section>
  )
}

/* ── The tools, in detail (FXBO-style: pills, points, visual) ─────────── */

const KIT: { tone: Tone; name: string; points: string[]; art: React.ReactNode }[] = [
  { tone: 'violet', name: 'AI', points: ['A plain-English read on every client', 'One clear next step for each', 'Who’s about to move IB, flagged early', 'Who’s ready for VIP', 'Ask anything about your business'], art: <AiViz /> },
  { tone: 'amber', name: 'Automations', points: ['VIP access added and removed by rules', 'Check-ins when clients go quiet', 'Alerts when someone moves IB', 'Runs 24/7 without you', 'Set up once, in minutes'], art: <RulesViz /> },
  { tone: 'sky', name: 'Tracked links', points: ['A link for every bio, DM and post', 'Joins and deposits per link', 'Instagram, TikTok, YouTube and Telegram', 'Your best traffic source, ranked', 'No setup for your clients'], art: <LinksViz /> },
  { tone: 'emerald', name: 'Live alerts', points: ['Every join, as it happens', 'Every deposit and withdrawal', 'New DMs and leads', 'Big moments pop up on screen', 'One feed for every channel'], art: <ConvertFlow /> },
]

export function Toolkit() {
  const [i, setI] = useState(0)
  const k = KIT[i]
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-24"><Title a="The tools to run" b="your IB business." tone="violet" /></div>
        <div className={cn('grid border-t lg:grid-cols-2', line)}>
          <div className={cn('flex flex-col justify-center border-b px-6 py-14 sm:px-12 lg:border-b-0 lg:border-r', line)}>
            <div className="flex flex-wrap gap-2">
              {KIT.map((q, n) => (
                <button key={q.name} type="button" onClick={() => setI(n)}
                  className={cn('h-10 rounded-full px-4 text-[14.5px] font-medium ring-1 transition-colors', n === i ? cn(TONE[q.tone].fill, TONE[q.tone].text) : 'text-zinc-400 ring-white/10 hover:text-zinc-200')}>{q.name}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.ul key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                className={cn('mt-10 divide-y border-y', line, '[&>li]:border-white/[0.08]')}>
                {k.points.map(p => <li key={p} className="flex items-center gap-3.5 py-4 text-[15px] text-zinc-200"><span className={cn('size-1.5 shrink-0 rounded-full', TONE[k.tone].text.replace('text-', 'bg-'))} />{p}</li>)}
              </motion.ul>
            </AnimatePresence>
          </div>
          <div className="flex min-h-[560px] items-center justify-center px-6 py-14" style={wash(k.tone, '60% 20%')}>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45 }} className="flex w-full justify-center">{k.art}</motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Frame>
    </section>
  )
}

/* ── Before / after, as features ───────────────────────────────────────── */

const BA: { grad: string; glow: string; icon: React.ReactNode; old: React.ReactNode; name: string; after: string; before: string }[] = [
  { grad: 'from-pink-400 to-rose-600', glow: 'rgba(244,114,182,0.35)', icon: <Film />, old: <CircleHelp />, name: 'Your best videos', after: 'See which videos bring you clients.', before: 'You don’t know which videos bring clients' },
  { grad: 'from-sky-400 to-blue-600', glow: 'rgba(56,189,248,0.35)', icon: <Link2 />, old: <EyeOff />, name: 'Where clients come from', after: 'See where every client found you.', before: 'You don’t know where clients come from' },
  { grad: 'from-violet-400 to-indigo-600', glow: 'rgba(167,139,250,0.35)', icon: <Inbox />, old: <MessageCircleOff />, name: 'All your messages', after: 'Every new person and message in one list.', before: 'People message you and get forgotten' },
  { grad: 'from-blue-400 to-blue-700', glow: 'rgba(59,130,246,0.35)', icon: <ShieldCheck />, old: <Hand />, name: 'Automatic checks', after: 'Clients are checked for you, in Telegram.', before: 'You check every client yourself' },
  { grad: 'from-rose-400 to-red-600', glow: 'rgba(251,113,133,0.35)', icon: <BellRing />, old: <Clock />, name: 'Leaving alerts', after: 'We tell you before a client leaves.', before: 'Clients leave and you don’t notice' },
  { grad: 'from-amber-300 to-orange-500', glow: 'rgba(251,191,36,0.35)', icon: <Sparkles />, old: <UserX />, name: 'Who to message', after: 'We tell you who to message today.', before: 'You don’t know who to message' },
]

export function BeforeAfter() {
  return (
    <section className="px-3 sm:px-6">
      <Frame>
        <div className="px-6 pb-12 pt-20 sm:pt-24"><Title a="Before Liquex." b="After Liquex." tone="emerald" sub="What changes when everything is in one place." /></div>
        {/* header */}
        <div className={cn('grid grid-cols-2 border-t', line)}>
          <div className={cn('flex items-center gap-2.5 border-r px-6 py-5 sm:px-12', line)}>
            <span className="size-2 rounded-full bg-zinc-600" /><span className="text-[14px] font-medium text-zinc-500">Without Liquex</span>
          </div>
          <div className="flex items-center gap-2.5 px-6 py-5 sm:px-12" style={wash('emerald', '0% 0%')}>
            <LiquexMark className="size-5 rounded-[6px]" /><span className="text-[14px] font-medium text-white">With Liquex</span>
          </div>
        </div>
        {BA.map(f => (
          <motion.div key={f.name} {...reveal} className={cn('group relative grid grid-cols-2 border-t', line)}>
            <div className={cn('flex items-center gap-4 border-r px-6 py-7 sm:px-12', line)}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.03] text-zinc-600 ring-1 ring-white/[0.06] [&_svg]:size-[18px]">{f.old}</span>
              <span className="text-[15px] text-zinc-500 sm:text-[16px]">{f.before}</span>
            </div>
            {/* the hand-off arrow on the divider */}
            <span className="absolute left-1/2 top-1/2 z-10 hidden size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0c0d0f] text-[13px] text-zinc-500 ring-1 ring-white/10 sm:grid">→</span>
            <div className="flex items-center gap-4 px-6 py-7 sm:px-12">
              <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] [&_svg]:size-[18px] [&_svg]:stroke-[2.25]', f.grad)} style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 24px ${f.glow}` }}>{f.icon}</span>
              <div className="min-w-0">
                <div className="text-[15px] font-medium text-zinc-100 sm:text-[16px]">{f.name}</div>
                <div className="mt-0.5 text-[13.5px] text-zinc-400">{f.after}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </Frame>
    </section>
  )
}

/* ── Everything you get: the full feature list ─────────────────────────── */

const ALL: [React.ReactNode, string, string, string[]][] = [
  [<PhFilmStrip />, 'Content Analytics', 'See the joins and deposits behind every post, so you know what to post more of.', ['Reels', 'Videos', 'Posts']],
  [<PhChartBar />, 'Traffic Sources', 'Compare every platform by funded traders, so your time goes where it pays.', ['Instagram', 'TikTok', 'YouTube']],
  [<PhLinkSimple />, 'Smart Links', 'A tracked link for every bio, DM and story, so every client has a source.', ['Bio', 'DM', 'Story']],
  [<PhUsers />, 'Join Tracking', 'Every new Telegram member and where they came from, so no join goes unnoticed.', ['Live', 'Per link']],
  [<PhTray />, 'Lead Inbox', 'Every DM and lead in one list, so you reply first and never lose a lead.', ['Telegram', 'Instagram']],
  [<PhRobot />, 'Branded Bot', 'Your own Telegram bot under your name, so clients trust it and stay with you.', ['Verify', 'VIP', 'Messages']],
  [<PhLockKey />, 'Community Gating', 'Only verified clients get into your VIP, so your perks go to people who trade.', ['Auto add', 'Auto remove']],
  [<PhShieldCheck />, 'Auto-Verification', 'Account IDs checked with your broker in seconds, so you never verify by hand again.', ['IB', 'Account', 'Balance']],
  [<PhBellRinging />, 'Retention Alerts', 'Get alerted when clients go quiet or move IB, so you can win them back in time.', ['Inactive', 'Moved', 'Churn']],
  [<PhWallet />, 'Client Book', 'Every balance, deposit and lot, live, so you always know what your book is worth.', ['Deposits', 'Withdrawals', 'Lots']],
  [<PhTrophy />, 'Top Clients', 'Your most valuable clients ranked, so you know who to look after first.', ['Volume', 'Funding']],
  [<PhSparkle />, 'AI Next Steps', 'AI tells you who to message today and why, so your time goes where it counts.', ['Daily', 'Per client']],
]


const FEATURE_STAGE: [Tone, string][] = [['pink', 'Grow'], ['sky', 'Convert'], ['blue', 'Verify'], ['emerald', 'Retain']]

export type FeatureItem = { icon: React.ReactNode; name: string; text: string; tags: string[]; tone: Tone; stage?: string }

/** A titled grid of features in the hairline frame — used on the homepage and every stage page. */
export function FeatureGrid({ title, sub, items, cta }: { title: React.ReactNode; sub: React.ReactNode; items: FeatureItem[]; cta?: { label: string; href: string; note?: string } }) {
  return (
    <IconContext.Provider value={{ weight: 'regular' }}>
    <section className="px-3 sm:px-6">
      {/* open: no outer box, just hairlines between the features */}
      <div className="relative mx-auto max-w-6xl">
        <div className="px-6 pb-12 pt-20 sm:pt-24"><div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2 {...reveal} className="text-balance text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl">{title}</motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[17px] leading-7 text-zinc-400">{sub}</p>
        </div></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, n) => (
            <motion.div key={it.name} {...reveal}
              className={cn('group relative overflow-hidden border-b px-6 py-6 sm:px-7', line, n % 2 === 0 ? 'sm:border-r' : 'sm:border-r-0', 'lg:border-r', n % 3 === 2 && 'lg:border-r-0', n >= items.length - 3 && 'lg:border-b-0', n >= items.length - (items.length % 2 === 0 ? 2 : 1) && 'sm:border-b-0')}>
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: `radial-gradient(70% 90% at 0% 0%, ${TONE[it.tone].wash}, transparent 70%)` }} />
              <div className="relative flex items-center gap-3">
                <span className={cn('shrink-0 [&_svg]:size-[22px]', TONE[it.tone].text)}>{it.icon}</span>
                <span className="flex-1 text-[15.5px] font-medium tracking-tight text-zinc-100">{it.name}</span>
              </div>
              <div className="relative mt-3 text-[14px] leading-6 text-zinc-400">{it.text}</div>
            </motion.div>
          ))}
        </div>
        {cta && <div className={cn('flex flex-col items-center justify-center gap-4 border-t px-6 py-10 sm:flex-row sm:gap-6', line)}>{cta.note && <span className="text-center text-[17px] text-zinc-300">{cta.note}</span>}<Button asChild className="h-11 rounded-full bg-white px-6 text-[15px] text-black hover:bg-white/90"><a href={cta.href}>{cta.label}</a></Button></div>}
      </div>
    </section>
    </IconContext.Provider>
  )
}

export function AllFeatures() {
  const items: FeatureItem[] = ALL.map(([icon, name, text, tags], n) => {
    const [tone, stage] = FEATURE_STAGE[Math.floor(n / 3)]
    return { icon, name, text, tags, tone, stage: n % 3 === 0 ? stage : undefined }
  })
  return <FeatureGrid items={items} cta={{ label: 'Book a demo', href: GET_URL, note: 'Liquex has every tool an IB needs.' }} title="Full control over your business." sub={<>Liquex turns IB into a real, scalable business. <span className="text-white">An unfair advantage.</span></>} />
}

/* ── Integrated with everything: the connections, quietly, behind the words ─ */

/* Floating pieces around the headline: the apps, and a few live numbers. */
const FLOAT: { x: number; y: number; d: number; el: React.ReactNode }[] = [
  { x: 12, y: 34, d: 0, el: <InstagramMark className="size-12 shadow-[0_12px_30px_rgba(221,42,123,0.35)] rounded-[14px]" /> },
  { x: 24, y: 12, d: 0.6, el: <TikTokMark className="size-11 rounded-[13px]" /> },
  { x: 88, y: 36, d: 0.3, el: <TelegramMark className="size-12 drop-shadow-[0_12px_24px_rgba(42,171,238,0.35)]" /> },
  { x: 77, y: 12, d: 0.9, el: <YouTubeMark className="size-11 shadow-[0_12px_30px_rgba(255,0,51,0.3)] rounded-[13px]" /> },
  { x: 86, y: 68, d: 1.2, el: <BrokerMark className="size-11 rounded-[13px]" /> },
  { x: 16, y: 70, d: 0.4, el: <Stat label="New joins" value="+43" tone="text-sky-300" /> },
  { x: 31, y: 78, d: 1.0, el: <Stat label="Deposited today" value="$21,480" tone="text-emerald-300" /> },
  { x: 70, y: 78, d: 0.2, el: <Stat label="Top post" value="184K views" tone="text-pink-300" /> },
]

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl bg-[#0d0d0d] px-3.5 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
      <div className="text-[10px] text-zinc-500">{label}</div>
      <div className={cn('text-[13px] font-semibold tabular-nums tracking-tight', tone)}>{value}</div>
    </div>
  )
}

/** Soft colour that drifts slowly behind the section. */
function Orb({ className, x, y, dur }: { className: string; x: number[]; y: number[]; dur: number }) {
  return <motion.div aria-hidden className={cn('pointer-events-none absolute rounded-full blur-[90px]', className)} animate={{ x, y }} transition={{ duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
}

export function Statement() {
  return (
    <section className="px-3 sm:px-6">
      <div className="relative mx-auto h-[440px] max-w-6xl sm:h-[480px]">
        {/* subtle life: drifting colour + a fine dot grid, fading out at the edges */}
        <div aria-hidden className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_40%,transparent_100%)]">
          <Orb className="left-[18%] top-[20%] size-72 bg-white/[0.04]" x={[0, 60, -20]} y={[0, 30, -10]} dur={14} />
          <Orb className="right-[16%] top-[30%] size-72 bg-white/[0.035]" x={[0, -50, 20]} y={[0, -20, 30]} dur={16} />
          <Orb className="bottom-[8%] left-[42%] size-64 bg-white/[0.03]" x={[0, 40, -40]} y={[0, -20, 0]} dur={18} />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_50%,black,transparent)]" />
        </div>
        {FLOAT.map((f, i) => (
          <motion.div key={i} className="absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block" style={{ left: `${f.x}%`, top: `${f.y}%` }}
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 * i, duration: 0.8 }}>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5 + (i % 3), delay: f.d, repeat: Infinity, ease: 'easeInOut' }}>{f.el}</motion.div>
          </motion.div>
        ))}
        <motion.div {...reveal} className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Connect <span className="text-zinc-500">everything.</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[17px] leading-7 text-zinc-400">Sync your broker, socials, Telegram and more. All in one place.</p>
        </motion.div>
      </div>
    </section>
  )
}
