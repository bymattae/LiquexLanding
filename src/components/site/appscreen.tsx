import { useRef } from 'react'
import { Film as IFilm, Activity as IAct, Link2 as ILink, Inbox as IInbox, ShieldCheck as IShield, Wallet as IWallet, Settings as ISet } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { AiGlyph, ReelThumb } from '@/components/affiliate/animated'
import { AreaChart, Delta, InstagramMark, LiquexMark, Spark, TelegramMark, TikTokMark, YouTubeMark, ease, label, num } from '@/components/affiliate/premium'

/**
 * A full Liquex app screen for the stage pages: sidebar + the page for that
 * stage. Drawn at a fixed 1120×640 and scaled down on smaller screens.
 */

const W = 1120, H = 640
const NAV: [string, string][] = [['Home', ''], ['Content', 'Grow'], ['Links', 'Grow'], ['Channel', 'Convert'], ['CRM', 'Convert'], ['Verification', 'Verify'], ['Clients', 'Retain'], ['Automate', 'Retain']]

export function AppScreen({ active, children }: { active: string; children: (go: boolean) => React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const go = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div className="relative mx-auto h-[214px] w-full max-w-6xl sm:h-[366px] md:h-[470px] lg:h-[640px]">
      <div className="absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.33] sm:scale-[0.57] md:scale-[0.73] lg:scale-100">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease }}
          className="grid grid-cols-[200px_1fr] overflow-hidden rounded-[22px] bg-[#070809] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_100px_rgba(0,0,0,0.6)]" style={{ width: W, height: H }}>
          <aside className="flex flex-col border-r border-white/[0.06] bg-white/[0.015] p-4">
            <div className="flex items-center gap-2 px-1"><LiquexMark className="size-6" /><span className="text-[13.5px] font-semibold">Liquex</span></div>
            <div className="mt-6">
              {NAV.map(([n, g], i) => (
                <div key={n}>
                  {g && NAV[i - 1][1] !== g && <div className="px-2.5 pb-1 pt-4 text-[9.5px] font-medium uppercase tracking-[0.08em] text-zinc-600">{g}</div>}
                  <div className={cn('rounded-lg px-2.5 py-[7px] text-[12.5px]', n === active ? 'bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' : 'text-zinc-500')}>{n}</div>
                </div>
              ))}
            </div>
          </aside>
          <main className="flex min-w-0 flex-col gap-4 p-6">{children(go)}</main>
        </motion.div>
      </div>
    </div>
  )
}

const panel = 'rounded-xl bg-white/[0.025] ring-1 ring-white/[0.05]'

function Head({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-end justify-between">
      <div><div className="text-[20px] font-medium tracking-tight">{title}</div><div className="mt-0.5 text-[12px] text-zinc-500">{sub}</div></div>
      <div className="flex rounded-lg bg-white/[0.04] p-0.5 text-[11px] text-zinc-500">
        {['7D', '30D', '90D'].map(p => <span key={p} className={cn('rounded-md px-2.5 py-1', p === '30D' && 'bg-white/[0.08] text-zinc-100')}>{p}</span>)}
      </div>
    </div>
  )
}

function Kpis({ items, go }: { items: [string, string, string, number[]][]; go: boolean }) {
  return (
    <div className={cn('grid grid-cols-4 divide-x divide-white/[0.06] py-4', panel)}>
      {items.map(([k, v, d, sp]) => (
        <div key={k} className="px-4">
          <div className={label}>{k}</div>
          <div className={cn(num, 'mt-1.5 text-[21px] text-white')}>{v}</div>
          <div className="mt-1 flex items-center justify-between"><Delta v={d} /><Spark data={sp} go={go} color="#f472b6" className="h-4 w-12" /></div>
        </div>
      ))}
    </div>
  )
}

/* ── Grow: the Content page ────────────────────────────────────────────── */

const POSTS: [string, React.ReactNode, string, string, number, string, number][] = [
  ['My morning routine', <InstagramMark className="size-3.5" />, 'Reel · 4 Oct', '184K', 96, '$12.4K', 0],
  ['Gold setup this week', <TikTokMark className="size-3.5" />, 'Video · 1 Oct', '88K', 41, '$5.1K', 1],
  ['How I trade NFP', <YouTubeMark className="size-3.5" />, 'Video · 28 Sep', '52K', 27, '$3.8K', 0],
  ['Day in the life', <InstagramMark className="size-3.5" />, 'Reel · 25 Sep', '31K', 14, '$1.9K', 1],
  ['Why most traders lose', <TikTokMark className="size-3.5" />, 'Video · 22 Sep', '24K', 9, '$1.1K', 0],
]
const PLATFORMS: [React.ReactNode, string, number][] = [
  [<InstagramMark className="size-4" />, 'Instagram', 100],
  [<TikTokMark className="size-4" />, 'TikTok', 47],
  [<TelegramMark className="size-4" />, 'Telegram', 25],
  [<YouTubeMark className="size-4" />, 'YouTube', 10],
]

export function GrowScreen() {
  return (
    <AppScreen active="Content">
      {go => (
        <>
          <Head title="Content" sub="Every post, matched to the traders it brought in — last 30 days." />
          <Kpis go={go} items={[
            ['Views', '1.8M', '18%', [4, 5, 5, 7, 6, 8, 10]], ['Joins', '2,140', '24%', [3, 4, 5, 5, 7, 8, 9]],
            ['New clients', '104', '31%', [2, 3, 4, 4, 6, 7, 9]], ['Deposited', '$38.2K', '12%', [5, 4, 6, 6, 7, 8, 9]],
          ]} />
          <div className="grid min-h-0 flex-1 grid-cols-[1.55fr_1fr] gap-4">
            <div className={cn('flex flex-col p-4', panel)}>
              <div className="grid grid-cols-[1fr_70px_60px_70px] gap-3 px-1 pb-2 text-[10.5px] font-medium text-zinc-500"><span>Top posts</span><span className="text-right">Views</span><span className="text-right">Joins</span><span className="text-right">Deposited</span></div>
              {POSTS.map(([t, m, d, v, j, dep, tone], i) => (
                <motion.div key={t} initial={{ opacity: 0, y: 6 }} animate={go ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
                  className={cn('grid grid-cols-[1fr_70px_60px_70px] items-center gap-3 rounded-lg px-1 py-2 text-[12.5px]', i === 0 && 'bg-white/[0.04]')}>
                  <div className="flex min-w-0 items-center gap-3">
                    <ReelThumb caption="" views="" go={go} tone={tone} mark={false} className="h-[48px] w-[32px] shrink-0 rounded-md" />
                    <div className="min-w-0"><div className="truncate font-medium text-zinc-100">{t}</div><div className="flex items-center gap-1.5 text-[11px] text-zinc-500">{m}{d}</div></div>
                  </div>
                  <span className="text-right tabular-nums text-zinc-300">{v}</span>
                  <span className="text-right font-medium tabular-nums text-white">{j}</span>
                  <span className="text-right tabular-nums text-emerald-300">{dep}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex min-h-0 flex-col gap-4">
              <div className={cn('p-4', panel)}>
                <div className={label}>Joins by platform</div>
                <div className="mt-3 space-y-3">
                  {PLATFORMS.map(([m, k, w], i) => (
                    <div key={k} className="flex items-center gap-2.5 text-[12px]">
                      {m}<span className="w-16 text-zinc-300">{k}</span>
                      <div className="h-1.5 flex-1 rounded-full bg-white/[0.07]"><motion.div className={cn('h-full rounded-full', i === 0 ? 'bg-gradient-to-r from-pink-500 to-pink-300' : 'bg-white/25')} initial={{ width: 0 }} animate={go ? { width: `${w}%` } : {}} transition={{ delay: 0.5 + i * 0.1, duration: 0.9, ease }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cn('flex min-h-0 flex-1 flex-col p-4', panel)}>
                <div className="flex items-baseline justify-between"><span className={label}>Joins over time</span><span className="text-[11px] text-pink-300">↗ 24%</span></div>
                <div className="mt-2 min-h-0 flex-1"><AreaChart data={[30, 34, 31, 40, 38, 46, 44, 55, 52, 63, 60, 72, 70, 84]} w={300} h={110} go={go} color="#f472b6" className="h-full" /></div>
              </div>
            </div>
          </div>
        </>
      )}
    </AppScreen>
  )
}

/* ── Tall app panels for the feature rows (Mochi-style: a real screen, cropped) ── */

const pill = 'inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] text-zinc-300 ring-1 ring-white/[0.07]'

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative h-[520px] w-full max-w-[420px] overflow-hidden rounded-t-[36px] bg-[linear-gradient(180deg,#0f1012,#09090b)] px-4 pt-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="px-2 text-[26px] font-semibold tracking-tight">{title}</div>
      <div className="mt-5 space-y-3">{children}</div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

export function Group({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] bg-white/[0.03] ring-1 ring-white/[0.05]">
      <div className="flex items-center gap-2 px-4 py-3 text-[14px] font-medium text-zinc-100 [&_svg]:size-4">{icon}{title}</div>
      <div className="divide-y divide-white/[0.05] rounded-[22px] bg-[#0c0d0f]">{children}</div>
    </div>
  )
}

export function Item({ lead, title, sub, right, tags }: { lead: React.ReactNode; title: string; sub: string; right?: React.ReactNode; tags?: React.ReactNode[] }) {
  return (
    <div className="flex gap-3 px-4 py-3.5">
      <div className="shrink-0">{lead}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2"><span className="truncate text-[14px] font-medium text-white">{title}</span>{right}</div>
        <div className="mt-0.5 truncate text-[12.5px] text-zinc-400">{sub}</div>
        {tags && <div className="mt-2 flex flex-wrap gap-1.5">{tags.map((t, i) => <span key={i} className={pill}>{t}</span>)}</div>}
      </div>
    </div>
  )
}

const thumb = (tone: number) => <ReelThumb caption="" views="" tone={tone} mark={false} className="h-[46px] w-[32px] rounded-lg" />

export function PostsPanel() {
  return (
    <Panel title="Content">
      <Group icon={<span className="text-amber-300">★</span>} title="Top performers">
        <Item lead={thumb(0)} title="My morning routine" sub="184K views · 96 joins" right={<span className="text-[12px] text-emerald-300">$12.4K</span>} tags={[<><InstagramMark className="size-3" />Reel</>, 'Lifestyle', '38× usual']} />
        <Item lead={thumb(1)} title="Gold setup this week" sub="88K views · 41 joins" right={<span className="text-[12px] text-emerald-300">$5.1K</span>} tags={[<><TikTokMark className="size-3" />Video</>, 'Analysis', 'Strong hook']} />
      </Group>
      <Group icon={<span className="text-zinc-500">↘</span>} title="Underperforming">
        <Item lead={thumb(0)} title="Weekly recap" sub="9K views · 0 joins" right={<span className="text-[12px] text-zinc-500">$0</span>} tags={[<><YouTubeMark className="size-3" />Video</>, 'No CTA']} />
      </Group>
    </Panel>
  )
}

export function PlatformsPanel() {
  const row = (m: React.ReactNode, k: string, j: string, c: string, w: number, on?: boolean) => (
    <div className="px-4 py-3.5">
      <div className="flex items-center justify-between text-[14px]"><span className="flex items-center gap-2.5 font-medium text-white">{m}{k}</span><span className="text-[12.5px] text-zinc-400"><span className="font-semibold text-white">{j}</span> joins · {c}</span></div>
      <div className="mt-2.5 h-1.5 rounded-full bg-white/[0.07]"><div className={cn('h-full rounded-full', on ? 'bg-gradient-to-r from-pink-500 to-pink-300' : 'bg-white/25')} style={{ width: `${w}%` }} /></div>
    </div>
  )
  return (
    <Panel title="Platforms">
      <Group icon={<span className="text-pink-300">●</span>} title="This month">
        {row(<InstagramMark className="size-5" />, 'Instagram', '1,240', '64 clients', 100, true)}
        {row(<TikTokMark className="size-5" />, 'TikTok', '580', '21 clients', 47)}
        {row(<TelegramMark className="size-5" />, 'Telegram', '310', '14 clients', 25)}
        {row(<YouTubeMark className="size-5" />, 'YouTube', '120', '5 clients', 10)}
      </Group>
      <Group icon={<span className="text-amber-300">★</span>} title="Best on each">
        <Item lead={thumb(0)} title="Instagram · My morning routine" sub="96 joins · $12.4K deposited" tags={['Reel', 'Lifestyle']} />
      </Group>
    </Panel>
  )
}

export function LinksPanel() {
  const ic = (m: React.ReactNode) => <span className="grid size-[34px] place-items-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.07]">{m}</span>
  return (
    <Panel title="Links">
      <Group icon={<span className="text-sky-300">↗</span>} title="Best links">
        <Item lead={ic(<InstagramMark className="size-4" />)} title="liquex.link/ig-bio" sub="642 joins · 64 clients" right={<span className="text-[11px] text-zinc-500">bio</span>} tags={['Instagram', 'Top source']} />
        <Item lead={ic(<InstagramMark className="size-4" />)} title="liquex.link/ig-dm" sub="518 joins · 41 clients" right={<span className="text-[11px] text-zinc-500">DM</span>} tags={['Instagram', 'Auto-reply']} />
      </Group>
      <Group icon={<span className="text-zinc-500">●</span>} title="Other links">
        <Item lead={ic(<TikTokMark className="size-4" />)} title="liquex.link/tt-bio" sub="74 joins · 6 clients" right={<span className="text-[11px] text-zinc-500">bio</span>} tags={['TikTok']} />
      </Group>
    </Panel>
  )
}

/* ── AI insights panel: each insight with its own small visual ─────────── */

function Insight({ label, text, visual, action }: { label: string; text: string; visual: React.ReactNode; action: string }) {
  return (
    <div className="sweep relative flex flex-col rounded-[22px] bg-[linear-gradient(180deg,#121116,#0a0a0c)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(196,181,253,0.10)]">
      <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-violet-300"><AiGlyph className="size-3" />{label}</div>
      <p className="mt-2 text-[13.5px] leading-5 text-zinc-100">{text}</p>
      <div className="mt-4 flex-1">{visual}</div>
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-violet-400/15 px-3 py-1 text-[12px] font-medium text-violet-200 ring-1 ring-violet-300/20">{action}</span>
        <span className="text-[11px] text-zinc-600">Today</span>
      </div>
    </div>
  )
}

export function InsightCards() {
  const compare = (
    <div className="space-y-1.5 text-[11px]">
      {[['Lifestyle + “DM me”', 100, 'bg-violet-300'], ['Market analysis', 17, 'bg-white/25']].map(([k, w, c]) => (
        <div key={k as string} className="flex items-center gap-2"><span className="w-28 shrink-0 text-zinc-400">{k}</span><div className="h-1.5 flex-1 rounded-full bg-white/[0.07]"><div className={cn('h-full rounded-full', c as string)} style={{ width: `${w}%` }} /></div></div>
      ))}
    </div>
  )
  const hours = (
    <div>
      <div className="flex h-10 items-end gap-[3px]">
        {[8, 6, 5, 5, 6, 10, 14, 18, 16, 14, 15, 18, 20, 22, 24, 28, 34, 46, 72, 100, 92, 64, 30, 14].map((h, i) => <span key={i} className={cn('flex-1 rounded-[2px]', i >= 19 && i <= 21 ? 'bg-violet-300' : 'bg-white/[0.12]')} style={{ height: `${h}%` }} />)}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-zinc-600"><span>12am</span><span>12pm</span><span>11pm</span></div>
    </div>
  )
  const fix = (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2 text-[11.5px]">
      <span className="flex items-center gap-2 text-zinc-300"><YouTubeMark className="size-4" />12 videos · 52K views</span><span className="text-rose-300">0 links</span>
    </div>
  )
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Insight label="What’s working" text="Lifestyle reels ending in “DM me” bring 6× more joins." visual={compare} action="Post 2 more this week" />
      <Insight label="Best time to post" text="7–9pm posts get 3× the joins of morning posts." visual={hours} action="Post in the evening" />
      <Insight label="What to fix" text="Your YouTube gets views but no joins — no link." visual={fix} action="Add your smart link" />
    </div>
  )
}

/* ── Showcase screens: a wide app window with an icon rail, one per tab ── */


export function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-[460px] w-full overflow-hidden rounded-t-[22px] bg-[#070809] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.07)]">
      <div className="grid h-full grid-cols-[56px_1fr]">
        <div className="flex flex-col items-center gap-4 border-r border-white/[0.06] py-5 text-zinc-600 [&_svg]:size-4">
          <LiquexMark className="mb-2 size-7 rounded-lg" />
          <IFilm className="text-white" /><IAct /><ILink /><IInbox /><IShield /><IWallet /><ISet className="mt-auto" />
        </div>
        <div className="min-w-0 overflow-hidden p-6">{children}</div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

const th = 'text-[11px] font-medium text-zinc-500'

export function ContentWide() {
  const rows = [['My morning routine', <InstagramMark className="size-3.5" />, '184K', '96', '14', '$12.4K', 0], ['Gold setup this week', <TikTokMark className="size-3.5" />, '88K', '41', '6', '$5.1K', 1], ['How I trade NFP', <YouTubeMark className="size-3.5" />, '52K', '27', '4', '$3.8K', 0], ['Day in the life', <InstagramMark className="size-3.5" />, '31K', '14', '2', '$1.9K', 1], ['Why most traders lose', <TikTokMark className="size-3.5" />, '24K', '9', '1', '$1.1K', 0]] as const
  return (
    <Window>
      <div className="flex items-end justify-between"><div className="text-[18px] font-medium">Content</div><span className="text-[11px] text-zinc-500">Last 30 days</span></div>
      <div className="mt-5 grid grid-cols-[1fr_80px_70px_70px_90px] gap-3 border-b border-white/[0.06] pb-2"><span className={th}>Post</span><span className={cn(th, 'text-right')}>Views</span><span className={cn(th, 'text-right')}>Joins</span><span className={cn(th, 'text-right')}>Clients</span><span className={cn(th, 'text-right')}>Deposited</span></div>
      {rows.map(([t, m, v, j, c, d, tone], i) => (
        <div key={t} className={cn('grid grid-cols-[1fr_80px_70px_70px_90px] items-center gap-3 border-b border-white/[0.04] py-3 text-[13px]', i === 0 && 'bg-white/[0.02]')}>
          <span className="flex min-w-0 items-center gap-3"><ReelThumb caption="" views="" tone={tone} mark={false} className="h-[40px] w-[28px] shrink-0 rounded-md" /><span className="min-w-0"><span className="block truncate text-zinc-100">{t}</span><span className="flex items-center gap-1 text-[11px] text-zinc-500">{m}</span></span></span>
          <span className="text-right tabular-nums text-zinc-300">{v}</span><span className="text-right font-medium tabular-nums text-white">{j}</span><span className="text-right tabular-nums text-zinc-300">{c}</span><span className="text-right tabular-nums text-emerald-300">{d}</span>
        </div>
      ))}
    </Window>
  )
}

export function PlatformsWide() {
  const ps = [[<InstagramMark className="size-6" />, 'Instagram', '1,240', '64', [4, 5, 5, 7, 6, 8, 10], '#f472b6'], [<TikTokMark className="size-6" />, 'TikTok', '580', '21', [3, 4, 3, 5, 5, 6, 7], '#22d3ee'], [<TelegramMark className="size-6" />, 'Telegram', '310', '14', [2, 3, 3, 4, 4, 4, 5], '#38bdf8'], [<YouTubeMark className="size-6" />, 'YouTube', '120', '5', [3, 3, 2, 2, 3, 2, 2], '#fb7185']] as const
  return (
    <Window>
      <div className="flex items-end justify-between"><div className="text-[18px] font-medium">Platforms</div><span className="text-[11px] text-zinc-500">Last 30 days</span></div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {ps.map(([m, k, j, c, sp, col]) => (
          <div key={k} className="rounded-xl bg-white/[0.025] p-4 ring-1 ring-white/[0.05]">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2.5 text-[14px] font-medium">{m}{k}</span><Spark data={[...sp]} color={col} className="h-5 w-16" /></div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div><div className={label}>Joins</div><div className={cn(num, 'mt-1 text-[22px]')}>{j}</div></div>
              <div><div className={label}>Clients</div><div className={cn(num, 'mt-1 text-[22px]')}>{c}</div></div>
            </div>
          </div>
        ))}
      </div>
    </Window>
  )
}

export function LinksWide() {
  const ls = [[<InstagramMark className="size-4" />, 'liquex.link/ig-bio', 'Instagram bio', '4,820', '642', '64', '13%'], [<InstagramMark className="size-4" />, 'liquex.link/ig-dm', 'Instagram DM', '2,910', '518', '41', '18%'], [<TikTokMark className="size-4" />, 'liquex.link/tt-bio', 'TikTok bio', '1,240', '74', '6', '6%'], [<YouTubeMark className="size-4" />, 'liquex.link/yt-desc', 'YouTube description', '610', '22', '2', '4%']] as const
  return (
    <Window>
      <div className="flex items-end justify-between"><div className="text-[18px] font-medium">Smart links</div><span className="rounded-full bg-white px-3 py-1 text-[11.5px] font-medium text-black">+ New link</span></div>
      <div className="mt-5 grid grid-cols-[1fr_80px_70px_70px_70px] gap-3 border-b border-white/[0.06] pb-2"><span className={th}>Link</span><span className={cn(th, 'text-right')}>Clicks</span><span className={cn(th, 'text-right')}>Joins</span><span className={cn(th, 'text-right')}>Clients</span><span className={cn(th, 'text-right')}>Rate</span></div>
      {ls.map(([m, u, w, cl, j, c, r], i) => (
        <div key={u} className={cn('grid grid-cols-[1fr_80px_70px_70px_70px] items-center gap-3 border-b border-white/[0.04] py-3.5 text-[13px]', i === 0 && 'bg-white/[0.02]')}>
          <span className="flex min-w-0 items-center gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.07]">{m}</span><span className="min-w-0"><span className="block truncate text-zinc-100">{u}</span><span className="text-[11px] text-zinc-500">{w}</span></span></span>
          <span className="text-right tabular-nums text-zinc-300">{cl}</span><span className="text-right font-medium tabular-nums text-white">{j}</span><span className="text-right tabular-nums text-zinc-300">{c}</span><span className="text-right tabular-nums text-sky-300">{r}</span>
        </div>
      ))}
    </Window>
  )
}
