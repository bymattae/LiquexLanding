import { useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Premium primitives for the landing page's product visuals: hairline
 * gradient-edged surfaces, real brand marks, and precise charts. Every
 * mockup on the page should be built from these so they read as one product.
 */

export const ease = [0.16, 1, 0.3, 1] as const

/** The flat surface every mockup sits on: one hairline, a soft shadow, nothing else. */
export function Surface({ children, className, inner }: { children: React.ReactNode; className?: string; inner?: string; glow?: boolean }) {
  return (
    <div className={cn('rounded-[18px] bg-[#131417] shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_20px_50px_rgba(0,0,0,0.45)]', className)}>
      <div className={cn('h-full rounded-[18px]', inner)}>{children}</div>
    </div>
  )
}

/** Small uppercase-free label used above numbers. */
export const label = 'text-[11px] font-medium text-zinc-500'
export const num = 'font-semibold tabular-nums tracking-[-0.02em]'

/* ── Brand marks ─────────────────────────────────────────────────────── */

type Mark = { className?: string }

export function TelegramMark({ className }: Mark) {
  const id = useId()
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <defs><linearGradient id={id} x1="0.5" x2="0.5" y1="0" y2="1"><stop offset="0" stopColor="#37BBFE" /><stop offset="1" stopColor="#007DBB" /></linearGradient></defs>
      <circle cx="12" cy="12" r="12" fill={`url(#${id})`} />
      <path fill="#fff" d="M5.43 11.87c3.5-1.52 5.83-2.53 7-3.02 3.33-1.39 4.02-1.63 4.47-1.64.1 0 .32.02.47.14.12.1.15.23.17.33.02.1.04.31.02.48-.18 1.9-.96 6.5-1.36 8.63-.17.9-.5 1.2-.82 1.23-.7.06-1.22-.46-1.9-.9-1.05-.69-1.64-1.12-2.66-1.79-1.18-.78-.41-1.2.26-1.9.18-.18 3.24-2.97 3.3-3.22 0-.03.01-.15-.06-.21-.07-.06-.17-.04-.25-.02-.1.02-1.79 1.14-5.06 3.35-.48.33-.91.49-1.3.48-.43-.01-1.25-.24-1.86-.44-.75-.24-1.35-.37-1.3-.79.03-.22.33-.44.9-.67z" />
    </svg>
  )
}

export function InstagramMark({ className }: Mark) {
  const id = useId()
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#FFD776" /><stop offset="0.25" stopColor="#F3A554" /><stop offset="0.45" stopColor="#F15C3C" />
          <stop offset="0.65" stopColor="#D92D7A" /><stop offset="0.85" stopColor="#9B36B7" /><stop offset="1" stopColor="#515ECF" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill={`url(#${id})`} />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.1" cy="7.9" r="0.95" fill="#fff" />
    </svg>
  )
}

const TIKTOK = 'M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z'
export function TikTokMark({ className }: Mark) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <rect width="24" height="24" rx="6.5" fill="#000" />
      <rect width="24" height="24" rx="6.5" fill="none" stroke="rgba(255,255,255,0.14)" />
      <g transform="translate(0.6 0.2) scale(0.78) translate(3.4 3.4)">
        <path d={TIKTOK} fill="#25F4EE" transform="translate(-0.9 -0.7)" />
        <path d={TIKTOK} fill="#FE2C55" transform="translate(0.9 0.7)" />
        <path d={TIKTOK} fill="#fff" />
      </g>
    </svg>
  )
}

export function YouTubeMark({ className }: Mark) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <rect width="24" height="24" rx="6.5" fill="#FF0033" />
      <path d="M10 8.6v6.8l5.8-3.4z" fill="#fff" />
    </svg>
  )
}

/** The broker: a geometric V on Vantage navy. */
export function VantageMark({ className }: Mark) {
  const id = useId()
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <defs><linearGradient id={id} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#123B7A" /><stop offset="1" stopColor="#071A3D" /></linearGradient></defs>
      <rect width="24" height="24" rx="6.5" fill={`url(#${id})`} />
      <path d="M5.2 7.2h3.3l3.5 7.4 3.5-7.4h3.3L13.6 17.6h-3.2z" fill="#fff" />
    </svg>
  )
}

/** A neutral broker mark: candles on slate — any broker, no branding. */
export function BrokerMark({ className }: Mark) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-6', className)} aria-hidden>
      <rect width="24" height="24" rx="6.5" fill="#1d2430" />
      <rect width="24" height="24" rx="6.5" fill="none" stroke="rgba(255,255,255,0.12)" />
      <path d="M8 6.5v11M12 8v9M16 5.5v8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="6.6" y="9" width="2.8" height="5.5" rx="0.8" fill="#fb7185" />
      <rect x="10.6" y="10.5" width="2.8" height="4.5" rx="0.8" fill="#6ee7b7" />
      <rect x="14.6" y="7" width="2.8" height="4.5" rx="0.8" fill="#6ee7b7" />
    </svg>
  )
}

export function LiquexMark({ className }: Mark) {
  /* the source PNG has a soft transparent margin; crop it so no dark edge shows */
  return <span className={cn('inline-block size-6 shrink-0 overflow-hidden rounded-[7px]', className)}><img src="/favicon.png" alt="" className="size-full scale-[1.2] object-cover" /></span>
}

/* ── People ───────────────────────────────────────────────────────────── */

const SKINS = ['from-amber-200 to-orange-400', 'from-sky-200 to-indigo-400', 'from-rose-200 to-pink-500', 'from-emerald-200 to-teal-500', 'from-violet-200 to-purple-500', 'from-zinc-200 to-zinc-500']

/** An initial avatar with a soft gradient — reads as a person, not an icon. */
export function Avatar({ name, i = 0, className }: { name: string; i?: number; className?: string }) {
  return (
    <span className={cn('grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-black/70 ring-2 ring-[#0c0e11]', SKINS[i % SKINS.length], className)}>
      {name[0]}
    </span>
  )
}

/* ── Charts ───────────────────────────────────────────────────────────── */

/** Smooth path through points using a Catmull-Rom → Bézier conversion. */
export function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`
  }
  return d
}

export function toPts(data: number[], w: number, h: number, pad = 4): [number, number][] {
  const max = Math.max(...data), min = Math.min(...data)
  return data.map((v, i) => [Math.round((i / (data.length - 1)) * w), Math.round(pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2))])
}

/** An area chart: hairline grid, gradient fill, a line that draws itself, and a marker on the last point. */
export function AreaChart({ data, w = 360, h = 120, go = true, color = '#6ee7b7', marker = true, grid = true, className, delay = 0.4 }:
  { data: number[]; w?: number; h?: number; go?: boolean; color?: string; marker?: boolean; grid?: boolean; className?: string; delay?: number }) {
  const id = useId()
  const pts = toPts(data, w, h, 8)
  const d = smooth(pts)
  const last = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('w-full overflow-visible', className)} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${id}f`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity="0.22" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient>
      </defs>
      {grid && [0.25, 0.5, 0.75].map(f => <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />)}
      <motion.path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id}f)`} initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: delay + 0.6, duration: 1 }} />
      <motion.path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : {}} transition={{ delay, duration: 1.6, ease }} />
      {marker && (
        <motion.g initial={{ opacity: 0 }} animate={go ? { opacity: 1 } : {}} transition={{ delay: delay + 1.5 }}>
          <circle cx={last[0]} cy={last[1]} r="7" fill={color} opacity="0.18"><animate attributeName="r" values="4;10;4" dur="2.4s" repeatCount="indefinite" /></circle>
          <circle cx={last[0]} cy={last[1]} r="3" fill="#0c0e11" stroke={color} strokeWidth="1.75" />
        </motion.g>
      )}
    </svg>
  )
}

/** A tiny sparkline for KPI cells. */
export function Spark({ data, color = '#6ee7b7', go = true, className }: { data: number[]; color?: string; go?: boolean; className?: string }) {
  const pts = toPts(data, 64, 20, 2)
  return (
    <svg viewBox="0 0 64 20" className={cn('h-5 w-16 overflow-visible', className)} aria-hidden>
      <motion.path d={smooth(pts)} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : {}} transition={{ delay: 0.8, duration: 1.2, ease }} />
    </svg>
  )
}

/** A thin "up" delta with no pill chrome. */
export function Delta({ v, className }: { v: string; className?: string }) {
  return <span className={cn('inline-flex items-center gap-0.5 text-[11.5px] font-medium tabular-nums text-emerald-300', className)}>
    <svg viewBox="0 0 10 10" className="size-2.5" aria-hidden><path d="M2 7.5 7.5 2M3.5 2h4v4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>{v}
  </span>
}
