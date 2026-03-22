import { Bell, Bot, CheckCircle2, Globe, Inbox, Megaphone, Search, Sparkles, Tags, Target, UserCog } from 'lucide-react'

import CombinedFeaturedSection from '@/components/ui/combined-featured-section'
import { Button } from '@/components/ui/button'

const commonChart = [
  { label: 'May', primary: 56, secondary: 180 },
  { label: 'Jun', primary: 92, secondary: 240 },
  { label: 'Jul', primary: 128, secondary: 220 },
  { label: 'Aug', primary: 190, secondary: 340 },
  { label: 'Sep', primary: 232, secondary: 280 },
  { label: 'Oct', primary: 320, secondary: 420 },
]

export function ProblemSection() {
  return (
    <CombinedFeaturedSection
      eyebrow="The reality"
      heading="Traffic isn't the problem. Everything after it is."
      subheading="Most IBs lose revenue not from lack of leads, but from lack of systems."
      mapLabel="Operational blind spots"
      mapTitle="Leads, deposits, and follow-up scatter fast."
      mapAccent="Without one system, visibility disappears."
      mapBadge="Most leaks happen after the click"
      studyLabel="Friction points"
      studyTitle="The book slips because the workflow breaks."
      studyAccent="Not because the demand isn't there."
      messages={[
        { title: 'Telegram Lead', time: 'Now', content: 'Lead replied but never got assigned.', color: 'from-red-400 to-orange-500' },
        { title: 'Sheet Update', time: '3m', content: 'Pipeline row changed with no owner.', color: 'from-amber-400 to-red-400' },
        { title: 'Deposit Check', time: '8m', content: 'No clear source for latest funding.', color: 'from-orange-400 to-pink-500' },
        { title: 'Retention Alert', time: '14m', content: 'High-value client has gone quiet.', color: 'from-sky-400 to-indigo-500' },
      ]}
      chartLabel="Revenue leakage"
      chartTitle="The cost shows up in missed follow-up."
      chartAccent="Then in missed deposits and churn."
      chartData={commonChart}
      cards={[
        { icon: Inbox, title: 'Lead chaos', subtitle: 'Telegram first.', description: 'But no proper system after that.' },
        { icon: Target, title: 'No source clarity', subtitle: 'Deposits land.', description: 'But attribution stays blurry.' },
      ]}
    />
  )
}

export function FlowSections() {
  return (
    <>
      <CombinedFeaturedSection
        eyebrow="Attract"
        heading="Every lead, every conversation. Automatically captured."
        subheading="Leads flow in automatically. Channels stay active. Nothing falls through."
        mapLabel="Lead intake"
        mapTitle="Capture Telegram demand as it happens."
        mapAccent="No manual copying. No missed entries."
        mapBadge="New lead synced into Liquex"
        studyLabel="Unified inbox"
        studyTitle="Keep every conversation in one operating view."
        studyAccent="No more channel-by-channel chaos."
        messages={[
          { title: 'Channel Capture', time: '1m', content: 'New Telegram lead pushed into Liquex.', color: 'from-sky-400 to-blue-600' },
          { title: 'Inbox Sync', time: '3m', content: 'Conversation added to unified inbox.', color: 'from-cyan-400 to-sky-500' },
          { title: 'Broadcast Sent', time: '6m', content: 'Channel post scheduled automatically.', color: 'from-emerald-400 to-cyan-500' },
          { title: 'Lead Assigned', time: '10m', content: 'Owner assigned with full source context.', color: 'from-blue-500 to-indigo-600' },
        ]}
        chartLabel="Top-of-funnel flow"
        chartTitle="Measure incoming lead momentum in real time."
        chartAccent="Act before the attention cools."
        chartData={commonChart}
        cards={[
          { icon: Inbox, title: 'Auto capture', subtitle: 'Telegram leads.', description: 'Pushed straight into your flow.' },
          { icon: Megaphone, title: 'Channel posting', subtitle: 'Broadcast at scale.', description: 'Without leaving the platform.' },
        ]}
      />
      <CombinedFeaturedSection
        eyebrow="Convert"
        heading="From first message. To first deposit."
        subheading="See exactly where every lead sits. AI handles the follow-ups."
        mapLabel="Pipeline coverage"
        mapTitle="Visualize movement from signup to funded."
        mapAccent="Make decisions from actual conversion flow."
        mapBadge="Deposit linked to original source"
        studyLabel="Conversion engine"
        studyTitle="Follow-up, ownership, and source visibility in one place."
        studyAccent="Built for faster funding outcomes."
        messages={[
          { title: 'Lead Stage', time: 'Now', content: 'Prospect moved from signup to funded.', color: 'from-amber-400 to-yellow-500' },
          { title: 'Follow-up AI', time: '4m', content: 'Suggested next action generated instantly.', color: 'from-fuchsia-400 to-pink-500' },
          { title: 'Deposit Matched', time: '7m', content: 'Funding linked to original source cleanly.', color: 'from-green-400 to-emerald-500' },
          { title: 'Pipeline View', time: '12m', content: 'Full conversion path visible by owner.', color: 'from-lime-400 to-green-500' },
        ]}
        chartLabel="Conversion analytics"
        chartTitle="Track stage movement and funding momentum."
        chartAccent="Know what is converting now."
        chartData={commonChart}
        cards={[
          { icon: CheckCircle2, title: 'Stage tracking', subtitle: 'Know the next step.', description: 'For every live opportunity.' },
          { icon: Bot, title: 'AI follow-up', subtitle: 'Keep momentum high.', description: 'Without extra manual effort.' },
        ]}
      />
      <CombinedFeaturedSection
        eyebrow="Retain"
        heading="Know your book. Before they leave."
        subheading="Surface at-risk clients before they churn. Retention on autopilot."
        mapLabel="Retention visibility"
        mapTitle="Spot account behaviour shifts before revenue drops."
        mapAccent="Act on signal, not guesswork."
        mapBadge="Risk pattern detected"
        studyLabel="Retention queue"
        studyTitle="Find the funded clients that need attention first."
        studyAccent="Then move with context."
        messages={[
          { title: 'Balance Drift', time: '2m', content: 'Client balance trend has slowed sharply.', color: 'from-orange-400 to-red-500' },
          { title: 'Silent Client', time: '5m', content: 'No recent activity from funded account.', color: 'from-amber-400 to-orange-500' },
          { title: 'At-Risk Book', time: '9m', content: 'Retention queue updated with priority accounts.', color: 'from-red-400 to-pink-500' },
          { title: 'Action Ready', time: '13m', content: 'Next-best follow-up prepared for your team.', color: 'from-yellow-400 to-orange-400' },
        ]}
        chartLabel="Book monitoring"
        chartTitle="Track funded client health over time."
        chartAccent="Keep retention focused on what matters."
        chartData={commonChart}
        cards={[
          { icon: Search, title: 'Quiet accounts', subtitle: 'See the drift.', description: 'Before clients disappear fully.' },
          { icon: Bell, title: 'Risk alerts', subtitle: 'Prioritize fast.', description: 'Around balances and behaviour.' },
        ]}
      />
    </>
  )
}

export function ScaleSection() {
  return (
    <CombinedFeaturedSection
      eyebrow="Scale"
      heading="Run operations. Like infrastructure."
      subheading="Scale without complexity. Grow without losing control."
      mapLabel="Operating model"
      mapTitle="Run broker, network, and partner layers together."
      mapAccent="Without sacrificing control or structure."
      mapBadge="Multi-tenant ready"
      studyLabel="Platform control"
      studyTitle="Expand the operation while keeping the workflow clean."
      studyAccent="One system. Multiple layers."
      messages={[
        { title: 'Partner Layer', time: '1m', content: 'Separate access live for broker and IB admins.', color: 'from-sky-400 to-cyan-500' },
        { title: 'Analytics View', time: '4m', content: 'Performance compared across multiple books.', color: 'from-indigo-400 to-sky-500' },
        { title: 'Brand Control', time: '8m', content: 'White-label settings updated by workspace.', color: 'from-violet-400 to-indigo-500' },
        { title: 'Tenant Isolation', time: '11m', content: 'Operational data remains fully separated.', color: 'from-cyan-400 to-blue-600' },
      ]}
      chartLabel="Growth view"
      chartTitle="Compare performance across books and operators."
      chartAccent="See what scales and what stalls."
      chartData={commonChart}
      cards={[
        { icon: UserCog, title: 'Multi-IB management', subtitle: 'One command layer.', description: 'Across teams and books.' },
        { icon: Globe, title: 'White-label ready', subtitle: 'Brand it your way.', description: 'Without reworking the product.' },
      ]}
    />
  )
}

export function WhyLiquexSection() {
  return (
    <section id="about" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-none border border-white/8 bg-card px-8 py-14 text-center md:px-14">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
            Why Liquex
          </div>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">
            Traditional CRMs weren&apos;t built for this.
          </h2>
          <p className="mt-4 text-lg text-zinc-500">Broker portals don&apos;t give the full picture.</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Liquex connects AI, Telegram, CRM, and broker data into one OS built for IBs.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-none bg-white px-6 text-base font-semibold text-black hover:bg-white/90">
              <a href="#notify">Get notified</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ToolsSection() {
  return (
    <CombinedFeaturedSection
      eyebrow="Built-in tools"
      heading="Small details. Big impact."
      subheading="Every feature designed for how IBs actually work. No bloat. No guesswork."
      mapLabel="Operator toolkit"
      mapTitle="Stack the tools you actually need into one workspace."
      mapAccent="Then move faster across every workflow."
      mapBadge="Built for real ops"
      studyLabel="Everyday execution"
      studyTitle="Segment, message, analyze, and action from one system."
      studyAccent="Without bouncing between tools."
      messages={[
        { title: 'Client Tags', time: 'Now', content: 'VIP and at-risk segments updated instantly.', color: 'from-amber-400 to-yellow-500' },
        { title: 'AI Tone', time: '3m', content: 'Assistant tone switched to broker-ready voice.', color: 'from-fuchsia-400 to-violet-500' },
        { title: 'Broadcast Queue', time: '6m', content: 'Multi-channel send prepared for release.', color: 'from-sky-400 to-cyan-500' },
        { title: 'Structured View', time: '9m', content: 'Client notes and data synced into one record.', color: 'from-emerald-400 to-cyan-500' },
      ]}
      chartLabel="Usage patterns"
      chartTitle="See which workflows drive the strongest outcomes."
      chartAccent="Then double down where it matters."
      chartData={commonChart}
      cards={[
        { icon: Tags, title: 'Client tags', subtitle: 'Filter instantly.', description: 'Then target the right segment.' },
        { icon: Sparkles, title: 'AI tone', subtitle: 'Sound like you.', description: 'Across follow-up and support.' },
      ]}
    />
  )
}

export function FinalCtaSection() {
  return (
    <section id="notify" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-none border border-white/8 bg-card px-8 py-14 text-center md:px-14">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
            Join
          </div>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-white md:text-5xl">Ready to run your IB like a machine?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Capture leads, manage pipeline, monitor deposits, and retain clients from one operating system.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-none bg-white px-6 text-base font-semibold text-black hover:bg-white/90">
              <a href="#top">Get notified</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
