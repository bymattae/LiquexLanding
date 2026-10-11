import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FeatureGrid, Frame, TONE, line, reveal, type FeatureItem, type Tone } from '@/components/affiliate/simple'
import { cn } from '@/lib/utils'
import { Check, IconContext } from '@phosphor-icons/react'
import { GetStarted, type Accent } from './getstarted'
import { SmartLink } from './link'
import { GET_URL } from './chrome'

/**
 * The template every stage page (Grow, Convert, Verify, Retain) is built from:
 * hero (full app screen) → intro → three feature rows.
 */

export type StagePage = {
  tone: Tone
  icon: React.ReactNode
  stage: string
  title: [string, string]
  sub: string
  hero: React.ReactNode
  intro: [string, string, string]
  more: { title: React.ReactNode; sub: React.ReactNode; items: FeatureItem[] }
  features: { icon: React.ReactNode; tag: string; title: string; text: string; highlight: string; points: [string, string]; art: React.ReactNode }[]
}

export function Stage({ p }: { p: StagePage }) {
  return (
    <IconContext.Provider value={{ weight: 'regular' }}>
    <div>
      {/* 1 · hero — one centred column: words, buttons, then the product */}
      <section className="relative isolate overflow-hidden px-3 pt-24 sm:px-6 sm:pt-28">
        {/* a soft lift: the stage colour glowing up behind the product, a whisper of light behind the words */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-20 bottom-[-6rem] -z-10 opacity-70"
          style={{ backgroundImage: `radial-gradient(50% 40% at 50% 68%, ${TONE[p.tone].wash}, transparent 70%), radial-gradient(40% 30% at 50% 18%, rgba(255,255,255,0.05), transparent 70%)` }} />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="flex flex-col items-center px-6 pt-4 text-center sm:pt-6">
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="text-[2.75rem] font-medium leading-[1.04] tracking-tight sm:text-[4rem]">
              {p.title[0]}<br /><span className={cn('pb-1', TONE[p.tone].grad)}>{p.title[1]}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.65] text-zinc-400">{p.sub}</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-7 flex items-center justify-center gap-2">
              <Button asChild className="h-11 rounded-full bg-white px-6 text-[15px] text-black hover:bg-white/90"><a href={GET_URL}>Book a demo</a></Button>
              <SmartLink href="/#video" className="group flex h-11 items-center gap-2.5 px-4 text-[15px] text-zinc-400 transition-colors hover:text-white">
                <span className="grid size-7 place-items-center rounded-full bg-white/[0.07] transition-colors group-hover:bg-white/[0.12]"><svg viewBox="0 0 24 24" className="ml-0.5 size-3" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z" /></svg></span>
                Watch video
              </SmartLink>
            </motion.div>
          </div>
          {/* the product, full size, cropped and fading out into the page */}
          <div className="relative mx-auto mt-10 h-[230px] max-w-[720px] overflow-hidden sm:mt-12 sm:h-[290px]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }} className="w-full min-w-0">{p.hero}</motion.div>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>
        </div>
      </section>

      <div className="h-16 sm:h-24" />

      {/* 3 · feature rows — eyebrow, big title, description with a coloured line, button; a real screen on the other side */}
      <section className="px-3 sm:px-6 [&>*+*]:-mt-px">
        {p.features.map((f, i) => (
          <Frame key={f.title} className="grid scroll-mt-24 overflow-hidden lg:grid-cols-2"><span id={`f${i}`} className="absolute -top-24" />
            <motion.div {...reveal} className={cn('flex flex-col justify-center px-6 py-12 sm:px-14 sm:py-14', i % 2 === 1 && 'lg:order-2')}>
              <div className={cn('flex items-center gap-2 text-[15px] font-semibold [&_svg]:size-[18px]', TONE[p.tone].text)}>{f.icon}{f.tag}</div>
              <h3 className="mt-3 text-[2rem] font-medium leading-[1.1] tracking-tight lg:whitespace-nowrap lg:text-[2.15rem]">{f.title}</h3>
              <p className="mt-4 max-w-[470px] text-[16px] leading-7 text-zinc-400">{f.text} <span className="text-white">{f.highlight}</span></p>
              <ul className="mt-6 space-y-2.5">
                {f.points.map(pt => (
                  <li key={pt} className="flex items-center gap-3 text-[15px] text-zinc-300">
                    <Check weight="bold" className="size-4 shrink-0 text-zinc-500" />{pt}
                  </li>
                ))}
              </ul>
              <a href={GET_URL} className="group mt-8 inline-flex h-9 w-fit items-center gap-1.5 rounded-full bg-white/[0.06] px-4 text-[14px] font-medium text-zinc-200 transition-colors hover:bg-white/[0.1] hover:text-white">
                Book a demo<span aria-hidden className="text-zinc-500 transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </motion.div>
            <div className={cn('relative isolate flex items-center justify-center border-t px-8 py-12 sm:px-14 sm:py-14 lg:border-t-0', line, i % 2 === 1 ? 'lg:order-1 lg:border-r' : 'lg:border-l')}>
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-50" style={{ backgroundImage: `radial-gradient(60% 55% at 50% 55%, ${TONE[p.tone].wash}, transparent 70%)` }} />
              <motion.div {...reveal} className="flex w-full justify-center">{f.art}</motion.div>
            </div>
          </Frame>
        ))}
      </section>

      {/* 4 · showcase — the three features, one tab each, shown as the real screen */}
      <div className="h-12 sm:h-16" />
      <FeatureGrid title={p.more.title} sub={p.more.sub} items={p.more.items} cta={{ label: 'Book a demo', href: GET_URL, note: CTA_NOTE[p.stage] }} />
      <div className="h-12 sm:h-16" />
      <GetStarted title={CLOSE[p.stage]} accent={p.tone as Accent} />


    </div>
    </IconContext.Provider>
  )
}




/** The line beside the button under each page's feature grid. */
const CTA_NOTE: Record<string, string> = {
  Grow: 'Liquex has every tool to grow your traffic.',
  Convert: 'Liquex has every tool to turn joins into clients.',
  Verify: 'Liquex has every tool to verify your clients.',
  Retain: 'Liquex has every tool to keep clients trading.',
}

/** The closing line on each stage page: white, then the stage colour. */
const CLOSE: Record<string, [string, string]> = {
  Grow: ['Scale what', 'already works.'],
  Convert: ['Stop losing', 'your leads.'],
  Verify: ['Stop verifying', 'by hand.'],
  Retain: ['Keep every', 'client trading.'],
}
