import { HeroSection } from '@/components/blocks/hero-section'
import { LogoCloud } from '@/components/blocks/logo-cloud'
import { AnimatedGroup } from '@/components/ui/animated-group'
import FAQs from '@/components/ui/faqs'
import FeaturesSection from '@/components/ui/features'
import Testimonials from '@/components/ui/testimonials'

const logos = [
  { src: '/VTMarketsNew.png', alt: 'VT Markets', width: 132 },
  { src: '/PUPrimeNew.png', alt: 'PU Prime', width: 126 },
  { src: '/StarTraderNew.png', alt: 'StarTrader', width: 142 },
  { src: '/VantageNew.png', alt: 'Vantage', width: 128 },
  { src: '/AxiNew.png', alt: 'Axi', width: 104 },
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

export default function IBsPage() {
  return (
    <div className="theme-ibs pb-10 sm:pb-12">
      <div id="top">
        <HeroSection />
      </div>
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 1.05,
              },
            },
          },
          ...transitionVariants,
        }}
      >
        <div id="integrations">
          <section className="py-16 sm:py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xl font-semibold tracking-tight text-white/55 sm:text-2xl md:text-3xl">Trusted by leaders.</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">We integrate with</h2>
              </div>
              <div className="mx-auto mt-6 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent sm:mt-8" />
              <div className="mx-auto mt-3 max-w-3xl sm:mt-4">
                <LogoCloud logos={logos} />
              </div>
            </div>
          </section>
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="results">
          <Testimonials />
        </div>
        <div id="faq">
          <FAQs />
        </div>
      </AnimatedGroup>
    </div>
  )
}
