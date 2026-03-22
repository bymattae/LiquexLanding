import React from 'react'
import {
  Activity,
  LifeBuoy,
  Menu,
  Radar,
  RefreshCcw,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import { useScroll } from 'framer-motion'

import { AnimatedGroup } from '@/components/ui/animated-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LogoCloud } from '@/components/ui/logo-cloud-2'
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
  { name: 'Overview', href: '#overview' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Retention', href: '#lifecycle' },
  { name: 'Proof', href: '#credibility' },
]

const lifecycleStates = [
  { label: 'Active', detail: 'Healthy clients with ongoing value.' },
  { label: 'Churning', detail: 'Early signs of decay in engagement or funding.' },
  { label: 'At risk', detail: 'Accounts that need action now.' },
  { label: 'Dormant', detail: 'Quiet clients worth reactivating.' },
  { label: 'Dead', detail: 'Lost book value you should have seen earlier.' },
]

const featureCards = [
  {
    icon: Radar,
    title: 'See churn early',
    body: 'Spot client behaviour changes before revenue disappears from the book.',
  },
  {
    icon: RefreshCcw,
    title: 'Recover dormant traders',
    body: 'Prioritize reactivation with clear lifecycle context instead of broad guesswork.',
  },
  {
    icon: Workflow,
    title: 'Run retention workflows',
    body: 'Turn lifecycle data into follow-up queues, actions, and team accountability.',
  },
  {
    icon: Activity,
    title: 'Protect book value',
    body: 'Manage active, churning, and at-risk accounts from one retention operating layer.',
  },
  {
    icon: Users,
    title: 'Coordinate broker teams',
    body: 'Give IBs, affiliate managers, and support teams one place to work the book together.',
  },
  {
    icon: LifeBuoy,
    title: 'Handle requests cleanly',
    body: 'Keep operational tasks, client requests, and retention follow-up in the same system.',
  },
]

const proofCards = [
  {
    company: 'Broker network placeholder',
    quote:
      'Liquex gives retention teams the missing layer between broker data and actual action.',
    name: 'Name placeholder',
    role: 'Affiliate manager',
  },
  {
    company: 'IB team placeholder',
    quote: 'We finally know which accounts are drifting and where the book needs attention first.',
    name: 'Name placeholder',
    role: 'Introducing broker',
  },
  {
    company: 'Partner ops placeholder',
    quote: 'It feels like an operating system for protecting revenue, not another CRM to babysit.',
    name: 'Name placeholder',
    role: 'Partner operations lead',
  },
]

export function RetentionSite() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <OverviewSection />
      <ProblemSection />
      <HowItWorksSection />
      <LifecycleSection />
      <FeaturesSection />
      <CredibilitySection />
      <FinalCtaSection />
      <FooterSection />
    </>
  )
}

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section id="top">
          <div className="relative pt-24">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
            <div className="mx-auto max-w-5xl px-6">
              <div className="sm:mx-auto lg:mr-auto">
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
                  <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
                    Retention OS for Introducing Brokers
                  </div>
                  <h1 className="mt-8 max-w-3xl text-balance text-5xl font-medium tracking-[-0.05em] text-white md:text-6xl lg:mt-16">
                    Retain more traders. Protect more of the book.
                  </h1>
                  <p className="mt-8 max-w-3xl text-pretty text-lg leading-8 text-zinc-400 md:text-xl">
                    Liquex helps IBs identify churn early, recover dormant accounts, and manage client-book retention with more precision.
                  </p>
                  <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-0.5">
                      <Button asChild size="lg" className="rounded-xl bg-white px-5 text-base font-semibold text-black hover:bg-white/90">
                        <a href="#notify">
                          <span className="text-nowrap">Book a demo</span>
                        </a>
                      </Button>
                    </div>
                    <Button asChild size="lg" variant="ghost" className="h-[42px] rounded-xl px-5 text-base text-white hover:bg-white/5">
                      <a href="#overview">
                        <span className="text-nowrap">See how it works</span>
                      </a>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
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
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={cn('group fixed z-20 w-full border-b border-white/10 transition-colors duration-150', scrolled && 'bg-background/50 backdrop-blur-3xl')}
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="#top" aria-label="home" className="flex items-center space-x-2">
                <Logo />
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
                      <a href={item.href} className="block text-muted-foreground duration-150 hover:text-accent-foreground">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl shadow-zinc-950/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="block text-muted-foreground duration-150 hover:text-accent-foreground">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm" className="rounded-xl border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white">
                  <a href="#login">
                    <span>Login</span>
                  </a>
                </Button>
                <Button asChild size="sm" className="rounded-xl bg-white text-black hover:bg-white/90">
                  <a href="#notify">
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

function PartnersSection() {
  return (
    <section id="credibility" className="bg-background py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-lg font-medium text-white">Integrated with leading trading platforms</h2>
        <div className="mt-12">
          <LogoCloud />
        </div>
      </div>
    </section>
  )
}

function OverviewSection() {
  return (
    <section id="overview" className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-3xl text-4xl font-medium tracking-[-0.04em] text-white lg:text-5xl">
          Liquex is a retention platform built for IBs, not another generic CRM.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:mb-0">
            <div className="grid gap-3 sm:grid-cols-2">
              {lifecycleStates.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-black/20 p-4 sm:col-span-1 last:sm:col-span-2">
                  <div className="text-sm uppercase tracking-[0.16em] text-zinc-500">{item.label}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative space-y-4">
            <p className="text-muted-foreground text-lg leading-8">
              Liquex gives introducing brokers clear visibility into which clients are active, churning, at risk, dormant, or gone.
            </p>
            <p className="text-muted-foreground text-lg leading-8">
              It helps broker affiliate managers and partner teams turn client data into retention actions, follow-up priority, and stronger book value.
            </p>

            <div className="pt-6">
              <blockquote className="border-l-4 border-white/20 pl-4">
                <p className="text-zinc-300">
                  Built to protect and grow an IB&apos;s client book with lifecycle visibility, retention workflow, and operational control in one place.
                </p>
                <div className="mt-6 space-y-3">
                  <cite className="block font-medium text-white">Core positioning</cite>
                  <span className="block text-sm text-zinc-500">Modern operating system for IB retention</span>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">Why IBs lose clients</div>
          <h2 className="mt-6 text-4xl font-medium tracking-[-0.05em] text-white lg:text-5xl">
            Visibility breaks first. Retention breaks next.
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-400">
            Most IBs don&apos;t lose clients because demand is weak. They lose them because churn appears too late and follow-up happens too slowly.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            'No clear view of which traders are drifting.',
            'No reliable way to prioritize follow-up across the book.',
            'No single workflow for retention, requests, and partner ops.',
          ].map((item) => (
            <Card key={item} className="rounded-2xl border-white/10 bg-white/[0.03] shadow-none">
              <CardContent className="pt-6">
                <p className="text-lg leading-8 text-zinc-300">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-16 dark:bg-transparent md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-medium tracking-[-0.05em] text-white lg:text-5xl">How Liquex works</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-400">
            Segment the book, surface risk, and give the team one place to act.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'See the lifecycle',
              body: 'Segment every client into active, churning, at risk, dormant, or dead.',
            },
            {
              step: '02',
              title: 'Prioritize retention',
              body: 'Surface the accounts and relationships that need attention first.',
            },
            {
              step: '03',
              title: 'Run the workflow',
              body: 'Manage requests, partner follow-up, and retention actions from one operating layer.',
            },
          ].map((item) => (
            <Card key={item.step} className="rounded-2xl border-white/10 bg-white/[0.03] shadow-none">
              <CardContent className="pt-6">
                <div className="text-sm uppercase tracking-[0.18em] text-zinc-500">{item.step}</div>
                <h3 className="mt-6 text-2xl font-medium text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-zinc-400">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-16 dark:bg-transparent md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-medium tracking-[-0.05em] text-white lg:text-5xl">Retention-first features</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-400">
            Everything framed around keeping more traders, recovering more value, and running cleaner partner operations.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="relative col-span-full overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-none lg:col-span-1">
                  <CardContent className="pt-6">
                    <div className="relative flex aspect-square size-12 rounded-full border border-white/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                      <Icon className="m-auto size-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="relative z-10 mt-10 space-y-3">
                      <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                      <p className="text-base leading-7 text-zinc-400">{feature.body}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function LifecycleSection() {
  return (
    <section id="lifecycle" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center md:space-y-8">
          <h2 className="text-4xl font-medium tracking-[-0.05em] text-white lg:text-5xl">Manage the entire client lifecycle from one retention view.</h2>
          <p className="text-lg leading-8 text-zinc-400">
            Know exactly where the book is strong, where it is vulnerable, and where to focus next.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {lifecycleStates.map((item, index) => (
            <Card key={item.label} className={cn('rounded-2xl border-white/10 bg-white/[0.03] shadow-none', index === 0 ? 'md:col-span-2' : 'md:col-span-1')}>
              <CardContent className="h-full pt-6">
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p className="text-xl font-medium text-white">{item.label}</p>
                  <div>
                    <p className="text-base leading-7 text-zinc-400">{item.detail}</p>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CredibilitySection() {
  return (
    <section id="social-proof" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-10">
          <h2 className="text-4xl font-medium tracking-[-0.05em] text-white lg:text-5xl">Built for teams working across broker and IB retention.</h2>
          <p className="text-lg leading-8 text-zinc-400">
            Credibility placeholders for broker networks, affiliate teams, and retention operators.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {proofCards.map((item) => (
            <Card key={item.company} className="rounded-2xl border-white/10 bg-white/[0.03] shadow-none">
              <CardHeader>
                <div className="text-sm uppercase tracking-[0.16em] text-zinc-500">{item.company}</div>
              </CardHeader>
              <CardContent>
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p className="text-xl font-medium leading-8 text-white">{item.quote}</p>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white">
                      {item.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </div>
                    <div>
                      <cite className="text-sm font-medium not-italic text-white">{item.name}</cite>
                      <span className="text-muted-foreground block text-sm">{item.role}</span>
                    </div>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section id="notify" className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] px-8 py-12 text-center md:px-12 md:py-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white lg:text-5xl">
            Turn client data into retention action.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Protect book value, recover dormant traders, and give IB teams one system for retention, requests, and partner workflows.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl bg-white px-6 text-base font-semibold text-black hover:bg-white/90">
              <a href="#top">Join the waitlist</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-xl text-white hover:bg-white/5">
              <a href="#top">Book a demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <a href="#top" aria-label="go home" className="mx-auto block size-fit">
          <Logo />
        </a>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {menuItems.map((link) => (
            <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary block duration-150">
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <span>For introducing brokers</span>
          <span>For affiliate managers</span>
          <span>For broker networks</span>
        </div>
        <span className="text-muted-foreground block text-center text-sm">© {new Date().getFullYear()} Liquex. All rights reserved.</span>
      </div>
    </footer>
  )
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex size-8 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#9B99FE_0%,#2BC8B7_100%)] shadow-[0_12px_30px_rgba(65,126,255,0.18)]">
        <span className="text-sm font-semibold text-white">L</span>
      </div>
      <div>
        <div className="text-sm font-semibold tracking-[-0.03em] text-white">Liquex</div>
        <div className="text-xs text-zinc-500">Retention OS</div>
      </div>
    </div>
  )
}
