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

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pipeline', href: '#pipeline' },
  { name: 'Retention', href: '#retention' },
  { name: 'About', href: '#about' },
]

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section id="top">
          <div className="relative pb-10 pt-24">
            <div className="absolute inset-0 -z-10 size-full bg-[radial-gradient(90%_120%_at_50%_0%,rgba(255,255,255,0.03),transparent_45%)]" />
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,hsl(var(--background))_74%)]" />
            <div className="mx-auto max-w-5xl px-6 text-center">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.2,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <h1 className="mt-8 text-balance text-5xl font-medium tracking-[-0.06em] text-white md:text-6xl lg:mt-16 lg:text-7xl">
                  The AI-Powered OS for Introducing Brokers.
                </h1>
                <p className="mx-auto mt-8 max-w-3xl text-pretty text-xl leading-9 text-zinc-400 md:text-2xl">
                  One platform to capture leads, manage pipelines, track deposits, and retain clients.
                </p>
                <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-0.5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                    <Button asChild size="lg" className="rounded-none bg-white px-6 text-base font-semibold text-black hover:bg-white/90">
                      <a href="#notify">Get notified</a>
                    </Button>
                  </div>
                  <Button asChild size="lg" variant="ghost" className="h-[42px] rounded-none px-5 text-base text-white hover:bg-transparent hover:text-white/80">
                    <a href="#features">See how it works</a>
                  </Button>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollYProgress } = useScroll()

  React.useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05)
    })
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={cn(
          'group fixed z-20 w-full border-b border-white/10 transition-colors duration-150',
          scrolled && 'bg-background/80 backdrop-blur-3xl',
        )}
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="/" aria-label="home" className="flex items-center space-x-2">
                <span className="text-lg font-semibold tracking-[-0.04em] text-white">Liquex</span>
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="block text-sm text-zinc-500 duration-150 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 bg-background p-6 shadow-2xl shadow-black/40 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="block text-muted-foreground duration-150 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm" className="rounded-none border-white/10 bg-transparent text-white hover:bg-white/5">
                  <a href="#login">Login</a>
                </Button>
                <Button asChild size="sm" className="rounded-none bg-white text-black hover:bg-white/90">
                  <a href="#notify">Get notified</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
