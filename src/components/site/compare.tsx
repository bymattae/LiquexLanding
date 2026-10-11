import { motion } from 'framer-motion'
import { Tick } from '@/components/affiliate/animated'
import { LiquexMark } from '@/components/affiliate/premium'
import { cn } from '@/lib/utils'

/** "What changes with Liquex" — the old way next to the new way, with example numbers. */

const OLD = [
  'No idea which traffic converts',
  'Nothing tracked, DMs all over the place',
  'Checking every client with your broker by hand',
  'Clients churn and nothing is organised',
  'Your data, but no idea what it means',
]
const NEW = [
  'Know which traffic works best',
  'Capture every join and lead, instantly',
  'Auto-verify your trading clients',
  'Track clients who churn or move IB',
  'AI-powered insights to grow',
]

const line = 'border-white/[0.08]'
/* the same glossy dark tile used by the dashboards above */
const tile = 'relative overflow-hidden rounded-2xl bg-[#0d0d0d]'

function Rows({ items, on }: { items: string[]; on?: boolean }) {
  return (
    <ul className={cn('mt-8 divide-y border-y', line, '[&>li]:border-white/[0.08]')}>
      {items.map(t => (
        <li key={t} className={cn('flex items-center gap-3.5 py-4', on ? 'text-[15.5px] text-white' : 'text-[15px] text-zinc-500')}>
          {on ? <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#7aa2f0] to-[#7c5ce0] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"><Tick className="size-2.5" /></span> : <svg viewBox="0 0 12 12" className="size-3 shrink-0 text-zinc-700"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>}
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export function Compare() {
  return (
    <section className="px-3 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="px-6 pb-12 pt-20 text-center sm:pt-24">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-balance text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl">
            The difference is <span className="text-zinc-500">structure.</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-6 text-zinc-400">Everything you already do, finally tracked, connected and in control.</p>
        </div>
        <div className="grid lg:grid-cols-2">
          <div className={cn('border-b px-6 py-12 sm:px-12 lg:border-b-0 lg:border-r', line)}>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500">Without Liquex</span>
            <h3 className="mt-5 text-[1.6rem] font-medium tracking-tight text-zinc-400 sm:text-[1.75rem]">An IB without a system.</h3>
            <Rows items={OLD} />
            <figure className="mt-8 rounded-2xl bg-[#0b0b0b] p-5 ">
              <blockquote className="text-[15px] leading-6 text-zinc-400">“I had five apps open and still couldn’t tell you which post made me money.”</blockquote>
              <figcaption className="mt-3 text-[12.5px] text-zinc-600">Every IB, before Liquex</figcaption>
            </figure>
          </div>
          <div className="relative isolate overflow-hidden px-6 py-12 sm:px-12">
            {/* the lift: brand light falling from the top */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(60% 40% at 45% 22%, rgba(110,130,240,0.15), transparent 75%), radial-gradient(40% 30% at 75% 18%, rgba(140,100,230,0.10), transparent 75%)' }} />
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white"><LiquexMark className="size-4 rounded-[4px]" />With Liquex</span>
            <h3 className="mt-5 text-[1.6rem] font-medium tracking-tight text-white sm:text-[1.75rem]">An IB that <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">runs like a business.</span></h3>
            <Rows items={NEW} on />
            <figure className={cn(tile, 'mt-8 bg-gradient-to-b from-[#15141d] to-[#0e0d13] p-5')}>
              <blockquote className="relative text-[15px] leading-6 text-zinc-100">“I finally know which reels bring traders — and who’s about to leave. It’s like running a real business.”</blockquote>
              <figcaption className="relative mt-3 flex items-center gap-2.5 text-[12.5px]">
                <span className="grid size-6 place-items-center rounded-full bg-gradient-to-b from-[#7aa2f0] to-[#7c5ce0] text-[10px] font-semibold text-white">M</span>
                <span className="text-zinc-300">Marcus Reid</span><span className="text-zinc-500">· Instagram IB</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
