import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * IB stories — video interviews with real IBs.
 *
 * Fill in STORIES with each interview: `video` takes an .mp4 or a
 * YouTube/Vimeo embed URL, `poster` an image for the thumbnail. Every
 * entry below is dummy content — replace with real interviews before going live.
 */

type Story = { name: string; role: string; result: string; resultLabel: string; quote: string; video?: string; poster?: string; tone: string; accent: string }

const STORIES: Story[] = [
  { name: 'Marcus Reid', role: 'Instagram · 48K followers', result: '+212%', resultLabel: 'funded clients in 90 days', quote: 'I finally know which reels actually bring traders. I just post more of those now.', tone: 'from-emerald-500/[0.09]', accent: 'text-emerald-300' },
  { name: 'Sofia Laurent', role: 'Telegram · 12K members', result: '$64K', resultLabel: 'saved from clients moving IB', quote: 'Liquex told me who was about to leave before they did. I called them and kept them.', tone: 'from-sky-500/[0.09]', accent: 'text-sky-300' },
  { name: 'Daniel Okafor', role: 'TikTok · 91K followers', result: '10 hrs', resultLabel: 'saved every week', quote: 'No more checking account IDs by hand. Clients verify themselves and I just grow.', tone: 'from-violet-500/[0.09]', accent: 'text-violet-300' },
]

function Play({ big }: { big?: boolean }) {
  return (
    <span className={cn('grid place-items-center rounded-full bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.18)] transition-transform group-hover:scale-105', big ? 'size-16' : 'size-12')}>
      <svg viewBox="0 0 24 24" className={cn('ml-0.5', big ? 'size-6' : 'size-5')} fill="currentColor"><path d="M7 4.5v15l12.5-7.5z" /></svg>
    </span>
  )
}

function Video({ s, big }: { s: Story; big?: boolean }) {
  const isFile = s.video && /\.(mp4|webm|mov)(\?|$)/i.test(s.video)
  if (s.video && !isFile) return <iframe src={s.video} title={s.name} allow="fullscreen; picture-in-picture" allowFullScreen className="aspect-video w-full rounded-2xl" />
  if (s.video) return <video src={s.video} poster={s.poster} controls playsInline className="aspect-video w-full rounded-2xl object-cover" />
  return (
    <div className={cn('group relative grid aspect-video w-full place-items-center overflow-hidden rounded-2xl bg-[#0d0d0d] bg-gradient-to-br to-transparent', s.tone)}>
      {s.poster && <img src={s.poster} alt="" className="absolute inset-0 size-full object-cover opacity-70" />}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,255,255,0.05),transparent)]" />
      <div className="relative"><Play big={big} /></div>
    </div>
  )
}

function Person({ s }: { s: Story }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-full bg-white/[0.08] text-[13px] font-medium text-zinc-300">{s.name.replace(/[[\]]/g, '')[0]}</span>
      <div className="leading-tight"><div className="text-[14px] font-medium text-zinc-100">{s.name}</div><div className="text-[12.5px] text-zinc-500">{s.role}</div></div>
    </div>
  )
}

export function Stories() {
  return (
    <section className="px-3 sm:px-6">
      <div className="relative mx-auto max-w-6xl border border-white/[0.08]">
        <div className="px-6 pb-12 pt-20 text-center sm:pt-24">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-balance text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl">
            What Liquex <span className="text-zinc-500">partners say.</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-6 text-zinc-400">Real IBs on what changed once their whole business was in one place.</p>
        </div>
        <div className="grid border-t border-white/[0.08] md:grid-cols-3">
          {STORIES.map((s, i) => (
            <div key={i} className={cn('flex flex-col gap-5 p-6 sm:p-7', i < 2 && 'border-b border-white/[0.08] md:border-b-0 md:border-r')}>
              <Video s={s} />
              <div><div className={cn('text-[1.75rem] font-semibold leading-none tracking-[-0.02em]', s.accent)}>{s.result}</div><div className="mt-1.5 text-[13px] text-zinc-400">{s.resultLabel}</div></div>
              <p className="text-[14.5px] leading-6 text-zinc-300">“{s.quote}”</p>
              <div className="mt-auto pt-1"><Person s={s} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
