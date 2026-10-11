import React from 'react'
import { Handshake } from 'lucide-react'
import { motion, useAnimation, type Variants } from 'framer-motion'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { Button } from '@/components/ui/button'
import { HomeMockup } from '@/components/affiliate/home-mockup'

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
              <div className="flex flex-col items-center pt-10 text-center sm:pt-14 lg:pt-16">
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
                  <h1 className="mx-auto mt-5 max-w-[22rem] text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:max-w-3xl sm:text-6xl md:text-7xl">
                    Stop losing traders. Retain your entire book.
                  </h1>
                  <p className="mx-auto mt-5 max-w-[21rem] text-pretty text-lg text-zinc-400 sm:mt-6 sm:max-w-xl sm:text-xl">
                    The operating system for serious IBs. Invite only.
                  </p>
                  <div className="mt-9 flex items-center justify-center gap-2 sm:mt-10">
                    <div key={1}>
                      <Button asChild size="lg" className="h-11 rounded-full px-6 text-sm sm:h-12 sm:px-7 sm:text-base">
                        <a href="#link">
                          <span className="text-nowrap">Request access</span>
                        </a>
                      </Button>
                    </div>
                    <Button key={2} asChild size="lg" variant="ghost" className="h-11 rounded-full px-5 text-sm sm:h-12 sm:px-6 sm:text-base">
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
              <div className="relative -mx-2 mt-14 overflow-hidden px-0 pb-10 sm:mx-0 sm:mt-20 sm:px-2 md:mt-24">
                                <div className="relative mx-auto w-full max-w-5xl bg-transparent">
                  <div className="h-[218px] w-full sm:h-[290px] md:h-[400px] lg:h-auto">
                    <div className="relative left-1/2 w-[1040px] -translate-x-1/2 origin-top scale-[0.355] sm:scale-[0.47] md:scale-[0.66] lg:scale-100">
                      <HomeMockup />
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

