import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, ChevronDown, Home, Link2, PanelLeft, Sparkles, TrendingUp, User, Users, Activity, Clock, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * A faithful copy of the Liquex app's look (LiquexLive · components/dashboard/kit.tsx
 * and index.css dark tokens), so every product visual on the site matches the
 * real platform: soft borderless cards, grey everywhere, the violet accent only
 * on the thing that's "lit".
 */

export const T = {
  bg: '#070707', card: '#0d0d0d', raised: '#141414', sunken: '#050505',
  fg: '#ededed', subtle: '#b3b3b3', muted: '#8f8f8f', divider: '#1c1c1c', border: '#242424',
  accent: 'hsl(248 85% 74%)', success: 'hsl(145 55% 55%)', danger: 'hsl(0 80% 66%)', info: 'hsl(199 85% 65%)', warning: 'hsl(38 90% 60%)',
  mutedBar: 'rgba(143,143,143,0.35)', mutedDot: 'rgba(143,143,143,0.45)',
}

/* ── Motion ─────────────────────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as const
export function useGo<T extends Element>(margin = '-60px') {
  const ref = useRef<T>(null)
  const go = useInView(ref, { once: true, margin: margin as `${number}px` })
  return { ref, go }
}

/** Counts the first number in a string up from zero, keeping prefix/suffix and format. */
export function Num({ v, ms = 1400 }: { v: string; ms?: number }) {
  const { ref, go } = useGo<HTMLSpanElement>()
  const m = v.match(/[\d,]+(\.\d+)?/)
  const target = m ? parseFloat(m[0].replace(/,/g, '')) : 0
  const dec = m && m[1] ? m[1].length - 1 : 0
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go || !m) return
    let raf = 0; const t0 = performance.now()
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / ms); setN(target * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [go]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <span ref={ref}>{v}</span>
  const shown = n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: m[0].includes(',') || target >= 1000 })
  return <span ref={ref}>{v.slice(0, m.index)}{shown}{v.slice((m.index ?? 0) + m[0].length)}</span>
}

/** Wipes its content in from the left when it scrolls into view. */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, go } = useGo<HTMLDivElement>()
  return <motion.div ref={ref} className={className} initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={go ? { clipPath: 'inset(0 0% 0 0)' } : {}} transition={{ duration: 1.2, delay, ease }}>{children}</motion.div>
}

/** Steps 0..n-1 every `ms`. */
export function useTick(n: number, ms: number, go = true) {
  const [i, setI] = useState(0)
  useEffect(() => { if (!go) return; const id = setInterval(() => setI(x => (x + 1) % n), ms); return () => clearInterval(id) }, [n, ms, go])
  return i
}

/* ── Surfaces ──────────────────────────────────────────────────────────── */

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('min-w-0 rounded-2xl bg-[#0d0d0d]', className)}>{children}</div>
}

export function CardHead({ title, right, className }: { title: React.ReactNode; right?: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between gap-2 text-[14px] text-[#b3b3b3]', className)}><span className="flex items-center gap-2">{title}</span>{right}</div>
}

export function Ghost({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-[#141414] px-3 py-1 text-[12.5px] text-[#ededed]">{children}</span>
}

/* ── Numbers ───────────────────────────────────────────────────────────── */

export function DeltaPill({ v, good = true, note }: { v: string; good?: boolean; note?: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cn('inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[12px] font-medium tabular-nums', good ? 'bg-[hsl(145_55%_55%/0.15)] text-[hsl(145_55%_55%)]' : 'bg-[hsl(0_80%_66%/0.15)] text-[hsl(0_80%_66%)]')}>
        {good ? <ArrowUpRight className="size-3" strokeWidth={2.5} /> : <ArrowDownRight className="size-3" strokeWidth={2.5} />}{v}
      </span>
      {note && <span className="text-[12px] text-[#8f8f8f]">{note}</span>}
    </span>
  )
}

/** Title ↗ · one big number · one pill · one small visual. */
export function Kpi({ title, value, unit, delta, viz, open = true }: { title: string; value: string; unit?: string; delta: React.ReactNode; viz: React.ReactNode; open?: boolean }) {
  return (
    <Card className="flex flex-col p-4">
      <span className="flex items-center justify-between text-[14px] text-[#b3b3b3]">{title}{open ? <span className="grid size-7 place-items-center rounded-full bg-[#141414] text-[#8f8f8f]"><ArrowUpRight className="size-3.5" /></span> : <span className="h-7" />}</span>
      <span className="mt-1 flex items-baseline gap-1.5"><span className="truncate text-[28px] font-medium leading-tight tracking-tight tabular-nums text-[#ededed]"><Num v={value} /></span>{unit && <span className="text-[14px] text-[#8f8f8f]">{unit}</span>}</span>
      <span className="mt-1.5">{delta}</span>
      <Reveal delay={0.25} className="mt-3 block h-9 overflow-hidden">{viz}</Reveal>
    </Card>
  )
}

/* ── Small visuals (same maths as the app) ─────────────────────────────── */

export function Line({ values, color = T.accent }: { values: number[]; color?: string }) {
  const w = 260, h = 56, mn = Math.min(...values), mx = Math.max(...values)
  const pts = values.map((v, i) => [i / (values.length - 1) * w, h - 4 - (v - mn) / (mx - mn || 1) * (h - 12)])
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden><polyline points={pts.map(p => p.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" /></svg>
}

export function MiniBars({ values }: { values: number[] }) {
  const m = Math.max(1, ...values), w = 260, h = 56, bw = w / values.length, top = values.indexOf(Math.max(...values))
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden>{values.map((v, i) => { const hh = v ? Math.max(2, v / m * (h - 2)) : 1.5; return <rect key={i} x={i * bw + bw * 0.2} y={h - hh} width={bw * 0.6} height={hh} rx={1.5} fill={i === top && v ? T.accent : v ? T.mutedBar : T.raised} /> })}</svg>
}

export function NetBars({ values }: { values: number[] }) {
  const m = Math.max(1, ...values.map(Math.abs)), w = 260, h = 56, mid = h * 0.62, bw = w / values.length
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden>
      <line x1={0} x2={w} y1={mid} y2={mid} stroke={T.border} />
      {values.map((v, i) => { const lit = i === values.length - 1, up = v >= 0, hh = Math.max(1.5, Math.abs(v) / m * (up ? mid - 2 : h - mid - 2)); return <rect key={i} x={i * bw + bw * 0.22} y={up ? mid - hh : mid} width={bw * 0.56} height={hh} rx={1.5} fill={lit ? (up ? T.success : T.danger) : up ? T.mutedBar : 'hsl(0 80% 66% / 0.3)'} /> })}
    </svg>
  )
}

export function DotMatrix({ values, lit = T.info }: { values: number[]; lit?: string }) {
  const m = Math.max(1, ...values), w = 300, h = 36, cw = w / values.length, rows = 5
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" aria-hidden>{values.flatMap((v, i) => { const n = v > 0 ? Math.max(1, Math.round(v / m * rows)) : 0; return Array.from({ length: rows }, (_, j) => <circle key={`${i}-${j}`} cx={i * cw + cw / 2} cy={h - 3 - j * ((h - 6) / (rows - 1))} r={Math.min(2.4, cw / 3)} fill={j < n ? (i === values.length - 1 ? lit : T.mutedDot) : T.raised} />) })}</svg>
}

export function SegMeter({ share }: { share: number }) {
  const on = Math.round(share * 24)
  return <span className="grid h-full grid-cols-[repeat(24,minmax(0,1fr))] items-end gap-[3px] pt-3">{Array.from({ length: 24 }, (_, i) => <span key={i} className={cn('h-full rounded-[3px]', i < on ? 'bg-[hsl(248_85%_74%)]' : 'bg-[#141414]')} />)}</span>
}

const SHADE = [1, 0.72, 0.52, 0.36, 0.22]

/** One bold split of a whole, then a tight legend. */
export function Split({ items }: { items: { label: React.ReactNode; value: number; hint?: string }[] }) {
  const total = items.reduce((n, i) => n + i.value, 0), share = (v: number) => Math.round(v / total * 100)
  return (
    <>
      <Reveal className="mt-4 flex h-[108px] gap-1">
        {items.map((r, i) => <span key={i} className="flex min-w-[6px] items-end overflow-hidden rounded-lg bg-[hsl(248_85%_74%)] p-2" style={{ flexGrow: r.value, opacity: SHADE[i] ?? 0.2 }}>{share(r.value) >= 12 && <span className="text-[12px] font-medium tabular-nums text-white">{share(r.value)}%</span>}</span>)}
      </Reveal>
      <div className="flex flex-col pt-4">
        {items.map((r, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr_auto_2.75rem] items-center gap-2.5 py-1.5 text-[14px]">
            <span className="size-2 rounded-full bg-[hsl(248_85%_74%)]" style={{ opacity: SHADE[i] ?? 0.2 }} />
            <span className="truncate text-[#b3b3b3]">{r.label}</span>
            <span className="text-[12px] tabular-nums text-[#8f8f8f]">{r.hint}</span>
            <span className="text-right tabular-nums text-[#ededed]">{share(r.value)}%</span>
          </div>
        ))}
      </div>
    </>
  )
}

/* ── The big charts ────────────────────────────────────────────────────── */

/** Grey bars, the biggest lit violet with a label, a dashed line over them. */
export function BarsWithLine({ bars, line, lineColor = T.danger, dashed = true, labels, yTicks, topLabel, h = 230 }: { bars: number[]; line: number[]; lineColor?: string; dashed?: boolean; labels: string[]; yTicks: string[]; topLabel: string; h?: number }) {
  const { ref, go } = useGo<SVGSVGElement>()
  const w = 760, pad = 40, ch = h - 26, m = Math.max(...bars, ...line), bw = (w - pad) / bars.length, top = bars.indexOf(Math.max(...bars))
  const y = (v: number) => ch - v / m * (ch - 24)
  const pts = line.map((v, i) => [pad + i * bw + bw / 2, y(v)] as [number, number])
  const path = pts.reduce((d, p, i) => { if (!i) return `M${p[0]},${p[1]}`; const q = pts[i - 1], cx = (q[0] + p[0]) / 2; return `${d} C${cx},${q[1]} ${cx},${p[1]} ${p[0]},${p[1]}` }, '')
  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} width="100%" height={h} aria-hidden>
      <defs><linearGradient id="bwl-lit" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={T.accent} /><stop offset="1" stopColor={T.accent} stopOpacity="0.14" /></linearGradient></defs>
      {yTicks.map((t, i) => { const yy = ch - i / (yTicks.length - 1) * (ch - 24); return <g key={t}><line x1={pad} x2={w} y1={yy} y2={yy} stroke={T.divider} /><text x={pad - 8} y={yy + 4} textAnchor="end" fontSize="11" fill={T.muted}>{t}</text></g> })}
            {bars.map((v, i) => <motion.rect key={i} x={pad + i * bw + bw * 0.25} width={bw * 0.5} rx={bw * 0.25} fill={i === top ? T.accent : '#202020'} initial={{ y: ch, height: 0 }} animate={go ? { y: y(v), height: ch - y(v) } : {}} transition={{ delay: 0.1 + i * 0.025, duration: 0.8, ease }} />)}
      {dashed
        ? <motion.path d={path} fill="none" stroke={lineColor} strokeWidth="1.5" strokeDasharray="4 4" initial={{ opacity: 0 }} animate={go ? { opacity: 0.9 } : {}} transition={{ delay: 0.9, duration: 0.8 }} />
        : <motion.path d={path} fill="none" stroke={lineColor} strokeWidth="2" initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : {}} transition={{ delay: 0.5, duration: 1.6, ease }} />}
      <motion.g initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: 1.2 }} transform={`translate(${pad + top * bw + bw / 2},${y(bars[top]) - 14})`}><rect x="-28" y="-11" width="56" height="20" rx="10" fill="#141414" /><text textAnchor="middle" y="3" fontSize="11" fill={T.fg}>{topLabel}</text></motion.g>
      {labels.map((l, i) => <text key={i} x={pad + (i + 0.5) * ((w - pad) / labels.length)} y={h - 4} textAnchor="middle" fontSize="11" fill={T.muted}>{l}</text>)}
    </svg>
  )
}

/** The "Your book" ring: green / amber / slate / red ticks, the total in the middle. */
export function BookGauge({ total, sub }: { total: string; sub: string }) {
  const { ref, go } = useGo<SVGSVGElement>()
  const N = 64, segs: string[] = []
  const plan: [number, string][] = [[0.72, '#22c55e'], [0.02, '#f59e0b'], [0.02, '#f97316'], [0.06, '#94a3b8'], [0.18, '#f43f5e']]
  plan.forEach(([p, c]) => { for (let i = 0; i < Math.round(p * N); i++) segs.push(c) })
  while (segs.length < N) segs.push('#f43f5e')
  const cx = 150, cy = 150, r1 = 100, r2 = 140
  return (
    <svg ref={ref} viewBox="0 0 300 165" width="100%" aria-hidden>
      {segs.slice(0, N).map((c, i) => { const a = Math.PI - (i + 0.5) / N * Math.PI; return <motion.line key={i} x1={cx + r1 * Math.cos(a)} y1={cy - r1 * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={cy - r2 * Math.sin(a)} stroke={c} strokeWidth="4.2" strokeLinecap="round" initial={{ opacity: 0.08 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: 0.15 + i * 0.018, duration: 0.3 }} /> })}
      <foreignObject x={cx - 90} y={cy - 58} width="180" height="44"><div style={{ textAlign: 'center', fontSize: 32, fontWeight: 500, color: T.fg, lineHeight: '44px' }}><Num v={total} /></div></foreignObject>
      <text x={cx} y={cy} textAnchor="middle" fontSize="12.5" fill={T.subtle}>{sub}</text>
    </svg>
  )
}

/* ── Pills, chips, stage badges ────────────────────────────────────────── */

export function PillTabs({ items, active, className }: { items: string[]; active: string; className?: string }) {
  return <div className={cn('inline-flex items-center rounded-full bg-[#0d0d0d] p-1', className)}>{items.map(t => <span key={t} className={cn('rounded-full px-3.5 py-1.5 text-[13px]', t === active ? 'bg-[#141414] text-[#ededed]' : 'text-[#8f8f8f]')}>{t}</span>)}</div>
}

const STAGE: Record<string, string> = {
  Active: 'bg-[hsl(145_55%_55%/0.15)] text-[hsl(145_55%_55%)]', Moved: 'bg-[hsl(199_85%_65%/0.15)] text-[hsl(199_85%_65%)]', Wrong: 'bg-[hsl(0_80%_66%/0.15)] text-[hsl(0_80%_66%)]',
  Churning: 'bg-[hsl(38_90%_60%/0.15)] text-[hsl(38_90%_60%)]', 'At risk': 'bg-[hsl(27_96%_61%/0.15)] text-[hsl(27_96%_61%)]', Dormant: 'bg-white/[0.06] text-[#b3b3b3]',
  Joined: 'bg-[hsl(199_85%_65%/0.12)] text-[hsl(199_85%_65%)]', Lead: 'bg-[hsl(217_91%_60%/0.15)] text-[hsl(217_91%_72%)]', Submitted: 'bg-[hsl(262_83%_76%/0.15)] text-[hsl(262_83%_80%)]', Verified: 'bg-[hsl(145_55%_55%/0.15)] text-[hsl(145_55%_55%)]',
  'New lead': 'bg-[hsl(248_85%_74%/0.15)] text-[hsl(248_85%_80%)]',
}
export function Badge({ s }: { s: string }) { return <span className={cn('inline-flex rounded-md px-1.5 py-0.5 text-[12px] font-medium', STAGE[s] ?? 'bg-white/[0.06] text-[#b3b3b3]')}>{s}</span> }
export function Chip({ children }: { children: React.ReactNode }) { return <span className="inline-flex items-center gap-1 rounded-md bg-[#141414] px-1.5 py-0.5 text-[12px] text-[#ededed] [&_svg]:size-3">{children}</span> }
export function TimeChip({ children }: { children: React.ReactNode }) { return <span className="inline-flex rounded-md bg-[hsl(199_85%_65%/0.12)] px-1.5 py-0.5 text-[12px] text-[hsl(199_85%_75%)]">{children}</span> }

const INI = ['bg-[#1d2a24] text-[#7fd6a4]', 'bg-[#2a2420] text-[#e6b07a]', 'bg-[#23233a] text-[#a7a2f5]', 'bg-[#2a1f24] text-[#ef9aa8]', 'bg-[#1d2630] text-[#8cc8ee]']
export function Initials({ n, i = 0 }: { n: string; i?: number }) { return <span className={cn('grid size-6 shrink-0 place-items-center rounded-md text-[10.5px] font-semibold', INI[i % INI.length])}>{n.split(' ').map(x => x[0]).slice(0, 2).join('')}</span> }

/* ── The app window: icon rail + header ────────────────────────────────── */

const RAIL: [string, React.ReactNode][] = [['home', <Home />], ['ask', <Sparkles />], ['crm', <Users />], ['clients', <User />], ['activity', <Activity />], ['growth', <TrendingUp />], ['links', <Link2 />]]

export function AppWindow({ active, title, right, w = 1180, h = 720, children }: { active: string; title: string; right?: React.ReactNode; w?: number; h?: number; children: React.ReactNode }) {
  return (
    <div className="grid overflow-hidden rounded-[18px] bg-[#070707] text-[#ededed] shadow-[0_40px_100px_rgba(0,0,0,0.6)]" style={{ width: w, height: h, gridTemplateColumns: '48px 1fr' }}>
      <aside className="flex flex-col items-center gap-2 border-r border-[#1c1c1c] bg-[#050505] py-3 text-[#8f8f8f] [&_svg]:size-4">
        <span className="mb-2 grid size-8 place-items-center"><PanelLeft /></span>
        {RAIL.map(([k, ic]) => <span key={k} className={cn('grid size-8 place-items-center rounded-lg', k === active && 'bg-[#141414] text-[#ededed] shadow-[inset_2px_0_0_hsl(248_85%_74%)]')}>{ic}</span>)}
        <span className="mt-auto grid size-7 place-items-center rounded-md bg-[#1d2a24] text-[10px] font-semibold text-[#7fd6a4]">IB</span>
      </aside>
      <div className="flex min-w-0 flex-col overflow-hidden">
        <div className="flex h-12 shrink-0 items-center justify-between px-6">
          <span className="text-[14px] font-medium">{title}</span>
          <span className="flex items-center gap-3 text-[12.5px] text-[#8f8f8f]">{right}<span className="flex items-center gap-1.5"><Clock className="size-3.5" />Updated 4m ago</span><span className="flex items-center gap-2 rounded-lg bg-[#0d0d0d] px-3 py-1.5 text-[#ededed]">USD<ChevronDown className="size-3.5 text-[#8f8f8f]" /></span></span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}

/** Scales a fixed-size window down to fit its container. */
/**
 * Scales a fixed-size screen to fit its column. With `minScale`, it never
 * shrinks below that — on a phone the screen stays readable and is cropped,
 * fading out at the right edge, instead of becoming tiny.
 */
export function Fit({ w, h, minScale = 0, children }: { w: number; h: number; minScale?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  const [crop, setCrop] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ro = new ResizeObserver(() => { const fit = Math.min(1, el.clientWidth / w); setK(Math.max(minScale, fit)); setCrop(fit < minScale) })
    ro.observe(el); return () => ro.disconnect()
  }, [w, minScale])
  return (
    <div ref={ref} className={cn('relative mx-auto w-full', crop && 'overflow-hidden [mask-image:linear-gradient(to_right,black_78%,transparent)]')} style={{ maxWidth: w, height: h * k }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${k})` }}>{children}</div>
    </div>
  )
}

/* ── Marketing extras: the app's own pop-up, and a lifted card ─────────── */

/** The app's bottom-right notification, cycling through a few events. */
export function Toasts({ items, ms = 3200, className }: { items: { icon: React.ReactNode; text: React.ReactNode; chip?: React.ReactNode; ago: string }[]; ms?: number; className?: string }) {
  const { ref, go } = useGo<HTMLDivElement>()
  const i = useTick(items.length, ms, go)
  const t = items[i]
  return (
    <div ref={ref} className={cn('w-[330px]', className)}>
      <AnimatePresence mode="wait">
        {go && (
          <motion.div key={i} initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.45, ease }}
            className="flex gap-3 rounded-2xl bg-[#0d0d0d] p-3.5 text-[#ededed] shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[hsl(248_85%_74%/0.14)] text-[hsl(248_85%_80%)] [&_svg]:size-4">{t.icon}</span>
            <div className="min-w-0 flex-1 text-[13.5px] leading-5">
              <div className="[&_b]:font-medium">{t.text}</div>
              {t.chip && <div className="mt-1.5">{t.chip}</div>}
              <div className="mt-1.5 text-[11.5px] text-[#8f8f8f]">{t.ago}</div>
            </div>
            <X className="size-3.5 shrink-0 text-[#8f8f8f]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** A card lifted off the page for the marketing site: a hairline edge and a soft violet glow underneath. */
export const lift = 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]'

/** A number that changes live: the new value drops in with a brief green flash. */
export function Live({ v, className }: { v: string; className?: string }) {
  return (
    <span className={cn('relative inline-flex overflow-hidden', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={v} initial={{ y: '-60%', opacity: 0, color: 'hsl(145 55% 55%)' }} animate={{ y: 0, opacity: 1, color: '#ededed' }} exit={{ y: '60%', opacity: 0 }} transition={{ y: { duration: 0.35, ease }, opacity: { duration: 0.25 }, color: { duration: 1.4 } }}>{v}</motion.span>
      </AnimatePresence>
    </span>
  )
}

/** One shared clock for a composition, so every part reacts to the same event. */
export function useClock(ms: number) {
  const { ref, go } = useGo<HTMLDivElement>('-80px')
  const [t, setT] = useState(0)
  useEffect(() => { if (!go) return; const id = setInterval(() => setT(x => x + 1), ms); return () => clearInterval(id) }, [go, ms])
  return { ref, go, t }
}

/** A single pop-up, driven from outside (shown when `show`), keyed by the event. */
export function Toast({ k, show = true, icon, text, chip, className }: { k: string | number; show?: boolean; icon: React.ReactNode; text: React.ReactNode; chip?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('w-[290px]', className)}>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div key={k} initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.4, ease }}
            className="flex gap-3 rounded-2xl bg-[#0d0d0d] p-3 text-[#ededed] shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[hsl(248_85%_74%/0.14)] text-[hsl(248_85%_80%)] [&_svg]:size-3.5">{icon}</span>
            <div className="min-w-0 flex-1 text-[12.5px] leading-[18px] [&_b]:font-medium">
              <div>{text}</div>
              {chip && <div className="mt-1.5">{chip}</div>}
              <div className="mt-1 text-[11px] text-[#8f8f8f]">just now</div>
            </div>
            <X className="size-3 shrink-0 text-[#8f8f8f]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
