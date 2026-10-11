import { MessageCircle, UserPlus, TrendingUp, ShieldCheck, Search, Filter, Copy, MoreHorizontal, Plus, Layers, LogIn, ArrowRightLeft, Zap } from 'lucide-react'
import { ReelThumb } from '@/components/affiliate/animated'
import { InstagramMark, TikTokMark, YouTubeMark, TelegramMark } from '@/components/affiliate/premium'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { AppWindow, Badge, BarsWithLine, BookGauge, Card, CardHead, Chip, DeltaPill, DotMatrix, Ghost, Initials, Kpi, Line, Live, MiniBars, NetBars, Num, PillTabs, SegMeter, Split, T, TimeChip, Toast, Toasts, lift, useClock, useGo, useTick } from './kit'

/**
 * The Liquex screens, rebuilt from the real app with example data
 * (no real IBs, clients or balances).
 */

const DAYS = ['14 Sep', '17 Sep', '20 Sep', '23 Sep', '26 Sep', '29 Sep', '2 Oct', '5 Oct', '8 Oct', '11 Oct']
const BARS = [4, 18, 62, 88, 58, 14, 6, 92, 3, 12, 98, 18, 38, 54, 12, 20, 2, 8, 30, 22, 38, 20, 14, 2, 6, 20, 24, 2, 12, 14]
const LINE = [10, 4, 48, 12, 80, 26, 4, 30, 6, 52, 18, 50, 8, 22, 4, 3, 10, 20, 46, 14, 30, 22, 6, 4, 12, 36, 8, 6, 4, 2]

/* ── Home ──────────────────────────────────────────────────────────────── */

export function HomeScreen() {
  return (
    <AppWindow active="home" title="Home">
      <div className="flex items-end justify-between pt-2">
        <div><div className="text-[22px] font-medium tracking-tight">Good afternoon</div><div className="mt-1 text-[14px] text-[#8f8f8f]">Here’s how your book has done over the last 30 days.</div></div>
        <PillTabs items={['7D', '30D', '90D', 'Custom']} active="30D" />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Kpi title="Your balance" value="$184,920" delta={<DeltaPill v="12.4%" note="vs prev 30D" />} viz={<Line values={[60, 58, 62, 61, 66, 70, 68, 74, 78, 82]} />} />
        <Kpi title="Trading volume" value="1,240" unit="lots" delta={<DeltaPill v="8.1%" note="vs prev 30D" />} viz={<DotMatrix values={[2, 3, 1, 4, 2, 5, 3, 2, 4, 1, 3, 5, 2, 3, 4, 2, 5, 3, 1, 4, 2, 3, 5, 4, 2, 3, 1, 4, 3, 5]} />} />
        <Kpi title="Active clients" value="312" delta={<DeltaPill v="6.0%" note="vs prev 30D" />} viz={<SegMeter share={0.3} />} />
        <Kpi title="Net funding" value="+$62,410" delta={<DeltaPill v="4.6%" note="vs prev 30D" />} viz={<NetBars values={[8, -2, 6, 3, -1, 2, 1, -1, 2, 1, 0, 1, 2, -1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 3]} />} />
      </div>
      <div className="mt-4 grid grid-cols-[1.75fr_1fr] gap-4">
        <Card className="p-6">
          <CardHead title="Money in vs out" right={<span className="flex items-center gap-4 text-[12px] text-[#8f8f8f]"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#555]" />Deposits</span><span className="flex items-center gap-1.5"><span className="h-px w-3 bg-[hsl(0_80%_66%)]" />Withdrawals</span></span>} />
          <div className="mt-2 flex items-center gap-3"><span className="text-[30px] font-medium tracking-tight">+$62,410</span><DeltaPill v="4.6%" /><span className="text-[12.5px] text-[#8f8f8f]">Deposits: $148,200 &nbsp; Withdrawals: $85,790</span></div>
          <div className="mt-4"><BarsWithLine bars={BARS} line={LINE} labels={DAYS} yTicks={['$0', '$10k', '$20k', '$30k']} topLabel="$28k" h={250} /></div>
        </Card>
        <Card className="p-6">
          <CardHead title="Your book" />
          <div className="mx-auto mt-2 max-w-[290px]"><BookGauge total="$185k" sub="in your book today" /></div>
          <div className="mt-2 space-y-2.5 text-[14px]">
            {[['#22c55e', 'Active', '$134k', '72%'], ['#f59e0b', 'Churning', '$4k', '2%'], ['#f97316', 'At risk', '$3k', '2%'], ['#94a3b8', 'Dormant', '$11k', '6%'], ['#f43f5e', 'Wrong account', '$33k', '18%']].map(([c, k, v, p]) => (
              <div key={k} className="grid grid-cols-[auto_1fr_auto_2.5rem] items-center gap-3"><span className="size-2 rounded-full" style={{ background: c }} /><span className="text-[#b3b3b3]">{k}</span><span className="tabular-nums">{v}</span><span className="text-right text-[12px] tabular-nums text-[#8f8f8f]">{p}</span></div>
            ))}
          </div>
        </Card>
      </div>
    </AppWindow>
  )
}

/* ── Growth · Content ──────────────────────────────────────────────────── */

const Acct = ({ m, h, n }: { m: React.ReactNode; h: string; n: string }) => <span className="flex items-center gap-1.5 rounded-full bg-[#0d0d0d] px-3 py-1.5 text-[12.5px] [&_svg]:size-3.5">{m}{h}<span className="text-[#8f8f8f]">{n}</span></span>

export function ContentScreen() {
  return (
    <AppWindow active="growth" title="Growth">
      <PillTabs items={['Content', 'Links', 'CTAs']} active="Content" />
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2"><Acct m={<TikTokMark />} h="@yourbrand" n="48K" /><Acct m={<InstagramMark />} h="@yourbrand" n="120K" /><span className="text-[12.5px] text-[#8f8f8f]">Last posted 3 hours ago</span></div>
        <div className="flex items-center gap-2"><PillTabs items={['Overview', 'Playbook', 'Posts']} active="Overview" /><PillTabs items={['7D', '30D', '90D', '1Y']} active="30D" /></div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-4">
        <Kpi title="Views" value="1.8M" delta={<DeltaPill v="18.0%" note="vs prev 30D" />} viz={<MiniBars values={[1, 2, 1, 1, 2, 1, 3, 2, 1, 0, 1, 9, 1, 2, 3, 1, 0, 6, 2, 1, 7, 1, 2, 1, 1, 0, 1, 2, 1, 1]} />} />
        <Kpi title="Joins" value="2,140" delta={<DeltaPill v="24.0%" note="vs prev 30D" />} viz={<DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 3]} />} />
        <Kpi title="Followers" value="168K" delta={<DeltaPill v="3.2%" note="vs prev 30D" />} viz={<Line values={[150, 152, 155, 157, 160, 162, 164, 165, 167, 168]} />} />
        <Kpi title="Posts" value="48" delta={<DeltaPill v="9.1%" note="vs prev 30D" />} viz={<DotMatrix values={[1, 2, 1, 1, 2, 1, 3, 2, 1, 2, 1, 2, 3, 1, 2, 1, 2, 2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 2]} lit={T.muted} />} />
      </div>
      <div className="mt-4 grid grid-cols-[1.75fr_1fr] gap-4">
        <Card className="p-6">
          <CardHead title="Views and joins" right={<span className="flex items-center gap-4 text-[12px] text-[#8f8f8f]"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#555]" />Views</span><span className="flex items-center gap-1.5"><span className="h-px w-3 bg-[hsl(248_85%_74%)]" />Joins</span></span>} />
          <div className="mt-2 flex items-center gap-3"><span className="text-[30px] font-medium tracking-tight">1.8M</span><DeltaPill v="18.0%" /><span className="text-[12.5px] text-[#8f8f8f]">Joins: 2,140 · 1 in 840 viewers joined</span></div>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(248_85%_74%/0.12)] px-2.5 py-1 text-[12px] text-[hsl(248_85%_80%)]"><Zap className="size-3" />Big view days bring 2.1× the joins</span>
          <div className="mt-2"><BarsWithLine bars={BARS} line={LINE.map(v => v * 1.6)} lineColor={T.accent} dashed={false} labels={DAYS} yTicks={['0', '150K', '300K', '450K']} topLabel="412K" h={214} /></div>
        </Card>
        <Card className="p-6">
          <CardHead title="When to post" />
          <div className="mt-2 text-[20px] font-medium tracking-tight">Best on Thursday around 19:00</div>
          <div className="mt-1 text-[12.5px] text-[#8f8f8f]">Typical views per post, by the day it went out</div>
          <div className="mt-5 flex h-[190px] items-end gap-2">
            {[['Mon', 58], ['Tue', 52], ['Wed', 61], ['Thu', 100], ['Fri', 66], ['Sat', 48], ['Sun', 50]].map(([d, v]) => (
              <div key={d} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-[11px] text-[#8f8f8f]">{Math.round((v as number) * 0.11)}K</span>
                <span className={cn('w-full rounded-lg', d === 'Thu' ? 'bg-[hsl(248_85%_74%)]' : 'bg-[#222222]')} style={{ height: `${v}%` }} />
                <span className="text-[11.5px] text-[#b3b3b3]">{d}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppWindow>
  )
}

/* ── Growth · Links ────────────────────────────────────────────────────── */

const SearchBox = ({ text = 'Search' }: { text?: string }) => <span className="flex w-[280px] items-center gap-2 rounded-lg bg-[#0d0d0d] px-3 py-2 text-[13px] text-[#8f8f8f]"><Search className="size-3.5" />{text}<span className="ml-auto rounded border border-[#222222] px-1.5 text-[11px]">/</span></span>
const th = 'text-[12px] font-medium text-[#b3b3b3]'

export function LinksScreen() {
  const rows = [['instagram-dm', 'Instagram DM', 'Instagram · DM', 642, 198, '31%', 41, 38], ['instagram-bio', 'Instagram Bio', 'Instagram · Bio', 518, 162, '31%', 33, 30], ['tiktok-bio', 'TikTok Bio', 'TikTok · Bio', 74, 21, '28%', 6, 5], ['youtube-description', 'YouTube Description', 'YouTube · Description', 22, 8, '36%', 2, 2], ['instagram-story', 'Instagram Story', 'Instagram · Story', 14, 3, '21%', 1, 1], ['telegram-pinned', 'Telegram Pinned', 'Telegram · Pinned', 9, 2, '22%', 0, 0], ['instagram-manychat', 'Instagram ManyChat', 'Instagram · ManyChat', 0, 0, '—', 0, 0]] as const
  return (
    <AppWindow active="growth" title="Growth" right={<><span className="flex items-center gap-1.5 rounded-lg bg-[#0d0d0d] px-3 py-1.5 text-[#ededed]"><Layers className="size-3.5" />Standard links</span><span className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 font-medium text-black"><Plus className="size-3.5" />New link</span></>}>
      <PillTabs items={['Content', 'Links', 'CTAs']} active="Links" />
      <div className="mt-5 flex items-center justify-between"><SearchBox /><span className="flex items-center gap-3 text-[13px]"><span className="flex items-center gap-1.5 rounded-lg bg-[#0d0d0d] px-3 py-1.5"><Filter className="size-3.5" />Platform</span><span><span className="text-[#ededed]">24</span> <span className="text-[#8f8f8f]">sources</span></span></span></div>
      <Card className="mt-4 overflow-hidden">
        <div className="grid grid-cols-[1.6fr_1.3fr_.7fr_.7fr_.8fr_.7fr_.7fr_40px_40px] border-b border-[#1c1c1c] px-4 py-3"><span className={th}>Source</span><span className={th}>Placement</span><span className={th}>Joined</span><span className={th}>Leads</span><span className={th}>Join → Lead</span><span className={th}>Verified</span><span className={th}>Funded</span><span /><span /></div>
        {rows.map(([s, sub, p, j, l, r, v, f]) => (
          <div key={s} className="grid grid-cols-[1.6fr_1.3fr_.7fr_.7fr_.8fr_.7fr_.7fr_40px_40px] items-center border-b border-[#1c1c1c] px-4 py-2.5 text-[13px] last:border-0">
            <span><span className="block">{s}</span><span className="text-[12px] text-[#8f8f8f]">{sub}</span></span><span className="text-[#b3b3b3]">{p}</span><span className="tabular-nums">{j}</span><span className="tabular-nums">{l}</span><span className="tabular-nums text-[#8f8f8f]">{r}</span><span className="tabular-nums">{v}</span><span className="tabular-nums">{f}</span><Copy className="size-3.5 text-[#8f8f8f]" /><MoreHorizontal className="size-3.5 text-[#8f8f8f]" />
          </div>
        ))}
      </Card>
    </AppWindow>
  )
}

/* ── CRM ───────────────────────────────────────────────────────────────── */

const CRM = [['Ava Morgan', 'No username', 'Joined', 'Bio', '8m ago', '', ''], ['Leo Turner', '@leoturner', 'Lead', 'Bio', '12m ago', '11m ago', ''], ['Chloe Martin', '@chloe_m', 'Submitted', 'DM', '22m ago', '20m ago', ''], ['Noah Price', '@noahp', 'Verified', 'DM', '1h ago', '58m ago', '41m ago'], ['Maya Ross', 'No username', 'Joined', 'DM', '1h ago', '', ''], ['Omar Haddad', '@omarh', 'Lead', 'Bio', '2h ago', '2h ago', ''], ['Isla Grant', '@isla.g', 'Verified', 'DM', '3h ago', '3h ago', '2h ago'], ['Ethan Cole', 'No username', 'Joined', 'Bio', '4h ago', '', '']] as const

export function CrmScreen({ tab = 'All' }: { tab?: string }) {
  return (
    <AppWindow active="crm" title="CRM">
      <PillTabs items={['All', 'Joined', 'Leads', 'Submitted', 'Verified', 'Left']} active={tab} />
      <div className="mt-5 flex items-center justify-between"><SearchBox /><span className="text-[13px]"><span>1,486</span> <span className="text-[#8f8f8f]">people</span></span></div>
      <Card className="mt-4 overflow-hidden">
        <div className="grid grid-cols-[1.7fr_.8fr_.8fr_.8fr_.8fr_.8fr] border-b border-[#1c1c1c] px-4 py-3"><span className={th}>Person</span><span className={th}>Stage</span><span className={th}>Source</span><span className={th}>Joined</span><span className={th}>Lead</span><span className={th}>Verified</span></div>
        {CRM.map(([n, u, s, src, j, l, v], i) => (
          <div key={n} className="grid grid-cols-[1.7fr_.8fr_.8fr_.8fr_.8fr_.8fr] items-center border-b border-[#1c1c1c] px-4 py-2.5 text-[13px] last:border-0">
            <span className="flex items-center gap-2.5"><Initials n={n} i={i} /><span><span className="block">{n}</span><span className={cn('flex items-center gap-1 text-[12px]', u.startsWith('@') ? 'text-[hsl(199_85%_65%)]' : 'text-[#8f8f8f]')}>{u.startsWith('@') && <TelegramMark className="size-3" />}{u}</span></span></span>
            <span><Badge s={s} /></span><span><Chip><InstagramMark />{src}</Chip></span><span>{j ? <TimeChip>{j}</TimeChip> : '—'}</span><span>{l ? <TimeChip>{l}</TimeChip> : <span className="text-[#555]">—</span>}</span><span>{v ? <TimeChip>{v}</TimeChip> : <span className="text-[#555]">—</span>}</span>
          </div>
        ))}
      </Card>
    </AppWindow>
  )
}

/* ── Clients ───────────────────────────────────────────────────────────── */

const CLIENTS = [['Daniel Reyes', '8347195', 'Active', '$24,820.40', '$4,200.00', 'Standard STP', '1d', true], ['Ryan Porter', '2666148', 'Moved', '$18,410.15', '—', 'Raw ECN', '5mo', false], ['Leo Turner', '1062637', 'Active', '$15,930.22', '$9,100.00', 'Standard STP', '1d', true], ['Maya Ross', '2518299', 'Active', '$14,205.67', '—', 'Swap free STP', '2d', true], ['Ella James', '3547008', 'Wrong', '$12,003.74', '—', 'Raw ECN', '2d', false], ['Isla Grant', '9981277', 'Churning', '$9,811.38', '—', 'Standard STP', '3w', false], ['Omar Haddad', '4441486', 'At risk', '$8,949.62', '—', 'Standard STP', '2w', false], ['Noah Price', '9197060', 'Dormant', '$6,611.36', '—', 'Swap free STP', '2mo', false]] as const

export function ClientsScreen({ tab = 'All' }: { tab?: string }) {
  return (
    <AppWindow active="clients" title="Clients">
      <PillTabs items={['All', 'Active', 'Churning', 'At risk', 'Dormant', 'Wrong', 'Moved']} active={tab} />
      <div className="mt-5 flex items-center justify-between"><SearchBox /><span className="text-[13px]"><span>1,204</span> <span className="text-[#8f8f8f]">clients</span></span></div>
      <Card className="mt-4 overflow-hidden">
        <div className="grid grid-cols-[1.8fr_.8fr_1fr_1fr_1.2fr_.7fr] border-b border-[#1c1c1c] px-4 py-3"><span className={th}>Client</span><span className={th}>Stage</span><span className={cn(th, 'text-right')}>Balance</span><span className={cn(th, 'text-right')}>Deposits</span><span className={cn(th, 'pl-6')}>Account</span><span className={th}>Last trade</span></div>
        {CLIENTS.map(([n, id, s, b, d, a, t, ok], i) => (
          <div key={n} className="grid grid-cols-[1.8fr_.8fr_1fr_1fr_1.2fr_.7fr] items-center border-b border-[#1c1c1c] px-4 py-2.5 text-[13px] last:border-0">
            <span className="flex items-center gap-2.5"><Initials n={n} i={i} /><span><span className="block">{n}</span><span className="flex items-center gap-1.5 text-[12px] text-[#8f8f8f]"><span className="font-mono">{id}</span>·<span className={cn('flex items-center gap-1', i === 0 && 'text-[hsl(199_85%_65%)]')}><TelegramMark className="size-3" />{i === 0 ? 'Connected' : 'Not connected'}</span></span></span></span>
            <span><Badge s={s} /></span><span className="text-right tabular-nums">{b}</span><span className="text-right tabular-nums text-[#8f8f8f]">{d}</span><span className={cn('pl-6', s === 'Wrong' ? 'text-[hsl(0_80%_66%)]' : 'text-[#b3b3b3]')}>{a}</span><span className={cn('tabular-nums', ok ? 'text-[hsl(145_55%_55%)]' : 'text-[hsl(0_80%_66%)]')}>{t}</span>
          </div>
        ))}
      </Card>
    </AppWindow>
  )
}

/* ── Smaller cards, for the homepage and feature rows ──────────────────── */

const Ic = ({ c, children }: { c: string; children: React.ReactNode }) => <span className={cn('grid size-8 shrink-0 place-items-center rounded-full [&_svg]:size-3.5', c)}>{children}</span>

const ACT: [React.ReactNode, React.ReactNode][] = [
  [<Ic c="bg-[hsl(145_55%_55%/0.12)] text-[hsl(145_55%_55%)]"><TrendingUp /></Ic>, <><b>Daniel Reyes</b> moved from At risk to <Badge s="Active" /></>],
  [<Ic c="bg-[hsl(248_85%_74%/0.12)] text-[hsl(248_85%_80%)]"><UserPlus /></Ic>, <><b>Ava Morgan</b> joined your channel via <Chip><InstagramMark />Instagram · Bio</Chip></>],
  [<Ic c="bg-[hsl(248_85%_74%/0.12)] text-[hsl(248_85%_80%)]"><MessageCircle /></Ic>, <><b>Leo Turner</b> sent you a message <Badge s="New lead" /></>],
  [<Ic c="bg-[hsl(248_85%_74%/0.12)] text-[hsl(248_85%_80%)]"><UserPlus /></Ic>, <><b>Noah Price</b> joined your channel via <Chip><TikTokMark />TikTok · Bio</Chip></>],
  [<Ic c="bg-[hsl(145_55%_55%/0.12)] text-[hsl(145_55%_55%)]"><ShieldCheck /></Ic>, <><b>Isla Grant</b> got verified <Badge s="Verified" /></>],
  [<Ic c="bg-[hsl(248_85%_74%/0.12)] text-[hsl(248_85%_80%)]"><MessageCircle /></Ic>, <><b>Chloe Martin</b> sent you a message <Badge s="New lead" /></>],
  [<Ic c="bg-[hsl(248_85%_74%/0.12)] text-[hsl(248_85%_80%)]"><UserPlus /></Ic>, <><b>Omar Haddad</b> joined your channel via <Chip><InstagramMark />Instagram · DM</Chip></>],
]

export function ActivityCard({ className }: { className?: string }) {
  const { ref, go } = useGo<HTMLDivElement>()
  const t = useTick(1000, 2600, go)
  const rows = Array.from({ length: 5 }, (_, i) => ({ key: t - i, r: ACT[((t - i) % ACT.length + ACT.length) % ACT.length], age: i }))
  return (
    <Card className={cn('w-full max-w-[540px] p-6 text-[#ededed]', lift, className)}>
      <div ref={ref}><CardHead title={<>Recent activity <span className="flex items-center gap-1 rounded-full bg-[hsl(145_55%_55%/0.12)] px-2 py-0.5 text-[11px] font-medium text-[hsl(145_55%_55%)]"><span className="relative flex size-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" /><span className="size-1.5 rounded-full bg-current" /></span>LIVE</span></>} right={<Ghost>View all</Ghost>} /></div>
      <div className="mt-3 px-2 text-[12px] text-[#8f8f8f]">Today</div>
      <div className="relative mt-1 h-[244px] overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map(({ key, r: [ic, txt], age }) => (
            <motion.div key={key} layout initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1 - age * 0.12, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn('flex h-[48px] items-center gap-3 rounded-lg px-2 text-[13.5px] [&_b]:font-medium', age === 0 && 'bg-white/[0.03]')}>
              {ic}<span className="min-w-0 flex-1 truncate text-[#b3b3b3] [&_b]:text-[#ededed]">{txt}</span><span className="shrink-0 text-[12px] text-[#8f8f8f]">{age === 0 ? 'now' : `${age * 3}m ago`}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  )
}

export function BookCard() {
  return (
    <Card className={cn('w-full max-w-[460px] p-6 text-[#ededed]', lift)}>
      <CardHead title="Your book" />
      <div className="mx-auto mt-2 max-w-[290px]"><BookGauge total="$185k" sub="in your book today" /></div>
      <div className="mt-2 space-y-2.5 text-[14px]">
        {[['#22c55e', 'Active', '$134k', '72%'], ['#f59e0b', 'Churning', '$4k', '2%'], ['#f97316', 'At risk', '$3k', '2%'], ['#94a3b8', 'Dormant', '$11k', '6%'], ['#f43f5e', 'Wrong account', '$33k', '18%']].map(([c, k, v, p]) => (
          <div key={k} className="grid grid-cols-[auto_1fr_auto_2.5rem] items-center gap-3"><span className="size-2 rounded-full" style={{ background: c }} /><span className="text-[#b3b3b3]">{k}</span><span className="tabular-nums">{v}</span><span className="text-right text-[12px] tabular-nums text-[#8f8f8f]">{p}</span></div>
        ))}
      </div>
    </Card>
  )
}

const POSTS = [['327K', 'Morning routine', 0, <TikTokMark />], ['261K', 'Pre-NFP setup', 1, <InstagramMark />], ['210K', 'Losses are part of it', 0, <TikTokMark />], ['159K', 'Same kid, different game', 1, <InstagramMark />]] as const

export function TopPostsCard() {
  return (
    <Card className="w-full max-w-[560px] p-6 text-[#ededed]">
      <CardHead title="Top posts" right={<Ghost>View all</Ghost>} />
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {POSTS.map(([v, t, tone, m]) => (
          <div key={t}>
            <div className="relative"><ReelThumb caption="" views="" tone={tone} mark={false} className="aspect-[3/4] w-full rounded-lg" /><span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[11.5px] font-medium text-white [&_svg]:size-3">{m}{v}</span></div>
            <div className="mt-1.5 truncate text-[12.5px]">{t}</div>
            <div className="text-[11px] text-[#8f8f8f]">@yourbrand</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function BreakoutsCard() {
  const rows = [['carousel', '178×', '327K views', '23 Sep', 0], ['video', '114×', '210K views', '7 Oct', 1], ['reel', '49×', '261K views', '2 Oct', 0], ['video', '26×', '47K views', '4 Oct', 1]] as const
  return (
    <Card className={cn('w-full max-w-[560px] p-6 text-[#ededed]', lift)}>
      <CardHead title="Breakouts" right={<span className="text-[12px] text-[#8f8f8f]">1.5× their usual or more</span>} />
      <div className="mt-3 space-y-1">
        {rows.map(([k, x, v, d, tone], i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }} className="flex items-center gap-3 py-1.5 text-[13.5px]">
            <ReelThumb caption="" views="" tone={tone} mark={false} className="h-9 w-8 shrink-0 rounded-md" />
            <span className="flex-1 text-[#b3b3b3]"><span className="text-[#ededed]">Your {k}</span> did <span className="rounded-md bg-[hsl(145_55%_55%/0.15)] px-1.5 py-0.5 text-[12px] text-[hsl(145_55%_55%)]"><Num v={x} /> usual</span> · {v}</span>
            <span className="text-[12px] text-[#8f8f8f]">{d}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

export function PlatformsCard() {
  return (
    <Card className={cn('w-full max-w-[460px] p-6 text-[#ededed]', lift)}>
      <CardHead title="Platforms" right={<span className="text-[12px] text-[#8f8f8f]">share of joins</span>} />
      <Split items={[{ label: <span className="flex items-center gap-1.5"><InstagramMark className="size-3.5" />Instagram</span>, value: 62, hint: '1,320 joins' }, { label: <span className="flex items-center gap-1.5"><TikTokMark className="size-3.5" />TikTok</span>, value: 26, hint: '560 joins' }, { label: <span className="flex items-center gap-1.5"><YouTubeMark className="size-3.5" />YouTube</span>, value: 12, hint: '260 joins' }]} />
    </Card>
  )
}

export function FormatsCard() {
  return (
    <Card className="w-full max-w-[460px] p-6 text-[#ededed]">
      <CardHead title="Formats" right={<span className="text-[12px] text-[#8f8f8f]">share of views</span>} />
      <Split items={[{ label: 'Reel', value: 62, hint: '28 posts · 7.7K typical' }, { label: 'Video', value: 22, hint: '14 posts · 4K typical' }, { label: 'Carousel', value: 16, hint: '6 posts · 12K typical' }]} />
    </Card>
  )
}

const FLOW = ['Lead', 'Submitted', 'Verified'] as const
export function VerifyCard() {
  const { ref, go } = useGo<HTMLDivElement>()
  const t = useTick(3, 1800, go)
  const rows = [['Noah Price', null, 'Under your IB · Balance $1,240', 0], ['Chloe Martin', 'flow', '', 1], ['Isla Grant', 'Verified', 'Under your IB · Balance $860', 2], ['Ryan Porter', 'Moved', 'Moved to another IB · removed from VIP', 3]] as const
  const flowNote = ['Asked to join VIP', 'Checking with your broker…', 'Under your IB · VIP access given']
  return (
    <Card className={cn('w-full max-w-[520px] p-6 text-[#ededed]', lift)}>
      <div ref={ref}><CardHead title="Verification" right={<PillTabs items={['All', 'Verified', 'Left']} active="All" className="bg-[#070707] [&>span]:py-1 [&>span]:text-[12px]" />} /></div>
      <div className="mt-3">
        {rows.map(([n, s, d, i]) => {
          const live = s === 'flow'
          const stage = live ? FLOW[t] : (s ?? 'Verified')
          return (
            <div key={n} className={cn('flex items-center gap-3 border-b border-[#1c1c1c] py-3 text-[13.5px] last:border-0', live && '-mx-3 rounded-xl border-transparent bg-white/[0.03] px-3')}>
              <Initials n={n} i={i} /><span className="min-w-0 flex-1"><span className="block">{n}</span><span className="block truncate text-[12px] text-[#8f8f8f]">{live ? flowNote[t] : d}</span></span>
              <AnimatePresence mode="wait"><motion.span key={stage} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}><Badge s={stage} /></motion.span></AnimatePresence>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export function MoneyCard() {
  return (
    <Card className="w-full p-6 text-[#ededed]">
      <CardHead title="Money in vs out" />
      <div className="mt-2 flex items-center gap-3"><span className="text-[28px] font-medium tracking-tight">+$62,410</span><DeltaPill v="4.6%" /></div>
      <div className="mt-3"><BarsWithLine bars={BARS} line={LINE} labels={DAYS.filter((_, i) => i % 2 === 0)} yTicks={['$0', '$15k', '$30k']} topLabel="$28k" h={200} /></div>
    </Card>
  )
}

export const ActIcons = { LogIn, ArrowRightLeft }

export function LinksCard() {
  const rows = [['instagram-dm', 'Instagram · DM', 642, 198, 38], ['instagram-bio', 'Instagram · Bio', 518, 162, 30], ['tiktok-bio', 'TikTok · Bio', 74, 21, 5], ['youtube-description', 'YouTube · Description', 22, 8, 2]] as const
  return (
    <Card className={cn('w-full max-w-[560px] overflow-hidden text-[#ededed]', lift)}>
      <div className="flex items-center justify-between px-5 pb-3 pt-5"><span className="text-[14px] text-[#b3b3b3]">Links</span><span className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[12px] font-medium text-black"><Plus className="size-3" />New link</span></div>
      <div className="grid grid-cols-[1.6fr_.6fr_.6fr_.6fr] border-y border-[#1c1c1c] px-5 py-2.5"><span className={th}>Source</span><span className={th}>Joined</span><span className={th}>Leads</span><span className={th}>Funded</span></div>
      {rows.map(([s, p, j, l, f]) => (
        <div key={s} className="grid grid-cols-[1.6fr_.6fr_.6fr_.6fr] items-center border-b border-[#1c1c1c] px-5 py-2.5 text-[13px] last:border-0">
          <span><span className="block">{s}</span><span className="text-[12px] text-[#8f8f8f]">{p}</span></span><span className="tabular-nums"><Num v={String(j)} /></span><span className="tabular-nums"><Num v={String(l)} /></span><span className="tabular-nums"><Num v={String(f)} /></span>
        </div>
      ))}
    </Card>
  )
}

export function ContentPostsScreen() {
  return (
    <AppWindow active="growth" title="Growth">
      <div className="flex items-center justify-between"><PillTabs items={['Content', 'Links', 'CTAs']} active="Content" /><PillTabs items={['Overview', 'Playbook', 'Posts']} active="Posts" /></div>
      <div className="mt-5 grid grid-cols-[1.4fr_1fr] gap-4 [&>*]:max-w-none">
        <TopPostsCard /><FormatsCard /><BreakoutsCard /><PlatformsCard />
      </div>
    </AppWindow>
  )
}

/* ── Live compositions for the marketing pages ─────────────────────────
 * Each one runs on a single clock: an event lands → the list updates, the
 * number ticks, and the app's pop-up fires for that same event. */

const card = cn('w-full p-5 text-[#ededed]', lift)

function Mini({ title, value, delta, children }: { title: string; value: React.ReactNode; delta: string; children?: React.ReactNode }) {
  return (
    <Card className={cn('w-[188px] p-3.5 text-[#ededed]', lift)}>
      <div className="text-[12px] text-[#b3b3b3]">{title}</div>
      <div className="mt-0.5 text-[21px] font-medium tracking-tight tabular-nums">{value}</div>
      <div className="mt-1"><DeltaPill v={delta} /></div>
      {children && <div className="mt-2 h-6">{children}</div>}
    </Card>
  )
}

/** Main card centred with room around it; the small card and the pop-up sit on its corners. */
function Scene({ inner, children, mini, toast }: { inner: React.Ref<HTMLDivElement>; children: React.ReactNode; mini?: React.ReactNode; toast?: React.ReactNode }) {
  return (
    <div ref={inner} className="relative w-full max-w-[480px] py-2 sm:px-10 sm:pb-20 sm:pt-[104px]">
      {children}
      {mini && <div className="absolute right-0 top-0 z-10 hidden sm:block">{mini}</div>}
      {toast && <div className="absolute bottom-0 left-0 z-10 hidden sm:block">{toast}</div>}
    </div>
  )
}

const rowIn = { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } }

/* Grow — a post breaks out; it lands at the top and joins tick up. */
const BREAK = [['reel', '38×', '184K views', 0, 96], ['video', '114×', '210K views', 1, 41], ['carousel', '22×', '61K views', 0, 27], ['reel', '49×', '261K views', 1, 64], ['video', '17×', '33K views', 0, 18]] as const

export function GrowStack() {
  const { ref, go, t } = useClock(3400)
  const rows = Array.from({ length: 4 }, (_, i) => ({ k: t - i, r: BREAK[((t - i) % BREAK.length + BREAK.length) % BREAK.length], fresh: i === 0 && t > 0 }))
  const joins = 2140 + [0, 96, 137, 164, 228, 246].slice(0, Math.min(t, 5) + 1).pop()! + Math.max(0, t - 5) * 31
  const top = BREAK[t % BREAK.length]
  return (
    <Scene inner={ref}
      mini={<Mini title="Joins" value={<Live v={joins.toLocaleString()} />} delta="24.0%"><DotMatrix values={[1, 2, 1, 2, 3, 1, 2, 2, 4, 1, 2, 3, 2, 5, 2, 1, 2, 4, 2, 5]} /></Mini>}
      toast={<Toast k={t} show={go && t > 0} icon={<TrendingUp />} text={<>Your {top[0]} is doing <b>{top[1]} your usual</b> · {top[4]} joins</>} />}>
      <Card className={card}>
        <CardHead title="Breakouts" />
        <div className="mt-2">
          <AnimatePresence initial={false}>
            {rows.map(({ k, r: [kind, x, v, tone], fresh }) => (
              <motion.div key={k} {...rowIn} className="overflow-hidden">
                <div className={cn('flex items-center gap-3 rounded-lg px-2 py-2 text-[13px] transition-colors duration-[1500ms]', fresh ? 'bg-[hsl(248_85%_74%/0.10)]' : 'bg-transparent')}>
                  <ReelThumb caption="" views="" tone={tone} mark={false} className="h-8 w-7 shrink-0 rounded-md" />
                  <span className="min-w-0 flex-1 truncate text-[#b3b3b3]"><span className="text-[#ededed]">Your {kind}</span> did <span className="rounded-md bg-[hsl(145_55%_55%/0.15)] px-1.5 py-0.5 text-[11.5px] text-[hsl(145_55%_55%)]">{x} usual</span> · {v}</span>
                  <span className="text-[11.5px] text-[#8f8f8f]">{fresh ? 'now' : `${(t - k) + 1}d`}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </Scene>
  )
}

/* Convert — people join and message; each lands in the feed, leads tick up, the pop-up fires. */
export function ConvertStack() {
  const { ref, go, t } = useClock(2800)
  const at = (n: number) => ACT[((n % ACT.length) + ACT.length) % ACT.length]
  const rows = Array.from({ length: 4 }, (_, i) => ({ k: t - i, r: at(t - i), age: i }))
  const leads = 1368 + t * 1
  const ev = at(t)
  return (
    <Scene inner={ref}
      mini={<Mini title="New leads" value={<Live v={leads.toLocaleString()} />} delta="18.0%"><MiniBars values={[2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 9]} /></Mini>}
      toast={<Toast k={t} show={go && t > 0} icon={<UserPlus />} text={ev[1]} />}>
      <Card className={card}>
        <CardHead title={<>Recent activity <span className="flex items-center gap-1 rounded-full bg-[hsl(145_55%_55%/0.12)] px-2 py-0.5 text-[10.5px] font-medium text-[hsl(145_55%_55%)]"><span className="relative flex size-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" /><span className="size-1.5 rounded-full bg-current" /></span>LIVE</span></>} />
        <div className="mt-2">
          <AnimatePresence initial={false}>
            {rows.map(({ k, r: [ic, txt], age }) => (
              <motion.div key={k} {...rowIn} className="overflow-hidden">
                <div className={cn('flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] transition-colors duration-[1500ms] [&_b]:font-medium', age === 0 && t > 0 ? 'bg-[hsl(248_85%_74%/0.10)]' : 'bg-transparent')}>
                  <span className="[&>span]:size-7">{ic}</span><span className="min-w-0 flex-1 truncate text-[#b3b3b3] [&_b]:text-[#ededed]">{txt}</span><span className="shrink-0 text-[11.5px] text-[#8f8f8f]">{age === 0 ? 'now' : `${age * 3}m`}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </Scene>
  )
}

/* Verify — one person goes Lead → checking with the broker → Verified; the count ticks; the pop-up confirms. */
const PEOPLE = ['Chloe Martin', 'Leo Turner', 'Omar Haddad', 'Ava Morgan']
export function VerifyStack() {
  const { ref, go, t } = useClock(1500)
  const phase = t % 4, who = PEOPLE[Math.floor(t / 4) % PEOPLE.length], done = Math.floor(t / 4) + (phase >= 2 ? 1 : 0)
  const stage = phase === 0 ? 'Lead' : phase === 1 ? 'Submitted' : 'Verified'
  const note = phase === 0 ? 'Asked to join your VIP' : phase === 1 ? 'Checking with your broker…' : 'Under your IB · VIP access given'
  const fixed = [['Noah Price', 'Verified', 'Under your IB · $1,240'], ['Isla Grant', 'Verified', 'Under your IB · $860'], ['Ryan Porter', 'Moved', 'Moved IB · removed from VIP']] as const
  return (
    <Scene inner={ref}
      mini={<Mini title="Verified this month" value={<Live v={String(184 + done)} />} delta="31.0%"><SegMeter share={0.62} /></Mini>}
      toast={<Toast k={who} show={go && phase >= 2} icon={<ShieldCheck />} text={<><b>{who}</b> got verified · VIP access given</>} />}>
      <Card className={card}>
        <CardHead title="Verification" />
        <div className="mt-2">
          <div className="-mx-2 flex items-center gap-3 rounded-xl bg-white/[0.035] px-2 py-2.5 text-[13px]">
            <Initials n={who} i={1} /><span className="min-w-0 flex-1"><span className="block">{who}</span>
              <AnimatePresence mode="wait"><motion.span key={note} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex items-center gap-1.5 truncate text-[11.5px] text-[#8f8f8f]">{phase === 1 && <span className="size-2.5 animate-spin rounded-full border border-white/20 border-t-[hsl(248_85%_74%)]" />}{note}</motion.span></AnimatePresence>
            </span>
            <AnimatePresence mode="wait"><motion.span key={stage} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}><Badge s={stage} /></motion.span></AnimatePresence>
          </div>
          {fixed.map(([n, st, d], i) => (
            <div key={n} className="flex items-center gap-3 border-b border-[#1c1c1c] py-2.5 text-[13px] last:border-0">
              <Initials n={n} i={i + 2} /><span className="min-w-0 flex-1"><span className="block">{n}</span><span className="block truncate text-[11.5px] text-[#8f8f8f]">{d}</span></span><Badge s={st} />
            </div>
          ))}
        </div>
      </Card>
    </Scene>
  )
}

/* Retain — deposits land; net funding ticks up; a client moves back to Active. */
const DEPS = [['Maya Ross', 4200], ['Leo Turner', 1500], ['Daniel Reyes', 9100], ['Noah Price', 800]] as const
export function RetainStack() {
  const { ref, go, t } = useClock(3000)
  const sum = DEPS.slice(0, Math.min(t, DEPS.length)).reduce((n, d) => n + d[1], 0) + Math.max(0, t - DEPS.length) * 1200
  const d = DEPS[(t - 1 + DEPS.length) % DEPS.length]
  return (
    <Scene inner={ref}
      mini={<Mini title="Net funding" value={<Live v={'+$' + (62410 + sum).toLocaleString()} />} delta="4.6%"><NetBars values={[8, -2, 6, 3, -1, 2, 1, -1, 2, 1, 0, 1, 2, -1, 1, 1, 0, 1, 1, 3]} /></Mini>}
      toast={<Toast k={t} show={go && t > 0} icon={<TrendingUp />} text={<><b>{d[0]}</b> deposited <b className="text-[hsl(145_55%_55%)]">+${d[1].toLocaleString()}</b></>} />}>
      <Card className={card}>
        <CardHead title="Your book" />
        <div className="mx-auto mt-1 max-w-[250px]"><BookGauge total="$185k" sub="in your book today" /></div>
        <div className="mt-1 space-y-2 text-[13px]">
          {[['#22c55e', 'Active', '$134k', '72%'], ['#f59e0b', 'Churning', '$4k', '2%'], ['#94a3b8', 'Dormant', '$11k', '6%'], ['#f43f5e', 'Wrong account', '$33k', '18%']].map(([c, k, v, p]) => (
            <div key={k} className="grid grid-cols-[auto_1fr_auto_2.5rem] items-center gap-3"><span className="size-2 rounded-full" style={{ background: c }} /><span className="text-[#b3b3b3]">{k}</span><span className="tabular-nums">{v}</span><span className="text-right text-[11.5px] tabular-nums text-[#8f8f8f]">{p}</span></div>
          ))}
        </div>
      </Card>
    </Scene>
  )
}

/* Grow page rows */
export function PlatformsStack() {
  const { ref } = useClock(99999)
  return <Scene inner={ref} mini={<Mini title="Views" value="1.8M" delta="18.0%"><MiniBars values={[1, 2, 1, 1, 2, 1, 3, 2, 1, 0, 1, 9, 1, 2, 3, 1, 0, 6, 2, 1]} /></Mini>}><PlatformsCard /></Scene>
}

const LINKJOIN = [['Maya Ross', 'instagram-dm', 0], ['Ethan Cole', 'tiktok-bio', 2], ['Ava Morgan', 'instagram-bio', 1], ['Omar Haddad', 'instagram-dm', 0]] as const
export function LinksStack() {
  const { ref, go, t } = useClock(2600)
  const base = [[ 'instagram-dm', 'Instagram · DM', 642], ['instagram-bio', 'Instagram · Bio', 518], ['tiktok-bio', 'TikTok · Bio', 74], ['youtube-description', 'YouTube · Description', 22]] as const
  const hits = [0, 0, 0, 0]; for (let i = 1; i <= t; i++) hits[LINKJOIN[(i - 1) % LINKJOIN.length][2]]++
  const ev = LINKJOIN[(t - 1 + LINKJOIN.length) % LINKJOIN.length]
  return (
    <Scene inner={ref} toast={<Toast k={t} show={go && t > 0} icon={<UserPlus />} text={<><b>{ev[0]}</b> joined via <b>{ev[1]}</b></>} />}>
      <Card className={cn('w-full overflow-hidden text-[#ededed]', lift)}>
        <div className="px-5 pb-3 pt-5 text-[14px] text-[#b3b3b3]">Links</div>
        <div className="grid grid-cols-[1.7fr_.6fr] border-y border-[#1c1c1c] px-5 py-2.5"><span className={th}>Source</span><span className={cn(th, 'text-right')}>Joined</span></div>
        {base.map(([sname, p, j], i) => {
          const lit = t > 0 && LINKJOIN[(t - 1) % LINKJOIN.length][2] === i
          return (
            <div key={sname} className={cn('grid grid-cols-[1.7fr_.6fr] items-center border-b border-[#1c1c1c] px-5 py-2.5 text-[13px] transition-colors duration-[1200ms] last:border-0', lit ? 'bg-[hsl(248_85%_74%/0.08)]' : 'bg-transparent')}>
              <span><span className="block">{sname}</span><span className="text-[11.5px] text-[#8f8f8f]">{p}</span></span><span className="text-right tabular-nums"><Live v={String(j + hits[i])} /></span>
            </div>
          )
        })}
      </Card>
    </Scene>
  )
}

const join = (n: string, via: React.ReactNode) => ({ icon: <UserPlus />, text: <><b>{n}</b> joined your channel via</>, chip: <Chip>{via}</Chip>, ago: 'just now' })

export function GrowToasts() {
  return <Toasts ms={3000} items={[join('Ava Morgan', <><InstagramMark />Instagram · Bio</>), { icon: <TrendingUp />, text: <>Your reel is doing <b>38× your usual</b></>, ago: 'just now' }, join('Noah Price', <><TikTokMark />TikTok · Bio</>), { icon: <MessageCircle />, text: <><b>Leo Turner</b> sent you a message</>, chip: <Badge s="New lead" />, ago: 'just now' }]} />
}
