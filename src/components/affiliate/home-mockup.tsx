/**
 * The hero product shot: the IB Home, reduced to what matters — three
 * numbers and money in vs out. Borderless soft surfaces, like the app.
 */

const bars = [30, 8, 22, 54, 26, 70, 46, 14, 100, 12, 62, 24, 40, 18, 52, 30, 10, 38, 20, 48, 16, 34, 22, 44, 28, 58, 18, 36]
const top = bars.indexOf(Math.max(...bars))

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-3xl bg-white/[0.035] px-7 py-6">
      <div className="text-[15px] text-zinc-400">{label}</div>
      <div className="mt-2 text-[40px] font-semibold leading-none tracking-tight">{value}</div>
      <div className="mt-3 text-[14px] text-emerald-300">{delta}</div>
    </div>
  )
}

export function HomeMockup() {
  return (
    <div className="w-[1040px] rounded-[32px] bg-[#0b0d10] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[28px] font-medium tracking-tight">Good morning, Dariusz</div>
          <div className="mt-1 text-[15px] text-zinc-500">Last 30 days</div>
        </div>
        <img src="/Liquexdark.png" alt="" className="h-6 w-auto opacity-80" />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <Stat label="Your balance" value="$227,358" delta="↑ 12.4%" />
        <Stat label="Net funding" value="+$376,048" delta="↑ 4.6%" />
        <Stat label="Active clients" value="246" delta="↑ 25.3%" />
      </div>

      <div className="mt-4 rounded-3xl bg-white/[0.035] px-7 pb-6 pt-6">
        <div className="flex items-baseline justify-between">
          <div className="text-[15px] text-zinc-400">Money in</div>
          <div className="text-[14px] text-zinc-500">$900,584</div>
        </div>
        <svg viewBox="0 0 916 170" className="mt-6 h-[170px] w-full" aria-hidden>
          <defs>
            <linearGradient id="hm-top" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6ee7b7" /><stop offset="1" stopColor="#6ee7b7" stopOpacity="0.2" /></linearGradient>
          </defs>
          {bars.map((v, i) => {
            const h = (v / 100) * 150, step = 916 / bars.length
            return <rect key={i} x={i * step + (step - 14) / 2} y={168 - h} width="14" height={h} rx="7" fill={i === top ? 'url(#hm-top)' : 'rgba(255,255,255,0.09)'} />
          })}
        </svg>
      </div>
    </div>
  )
}
