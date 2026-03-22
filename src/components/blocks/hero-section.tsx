import React from 'react'
import { Handshake } from 'lucide-react'
import { motion, useAnimation, type Variants } from 'framer-motion'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const badgeEase = [0.16, 1, 0.3, 1] as const

const iconAnimationVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: -10 },
}

export function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-16 sm:pt-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="pt-8 sm:mx-auto sm:pt-8 lg:mr-auto lg:pt-10">
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
                  <HeroBadge text="Affiliate OS" icon={<Handshake className="size-4" />} />
                  <h1 className="mt-3 max-w-[22rem] text-balance text-[2.35rem] font-medium leading-[1.02] sm:max-w-2xl sm:text-5xl md:text-6xl lg:mt-4">
                    Stop losing traders. Retain your entire book.
                  </h1>
                  <p className="mt-5 max-w-[21rem] text-pretty text-sm leading-6 sm:mt-8 sm:max-w-2xl sm:text-lg">
                    Liquex gives IBs full visibility into their client book, so you can spot churn early, take action faster, and grow long-term value.
                  </p>
                  <div className="mt-8 flex items-center gap-2 sm:mt-12">
                    <div key={1} className="bg-foreground/10 rounded-[12px] border p-0.5 sm:rounded-[14px]">
                      <Button asChild size="lg" className="h-10 rounded-xl px-4 text-sm sm:h-11 sm:px-5 sm:text-base">
                        <a href="#link">
                          <span className="text-nowrap">Book demo</span>
                        </a>
                      </Button>
                    </div>
                    <Button key={2} asChild size="lg" variant="ghost" className="h-10 rounded-xl px-4 text-sm sm:h-[42px] sm:px-5 sm:text-base">
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
              <div className="relative -mx-2 mt-8 overflow-hidden px-0 sm:mx-0 sm:mt-12 sm:px-2 md:mt-20">
                <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-black/20" />
                <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-none bg-transparent sm:rounded-2xl">
                  <div className="h-[274px] w-full overflow-hidden sm:h-[305px] md:h-[425px] lg:h-auto">
                    <div className="relative left-1/2 w-[1040px] -translate-x-1/2 origin-top scale-[0.42] sm:scale-[0.47] md:scale-[0.66] lg:scale-100">
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

function HeroBadge({ text, icon }: { text: string; icon: React.ReactNode }) {
  const controls = useAnimation()

  return (
    <motion.div
      className="group inline-flex w-fit cursor-default rounded-full border border-emerald-300/18 bg-emerald-300/8 px-3 py-1 text-xs shadow-sm transition-colors hover:bg-emerald-300/12 sm:px-4 sm:py-1.5 sm:text-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: badgeEase }}
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('initial')}
    >
      <motion.div
        className="mr-2 text-foreground/60 transition-colors group-hover:text-primary"
        variants={iconAnimationVariants}
        initial="initial"
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <span>{text}</span>
    </motion.div>
  )
}

const HeroDashboardMockup = () => {
  return (
    <div className="w-[1040px] rounded-2xl border border-white/8 bg-[rgba(6,8,12,0.96)] p-4">
      <div className="grid h-full grid-cols-[168px_1fr] gap-3">
        <div className="rounded-[20px] border border-white/8 bg-black/40 p-3.5">
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
          <div className="mt-8 rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5 text-[11px] text-zinc-400">
            Platform Admin
          </div>
        </div>

        <div className="grid h-full grid-rows-[auto_1fr] gap-3 pr-3">
          <div className="rounded-[20px] border border-white/8 bg-black/34 px-4 py-3.5">
            <div className="grid grid-cols-[1fr_auto] items-start gap-4">
              <div>
                <div className="text-xs text-zinc-500">Active funding</div>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <div className="text-3xl font-semibold tracking-tight md:text-[2.5rem]">$532,241</div>
                  <div className="rounded-full border border-emerald-300/18 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">+$57,312</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5 self-center">
                {['Networks', 'Clients', 'Users', 'Requests', 'Tasks'].map((item) => (
                  <div key={item} className="min-w-[64px] rounded-xl border border-white/6 bg-white/[0.02] px-2 py-2.5 text-center text-[10px] text-zinc-400">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid h-full grid-cols-[1.08fr_0.92fr] gap-3">
            <div className="grid h-full grid-rows-2 gap-3">
              <div className="rounded-[20px] border border-white/8 bg-black/30 p-4">
                <div className="text-sm font-medium text-white">Book Breakdown</div>
                <div className="mt-5 grid grid-cols-[180px_1fr] items-center gap-4">
                  <div className="relative mx-auto size-36 rounded-full border-[16px] border-white/70 border-r-zinc-600 border-b-amber-500 border-l-red-500">
                    <div className="absolute inset-[18px] flex items-center justify-center rounded-full bg-black/90">
                      <div className="text-center">
                        <div className="text-3xl font-semibold">962</div>
                        <div className="text-xs text-zinc-500">need attention</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      ['Active', '151', '$225,246', 'bg-emerald-300'],
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
              </div>

              <div className="rounded-[20px] border border-white/8 bg-black/30 p-4">
                <div className="mb-4 text-sm font-medium text-white">Needs attention</div>
                <div className="space-y-2">
                  {[
                    ['John Smith', 'At Risk', 'text-red-300 border-red-500/20 bg-red-500/10'],
                    ['Sarah Johnson', 'Dormant', 'text-zinc-300 border-zinc-500/20 bg-zinc-500/10'],
                    ['Michael Brown', 'Churning', 'text-amber-300 border-amber-500/20 bg-amber-500/10'],
                  ].map(([name, status, styles]) => (
                    <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-white/6 bg-white/[0.02] px-3 py-3 text-[13px]">
                      <span className="text-zinc-300">{name}</span>
                      <span className={cn('rounded-full border px-2 py-1 text-[10px] font-medium', styles)}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid h-full grid-rows-2 gap-3">
              <div className="rounded-[20px] border border-white/8 bg-black/30 px-4 pb-4 pt-4 pr-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Daily Balance</div>
                  <div className="rounded-lg border border-white/6 bg-white/[0.03] px-2 py-1 text-[10px] text-zinc-400">7d</div>
                </div>
                <div className="mt-4 rounded-xl bg-white/[0.02] px-4 pb-2 pt-4">
                  <svg viewBox="0 0 320 126" className="h-[126px] w-full" aria-hidden>
                    <path d="M0 24H320M0 52H320M0 80H320M0 108H320" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <path
                      d="M12 76C38 74 60 69 88 67C114 65 138 61 166 58C194 55 218 63 246 50C272 39 294 43 308 30"
                      fill="none"
                      stroke="rgba(110,231,183,0.95)"
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
                        <stop offset="0%" stopColor="rgba(110,231,183,0.24)" />
                        <stop offset="100%" stopColor="rgba(110,231,183,0.01)" />
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

              <div className="rounded-[20px] border border-white/8 bg-black/30 px-4 pb-4 pt-4 pr-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Clients Per Stage</div>
                  <div className="rounded-lg border border-white/6 bg-white/[0.03] px-2 py-1 text-[10px] text-zinc-400">7d</div>
                </div>
                <div className="mt-4 grid h-[126px] grid-cols-3 items-end gap-4 rounded-xl bg-white/[0.02] px-4 pb-2 pt-4">
                  {[
                    [18, 8, 3, 84],
                    [16, 9, 4, 86],
                    [19, 8, 3, 88],
                  ].map((bars, group) => (
                    <div key={group} className="grid h-full grid-cols-4 items-end gap-1.5">
                      <div className="rounded-t bg-emerald-300" style={{ height: `${bars[0]}%` }} />
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
