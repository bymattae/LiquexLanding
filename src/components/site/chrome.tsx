import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocation } from 'react-router-dom'
import { SmartLink } from './link'
import { FeaturesButton, FeaturesPanel, MobileMenu, PAGES, useFeatures } from './menu'

/** The site frame: header, closing call to action and footer. */

export const LOGIN_URL = 'https://app.liquex.co/auth'
/** Shown in the footer and the legal pages. Replace with the real address. */
export const CONTACT_EMAIL = 'hello@liquex.co'
/** Your booking page (e.g. https://calendly.com/liquex/demo). Leave empty until it exists. */
export const CALENDLY_URL = ''
/** Where every "Book a demo" goes: the booking widget once CALENDLY_URL is set, an email until then. */
export const GET_URL = CALENDLY_URL ? '/#apply' : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Book a Liquex demo')}`

/** One page per stage — the feature pages. */
export const NAV = [
  ['Grow', '/grow'],
  ['Convert', '/convert'],
  ['Verify', '/verify'],
  ['Retain', '/retain'],
] as const

export function Header() {
  const { pathname } = useLocation()
  const menu = useFeatures()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      {/* dim the page while the menu is open */}
      <AnimatePresence>
        {menu.open && <motion.div key="dim" aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-20 hidden bg-black/50 backdrop-blur-[2px] md:block" />}
      </AnimatePresence>
      <header className={cn('fixed inset-x-0 top-0 z-30 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300',
        scrolled && !menu.open ? 'border-b border-white/[0.06] bg-black' : 'border-b border-transparent')}>
        <div className="mx-3 sm:mx-6 xl:mx-auto xl:max-w-6xl" onMouseLeave={menu.leave}>
          {/* one card: the bar and the features panel open together, full width */}
          <div className={cn('rounded-2xl border transition-[background-color,border-color,box-shadow,margin] duration-300 md:-mx-3 md:px-3',
            menu.open ? 'mt-2 border-white/[0.08] bg-[#0a0a0b] shadow-[0_30px_80px_rgba(0,0,0,0.7)]' : 'mt-0 border-transparent')}>
            <div className={cn('flex items-center justify-between transition-[height] duration-300', menu.open ? 'h-14' : 'h-16')}>
              <SmartLink href="/" className="flex items-center"><img src="/Liquexdark.png" alt="Liquex" className="h-7 w-auto" /></SmartLink>
              <nav className="hidden items-center gap-8 text-[14px] text-zinc-400 md:flex">
                <FeaturesButton open={menu.open} onToggle={() => menu.setOpen(o => !o)} onEnter={menu.enter} />
                {PAGES.map(([k, h]) => <SmartLink key={k} href={h} onMouseEnter={menu.leave} className={cn('transition-colors hover:text-white', pathname === h && 'text-white')}>{k}</SmartLink>)}
              </nav>
              <div className="flex items-center gap-2">
                <a href={LOGIN_URL} className="hidden px-3 text-[14px] text-zinc-300 transition-colors hover:text-white sm:block">Log in</a>
                <Button asChild className="h-9 rounded-full bg-white px-4 text-[14px] text-black hover:bg-white/90"><a href={GET_URL}>Book a demo</a></Button>
                <MobileMenu login={LOGIN_URL} book={GET_URL} />
              </div>
            </div>
            <div onMouseEnter={menu.enter}><FeaturesPanel open={menu.open} /></div>
          </div>
        </div>
      </header>
    </>
  )
}

export function ClosingCta() {
  return (
    <section className="px-3 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden border border-white/[0.08] px-6 py-20 text-center sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_70%_at_20%_0%,rgba(56,189,248,0.12),transparent_70%),radial-gradient(45%_70%_at_80%_0%,rgba(167,139,250,0.12),transparent_70%),radial-gradient(50%_70%_at_50%_100%,rgba(52,211,153,0.10),transparent_70%)]" />
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <h2 className="text-balance text-[2.25rem] font-medium leading-[1.08] tracking-tight sm:text-6xl">
            Run IB like <span className="bg-gradient-to-r from-sky-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent">a real business.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-7 text-zinc-400">Every post, every client, every dollar — in one place.</p>
          <div className="mt-9 flex items-center justify-center gap-2">
            <Button asChild className="h-11 rounded-full bg-white px-6 text-[15px] text-black hover:bg-white/90"><a href={GET_URL}>Book a demo</a></Button>
            <Button asChild variant="ghost" className="h-11 rounded-full bg-white/[0.06] px-6 text-[15px] hover:bg-white/10"><a href={LOGIN_URL}>Log in</a></Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const PRODUCT: [string, string, string][] = [['Grow', '/grow', 'bg-pink-300'], ['Convert', '/convert', 'bg-sky-300'], ['Verify', '/verify', 'bg-blue-300'], ['Retain', '/retain', 'bg-emerald-300']]
const COLS: [string, [string, string][]][] = [
  ['Company', [['Book a demo', GET_URL], ['Log in', LOGIN_URL], ['Contact', `mailto:${CONTACT_EMAIL}`]]],
  ['Legal', [['Privacy policy', '/privacy'], ['Terms of service', '/terms']]],
]

const link = 'text-[15.5px] text-zinc-300 transition-colors hover:text-white lg:text-[14px] lg:text-zinc-400'

/** The footer: framed in the same hairlines as every section, then a quiet legal line and a large fading wordmark. */
export function Footer() {
  return (
    <footer className="overflow-hidden px-3 pb-[env(safe-area-inset-bottom,0px)] pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* brand: a soft card on phones, open on desktop */}
          <div className="relative isolate col-span-2 mb-12 overflow-hidden rounded-2xl bg-white/[0.03] p-6 lg:col-span-1 lg:mb-0 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0 lg:px-1">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 lg:hidden" style={{ backgroundImage: 'radial-gradient(70% 80% at 85% 0%, rgba(139,92,246,0.18), transparent 70%), radial-gradient(50% 60% at 10% 0%, rgba(56,189,248,0.10), transparent 70%)' }} />
            <img src="/Liquexdark.png" alt="Liquex" className="h-7 w-auto" />
            <p className="mt-5 max-w-[280px] text-[16px] leading-7 text-zinc-300 lg:max-w-[260px] lg:text-[14.5px] lg:leading-6 lg:text-zinc-400">The full-stack platform to run your affiliate business.</p>
            <Button asChild className="mt-6 h-12 w-full rounded-full bg-white px-5 text-[15px] text-black hover:bg-white/90 lg:h-10 lg:w-auto lg:text-[14px]"><a href={GET_URL}>Book a demo</a></Button>
          </div>
          <div className="px-1">
            <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">Product</div>
            <ul className="mt-5 space-y-3">
              {PRODUCT.map(([k, h, dot]) => <li key={k}><SmartLink href={h} className={`${link} flex items-center gap-2.5`}><span className={`size-1.5 rounded-full ${dot}`} />{k}</SmartLink></li>)}
            </ul>
          </div>
          {COLS.map(([t, links], n) => (
            <div key={t} className={`px-1 ${n === 1 ? 'hidden lg:block' : ''}`}>
              <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">{t}</div>
              <ul className="mt-5 space-y-3">
                {links.map(([k, h]) => <li key={k}><SmartLink href={h} className={link}>{k}</SmartLink></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div aria-hidden className="mt-14 h-px bg-gradient-to-r from-transparent via-[hsl(248_85%_74%/0.45)] to-transparent" />
        <div className="flex flex-col gap-3 px-1 py-6 text-[12.5px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Liquex. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <SmartLink href="/privacy" className="transition-colors hover:text-white lg:hidden">Privacy</SmartLink>
            <SmartLink href="/terms" className="transition-colors hover:text-white lg:hidden">Terms</SmartLink>
            <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-white">{CONTACT_EMAIL}</a>
          </span>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-6xl px-1 text-[11.5px] leading-5 text-zinc-600">
        Risk warning: Trading forex and CFDs carries a high level of risk and may not be suitable for all investors. Liquex is a software platform for introducing brokers and affiliates. It does not provide investment advice, hold client funds or execute trades.
      </p>
      {/* the sign-off: a large wordmark, fading into the bottom of the page */}
      <div aria-hidden className="mx-auto -mb-[3vw] mt-10 max-w-6xl select-none bg-gradient-to-b from-[hsl(248_60%_80%/0.18)] to-transparent bg-clip-text text-center text-[17vw] font-semibold leading-[0.8] tracking-[-0.04em] text-transparent max-lg:text-[23vw] lg:text-[12.5rem]">
        LIQUEX
      </div>
    </footer>
  )
}
