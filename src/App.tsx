import { Link } from 'react-router-dom'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { ProductIcon } from '@/components/ui/product-icon'
import { useTeaser } from '@/components/ui/teaser-context'
import { cn } from '@/lib/utils'

const apps = [
  {
    title: 'Affiliate OS',
    subtitle: 'Retention for IBs',
    to: '/ibs',
    active: true,
    icon: 'affiliate' as const,
  },
  {
    title: 'Broker OS',
    subtitle: 'Operations for brokerages',
    icon: 'broker' as const,
  },
  {
    title: 'Creator OS',
    subtitle: 'Growth for creators',
    icon: 'creator' as const,
  },
]

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

export default function App() {
  const { showTeaser } = useTeaser()

  return (
        <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl flex-1 items-start px-4 pb-24 pt-14 sm:items-center sm:px-6 sm:pb-36 sm:pt-20">
          <div className="w-full">
            <div className="pt-20 sm:pt-18">
              <AnimatedGroup
                className="flex justify-center"
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
                <div className="flex max-w-4xl flex-col items-center text-center">
                  <h1 className="mt-2 max-w-[13rem] text-balance text-[1.78rem] font-medium leading-[1.02] sm:mt-3 sm:max-w-none sm:text-5xl md:text-6xl lg:mt-4">Technology for modern trading.</h1>
                </div>
              </AnimatedGroup>
            </div>

            <AnimatedGroup
              className="mt-5 grid gap-2 sm:mt-12 sm:gap-4 md:grid-cols-3"
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.9,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              {apps.map((app) => {
                const card = (
                  <div
                    className={cn(
                      'group relative h-full overflow-hidden rounded-[0.95rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 sm:rounded-[1.5rem] sm:p-5',
                      app.active
                        ? 'border-emerald-300/22 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] hover:border-emerald-300/34 hover:-translate-y-1'
                        : 'hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] hover:-translate-y-1',
                    )}
                  >
                    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                    <div className="flex items-start justify-between gap-3">
                      <ProductIcon
                        name={app.icon}
                        size="sm"
                        className={cn(
                          'transition-transform duration-300 group-hover:scale-[1.03] sm:h-14 sm:w-14 sm:rounded-[0.95rem]',
                          app.active ? 'shadow-[0_18px_40px_rgba(16,185,129,0.18)]' : 'shadow-[0_18px_40px_rgba(0,0,0,0.22)]',
                        )}
                      />
                      <div
                        className={cn(
                          'mt-0.5 flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] uppercase tracking-[0.18em] sm:mt-1 sm:gap-2 sm:px-2.5 sm:text-[10px]',
                          app.active
                            ? 'border-emerald-300/18 bg-emerald-300/10 text-emerald-200'
                            : 'border-violet-300/16 bg-violet-300/10 text-violet-200',
                        )}
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full',
                            app.active ? 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.6)]' : 'bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.55)]',
                          )}
                        />
                        <span>{app.active ? 'Live' : 'Dev Mode'}</span>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-5">
                      <div className="text-[15px] font-semibold tracking-tight text-white sm:text-xl">{app.title}</div>
                      <div className="mt-0.5 text-[11px] leading-[1.2rem] text-white/52 sm:text-sm sm:leading-6">{app.subtitle}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-white/6 pt-2.5 text-[10px] text-white/36 sm:mt-5 sm:pt-3 sm:text-[11px]">
                      <span>{app.active ? 'Open workspace' : 'Preview in progress'}</span>
                      <span className="text-white/48 transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                    </div>
                  </div>
                )

                return app.to ? (
                  <Link key={app.title} to={app.to} className="block w-full">
                    {card}
                  </Link>
                ) : (
                  <button
                    key={app.title}
                    type="button"
                    className="block w-full text-left"
                    onClick={() => showTeaser("We're working on something cool 👀")}
                  >
                    {card}
                  </button>
                )
              })}
            </AnimatedGroup>

            <AnimatedGroup
              className="mt-5 flex justify-center sm:mt-10"
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 1.05,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <p className="max-w-[18rem] text-balance text-center text-[12px] leading-5 text-white/46 sm:max-w-2xl sm:text-[15px] sm:leading-7 sm:text-white/52">
                We think trading deserves better systems, quieter operations, and infrastructure that actually helps good teams move faster.
              </p>
            </AnimatedGroup>
          </div>
        </section>
  )
}
