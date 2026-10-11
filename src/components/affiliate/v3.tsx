import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LogoCloud } from '@/components/blocks/logo-cloud'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { AiGlyph, BookDashboard, ContentAnimated, FlowBand, LiveFeed, NextSteps, ReelThumb, StageBar, STAGES, TONES, Tick, VerifyPhone } from './animated'
import { Avatar, Delta, InstagramMark, LiquexMark, Surface, TelegramMark, TikTokMark, YouTubeMark, label, num } from './premium'

/**
 * AffiliateOS — a framed, explanatory page (hairline grid, split hero,
 * toolkit cells, feature rows with ✓ points, a stats band, two-column FAQ),
 * in Liquex's dark style with the emerald accent.
 */

export const line = 'border-white/[0.07]'
export const tint = 'bg-white/[0.018]'

export const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
}

/** The page frame: content between two hairlines, sections split by one. */
export function Frame({ children, className, top = true }: { children: React.ReactNode; className?: string; top?: boolean }) {
  return (
    <div className={cn('relative mx-auto max-w-6xl overflow-hidden border-x', line, top && 'border-y', className)}>{children}</div>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] font-medium text-emerald-300">{children}</p>
}

export function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map(i => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] text-zinc-300">
          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-300/15 text-emerald-300"><Tick className="size-2.5" /></span>{i}
        </li>
      ))}
    </ul>
  )
}


export function Logos({ logos }: { logos: { src: string; alt: string; width: number }[] }) {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="px-6 py-6">
        <LogoCloud logos={logos} />
      </Frame>
    </div>
  )
}

/* ── Toolkit ───────────────────────────────────────────────────────────── */

const mini = 'h-[172px] w-[264px]'

export function BookMini() {
  return (
    <Surface className={mini} inner="flex h-full flex-col justify-center p-4">
      <div className="flex items-baseline justify-between"><span className={label}>Your book</span><Delta v="12.4%" /></div>
      <div className={cn(num, 'mt-1 text-[20px] text-white')}>$184,920</div>
      <div className="mt-3"><StageBar /></div>
      <div className="mt-3 space-y-1">
        {STAGES.slice(0, 3).map(s => <div key={s.k} className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-2 text-zinc-400"><span className={cn('size-1.5 rounded-full', s.c)} />{s.k}</span><span className="tabular-nums text-zinc-200">{s.p}%</span></div>)}
      </div>
    </Surface>
  )
}

export function PostMini() {
  return (
    <Surface className={mini} inner="flex h-full items-center gap-3.5 p-3">
      <ReelThumb caption="My morning routine" views="184K" className="h-[112px] w-[66px] shrink-0" />
      <div className="min-w-0 py-1">
        <div className="text-[10.5px] text-zinc-500">Reel · 4 Oct</div>
        <div className={cn(num, 'mt-1 text-[19px] text-white')}>184K</div>
        <Delta v="38× usual" />
        <div className="mt-2.5 text-[11px] text-zinc-500">Brought <span className="text-zinc-100">96 joins</span></div>
      </div>
    </Surface>
  )
}

export function LinksMini() {
  const rows = [[<InstagramMark className="size-4" />, 'Bio link', 642, 100], [<InstagramMark className="size-4" />, 'DM link', 518, 81], [<TikTokMark className="size-4" />, 'Bio link', 74, 12]] as const
  return (
    <Surface className={mini} inner="flex h-full flex-col justify-center space-y-3 p-4">
      <div className="flex justify-between"><span className={label}>Tracked links</span><span className={label}>joins</span></div>
      {rows.map(([m, k, n, w], i) => (
        <div key={i}>
          <div className="flex items-center justify-between text-[11.5px]"><span className="flex items-center gap-2 text-zinc-300">{m}{k}</span><span className="tabular-nums text-zinc-100">{n}</span></div>
          <div className="mt-1.5 h-[3px] rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400/50 to-emerald-300" style={{ width: `${w}%` }} /></div>
        </div>
      ))}
    </Surface>
  )
}

export function VerifyMini() {
  return (
    <Surface className={mini} inner="flex h-full flex-col justify-center p-2">
      <div className="flex items-center gap-2.5 px-2 pb-2.5 pt-1.5">
        <TelegramMark className="size-5" />
        <span className="text-[12px] font-medium text-zinc-100">Daniel verified</span>
        <span className="ml-auto text-[10.5px] text-zinc-600">now</span>
      </div>
      <div className="divide-y divide-white/[0.05] rounded-xl bg-white/[0.03] ring-1 ring-white/[0.05]">
        {['Under your IB', 'Eligible account', 'Balance $100+'].map(t => (
          <div key={t} className="flex items-center justify-between px-3 py-2 text-[11.5px]"><span className="text-zinc-300">{t}</span><span className="grid size-4 place-items-center rounded-full bg-emerald-300 text-black"><Tick className="size-2.5" /></span></div>
        ))}
      </div>
    </Surface>
  )
}

export function AiMini() {
  return (
    <Surface className={mini} inner="flex h-full flex-col justify-center p-4">
      <div className="flex items-center gap-2.5"><Avatar name="Daniel" i={1} className="size-6 text-[10px]" /><span className="text-[12px] font-medium text-zinc-100">Daniel R.</span><span className="ml-auto flex items-center gap-1 text-[10.5px] text-violet-200"><AiGlyph className="size-3" />AI read</span></div>
      <p className="mt-3 text-[11.5px] leading-[1.5] text-zinc-400">Deposited twice, down <span className="text-zinc-100">$820</span>. Scalps gold in big sizes.</p>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px]"><span className="text-zinc-500">Next step</span><span className={cn('rounded-md px-2 py-0.5 font-medium ring-1', TONES.violet)}>Risk call</span></div>
    </Surface>
  )
}

function Toggle() {
  return <span className="relative h-[18px] w-[30px] rounded-full bg-emerald-300 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"><span className="absolute right-[2px] top-[2px] size-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.4)]" /></span>
}

export function RulesMini() {
  return (
    <Surface className={mini} inner="flex h-full flex-col justify-center p-2">
      <div className="px-2 pb-2 pt-1.5 text-[11px] font-medium text-zinc-500">Remove from VIP when</div>
      <div className="divide-y divide-white/[0.05] rounded-xl bg-white/[0.03] ring-1 ring-white/[0.05]">
        {['Balance under $100', 'No trades in 30 days', 'Moved IB'].map(t => (
          <div key={t} className="flex items-center justify-between px-3 py-2 text-[11.5px]"><span className="text-zinc-300">{t}</span><Toggle /></div>
        ))}
      </div>
    </Surface>
  )
}

const TOOLS = [
  { title: 'Client book', text: 'Who’s trading, who’s slipping.', art: <BookMini /> },
  { title: 'Content analytics', text: 'Which posts bring traders in.', art: <PostMini /> },
  { title: 'Tracked links', text: 'Where every trader came from.', art: <LinksMini /> },
  { title: 'Telegram verification', text: 'Clients verify themselves.', art: <VerifyMini /> },
  { title: 'AI client reads', text: 'What to do for each client.', art: <AiMini /> },
  { title: 'Automations', text: 'Access that manages itself.', art: <RulesMini /> },
]

export function Toolkit() {
  return (
    <div className="px-3 sm:px-6">
      <Frame>
        <div className="flex flex-wrap items-end justify-between gap-4 px-6 py-10 sm:px-12">
          <motion.h2 {...reveal} className="text-2xl font-semibold tracking-tight sm:text-3xl">Everything in one place</motion.h2>
          <p className="max-w-sm text-[14px] text-zinc-400">Six tools. One login.</p>
        </div>
        <div className={cn('grid border-t sm:grid-cols-2 lg:grid-cols-3', line)}>
          {TOOLS.map((t, i) => (
            <motion.div key={t.title} {...reveal} className={cn('flex flex-col', line, 'border-b', i % 3 !== 2 && 'lg:border-r', i % 2 === 0 && 'sm:border-r lg:border-r-0', i % 3 !== 2 && 'lg:border-r')}>
              <div className={cn('flex h-52 items-center justify-center px-6', tint)}>{t.art}</div>
              <div className="px-6 pb-8 pt-5 sm:px-8">
                <h3 className="text-[15px] font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-5 text-zinc-400">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>
    </div>
  )
}

/* ── Feature rows ──────────────────────────────────────────────────────── */




const ROWS = [
  { eyebrow: 'Your book', title: 'See your whole book', text: 'Every client, every dollar, in one live view.', points: ['Balance, deposits and volume', 'Who’s active and who’s slipping'], art: <BookDashboard /> },
  { eyebrow: 'Content', title: 'Find the content that makes you money', text: 'See which posts actually bring traders in.', points: ['Joins per video', 'What to post more of'], art: <ContentAnimated /> },
  { eyebrow: 'Verification', title: 'Verify clients automatically', text: 'They verify in your Telegram. Access is handled.', points: ['Your bot, your brand', 'Access given and removed for you'], art: <VerifyPhone /> },
]

export function FeatureRows() {
  return (
    <div className="space-y-16 px-3 sm:space-y-24 sm:px-6">
      {ROWS.map((r, i) => (
        <Frame key={r.title} className="grid lg:grid-cols-2">
          <div className={cn('flex flex-col justify-center px-6 py-16 sm:px-14 sm:py-28', i % 2 === 1 && 'lg:order-2')}>
            <Eyebrow>{r.eyebrow}</Eyebrow>
            <motion.h3 {...reveal} className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{r.title}</motion.h3>
            <p className="mt-4 max-w-md text-[17px] leading-7 text-zinc-400">{r.text}</p>
            <Points items={r.points} />
          </div>
          <div className={cn('flex items-center justify-center border-t px-6 py-14 lg:border-t-0', line, tint, i % 2 === 1 ? 'lg:order-1 lg:border-r' : 'lg:border-l')}>
            <motion.div {...reveal} className="flex w-full justify-center">{r.art}</motion.div>
          </div>
        </Frame>
      ))}
    </div>
  )
}

/* ── AI (dark split, like an audience list) ────────────────────────────── */

export function AiSection() {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20">
          <p className="flex items-center gap-1.5 text-[13px] font-medium text-violet-300"><AiGlyph />AI</p>
          <motion.h3 {...reveal} className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Know what to do next</motion.h3>
          <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-400">AI reads every client and tells you the one thing to do.</p>
          <Points items={['A plain-English read on every client', 'One next step, ready to act on']} />
        </div>
        <div className={cn('relative flex items-center justify-center overflow-hidden border-t px-6 py-14 lg:border-l lg:border-t-0', line)}>
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(167,139,250,0.14),transparent_70%)]" />
          <NextSteps />
        </div>
      </Frame>
    </div>
  )
}

/* ── Works with ────────────────────────────────────────────────────────── */

const APPS = [
  { name: 'Telegram', mark: <TelegramMark className="size-9" />, glow: 'rgba(42,171,238,0.35)' },
  { name: 'Instagram', mark: <InstagramMark className="size-9" />, glow: 'rgba(221,42,123,0.35)' },
  { name: 'TikTok', mark: <TikTokMark className="size-9" />, glow: 'rgba(37,244,238,0.2)' },
  { name: 'YouTube', mark: <YouTubeMark className="size-9" />, glow: 'rgba(255,0,51,0.3)' },
]

function AppTile({ a }: { a: (typeof APPS)[number] }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Surface className="size-[72px] !rounded-[22px]" inner="grid place-items-center !rounded-[21px]">
        <span className="rounded-[10px]" style={{ boxShadow: `0 8px 28px ${a.glow}` }}>{a.mark}</span>
      </Surface>
      <span className="text-[12px] text-zinc-400">{a.name}</span>
    </div>
  )
}

/** A line between a tile and the hub with light running along it. */
function Wire() {
  return (
    <div className="relative mx-1 hidden h-px flex-1 overflow-hidden bg-white/[0.08] sm:block">
      <motion.span className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-emerald-300 to-transparent" animate={{ left: ['-20%', '110%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }} />
    </div>
  )
}

export function WorksWith({ logos }: { logos?: { src: string; alt: string; width: number }[] }) {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="px-6 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.09] blur-[90px]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <Eyebrow>Integrations</Eyebrow>
          <motion.h2 {...reveal} className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Plugs into what you already use</motion.h2>
          <p className="mt-4 text-[16px] text-zinc-400">Your channels, your socials and your broker — connected.</p>
        </div>
        <motion.div {...reveal} className="relative mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-6 sm:flex-nowrap sm:gap-0">
          <AppTile a={APPS[0]} /><Wire /><AppTile a={APPS[1]} /><Wire />
          <Surface glow className="mx-2 size-24 shrink-0 !rounded-[28px] sm:size-28" inner="grid place-items-center !rounded-[27px]">
            <LiquexMark className="size-12 rounded-xl sm:size-14" />
          </Surface>
          <Wire /><AppTile a={APPS[2]} /><Wire /><AppTile a={APPS[3]} />
        </motion.div>
        {logos && (
          <div className="relative mx-auto mt-16 max-w-3xl">
            <p className="text-center text-[12px] text-zinc-500">And the brokers your clients trade with</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
              {logos.map(l => <img key={l.alt} src={l.src} alt={l.alt} style={{ width: l.width * 0.8 }} className="h-auto" />)}
            </div>
          </div>
        )}
      </Frame>
    </div>
  )
}

/* ── Stats band ────────────────────────────────────────────────────────── */

export function Stats() {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="px-6 pb-0 pt-16 text-center">
        <div aria-hidden className="absolute left-1/2 top-24 h-64 w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-300/[0.08] blur-3xl" />
        <span className="relative rounded-full bg-emerald-300/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">LIVE</span>
        <motion.div {...reveal} className="relative mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">[$X,XXX,XXX]</motion.div>
        <p className="relative mt-3 text-[14px] text-zinc-500">Client balances tracked on Liquex</p>
        <div className={cn('relative mt-16 grid grid-cols-3 border-t', line)}>
          {[['[X.XM]', 'Content views tracked'], ['[X,XXX]', 'Traders tracked'], ['[XX]', 'IBs on Liquex']].map(([v, k], i) => (
            <div key={k} className={cn('px-4 py-8', i < 2 && 'border-r', line)}>
              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{v}</div>
              <div className="mt-1 text-[12px] text-zinc-500">{k}</div>
            </div>
          ))}
        </div>
      </Frame>
    </div>
  )
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */

const FAQ = [
  ['Who can use Liquex?', 'Liquex is invite-only. We work with a small number of IBs and IB networks, and review every request.'],
  ['What does it do?', 'It follows every trader from the content they saw to every trade they place — and tells you what to do next.'],
  ['Where does the data come from?', 'Your broker account, your Telegram bot and your social accounts — connected. Nothing changes for your clients.'],
  ['Do I need to change brokers?', 'No. Liquex works alongside the brokers you already use.'],
  ['How do I get access?', 'Request access. If it’s a fit, we set you up personally.'],
]

export function Faq() {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="grid gap-8 px-6 py-16 sm:px-12 lg:grid-cols-[1fr_1.6fr]">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">FAQs</h2>
        <Accordion type="single" collapsible>
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-[15px]">{q}</AccordionTrigger>
              <AccordionContent className="text-zinc-400">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Frame>
    </div>
  )
}

/* ── Close ─────────────────────────────────────────────────────────────── */

export function Close() {
  return (
    <div className="px-3 pb-28 sm:px-6">
      <Frame className="px-6 py-24 text-center">
        <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-emerald-300/[0.12] blur-3xl" />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Ready to see your book?</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-zinc-400">Request access and we’ll walk you through Liquex with your own data.</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button asChild size="lg" className="h-11 rounded-xl px-6"><a href="#link">Request access</a></Button>
          <Button asChild size="lg" variant="ghost" className="h-11 rounded-xl border border-white/10 px-5"><a href="https://app.liquex.co/auth">Login</a></Button>
        </div>
      </Frame>
    </div>
  )
}



/* ── Watch the flow (dark band) ────────────────────────────────────────── */

export function FlowSection() {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="px-6 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 size-[30rem] rounded-full bg-emerald-400/[0.14] blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 size-[28rem] rounded-full bg-teal-400/[0.10] blur-[100px]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <Eyebrow>The flow</Eyebrow>
          <motion.h2 {...reveal} className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Follow every trader, start to finish</motion.h2>
          <p className="mt-4 text-[16px] text-zinc-400">From the video they watched to the trades they place.</p>
        </div>
        <div className="relative mt-16 sm:mt-20"><FlowBand /></div>
      </Frame>
    </div>
  )
}

/* ── Every move, live ──────────────────────────────────────────────────── */

export function LiveSection() {
  return (
    <div className="px-3 sm:px-6">
      <Frame className="grid lg:grid-cols-2">
        <div className={cn('order-2 flex items-center justify-center border-t px-6 py-14 lg:order-1 lg:border-r lg:border-t-0', line, tint)}>
          <LiveFeed />
        </div>
        <div className="order-1 flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:order-2">
          <Eyebrow>Live</Eyebrow>
          <motion.h3 {...reveal} className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">See every move, live</motion.h3>
          <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-400">Joins, deposits and trades, the moment they happen.</p>
          <Points items={['One feed for everything', 'Big moments pop up']} />
        </div>
      </Frame>
    </div>
  )
}
