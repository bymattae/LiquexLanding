import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowsLeftRight, BellRinging, CaretDown, FilmStrip, LinkSimple, LockKey, Pulse, ShieldCheck, Sparkle, Stack, Tray, UserPlus, Wallet } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { SmartLink } from './link'
import { HomeHero } from '@/components/app/homehero'

/**
 * The site menu: Features (a mega menu of every stage and its features),
 * Contact and About. On phones it opens as a full-screen sheet.
 */

type Item = { icon: React.ReactNode; name: string; desc: string; href: string }
type Stage = { name: string; href: string; text: string; dot: string; icon: React.ReactNode; blurb: string; short: string; items: Item[] }

export const STAGES: Stage[] = [
  { name: 'Grow', short: 'Know which traffic brings traders', icon: <Pulse />, blurb: 'Track every post, platform and link that brings you traders.', href: '/grow', text: 'text-pink-300', dot: 'bg-pink-300', items: [
    { icon: <FilmStrip />, name: 'Content Analytics', desc: 'Posts that bring traders', href: '/grow#f0' },
    { icon: <Pulse />, name: 'Traffic Sources', desc: 'Know which platform wins', href: '/grow#f1' },
    { icon: <LinkSimple />, name: 'Smart Links', desc: 'A link for every placement', href: '/grow#f2' },
  ] },
  { name: 'Convert', short: 'Every join and lead in one place', icon: <Tray />, blurb: 'See every new join, DM and lead in one place, as it happens.', href: '/convert', text: 'text-sky-300', dot: 'bg-sky-300', items: [
    { icon: <UserPlus />, name: 'Join Tracking', desc: 'See everyone who joins', href: '/convert#f0' },
    { icon: <Tray />, name: 'Lead Inbox', desc: 'Every lead in one inbox', href: '/convert#f1' },
    { icon: <Stack />, name: 'Lead Stages', desc: 'Turn leads into clients', href: '/convert#f2' },
  ] },
  { name: 'Verify', short: 'Every client verified in seconds', icon: <ShieldCheck />, blurb: 'Check every client with your broker in seconds, automatically.', href: '/verify', text: 'text-blue-300', dot: 'bg-blue-300', items: [
    { icon: <ShieldCheck />, name: 'Auto-Verification', desc: 'Verified in a few seconds', href: '/verify#f0' },
    { icon: <LockKey />, name: 'Community Gating', desc: 'Keep it for clients only', href: '/verify#f1' },
    { icon: <ArrowsLeftRight />, name: 'Moved IB Detection', desc: 'Know when they move IB', href: '/verify#f2' },
  ] },
  { name: 'Retain', short: 'Know who is about to leave next', icon: <Wallet />, blurb: 'Know what every client is worth, and who is about to leave.', href: '/retain', text: 'text-emerald-300', dot: 'bg-emerald-300', items: [
    { icon: <Wallet />, name: 'Client Book', desc: 'Every client, every dollar', href: '/retain#f0' },
    { icon: <BellRinging />, name: 'Retention Alerts', desc: 'Catch them before they go', href: '/retain#f1' },
    { icon: <Sparkle />, name: 'AI Next Steps', desc: 'Know who to talk to today', href: '/retain#f2' },
  ] },
]

export const PAGES: [string, string][] = []

/** Desktop menu state: opens on hover or click, closes on leave, Escape or navigation. */
export function useFeatures() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  const enter = () => { clearTimeout(timer.current); setOpen(true) }
  const leave = () => { clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(false), 160) }
  return { open, setOpen, enter, leave }
}

export function FeaturesButton({ open, onToggle, onEnter }: { open: boolean; onToggle: () => void; onEnter: () => void }) {
  const { pathname } = useLocation()
  const onStage = STAGES.some(s => s.href === pathname)
  return (
    <button type="button" onClick={onToggle} onMouseEnter={onEnter} aria-expanded={open}
      className={cn('flex items-center gap-1 transition-colors hover:text-white', (open || onStage) && 'text-white')}>
      Features<CaretDown weight="bold" className={cn('size-3 transition-transform duration-300', open && 'rotate-180')} />
    </button>
  )
}

/** The four stage cards, shown inside the header when Features is open. */
export function FeaturesPanel({ open }: { open: boolean }) {
  const { pathname } = useLocation()
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="hidden overflow-hidden md:block">
          <div className="grid grid-cols-[3fr_2fr] gap-1.5 pb-1.5">
           <div className="grid grid-cols-2 gap-1.5">
            {STAGES.map((st, i) => (
              <motion.div key={st.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.35 }}>
                <SmartLink href={st.href} className={cn('group block h-full rounded-xl bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]', pathname === st.href && 'bg-white/[0.07]')}>
                  <span className={cn('block [&_svg]:size-6', st.text)}>{st.icon}</span>
                  <span className="mt-4 block text-[15px] font-medium text-white">{st.name}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-zinc-500 transition-colors group-hover:text-zinc-400">{st.blurb}</span>
                </SmartLink>
              </motion.div>
            ))}
           </div>
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.4 }}><TourPromo /></motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Phones: a menu button that opens a full-screen sheet. */
export function MobileMenu({ login, book }: { login: string; book: string }) {
  const [open, setOpen] = useState(false)
  const [features, setFeatures] = useState(true)
  const { pathname, key } = useLocation()
  useEffect(() => setOpen(false), [pathname, key])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  return (
    <>
      <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}
        className="relative grid size-10 place-items-center rounded-full bg-white/[0.06] md:hidden">
        <span className={cn('absolute h-[1.5px] w-4 rounded-full bg-white transition-transform duration-300', open ? 'rotate-45' : '-translate-y-[4px]')} />
        <span className={cn('absolute h-[1.5px] w-4 rounded-full bg-white transition-transform duration-300', open ? '-rotate-45' : 'translate-y-[4px]')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top,0px))] z-40 overflow-y-auto bg-black px-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] md:hidden">
            <motion.nav initial={{ y: -8 }} animate={{ y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="pt-4">
              <button type="button" onClick={() => setFeatures(f => !f)} className="flex w-full items-center justify-between border-b border-white/[0.08] py-4 text-[22px] font-medium tracking-tight">
                Features<CaretDown weight="bold" className={cn('size-4 text-zinc-500 transition-transform duration-300', features && 'rotate-180')} />
              </button>
              <AnimatePresence initial={false}>
                {features && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <div className="grid gap-2 border-b border-white/[0.08] py-4">
                      {STAGES.map(st => (
                        <SmartLink key={st.name} href={st.href} className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3.5 active:bg-white/[0.06]">
                          <span className={cn('[&_svg]:size-6', st.text)}>{st.icon}</span>
                          <span className="block text-[19px] font-medium tracking-tight text-white">{st.name}</span>
                        </SmartLink>
                      ))}
                      <TourPromo compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {PAGES.map(([k, h]) => <SmartLink key={k} href={h} className="block border-b border-white/[0.08] py-4 text-[22px] font-medium tracking-tight">{k}</SmartLink>)}
              <div className="mt-8 grid gap-3">
                <a href={book} className="grid h-12 place-items-center rounded-full bg-white text-[16px] font-medium text-black">Book a demo</a>
                <a href={login} className="grid h-12 place-items-center rounded-full bg-white/[0.07] text-[16px] font-medium text-white">Log in</a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** The menu's marketing spot: the full platform walkthrough. */
function TourPromo({ compact }: { compact?: boolean }) {
  return (
    <SmartLink href="/#video" className={cn('group relative flex h-full flex-col overflow-hidden rounded-xl bg-[#0f0e16]', compact ? 'p-3' : 'p-4')}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(70% 60% at 70% 20%, rgba(139,120,245,0.28), transparent 70%), radial-gradient(50% 50% at 15% 10%, rgba(56,189,248,0.14), transparent 70%)' }} />
      <div className={cn('relative overflow-hidden rounded-lg [mask-image:linear-gradient(to_bottom,black_55%,transparent)]', compact ? 'h-[130px]' : 'h-[150px]')}>
        <div className="pointer-events-none origin-top-left transition-transform duration-700 group-hover:scale-[1.03]"><HomeHero minScale={0} /></div>
        <span className={cn('absolute left-1/2 top-[45%] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110', compact ? 'size-10' : 'size-11')} >
          <svg viewBox="0 0 24 24" className="ml-0.5 size-4" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z" /></svg>
        </span>
      </div>
      <div className="relative mt-auto pt-2">
        <div className={cn('font-medium text-white', compact ? 'text-[14.5px]' : 'text-[15px]')}>Full platform walkthrough</div>
        {!compact && <div className="mt-1 text-[13px] leading-5 text-zinc-400">See every part of Liquex, from first post to funded client.</div>}
        <div className={cn('text-[13px] font-medium text-[hsl(248_85%_82%)]', compact ? 'mt-1' : 'mt-3')}>Take the tour <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span></div>
      </div>
    </SmartLink>
  )
}
