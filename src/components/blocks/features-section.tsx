import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects'

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Features</div>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
            The operating layer for growth, retention, and broker execution
          </h2>
          <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
            Liquex brings the IB workflow into one platform, from lead intake to deposit monitoring, client servicing, and retention management.
          </p>
        </div>
        <div className="mt-12">
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
    </section>
  )
}
