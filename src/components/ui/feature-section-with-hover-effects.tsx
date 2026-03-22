import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from '@tabler/icons-react'

import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Lead capture',
    description: 'Turn inbound traffic into pipeline fast.',
    icon: <IconTerminal2 />,
  },
  {
    title: 'Simple ops',
    description: 'Run daily ops without tool sprawl.',
    icon: <IconEaseInOut />,
  },
  {
    title: 'Funding visibility',
    description: 'Track deposits and momentum live.',
    icon: <IconCurrencyDollar />,
  },
  {
    title: 'Live dashboards',
    description: 'See the book across clients and teams.',
    icon: <IconCloud />,
  },
  {
    title: 'Multi-tenant ready',
    description: 'Run broker and partner layers together.',
    icon: <IconRouteAltLeft />,
  },
  {
    title: 'Support workflow',
    description: 'Keep requests and follow-up in one place.',
    icon: <IconHelp />,
  },
  {
    title: 'Retention signals',
    description: 'Catch churn risk early with clear signals.',
    icon: <IconAdjustmentsBolt />,
  },
  {
    title: 'AI assistance',
    description: 'Move faster with AI actions and summaries.',
    icon: <IconHeart />,
  },
]

export function FeaturesSectionWithHoverEffects() {
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 border-y border-white/8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex min-h-[240px] flex-col py-10 lg:border-r lg:border-white/8',
        (index === 0 || index === 4) && 'lg:border-l lg:border-white/8',
        index < 4 && 'lg:border-b lg:border-white/8',
        index < 6 && 'md:border-b md:border-white/8',
      )}
    >
      {index < 4 ? (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-white/[0.04] to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      ) : (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      <div className="relative z-10 mb-5 px-8 text-zinc-500">
        <div className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]">
          {icon}
        </div>
      </div>
      <div className="relative z-10 mb-3 px-8 text-lg font-semibold">
        <div className="absolute inset-y-0 left-8 h-6 w-1 rounded-br-full rounded-tr-full bg-white/15 transition-all duration-200 origin-center group-hover/feature:h-8 group-hover/feature:bg-white" />
        <span className="inline-block translate-x-4 text-white transition duration-200 group-hover/feature:translate-x-6">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-[23ch] px-8 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  )
}
