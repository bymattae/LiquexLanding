'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUp, Bot, CalendarCheck, Eye, Globe, Network, Plus, Sparkles, Target, WavesLadder } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section>
      <div className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div>
            <h2 className="text-foreground max-w-2xl text-balance text-4xl font-semibold">Retention tools built for IBs</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            <Card variant="soft" className="overflow-hidden p-6">
              <Target className="text-primary size-5" />
              <h3 className="text-foreground mt-5 text-lg font-semibold">Client Lifecycle Tracking</h3>
              <p className="text-muted-foreground mt-3 text-balance">Track every trader across your book and instantly see who&apos;s active, churning, or about to leave.</p>

              <MeetingIllustration />
            </Card>

            <Card variant="soft" className="group overflow-hidden px-6 pt-6">
              <CalendarCheck className="text-primary size-5" />
              <h3 className="text-foreground mt-5 text-lg font-semibold">Retention Insights</h3>
              <p className="text-muted-foreground mt-3 text-balance">Identify risk early with real-time signals on inactivity, balance drops, and trading behaviour.</p>

              <CodeReviewIllustration />
            </Card>
            <Card variant="soft" className="group overflow-hidden px-6 pt-6">
              <Bot className="text-primary size-5" />
              <h3 className="text-foreground mt-5 text-lg font-semibold">Retention Assistant</h3>
              <p className="text-muted-foreground mt-3 text-balance">Know exactly who to follow up with, when to act, and how to recover clients before they disappear.</p>

              <div className="mask-b-from-50 -mx-2 -mt-2 px-2 pt-2">
                <AIAssistantIllustration />
              </div>
            </Card>

            <Card variant="soft" className="overflow-hidden p-6">
              <Eye className="text-primary size-5" />
              <h3 className="text-foreground mt-5 text-lg font-semibold">Client Book Visibility</h3>
              <p className="text-muted-foreground mt-3 text-balance">See your entire book in one place, filtered by activity, balance, and lifecycle state.</p>

              <BookOverviewIllustration />
            </Card>

            <Card variant="soft" className="group overflow-hidden px-6 pt-6">
              <Network className="text-primary size-5" />
              <h3 className="text-foreground mt-5 text-lg font-semibold">Partner &amp; IB Tracking</h3>
              <p className="text-muted-foreground mt-3 text-balance">Monitor performance across IBs, sub-IBs, and client flows with full hierarchy visibility.</p>

              <IbTrackingIllustration />
            </Card>
            <Card variant="soft" className="group overflow-hidden px-6 pt-6">
              <WavesLadder className="text-primary size-5" />
              <h3 className="text-foreground mt-5 text-lg font-semibold">Follow-Up Workflows</h3>
              <p className="text-muted-foreground mt-3 text-balance">Prioritise actions, manage client requests, and stay consistent with every follow-up.</p>

              <div className="mask-b-from-50 -mx-2 -mt-2 px-2 pt-2">
                <FollowUpIllustration />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

const MeetingIllustration = () => {
  return (
    <Card aria-hidden className="mt-8 h-[172px] overflow-hidden p-3.5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">Client Activity Review</div>
          <div className="mt-1 text-xs text-muted-foreground">2:30 - 3:45 PM</div>
        </div>
        <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-300">Live</div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-background/60 p-3.5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <div className="mt-1 text-2xl font-semibold">962</div>
            <div className="text-xs text-muted-foreground">clients need attention</div>
          </div>
          <div className="size-14 rounded-full border-[7px] border-emerald-500 border-r-zinc-700 border-b-amber-500 border-l-red-500 bg-transparent" />
        </div>

        <div className="space-y-1.5">
          {[
            ['Active', '151', 'bg-emerald-400'],
            ['Churning', '48', 'bg-amber-400'],
            ['At Risk', '8', 'bg-red-400'],
          ].map(([label, value, color]) => (
            <div key={label} className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${color}`} />
                <span className="text-muted-foreground">{label}</span>
              </div>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

const CodeReviewIllustration = () => {
  return (
    <Card aria-hidden className="mt-8 h-[172px] overflow-hidden p-3.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">Client Risk Alert</div>
          <div className="mt-1 text-xs text-muted-foreground">Activity dropped this week</div>
        </div>
        <div className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-red-300">At risk</div>
      </div>

      <div className="mt-3 rounded-2xl border border-border/60 bg-background/60 p-3.5">
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/60 bg-foreground/[0.03] p-3">
            <div className="text-[11px] text-muted-foreground">Last trade</div>
            <div className="mt-1.5 text-lg font-semibold">2 days ago</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-foreground/[0.03] p-3">
            <div className="text-[11px] text-muted-foreground">Balance change</div>
            <div className="mt-1.5 text-lg font-semibold text-red-300">-18%</div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Activity score</span>
              <span>42 / 100</span>
            </div>
            <div className="h-2 rounded-full bg-foreground/10">
              <div className="h-2 w-[42%] rounded-full bg-red-400" />
            </div>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            Follow up in 24h.
          </div>
        </div>
      </div>
    </Card>
  )
}

const AIAssistantIllustration = () => {
  return (
    <Card aria-hidden className="mt-8 h-[172px] overflow-hidden p-3.5 transition-transform duration-200 group-hover:translate-y-0">
      <div className="w-fit">
        <Sparkles className="size-3.5 fill-purple-300 stroke-purple-300" />
        <p className="mt-2 text-sm">Who should I follow up with today?</p>
      </div>
      <div className="bg-foreground/5 mt-3 space-y-2 rounded-2xl p-3">
        <div className="text-muted-foreground text-sm">Ask Retention Assistant</div>

        <div className="rounded-xl border border-border/60 bg-background/70 px-3 py-2.5 text-xs text-foreground">
          Prioritise Talal Khalid and Yasir Deen.
        </div>

        <div className="rounded-xl border border-border/50 bg-background/70 px-3 py-2 text-xs text-muted-foreground">
          3 churning clients
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
              <Plus />
            </Button>
            <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
              <Globe />
            </Button>
          </div>

          <Button size="icon" className="size-7 rounded-2xl bg-black">
            <ArrowUp strokeWidth={3} />
          </Button>
        </div>
      </div>
    </Card>
  )
}

const BookOverviewIllustration = () => {
  return (
    <Card aria-hidden className="mt-8 h-[172px] overflow-hidden p-3.5">
      <div className="mb-1 text-sm font-semibold">Book Overview</div>
      <div className="mt-1 text-xs text-muted-foreground">Active · At Risk · Dormant</div>

      <div className="mt-3 rounded-2xl border border-border/60 bg-background/60 p-3.5">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            ['Active', '151', 'text-emerald-300'],
            ['At Risk', '8', 'text-red-300'],
            ['Dormant', '17', 'text-zinc-300'],
          ].map(([label, value, color]) => (
            <div key={label} className="rounded-xl border border-border/60 bg-foreground/[0.03] p-3 text-center">
              <div className="text-[11px] text-muted-foreground">{label}</div>
              <div className={`mt-2 text-lg font-semibold ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {[
            ['Total Balance', '$258,553'],
            ['Attention', '962'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-border/50 pb-2 text-xs last:border-b-0 last:pb-0">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

const IbTrackingIllustration = () => {
  return (
    <Card aria-hidden className="mt-8 h-[172px] overflow-hidden p-3.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">IB Performance Update</div>
          <div className="mt-1 text-xs text-muted-foreground">Hierarchy visibility</div>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">Healthy</div>
      </div>

      <div className="mt-3 rounded-2xl border border-border/60 bg-background/60 p-3.5">
        <div className="space-y-2">
          {[
            ['Finluence', '+12%', '258 clients'],
            ['Sub-IB A', '+8%', '84 clients'],
          ].map(([name, delta, clients]) => (
            <div key={name} className="flex items-center justify-between rounded-xl border border-border/50 bg-foreground/[0.03] px-3 py-3">
              <div>
                <div className="text-sm font-medium">{name}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{clients}</div>
              </div>
              <span className={delta.startsWith('-') ? 'text-sm font-semibold text-red-300' : 'text-sm font-semibold text-emerald-300'}>{delta}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

const FollowUpIllustration = () => {
  return (
    <Card aria-hidden className="mt-8 h-[172px] overflow-hidden p-3.5 transition-transform duration-200 group-hover:translate-y-0">
      <div className="w-fit">
        <Sparkles className="size-3.5 fill-purple-300 stroke-purple-300" />
        <p className="mt-2 text-sm">Pending Follow-Ups</p>
      </div>
      <div className="bg-foreground/5 mt-3 space-y-2 rounded-2xl p-3">
        <div className="text-muted-foreground text-sm">12 clients need attention</div>

        <div className="space-y-2">
          {[
            ['Talal Khalid', 'At Risk', '24h'],
            ['Yasir Deen', 'Dormant', 'Today'],
          ].map(([name, state, eta]) => (
            <div key={name} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-xl border border-border/50 bg-background/70 px-3 py-2 text-xs">
              <span className="text-foreground">{name}</span>
              <span className="rounded-full border px-2 py-1 text-[10px] text-muted-foreground">{state}</span>
              <span className="text-muted-foreground">{eta}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
