import React from 'react'
import { Menu, X } from 'lucide-react'
import { useScroll } from 'framer-motion'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"></div>
            <div className="mx-auto max-w-5xl px-6">
              <div className="sm:mx-auto lg:mr-auto">
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                >
                  <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16">
                    Stop losing traders. Retain your entire book.
                  </h1>
                  <p className="mt-8 max-w-2xl text-pretty text-lg">
                    Liquex gives IBs full visibility into their client book, so you can spot churn early, take action faster, and grow long-term value.
                  </p>
                  <div className="mt-12 flex items-center gap-2">
                    <div key={1} className="bg-foreground/10 rounded-[14px] border p-0.5">
                      <Button asChild size="lg" className="rounded-xl px-5 text-base">
                        <a href="#link">
                          <span className="text-nowrap">Book demo</span>
                        </a>
                      </Button>
                    </div>
                    <Button key={2} asChild size="lg" variant="ghost" className="h-[42px] rounded-xl px-5 text-base">
                      <a href="https://app.liquex.co/auth">
                        <span className="text-nowrap">Login</span>
                      </a>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div aria-hidden className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%" />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-cyan-500/10 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_90px_rgba(34,211,238,0.05),0_40px_120px_rgba(59,130,246,0.04)] ring-1">
                  <div className="h-[215px] overflow-hidden sm:h-[305px] md:h-[425px] lg:h-auto">
                    <div className="origin-top-left scale-[0.33] sm:scale-[0.47] md:scale-[0.66] lg:scale-100">
                      <HeroDashboardMockup />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  )
}

const menuItems = [
  { name: 'Integrations', href: '#integrations' },
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
]

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const { scrollYProgress } = useScroll()

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={cn('group fixed z-20 w-full border-b transition-colors duration-150', scrolled && 'bg-background/50 backdrop-blur-3xl')}
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="#top" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <a href="https://app.liquex.co/auth">
                    <span>Login</span>
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href="#">
                    <span>Book demo</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <img src="/Liquexdark.png" alt="Liquex" className={cn('h-8 w-auto', className)} />
  )
}

const HeroDashboardMockup = () => {
  return (
    <div className="w-[1120px] rounded-2xl border border-cyan-500/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.05),transparent_24%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_26%),hsl(var(--background))] p-4">
      <div className="grid h-full grid-cols-[180px_1fr] gap-3">
        <div className="rounded-[20px] border border-border/60 bg-card/50 p-3.5">
          <div className="flex items-center gap-2">
            <img src="/Liquexdark.png" alt="Liquex" className="h-5 w-auto" />
          </div>
          <div className="mt-5 space-y-1.5">
            {['Home', 'Networks', "Sub IB's", 'Clients', 'Users', 'Requests'].map((item, index) => (
              <div
                key={item}
                className={cn(
                  'rounded-lg px-3 py-2 text-[13px]',
                  index === 0 ? 'bg-foreground/[0.06] text-white' : 'text-zinc-500',
                )}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-border/60 bg-foreground/[0.03] px-3 py-2.5 text-[11px] text-zinc-400">
            Platform Admin
          </div>
        </div>

        <div className="grid h-full grid-rows-[auto_1fr] gap-3">
          <div className="rounded-[20px] border border-border/60 bg-card/40 px-4 py-3.5">
            <div className="grid grid-cols-[1fr_auto] items-start gap-4">
              <div>
                <div className="text-xs text-zinc-500">Active funding</div>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <div className="text-3xl font-semibold tracking-tight md:text-[2.5rem]">$532,241</div>
                  <div className="rounded-full border border-emerald-500/15 bg-emerald-400/12 px-2.5 py-1 text-[11px] font-medium text-emerald-300">+$57,312</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5 self-center">
                {['Networks', 'Clients', 'Users', 'Requests', 'Tasks'].map((item) => (
                  <div key={item} className="min-w-[76px] rounded-xl border border-border/50 bg-background/40 px-2.5 py-3 text-center text-[11px] text-zinc-400">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid h-full grid-cols-[1.08fr_0.92fr] gap-3">
            <div className="rounded-[20px] border border-border/50 bg-card/30 p-4">
              <div className="text-sm font-medium text-white">Book Breakdown</div>
              <div className="mt-5 grid grid-cols-[180px_1fr] items-center gap-4">
                <div className="relative mx-auto size-36 rounded-full border-[16px] border-emerald-500 border-r-zinc-600 border-b-amber-500 border-l-red-500">
                  <div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-background">
                    <div className="text-center">
                      <div className="text-3xl font-semibold">962</div>
                      <div className="text-xs text-zinc-500">need attention</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    ['Active', '151', '$225,246', 'bg-emerald-400'],
                    ['Churning', '48', '$5,609', 'bg-amber-400'],
                    ['At Risk', '7', '$8,609', 'bg-rose-400'],
                    ['Dormant', '18', '$6,738', 'bg-zinc-400'],
                  ].map(([label, count, value, color]) => (
                    <div key={label} className="grid grid-cols-[1fr_auto_auto] items-center gap-2.5 text-[13px]">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <span className={cn('size-2 rounded-full', color)} />
                        <span>{label}</span>
                      </div>
                      <span className="text-zinc-300">{count}</span>
                      <span className="font-medium text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-border/50 bg-background/30 p-3">
                <div className="mb-3 text-sm font-medium text-white">Needs attention</div>
                <div className="space-y-2">
                  {[
                    ['John Smith', 'At Risk', 'text-red-300 border-red-500/20 bg-red-500/10'],
                    ['Sarah Johnson', 'Dormant', 'text-zinc-300 border-zinc-500/20 bg-zinc-500/10'],
                    ['Michael Brown', 'Churning', 'text-amber-300 border-amber-500/20 bg-amber-500/10'],
                  ].map(([name, status, styles]) => (
                    <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-border/40 bg-foreground/[0.02] px-3 py-2 text-[13px]">
                      <span className="text-zinc-300">{name}</span>
                      <span className={cn('rounded-full border px-2 py-1 text-[10px] font-medium', styles)}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid h-full grid-rows-2 gap-3">
              <div className="rounded-[20px] border border-border/50 bg-card/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Daily Balance</div>
                  <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-1 text-[10px] text-zinc-400">7d</div>
                </div>
                <div className="mt-4 rounded-xl bg-foreground/[0.02] px-3 pb-2 pt-4">
                  <svg viewBox="0 0 320 126" className="h-[126px] w-full" aria-hidden>
                    <path d="M0 24H320M0 52H320M0 80H320M0 108H320" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <path
                      d="M12 76C38 74 60 69 88 67C114 65 138 61 166 58C194 55 218 63 246 50C272 39 294 43 308 30"
                      fill="none"
                      stroke="rgba(74,222,128,0.95)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 76C38 74 60 69 88 67C114 65 138 61 166 58C194 55 218 63 246 50C272 39 294 43 308 30L308 126L12 126Z"
                      fill="url(#daily-balance-fill)"
                    />
                    <defs>
                      <linearGradient id="daily-balance-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(74,222,128,0.28)" />
                        <stop offset="100%" stopColor="rgba(74,222,128,0.01)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="mt-2 grid grid-cols-6 text-center text-[10px] text-zinc-500">
                    <span>15 Mar</span>
                    <span>16 Mar</span>
                    <span>17 Mar</span>
                    <span>18 Mar</span>
                    <span>21 Mar</span>
                    <span>21 Mar</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-border/50 bg-card/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Clients Per Stage</div>
                  <div className="rounded-lg border border-border/60 bg-background/50 px-2 py-1 text-[10px] text-zinc-400">7d</div>
                </div>
                <div className="mt-4 grid h-[126px] grid-cols-3 items-end gap-4 rounded-xl bg-foreground/[0.02] px-3 pb-2 pt-4">
                  {[
                    [18, 8, 3, 84],
                    [16, 9, 4, 86],
                    [19, 8, 3, 88],
                  ].map((bars, group) => (
                    <div key={group} className="grid h-full grid-cols-4 items-end gap-1.5">
                      <div className="rounded-t bg-emerald-400" style={{ height: `${bars[0]}%` }} />
                      <div className="rounded-t bg-amber-400" style={{ height: `${bars[1]}%` }} />
                      <div className="rounded-t bg-rose-400" style={{ height: `${bars[2]}%` }} />
                      <div className="rounded-t bg-zinc-500/90" style={{ height: `${bars[3]}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 text-center text-[10px] text-zinc-500">
                  <span>15 Mar</span>
                  <span>16 Mar</span>
                  <span>21 Mar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
