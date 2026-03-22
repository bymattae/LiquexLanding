import { Link } from 'react-router-dom'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'

const apps = [
  {
    title: 'Affiliate OS',
    subtitle: 'Retention, client tracking, and workflows built to grow and protect your IB book.',
    to: '/ibs',
    accent: 'from-emerald-300 to-green-500',
    active: true,
    mark: 'nexa' as const,
  },
  {
    title: 'Broker OS',
    subtitle: 'Oversight, teams, and client-book operations for modern brokerages.',
    accent: 'from-sky-300 to-blue-500',
    mark: 'atlas' as const,
  },
  {
    title: 'Creator OS',
    subtitle: 'Growth systems, audiences, and monetisation tools for trading creators.',
    accent: 'from-violet-300 to-fuchsia-500',
    mark: 'muse' as const,
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
  return (
        <section className="mx-auto flex min-h-[calc(100vh-7.5rem)] w-full max-w-5xl flex-1 items-center px-4 pb-32 pt-20 sm:px-6 sm:pb-36 sm:pt-20">
          <div className="w-full">
            <div className="pt-4 sm:pt-0">
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
                  <h1 className="mt-3 max-w-[15rem] text-balance text-[2.1rem] font-medium leading-[1.02] sm:max-w-none sm:text-5xl md:text-6xl lg:mt-4">Technology for modern trading.</h1>
                  <p className="mt-4 max-w-[18rem] text-balance text-sm leading-6 text-white/62 sm:mt-8 sm:max-w-none sm:text-lg">
                    Built for IBs and brokers to retain clients, manage operations, and scale.
                  </p>
                </div>
              </AnimatedGroup>
            </div>

            <AnimatedGroup
              className="mt-8 grid gap-2.5 sm:mt-12 sm:gap-4 md:grid-cols-3"
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
                      'group relative h-full overflow-hidden rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 sm:rounded-[1.5rem] sm:p-5',
                      app.active
                        ? 'border-emerald-300/22 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] hover:border-emerald-300/34 hover:-translate-y-1'
                        : 'hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] hover:-translate-y-1',
                    )}
                  >
                    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                    <div className="absolute right-3.5 top-3.5 rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-white/38 sm:right-5 sm:top-5 sm:px-2.5 sm:text-[10px]">
                      {app.active ? 'Open' : 'Soon'}
                    </div>
                    <ProductMark name={app.mark} accent={app.accent} />
                    <div className="mt-3 text-[1.05rem] font-semibold tracking-tight text-white sm:mt-6 sm:text-xl">{app.title}</div>
                    <div className="mt-1.5 max-w-[18rem] text-[13px] leading-5 text-white/52 sm:mt-2 sm:text-sm sm:leading-6">{app.subtitle}</div>
                  </div>
                )

                return app.to ? (
                  <Link key={app.title} to={app.to}>
                    {card}
                  </Link>
                ) : (
                  <div key={app.title}>{card}</div>
                )
              })}
            </AnimatedGroup>
          </div>
        </section>
  )
}

function ProductMark({
  name,
  accent,
}: {
  name: 'nexa' | 'atlas' | 'muse'
  accent: string
}) {
  return (
    <div
      className={cn(
        'relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[0.95rem] bg-gradient-to-br ring-1 ring-white/18 shadow-[0_20px_40px_rgba(0,0,0,0.24)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-[76px] sm:w-[76px] sm:rounded-[1.3rem]',
        accent,
      )}
    >
      <div className="absolute inset-0 rounded-[1.3rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.30),transparent_42%)] opacity-80" />
      <div className="absolute inset-[1px] rounded-[1.2rem] border border-white/12" />
      {name === 'nexa' ? <NexaMark /> : null}
      {name === 'atlas' ? <AtlasMark /> : null}
      {name === 'muse' ? <MuseMark /> : null}
    </div>
  )
}

function NexaMark() {
  return (
    <div className="relative h-9 w-9">
      <div className="absolute inset-y-0 left-1.5 w-1.5 rounded-full bg-white" />
      <div className="absolute inset-y-0 right-1.5 w-1.5 rounded-full bg-white/92" />
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rotate-[34deg] rounded-full bg-white/96" />
    </div>
  )
}

function AtlasMark() {
  return (
    <div className="relative h-9 w-9">
      <div className="absolute inset-y-1 left-1.5 w-1.5 rounded-full bg-white/84" />
      <div className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-white" />
      <div className="absolute inset-y-2 right-1.5 w-1.5 rounded-full bg-white/84" />
      <div className="absolute inset-x-1 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/86" />
    </div>
  )
}

function MuseMark() {
  return (
    <div className="relative h-9 w-9">
      <div className="absolute left-1/2 top-0 h-9 w-1 -translate-x-1/2 rounded-full bg-white/92" />
      <div className="absolute left-1/2 top-0 h-9 w-1 -translate-x-1/2 rotate-45 rounded-full bg-white/86" />
      <div className="absolute left-1/2 top-0 h-9 w-1 -translate-x-1/2 -rotate-45 rounded-full bg-white/86" />
    </div>
  )
}
