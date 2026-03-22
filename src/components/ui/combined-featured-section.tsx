import { Activity, ArrowRight, GalleryVerticalEnd, MapPin, type LucideIcon } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Message = { title: string; time: string; content: string; color: string }
type MiniCard = { icon: LucideIcon; title: string; subtitle: string; description: string }
type ChartDatum = { label: string; primary: number; secondary: number }

type CombinedFeaturedSectionProps = {
  eyebrow: string
  heading: string
  subheading: string
  mapLabel: string
  mapTitle: string
  mapAccent: string
  mapBadge: string
  studyLabel: string
  studyTitle: string
  studyAccent: string
  messages: Message[]
  chartLabel: string
  chartTitle: string
  chartAccent: string
  chartData: ChartDatum[]
  cards: [MiniCard, MiniCard]
}

const map = new DottedMap({ height: 55, grid: 'diagonal' })
const points = map.getPoints()

export default function CombinedFeaturedSection({
  eyebrow,
  heading,
  subheading,
  mapLabel,
  mapTitle,
  mapAccent,
  mapBadge,
  studyLabel,
  studyTitle,
  studyAccent,
  messages,
  chartLabel,
  chartTitle,
  chartAccent,
  chartData,
  cards,
}: CombinedFeaturedSectionProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
            {eyebrow}
          </div>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">{heading}</h2>
          <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2">
          <div className="relative overflow-hidden border border-white/8 bg-white/[0.02] p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="size-4" />
              {mapLabel}
            </div>
            <h3 className="text-xl font-normal text-white">
              {mapTitle} <span className="text-zinc-500">{mapAccent}</span>
            </h3>
            <div className="relative mt-6">
              <div className="absolute left-1/2 top-10 z-10 -translate-x-1/2 rounded-md bg-white px-3 py-1 text-xs font-medium text-black shadow">
                {mapBadge}
              </div>
              <svg viewBox="0 0 120 60" className="h-auto w-full text-primary/45">
                {points.map((point, i) => (
                  <circle key={i} cx={point.x} cy={point.y} r={0.15} fill="currentColor" />
                ))}
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 border border-white/8 bg-card p-6">
            <div>
              <span className="flex items-center gap-2 text-sm text-zinc-500">
                <GalleryVerticalEnd className="size-4" /> {studyLabel}
              </span>
              <h3 className="mt-3 text-xl font-normal text-white">
                {studyTitle} <span className="text-zinc-500">{studyAccent}</span>
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[280px] w-full max-w-sm overflow-hidden bg-white p-2 font-sans dark:bg-gray-900">
                <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
                <div className="relative z-0 space-y-2">
                  {messages.map((msg, i) => (
                    <div
                      key={`${msg.title}-${i}`}
                      className="animate-scaleUp flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 opacity-0 transition duration-300 ease-in-out dark:border-gray-700"
                      style={{ animationDelay: `${i * 220}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className={cn('h-8 w-8 min-w-[2rem] rounded-lg bg-gradient-to-br', msg.color)} />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-white">
                          {msg.title}
                          <span className="text-xs text-gray-500 before:mr-1 before:content-['•']">{msg.time}</span>
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-600 dark:text-gray-300">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 border border-white/8 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
              <Activity className="size-4" />
              {chartLabel}
            </div>
            <h3 className="text-xl font-normal text-white">
              {chartTitle} <span className="text-zinc-500">{chartAccent}</span>
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fillPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f4d15b" stopOpacity={0.45} />
                      <stop offset="60%" stopColor="#f4d15b" stopOpacity={0.04} />
                    </linearGradient>
                    <linearGradient id="fillSecondary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ecdc4" stopOpacity={0.3} />
                      <stop offset="60%" stopColor="#4ecdc4" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <XAxis hide dataKey="label" />
                  <YAxis hide />
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      background: '#121214',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      color: '#fff',
                    }}
                  />
                  <Area type="monotone" dataKey="secondary" stroke="#4ecdc4" fill="url(#fillSecondary)" strokeWidth={2} />
                  <Area type="monotone" dataKey="primary" stroke="#f4d15b" fill="url(#fillPrimary)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 bg-card">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="relative flex min-h-[240px] flex-col gap-3 border border-white/8 bg-background p-4 transition">
                  <div>
                    <span className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
                      <Icon className="size-4" />
                      {card.title}
                    </span>
                    <h3 className="text-lg font-normal text-white">
                      {card.subtitle} <span className="text-zinc-500">{card.description}</span>
                    </h3>
                  </div>
                  <Card className="absolute bottom-0 right-0 h-20 w-24 overflow-hidden rounded-tl-xl rounded-br-none rounded-bl-none rounded-tr-none border-8 border-b-0 border-r-0 border-white/10 bg-white/[0.03] sm:h-28 sm:w-32 md:h-32 md:w-40" />
                  <div className="absolute bottom-2 right-2 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-background p-3 transition hover:-rotate-45">
                    <ArrowRight className="size-4 text-primary" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
