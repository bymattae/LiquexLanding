import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ActivityPreview, AiReadPreview, AutomatePreview, ContentPreview, LinksPreview, MiniAppPreview } from './previews'

/**
 * AffiliateOS, said quietly: one idea per screen — a large headline, one
 * line under it, one visual. No boxes around sections, no lists.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
}

function Headline({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className="text-[13px] font-medium text-emerald-300">{eyebrow}</p>}
      <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h2>
      {sub && <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-zinc-400 sm:text-xl">{sub}</p>}
    </motion.div>
  )
}

/* ── The flow, as one line ─────────────────────────────────────────────── */

const FLOW = ['Reach', 'Traffic', 'Nurture', 'Convert', 'Keep']

export function FlowSection() {
  return (
    <section className="px-6 py-28 sm:py-40">
      <Headline title="From first view to funded client." sub="Every step of a trader’s journey, in one place." />
      <motion.ol {...reveal} className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:mt-20 sm:gap-x-6">
        {FLOW.map((f, i) => (
          <li key={f} className="flex items-center gap-4 sm:gap-6">
            <span className={i === FLOW.length - 1 ? 'text-2xl font-semibold text-white sm:text-4xl' : 'text-2xl font-semibold text-white/35 sm:text-4xl'}>{f}</span>
            {i < FLOW.length - 1 && <span aria-hidden className="h-px w-6 bg-white/15 sm:w-10" />}
          </li>
        ))}
      </motion.ol>
    </section>
  )
}

/* ── Chapters ──────────────────────────────────────────────────────────── */

const CHAPTERS = [
  { id: 'content', eyebrow: 'Content', title: 'Know what brings them in.', sub: 'Every post, read and ranked.', preview: <ContentPreview />, width: 'max-w-3xl' },
  { id: 'links', eyebrow: 'Traffic', title: 'Every join, traced.', sub: 'Know where each trader came from.', preview: <LinksPreview />, width: 'max-w-2xl' },
  { id: 'verify', eyebrow: 'Verification', title: 'Access, handled.', sub: 'Your Telegram. Your rules.', preview: <MiniAppPreview />, width: 'max-w-sm' },
  { id: 'ai', eyebrow: 'Clients', title: 'Know every client.', sub: 'And the one thing to do next.', preview: <AiReadPreview />, width: 'max-w-2xl' },
  { id: 'automate', eyebrow: 'Automation', title: 'Set it once.', sub: 'Liquex keeps your channels in order.', preview: <AutomatePreview />, width: 'max-w-xl' },
  { id: 'activity', eyebrow: 'Live', title: 'Your book, as it moves.', sub: 'Every join, deposit and trade.', preview: <ActivityPreview />, width: 'max-w-md' },
]

export function ChapterSections() {
  return (
    <>
      {CHAPTERS.map(c => (
        <section key={c.id} id={c.id} className="px-6 py-24 sm:py-36">
          <Headline eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
          <motion.div {...reveal} className={`mx-auto mt-14 w-full sm:mt-20 ${c.width}`}>{c.preview}</motion.div>
        </section>
      ))}
    </>
  )
}

/* ── Everything else, as words ─────────────────────────────────────────── */

const MORE = [
  ['Ask AI', 'Ask your book anything.'],
  ['Network view', 'Every IB, ranked.'],
  ['Telegram CRM', 'Every DM, matched.'],
  ['Broker sync', 'Daily, automatically.'],
  ['Your brand', 'We stay out of sight.'],
  ['Private', 'Each IB sees their own.'],
]

export function MoreSection() {
  return (
    <section className="px-6 py-24 sm:py-36">
      <Headline title="And quietly, everything else." />
      <motion.dl {...reveal} className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-12 text-center sm:mt-20 sm:grid-cols-3">
        {MORE.map(([t, d]) => (
          <div key={t}>
            <dt className="text-lg font-semibold">{t}</dt>
            <dd className="mt-1 text-[15px] text-zinc-500">{d}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}

/* ── Close ─────────────────────────────────────────────────────────────── */

export function CtaSection() {
  return (
    <section className="relative px-6 py-32 text-center sm:py-44">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/[0.07] blur-3xl" />
      <motion.div {...reveal} className="relative">
        <p className="text-[13px] font-medium text-zinc-500">By invitation</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">Built for the few.</h2>
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button asChild size="lg" className="h-12 rounded-full px-7 text-base"><a href="#link">Request access</a></Button>
          <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-6 text-base"><a href="https://app.liquex.co/auth">Login</a></Button>
        </div>
      </motion.div>
    </section>
  )
}
