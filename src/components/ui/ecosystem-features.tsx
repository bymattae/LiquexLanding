import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'

export function Features() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl space-y-10 px-6 md:space-y-12">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="max-w-2xl text-[1.75rem] font-semibold leading-tight lg:text-[2.1rem]">The Liquex system brings your client book into one place</h2>
          <p className="max-w-sm sm:ml-auto">Manage your IB network with workflows built for retention, giving you full visibility, faster follow-ups, and complete control over your client book.</p>
        </div>
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-6 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Real-Time</h3>
            </div>
            <p className="text-muted-foreground text-sm">See client activity, balances, and risk instantly across your entire book.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">Full Visibility</h3>
            </div>
            <p className="text-muted-foreground text-sm">Track every trader, IB, and sub-IB in one structured view.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4" />
              <h3 className="text-sm font-medium">Security</h3>
            </div>
            <p className="text-muted-foreground text-sm">Built on reliable infrastructure with accurate, consistent data.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <h3 className="text-sm font-medium">Retention-Led</h3>
            </div>
            <p className="text-muted-foreground text-sm">Turn client data into actions that keep traders active and engaged.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
