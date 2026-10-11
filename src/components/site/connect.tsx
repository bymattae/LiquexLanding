import { motion } from 'framer-motion'
import { InstagramMark, TelegramMark, TikTokMark, YouTubeMark } from '@/components/affiliate/premium'
import { Frame } from '@/components/affiliate/simple'
import { Fit } from '@/components/app/kit'

/**
 * "Connect everything." — the platforms your traffic comes from on the left,
 * the brokers your clients trade with on the right, every line fanning into
 * one sentence in the middle.
 * Drawn in one 1100×460 space so lines and tiles line up.
 */

const W = 1100, H = 372
const JOIN_Y = 190, JL = 300, JR = W - 300

type Node = { x: number; y: number; el: React.ReactNode; dot: string }
const tile = 'grid place-items-center rounded-2xl bg-[#121214] shadow-[0_12px_30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]'
const app = (m: React.ReactNode) => <span className={`${tile} size-[68px] rounded-[20px] [&_svg]:size-9`}>{m}</span>
const broker = (src: string, alt: string, w: number) => <span className={`${tile} h-[68px] w-[150px] rounded-[20px]`}><img src={src} alt={alt} style={{ width: w }} className="h-auto opacity-80" /></span>

const LEFT: Node[] = [
  { x: 70, y: 60, el: app(<InstagramMark />), dot: '#f472b6' },
  { x: 150, y: 150, el: app(<TikTokMark />), dot: '#e4e4e7' },
  { x: 150, y: 240, el: app(<YouTubeMark />), dot: '#f87171' },
  { x: 70, y: 330, el: app(<TelegramMark />), dot: '#7dd3fc' },
]
const RIGHT: Node[] = [
  { x: W - 85, y: 60, el: broker('/VTMarketsNew.png', 'VT Markets', 100), dot: '#6ee7b7' },
  { x: W - 160, y: 150, el: broker('/PUPrimeNew.png', 'PU Prime', 96), dot: '#6ee7b7' },
  { x: W - 160, y: 240, el: broker('/StarTraderNew.png', 'StarTrader', 100), dot: '#6ee7b7' },
  { x: W - 85, y: 330, el: broker('/VantageNew.png', 'Vantage', 98), dot: '#6ee7b7' },
]


/* each tile: a faint line in from the page edge, then a curve into the sentence */
const inL = (n: Node) => `M0,${n.y} L${n.x - 36},${n.y}`
const outL = (n: Node) => `M${n.x + 36},${n.y} C${n.x + 120},${n.y} ${JL - 90},${JOIN_Y} ${JL},${JOIN_Y}`
const inR = (n: Node) => `M${W},${n.y} L${n.x + 77},${n.y}`
const outR = (n: Node) => `M${n.x - 77},${n.y} C${n.x - 150},${n.y} ${JR + 90},${JOIN_Y} ${JR},${JOIN_Y}`

export function ConnectHub() {
  const curves = [...LEFT.map((n, i) => ({ d: outL(n), dot: n.dot, k: `l${i}` })), ...RIGHT.map((n, i) => ({ d: outR(n), dot: n.dot, k: `r${i}` }))]
  return (
    <section className="px-3 sm:px-6">
      <Frame className="overflow-hidden py-12 sm:py-14">
        {/* phones: the sentence, then everything it connects, as two rows */}
        <div className="px-6 text-center sm:hidden">
          <p className="text-balance text-[24px] font-medium leading-[1.3] tracking-tight text-zinc-100">
            Liquex connects every platform your traffic comes from and every broker your clients trade with, <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text italic text-transparent">into one clear view of your business.</span>
          </p>
          <div className="mt-8 flex justify-center gap-3">{LEFT.map((n, i) => <span key={i} className="[&>span]:size-14 [&>span]:rounded-2xl [&_svg]:!size-7">{n.el}</span>)}</div>
          <div className="mt-3 grid grid-cols-2 gap-3">{RIGHT.map((n, i) => <span key={i} className="[&>span]:h-14 [&>span]:w-full [&>span]:rounded-2xl">{n.el}</span>)}</div>
        </div>

        <div className="mx-auto hidden max-w-[1100px] px-2 sm:block">
          <Fit w={W} h={H}>
            <div className="relative" style={{ width: W, height: H }}>
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
                {[...LEFT.map(inL), ...RIGHT.map(inR)].map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.06)" />)}
                {curves.map((c, i) => (
                  <g key={c.k}>
                    <motion.path id={`cx-${c.k}`} d={c.d} fill="none" stroke="rgba(255,255,255,0.12)"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.06, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
                    <circle r={2.4} fill={c.dot}>
                      <animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} begin={`${(i * 0.45) % 2.2}s`} repeatCount="indefinite"><mpath href={`#cx-${c.k}`} /></animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur={`${2.4 + (i % 3) * 0.5}s`} begin={`${(i * 0.45) % 2.2}s`} repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
              </svg>

              {[...LEFT, ...RIGHT].map((n, i) => (
                <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: n.x, top: n.y }}>
                  <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 * i, duration: 0.6 }}>{n.el}</motion.div>
                </div>
              ))}

              <div aria-hidden className="absolute rounded-full" style={{ left: W / 2 - 260, top: JOIN_Y - 150, width: 520, height: 300, background: 'radial-gradient(closest-side, rgba(110,120,245,0.16), transparent)' }} />
              {/* the sentence everything flows into */}
              <div className="absolute -translate-y-1/2 text-center" style={{ left: JL + 30, width: JR - JL - 60, top: JOIN_Y }}>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-balance text-[30px] font-medium leading-[1.25] tracking-tight text-zinc-100">
                  Liquex connects every platform your traffic comes from and every broker your clients trade with, <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text italic text-transparent">into one clear view of your business.</span>
                </motion.p>
              </div>
            </div>
          </Fit>
        </div>
      </Frame>
    </section>
  )
}
